import Link from 'next/link'
import ServiceCard from '@/components/ServiceCard'

const serviceLines = [
  {
    icon: '🌿',
    title: 'Gestión de Capital Natural',
    description:
      'Valoramos y monetizamos los activos naturales del territorio patagónico mediante instrumentos de mercado reconocidos internacionalmente.',
    badge: 'L1',
    items: ['Mercado de carbono', 'Economía azul', 'Financiamiento climático'],
  },
  {
    icon: '⚖️',
    title: 'Gestión Ambiental Integral',
    description:
      'Acompañamos a empresas y organismos públicos en el cumplimiento normativo ambiental con enfoque práctico y territorial.',
    badge: 'L2',
    items: ['Compliance & enforcement ambiental', 'Servicios a entidades públicas'],
  },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-secondary">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16 py-24 md:py-32">
          <div className="max-w-4xl">
            <span className="inline-block bg-primary text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Coyhaique · Región de Aysén · Chile
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
              Gestores de Capital Natural e{' '}
              <span className="text-primary">Intermediarios Ambientales Integrales</span>{' '}
              en Patagonia
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-3xl">
              Conectamos el territorio patagónico con mercados de carbono, instrumentos de
              financiamiento climático y soluciones de cumplimiento ambiental para empresas y
              organismos públicos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact" className="btn-primary text-center">
                Asesoría sin compromiso
              </Link>
              <Link href="/services" className="btn-outline text-center">
                Ver servicios
              </Link>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-primary text-white py-8">
          <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { value: '12+', label: 'Años de experiencia' },
                { value: '2', label: 'Líneas de servicio' },
                { value: '3+', label: 'Alianzas estratégicas' },
                { value: 'Aysén', label: 'Base operativa' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-3xl font-bold text-secondary">{s.value}</div>
                  <div className="text-sm opacity-80 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Líneas de servicio */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl text-dark mb-4">Nuestras Líneas de Servicio</h2>
            <p className="text-lg text-gray-500 max-w-2xl mx-auto">
              Dos áreas especializadas que cubren el ciclo completo de la gestión ambiental
              en el contexto patagónico
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {serviceLines.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary/20 transition-all duration-200"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-xl font-semibold text-dark">{s.title}</h3>
                  <span className="text-xs font-medium bg-secondary text-primary px-2.5 py-1 rounded-full">
                    {s.badge}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.description}</p>
                <ul className="space-y-2">
                  {s.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Por qué Ciclo Aysén */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-dark mb-6">
                Arraigo local con visión global
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Somos un equipo multidisciplinario basado en Coyhaique, con más de 12 años de
                experiencia en el territorio patagónico. Conocemos su normativa, sus actores y
                sus oportunidades como nadie.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Combinamos expertise técnico-ambiental con acceso a redes internacionales de
                financiamiento climático y mercados de carbono, ofreciendo soluciones concretas
                para empresas con presencia en Aysén.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: '📍', title: 'Presencia local', desc: 'Basados en Coyhaique con conocimiento profundo del territorio y sus actores.' },
                { icon: '🌐', title: 'Redes internacionales', desc: 'Alianzas con Carbon Real, NTT Data y organizaciones de financiamiento climático.' },
                { icon: '📋', title: 'Expertise regulatorio', desc: 'Profundo conocimiento de la normativa ambiental chilena y del sistema SEA/SMA.' },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-5 shadow-sm flex gap-4 items-start">
                  <div className="text-2xl">{item.icon}</div>
                  <div>
                    <h4 className="font-semibold text-dark mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="section-padding bg-primary text-white text-center">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Tu empresa opera en Aysén o Patagonia?
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Contáctanos para una asesoría inicial sin compromiso y descubre cómo podemos
            apoyarte en tus desafíos ambientales.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-secondary transition-colors duration-200"
          >
            Contáctanos ahora
          </Link>
        </div>
      </section>
    </>
  )
}
