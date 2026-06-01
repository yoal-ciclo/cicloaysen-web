import type { Metadata } from 'next'
import ServiceAccordion from '@/components/ServiceAccordion'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Servicios | Ciclo Aysén SpA',
  description: 'Gestión de capital natural y gestión ambiental integral para empresas y organismos públicos en la Patagonia.',
}

const l1Services = [
  {
    title: 'Desarrollo de proyectos de mercado de carbono',
    summary: 'Diseñamos y gestionamos proyectos de reducción y captura de emisiones para acceder a mercados voluntarios e institucionales de carbono.',
    details: [
      'Identificación y evaluación de elegibilidad de proyectos',
      'Formulación bajo estándares internacionales (Verra VCS, Gold Standard)',
      'Gestión de validación y verificación con auditores acreditados',
      'Comercialización de créditos de carbono en mercados voluntarios',
      'Monitoreo y reporte de reducciones verificadas (MRV)',
    ],
  },
  {
    title: 'Economía Azul',
    summary: 'Asesoramos en el desarrollo de actividades productivas marinas y costeras que integran la conservación del capital natural marino.',
    details: [
      'Diagnóstico de activos naturales marinos y costeros',
      'Diseño de modelos de negocio de economía azul',
      'Vinculación con instrumentos de financiamiento azul',
      'Gestión de permisos ambientales para actividades costeras',
      'Reportes de sostenibilidad marina',
    ],
  },
  {
    title: 'Financiamiento Climático',
    summary: 'Conectamos proyectos locales con fondos y mecanismos de financiamiento climático nacionales e internacionales.',
    details: [
      'Identificación de fondos climáticos aplicables (GCF, BID, CAF, CORFO)',
      'Formulación de perfiles y cartas de intención',
      'Elaboración de propuestas de financiamiento',
      'Gestión de relaciones con organismos financiadores',
      'Seguimiento y rendición de cuentas de proyectos financiados',
    ],
  },
]

const l2Services = [
  {
    title: 'Compliance & Enforcement Ambiental',
    summary: 'Apoyamos a empresas en el cumplimiento integral de sus obligaciones ambientales, reduciendo riesgos regulatorios y reputacionales.',
    details: [
      'Diagnóstico de brechas de cumplimiento ambiental',
      'Elaboración y actualización de planes de cumplimiento',
      'Representación ante la Superintendencia de Medio Ambiente (SMA)',
      'Gestión de procesos de fiscalización y denuncias',
      'Capacitación interna en normativa ambiental vigente',
      'Monitoreo continuo de condiciones de RCA',
    ],
  },
  {
    title: 'Servicios a Entidades Públicas',
    summary: 'Brindamos asesoría técnica especializada a municipios, servicios públicos y organismos regionales en materias ambientales.',
    details: [
      'Planes de gestión ambiental comunal',
      'Estudios de riesgo de desastres y gestión territorial',
      'Asesoría en licitaciones de servicios ambientales',
      'Elaboración de bases técnicas y términos de referencia',
      'Apoyo en evaluación de proyectos en el SNIP/BIP',
    ],
  },
]

export default function ServicesPage() {
  return (
    <div>
      {/* Header */}
      <section className="bg-secondary section-padding">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">Servicios</h1>
          <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
            Dos líneas complementarias que cubren desde la valorización del capital natural
            hasta el cumplimiento normativo ambiental en el contexto patagónico.
          </p>
        </div>
      </section>

      {/* L1 */}
      <section className="section-padding bg-white">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">🌿</span>
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">Línea 1</span>
              <h2 className="text-2xl md:text-3xl font-bold text-dark">Gestión de Capital Natural</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Valoramos y monetizamos los activos naturales del territorio patagónico mediante
            instrumentos de mercado reconocidos internacionalmente, conectando ecosistemas
            locales con oportunidades globales de financiamiento climático.
          </p>
          <ServiceAccordion services={l1Services} />
        </div>
      </section>

      {/* L2 */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-3xl">⚖️</span>
            <div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">Línea 2</span>
              <h2 className="text-2xl md:text-3xl font-bold text-dark">Gestión Ambiental Integral</h2>
            </div>
          </div>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Acompañamos a empresas y organismos públicos en el cumplimiento de sus obligaciones
            ambientales con un enfoque práctico, territorial y orientado a reducir riesgos
            regulatorios y reputacionales.
          </p>
          <ServiceAccordion services={l2Services} />
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-white text-center">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que necesitas?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
            Diseñamos soluciones a medida. Cuéntanos tu desafío y te respondemos en 48 horas.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-primary font-semibold px-8 py-4 rounded-lg hover:bg-secondary transition-colors duration-200"
          >
            Conversemos
          </Link>
        </div>
      </section>
    </div>
  )
}
