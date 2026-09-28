import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Servicios | Ciclo Aysén SpA',
  description: 'Servicios de gestión del capital natural y gestión ambiental integral en la Patagonia chilena: evaluación ambiental, permisos sectoriales, compliance, participación y biodiversidad.',
}

const line1 = {
  label: 'Línea 1',
  title: 'Gestión del Capital Natural',
  services: [
    {
      icon: '🌍',
      title: '1.1. Mercado del Carbono',
      items: [
        'Intermediación con propietarios para desarrollo de proyectos de carbono.',
        'Alianzas con empresas gestoras.',
        'Constitución de derecho real de conservación (DRC).',
        'Análisis y evaluación de predios para ingreso al mercado.',
      ],
    },
    {
      icon: '💚',
      title: '1.2. Incubadores de Financiamiento Climático',
      items: [
        'Identificación de fuentes de financiamiento nacional e internacional.',
        'Desarrollo de proyectos para fondos concursables.',
        'Asesoría y acompañamiento técnico en la ejecución de planes de acción climática a organismos públicos y privados.',
      ],
    },
    {
      icon: '💧',
      title: '1.3. Desarrollo de Economía Azul',
      items: [
        'Elaboración de estudios y planes para la diversificación productiva en los territorios marítimos.',
        'Desarrollo de iniciativas de fomento productivo e innovación a través del financiamiento climático.',
        'Asesoría técnica, legal y acompañamiento a organizaciones de la sociedad civil.',
      ],
    },
    {
      icon: '🌲',
      title: '1.4. Biodiversidad y Ecosistemas Sensibles',
      items: [
        'Líneas de base de capital natural y servicios ecosistémicos a escala de área de interés.',
        'Identificación de ecosistemas sensibles (turberas, bosque nativo, humedales) para aplicar la jerarquía de mitigación desde el diseño de proyectos.',
        'Diseño de medidas de compensación y conservación en la región, mediante instrumentos como el derecho real de conservación.',
        'Asesoría en el marco de la Ley 21.660 sobre protección ambiental de las turberas.',
        'Estimación y compensación de huella de carbono corporativa con proyectos desarrollados en Aysén.',
      ],
    },
  ],
}

const line2 = {
  label: 'Línea 2',
  title: 'Gestión Ambiental Integral',
  services: [
    {
      icon: '✅',
      title: '2.1. Compliance y Enforcement Ambiental',
      items: [
        'Generación de modelos y políticas de cumplimiento ambiental para empresas.',
        'Asesoría para el cumplimiento regulatorio.',
        'Estudios de factibilidad ambiental.',
        'Seguimiento al cumplimiento de RCA.',
        'Elaboración DIA/EIA.',
        'Revisión de instrumentos de tramitación ambiental al SEIA.',
        'Monitoreo y acompañamiento para el desarrollo de planes de cumplimiento ambiental.',
        'Defensa en procedimientos sancionatorios de la administración (SMA y organismos sectoriales).',
        'Litigación ante Tribunales Ambientales.',
        'Asesoría técnica para reportabilidad ambiental.',
        'Administración de contratos y prestación de servicios a empresas.',
        'Auditoría de cumplimiento de planes y programas para empresas.',
      ],
    },
    {
      icon: '📋',
      title: '2.2. Servicios Profesionales de Consultoría',
      items: [
        'Ejecución de programas y/o proyectos mandatados por instituciones públicas.',
        'Asesoría técnica para reportabilidad ambiental.',
        'Elaboración de estudios e informes especializados en materia regulatoria.',
      ],
    },
    {
      icon: '📑',
      title: '2.3. Evaluación Ambiental y Permisos Sectoriales',
      items: [
        'Consultas de pertinencia de ingreso al SEIA.',
        'Permisos ambientales sectoriales: corta de bosque nativo (CONAF), intervención de cauces (DGA), patrimonio arqueológico y paleontológico (Consejo de Monumentos Nacionales), condiciones sanitarias de campamentos (SEREMI de Salud) y accesos a caminos públicos (Vialidad).',
        'Tramitación de inicio de actividades de exploración ante SERNAGEOMIN.',
        'Solicitudes de concesiones marítimas y permisos de escasa importancia.',
        'Due diligence regulatoria de activos, concesiones y permisos, y continuidad de obligaciones ante cambio de titular u operador.',
      ],
    },
    {
      icon: '🤝',
      title: '2.4. Territorio y Participación',
      items: [
        'Mapeo de actores y análisis de contexto territorial.',
        'Diseño y conducción de procesos de participación ciudadana.',
        'Procesos de consulta indígena conforme al Convenio 169 de la OIT.',
        'Diseño y operación de mecanismos de quejas y reclamos.',
        'Articulación de profesionales y proveedores regionales para servicios de apoyo en terreno.',
      ],
    },
  ],
}

