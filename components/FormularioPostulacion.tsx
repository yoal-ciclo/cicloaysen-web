'use client'

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import type { Pregunta } from '@/lib/empleos'
import {
  MAX_ARCHIVOS_TITULOS,
  MAX_TOTAL_BYTES,
  MIN_SEGUNDOS_ENVIO,
  MSG_EXCESO_ARCHIVOS,
  TEXTO_CORTO_MAX,
  TEXTO_LARGO_MAX,
  datosPersonalesSchema,
  erroresPorCampo,
  formatearBytes,
  formatearRut,
  respuestasSchema,
  type Respuestas,
} from '@/lib/postulacion'

type Estado = 'idle' | 'sending' | 'success' | 'error'

interface Props {
  slug: string
  tituloCargo: string
  preguntas: Pregunta[]
}

const CONSENTIMIENTO =
  'Autorizo a Ciclo Aysén SpA a tratar mis datos personales y documentos solo para este y futuros procesos de selección, conforme a la Ley N° 19.628. Puedo solicitar su eliminación escribiendo a contacto@cicloaysen.com.'

const datosIniciales = {
  nombre: '',
  rut: '',
  email: '',
  telefono: '',
  comuna: '',
  region: 'Aysén del General Carlos Ibáñez del Campo',
  profesion: '',
  linkedin: '',
}

const regiones = [
  'Arica y Parinacota',
  'Tarapacá',
  'Antofagasta',
  'Atacama',
  'Coquimbo',
  'Valparaíso',
  'Metropolitana de Santiago',
  "Libertador General Bernardo O'Higgins",
  'Maule',
  'Ñuble',
  'Biobío',
  'La Araucanía',
  'Los Ríos',
  'Los Lagos',
  'Aysén del General Carlos Ibáñez del Campo',
  'Magallanes y de la Antártica Chilena',
  'Fuera de Chile',
]

function respuestasIniciales(preguntas: Pregunta[]): Respuestas {
  return Object.fromEntries(preguntas.map((p) => [p.id, p.tipo === 'seleccion_multiple' ? [] : '']))
}

const inputBase =
  'w-full border rounded-lg px-4 py-3 text-[#1C2B1F] placeholder-gray-400 bg-white focus:outline-none focus:ring-1 transition-colors'

function claseInput(error?: string) {
  return `${inputBase} ${
    error
      ? 'border-red-400 focus:border-red-400 focus:ring-red-200'
      : 'border-gray-200 focus:border-[#5A7B5F] focus:ring-[#5A7B5F]'
  }`
}

function Campo({
  id,
  label,
  obligatorio,
  error,
  ayuda,
  children,
}: {
  id: string
  label: ReactNode
  obligatorio?: boolean
  error?: string
  ayuda?: ReactNode
  children: ReactNode
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#1C2B1F] mb-1.5" htmlFor={id}>
        {label} {obligatorio ? <span className="text-red-500" aria-hidden="true">*</span> : <span className="text-gray-400 font-normal">(opcional)</span>}
      </label>
      {children}
      {ayuda && !error && (
        <p id={`${id}-ayuda`} className="text-xs text-gray-500 mt-1">
          {ayuda}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-red-600 text-xs mt-1">
          {error}
        </p>
      )}
    </div>
  )
}

// Atributos de accesibilidad para un control con posible error.
function aria(id: string, error?: string, ayuda?: boolean) {
  return {
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? `${id}-error` : ayuda ? `${id}-ayuda` : undefined,
  }
}

