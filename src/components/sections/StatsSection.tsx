'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import AnimatedSection from '@/components/ui/AnimatedSection'

const stats = [
  {
    value: '>70%',
    label: 'Auslastung',
    description: 'Billable / Paid',
  },
  {
    value: '3',
    label: 'Wartungen / Tag',
    description: 'Ø Produktivität',
  },
  {
    value: '<5%',
    label: 'Rework',
    description: 'Nacharbeit',
  },
  {
    value: '>70%',
    label: 'First-Time-Fix',
    description: 'Reparaturen',
  },
  {
    value: '70+',
    label: 'NPS',
    description: 'Kundenzufriedenheit',
  },
  {
    value: '98%',
    label: 'On-time',
    description: 'Termintreue',
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-warmano-black relative overflow-hidden">
      {/* Gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-warmano-orange/5 via-transparent to-warmano-orange/5" />

      <Container className="relative z-10">
        <AnimatedSection className="text-center mb-12">
          <span className="text-warmano-orange font-semibold text-sm uppercase tracking-wider mb-4 block">
            Operational KPIs
          </span>
          <h2 className="text-2xl font-bold text-warmano-white">
            Unsere Zielwerte für <span className="text-gradient">exzellenten Service</span>
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map((stat, index) => (
            <AnimatedSection key={index} delay={index * 0.05}>
              <div className="card text-center py-6">
                <div className="text-3xl lg:text-4xl font-bold text-warmano-orange mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-warmano-white mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-warmano-gray-500 uppercase tracking-wide">
                  {stat.description}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.4} className="mt-8 text-center">
          <p className="text-sm text-warmano-gray-500">
            * Diese Zielwerte werden im Pilot (100+ Verträge) mit echten Daten belegt.
          </p>
        </AnimatedSection>
      </Container>
    </section>
  )
}
