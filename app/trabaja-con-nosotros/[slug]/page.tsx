import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import FormularioPostulacion from '@/components/FormularioPostulacion'
import { estaCerrado, formatearFecha, getEmpleo, getEmpleos } from '@/lib/empleos'

export const revalidate = 3600
export const dynamicParams = false

export function generateStaticParams() {
  return getEmpleos().map((e) => ({ slug: e.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const empleo = getEmpleo(params.slug)
  if (!empleo) return {}
  return {
    title: `${empleo.titulo} | Trabaja con nosotros`,
    description: empleo.resumen,
    robots: estaCerrado(empleo) ? { index: false, follow: true } : undefined,
  }
}

function Lista({ titulo, items }: { titulo: string; items: string[] }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-[#1C2B1F] mb-3">{titulo}</h2>
      <ul className="space-y-2">
        {items.map((it) => (
          <li key={it} className="flex items-start gap-2.5 text-[#4A5568] leading-relaxed">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7FAA6A] shrink-0 mt-2.5" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function EmpleoPage({ params }: { params: { slug: string } }) {
  const empleo = getEmpleo(params.slug)
  if (!empleo) notFound()
  const cerrado = estaCerrado(empleo)

  const datos = [
    { label: 'Ubicación', valor: empleo.ubicacion },
    { label: 'Modalidad', valor: empleo.modalidad },
    { label: 'Jornada', valor: empleo.jornada },
    { label: 'Publicación', valor: formatearFecha(empleo.fechaPublicacion) },
    ...(empleo.fechaCierre ? [{ label: 'Cierre de postulaciones', valor: formatearFecha(empleo.fechaCierre) }] : []),
  ]

  return (
    <div>
      <section className="bg-[#1C2B1F] py-12 md:py-16 px-4 md:px-8 lg:px-16">
        <div className="container-max mx-auto">
          <Link href="/trabaja-con-nosotros" className="text-sm text-gray-300 hover:text-[#7FAA6A] transition-colors">
            ← Volver a Trabaja con nosotros
          </Link>
          <div className="flex flex-wrap items-center gap-3 mt-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{empleo.titulo}</h1>
            <span
              className={`text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${
                cerrado ? 'bg-gray-200 text-[#4A5568]' : 'bg-[#7FAA6A] text-white'
              }`}
            >
              {cerrado ? 'Cerrado' : 'Abierto'}
            </span>
          </div>
          <dl className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
            {datos.map((d) => (
              <div key={d.label}>
                <dt className="text-gray-400">{d.label}</dt>
                <dd className="text-white font-medium">{d.valor}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max mx-auto grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-12">
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              {empleo.descripcion.map((p) => (
                <p key={p} className="text-[#4A5568] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
            <Lista titulo="Funciones" items={empleo.funciones} />
            <Lista titulo="Requisitos" items={empleo.requisitos} />
            {empleo.deseables && empleo.deseables.length > 0 && <Lista titulo="Deseables" items={empleo.deseables} />}
          </div>

          <aside className="lg:col-span-2" aria-labelledby="postular">
            <div className="bg-gray-50 rounded-2xl p-6 md:p-8 lg:sticky lg:top-24">
              <h2 id="postular" className="text-2xl font-bold text-[#1C2B1F] mb-2">
                Postular
              </h2>
              {cerrado ? (
                <p className="text-[#4A5568] leading-relaxed">
                  Este proceso de selección está cerrado. Puede revisar otros cargos en{' '}
                  <Link href="/trabaja-con-nosotros" className="font-semibold text-[#5A7B5F] hover:underline">
                    Trabaja con nosotros
                  </Link>{' '}
                  o enviarnos su CV a{' '}
                  <a href="mailto:contacto@cicloaysen.com" className="font-semibold text-[#5A7B5F] hover:underline">
                    contacto@cicloaysen.com
                  </a>
                  .
                </p>
              ) : (
                <>
                  <p className="text-sm text-[#4A5568] mb-6">
                    Complete el formulario y adjunte su CV y sus títulos o grados en PDF.
                  </p>
                  <FormularioPostulacion slug={empleo.slug} tituloCargo={empleo.titulo} preguntas={empleo.preguntas} />
                </>
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  )
}
