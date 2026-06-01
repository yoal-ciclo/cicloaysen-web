import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sobre Nosotros | Ciclo Aysén SpA',
  description: 'Conoce al equipo de Ciclo Aysén SpA: gestores de capital natural e intermediarios ambientales en la Patagonia chilena.',
}

const team = [
  {
    name: 'Yoal Díaz',
    role: 'Director & Geólogo Ambiental',
    bio: 'Geólogo con más de 12 años de experiencia en gestión ambiental y sostenibilidad en la Patagonia. Ex Seremi de Medio Ambiente de la Región de Aysén.',
    expertise: ['Geología ambiental', 'Regulación ambiental', 'Sostenibilidad'],
    initials: 'YD',
  },
  {
    name: 'Hans Zimmermann',
    role: 'Especialista en Carbono & Legal',
    bio: 'Experto en mercados de carbono, derecho ambiental y financiamiento climático. Lidera la línea de gestión de capital natural de la empresa.',
    expertise: ['Mercado de carbono', 'Derecho ambiental', 'Financiamiento climático'],
    initials: 'HZ',
  },
  {
    name: 'Pablo Azúa',
    role: 'Consultor Senior',
    bio: 'Especialista en consultoría ambiental y gestión de proyectos con amplia experiencia trabajando con empresas y organismos públicos en Aysén.',
    expertise: ['Consultoría ambiental', 'Gestión de proyectos', 'Sector público'],
    initials: 'PA',
  },
]

const alliances = [
  {
    name: 'Carbon Real',
    description: 'Alianza estratégica para el desarrollo y comercialización de proyectos de carbono en la Patagonia.',
  },
  {
    name: 'NTT Data',
    description: 'Colaboración en soluciones tecnológicas para la gestión ambiental y análisis de datos territoriales.',
  },
  {
    name: 'Municipalidades de Aysén',
    description: 'Relaciones institucionales con municipios de la región para proyectos de sustentabilidad local.',
  },
]

export default function AboutPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-secondary section-padding">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">Sobre Nosotros</h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Somos un equipo con arraigo profundo en el territorio patagónico, convencidos de que
            la valorización del capital natural es la clave para un desarrollo económico sostenible.
          </p>
        </div>
      </section>

      {/* Visión */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-semibold text-sm uppercase tracking-wide">Nuestra visión</span>
              <h2 className="text-3xl font-bold text-dark mt-2 mb-6">
                Valorizamos capital natural a través de soluciones innovadoras
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5">
                En Ciclo Aysén creemos que los ecosistemas patagónicos representan un activo
                estratégico de valor global. Nuestra misión es conectar ese capital natural
                con mercados, instrumentos financieros y marcos regulatorios que permitan
                su valorización justa y sostenible.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Operamos desde Coyhaique con más de 12 años de experiencia acumulada en
                la región, combinando conocimiento técnico-científico con acceso a redes
                internacionales de financiamiento climático.
              </p>
            </div>
            <div className="bg-secondary rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { value: '12+', label: 'Años de experiencia' },
                  { value: '2020', label: 'Fundación' },
                  { value: '2', label: 'Líneas de servicio' },
                  { value: 'Aysén', label: 'Base operativa' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="text-3xl font-bold text-primary mb-1">{item.value}</div>
                    <div className="text-sm text-gray-500">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Nuestro Equipo</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Profesionales con expertise complementario y compromiso con el territorio patagónico
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  {member.initials}
                </div>
                <h3 className="text-lg font-semibold text-dark">{member.name}</h3>
                <p className="text-accent font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-secondary text-primary px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alianzas */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Alianzas Estratégicas</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Colaboramos con organizaciones que amplían nuestras capacidades y alcance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {alliances.map((ally) => (
              <div key={ally.name} className="border border-gray-200 rounded-xl p-6 hover:border-primary/30 hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-xl mb-4">
                  🤝
                </div>
                <h3 className="font-semibold text-dark mb-2">{ally.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{ally.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
