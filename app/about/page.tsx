import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Quiénes Somos | Ciclo Aysén SpA',
  description: 'Equipo multidisciplinario con arraigo profundo en la Región de Aysén. Gestores de capital natural e intermediarios ambientales en Patagonia.',
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
]

export default function AboutPage() {
  return (
    <div>
      {/* Header oscuro con logo */}
      <section className="bg-[#1C2B1F] py-20 px-4 md:px-8 lg:px-16">
        <div className="container-max mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="flex-1">
              <span className="text-[#7FAA6A] text-sm font-semibold uppercase tracking-wide">Quiénes somos</span>
              <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">
                Arraigo local,<br />visión global
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-xl">
                Somos un equipo multidisciplinario basado en Coyhaique, con más de 12 años
                de experiencia en el territorio patagónico. Conocemos su normativa, sus actores
                y sus oportunidades de sostenibilidad como nadie.
              </p>
            </div>
            <div className="shrink-0">
              <Image
                src="/logo.png"
                alt="Ciclo Aysén SpA"
                width={260}
                height={260}
                className="w-44 h-44 md:w-64 md:h-64 object-contain"
                style={{ mixBlendMode: 'screen' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visión */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-dark mb-6">Nuestra visión</h2>
            <p className="text-xl text-gray-600 leading-relaxed mb-6">
              "Valorizamos capital natural a través de soluciones innovadoras que integran
              territorio, normativa y sostenibilidad."
            </p>
            <p className="text-gray-500 leading-relaxed">
              Creemos que los ecosistemas patagónicos representan un activo estratégico de valor
              global. Nuestra misión es conectar ese capital natural con mercados, instrumentos
              financieros y marcos regulatorios que permitan su valorización justa y sostenible,
              generando beneficios concretos para las comunidades, empresas y organizaciones
              que habitan y trabajan en la región.
            </p>
          </div>
        </div>
      </section>

      {/* NATURALEZA — franja bosque nativo */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src="/naturaleza-2.jpeg"
          alt="Bosque nativo patagónico — Región de Aysén"
          fill
          className="object-cover object-bottom"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1C2B1F]/50" />
      </section>

      {/* Equipo */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-dark mb-4">Nuestro equipo</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Profesionales con expertise complementario y compromiso con el territorio patagónico
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {team.map((member) => (
              <div key={member.name} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="w-16 h-16 bg-[#5A7B5F] rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                  {member.initials}
                </div>
                <h3 className="text-lg font-bold text-dark">{member.name}</h3>
                <p className="text-[#7FAA6A] font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{member.bio}</p>
                <div className="flex flex-wrap gap-2">
                  {member.expertise.map((tag) => (
                    <span key={tag} className="text-xs bg-[#D4E5F0] text-[#5A7B5F] px-2.5 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#1C2B1F] text-white text-center">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl font-bold mb-4">¿Quieres conocernos más?</h2>
          <p className="text-gray-300 mb-6">Escríbenos y conversemos sobre cómo podemos trabajar juntos.</p>
          <Link
            href="/contact"
            className="inline-block bg-[#5A7B5F] text-white font-semibold px-8 py-3.5 rounded-lg hover:bg-[#4a6a4f] transition-colors"
          >
            Contáctanos
          </Link>
        </div>
      </section>
    </div>
  )
}
