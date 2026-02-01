'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Check, Star, ArrowRight, Phone, X, Gift, Sparkles } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const plans = [
  {
    name: 'Basis',
    price: 249,
    description: 'Alles was Sie für die jährliche Wartung brauchen',
    features: [
      'Jährliche Komplett-Wartung',
      'Digitales Wartungsprotokoll',
      'Garantie-Dokumentation',
      'Terminbuchung in 10 Tagen',
      'Hotline zu Geschäftszeiten',
    ],
    notIncluded: ['Priorisierte Termine', 'Kostenlose Reparaturen'],
    cta: 'Basis wählen',
    popular: false,
    gradient: 'from-warmano-gray-700 to-warmano-gray-800',
    accentColor: 'warmano-gray-400',
  },
  {
    name: 'Standard',
    price: 349,
    description: 'Schnellere Termine & Reparatur-Schutz',
    features: [
      'Jährliche Komplett-Wartung',
      'Digitales Wartungsprotokoll',
      'Garantie-Dokumentation',
      'Priorisierter Termin in 3-5 Tagen',
      'Hotline zu Geschäftszeiten',
      'Reparaturen bis 100€ inklusive',
    ],
    notIncluded: [],
    cta: 'Standard wählen',
    popular: true,
    gradient: 'from-warmano-orange to-amber-600',
    accentColor: 'warmano-orange',
  },
  {
    name: 'Premium',
    price: 499,
    description: 'Rundum-Sorglos mit 24/7 Notdienst',
    features: [
      'Jährliche Komplett-Wartung',
      'Digitales Wartungsprotokoll',
      'Garantie-Dokumentation',
      'Express-Termin in 1-2 Tagen',
      '24/7 Notfall-Hotline',
      'Reparaturen bis 250€ inklusive',
      '1 Stunde Arbeitszeit gratis',
    ],
    notIncluded: [],
    cta: 'Premium wählen',
    popular: false,
    gradient: 'from-purple-500 to-violet-600',
    accentColor: 'purple-400',
  },
]

type ContractDuration = '1year' | '3years'
type PaymentFrequency = 'yearly' | 'monthly'

function calculatePrice(
  basePrice: number,
  duration: ContractDuration,
  frequency: PaymentFrequency
): { displayPrice: number; totalPrice: number; savings: number; perMonth: number } {
  if (duration === '1year') {
    const totalPrice = basePrice
    const perMonth = Math.round(basePrice / 12)
    return {
      displayPrice: frequency === 'yearly' ? totalPrice : perMonth,
      totalPrice,
      savings: 0,
      perMonth,
    }
  } else {
    // 3 years: pay for 2, get 1 free
    const totalPrice = basePrice * 2 // Only pay for 2 years
    const savings = basePrice // Save 1 year
    const perMonth = Math.round(totalPrice / 36)
    return {
      displayPrice: frequency === 'yearly' ? totalPrice : perMonth,
      totalPrice,
      savings,
      perMonth,
    }
  }
}

// Animated counter hook
function useCounter(end: number, duration: number = 1500, shouldStart: boolean = false) {
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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.15,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
}

