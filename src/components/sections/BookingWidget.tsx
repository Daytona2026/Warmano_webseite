'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Check, ChevronRight, ChevronLeft, MapPin, Calendar, Shield, Clock, CreditCard, Star, Zap, Award, Sparkles, Loader2, Gift, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

const deviceBrands = [
  { name: 'Viessmann', icon: '🔥' },
  { name: 'Bosch', icon: '⚡' },
  { name: 'Vaillant', icon: '💨' },
  { name: 'Daikin', icon: '❄️' },
  { name: 'Mitsubishi', icon: '🌡️' },
  { name: 'Panasonic', icon: '🔋' },
  { name: 'Stiebel Eltron', icon: '💧' },
  { name: 'Andere', icon: '🔧' },
]

const packages = [
  {
    id: 'basis',
    name: 'Basis',
    price: 249,
    price3Years: 498,
    popular: false,
    description: 'Jährliche Wartung',
    icon: Shield,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 349,
    price3Years: 698,
    popular: true,
    description: 'Wartung + Reparatur-Schutz',
    icon: Star,
    color: 'from-warmano-orange to-amber-500',
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 499,
    price3Years: 998,
    popular: false,
    description: 'Rundum-Sorglos',
    icon: Award,
    color: 'from-purple-500 to-violet-500',
  },
]

const stepLabels = [
  { label: 'Paket', icon: Sparkles },
  { label: 'Adresse', icon: MapPin },
  { label: 'Termin', icon: Calendar },
  { label: 'Abschluss', icon: Check },
]

// Generate next available dates (excluding weekends)
function getAvailableDates(): { date: string; dateValue: string; slots: string[] }[] {
  const dates: { date: string; dateValue: string; slots: string[] }[] = []
  const today = new Date()
  let daysAdded = 0
  let currentDate = new Date(today)
  currentDate.setDate(currentDate.getDate() + 5) // Start 5 days from now

  while (daysAdded < 5) {
    const dayOfWeek = currentDate.getDay()
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // Skip weekends
      const dayNames = ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa']
      const day = dayNames[dayOfWeek]
      const dateStr = currentDate.toLocaleDateString('de-DE', { day: '2-digit', month: 'short' })
      const dateValue = currentDate.toISOString().split('T')[0]

      dates.push({
        date: `${day}, ${dateStr}`,
        dateValue,
        slots: dayOfWeek === 4 ? ['09:00-12:00'] : ['09:00-12:00', '13:00-16:00'], // Thursday only morning
      })
      daysAdded++
    }
    currentDate.setDate(currentDate.getDate() + 1)
  }
  return dates
}

