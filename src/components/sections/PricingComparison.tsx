'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, X, ArrowRight, Star } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const features = [
  { name: 'Jährliche Komplett-Wartung', basis: true, standard: true, premium: true },
  { name: 'Digitales Wartungsprotokoll', basis: true, standard: true, premium: true },
  { name: 'Garantie-Dokumentation', basis: true, standard: true, premium: true },
  { name: 'Hotline zu Geschäftszeiten', basis: true, standard: true, premium: true },
  { name: 'Priorisierte Terminvergabe', basis: false, standard: '3-5 Tage', premium: '1-2 Tage' },
  { name: '24/7 Notfall-Hotline', basis: false, standard: false, premium: true },
  { name: 'Kostenlose Reparaturen (Material)', basis: false, standard: 'bis 100€', premium: 'bis 250€' },
  { name: 'Kostenlose Arbeitszeit', basis: false, standard: false, premium: '1h/Jahr' },
]

export default function PricingComparison() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-warmano-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-warmano-black via-warmano-gray-900/30 to-warmano-black" />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-warmano-gray-800/50 border border-warmano-gray-700/50 text-warmano-gray-400 text-sm font-medium rounded-full mb-4"
          >
            Alle Features im Überblick
          </motion.span>
          <h2 className="text-3xl sm:text-4xl font-bold text-warmano-white mb-4">
            Pakete im{' '}
            <span className="bg-gradient-to-r from-warmano-orange via-amber-500 to-warmano-orange-light bg-clip-text text-transparent">
              Vergleich
            </span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Glow for standard column */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-full bg-warmano-orange/5 blur-3xl pointer-events-none" />

          <div className="overflow-x-auto pb-4">
            <table className="w-full min-w-[700px]">
              {/* Header */}
              <thead>
                <tr>
                  <th className="text-left p-4 w-[35%]"></th>
                  <th className="p-4 text-center w-[20%]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.3 }}
                      className="py-4"
                    >
                      <div className="text-warmano-gray-400 text-sm mb-2 font-medium">Basis</div>
                      <div className="text-3xl font-bold text-warmano-white">249€</div>
                      <div className="text-warmano-gray-500 text-xs">/Jahr</div>
                    </motion.div>
                  </th>
                  <th className="p-4 text-center w-[25%]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.4 }}
                      className="relative bg-gradient-to-br from-warmano-orange/20 to-amber-500/10 rounded-t-2xl py-4 px-2 border-x border-t border-warmano-orange/30"
                    >
                      {/* Popular badge */}
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-gradient-to-r from-warmano-orange to-amber-500 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-lg">
                        <Star className="w-3 h-3 fill-current" />
                        Beliebt
                      </div>
                      <div className="text-warmano-orange text-sm font-semibold mb-2">Standard</div>
                      <div className="text-3xl font-bold text-warmano-white">349€</div>
                      <div className="text-warmano-gray-500 text-xs">/Jahr</div>
                    </motion.div>
                  </th>
                  <th className="p-4 text-center w-[20%]">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="py-4"
                    >
                      <div className="text-warmano-gray-400 text-sm mb-2 font-medium">Premium</div>
                      <div className="text-3xl font-bold text-warmano-white">499€</div>
                      <div className="text-warmano-gray-500 text-xs">/Jahr</div>
                    </motion.div>
                  </th>
                </tr>
              </thead>

              {/* Body */}
              <tbody>
                {features.map((feature, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.05 }}
                    className="border-t border-warmano-gray-800/50 hover:bg-warmano-gray-800/20 transition-colors"
                  >
                    <td className="p-4 text-warmano-gray-300 text-sm font-medium">{feature.name}</td>
                    <td className="p-4 text-center">
                      {renderFeatureValue(feature.basis)}
                    </td>
                    <td className="p-4 text-center bg-warmano-orange/5 border-x border-warmano-orange/20">
                      {renderFeatureValue(feature.standard, true)}
                    </td>
                    <td className="p-4 text-center">
                      {renderFeatureValue(feature.premium)}
                    </td>
                  </motion.tr>
                ))}

                {/* CTA Row */}
                <tr className="border-t border-warmano-gray-800/50">
                  <td className="p-4"></td>
                  <td className="p-6 text-center">
                    <Button variant="secondary" size="sm" onClick={scrollToBooking} className="w-full">
                      Auswählen
                    </Button>
                  </td>
                  <td className="p-6 text-center bg-warmano-orange/5 rounded-b-2xl border-x border-b border-warmano-orange/20">
                    <Button size="sm" onClick={scrollToBooking} className="w-full group shadow-glow-orange">
                      Auswählen
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </td>
                  <td className="p-6 text-center">
                    <Button variant="secondary" size="sm" onClick={scrollToBooking} className="w-full">
                      Auswählen
                    </Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function renderFeatureValue(value: boolean | string, isHighlighted: boolean = false) {
  if (value === true) {
    return (
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`inline-flex items-center justify-center w-7 h-7 rounded-full ${
          isHighlighted ? 'bg-green-500/30' : 'bg-green-500/20'
        }`}
      >
        <Check className={`w-4 h-4 ${isHighlighted ? 'text-green-400' : 'text-green-500'}`} />
      </motion.div>
    )
  }
  if (value === false) {
    return (
      <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-warmano-gray-800/50">
        <X className="w-4 h-4 text-warmano-gray-600" />
      </div>
    )
  }
  return (
    <span className={`text-sm font-semibold ${isHighlighted ? 'text-warmano-orange' : 'text-warmano-gray-300'}`}>
      {value}
    </span>
  )
}
