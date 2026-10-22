import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { estaCerrado, formatearFecha, getEmpleos } from '@/lib/empleos'

export const metadata: Metadata = {
  title: 'Trabaja con nosotros',
  description:
    'Ofertas laborales de Ciclo Aysén SpA, empresa ambiental de la Región de Aysén. Postule en línea con su CV y antecedentes.',
}

// Revalida cada hora para que los cargos con fecha de cierre vencida pasen a "Cerrado".
export const revalidate = 3600

export default function TrabajaConNosotrosPage() {
  const empleos = getEmpleos()
  const hayAbiertos = empleos.some((e) => !estaCerrado(e))

  return (
    <div>
      <section className="relative overflow-hidden bg-[#1C2B1F] py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <Image
          src="/naturaleza-2.jpeg"
          alt="Paisaje de la Región de Aysén, Patagonia Chilena"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1C2B1F]/60" />
        <div className="container-max mx-auto text-center relative z-10">
          <span className="text-[#7FAA6A] text-sm font-semibold uppercase tracking-wide">Empleos</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Trabaja con nosotros</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Buscamos profesionales para proyectos ambientales en la Región de Aysén. Priorizamos la contratación de
            profesionales de la región e incorporamos la perspectiva de género en nuestros procesos de selección.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C2B1F] mb-8">Procesos de selección</h2>

          {!hayAbiertos && (
            <div className="bg-[#D4E5F0] rounded-2xl p-8 mb-8 text-[#1C2B1F] leading-relaxed">
              Por ahora no tenemos procesos abiertos. Puede enviarnos su CV a{' '}
              <a href="mailto:contacto@cicloaysen.com" className="font-semibold text-[#5A7B5F] hover:underline">
                contacto@cicloaysen.com
              </a>{' '}
              para futuras oportunidades.
            </div>
          )}

          {empleos.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {empleos.map((e) => {
                const cerrado = estaCerrado(e)
                return (
                  <article
                    key={e.slug}
                    className={`bg-white rounded-2xl p-6 md:p-8 shadow-sm border-t-4 flex flex-col ${
                      cerrado ? 'border-gray-300' : 'border-[#5A7B5F]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className={`text-xl font-bold ${cerrado ? 'text-[#4A5568]' : 'text-[#1C2B1F]'}`}>{e.titulo}</h3>
                      <span
                        className={`shrink-0 text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                          cerrado ? 'bg-gray-200 text-[#4A5568]' : 'bg-[#7FAA6A]/15 text-[#5A7B5F]'
                        }`}
                      >
                        {cerrado ? 'Cerrado' : 'Abierto'}
                      </span>
                    </div>
                    <p className="text-sm text-[#4A5568] leading-relaxed mb-5">{e.resumen}</p>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm mb-6">
                      <div className="col-span-2">
                        <dt className="text-gray-500">Ubicación</dt>
                        <dd className="font-medium text-[#1C2B1F]">{e.ubicacion}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Modalidad</dt>
                        <dd className="font-medium text-[#1C2B1F]">{e.modalidad}</dd>
                      </div>
                      <div>
                        <dt className="text-gray-500">Jornada</dt>
                        <dd className="font-medium text-[#1C2B1F]">{e.jornada}</dd>
                      </div>
                      {e.fechaCierre && (
                        <div className="col-span-2">
                          <dt className="text-gray-500">Cierre de postulaciones</dt>
                          <dd className="font-medium text-[#1C2B1F]">{formatearFecha(e.fechaCierre)}</dd>
                        </div>
                      )}
                    </dl>
                    <Link
                      href={`/trabaja-con-nosotros/${e.slug}`}
                      className={`mt-auto text-center ${cerrado ? 'btn-outline' : 'btn-primary'}`}
                    >
                      {cerrado ? 'Ver cargo' : 'Ver cargo y postular'}
                    </Link>
                  </article>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