export default function BookingWidget() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [signUrl, setSignUrl] = useState<string | null>(null)
  const [appointmentUrl, setAppointmentUrl] = useState<string | null>(null)
  const [portalUrl, setPortalUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    package: 'standard',
    contractDuration: '1year' as '1year' | '3years',
    paymentFrequency: 'yearly' as 'yearly' | 'monthly',
    brand: 'Viessmann',
    plz: '',
    city: '',
    street: '',
    date: '',
    dateValue: '',
    time: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    agbAccepted: false,
  })

  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const timeSlots = getAvailableDates()

  const totalSteps = 4

  const updateForm = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => setStep(prev => Math.min(prev + 1, totalSteps))
  const prevStep = () => setStep(prev => Math.max(prev - 1, 1))

  const selectedPackage = packages.find(p => p.id === formData.package)
  const is3Years = formData.contractDuration === '3years'
  const displayPrice = is3Years
    ? selectedPackage?.price3Years
    : selectedPackage?.price
  const monthlyPrice = is3Years
    ? Math.round((selectedPackage?.price3Years || 0) / 36)
    : Math.round((selectedPackage?.price || 0) / 12)

  // Validation helpers
  const isStep1Valid = formData.brand !== ''
  const isStep2Valid = /^\d{5}$/.test(formData.plz) && formData.city !== '' && formData.street !== ''
  const isStep3Valid = formData.date !== '' && formData.time !== ''
  const isStep4Valid = formData.firstName !== '' && formData.lastName !== '' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) && formData.phone.length >= 6 && formData.agbAccepted

  // Handle form submission
  const handleSubmit = async () => {
    if (!isStep4Valid) return

    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          street: formData.street,
          zipCode: formData.plz,
          city: formData.city,
          package: formData.package,
          contractDuration: formData.contractDuration,
          paymentFrequency: formData.paymentFrequency,
          manufacturer: formData.brand,
          preferredDate: formData.dateValue,
          message: `Termin: ${formData.date}, ${formData.time}`,
        }),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        if (result.signUrl) {
          setSignUrl(result.signUrl)
        }
        if (result.appointmentUrl) {
          setAppointmentUrl(result.appointmentUrl)
        }
        if (result.portalUrl) {
          setPortalUrl(result.portalUrl)
        }
      } else {
        setError(result.error || 'Buchung fehlgeschlagen. Bitte versuchen Sie es erneut.')
      }
    } catch (err) {
      setError('Netzwerkfehler. Bitte prüfen Sie Ihre Internetverbindung.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Success screen with Sign and Appointment flow
  if (isSuccess) {
    return (
      <section id="booking" ref={sectionRef} className="relative py-24 lg:py-32 bg-warmano-black overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-warmano-gray-900/50 via-warmano-black to-warmano-black" />
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-green-500 blur-[200px]"
        />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
              className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/30"
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-3xl font-bold text-warmano-white mb-4">
              {signUrl ? 'Fast geschafft!' : 'Buchung erfolgreich!'}
            </h2>
            <p className="text-lg text-warmano-gray-400 mb-8">
              {signUrl
                ? 'Bitte unterschreiben Sie jetzt Ihren Wartungsvertrag digital. Danach können Sie Ihren Termin buchen.'
                : 'Vielen Dank für Ihre Buchung. Sie können jetzt Ihren Wartungstermin auswählen.'
              }
            </p>

            <div className="bg-warmano-gray-800/50 border border-warmano-gray-700/50 rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-semibold text-warmano-white mb-4">Ihre Buchungsdetails:</h3>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-warmano-gray-400">Paket:</span>
                  <span className="text-warmano-white font-medium">{selectedPackage?.name}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-warmano-gray-400">Laufzeit:</span>
                  <span className="text-warmano-white font-medium">{is3Years ? '3 Jahre' : '1 Jahr'}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-warmano-gray-400">Wunschtermin:</span>
                  <span className="text-warmano-white font-medium">{formData.date}, {formData.time}</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-warmano-gray-400">Preis:</span>
                  <span className="text-warmano-orange font-bold">{displayPrice}€ {is3Years ? '/ 3 Jahre' : '/ Jahr'}</span>
                </p>
              </div>
              {is3Years && (
                <div className="mt-3 p-2 bg-green-500/20 rounded-lg flex items-center gap-2 text-sm text-green-400">
                  <Gift className="w-4 h-4" />
                  1. Jahr gratis – Sie sparen {selectedPackage?.price}€!
                </div>
              )}
            </div>

            {/* Action Buttons - Sign first, then Appointment */}
            <div className="space-y-4">
              {signUrl ? (
                <>
                  {/* Step 1: Sign Contract */}
                  <motion.a
                    href={signUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-warmano-orange to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-warmano-orange/30 hover:shadow-xl hover:shadow-warmano-orange/40 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                    Vertrag digital unterschreiben
                  </motion.a>

                  {/* Step 2: Book Appointment (secondary, shown after signing info) */}
                  {appointmentUrl && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="text-center"
                    >
                      <p className="text-sm text-warmano-gray-500 mb-3">
                        Nach der Unterschrift:
                      </p>
                      <a
                        href={appointmentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-warmano-gray-800 border border-warmano-gray-700 text-warmano-white font-medium rounded-xl hover:bg-warmano-gray-700 transition-colors"
                      >
                        <Calendar className="w-5 h-5" />
                        Wartungstermin buchen
                      </a>
                    </motion.div>
                  )}
                </>
              ) : (
                /* No Sign URL - go directly to appointment */
                appointmentUrl && (
                  <motion.a
                    href={appointmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex items-center justify-center gap-3 w-full px-6 py-4 bg-gradient-to-r from-warmano-orange to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-warmano-orange/30 hover:shadow-xl hover:shadow-warmano-orange/40 transition-all"
                  >
                    <Calendar className="w-5 h-5" />
                    Jetzt Wartungstermin buchen
                  </motion.a>
                )
              )}
            </div>

            {/* Portal Access Info */}
            {portalUrl && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-6 p-4 bg-warmano-gray-800/50 border border-warmano-gray-700/50 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-warmano-white text-sm">Ihr Kundenportal</h4>
                    <p className="text-xs text-warmano-gray-400 mt-1">
                      Sie erhalten in Kürze eine E-Mail mit Ihren Zugangsdaten zum Kundenportal.
                      Dort können Sie Ihre Verträge, Termine und Rechnungen einsehen.
                    </p>
                    <a
                      href={portalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 mt-2"
                    >
                      Zum Kundenportal
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                </div>
              </motion.div>
            )}

            <p className="text-sm text-warmano-gray-500 mt-6">
              Eine Bestätigung wurde an <span className="text-warmano-white">{formData.email}</span> gesendet.
            </p>
          </motion.div>
        </Container>
      </section>
    )
  }

  return (
    <section id="booking" ref={sectionRef} className="relative py-24 lg:py-32 bg-warmano-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-warmano-gray-900/50 via-warmano-black to-warmano-black" />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-warmano-orange blur-[200px]"
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-warmano-orange/10 border border-warmano-orange/20 text-warmano-orange text-sm font-medium rounded-full mb-4"
          >
            Jetzt buchen
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmano-white mb-4">
            Wartung{' '}
            <span className="bg-gradient-to-r from-warmano-orange via-amber-500 to-warmano-orange-light bg-clip-text text-transparent">
              online buchen
            </span>
          </h2>
          <p className="text-lg text-warmano-gray-400">
            In 2 Minuten zum Wartungstermin. Einfach, schnell, verbindlich.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {/* Premium Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-10"
          >
            <div className="flex justify-between items-center relative">
              {/* Progress line background */}
              <div className="absolute top-5 left-0 right-0 h-1 bg-warmano-gray-800 rounded-full mx-8" />
              {/* Animated progress line */}
              <motion.div
                className="absolute top-5 left-0 h-1 bg-gradient-to-r from-warmano-orange to-amber-500 rounded-full mx-8"
                initial={{ width: '0%' }}
                animate={{ width: `${((step - 1) / (totalSteps - 1)) * 100}%` }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                style={{ maxWidth: 'calc(100% - 4rem)' }}
              />

              {stepLabels.map((item, i) => {
                const isActive = i + 1 === step
                const isCompleted = i + 1 < step
                const StepIcon = item.icon

                return (
                  <div key={item.label} className="relative z-10 flex flex-col items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        scale: isActive ? 1.1 : 1,
                        backgroundColor: isCompleted || isActive ? '#FF4D00' : '#2A2A2A',
                      }}
                      transition={{ duration: 0.3 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted
                          ? 'border-warmano-orange bg-warmano-orange'
                          : isActive
                          ? 'border-warmano-orange bg-warmano-orange shadow-lg shadow-warmano-orange/50'
                          : 'border-warmano-gray-700 bg-warmano-gray-800'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-white" />
                      ) : (
                        <StepIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-warmano-gray-500'}`} />
                      )}
                    </motion.div>
                    <span
                      className={`text-xs font-medium mt-2 transition-colors ${
                        isActive || isCompleted ? 'text-warmano-orange' : 'text-warmano-gray-600'
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>

          {/* Form Card with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-warmano-orange/20 via-amber-500/10 to-warmano-orange/20 rounded-3xl blur-xl opacity-50" />

            <div className="relative bg-gradient-to-br from-warmano-gray-800/80 to-warmano-gray-900/90 backdrop-blur-xl border border-warmano-gray-700/50 rounded-3xl p-6 sm:p-8 overflow-hidden">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-warmano-orange/5 via-transparent to-amber-500/5 pointer-events-none rounded-3xl" />

              <AnimatePresence mode="wait">
                {/* Step 1: Package Selection */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <h3 className="text-xl font-bold text-warmano-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-warmano-orange/20 flex items-center justify-center text-warmano-orange text-sm font-bold">1</span>
                      Welches Paket möchten Sie?
                    </h3>

                    {/* Contract Duration Toggle */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-warmano-gray-300 mb-3">
                        Vertragslaufzeit
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateForm('contractDuration', '1year')}
                          className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                            formData.contractDuration === '1year'
                              ? 'border-warmano-orange bg-warmano-orange/10'
                              : 'border-warmano-gray-700/50 hover:border-warmano-gray-600'
                          }`}
                        >
                          <span className="font-semibold text-warmano-white">1 Jahr</span>
                          <p className="text-xs text-warmano-gray-400 mt-1">Jederzeit kündbar</p>
                        </button>
                        <button
                          onClick={() => updateForm('contractDuration', '3years')}
                          className={`flex-1 p-4 rounded-xl border-2 transition-all relative overflow-hidden ${
                            formData.contractDuration === '3years'
                              ? 'border-warmano-orange bg-warmano-orange/10'
                              : 'border-warmano-gray-700/50 hover:border-warmano-gray-600'
                          }`}
                        >
                          <div className="absolute top-0 right-0 bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-bl-lg flex items-center gap-1">
                            <Gift className="w-3 h-3" /> 1. Jahr gratis
                          </div>
                          <span className="font-semibold text-warmano-white">3 Jahre</span>
                          <p className="text-xs text-warmano-gray-400 mt-1">Nur 2 Jahre zahlen</p>
                        </button>
                      </div>
                    </div>

                    {/* Package Selection */}
                    <div className="space-y-3 mb-6">
                      {packages.map((pkg) => {
                        const isSelected = formData.package === pkg.id
                        const PkgIcon = pkg.icon
                        const price = is3Years ? pkg.price3Years : pkg.price

                        return (
                          <motion.button
                            key={pkg.id}
                            onClick={() => updateForm('package', pkg.id)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`relative w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 overflow-hidden ${
                              isSelected
                                ? 'border-warmano-orange bg-warmano-orange/10 shadow-lg shadow-warmano-orange/20'
                                : 'border-warmano-gray-700/50 bg-warmano-gray-800/30 hover:border-warmano-gray-600'
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId="package-glow"
                                className="absolute inset-0 bg-gradient-to-r from-warmano-orange/10 via-amber-500/5 to-transparent"
                              />
                            )}

                            <div className="relative flex items-center justify-between">
                              <div className="flex items-center gap-4">
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${pkg.color} flex items-center justify-center shadow-lg ${isSelected ? 'scale-110' : ''} transition-transform`}>
                                  <PkgIcon className="w-6 h-6 text-white" />
                                </div>

                                <div>
                                  <div className="flex items-center gap-2">
                                    <span className="font-bold text-warmano-white text-lg">{pkg.name}</span>
                                    {pkg.popular && (
                                      <span className="text-xs bg-gradient-to-r from-warmano-orange to-amber-500 text-white px-2.5 py-1 rounded-full font-semibold shadow-sm">
                                        Empfohlen
                                      </span>
                                    )}
                                  </div>
                                  <p className="text-sm text-warmano-gray-400">{pkg.description}</p>
                                </div>
                              </div>

                              <div className="text-right">
                                <span className="font-bold text-warmano-white text-2xl">{price}€</span>
                                <span className="text-warmano-gray-500 text-sm">{is3Years ? '/3J.' : '/Jahr'}</span>
                                {is3Years && (
                                  <p className="text-xs text-green-400">Spare {pkg.price}€</p>
                                )}
                              </div>
                            </div>

                            <motion.div
                              initial={false}
                              animate={{ scale: isSelected ? 1 : 0 }}
                              className="absolute top-3 right-3 w-6 h-6 rounded-full bg-warmano-orange flex items-center justify-center"
                            >
                              <Check className="w-4 h-4 text-white" />
                            </motion.div>
                          </motion.button>
                        )
                      })}
                    </div>

                    {/* Payment Frequency */}
                    <div className="mb-6">
                      <label className="block text-sm font-semibold text-warmano-gray-300 mb-3">
                        Zahlweise
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => updateForm('paymentFrequency', 'yearly')}
                          className={`flex-1 p-3 rounded-xl border transition-all text-sm ${
                            formData.paymentFrequency === 'yearly'
                              ? 'border-warmano-orange bg-warmano-orange/10 text-warmano-white'
                              : 'border-warmano-gray-700/50 text-warmano-gray-400 hover:border-warmano-gray-600'
                          }`}
                        >
                          Jährlich ({displayPrice}€)
                        </button>
                        <button
                          onClick={() => updateForm('paymentFrequency', 'monthly')}
                          className={`flex-1 p-3 rounded-xl border transition-all text-sm ${
                            formData.paymentFrequency === 'monthly'
                              ? 'border-warmano-orange bg-warmano-orange/10 text-warmano-white'
                              : 'border-warmano-gray-700/50 text-warmano-gray-400 hover:border-warmano-gray-600'
                          }`}
                        >
                          Monatlich ({monthlyPrice}€/Mt.)
                        </button>
                      </div>
                    </div>

                    {/* Brand Selection */}
                    <div className="mb-8">
                      <label className="block text-sm font-semibold text-warmano-gray-300 mb-4">
                        Welche Marke hat Ihre Wärmepumpe?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {deviceBrands.map((brand) => {
                          const isSelected = formData.brand === brand.name
                          return (
                            <motion.button
                              key={brand.name}
                              onClick={() => updateForm('brand', brand.name)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`relative px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 flex flex-col items-center gap-1.5 ${
                                isSelected
                                  ? 'bg-gradient-to-r from-warmano-orange to-amber-500 text-white shadow-lg shadow-warmano-orange/30'
                                  : 'bg-warmano-gray-800/50 text-warmano-gray-300 hover:bg-warmano-gray-700/50 hover:text-white border border-warmano-gray-700/50'
                              }`}
                            >
                              <span className="text-lg">{brand.icon}</span>
                              <span className="text-xs">{brand.name}</span>
                            </motion.button>
                          )
                        })}
                      </div>
                    </div>

                    <Button
                      onClick={nextStep}
                      disabled={!isStep1Valid}
                      className="w-full text-base py-4 shadow-glow-orange hover:shadow-glow-orange-lg transition-shadow"
                    >
                      Weiter zur Adresse
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </motion.div>
                )}

                {/* Step 2: Address */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <h3 className="text-xl font-bold text-warmano-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-warmano-orange/20 flex items-center justify-center text-warmano-orange text-sm font-bold">2</span>
                      Wo befindet sich Ihre Wärmepumpe?
                    </h3>

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="PLZ *"
                          value={formData.plz}
                          onChange={(e) => updateForm('plz', e.target.value)}
                          className="input-field bg-warmano-gray-800/50 border-warmano-gray-700/50"
                          maxLength={5}
                        />
                        <input
                          type="text"
                          placeholder="Stadt *"
                          value={formData.city}
                          onChange={(e) => updateForm('city', e.target.value)}
                          className="input-field col-span-2 bg-warmano-gray-800/50 border-warmano-gray-700/50"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="Straße und Hausnummer *"
                        value={formData.street}
                        onChange={(e) => updateForm('street', e.target.value)}
                        className="input-field bg-warmano-gray-800/50 border-warmano-gray-700/50"
                      />
                    </div>

                    <div className="p-4 bg-warmano-orange/10 border border-warmano-orange/20 rounded-xl mb-6 flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-warmano-orange/20 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-warmano-orange" />
                      </div>
                      <div className="text-sm">
                        <p className="text-warmano-white font-semibold">Service-Gebiet</p>
                        <p className="text-warmano-gray-400">München und Umgebung (50km Radius)</p>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="secondary" onClick={prevStep} className="px-6">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Zurück
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={!isStep2Valid}
                        className="flex-1 py-4 shadow-glow-orange hover:shadow-glow-orange-lg transition-shadow"
                      >
                        Weiter zum Termin
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Date/Time */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <h3 className="text-xl font-bold text-warmano-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-warmano-orange/20 flex items-center justify-center text-warmano-orange text-sm font-bold">3</span>
                      Wann passt es Ihnen?
                    </h3>

                    <div className="space-y-3 mb-6">
                      {timeSlots.map((day) => (
                        <div key={day.date} className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="text-warmano-gray-400 text-sm font-medium w-28 flex-shrink-0">{day.date}</span>
                          <div className="flex gap-2 flex-1">
                            {day.slots.map((slot) => {
                              const isSelected = formData.date === day.date && formData.time === slot
                              return (
                                <motion.button
                                  key={`${day.date}-${slot}`}
                                  onClick={() => {
                                    updateForm('date', day.date)
                                    updateForm('dateValue', day.dateValue)
                                    updateForm('time', slot)
                                  }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  className={`flex-1 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                                    isSelected
                                      ? 'bg-gradient-to-r from-warmano-orange to-amber-500 text-white shadow-lg shadow-warmano-orange/30'
                                      : 'bg-warmano-gray-800/50 text-warmano-gray-300 hover:bg-warmano-gray-700/50 border border-warmano-gray-700/50'
                                  }`}
                                >
                                  <Clock className={`w-4 h-4 mx-auto mb-1 ${isSelected ? 'text-white' : 'text-warmano-gray-500'}`} />
                                  {slot}
                                </motion.button>
                              )
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-3">
                      <Button variant="secondary" onClick={prevStep} className="px-6">
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Zurück
                      </Button>
                      <Button
                        onClick={nextStep}
                        disabled={!isStep3Valid}
                        className="flex-1 py-4 shadow-glow-orange hover:shadow-glow-orange-lg transition-shadow"
                      >
                        Weiter zum Abschluss
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Contact & Summary */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10"
                  >
                    <h3 className="text-xl font-bold text-warmano-white mb-6 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-warmano-orange/20 flex items-center justify-center text-warmano-orange text-sm font-bold">4</span>
                      Ihre Kontaktdaten
                    </h3>

                    {/* Summary Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gradient-to-br from-warmano-orange/20 to-amber-500/10 border border-warmano-orange/30 rounded-2xl p-5 mb-6"
                    >
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-warmano-orange flex items-center justify-center">
                          <Check className="w-5 h-5 text-white" />
                        </div>
                        <h4 className="font-bold text-warmano-white">Ihre Buchungsübersicht</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="bg-warmano-black/30 rounded-lg p-3">
                          <span className="text-warmano-gray-400 text-xs">Paket</span>
                          <p className="text-warmano-white font-semibold">{selectedPackage?.name}</p>
                        </div>
                        <div className="bg-warmano-black/30 rounded-lg p-3">
                          <span className="text-warmano-gray-400 text-xs">Preis</span>
                          <p className="text-warmano-orange font-semibold">{displayPrice}€ {is3Years ? '/ 3 Jahre' : '/ Jahr'}</p>
                        </div>
                        <div className="bg-warmano-black/30 rounded-lg p-3">
                          <span className="text-warmano-gray-400 text-xs">Termin</span>
                          <p className="text-warmano-white font-semibold">{formData.date}, {formData.time}</p>
                        </div>
                        <div className="bg-warmano-black/30 rounded-lg p-3">
                          <span className="text-warmano-gray-400 text-xs">Adresse</span>
                          <p className="text-warmano-white font-semibold text-xs">{formData.street}, {formData.plz} {formData.city}</p>
                        </div>
                      </div>
                      {is3Years && (
                        <div className="mt-3 p-2 bg-green-500/20 rounded-lg flex items-center gap-2 text-sm text-green-400">
                          <Gift className="w-4 h-4" />
                          1. Jahr gratis – Sie sparen {selectedPackage?.price}€!
                        </div>
                      )}
                    </motion.div>

                    <div className="space-y-4 mb-6">
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Vorname *"
                          value={formData.firstName}
                          onChange={(e) => updateForm('firstName', e.target.value)}
                          className="input-field bg-warmano-gray-800/50 border-warmano-gray-700/50"
                        />
                        <input
                          type="text"
                          placeholder="Nachname *"
                          value={formData.lastName}
                          onChange={(e) => updateForm('lastName', e.target.value)}
                          className="input-field bg-warmano-gray-800/50 border-warmano-gray-700/50"
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="E-Mail-Adresse *"
                        value={formData.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        className="input-field bg-warmano-gray-800/50 border-warmano-gray-700/50"
                      />
                      <input
                        type="tel"
                        placeholder="Telefon * (für Terminbestätigung)"
                        value={formData.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        className="input-field bg-warmano-gray-800/50 border-warmano-gray-700/50"
                      />
                    </div>

                    {error && (
                      <div className="p-4 mb-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
                        {error}
                      </div>
                    )}

                    <label className="flex items-start gap-3 mb-6 cursor-pointer group">
                      <div className="relative mt-0.5">
                        <input
                          type="checkbox"
                          checked={formData.agbAccepted}
                          onChange={(e) => updateForm('agbAccepted', e.target.checked)}
                          className="sr-only peer"
                        />
                        <motion.div
                          whileTap={{ scale: 0.9 }}
                          className={`w-6 h-6 border-2 rounded-lg transition-all flex items-center justify-center ${
                            formData.agbAccepted
                              ? 'border-warmano-orange bg-warmano-orange'
                              : 'border-warmano-gray-600 group-hover:border-warmano-gray-500'
                          }`}
                        >
                          {formData.agbAccepted && <Check className="w-4 h-4 text-white" />}
                        </motion.div>
                      </div>
                      <span className="text-sm text-warmano-gray-400 group-hover:text-warmano-gray-300">
                        Ich akzeptiere die <Link href="/agb" className="text-warmano-orange hover:underline">AGB</Link> und <Link href="/datenschutz" className="text-warmano-orange hover:underline">Datenschutzerklärung</Link> *
                      </span>
                    </label>

                    <div className="flex gap-3">
                      <Button variant="secondary" onClick={prevStep} className="px-6" disabled={isSubmitting}>
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Zurück
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={!isStep4Valid || isSubmitting}
                        className="flex-1 text-lg py-4 shadow-glow-orange hover:shadow-glow-orange-lg transition-shadow"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Wird verarbeitet...
                          </>
                        ) : (
                          <>
                            Weiter zur Vertragsunterschrift
                            <ChevronRight className="w-5 h-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap justify-center gap-6 mt-8 pt-6 border-t border-warmano-gray-700/50">
                      {[
                        { icon: Shield, text: 'SSL-verschlüsselt' },
                        { icon: CreditCard, text: 'Sichere Zahlung' },
                        { icon: Clock, text: '14 Tage Widerruf' },
                      ].map((item, i) => (
                        <span key={i} className="flex items-center gap-2 text-xs text-warmano-gray-500">
                          <div className="w-6 h-6 rounded-md bg-warmano-gray-800/50 flex items-center justify-center">
                            <item.icon className="w-3.5 h-3.5" />
                          </div>
                          {item.text}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
