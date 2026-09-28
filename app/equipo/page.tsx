import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Equipo | Ciclo Aysén SpA',
  description:
    'Socios fundadores y red de especialistas de Ciclo Aysén: geología, hidrogeología, patrimonio, biodiversidad, participación ciudadana, consulta indígena y derecho ambiental.',
}

const socios = [
  {
    initials: 'YD',
    name: 'Yoal Díaz',
    role: 'Socio fundador · Geólogo',
    items: [
      'Especialista en temáticas ambientales y geológicas.',
      'Más de 12 años de experiencia en geología, sostenibilidad y regulación ambiental.',
      'Exploración de tierras raras para Minería Activa SpA (2012–2013).',
      'Candidato a Magíster en Gestión del Cambio Climático.',
    ],
  },
  {
    initials: 'HZ',
    name: 'Hans Zimmermann',
    role: 'Socio fundador · Abogado',
    items: [
      'Especialista en derecho administrativo, ambiental y regulatorio.',
      'Magíster en Derecho Penal (Universidad de Jaén, España).',
      'Candidato a Magíster en Regulación y Litigación Pública (Universidad Austral de Chile).',
      'Diplomado en Compliance Público y Municipal (Universidad del Desarrollo).',
    ],
  },
]

const especialidades = [
  'Geología de exploración',
  'Geología de producción',
  'Profesionales con trayectoria en SERNAGEOMIN',
  'Modelamiento hidrogeológico',
  'Hidrología e hidráulica fluvial',
  'Geotecnia y mecánica de suelos y rocas',
  'Riesgos y peligros geológicos',
  'Paleontología',
  'Arqueología',
  'Flora, vegetación y fauna',
  'Limnología y calidad de aguas',
  'Ruido, contaminación lumínica y olores',
  'Participación ciudadana',
  'Consulta indígena (Convenio 169 OIT)',
  'Defensa en procedimientos sancionatorios de la administración',
  'Litigación ante Tribunales Ambientales',
  'Derecho penal económico y ambiental (Ley 21.595)',
  'Ordenamiento territorial',
  'Prevención de riesgos',
  'Planes de cierre de faenas mineras',
  'SIG y teledetección',
]

export default function EquipoPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#1C2B1F] py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <Image
          src="/equipo-1.jpg"
          alt="Cerro Castillo, Región de Aysén"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1C2B1F]/60" />
        <div className="container-max mx-auto text-center relative z-10">
          <span className="text-[#7FAA6A] text-sm font-semibold uppercase tracking-wide">Quiénes somos</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Nuestro equipo</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Socios fundadores y red de especialistas para proyectos en la Región de Aysén.
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="max-w-3xl mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1C2B1F] mb-4">Nuestra historia</h2>
            <p className="text-[#4A5568] leading-relaxed">
              Ciclo Aysén SpA fue constituida en la Región de Aysén por sus socios fundadores, Yoal Díaz y Hans
              Zimmermann, a partir de su trayectoria en geología, gestión ambiental y derecho regulatorio en el sector
              público y en el sector privado. La empresa estructura su trabajo en dos líneas: gestión ambiental
              integral, orientada al cumplimiento normativo de proyectos productivos, y gestión del capital natural,
              orientada a carbono, financiamiento climático, economía azul y biodiversidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {socios.map((s) => (
              <div key={s.name} className="bg-gray-50 rounded-2xl p-8 border-t-4 border-[#5A7B5F]">
                <div className="flex items-center gap-4 mb-5">
                  <div className="w-14 h-14 rounded-full bg-[#5A7B5F] text-white font-bold flex items-center justify-center text-lg">
                    {s.initials}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1C2B1F]">{s.name}</h3>
                    <p className="text-sm italic text-[#5A7B5F]">{s.role}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex items-start gap-2.5 text-sm text-[#4A5568] leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-[#7FAA6A] shrink-0 mt-2" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C2B1F] mb-2">Red de especialistas</h2>
          <p className="text-[#4A5568] mb-8">
            Profesionales, mayoritariamente de la Región de Aysén, que se integran a los equipos según los requerimientos
            de cada proyecto.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {especialidades.map((e) => (
              <div key={e} className="bg-white rounded-lg px-5 py-4 flex items-center gap-3 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5A7B5F] shrink-0" />
                <span className="text-sm font-semibold text-[#1C2B1F]">{e}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#1C2B1F] text-white text-center">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Conversemos sobre su proyecto</h2>
          <Link
            href="/contact"
            className="inline-block bg-[#7FAA6A] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#6a9558] transition-colors tracking-wide"
          >
            HABLEMOS
          </Link>
        </div>
      </section>
    </div>
  )
}
