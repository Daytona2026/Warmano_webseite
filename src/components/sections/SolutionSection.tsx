'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, Wrench, FileCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const steps = [
  {
    number: '1',
    icon: Calendar,
    title: 'Online buchen',
    description: 'Paket wählen, Termin aussuchen, fertig. Dauert keine 2 Minuten.',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    number: '2',
    icon: Wrench,
    title: 'Wir kommen vorbei',
    description: 'Unser Techniker führt die komplette Wartung nach Herstellervorgaben durch.',
    color: 'from-warmano-orange to-amber-500',
    bgColor: 'bg-warmano-orange/10',
    borderColor: 'border-warmano-orange/20',
  },
  {
    number: '3',
    icon: FileCheck,
    title: 'Protokoll erhalten',
    description: 'Sie bekommen alle Dokumente digital – perfekt für Garantie und Unterlagen.',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
  },
]

const benefits = [
  'Festpreis ohne Überraschungen',
  'Termin in wenigen Tagen',
  'Alle Marken, ein Ansprechpartner',
  'Digitales Wartungsprotokoll',
  'Garantie bleibt erhalten',
  'Jederzeit kündbar',
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
}

const stepVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  },
}

const benefitVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      delay: i * 0.1,
      ease: 'easeOut',
    },
  }),
}

export default function SolutionSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" ref={sectionRef} className="relative py-24 lg:py-32 bg-warmano-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-warmano-black via-warmano-gray-900/50 to-warmano-black" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-warmano-orange blur-[200px]"
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium rounded-full mb-4"
          >
            Die Lösung
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmano-white mb-6 leading-tight">
            So einfach geht{' '}
            <span className="bg-gradient-to-r from-warmano-orange via-amber-500 to-warmano-orange-light bg-clip-text text-transparent">
              Wartung heute
            </span>
          </h2>
          <p className="text-lg text-warmano-gray-400">
            Drei Schritte zu Ihrer professionellen Wärmepumpen-Wartung
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={stepVariants}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-14 left-[60%] w-[80%] z-0">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: 1 } : {}}
                    transition={{ duration: 0.8, delay: 0.5 + index * 0.2 }}
                    className="h-0.5 bg-gradient-to-r from-warmano-gray-700 to-warmano-gray-800 origin-left"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.2 }}
                    className="absolute right-0 top-1/2 -translate-y-1/2"
                  >
                    <ArrowRight className="w-4 h-4 text-warmano-gray-700" />
                  </motion.div>
                </div>
              )}

              {/* Card */}
              <motion.div
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className={`relative text-center p-8 rounded-2xl ${step.bgColor} border ${step.borderColor} backdrop-blur-sm transition-all duration-300 group-hover:border-opacity-50`}
              >
                {/* Icon container */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-lg shadow-black/20 relative`}
                >
                  <step.icon className="w-9 h-9 text-white" />
                  {/* Number badge */}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 300, delay: 0.4 + index * 0.1 }}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-warmano-white text-warmano-black rounded-full flex items-center justify-center text-sm font-bold shadow-lg"
                  >
                    {step.number}
                  </motion.span>
                </motion.div>

                <h3 className="text-xl font-bold text-warmano-white mb-3">
                  {step.title}
                </h3>
                <p className="text-warmano-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-warmano-orange/20 via-amber-500/10 to-warmano-orange/20 rounded-3xl blur-xl" />

          <div className="relative bg-gradient-to-br from-warmano-gray-800/80 to-warmano-gray-900/90 backdrop-blur-xl rounded-3xl p-10 border border-warmano-gray-700/50 overflow-hidden">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-warmano-orange/5 via-transparent to-amber-500/5 pointer-events-none" />

            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-warmano-white text-center mb-8">
                Ihre Vorteile mit{' '}
                <span className="text-warmano-orange">WARMANO</span>
              </h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={benefitVariants}
                    initial="hidden"
                    animate={isInView ? 'visible' : 'hidden'}
                    className="flex items-center gap-3 p-3 rounded-xl bg-warmano-gray-800/30 border border-warmano-gray-700/30 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 group"
                  >
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/30 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-green-400" />
                    </div>
                    <span className="text-warmano-gray-300 text-sm font-medium">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  onClick={scrollToBooking}
                  className="group shadow-glow-orange hover:shadow-glow-orange-lg transition-shadow duration-300"
                >
                  Jetzt Wartung buchen
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
