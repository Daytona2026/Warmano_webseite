'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X, Settings, Check } from 'lucide-react'
import { Link } from '@/i18n/routing'

type CookieConsent = {
  necessary: boolean
  functional: boolean
  analytics: boolean
  timestamp: number
}

const COOKIE_CONSENT_KEY = 'warmano_cookie_consent'

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [consent, setConsent] = useState<CookieConsent>({
    necessary: true, // Always true, can't be disabled
    functional: false,
    analytics: false,
    timestamp: 0,
  })

  useEffect(() => {
    // Check if consent was already given
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY)
    if (storedConsent) {
      try {
        const parsed = JSON.parse(storedConsent) as CookieConsent
        // Show banner again after 1 year
        const oneYear = 365 * 24 * 60 * 60 * 1000
        if (Date.now() - parsed.timestamp < oneYear) {
          setConsent(parsed)
          return
        }
      } catch {
        // Invalid stored consent, show banner
      }
    }
    // Small delay to prevent flash on page load
    const timer = setTimeout(() => setShowBanner(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const saveConsent = (newConsent: CookieConsent) => {
    const consentWithTimestamp = { ...newConsent, timestamp: Date.now() }
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentWithTimestamp))
    setConsent(consentWithTimestamp)
    setShowBanner(false)
    setShowSettings(false)
  }

  const acceptAll = () => {
    saveConsent({
      necessary: true,
      functional: true,
      analytics: true,
      timestamp: Date.now(),
    })
  }

  const acceptNecessary = () => {
    saveConsent({
      necessary: true,
      functional: false,
      analytics: false,
      timestamp: Date.now(),
    })
  }

  const saveSettings = () => {
    saveConsent(consent)
  }

  if (!showBanner) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
        className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6"
      >
        <div className="max-w-4xl mx-auto">
          <div className="bg-warmano-gray-900 border border-warmano-gray-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Main Banner */}
            {!showSettings && (
              <div className="p-5 sm:p-6">
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex w-12 h-12 rounded-xl bg-warmano-orange/10 items-center justify-center flex-shrink-0">
                    <Cookie className="w-6 h-6 text-warmano-orange" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-warmano-white mb-2">
                      Diese Website verwendet Cookies
                    </h3>
                    <p className="text-sm text-warmano-gray-400 leading-relaxed">
                      Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.
                      Technisch notwendige Cookies sind für die Grundfunktionen der Website erforderlich.
                      Weitere Informationen finden Sie in unserer{' '}
                      <Link href="/datenschutz" className="text-warmano-orange hover:underline">
                        Datenschutzerklärung
                      </Link>
                      .
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-5">
                  <button
                    onClick={() => setShowSettings(true)}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-warmano-gray-400 hover:text-warmano-white border border-warmano-gray-700 hover:border-warmano-gray-600 rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Einstellungen
                  </button>
                  <button
                    onClick={acceptNecessary}
                    className="px-4 py-2.5 text-sm font-medium text-warmano-gray-300 hover:text-warmano-white bg-warmano-gray-800 hover:bg-warmano-gray-700 rounded-lg transition-colors"
                  >
                    Nur notwendige
                  </button>
                  <button
                    onClick={acceptAll}
                    className="px-6 py-2.5 text-sm font-semibold text-white bg-warmano-orange hover:bg-warmano-orange/90 rounded-lg transition-colors shadow-glow-orange"
                  >
                    Alle akzeptieren
                  </button>
                </div>
              </div>
            )}

            {/* Settings Panel */}
            {showSettings && (
              <div className="p-5 sm:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-lg font-semibold text-warmano-white">Cookie-Einstellungen</h3>
                  <button
                    onClick={() => setShowSettings(false)}
                    className="p-1.5 text-warmano-gray-500 hover:text-warmano-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-warmano-gray-800/50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-warmano-white">Notwendige Cookies</span>
                        <span className="text-xs px-2 py-0.5 bg-warmano-gray-700 text-warmano-gray-400 rounded">
                          Immer aktiv
                        </span>
                      </div>
                      <p className="text-sm text-warmano-gray-500">
                        Diese Cookies sind für die Grundfunktionen der Website erforderlich und können nicht
                        deaktiviert werden.
                      </p>
                    </div>
                    <div className="w-12 h-6 bg-warmano-orange/20 rounded-full flex items-center justify-end px-1">
                      <div className="w-4 h-4 bg-warmano-orange rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Functional Cookies */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-warmano-gray-800/50 rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium text-warmano-white block mb-1">Funktionale Cookies</span>
                      <p className="text-sm text-warmano-gray-500">
                        Diese Cookies ermöglichen erweiterte Funktionen und Personalisierung, z.B. das Speichern
                        Ihrer Einstellungen.
                      </p>
                    </div>
                    <button
                      onClick={() => setConsent((prev) => ({ ...prev, functional: !prev.functional }))}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        consent.functional ? 'bg-warmano-orange/20 justify-end' : 'bg-warmano-gray-700 justify-start'
                      } px-1`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                          consent.functional ? 'bg-warmano-orange' : 'bg-warmano-gray-500'
                        }`}
                      >
                        {consent.functional && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                    </button>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="flex items-start justify-between gap-4 p-4 bg-warmano-gray-800/50 rounded-lg">
                    <div className="flex-1">
                      <span className="font-medium text-warmano-white block mb-1">Analyse-Cookies</span>
                      <p className="text-sm text-warmano-gray-500">
                        Diese Cookies helfen uns zu verstehen, wie Besucher mit der Website interagieren, und
                        ermöglichen uns, sie zu verbessern.
                      </p>
                    </div>
                    <button
                      onClick={() => setConsent((prev) => ({ ...prev, analytics: !prev.analytics }))}
                      className={`w-12 h-6 rounded-full flex items-center transition-colors ${
                        consent.analytics ? 'bg-warmano-orange/20 justify-end' : 'bg-warmano-gray-700 justify-start'
                      } px-1`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center transition-colors ${
                          consent.analytics ? 'bg-warmano-orange' : 'bg-warmano-gray-500'
                        }`}
                      >
                        {consent.analytics && <Check className="w-2.5 h-2.5 text-white" />}
                      </div>
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={acceptNecessary}
                    className="flex-1 px-4 py-2.5 text-sm font-medium text-warmano-gray-300 hover:text-warmano-white bg-warmano-gray-800 hover:bg-warmano-gray-700 rounded-lg transition-colors"
                  >
                    Nur notwendige
                  </button>
                  <button
                    onClick={saveSettings}
                    className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-warmano-orange hover:bg-warmano-orange/90 rounded-lg transition-colors"
                  >
                    Auswahl speichern
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
