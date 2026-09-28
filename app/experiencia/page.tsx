import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Experiencia | Ciclo Aysén SpA',
  description:
    'Trayectoria de Ciclo Aysén en la Región de Aysén y experiencia en minería de sus socios y red de especialistas: exploración, evaluación ambiental y seguimiento.',
}

const trayectoria = [
  {
    title: 'Concesiones marítimas y permisos de escasa importancia',
    desc: 'Solicitudes de concesiones marítimas y permisos de escasa importancia para empresas del sector acuícola.',
    tag: 'Sector acuícola · Región de Aysén',
  },
  {
    title: 'Consultas de pertinencia ante el SEA',
    desc: 'Consultas de pertinencia de ingreso al SEIA para proyectos en la Región de Aysén: análisis de tipologías, umbrales y efectos del artículo 11 de la Ley 19.300.',
    tag: 'Titulares privados · Región de Aysén',
  },
  {
    title: 'Capital natural y mercado del carbono',
    desc: 'Proyectos de capital natural y carbono: evaluación de predios, vinculación con propietarios y estructuración con empresas gestoras.',
    tag: 'Propietarios y gestores',
  },
  {
    title: 'Habilitación de instalaciones industriales',
    desc: 'Contratos de habilitación de instalaciones industriales, con tramitación sectorial de cada permiso habilitante.',
    tag: 'Clientes industriales',
  },
  {
    title: 'Participación ciudadana en políticas públicas',
    desc: 'Diseño y ejecución de procesos de participación ciudadana para la elaboración de políticas públicas.',
    tag: 'Sector público',
  },
  {
    title: 'Consultorías Ley de Turberas',
    desc: 'Consultorías asociadas a la Ley 21.660 sobre protección ambiental de las turberas.',
    tag: 'Sector público y privado',
  },
  {
    title: 'Defensa administrativa',
    desc: 'Defensa de clientes en sede administrativa ante servicios públicos con competencia regulatoria.',
    tag: 'Clientes regulados',
  },
  {
    title: 'Trabajo en territorio',
    desc: 'Levantamiento de información y coordinación con comunidades, organizaciones y servicios públicos en las comunas de la región.',
    tag: 'Transversal',
  },
]

const mineria = [
  {
    title: 'Exploración de tierras raras',
    desc: 'Exploración de depósitos de tierras raras para la empresa Minería Activa SpA.',
    tag: 'Yoal Díaz · Socio fundador · 2012–2013',
  },
  {
    title: 'Proyecto de prospección minera Los Domos',
    desc: 'Regularización de prospección minera en el distrito minero Cerro Bayo, Chile Chico, Región de Aysén. Desarrollo de los capítulos de hidrología, hidrogeología y SIG.',
    tag: 'Red de especialistas · 2020–2022',
  },
  {
    title: 'Proyecto de prospección minera Esperanza',
    desc: 'Prospección minera en el distrito minero Cerro Bayo, Chile Chico, Región de Aysén. Desarrollo de los capítulos de hidrología, hidrogeología y SIG.',
    tag: 'Red de especialistas · 2020–2021',
  },
  {
    title: 'Proyecto C20+ Collahuasi',
    desc: 'Seguimiento técnico de la componente paleontológica del proyecto.',
    tag: 'Red de especialistas · 2023',
  },
  {
    title: 'Patrimonio paleontológico en proyectos del SEIA',
    desc: 'Líneas de base, prospecciones, inspecciones y seguimiento paleontológico durante movimientos de tierra en más de 50 proyectos de inversión sometidos al SEIA, incluidos proyectos mineros.',
    tag: 'Red de especialistas · 2015–2022',
  },
  {
    title: 'Peligros geológicos y estabilidad de laderas',
    desc: 'Evaluación de remociones en masa y estabilidad de laderas asociadas a infraestructura en la Región de Aysén (Río Azul, Puerto Aysén, Los Maquis, El Arenal), aplicable a accesos, plataformas y campamentos de exploración.',
    tag: 'Red de especialistas · 2023–2026',
  },
]

function Card({ title, desc, tag }: { title: string; desc: string; tag: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border-t-4 border-[#B8893A]">
      <h3 className="font-bold text-[#5A7B5F] text-base md:text-lg mb-2">{title}</h3>
      <p className="text-sm text-[#4A5568] leading-relaxed mb-3">{desc}</p>
      <span className="text-xs italic text-[#7FAA6A]">{tag}</span>
    </div>
  )
}

export default function ExperienciaPage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-[#1C2B1F] py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <Image
          src="/experiencia-1.jpg"
          alt="Antigua faena minera en la Región de Aysén"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1C2B1F]/65" />
        <div className="container-max mx-auto text-center relative z-10">
          <span className="text-[#7FAA6A] text-sm font-semibold uppercase tracking-wide">Trayectoria</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">Experiencia</h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Trabajos ejecutados en la Región de Aysén y experiencia en proyectos mineros de los socios y de la red de especialistas.
          </p>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C2B1F] mb-2">Trayectoria de Ciclo Aysén</h2>
          <p className="text-[#4A5568] mb-8">Trabajos ejecutados por Ciclo Aysén en la Región de Aysén.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trayectoria.map((t) => (
              <Card key={t.title} {...t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#D4E5F0]">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C2B1F] mb-2">Experiencia en minería</h2>
          <p className="text-[#4A5568] mb-8">
            Experiencia en proyectos mineros de los socios y de profesionales de la red de especialistas de Ciclo Aysén, en etapas de exploración, evaluación ambiental y seguimiento.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mineria.map((t) => (
              <Card key={t.title} {...t} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding bg-[#1C2B1F] text-white text-center">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">¿Tiene un proyecto en la Región de Aysén?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Revisemos en conjunto sus requerimientos regulatorios y territoriales.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#7FAA6A] text-white font-bold px-8 py-4 rounded-lg hover:bg-[#6a9558] transition-colors tracking-wide"
          >
            COTIZA CON NOSOTROS
          </Link>
        </div>
      </section>
    </div>
  )
}
