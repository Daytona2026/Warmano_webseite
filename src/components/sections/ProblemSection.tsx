'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Clock, Search, Receipt, AlertTriangle } from 'lucide-react'
import Container from '@/components/ui/Container'

const problems = [
  {
    icon: Clock,
    title: 'Ewig auf Termine warten',
    description: 'Handwerker haben keine Zeit. Besonders im Winter warten Sie oft 6-12 Wochen auf einen Termin.',
    color: 'from-red-500 to-rose-600',
    bgColor: 'bg-red-50',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    icon: Search,
    title: 'Schwer jemanden zu finden',
    description: 'Welcher Handwerker kennt sich mit Ihrer Marke aus? Die Suche ist mühsam und zeitaufwändig.',
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    icon: Receipt,
    title: 'Unklare Preise',
    description: 'Stundenlohn plus Material plus Anfahrt... Am Ende ist die Rechnung oft höher als gedacht.',
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    icon: AlertTriangle,
    title: 'Garantie in Gefahr',
    description: 'Ohne dokumentierte Wartung kann der Hersteller die Garantie verweigern. Das wird teuer.',
    color: 'from-red-600 to-rose-700',
    bgColor: 'bg-rose-50',
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.2,
    },
  },
}

export default function ProblemSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 lg:py-32 bg-gradient-to-b from-[#F9FAFB] via-white to-[#F9FAFB] overflow-hidden">
      {/* Subtle warm accent in background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-warmano-orange/5 via-transparent to-transparent" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-radial from-amber-500/5 via-transparent to-transparent" />

      {/* Top wave transition */}
      <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 0L60 10C120 20 240 40 360 50C480 60 600 60 720 55C840 50 960 40 1080 35C1200 30 1320 30 1380 30L1440 30V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0Z"
            fill="#0A0A0A"
          />
        </svg>
      </div>

      <Container className="relative z-10">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded-full mb-4"
          >
            Das Problem
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmano-gray-900 mb-6 leading-tight">
            Kennen Sie das{' '}
            <span className="relative">
              <span className="relative z-10">auch?</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-1 left-0 right-0 h-3 bg-red-200/60 -z-0 origin-left"
              />
            </span>
          </h2>
          <p className="text-lg text-warmano-gray-600">
            Die Wartung Ihrer Wärmepumpe sollte einfach sein. Ist sie aber oft nicht.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {problems.map((problem, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              <div className={`relative bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50 border border-gray-100 h-full transition-shadow duration-300 group-hover:shadow-xl group-hover:shadow-gray-300/50`}>
                {/* Gradient line at top */}
                <div className={`absolute top-0 left-6 right-6 h-1 bg-gradient-to-r ${problem.color} rounded-full`} />

                {/* Icon */}
                <motion.div
                  variants={iconVariants}
                  className={`w-14 h-14 rounded-2xl ${problem.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <problem.icon className={`w-7 h-7 ${problem.iconColor}`} />
                </motion.div>

                {/* Content */}
                <h3 className="text-lg font-bold text-warmano-gray-900 mb-3">
                  {problem.title}
                </h3>
                <p className="text-warmano-gray-600 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-warmano-orange/10 to-amber-500/10 border border-warmano-orange/20 rounded-full px-6 py-3">
            <div className="w-3 h-3 bg-warmano-orange rounded-full animate-pulse" />
            <p className="text-lg font-semibold text-warmano-gray-900">
              <span className="text-warmano-orange">Mit WARMANO ist das anders.</span>
              {' '}Festpreis, schnelle Termine, alles dokumentiert.
            </p>
          </div>
        </motion.div>
      </Container>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0 translate-y-[1px]">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L48 115C96 110 192 100 288 95C384 90 480 90 576 93.3C672 97 768 103 864 105C960 107 1056 105 1152 98.3C1248 92 1344 80 1392 74L1440 68V120H1392C1344 120 1248 120 1152 120C1056 120 960 120 864 120C768 120 672 120 576 120C480 120 384 120 288 120C192 120 96 120 48 120H0Z"
            fill="#0A0A0A"
          />
        </svg>
      </div>
    </section>
  )
}