export default function ServicesPage() {
  return (
    <div>
      {/* Header — fondo fotográfico con overlay */}
      <section className="relative overflow-hidden bg-[#1C2B1F] py-16 md:py-24 px-4 md:px-8 lg:px-16">
        <Image
          src="/servicios-1.jpg"
          alt="Archipiélagos y canales de la Región de Aysén, Patagonia Chilena"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1C2B1F]/60" />
        <div className="container-max mx-auto text-center relative z-10">
          <span className="text-[#7FAA6A] text-sm font-semibold uppercase tracking-wide">
            Lo que hacemos
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-5">
            Nuestros Servicios
          </h1>
          <p className="text-gray-200 text-lg max-w-2xl mx-auto leading-relaxed">
            Soluciones integrales para sostenibilidad y regulación ambiental en el contexto patagónico
          </p>
        </div>
      </section>

      {/* Dos columnas */}
      <section className="section-padding bg-gray-50">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LÍNEA 1 — fondo light blue */}
            <div className="bg-[#D4E5F0] rounded-2xl p-8 md:p-10">
              <div className="mb-8">
                <span className="text-xs font-semibold text-[#5A7B5F] uppercase tracking-widest">
                  {line1.label}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-[#1C2B1F] mt-2">
                  {line1.title}
                </h2>
              </div>
              <div className="space-y-8">
                {line1.services.map((s) => (
                  <div key={s.title}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <h3 className="font-bold text-[#1C2B1F] text-base md:text-lg">{s.title}</h3>
                    </div>
                    <ul className="space-y-2 pl-2">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#4A5568] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#7FAA6A] shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* LÍNEA 2 — fondo olive oscuro */}
            <div className="bg-[#5A7B5F] rounded-2xl p-8 md:p-10">
              <div className="mb-8">
                <span className="text-xs font-semibold text-[#D4E5F0] uppercase tracking-widest">
                  {line2.label}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
                  {line2.title}
                </h2>
              </div>
              <div className="space-y-8">
                {line2.services.map((s) => (
                  <div key={s.title}>
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-2xl">{s.icon}</span>
                      <h3 className="font-bold text-white text-base md:text-lg">{s.title}</h3>
                    </div>
                    <ul className="space-y-2 pl-2">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-[#D4E5F0] leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D4E5F0]/70 shrink-0 mt-1.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* NATURALEZA — franja fotográfica */}
      <section className="relative h-72 md:h-96 overflow-hidden">
        <Image
          src="/servicios-2.jpg"
          alt="Fiordos y montañas nevadas — Región de Aysén, Patagonia Chilena"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#1C2B1F]/50 flex items-center justify-center px-6">
          <div className="text-center max-w-3xl">
            <p className="text-xl md:text-3xl font-semibold text-white leading-relaxed italic">
              "Conocimiento del territorio, compromiso climático, servicio de excelencia."
            </p>
            <span className="inline-block mt-5 text-[#7FAA6A] text-sm tracking-wide">
              Región de Aysén, Patagonia Chilena
            </span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-[#1C2B1F] text-white text-center">
        <div className="container-max mx-auto px-4 md:px-8 lg:px-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            ¿Necesitas alguno de estos servicios?
          </h2>
          <p className="text-gray-300 mb-8 max-w-xl mx-auto">
            Contáctanos para una asesoría inicial sin compromiso y cuéntanos sobre tu proyecto.
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
