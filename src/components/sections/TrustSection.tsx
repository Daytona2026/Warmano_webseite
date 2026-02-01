'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Award, Clock, FileCheck } from 'lucide-react'
import Container from '@/components/ui/Container'

const trustPoints = [
  { icon: Shield, text: 'Garantie bleibt erhalten' },
  { icon: Award, text: 'Zertifizierte Techniker' },
  { icon: Clock, text: 'Termine in 3-10 Tagen' },
  { icon: FileCheck, text: 'Digitale Dokumentation' },
]

const brands = [
  'Viessmann',
  'Bosch',
  'Vaillant',
  'Daikin',
  'Mitsubishi',
  'Panasonic',
  'Stiebel Eltron',
  'Buderus',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

const brandVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.3 + i * 0.05,
      ease: 'easeOut',
    },
  }),
}

export default function TrustSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' })

  return (
    <section ref={sectionRef} className="relative py-16 bg-warmano-black overflow-hidden">
      {/* Subtle gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warmano-gray-700 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-warmano-gray-700 to-transparent" />

      <Container>
        {/* Trust Points */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-x-10 gap-y-4 mb-12"
        >
          {trustPoints.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              className="flex items-center gap-3 group cursor-default"
            >
              <div className="w-10 h-10 rounded-xl bg-warmano-gray-800/50 border border-warmano-gray-700/50 flex items-center justify-center group-hover:bg-warmano-orange/10 group-hover:border-warmano-orange/20 transition-all duration-300">
                <point.icon className="w-5 h-5 text-warmano-orange" />
              </div>
              <span className="text-sm font-medium text-warmano-gray-300 group-hover:text-warmano-white transition-colors">
                {point.text}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Brands */}
        <div className="text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xs text-warmano-gray-500 uppercase tracking-[0.2em] mb-6 font-medium"
          >
            Wir warten alle gängigen Marken
          </motion.p>

          <div className="relative">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-warmano-black to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-warmano-black to-transparent z-10 pointer-events-none" />

            <div className="flex flex-wrap justify-center gap-x-2 gap-y-3 px-8">
              {brands.map((brand, index) => (
                <motion.div
                  key={brand}
                  custom={index}
                  variants={brandVariants}
                  initial="hidden"
                  animate={isInView ? 'visible' : 'hidden'}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  className="px-4 py-2 bg-warmano-gray-800/30 border border-warmano-gray-800 rounded-lg hover:border-warmano-orange/30 hover:bg-warmano-gray-800/50 transition-all duration-300 cursor-default"
                >
                  <span className="text-warmano-gray-400 text-sm font-medium hover:text-warmano-orange transition-colors">
                    {brand}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
