import type { Metadata } from 'next'
import Link from 'next/link'
import ServiceAccordion from '@/components/ServiceAccordion'

export const metadata: Metadata = {
  title: 'Servicios | Ciclo Aysén SpA',
  description: 'Gestión del capital natural y gestión ambiental integral para personas, empresas y organizaciones en la Región de Aysén, Patagonia.',
}

const l1Services = [
  {
    title: 'Desarrollo de proyectos de carbono',
    summary: 'Diseñamos y gestionamos proyectos de reducción y captura de emisiones para acceder a mercados voluntarios e institucionales de carbono en el contexto patagónico.',
    details: [
      'Identificación y evaluación de elegibilidad de proyectos en territorio de Aysén',
      'Formulación bajo estándares internacionales (Verra VCS, Gold Standard)',
      'Gestión de validación y verificación con auditores acreditados',
      'Comercialización de créditos de carbono en mercados voluntarios',
      'Monitoreo, reporte y verificación (MRV) de reducciones',
    ],
  },
  {
    title: 'Iniciativas de economía azul y recursos costeros',
    summary: 'Acompañamos el desarrollo de actividades productivas marinas y costeras que integran la conservación del capital natural marino de la Patagonia.',
    details: [
      'Diagnóstico de activos naturales marinos y costeros de la región',
      'Diseño de modelos de negocio alineados con principios de economía azul',
      'Vinculación con instrumentos de financiamiento azul nacionales e internacionales',
      'Gestión de permisos ambientales para actividades costeras y acuícolas',
      'Reportes de sostenibilidad marina para empresas del sector',
    ],
  },
  {
    title: 'Estructuración de financiamiento climático',
    summary: 'Conectamos proyectos locales con fondos y mecanismos de financiamiento climático nacionales e internacionales, facilitando el acceso a recursos para la sostenibilidad.',
    details: [
      'Identificación de fondos climáticos aplicables (GCF, BID, CAF, CORFO, FPA)',
      'Formulación de perfiles de proyecto y cartas de intención',
      'Elaboración de propuestas completas de financiamiento',
      'Gestión de relaciones con organismos y ventanillas financiadoras',
      'Seguimiento y rendición de cuentas de proyectos financiados',
    ],
  },
  {
    title: 'Asesoría en uso sostenible de recursos naturales',
    summary: 'Apoyamos a organizaciones y comunidades en la planificación y gestión de sus recursos naturales bajo criterios de sostenibilidad ambiental y social.',
    details: [
      'Diagnósticos de capital natural y servicios ecosistémicos',
      'Planes de manejo y uso sostenible de recursos',
      'Valorización económica de servicios ambientales',
      'Asesoría a comunidades en negociación con sector privado',
      'Diseño de esquemas de pago por servicios ambientales (PSA)',
    ],
  },
]

const l2Services = [
  {
    title: 'Compliance ambiental con altos estándares',
    summary: 'Apoyamos a empresas en el cumplimiento integral de sus obligaciones ambientales, reduciendo riesgos regulatorios y reputacionales con un enfoque proactivo.',
    details: [
      'Diagnóstico de brechas de cumplimiento ambiental (gap analysis)',
      'Elaboración y actualización de planes de cumplimiento de RCA',
      'Representación ante la Superintendencia de Medio Ambiente (SMA)',
      'Gestión de procesos de fiscalización y respuesta a denuncias',
      'Monitoreo continuo de condiciones y compromisos ambientales',
      'Capacitación interna en normativa ambiental vigente',
    ],
  },
  {
    title: 'Asesoría en regulación ambiental',
    summary: 'Orientamos a empresas y organizaciones en la interpretación y aplicación de la normativa ambiental chilena, con foco en las particularidades de la Región de Aysén.',
    details: [
      'Análisis de marco legal aplicable a proyectos y actividades',
      'Elaboración de DGA, estudios de impacto y declaraciones ambientales',
      'Asesoría en procesos ante el SEA y otros organismos sectoriales',
      'Seguimiento de cambios regulatorios relevantes para el sector',
      'Revisión previa a ingreso al Sistema de Evaluación de Impacto Ambiental',
    ],
  },
  {
    title: 'Servicios especializados a entidades públicas',
    summary: 'Brindamos asesoría técnica especializada a municipios, servicios públicos y organismos regionales en materias ambientales y de sostenibilidad.',
    details: [
      'Planes de gestión ambiental comunal y estrategias de sostenibilidad local',
      'Estudios de riesgo de desastres y planificación territorial',
      'Asesoría en licitaciones y bases técnicas de servicios ambientales',
      'Apoyo en evaluación de proyectos en el SNIP/BIP con componente ambiental',
      'Elaboración de informes técnicos para organismos sectoriales',
    ],
  },
  {
    title: 'Profesionalización de procesos ambientales',
    summary: 'Apoyamos a organizaciones a instalar capacidades internas en gestión ambiental, logrando procesos más robustos, eficientes y alineados con estándares internacionales.',
    details: [
      'Diseño de sistemas de gestión ambiental adaptados a la organización',
      'Formación y capacitación de equipos internos',
      'Desarrollo de procedimientos, protocolos e instrumentos de seguimiento',
      'Acompañamiento en procesos de certificación ambiental',
      'Evaluación y mejora continua de desempeño ambiental',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Header oscuro */}
      <section className="bg-[#1C2B1F] section-padding">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <span className="text-[#7FAA6A] text-sm font-semibold uppercase tracking-wide">Lo que hacemos</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-2 mb-6">Servicios</h1>
          <p className="text-gray-300 text-xl max-w-3xl leading-relaxed">
            Dos líneas de servicio complementarias para personas, empresas y organizaciones
            que trabajan con el territorio patagónico y sus recursos naturales.
          </p>
        </div>
      </section>

      {/* L1 */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-start gap-4 mb-8">
            <span className="text-4xl">🌿</span>
            <div>
              <span className="text-xs font-bold text-[#7FAA6A] uppercase tracking-widest">Línea 1</span>
              <h2 className="text-2xl md:text-3xl font-bold text-dark">Gestión del Capital Natural</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
            Procesos integrales de sostenibilidad para valorizar y monetizar los activos
            naturales del territorio patagónico mediante instrumentos de mercado reconocidos
            internacionalmente.
          </p>
          <ServiceAccordion services={l1Services} />
        </div>
      </section>

      {/* L2 */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-start gap-4 mb-8">
            <span className="text-4xl">⚖️</span>
            <div>
              <span className="text-xs font-bold text-[#7FAA6A] uppercase tracking-widest">Línea 2</span>
              <h2 className="text-2xl md:text-3xl font-bold text-dark">Gestión Ambiental Integral</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl leading-relaxed">
            Servicios profesionalizados para acompañar a empresas y organismos públicos en
            el cumplimiento de sus obligaciones ambientales con un enfoque práctico, territorial
            y orientado a resultados concretos.
          </p>
          <ServiceAccordion services={l2Services} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#1C2B1F] text-white text-center">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold mb-4">¿Necesitas un servicio a medida?</h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Cada proyecto es único. Cuéntanos tu desafío y diseñamos la solución adecuada
            para tu organización o empresa en Aysén.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#5A7B5F] text-white font-semibold px-8 py-4 rounded-lg hover:bg-[#4a6a4f] transition-colors"
          >
            Conversemos
          </Link>
        </div>
      </section>
    </div>
  )
}
