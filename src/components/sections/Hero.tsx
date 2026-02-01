'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Star, Shield, Clock, CheckCircle, MapPin, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

// Animated counter hook
function useCounter(end: number, duration: number = 2000, startOnView: boolean = true) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const hasStarted = useRef(false)

  useEffect(() => {
    if (startOnView && !isInView) return
    if (hasStarted.current) return
    hasStarted.current = true

    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [end, duration, isInView, startOnView])

  return { count, ref }
}

// Text reveal animation variants
const textRevealVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

// Stagger container variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export default function Hero() {
  const { count: ratingCount, ref: ratingRef } = useCounter(49, 1500)
  const { count: customerCount, ref: customerRef } = useCounter(200, 2000)
  const priceRef = useRef(null)
  const priceInView = useInView(priceRef, { once: true })

  const scrollToBooking = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-warmano-black">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-warmano-black via-warmano-gray-900 to-warmano-black" />

        {/* Animated warm gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,77,0,0.15) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute bottom-1/4 -right-1/4 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,106,44,0.08) 0%, transparent 60%)',
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Location Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-warmano-orange/10 border border-warmano-orange/20 rounded-full px-4 py-2 mb-6"
            >
              <MapPin className="w-4 h-4 text-warmano-orange" />
              <span className="text-sm font-medium text-warmano-orange">
                München & Umland
              </span>
            </motion.div>

            {/* Animated Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
              <motion.span
                custom={0}
                initial="hidden"
                animate="visible"
                variants={textRevealVariants}
                className="block text-warmano-white"
              >
                Wärmepumpen-
              </motion.span>
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={textRevealVariants}
                className="block bg-gradient-to-r from-warmano-orange via-amber-500 to-warmano-orange-light bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent"
              >
                Wartung
              </motion.span>
              <motion.span
                custom={2}
                initial="hidden"
                animate="visible"
                variants={textRevealVariants}
                className="block text-warmano-white"
              >
                zum Festpreis
              </motion.span>
            </h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg sm:text-xl text-warmano-gray-400 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Professionelle Wartung für alle Marken. Online buchen, Termin wählen, fertig.
              <span className="text-warmano-gray-300"> Mit digitalem Protokoll für Ihre Garantie.</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="group text-lg px-8 relative overflow-hidden shadow-glow-orange hover:shadow-glow-orange-lg transition-shadow duration-300"
              >
                <span className="relative z-10 flex items-center">
                  Jetzt Wartung buchen
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
                {/* Shimmer effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={scrollToPricing}
                className="text-lg group"
              >
                <Sparkles className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                Preise ansehen
              </Button>
            </motion.div>

            {/* Trust Points with stagger animation */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-3"
            >
              {[
                { icon: Clock, text: 'Termin in 3-5 Tagen' },
                { icon: Shield, text: 'Garantie erhalten' },
                { icon: CheckCircle, text: 'Alle Marken' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-2.5 text-warmano-gray-400 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-warmano-gray-800/50 flex items-center justify-center group-hover:bg-warmano-orange/10 transition-colors">
                    <item.icon className="w-4 h-4 text-warmano-orange" />
                  </div>
                  <span className="text-sm font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right: Glassmorphism Price Card */}
          <motion.div
            ref={priceRef}
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="relative hidden lg:block"
          >
            {/* Glow effect behind card */}
            <div className="absolute inset-0 bg-warmano-orange/20 blur-[100px] rounded-full scale-75" />

            {/* Main Card */}
            <div className="relative">
              {/* Glass Card */}
              <motion.div
                animate={priceInView ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative bg-gradient-to-br from-warmano-gray-800/80 to-warmano-gray-900/90 backdrop-blur-xl rounded-3xl p-8 border border-warmano-gray-700/50 shadow-glass-lg"
              >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-warmano-orange/5 via-transparent to-amber-500/5 pointer-events-none rounded-3xl" />

                <div className="relative z-10">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 bg-warmano-orange/20 rounded-full px-3 py-1.5 mb-6">
                    <span className="w-2 h-2 bg-warmano-orange rounded-full animate-pulse" />
                    <span className="text-xs font-semibold text-warmano-orange uppercase tracking-wider">
                      Beliebtestes Paket
                    </span>
                  </div>

                  {/* Price */}
                  <div className="mb-6">
                    <p className="text-warmano-gray-400 text-sm mb-2">Wartung ab</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-6xl font-bold text-warmano-white">
                        249€
                      </span>
                      <span className="text-warmano-gray-500 text-lg">/Jahr</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {[
                      'Jährliche Komplett-Wartung',
                      'Digitales Wartungsprotokoll',
                      'Garantie-Dokumentation',
                      'Alle Hersteller & Modelle',
                    ].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-warmano-gray-300"
                      >
                        <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    onClick={scrollToBooking}
                    className="w-full group relative overflow-hidden"
                  >
                    <span className="relative z-10">Jetzt buchen</span>
                    <ArrowRight className="w-4 h-4 ml-2 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </Button>

                  {/* Trust Stats - sauber in einer Reihe */}
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-warmano-gray-700/50">
                    {/* Rating */}
                    <div className="flex items-center gap-2" ref={ratingRef}>
                      <div className="flex -space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                        ))}
                      </div>
                      <div>
                        <span className="text-warmano-white font-bold">{(ratingCount / 10).toFixed(1)}</span>
                        <span className="text-warmano-gray-500 text-xs ml-1">Bewertung</span>
                      </div>
                    </div>

                    {/* Divider */}
                    <div className="w-px h-8 bg-warmano-gray-700/50" />

                    {/* Customers */}
                    <div className="text-right" ref={customerRef}>
                      <span className="text-warmano-white font-bold text-lg">{customerCount}+</span>
                      <p className="text-warmano-gray-500 text-xs">zufriedene Kunden</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Mobile Price Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 lg:hidden"
        >
          {/* Glow */}
          <div className="relative">
            <div className="absolute inset-0 bg-warmano-orange/10 blur-[60px] rounded-full" />

            <div className="relative bg-gradient-to-br from-warmano-gray-800/90 to-warmano-gray-900/95 backdrop-blur-xl border border-warmano-gray-700/50 rounded-2xl p-6 shadow-glass max-w-sm mx-auto overflow-hidden">
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-warmano-orange/5 via-transparent to-amber-500/5 pointer-events-none" />

              <div className="relative z-10">
                {/* Rating row */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex -space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                    ))}
                  </div>
                  <span className="text-sm text-warmano-gray-300">4.9/5 von 200+ Kunden</span>
                </div>

                {/* Price */}
                <p className="text-warmano-gray-400 text-sm text-center mb-1">Wartung ab</p>
                <div className="flex items-baseline justify-center gap-1 mb-5">
                  <span className="text-5xl font-bold bg-gradient-to-r from-warmano-white to-warmano-gray-200 bg-clip-text text-transparent">
                    249€
                  </span>
                  <span className="text-warmano-gray-500">/Jahr</span>
                </div>

                <Button onClick={scrollToBooking} className="w-full shadow-glow-orange">
                  Jetzt buchen
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-auto"
          preserveAspectRatio="none"
        >
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#0A0A0A"
          />
        </svg>
      </div>
    </section>
  )
}
