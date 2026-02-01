'use client'

import { motion } from 'framer-motion'
import { CalendarCheck, ClipboardCheck, FileCheck, RefreshCw } from 'lucide-react'
import Container from '@/components/ui/Container'
import AnimatedSection from '@/components/ui/AnimatedSection'

const phases = [
  {
    icon: CalendarCheck,
    phase: '01',
    title: 'Intake & Dispatch',
    points: ['Auto-Booking via Portal', 'Skill-based Routing Algo', 'Material-Check vor Abfahrt'],
    color: 'orange',
  },
  {
    icon: ClipboardCheck,
    phase: '02',
    title: 'Durchführung',
    points: ['App-geführte SOP-Liste', 'Pflicht-Fotos (Vorher/Nachher)', 'Digitale Messwert-Erfassung'],
    color: 'blue',
  },
  {
    icon: FileCheck,
    phase: '03',
    title: 'Closing',
    points: ['Digitale Unterschrift', 'Auto-Generierung PDF-Protokoll', 'Echtzeit-Sync ins Backend'],
    color: 'green',
  },
  {
    icon: RefreshCw,
    phase: '04',
    title: 'Retention',
    points: ['NPS-Abfrage (Auto-Mail)', 'Mängel-Ticket (falls nötig)', 'Terminierung nächstes Jahr'],
    color: 'purple',
  },
]

const colorMap: Record<string, string> = {
  orange: 'bg-warmano-orange/10 text-warmano-orange border-warmano-orange/20',
  blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  green: 'bg-green-500/10 text-green-400 border-green-500/20',
  purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
}

export default function ProcessSection() {
  return (
    <section id="process" className="section-padding bg-warmano-black relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-warmano-orange/50 to-transparent" />

      <Container>
        <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-warmano-orange font-semibold text-sm uppercase tracking-wider mb-4 block">
            Unser Prozess
          </span>
          <h2 className="heading-2 text-warmano-white mb-6">
            Die <span className="text-gradient">&quot;Service-Factory&quot;</span>
          </h2>
          <p className="text-lg text-warmano-gray-400">
            Standardisierte Abläufe für skalierbare Qualität. Unabhängigkeit vom
            individuellen Talent des Technikers durch prozessuale Führung.
          </p>
        </AnimatedSection>

        {/* Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-warmano-orange via-blue-500 via-green-500 to-purple-500 opacity-20" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {phases.map((phase, index) => (
              <AnimatedSection key={index} delay={index * 0.1}>
                <div className="card h-full relative">
                  {/* Phase Number */}
                  <div className="flex items-center justify-between mb-6">
                    <div
                      className={`w-12 h-12 rounded-xl border flex items-center justify-center ${colorMap[phase.color]}`}
                    >
                      <phase.icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-bold text-warmano-gray-800">
                      {phase.phase}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-warmano-white mb-4">
                    {phase.title}
                  </h3>

                  <ul className="space-y-2">
                    {phase.points.map((point, pointIndex) => (
                      <li
                        key={pointIndex}
                        className="text-sm text-warmano-gray-400 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-warmano-gray-600 rounded-full mt-1.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Info Box */}
        <AnimatedSection delay={0.5} className="mt-12">
          <div className="glass rounded-2xl p-6 text-center">
            <p className="text-warmano-gray-400">
              <span className="text-warmano-orange font-semibold">Ziel:</span>{' '}
              Unabhängigkeit vom &quot;individuellen Talent&quot; des Technikers durch prozessuale Führung.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  )
}
