import Link from 'next/link'
import Image from 'next/image'

const serviceLines = [
  {
    icon: '🌿',
    label: 'L1',
    title: 'Gestión del Capital Natural',
    items: [
      '1.1. Desarrolladores de proyectos de mercado del carbono',
      '1.2. Incubadores de financiamiento climático',
      '1.3. Desarrollo de Economía azul',
    ],
  },
  {
    icon: '⚖️',
    label: 'L2',
    title: 'Gestión Ambiental Integral',
    items: [
      '2.1. Asesoría en compliance ambiental y legislativo para empresas y sectores productivos regulados y no regulados',
      '2.2. Servicios profesionales de consultoría y prestación de servicios a entidades públicas',
    ],
  },
]

export default function Home() {
  return (
    <>
      {/* HERO — fondo fotográfico con overlay */}
      <section className="relative overflow-hidden min-h-[600px] md:min-h-[680px] flex items-center bg-[#1C2B1F]">
        {/* Imagen de portada */}
        <Image
          src="/portada-patagonia.jpg"
          alt="Patagonia Chilena — Región de Aysén"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Overlay oscuro rgba(0,0,0,0.4) */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Contenido sobre el overlay */}
        <div className="relative z-10 w-full">
          <div className="container-max mx-auto px-4 md:px-8 lg:px-16 py-16 md:py-24">
            <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16">

              {/* Texto */}
              <div className="flex-1 min-w-0">
                <span className="inline-block border border-[#7FAA6A]/60 text-[#7FAA6A] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                  Región de Aysén, Patagonia Chilena
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                  Gestores de Capital Natural e{' '}
                  <span className="text-[#7FAA6A]">Intermediarios Ambientales Integrales</span>{' '}
                  en Patagonia
                </h1>
                <p className="text-gray-200 text-lg leading-relaxed mb-10 max-w-xl">
                  Trabajamos con personas, empresas y organizaciones sociales de la región.
                  Desarrollamos procesos de sostenibilidad a diferentes escalas, protegiendo
                  el valor integral de la naturaleza y equilibrándolo con el desarrollo de
                  los sectores productivos.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/contact"
                    className="bg-[#5A7B5F] text-white font-bold px-8 py-3.5 rounded-lg hover:bg-[#4a6a4f] transition-colors text-center tracking-wide"
                  >
                    HABLEMOS
                  </Link>
                  <Link
                    href="/contact"
                    className="border-2 border-[#7FAA6A] text-white font-bold px-8 py-3.5 rounded-lg hover:bg-[#7FAA6A]/20 transition-colors text-center tracking-wide"
                  >
                    COTIZA CON NOSOTROS
                  </Link>
                </div>
              </div>

              {/* Logo */}
              <div className="shrink-0 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Ciclo Aysén SpA — Consultores"
                  width={380}
                  height={380}
                  priority
                  className="w-52 h-52 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 object-contain drop-shadow-2xl"
                  style={{ mixBlendMode: 'screen' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Separador sutil */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#5A7B5F]/60 to-transparent z-10" />
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
                  href="/contact"
                  className="inline-block mt-6 text-sm font-medium text-[#5A7B5F] hover:underline"
                >
                  Contáctanos →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NATURALEZA — franja fotográfica con cita */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="/naturaleza-1.jpeg"
          alt="Lenga patagónica en otoño — Región de Aysén"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1C2B1F]/65 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <p className="text-xl md:text-3xl font-semibold text-white leading-relaxed italic">
              "Desarrollamos procesos de sostenibilidad a diferentes escalas, protegiendo
              el valor integral de la naturaleza y equilibrándolo con el desarrollo de
              los sectores productivos."
            </p>
            <span className="inline-block mt-5 text-[#7FAA6A] text-sm tracking-wide">
              Región de Aysén, Patagonia Chilena
            </span>
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
            className="inline-block bg-[#5A7B5F] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#4a6a4f] transition-colors tracking-wide"
          >
            HABLEMOS
          </Link>
        </div>
      </section>
    </>
  )
}
// Updated 2026-06-02
