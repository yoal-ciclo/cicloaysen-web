import Link from 'next/link'
import Image from 'next/image'

const serviceLines = [
  {
    icon: '🌿',
    label: 'L1',
    title: 'Gestión del Capital Natural',
    items: [
      'Desarrollo de proyectos de carbono',
      'Iniciativas de economía azul y recursos costeros',
      'Estructuración de financiamiento climático',
      'Asesoría en uso sostenible de recursos naturales',
    ],
  },
  {
    icon: '⚖️',
    label: 'L2',
    title: 'Gestión Ambiental Integral',
    items: [
      'Compliance ambiental con altos estándares',
      'Asesoría en regulación ambiental',
      'Servicios especializados a entidades públicas',
      'Profesionalización de procesos ambientales',
    ],
  },
]

export default function Home() {
  return (
    <>
      {/* HERO — dark, logo prominente */}
      <section className="bg-[#1C2B1F] relative overflow-hidden">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

            {/* Texto */}
            <div className="flex-1 min-w-0">
              <span className="inline-block border border-[#7FAA6A]/40 text-[#7FAA6A] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                Coyhaique · Región de Aysén · Patagonia Chilena
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Gestores de Capital Natural e{' '}
                <span className="text-[#7FAA6A]">Intermediarios Ambientales Integrales</span>{' '}
                en Patagonia
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed mb-10 max-w-xl">
                Trabajamos con personas, empresas y organizaciones sociales de la región.
                Desarrollamos procesos de sostenibilidad a diferentes escalas, protegiendo
                el valor integral de la naturaleza con altos estándares ambientales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/contact"
                  className="bg-[#5A7B5F] text-white font-semibold px-7 py-3.5 rounded-lg hover:bg-[#4a6a4f] transition-colors text-center"
                >
                  Asesoría sin compromiso
                </Link>
                <Link
                  href="/services"
                  className="border border-[#7FAA6A]/50 text-[#7FAA6A] font-semibold px-7 py-3.5 rounded-lg hover:bg-[#7FAA6A]/10 transition-colors text-center"
                >
                  Ver servicios
                </Link>
              </div>
            </div>

            {/* Logo en alta calidad */}
            <div className="shrink-0 flex items-center justify-center">
              <Image
                src="/logo.png"
                alt="Ciclo Aysén SpA — Consultores"
                width={380}
                height={380}
                priority
                className="w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
          </div>
        </div>

        {/* Separador sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5A7B5F]/40 to-transparent" />
      </section>

      {/* LÍNEAS DE SERVICIO */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">Nuestras Líneas de Servicio</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Dos áreas complementarias que cubren el ciclo completo de la gestión ambiental en el contexto patagónico
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {serviceLines.map((s) => (
              <div
                key={s.title}
                className="rounded-2xl border border-gray-100 p-8 hover:shadow-md hover:border-[#5A7B5F]/20 transition-all duration-200"
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{s.icon}</span>
                  <div>
                    <span className="text-xs font-semibold text-[#7FAA6A] uppercase tracking-wide">
                      Línea {s.label}
                    </span>
                    <h3 className="text-xl font-bold text-dark">{s.title}</h3>
                  </div>
                </div>
                <ul className="space-y-3">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7FAA6A] shrink-0 mt-1.5" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/services"
                  className="inline-block mt-6 text-sm font-medium text-[#5A7B5F] hover:underline"
                >
                  Ver detalle →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section-padding bg-[#1C2B1F] text-white text-center">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Tu organización opera en Aysén o Patagonia?
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Contáctanos para una asesoría inicial sin compromiso y descubre cómo podemos
            apoyarte en tus desafíos ambientales.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#5A7B5F] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#4a6a4f] transition-colors"
          >
            Contáctanos ahora
          </Link>
        </div>
      </section>
    </>
  )
}
