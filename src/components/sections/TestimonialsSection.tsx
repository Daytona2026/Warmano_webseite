'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import Container from '@/components/ui/Container'

const testimonials = [
  {
    name: 'Thomas M.',
    location: 'München-Bogenhausen',
    rating: 5,
    text: 'Endlich ein Service, der hält was er verspricht! Termin online gebucht, 4 Tage später war der Techniker da. Pünktlich, freundlich und hat alles erklärt. Das digitale Protokoll kam direkt per Mail. Top!',
    device: 'Viessmann Vitocal',
    initials: 'TM',
    avatarColor: 'from-blue-500 to-blue-600',
  },
  {
    name: 'Sandra K.',
    location: 'Unterhaching',
    rating: 5,
    text: 'Nach wochenlanger Suche nach einem zuverlässigen Wartungsservice endlich fündig geworden. Preis-Leistung stimmt, keine versteckten Kosten. Nächstes Jahr buche ich direkt wieder.',
    device: 'Bosch Compress',
    initials: 'SK',
    avatarColor: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Michael H.',
    location: 'Germering',
    rating: 5,
    text: 'Hatte das Premium-Paket genommen. Als im Januar die Pumpe komische Geräusche machte, war innerhalb von einem Tag jemand da. Hat mich null extra gekostet. Sehr zu empfehlen!',
    device: 'Vaillant aroTHERM',
    initials: 'MH',
    avatarColor: 'from-green-500 to-emerald-600',
  },
  {
    name: 'Christine B.',
    location: 'München-Pasing',
    rating: 5,
    text: 'Super unkompliziert! Online gebucht, SMS-Erinnerung bekommen, Techniker kam pünktlich. Am besten fand ich das digitale Wartungsheft - endlich alles an einem Ort.',
    device: 'Daikin Altherma',
    initials: 'CB',
    avatarColor: 'from-warmano-orange to-orange-600',
  },
]

// Animated counter hook
function useCounter(end: number, duration: number = 2000, shouldStart: boolean = false) {
  const [count, setCount] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!shouldStart || hasStarted.current) return
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
  }, [end, duration, shouldStart])

  return count
}

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: i * 0.1,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  const ratingCount = useCounter(49, 1500, isInView)
  const customerCount = useCounter(200, 2000, isInView)

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 lg:py-32 bg-warmano-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-warmano-black via-warmano-gray-900/30 to-warmano-black" />
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-yellow-500 blur-[200px]"
      />

      <Container className="relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          {/* Animated Stars */}
          <div className="flex justify-center gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{
                  duration: 0.5,
                  delay: i * 0.1,
                  type: 'spring',
                  stiffness: 200,
                }}
              >
                <Star className="w-8 h-8 fill-yellow-500 text-yellow-500 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />
              </motion.div>
            ))}
          </div>

          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmano-white mb-6"
          >
            <span className="text-5xl sm:text-6xl">
              {(ratingCount / 10).toFixed(1)}
            </span>
            <span className="text-xl text-warmano-gray-500 ml-2 font-normal">von 5 Sternen</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-lg text-warmano-gray-400"
          >
            Über <span className="text-warmano-white font-semibold">{customerCount}+</span> zufriedene Kunden in München vertrauen uns
          </motion.p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative"
            >
              {/* Card glow on hover */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-warmano-orange/0 via-warmano-orange/0 to-amber-500/0 rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500" />

              <div className="relative bg-gradient-to-br from-warmano-gray-800/90 to-warmano-gray-900/95 backdrop-blur-xl rounded-2xl p-6 h-full flex flex-col border border-warmano-gray-700/50 group-hover:border-warmano-orange/30 transition-colors duration-300">
                {/* Quote icon */}
                <div className="absolute -top-3 -right-3 w-10 h-10 rounded-xl bg-warmano-orange/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Quote className="w-5 h-5 text-warmano-orange" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-warmano-gray-300 text-sm mb-5 flex-grow leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Author */}
                <div className="pt-4 border-t border-warmano-gray-700/50 flex items-center gap-3">
                  <div className={`w-11 h-11 rounded-full bg-gradient-to-br ${testimonial.avatarColor} flex items-center justify-center text-white font-semibold text-sm shadow-lg`}>
                    {testimonial.initials}
                  </div>
                  <div>
                    <p className="font-medium text-warmano-white text-sm">{testimonial.name}</p>
                    <p className="text-xs text-warmano-gray-500">{testimonial.location}</p>
                    <p className="text-xs text-warmano-orange">{testimonial.device}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Card glow */}
              <div className="absolute inset-0 bg-warmano-orange/10 blur-[80px] rounded-full scale-75" />

              <div className="relative bg-gradient-to-br from-warmano-gray-800/90 to-warmano-gray-900/95 backdrop-blur-xl rounded-2xl p-6 border border-warmano-gray-700/50">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                  ))}
                </div>
                <p className="text-warmano-gray-300 mb-5 leading-relaxed">
                  &quot;{testimonials[currentIndex].text}&quot;
                </p>
                <div className="pt-4 border-t border-warmano-gray-700/50 flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonials[currentIndex].avatarColor} flex items-center justify-center text-white font-semibold shadow-lg`}>
                    {testimonials[currentIndex].initials}
                  </div>
                  <div>
                    <p className="font-medium text-warmano-white">{testimonials[currentIndex].name}</p>
                    <p className="text-sm text-warmano-gray-500">
                      {testimonials[currentIndex].location}
                    </p>
                    <p className="text-sm text-warmano-orange">{testimonials[currentIndex].device}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full bg-warmano-gray-800/80 border border-warmano-gray-700 flex items-center justify-center text-warmano-gray-400 hover:bg-warmano-gray-700 hover:text-warmano-white transition-all"
              aria-label="Vorherige"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-warmano-orange w-6'
                      : 'bg-warmano-gray-700 hover:bg-warmano-gray-600'
                  }`}
                  aria-label={`Bewertung ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-12 h-12 rounded-full bg-warmano-gray-800/80 border border-warmano-gray-700 flex items-center justify-center text-warmano-gray-400 hover:bg-warmano-gray-700 hover:text-warmano-white transition-all"
              aria-label="Nächste"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