export default function PricingSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [duration, setDuration] = useState<ContractDuration>('1year')
  const [frequency, setFrequency] = useState<PaymentFrequency>('yearly')

  const handleSelectPlan = (planName: string) => {
    const bookingSection = document.getElementById('booking')
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="pricing" className="relative py-24 lg:py-32 bg-warmano-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-warmano-black via-warmano-gray-900/50 to-warmano-black" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-warmano-orange/10 blur-[150px]"
      />

      <Container className="relative z-10">
        <motion.div
          ref={sectionRef}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-warmano-orange/10 border border-warmano-orange/20 text-warmano-orange text-sm font-medium rounded-full mb-4"
          >
            Transparente Preise
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmano-white mb-6 leading-tight">
            Wählen Sie Ihr{' '}
            <span className="bg-gradient-to-r from-warmano-orange via-amber-500 to-warmano-orange-light bg-clip-text text-transparent">
              Wartungspaket
            </span>
          </h2>
          <p className="text-lg text-warmano-gray-400">
            Festpreise ohne versteckte Kosten. Flexible Laufzeiten.
          </p>
        </motion.div>

        {/* Toggles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-12"
        >
          {/* Duration Toggle */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-warmano-gray-500 uppercase tracking-wider">Vertragslaufzeit</span>
            <div className="relative flex bg-warmano-gray-900 rounded-xl p-1 border border-warmano-gray-800">
              <button
                onClick={() => setDuration('1year')}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  duration === '1year'
                    ? 'text-warmano-white'
                    : 'text-warmano-gray-500 hover:text-warmano-gray-300'
                }`}
              >
                {duration === '1year' && (
                  <motion.div
                    layoutId="durationBg"
                    className="absolute inset-0 bg-warmano-gray-800 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">1 Jahr</span>
              </button>
              <button
                onClick={() => setDuration('3years')}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  duration === '3years'
                    ? 'text-warmano-white'
                    : 'text-warmano-gray-500 hover:text-warmano-gray-300'
                }`}
              >
                {duration === '3years' && (
                  <motion.div
                    layoutId="durationBg"
                    className="absolute inset-0 bg-gradient-to-r from-warmano-orange to-amber-500 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  3 Jahre
                  <Gift className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>

          {/* Payment Frequency Toggle */}
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs text-warmano-gray-500 uppercase tracking-wider">Zahlweise</span>
            <div className="relative flex bg-warmano-gray-900 rounded-xl p-1 border border-warmano-gray-800">
              <button
                onClick={() => setFrequency('yearly')}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  frequency === 'yearly'
                    ? 'text-warmano-white'
                    : 'text-warmano-gray-500 hover:text-warmano-gray-300'
                }`}
              >
                {frequency === 'yearly' && (
                  <motion.div
                    layoutId="frequencyBg"
                    className="absolute inset-0 bg-warmano-gray-800 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">Jährlich</span>
              </button>
              <button
                onClick={() => setFrequency('monthly')}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  frequency === 'monthly'
                    ? 'text-warmano-white'
                    : 'text-warmano-gray-500 hover:text-warmano-gray-300'
                }`}
              >
                {frequency === 'monthly' && (
                  <motion.div
                    layoutId="frequencyBg"
                    className="absolute inset-0 bg-warmano-gray-800 rounded-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className="relative z-10">Monatlich</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* 3-Year Promo Banner */}
        <AnimatePresence>
          {duration === '3years' && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-2xl mx-auto mb-10"
            >
              <div className="relative overflow-hidden bg-gradient-to-r from-warmano-orange/20 via-amber-500/20 to-warmano-orange/20 border border-warmano-orange/30 rounded-2xl p-4">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjEiIGZpbGw9IiNGRjREMDAiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9nPjwvc3ZnPg==')] opacity-50" />
                <div className="relative flex flex-col sm:flex-row items-center justify-center gap-3 text-center">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-warmano-orange/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-warmano-orange" />
                    </div>
                    <div className="text-left">
                      <p className="text-warmano-orange font-bold text-lg">AKTION: 1. Jahr GRATIS!</p>
                      <p className="text-warmano-gray-400 text-sm">Bei 3-Jahresvertrag zahlen Sie nur 2 Jahre</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              index={index}
              isInView={isInView}
              onSelect={handleSelectPlan}
              duration={duration}
              frequency={frequency}
            />
          ))}
        </div>

        {/* Trust & Help */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-warmano-gray-500">
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-green-400" />
              </div>
              {duration === '1year' ? 'Jederzeit kündbar' : '3 Jahre Preisgarantie'}
            </span>
            <span className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                <Check className="w-3 h-3 text-green-400" />
              </div>
              Keine versteckten Kosten
            </span>
            {duration === '3years' && (
              <span className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-warmano-orange/20 flex items-center justify-center">
                  <Gift className="w-3 h-3 text-warmano-orange" />
                </div>
                <span className="text-warmano-orange font-medium">1. Jahr geschenkt</span>
              </span>
            )}
            <a href="tel:+498999951433" className="flex items-center gap-2 hover:text-warmano-orange transition-colors group">
              <div className="w-5 h-5 rounded-full bg-warmano-gray-800 flex items-center justify-center group-hover:bg-warmano-orange/20 transition-colors">
                <Phone className="w-3 h-3" />
              </div>
              Fragen? 089 99 95 14-133
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

function PricingCard({
  plan,
  index,
  isInView,
  onSelect,
  duration,
  frequency,
}: {
  plan: typeof plans[0]
  index: number
  isInView: boolean
  onSelect: (name: string) => void
  duration: ContractDuration
  frequency: PaymentFrequency
}) {
  const cardRef = useRef(null)
  const pricing = calculatePrice(plan.price, duration, frequency)
  const priceCount = useCounter(pricing.displayPrice, 1000, isInView)
  const is3Years = duration === '3years'

  return (
    <motion.div
      ref={cardRef}
      custom={index}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="relative h-full"
    >
      {/* Glow effect for popular card */}
      {plan.popular && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-warmano-orange via-amber-500 to-warmano-orange rounded-3xl opacity-50 blur-lg animate-pulse" />
      )}

      <div
        className={`relative h-full rounded-3xl overflow-hidden cursor-pointer group ${
          plan.popular
            ? 'bg-gradient-to-br from-warmano-gray-800/90 to-warmano-gray-900/95 border-2 border-warmano-orange/50'
            : 'bg-warmano-gray-900/80 border border-warmano-gray-800 hover:border-warmano-gray-700'
        }`}
        onClick={() => onSelect(plan.name)}
      >
        {/* Glass overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />

        {/* Popular Badge */}
        {plan.popular && (
          <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-warmano-orange to-amber-500 py-2 text-center">
            <span className="flex items-center justify-center gap-1.5 text-sm font-semibold text-white">
              <Star className="w-4 h-4 fill-current" />
              Beliebteste Wahl
            </span>
          </div>
        )}

        <div className={`relative p-8 ${plan.popular ? 'pt-16' : ''}`}>
          {/* Header */}
          <div className="text-center mb-6">
            <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
              plan.popular
                ? 'bg-warmano-orange/20 text-warmano-orange'
                : 'bg-warmano-gray-800 text-warmano-gray-400'
            }`}>
              {plan.name}
            </div>
            <p className="text-sm text-warmano-gray-500">{plan.description}</p>
          </div>

          {/* Price */}
          <div className="text-center mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${duration}-${frequency}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-baseline justify-center gap-1">
                  <motion.span
                    className={`text-5xl font-bold ${
                      plan.popular
                        ? 'bg-gradient-to-r from-warmano-orange to-amber-400 bg-clip-text text-transparent'
                        : 'text-warmano-white'
                    }`}
                  >
                    {priceCount}€
                  </motion.span>
                  <span className="text-warmano-gray-500 text-lg">
                    {frequency === 'yearly'
                      ? is3Years ? '/3 Jahre' : '/Jahr'
                      : '/Monat'
                    }
                  </span>
                </div>

                {/* Secondary price info */}
                <p className="text-sm text-warmano-gray-500 mt-2">
                  {frequency === 'yearly' ? (
                    <>
                      nur <span className="text-warmano-gray-300 font-medium">{pricing.perMonth}€</span> pro Monat
                    </>
                  ) : (
                    <>
                      Gesamt: <span className="text-warmano-gray-300 font-medium">{pricing.totalPrice}€</span>
                      {is3Years ? ' für 3 Jahre' : ' pro Jahr'}
                    </>
                  )}
                </p>

                {/* Savings Badge for 3-year */}
                {is3Years && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-3 inline-flex items-center gap-1.5 bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full"
                  >
                    <Gift className="w-3.5 h-3.5" />
                    {pricing.savings}€ gespart (1. Jahr gratis)
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + index * 0.1 + i * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${
                  plan.popular ? 'bg-warmano-orange/20' : 'bg-green-500/20'
                }`}>
                  <Check className={`w-3 h-3 ${plan.popular ? 'text-warmano-orange' : 'text-green-400'}`} />
                </div>
                <span className="text-warmano-gray-300 text-sm">{feature}</span>
              </motion.li>
            ))}
            {plan.notIncluded.map((feature, i) => (
              <li key={`not-${i}`} className="flex items-start gap-3 opacity-40">
                <div className="w-5 h-5 rounded-full bg-warmano-gray-800 flex-shrink-0 mt-0.5 flex items-center justify-center">
                  <X className="w-3 h-3 text-warmano-gray-600" />
                </div>
                <span className="text-warmano-gray-500 text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Button
            variant={plan.popular ? 'primary' : 'secondary'}
            className={`w-full group relative overflow-hidden ${
              plan.popular ? 'shadow-glow-orange' : ''
            }`}
            onClick={(e) => {
              e.stopPropagation()
              onSelect(plan.name)
            }}
          >
            <span className="relative z-10 flex items-center justify-center">
              {plan.cta}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </span>
            {plan.popular && (
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            )}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
