import { z } from 'zod'
import type { Pregunta } from './empleos'

// Este módulo se usa en el formulario (cliente) y en la API (servidor),
// por lo que no debe importar nada de Node.

export const MAX_TOTAL_BYTES = 4 * 1024 * 1024
export const MIN_SEGUNDOS_ENVIO = 3
export const MAX_ARCHIVOS_TITULOS = 10
export const MSG_EXCESO_ARCHIVOS = 'Los archivos superan 4 MB. Comprima los PDF o reduzca su resolución.'

export const TEXTO_CORTO_MAX = 200
export const TEXTO_LARGO_MAX = 3000

export function limpiarRut(rut: string): string {
  return rut.replace(/[.\s-]/g, '').toUpperCase()
}

export function validarRut(rut: string): boolean {
  const limpio = limpiarRut(rut)
  if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false
  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)
  let suma = 0
  let factor = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor
    factor = factor === 7 ? 2 : factor + 1
  }
  const resto = 11 - (suma % 11)
  const esperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto)
  return dv === esperado
}

export function formatearRut(rut: string): string {
  const limpio = limpiarRut(rut)
  if (limpio.length < 2) return limpio
  const cuerpo = limpio.slice(0, -1).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${cuerpo}-${limpio.slice(-1)}`
}

const requerido = (campo: string) => z.string().trim().min(1, `${campo} es obligatorio`)

export const datosPersonalesSchema = z.object({
  nombre: requerido('El nombre completo').max(120, 'Máximo 120 caracteres'),
  rut: requerido('El RUT').refine(validarRut, 'RUT inválido. Revise el número y el dígito verificador'),
  email: requerido('El correo').max(160).email('Correo electrónico inválido'),
  telefono: requerido('El teléfono').regex(/^[\d\s+\-().]{8,20}$/, 'Teléfono inválido'),
  comuna: requerido('La comuna').max(80, 'Máximo 80 caracteres'),
  region: requerido('La región').max(80, 'Máximo 80 caracteres'),
  profesion: requerido('La profesión o título').max(150, 'Máximo 150 caracteres'),
  linkedin: z
    .string()
    .trim()
    .max(300)
    .refine((v) => v === '' || esUrlValida(v), 'Ingrese una URL válida (https://...)'),
  consentimiento: z.literal(true, {
    errorMap: () => ({ message: 'Debe autorizar el tratamiento de sus datos para postular' }),
  }),
})

export type DatosPersonales = z.infer<typeof datosPersonalesSchema>

function esUrlValida(v: string): boolean {
  try {
    const url = new URL(v)
    return url.protocol === 'https:' || url.protocol === 'http:'
  } catch {
    return false
  }
}

function schemaPregunta(p: Pregunta): z.ZodTypeAny {
  const vacia = p.obligatoria ? 'Esta pregunta es obligatoria' : undefined
  switch (p.tipo) {
    case 'texto_corto':
    case 'texto_largo': {
      const max = p.maxCaracteres ?? (p.tipo === 'texto_corto' ? TEXTO_CORTO_MAX : TEXTO_LARGO_MAX)
      let s = z.string().trim().max(max, `Máximo ${max} caracteres`)
      if (vacia) s = s.min(1, vacia)
      return s
    }
    case 'numero':
      return z
        .string()
        .trim()
        .refine((v) => !vacia || v !== '', vacia)
        .refine((v) => v === '' || /^\d+([.,]\d+)?$/.test(v), 'Ingrese un número válido')
    case 'fecha':
      return z
        .string()
        .trim()
        .refine((v) => !vacia || v !== '', vacia)
        .refine((v) => v === '' || /^\d{4}-\d{2}-\d{2}$/.test(v), 'Ingrese una fecha válida')
    case 'si_no':
      return z
        .string()
        .refine((v) => !vacia || v !== '', vacia)
        .refine((v) => v === '' || v === 'Sí' || v === 'No', 'Respuesta inválida')
    case 'seleccion': {
      const opciones = p.opciones ?? []
      return z
        .string()
        .refine((v) => !vacia || v !== '', vacia)
        .refine((v) => v === '' || opciones.includes(v), 'Opción inválida')
    }
    case 'seleccion_multiple': {
      const opciones = p.opciones ?? []
      return z
        .array(z.string())
        .refine((v) => !vacia || v.length > 0, 'Seleccione al menos una opción')
        .refine((v) => v.every((o) => opciones.includes(o)), 'Opción inválida')
    }
  }
}

export function respuestasSchema(preguntas: Pregunta[]) {
  return z.object(Object.fromEntries(preguntas.map((p) => [p.id, schemaPregunta(p)])))
}

export type Respuestas = Record<string, string | string[]>

// Convierte errores de zod en un mapa campo -> mensaje (primer error de cada campo).
export function erroresPorCampo(error: z.ZodError, prefijo = ''): Record<string, string> {
  const out: Record<string, string> = {}
  for (const issue of error.issues) {
    const clave = prefijo + String(issue.path[0] ?? '')
    if (!out[clave]) out[clave] = issue.message
  }
  return out
}

export function formatearBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2).replace('.', ',')} MB`
}