export default function FormularioPostulacion({ slug, tituloCargo, preguntas }: Props) {
  const [estado, setEstado] = useState<Estado>('idle')
  const [mensajeError, setMensajeError] = useState('')
  const [errores, setErrores] = useState<Record<string, string>>({})
  const [datos, setDatos] = useState(datosIniciales)
  const [respuestas, setRespuestas] = useState<Respuestas>(() => respuestasIniciales(preguntas))
  const [consentimiento, setConsentimiento] = useState(false)
  const [cv, setCv] = useState<File | null>(null)
  const [titulos, setTitulos] = useState<File[]>([])
  const [sitioWeb, setSitioWeb] = useState('')
  const inicio = useRef(0)
  const formRef = useRef<HTMLFormElement>(null)
  const cvInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inicio.current = Date.now()
  }, [])

  const totalBytes = (cv?.size ?? 0) + titulos.reduce((s, f) => s + f.size, 0)
  const excedido = totalBytes > MAX_TOTAL_BYTES

  function limpiarError(campo: string) {
    if (errores[campo]) setErrores((e) => ({ ...e, [campo]: '' }))
  }

  function cambiarDato(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setDatos((d) => ({ ...d, [e.target.name]: e.target.value }))
    limpiarError(e.target.name)
  }

  function cambiarRespuesta(id: string, valor: string | string[]) {
    setRespuestas((r) => ({ ...r, [id]: valor }))
    limpiarError(`q_${id}`)
  }

  function esPdf(f: File) {
    return f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
  }

  function elegirCv(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null
    if (f && !esPdf(f)) {
      setErrores((er) => ({ ...er, cv: 'El CV debe ser un archivo PDF' }))
      setCv(null)
      e.target.value = ''
      return
    }
    setCv(f)
    limpiarError('cv')
  }

  function agregarTitulos(e: ChangeEvent<HTMLInputElement>) {
    const nuevos = Array.from(e.target.files ?? [])
    e.target.value = ''
    if (nuevos.some((f) => !esPdf(f))) {
      setErrores((er) => ({ ...er, titulos: 'Solo se aceptan archivos PDF' }))
      return
    }
    const lista = [...titulos, ...nuevos].slice(0, MAX_ARCHIVOS_TITULOS)
    setTitulos(lista)
    limpiarError('titulos')
  }

  function quitarTitulo(i: number) {
    setTitulos((t) => t.filter((_, j) => j !== i))
  }

  function quitarCv() {
    setCv(null)
    if (cvInputRef.current) cvInputRef.current.value = ''
  }

  function validar(): Record<string, string> {
    const e: Record<string, string> = {}
    const d = datosPersonalesSchema.safeParse({ ...datos, consentimiento })
    if (!d.success) Object.assign(e, erroresPorCampo(d.error))
    const r = respuestasSchema(preguntas).safeParse(respuestas)
    if (!r.success) Object.assign(e, erroresPorCampo(r.error, 'q_'))
    if (!cv) e.cv = 'Adjunte su CV en un archivo PDF'
    if (titulos.length === 0) e.titulos = 'Adjunte al menos un PDF con sus títulos o grados'
    if (excedido) e.titulos = MSG_EXCESO_ARCHIVOS
    return e
  }

  function enfocarPrimerError() {
    requestAnimationFrame(() => {
      formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus()
    })
  }

  async function enviar(ev: FormEvent) {
    ev.preventDefault()
    setMensajeError('')
    const e = validar()
    if (Object.keys(e).length > 0) {
      setErrores(e)
      setMensajeError('Revise los campos marcados.')
      enfocarPrimerError()
      return
    }
    if (Date.now() - inicio.current < MIN_SEGUNDOS_ENVIO * 1000) {
      setMensajeError('Espere unos segundos y vuelva a intentarlo.')
      return
    }

    const fd = new FormData()
    fd.append('cargo', slug)
    fd.append('inicio', String(inicio.current))
    fd.append('sitio_web', sitioWeb)
    Object.entries(datos).forEach(([k, v]) => fd.append(k, v))
    fd.append('consentimiento', consentimiento ? 'si' : '')
    for (const p of preguntas) {
      const v = respuestas[p.id]
      if (Array.isArray(v)) v.forEach((o) => fd.append(`q_${p.id}`, o))
      else fd.append(`q_${p.id}`, v)
    }
    if (cv) fd.append('cv', cv)
    titulos.forEach((f) => fd.append('titulos', f))

    setEstado('sending')
    try {
      const res = await fetch('/api/postulaciones', { method: 'POST', body: fd })
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean
        error?: string
        campos?: Record<string, string>
      }
      if (res.ok && data.ok) {
        setEstado('success')
        return
      }
      setEstado('error')
      setMensajeError(data.error || 'No pudimos enviar su postulación. Intente nuevamente.')
      if (data.campos) {
        setErrores(data.campos)
        enfocarPrimerError()
      }
    } catch {
      setEstado('error')
      setMensajeError('No pudimos conectar con el servidor. Revise su conexión e intente nuevamente.')
    }
  }

  if (estado === 'success') {
    return (
      <div role="status" className="bg-[#D4E5F0] rounded-2xl p-8 text-center">
        <h3 className="text-xl font-bold text-[#1C2B1F] mb-2">Postulación enviada</h3>
        <p className="text-[#4A5568]">
          Recibimos su postulación. Le escribiremos si su perfil avanza en el proceso.
        </p>
      </div>
    )
  }

  const enviando = estado === 'sending'

  return (
    <form ref={formRef} onSubmit={enviar} noValidate className="space-y-8" aria-label={`Postular a ${tituloCargo}`}>
      {/* Campo trampa para bots: oculto para personas y lectores de pantalla */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="sitio_web">No completar este campo</label>
        <input
          id="sitio_web"
          name="sitio_web"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={sitioWeb}
          onChange={(e) => setSitioWeb(e.target.value)}
        />
      </div>

      <fieldset className="space-y-5">
        <legend className="text-lg font-bold text-[#1C2B1F] mb-4">Datos personales</legend>

        <Campo id="nombre" label="Nombre completo" obligatorio error={errores.nombre}>
          <input id="nombre" name="nombre" type="text" autoComplete="name" value={datos.nombre} onChange={cambiarDato} className={claseInput(errores.nombre)} {...aria('nombre', errores.nombre)} />
        </Campo>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Campo id="rut" label="RUT" obligatorio error={errores.rut} ayuda="Ejemplo: 12.345.678-5">
            <input
              id="rut"
              name="rut"
              type="text"
              inputMode="text"
              autoComplete="off"
              value={datos.rut}
              onChange={cambiarDato}
              onBlur={() => datos.rut && setDatos((d) => ({ ...d, rut: formatearRut(d.rut) }))}
              className={claseInput(errores.rut)}
              {...aria('rut', errores.rut, true)}
            />
          </Campo>
          <Campo id="telefono" label="Teléfono" obligatorio error={errores.telefono}>
            <input id="telefono" name="telefono" type="tel" autoComplete="tel" placeholder="+56 9 1234 5678" value={datos.telefono} onChange={cambiarDato} className={claseInput(errores.telefono)} {...aria('telefono', errores.telefono)} />
          </Campo>
        </div>

        <Campo id="email" label="Correo electrónico" obligatorio error={errores.email}>
          <input id="email" name="email" type="email" autoComplete="email" value={datos.email} onChange={cambiarDato} className={claseInput(errores.email)} {...aria('email', errores.email)} />
        </Campo>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Campo id="comuna" label="Comuna de residencia" obligatorio error={errores.comuna}>
            <input id="comuna" name="comuna" type="text" autoComplete="address-level2" value={datos.comuna} onChange={cambiarDato} className={claseInput(errores.comuna)} {...aria('comuna', errores.comuna)} />
          </Campo>
          <Campo id="region" label="Región de residencia" obligatorio error={errores.region}>
            <select id="region" name="region" value={datos.region} onChange={cambiarDato} className={claseInput(errores.region)} {...aria('region', errores.region)}>
              {regiones.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </Campo>
        </div>

        <Campo id="profesion" label="Profesión o título principal" obligatorio error={errores.profesion}>
          <input id="profesion" name="profesion" type="text" value={datos.profesion} onChange={cambiarDato} className={claseInput(errores.profesion)} {...aria('profesion', errores.profesion)} />
        </Campo>

        <Campo id="linkedin" label="Perfil de LinkedIn" error={errores.linkedin}>
          <input id="linkedin" name="linkedin" type="url" autoComplete="url" placeholder="https://www.linkedin.com/in/..." value={datos.linkedin} onChange={cambiarDato} className={claseInput(errores.linkedin)} {...aria('linkedin', errores.linkedin)} />
        </Campo>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="text-lg font-bold text-[#1C2B1F] mb-1">Documentos</legend>
        <p className="text-sm text-[#4A5568]">
          Solo archivos PDF. El tamaño total de todos los archivos no puede superar 4 MB.
        </p>

        <Campo id="cv" label="Currículum (CV)" obligatorio error={errores.cv}>
          <input
            ref={cvInputRef}
            id="cv"
            name="cv"
            type="file"
            accept="application/pdf,.pdf"
            onChange={elegirCv}
            className="block w-full text-sm text-[#4A5568] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#5A7B5F] file:text-white file:font-medium hover:file:bg-[#4a6a4f] file:cursor-pointer"
            {...aria('cv', errores.cv)}
          />
          {cv && (
            <div className="mt-2 flex items-center justify-between gap-3 bg-gray-50 rounded-lg px-3 py-2 text-sm">
              <span className="truncate text-[#1C2B1F]">{cv.name}</span>
              <span className="flex items-center gap-3 shrink-0">
                <span className="text-gray-500">{formatearBytes(cv.size)}</span>
                <button type="button" onClick={quitarCv} className="text-red-600 hover:underline">
                  Quitar
                </button>
              </span>
            </div>
          )}
        </Campo>

        <Campo
          id="titulos"
          label="Títulos y grados"
          obligatorio
          error={errores.titulos}
          ayuda="Título profesional, certificados de grado y postítulos. Puede agregar varios archivos."
        >
          <input
            id="titulos"
            name="titulos"
            type="file"
            multiple
            accept="application/pdf,.pdf"
            onChange={agregarTitulos}
            disabled={titulos.length >= MAX_ARCHIVOS_TITULOS}
            className="block w-full text-sm text-[#4A5568] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#5A7B5F] file:text-white file:font-medium hover:file:bg-[#4a6a4f] file:cursor-pointer"
            {...aria('titulos', errores.titulos, true)}
          />
          {titulos.length > 0 && (
            <ul className="mt-2 space-y-2">
              {titulos.map((f, i) => (
                <li key={`${f.name}-${i}`} className="flex items-center justify-between gap-3 bg-gray-50 rounded-lg px-3 py-2 text-sm">
                  <span className="truncate text-[#1C2B1F]">{f.name}</span>
                  <span className="flex items-center gap-3 shrink-0">
                    <span className="text-gray-500">{formatearBytes(f.size)}</span>
                    <button type="button" onClick={() => quitarTitulo(i)} className="text-red-600 hover:underline" aria-label={`Quitar ${f.name}`}>
                      Quitar
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Campo>

        <div aria-live="polite" className={`text-sm rounded-lg px-4 py-3 ${excedido ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-[#D4E5F0] text-[#1C2B1F]'}`}>
          Tamaño total: <strong>{formatearBytes(totalBytes)}</strong> de 4 MB
          {excedido && <span className="block mt-1">{MSG_EXCESO_ARCHIVOS}</span>}
        </div>
      </fieldset>

      {preguntas.length > 0 && (
        <fieldset className="space-y-5">
          <legend className="text-lg font-bold text-[#1C2B1F] mb-4">Preguntas del cargo</legend>
          {preguntas.map((p) => (
            <PreguntaCampo
              key={p.id}
              pregunta={p}
              valor={respuestas[p.id]}
              error={errores[`q_${p.id}`]}
              onChange={(v) => cambiarRespuesta(p.id, v)}
            />
          ))}
        </fieldset>
      )}

      <div>
        <div className="flex items-start gap-3">
          <input
            id="consentimiento"
            name="consentimiento"
            type="checkbox"
            checked={consentimiento}
            onChange={(e) => {
              setConsentimiento(e.target.checked)
              limpiarError('consentimiento')
            }}
            className="mt-1 h-4 w-4 shrink-0 accent-[#5A7B5F]"
            {...aria('consentimiento', errores.consentimiento)}
          />
          <label htmlFor="consentimiento" className="text-sm text-[#4A5568] leading-relaxed">
            {CONSENTIMIENTO} <span className="text-red-500" aria-hidden="true">*</span>
          </label>
        </div>
        {errores.consentimiento && (
          <p id="consentimiento-error" className="text-red-600 text-xs mt-1 ml-7">
            {errores.consentimiento}
          </p>
        )}
      </div>

      {mensajeError && (
        <p role="alert" className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-lg px-4 py-3">
          {mensajeError}
        </p>
      )}

      <button
        type="submit"
        disabled={enviando}
        className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {enviando ? (
          <>
            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            Enviando postulación…
          </>
        ) : (
          'Enviar postulación'
        )}
      </button>
      <p className="text-xs text-gray-500 text-center">
        Los campos marcados con <span className="text-red-500">*</span> son obligatorios.
      </p>
    </form>
  )
}

function PreguntaCampo({
  pregunta: p,
  valor,
  error,
  onChange,
}: {
  pregunta: Pregunta
  valor: string | string[]
  error?: string
  onChange: (v: string | string[]) => void
}) {
  const id = `q_${p.id}`
  const texto = typeof valor === 'string' ? valor : ''

  if (p.tipo === 'si_no' || p.tipo === 'seleccion_multiple' || (p.tipo === 'seleccion' && (p.opciones?.length ?? 0) <= 4)) {
    const multiple = p.tipo === 'seleccion_multiple'
    const opciones = p.tipo === 'si_no' ? ['Sí', 'No'] : p.opciones ?? []
    const seleccion = Array.isArray(valor) ? valor : []
    return (
      <fieldset {...aria(id, error)} tabIndex={-1} className="focus:outline-none">
        <legend className="block text-sm font-medium text-[#1C2B1F] mb-2">
          {p.texto}{' '}
          {p.obligatoria ? <span className="text-red-500" aria-hidden="true">*</span> : <span className="text-gray-400 font-normal">(opcional)</span>}
        </legend>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {opciones.map((o, i) => (
            <label key={o} htmlFor={`${id}-${i}`} className="flex items-center gap-2 text-sm text-[#4A5568] cursor-pointer">
              <input
                id={`${id}-${i}`}
                type={multiple ? 'checkbox' : 'radio'}
                name={id}
                value={o}
                checked={multiple ? seleccion.includes(o) : texto === o}
                onChange={(e) => {
                  if (!multiple) onChange(o)
                  else onChange(e.target.checked ? [...seleccion, o] : seleccion.filter((s) => s !== o))
                }}
                className="h-4 w-4 accent-[#5A7B5F]"
              />
              {o}
            </label>
          ))}
        </div>
        {error && (
          <p id={`${id}-error`} className="text-red-600 text-xs mt-1">
            {error}
          </p>
        )}
      </fieldset>
    )
  }

  const max = p.maxCaracteres ?? (p.tipo === 'texto_largo' ? TEXTO_LARGO_MAX : TEXTO_CORTO_MAX)
  const contador = p.tipo === 'texto_largo' ? `${texto.length} / ${max} caracteres` : undefined

  return (
    <Campo id={id} label={p.texto} obligatorio={p.obligatoria} error={error} ayuda={contador}>
      {p.tipo === 'texto_largo' ? (
        <textarea id={id} name={id} rows={5} maxLength={max} value={texto} onChange={(e) => onChange(e.target.value)} className={`${claseInput(error)} resize-y`} {...aria(id, error, true)} />
      ) : p.tipo === 'seleccion' ? (
        <select id={id} name={id} value={texto} onChange={(e) => onChange(e.target.value)} className={claseInput(error)} {...aria(id, error)}>
          <option value="">Seleccione una opción</option>
          {(p.opciones ?? []).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          type={p.tipo === 'fecha' ? 'date' : 'text'}
          inputMode={p.tipo === 'numero' ? 'decimal' : undefined}
          maxLength={p.tipo === 'texto_corto' ? max : undefined}
          value={texto}
          onChange={(e) => onChange(e.target.value)}
          className={claseInput(error)}
          {...aria(id, error)}
        />
      )}
    </Campo>
  )
}
