import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { estaCerrado, formatearFecha, getEmpleo, type Empleo } from '@/lib/empleos'
import {
  MAX_ARCHIVOS_TITULOS,
  MAX_TOTAL_BYTES,
  MIN_SEGUNDOS_ENVIO,
  MSG_EXCESO_ARCHIVOS,
  datosPersonalesSchema,
  erroresPorCampo,
  formatearRut,
  respuestasSchema,
  type DatosPersonales,
  type Respuestas,
} from '@/lib/postulacion'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const ERROR_GENERICO =
  'No pudimos enviar su postulación. Intente nuevamente en unos minutos o escriba a contacto@cicloaysen.com.'

// Los mensajes de error de terceros pueden incluir direcciones de correo.
function sinCorreos(texto: string): string {
  return texto.replace(/[^\s@<>"']+@[^\s@<>"']+/g, '[correo]')
}

function error(status: number, mensaje: string, campos?: Record<string, string>) {
  return NextResponse.json({ ok: false, error: mensaje, campos }, { status })
}

function escapar(texto: string): string {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Texto apto para nombre de archivo: sin tildes, solo letras y números.
function paraArchivo(texto: string): string {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^A-Za-z0-9]/g, '')
}

// "Juan Pablo Pérez Soto" -> "Perez_Juan". Con 3 o más palabras se asume
// que las dos últimas son los apellidos.
function prefijoArchivo(nombreCompleto: string): string {
  const palabras = nombreCompleto.split(/\s+/).map(paraArchivo).filter(Boolean)
  if (palabras.length === 0) return 'Postulante'
  if (palabras.length === 1) return palabras[0]
  const apellido = palabras.length >= 3 ? palabras[palabras.length - 2] : palabras[1]
  return `${apellido}_${palabras[0]}`
}

async function esPdf(file: File): Promise<boolean> {
  const cabecera = Buffer.from(await file.slice(0, 5).arrayBuffer()).toString('latin1')
  return cabecera === '%PDF-'
}

function fila(etiqueta: string, valor: string) {
  return `<tr><td style="padding:6px 12px 6px 0;color:#4A5568;vertical-align:top;white-space:nowrap"><strong>${escapar(
    etiqueta,
  )}</strong></td><td style="padding:6px 0;color:#1C2B1F">${valor}</td></tr>`
}

function titulo(texto: string) {
  return `<h2 style="font-size:16px;color:#5A7B5F;border-bottom:2px solid #7FAA6A;padding-bottom:4px;margin:24px 0 8px">${escapar(
    texto,
  )}</h2>`
}

function htmlInterno(
  empleo: Empleo,
  d: DatosPersonales,
  respuestas: Respuestas,
  adjuntos: string[],
  fechaEnvio: string,
) {
  const respuestasHtml = empleo.preguntas
    .map((p) => {
      const r = respuestas[p.id]
      const texto = Array.isArray(r) ? r.join(', ') : r
      const valor = texto ? escapar(texto).replace(/\n/g, '<br>') : '<em style="color:#999">Sin respuesta</em>'
      return `<p style="margin:12px 0 2px;color:#4A5568"><strong>${escapar(p.texto)}</strong></p><p style="margin:0;color:#1C2B1F">${valor}</p>`
    })
    .join('')

  const linkedin = d.linkedin
    ? `<a href="${escapar(d.linkedin)}">${escapar(d.linkedin)}</a>`
    : '<em style="color:#999">No indicado</em>'

  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;max-width:680px">
<h1 style="font-size:20px;color:#1C2B1F;margin:0 0 4px">Nueva postulación</h1>
<p style="margin:0;color:#4A5568">${escapar(empleo.titulo)}</p>
${titulo('Cargo')}
<table style="border-collapse:collapse">
${fila('Cargo', escapar(empleo.titulo))}
${fila('Identificador', escapar(empleo.slug))}
${fila('Ubicación', escapar(empleo.ubicacion))}
${fila('Modalidad', escapar(`${empleo.modalidad} · Jornada ${empleo.jornada.toLowerCase()}`))}
${empleo.fechaCierre ? fila('Cierre', escapar(formatearFecha(empleo.fechaCierre))) : ''}
</table>
${titulo('Postulante')}
<table style="border-collapse:collapse">
${fila('Nombre', escapar(d.nombre))}
${fila('RUT', escapar(formatearRut(d.rut)))}
${fila('Correo', `<a href="mailto:${escapar(d.email)}">${escapar(d.email)}</a>`)}
${fila('Teléfono', escapar(d.telefono))}
${fila('Residencia', escapar(`${d.comuna}, ${d.region}`))}
${fila('Profesión', escapar(d.profesion))}
${fila('LinkedIn', linkedin)}
</table>
${titulo('Preguntas del cargo')}
${respuestasHtml || '<p style="color:#999">Este cargo no tiene preguntas.</p>'}
${titulo('Documentos adjuntos')}
<ul style="margin:0;padding-left:20px;color:#1C2B1F">${adjuntos.map((a) => `<li>${escapar(a)}</li>`).join('')}</ul>
<p style="margin-top:24px;color:#999;font-size:12px">Enviado el ${escapar(fechaEnvio)} desde cicloaysen.com/trabaja-con-nosotros. El postulante autorizó el tratamiento de sus datos conforme a la Ley N° 19.628.</p>
</div>`
}

function htmlConfirmacion(empleo: Empleo, nombre: string) {
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;max-width:600px;color:#1C2B1F">
<p>Hola ${escapar(nombre.split(/\s+/)[0] ?? '')}:</p>
<p>Recibimos su postulación al cargo <strong>${escapar(empleo.titulo)}</strong> en Ciclo Aysén SpA.</p>
<p>Revisaremos sus antecedentes y le escribiremos si su perfil avanza en el proceso.</p>
<p>Puede solicitar la eliminación de sus datos en cualquier momento escribiendo a <a href="mailto:contacto@cicloaysen.com">contacto@cicloaysen.com</a>.</p>
<p style="margin-top:24px">Saludos cordiales,<br><strong>Ciclo Aysén SpA</strong><br><span style="color:#4A5568">Empresa ambiental · Región de Aysén, Patagonia Chilena</span></p>
<p style="color:#999;font-size:12px;margin-top:24px">Este es un mensaje automático; no es necesario responderlo.</p>
</div>`
}

export async function POST(request: Request) {
  // Margen por la codificación multipart sobre el límite de archivos.
  const largo = Number(request.headers.get('content-length') ?? 0)
  if (largo > MAX_TOTAL_BYTES + 256 * 1024) return error(413, MSG_EXCESO_ARCHIVOS)

  let form: FormData
  try {
    form = await request.formData()
  } catch {
    return error(400, 'Solicitud inválida.')
  }

  const texto = (clave: string) => {
    const v = form.get(clave)
    return typeof v === 'string' ? v.normalize('NFC') : ''
  }

  // Antispam: si el campo trampa viene lleno, se responde como éxito sin enviar nada.
  if (texto('sitio_web') !== '') return NextResponse.json({ ok: true })

  const inicio = Number(texto('inicio'))
  if (!Number.isFinite(inicio) || Date.now() - inicio < MIN_SEGUNDOS_ENVIO * 1000) {
    return error(400, 'El formulario se envió demasiado rápido. Revise sus datos e intente nuevamente.')
  }

  const empleo = getEmpleo(texto('cargo'))
  if (!empleo) return error(404, 'El cargo indicado no existe.')
  if (estaCerrado(empleo)) return error(409, 'Este proceso de selección ya está cerrado.')

  const datos = datosPersonalesSchema.safeParse({
    nombre: texto('nombre'),
    rut: texto('rut'),
    email: texto('email'),
    telefono: texto('telefono'),
    comuna: texto('comuna'),
    region: texto('region'),
    profesion: texto('profesion'),
    linkedin: texto('linkedin'),
    consentimiento: texto('consentimiento') === 'si',
  })

  const respuestasCrudas: Record<string, unknown> = {}
  for (const p of empleo.preguntas) {
    const clave = `q_${p.id}`
    respuestasCrudas[p.id] =
      p.tipo === 'seleccion_multiple'
        ? form.getAll(clave).flatMap((v) => (typeof v === 'string' ? [v.normalize('NFC')] : []))
        : texto(clave)
  }
  const respuestas = respuestasSchema(empleo.preguntas).safeParse(respuestasCrudas)

  const campos: Record<string, string> = {}
  if (!datos.success) Object.assign(campos, erroresPorCampo(datos.error))
  if (!respuestas.success) Object.assign(campos, erroresPorCampo(respuestas.error, 'q_'))

  const cv = form.getAll('cv').filter((v): v is File => v instanceof File && v.size > 0)
  const titulos = form.getAll('titulos').filter((v): v is File => v instanceof File && v.size > 0)

  if (cv.length !== 1) campos.cv = 'Adjunte su CV en un archivo PDF'
  if (titulos.length === 0) campos.titulos = 'Adjunte al menos un PDF con sus títulos o grados'
  if (titulos.length > MAX_ARCHIVOS_TITULOS) campos.titulos = `Máximo ${MAX_ARCHIVOS_TITULOS} archivos`

  const total = [...cv, ...titulos].reduce((s, f) => s + f.size, 0)
  if (total > MAX_TOTAL_BYTES) return error(413, MSG_EXCESO_ARCHIVOS)

  if (cv.length === 1 && !(await esPdf(cv[0]))) campos.cv = 'El CV debe ser un archivo PDF válido'
  for (const f of titulos) {
    if (!(await esPdf(f))) {
      campos.titulos = 'Todos los documentos de títulos y grados deben ser archivos PDF válidos'
      break
    }
  }

  if (Object.keys(campos).length > 0 || !datos.success || !respuestas.success) {
    return error(400, 'Revise los campos marcados.', campos)
  }

  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.error('[postulaciones] Falta la variable de entorno RESEND_API_KEY; no se puede enviar el correo.')
    return error(500, ERROR_GENERICO)
  }

  const destino = process.env.POSTULACIONES_EMAIL_TO || 'contacto@cicloaysen.com'
  const remitente = process.env.POSTULACIONES_EMAIL_FROM || 'Postulaciones Ciclo Aysén <postulaciones@cicloaysen.com>'
  const d = datos.data
  const prefijo = prefijoArchivo(d.nombre)

  const adjuntos = [
    { filename: `${prefijo}_CV.pdf`, content: Buffer.from(await cv[0].arrayBuffer()) },
    ...(await Promise.all(
      titulos.map(async (f, i) => ({
        filename: `${prefijo}_Titulo_${i + 1}.pdf`,
        content: Buffer.from(await f.arrayBuffer()),
      })),
    )),
  ]

  const fechaEnvio = new Intl.DateTimeFormat('es-CL', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'America/Santiago',
  }).format(new Date())

  const resend = new Resend(apiKey)

  try {
    const { error: errorEnvio } = await resend.emails.send({
      from: remitente,
      to: destino.split(',').map((s) => s.trim()),
      replyTo: d.email,
      subject: `Postulación — ${empleo.titulo} — ${d.nombre}`,
      html: htmlInterno(
        empleo,
        d,
        respuestas.data as Respuestas,
        adjuntos.map((a) => a.filename),
        fechaEnvio,
      ),
      attachments: adjuntos,
    })
    if (errorEnvio) {
      console.error('[postulaciones] Resend rechazó el correo interno:', errorEnvio.name, sinCorreos(errorEnvio.message))
      return error(502, ERROR_GENERICO)
    }
  } catch (e) {
    console.error('[postulaciones] Error al enviar el correo interno:', e instanceof Error ? sinCorreos(e.message) : 'desconocido')
    return error(502, ERROR_GENERICO)
  }

  // La confirmación al postulante no debe hacer fallar una postulación ya recibida.
  try {
    const { error: errorConfirmacion } = await resend.emails.send({
      from: remitente,
      to: d.email,
      subject: `Recibimos su postulación — ${empleo.titulo}`,
      html: htmlConfirmacion(empleo, d.nombre),
    })
    if (errorConfirmacion) {
      console.error('[postulaciones] No se pudo enviar la confirmación:', errorConfirmacion.name)
    }
  } catch {
    console.error('[postulaciones] Error al enviar la confirmación al postulante.')
  }

  return NextResponse.json({ ok: true })
}
