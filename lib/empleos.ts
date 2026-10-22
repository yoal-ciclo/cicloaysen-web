import fs from 'fs'
import path from 'path'

export type TipoPregunta =
  | 'texto_corto'
  | 'texto_largo'
  | 'numero'
  | 'si_no'
  | 'seleccion'
  | 'seleccion_multiple'
  | 'fecha'

export interface Pregunta {
  id: string
  texto: string
  tipo: TipoPregunta
  obligatoria: boolean
  opciones?: string[]
  maxCaracteres?: number
}

export interface Empleo {
  slug: string
  titulo: string
  estado: 'abierto' | 'cerrado'
  ubicacion: string
  modalidad: 'Presencial' | 'Híbrida' | 'Remota'
  jornada: 'Completa' | 'Parcial' | 'Por proyecto'
  fechaPublicacion: string
  fechaCierre?: string
  resumen: string
  descripcion: string[]
  funciones: string[]
  requisitos: string[]
  deseables?: string[]
  preguntas: Pregunta[]
}

const EMPLEOS_DIR = path.join(process.cwd(), 'content', 'empleos')

// Fecha de hoy (AAAA-MM-DD) en horario de Chile continental.
export function hoyEnChile(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Santiago',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date())
}

// Un cargo está cerrado si así se indica o si su fecha de cierre ya pasó
// (el día de cierre completo se considera abierto).
export function estaCerrado(empleo: Empleo): boolean {
  if (empleo.estado === 'cerrado') return true
  return !!empleo.fechaCierre && empleo.fechaCierre < hoyEnChile()
}

export function formatearFecha(fecha: string): string {
  const [y, m, d] = fecha.split('-').map(Number)
  return new Intl.DateTimeFormat('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, d)))
}

function leerArchivo(archivo: string): Empleo {
  const raw = fs.readFileSync(path.join(EMPLEOS_DIR, archivo), 'utf8')
  const empleo = JSON.parse(raw) as Empleo
  const slugArchivo = archivo.replace(/\.json$/, '')
  if (empleo.slug !== slugArchivo) {
    throw new Error(`content/empleos/${archivo}: el campo "slug" debe ser "${slugArchivo}"`)
  }
  return empleo
}

// Los archivos que comienzan con "_" son plantillas y no se publican.
export function getEmpleos(): Empleo[] {
  if (!fs.existsSync(EMPLEOS_DIR)) return []
  const empleos = fs
    .readdirSync(EMPLEOS_DIR)
    .filter((f) => f.endsWith('.json') && !f.startsWith('_'))
    .map(leerArchivo)

  // Abiertos primero; dentro de cada grupo, los más recientes primero.
  return empleos.sort((a, b) => {
    const ca = estaCerrado(a) ? 1 : 0
    const cb = estaCerrado(b) ? 1 : 0
    if (ca !== cb) return ca - cb
    return b.fechaPublicacion.localeCompare(a.fechaPublicacion)
  })
}

export function getEmpleo(slug: string): Empleo | null {
  if (!/^[a-z0-9-]+$/.test(slug)) return null
  const archivo = `${slug}.json`
  if (!fs.existsSync(path.join(EMPLEOS_DIR, archivo))) return null
  return leerArchivo(archivo)
}
