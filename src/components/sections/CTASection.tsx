'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Phone, CheckCircle, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function CTASection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 bg-warmano-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-warmano-black via-warmano-gray-900/30 to-warmano-black" />

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-warmano-orange blur-[200px]"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-amber-500 blur-[200px]"
      />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto">
          {/* Main Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-warmano-orange via-amber-500 to-warmano-orange rounded-3xl opacity-30 blur-xl animate-pulse" />

            <div className="relative bg-gradient-to-br from-warmano-gray-800/90 to-warmano-gray-900/95 backdrop-blur-xl rounded-3xl p-10 sm:p-14 border border-warmano-gray-700/50 text-center overflow-hidden">
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-warmano-orange/10 via-transparent to-amber-500/10 pointer-events-none" />

              {/* Corner decorations */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-warmano-orange/20 to-transparent rounded-bl-full" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-tr-full" />

              <div className="relative z-10">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center gap-2 bg-warmano-orange/20 border border-warmano-orange/30 rounded-full px-4 py-2 mb-6"
                >
                  <Sparkles className="w-4 h-4 text-warmano-orange" />
                  <span className="text-sm font-semibold text-warmano-orange">
                    Jetzt starten
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmano-white mb-6 leading-tight"
                >
                  Bereit für{' '}
                  <span className="bg-gradient-to-r from-warmano-orange via-amber-500 to-warmano-orange-light bg-clip-text text-transparent">
                    stressfreie Wartung?
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-lg text-warmano-gray-400 mb-10 max-w-lg mx-auto"
                >
                  Buchen Sie jetzt Ihre Wärmepumpen-Wartung.
                  Online, zum Festpreis, ohne Überraschungen.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center mb-10"
                >
                  <Button
                    size="lg"
                    onClick={scrollToBooking}
                    className="group text-lg shadow-glow-orange hover:shadow-glow-orange-lg transition-shadow"
                  >
                    Jetzt Wartung buchen
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <a
                    href="tel:+498999951433"
                    className="inline-flex items-center justify-center gap-3 px-6 py-4 text-warmano-gray-300 hover:text-warmano-orange transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-warmano-gray-800/50 border border-warmano-gray-700/50 flex items-center justify-center group-hover:bg-warmano-orange/10 group-hover:border-warmano-orange/30 transition-all">
                      <Phone className="w-5 h-5" />
                    </div>
                    <span className="font-medium">089 99 95 14-133</span>
                  </a>
                </motion.div>

                {/* Trust Points */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-warmano-gray-400"
                >
                  {[
                    'Ab 249€/Jahr',
                    'Termin in wenigen Tagen',
                    'Jederzeit kündbar',
                  ].map((text, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {text}
                    </motion.span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
