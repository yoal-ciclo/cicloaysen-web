import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-secondary">
      <div className="container-max mx-auto px-4 md:px-8 lg:px-16 py-20 md:py-28">
        <div className="max-w-3xl">
          <span className="inline-block bg-primary text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            Coyhaique · Región de Aysén
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-dark leading-tight mb-6">
            Consultoría ambiental
            <span className="text-primary block">para la Patagonia</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl">
            Apoyamos a organizaciones y empresas en gestión ambiental, evaluación de riesgos
            y sustentabilidad, con profundo conocimiento del territorio patagónico.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn-primary text-center">
              Contáctanos
            </Link>
            <Link href="/services" className="btn-outline text-center">
              Ver servicios
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-primary text-white py-8">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: '12+', label: 'Años de experiencia' },
              { value: '100%', label: 'Enfoque regional' },
              { value: '3', label: 'Áreas de expertise' },
              { value: 'Aysén', label: 'Base operativa' },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-bold text-secondary">{stat.value}</div>
                <div className="text-sm opacity-80 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
