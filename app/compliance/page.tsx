import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Compliance | Ciclo Aysén SpA',
  description:
    'Política de Compliance y Sostenibilidad Ambiental de Ciclo Aysén SpA. Principios de legalidad, integridad ambiental, independencia y compromiso con la sostenibilidad en la Patagonia chilena.',
}

const principios = [
  {
    icon: '⚖️',
    title: 'Legalidad y diligencia debida',
    text: 'Actuamos siempre dentro del marco legal vigente, verificando con diligencia el cumplimiento normativo de los proyectos, procesos y clientes que asesoramos, y absteniéndonos de participar en operaciones cuya licitud no pueda ser razonablemente verificada.',
  },
  {
    icon: '🌱',
    title: 'Integridad ambiental',
    text: 'Nuestras recomendaciones se fundan en evidencia y en el mejor estándar técnico disponible. No promovemos ni avalamos prácticas de greenwashing, sobreestimación de líneas base de carbono, o cualquier forma de representación ambiental engañosa.',
  },
  {
    icon: '🧭',
    title: 'Independencia y gestión de conflictos de interés',
    text: 'Identificamos y gestionamos activamente los conflictos de interés que puedan surgir del ejercicio simultáneo de asesorías a distintos actores, priorizando la transparencia y, cuando corresponda, absteniéndonos de intervenir.',
  },
  {
    icon: '🔒',
    title: 'Confidencialidad y protección de datos',
    text: 'Resguardamos la confidencialidad de la información técnica, comercial y personal de nuestros clientes y de las comunidades con las que trabajamos, conforme a la Ley N° 19.628 y a los acuerdos de confidencialidad suscritos en cada mandato.',
  },
  {
    icon: '🔄',
    title: 'Precaución y mejora continua',
    text: 'Aplicamos el principio precautorio en los análisis de riesgo ambiental y revisamos periódicamente nuestros procedimientos, metodologías y capacidades técnicas, incorporando avances normativos, científicos y de mercado.',
  },
  {
    icon: '🏔️',
    title: 'Pertinencia territorial e indígena',
    text: 'Reconocemos la relevancia de los procesos de participación ciudadana y consulta indígena en los territorios donde operamos, y promovemos su ejercicio oportuno, informado y de buena fe.',
  },
]

const compromisos = [
  'Minimizar la huella de carbono de nuestra operación, priorizando el trabajo remoto, la digitalización de expedientes y la reducción de desplazamientos innecesarios.',
  'Privilegiar el uso de proveedores y contrapartes locales de la Región de Aysén, fortaleciendo cadenas de valor regionales.',
  'Evaluar y, cuando sea pertinente, compensar la huella de carbono corporativa a través de proyectos de conservación o de mercado de carbono desarrollados en la propia región.',
  'Reducir el uso de papel, priorizando la gestión documental digital en informes, contratos y expedientes regulatorios.',
  'Incorporar criterios de sostenibilidad ambiental y social en la selección de proyectos y clientes, evitando prestar servicios a iniciativas cuyo objeto sea eludir o debilitar la normativa ambiental.',
  'Fomentar la capacitación continua de nuestro equipo en cambio climático, economía azul, mercados de carbono y regulación ambiental comparada.',
  'Reportar de manera transparente, cuando corresponda contractualmente, los avances de sostenibilidad de los proyectos que gestionamos.',
]

const normativa = [
  'Ley N° 19.300, sobre Bases Generales del Medio Ambiente, y sus modificaciones.',
  'Ley N° 20.417, que crea el Ministerio del Medio Ambiente, el SEA y la SMA.',
  'Sistema de Evaluación de Impacto Ambiental (SEIA) y su reglamento (DIA/EIA).',
  'Ley N° 21.455, Marco de Cambio Climático, y sus instrumentos de gestión climática.',
  'Ley N° 20.600, que crea los Tribunales Ambientales, y la normativa de fiscalización y sanción ambiental de la SMA.',
  'Ley N° 20.393, sobre responsabilidad penal de las personas jurídicas.',
  'Convenio N° 169 de la OIT sobre pueblos indígenas y tribales.',
  'Acuerdo de Escazú y Acuerdo de París.',
  'Estándares voluntarios de mercados de carbono (Verra/VCS, Gold Standard) y normativa nacional sobre derecho real de conservación (DRC).',
]

export default function CompliancePage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-[#1C2B1F] py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <div className="container-max mx-auto text-center">
          <span className="text-[#7FAA6A] text-sm font-semibold uppercase tracking-wide">
            Transparencia y compromiso
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
            Política de Compliance y Sostenibilidad Ambiental
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
            Versión 1.0 · Vigencia: julio de 2026
          </p>
        </div>
      </section>

      {/* Presentación */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">Nuestro compromiso</h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Ciclo Aysén SpA es una consultora ambiental nacida y arraigada en la Región de
            Aysén, dedicada a la gestión del capital natural y a la intermediación ambiental
            integral en la Patagonia chilena. Esta política establece los principios,
            compromisos y mecanismos de compliance y de sostenibilidad ambiental que rigen
            nuestra actuación, tanto en la prestación de servicios a terceros como en
            nuestra propia operación interna.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Su publicación responde a nuestro compromiso de transparencia y a la convicción
            de que la exigencia ambiental, ejercida con rigor técnico, es una vía legítima
            de desarrollo sostenible para la Patagonia. Aplica a los socios, colaboradores,
            asesores externos y representantes de Ciclo Aysén SpA, y a todas nuestras
            líneas de servicio.
          </p>
        </div>
      </section>

      {/* Principios */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-10 text-center">
            Principios de actuación
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {principios.map((p) => (
              <div key={p.title} className="bg-white rounded-2xl border border-gray-100 p-6">
                <span className="text-3xl block mb-3">{p.icon}</span>
                <h3 className="font-bold text-[#5A7B5F] mb-3">{p.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compromisos de sostenibilidad */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-dark mb-6">
            Sostenibilidad en nuestra propia operación
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            La sostenibilidad ambiental no es solo materia de nuestros servicios: es un
            compromiso que asumimos como empresa. Ciclo Aysén se compromete a:
          </p>
          <ul className="space-y-3">
            {compromisos.map((c) => (
              <li key={c} className="flex items-start gap-3 text-gray-600 text-sm leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7FAA6A] shrink-0 mt-2" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* NATURALEZA — franja fotográfica */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="/naturaleza-3.jpeg"
          alt="Naturaleza de la Región de Aysén, Patagonia Chilena"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1C2B1F]/50 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <p className="text-xl md:text-3xl font-semibold text-white leading-relaxed italic">
              "La exigencia ambiental, ejercida con rigor técnico, es una vía legítima de
              desarrollo sostenible para la Patagonia."
            </p>
            <span className="inline-block mt-5 text-[#7FAA6A] text-sm tracking-wide">
              Región de Aysén, Patagonia Chilena
            </span>
          </div>
        </div>
      </section>

      {/* Marco normativo */}
      <section className="section-padding bg-[#D4E5F0]">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1C2B1F] mb-6">
            Marco normativo de referencia
          </h2>
          <p className="text-[#4A5568] leading-relaxed mb-6 text-sm">
            Nuestro ejercicio profesional se sujeta, entre otros, a los siguientes cuerpos
            normativos e instrumentos, cuya vigencia y evolución revisamos periódicamente:
          </p>
          <ul className="space-y-3">
            {normativa.map((n) => (
              <li key={n} className="flex items-start gap-3 text-[#4A5568] text-sm leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#5A7B5F] shrink-0 mt-2" />
                {n}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Canal de reporte */}
      <section className="section-padding bg-[#1C2B1F] text-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16 max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Canal de reporte y consultas</h2>
          <p className="text-gray-300 leading-relaxed mb-8 max-w-2xl mx-auto">
            Cualquier persona que detecte una conducta contraria a esta política, un
            conflicto de interés no declarado o un incumplimiento normativo asociado a
            nuestra actuación, puede reportarlo. Los reportes serán tratados con
            confidencialidad y Ciclo Aysén no tolera represalias contra quienes reporten
            de buena fe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:contacto@cicloaysen.com"
              className="bg-[#5A7B5F] text-white font-bold px-8 py-3.5 rounded-lg hover:bg-[#4a6a4f] transition-colors tracking-wide"
            >
              contacto@cicloaysen.com
            </a>
            <a
              href="tel:+56987465044"
              className="border-2 border-[#7FAA6A] text-white font-bold px-8 py-3.5 rounded-lg hover:bg-[#7FAA6A]/20 transition-colors tracking-wide"
            >
              +56 9 8746 5044
            </a>
          </div>
          <p className="text-gray-400 text-sm mt-10">
            Esta política será revisada al menos una vez al año, o ante cambios normativos
            relevantes en materia ambiental, de cambio climático o de mercados de carbono.
          </p>
          <Link href="/services" className="inline-block mt-6 text-[#7FAA6A] text-sm hover:underline">
            Conoce nuestros servicios de Compliance y Enforcement Ambiental →
          </Link>
        </div>
      </section>
    </div>
  )
}
