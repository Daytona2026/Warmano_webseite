'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Users, Send, CheckCircle, AlertCircle, Copy, Check } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function ReferralProgram() {
  const [activeTab, setActiveTab] = useState<'refer' | 'stats'>('refer')
  const [formData, setFormData] = useState({
    referrerEmail: '',
    referredName: '',
    referredEmail: '',
    referredPhone: '',
  })
  const [statsEmail, setStatsEmail] = useState('')
  const [stats, setStats] = useState<{
    totalReferrals: number
    successfulReferrals: number
    pendingReferrals: number
    referralCode: string
  } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSubmitReferral = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/referral', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
      } else {
        setError(result.error || 'Ein Fehler ist aufgetreten')
      }
    } catch {
      setError('Netzwerkfehler. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGetStats = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch(`/api/referral?email=${encodeURIComponent(statsEmail)}`)
      const result = await response.json()

      if (result.success && result.stats) {
        setStats(result.stats)
      } else {
        setError(result.error || 'Statistiken konnten nicht geladen werden')
      }
    } catch {
      setError('Netzwerkfehler. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const copyReferralCode = () => {
    if (stats?.referralCode) {
      navigator.clipboard.writeText(stats.referralCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <section id="referral" className="py-24 bg-warmano-black">
      <Container>
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-warmano-orange/20 flex items-center justify-center">
              <Gift className="w-8 h-8 text-warmano-orange" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Empfehlungsprogramm
            </h2>
            <p className="text-warmano-gray-400">
              Empfehlen Sie WARMANO weiter und profitieren Sie beide!
            </p>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
            <div className="bg-warmano-gray-900 rounded-xl p-6 border border-warmano-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6 text-warmano-orange" />
                <h3 className="font-semibold text-white">Für Sie</h3>
              </div>
              <p className="text-warmano-gray-400 text-sm">
                50€ Gutschrift auf Ihre nächste Rechnung für jede erfolgreiche Empfehlung
              </p>
            </div>
            <div className="bg-warmano-gray-900 rounded-xl p-6 border border-warmano-gray-800">
              <div className="flex items-center gap-3 mb-2">
                <Gift className="w-6 h-6 text-warmano-orange" />
                <h3 className="font-semibold text-white">Für Ihren Freund</h3>
              </div>
              <p className="text-warmano-gray-400 text-sm">
                10% Rabatt auf den ersten Wartungsvertrag
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('refer')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                activeTab === 'refer'
                  ? 'bg-warmano-orange text-white'
                  : 'bg-warmano-gray-800 text-warmano-gray-400 hover:text-white'
              }`}
            >
              Jemanden empfehlen
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-colors ${
                activeTab === 'stats'
                  ? 'bg-warmano-orange text-white'
                  : 'bg-warmano-gray-800 text-warmano-gray-400 hover:text-white'
              }`}
            >
              Meine Empfehlungen
            </button>
          </div>

          {activeTab === 'refer' && (
            <>
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Vielen Dank!
                  </h3>
                  <p className="text-warmano-gray-400">
                    Ihre Empfehlung wurde erfolgreich übermittelt. Wir kontaktieren Ihren Freund in Kürze.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmitReferral} className="space-y-6">
                  <div>
                    <label htmlFor="referrer-email" className="block text-sm font-medium text-warmano-gray-300 mb-2">
                      Ihre E-Mail (als Empfehler) *
                    </label>
                    <input
                      id="referrer-email"
                      type="email"
                      required
                      value={formData.referrerEmail}
                      onChange={(e) => setFormData({ ...formData, referrerEmail: e.target.value })}
                      className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white placeholder-warmano-gray-400 focus:outline-none focus:border-warmano-orange transition-colors"
                      placeholder="ihre@email.de"
                    />
                  </div>

                  <div className="border-t border-warmano-gray-800 pt-6">
                    <p className="text-sm text-warmano-gray-400 mb-4">Wen möchten Sie empfehlen?</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="referred-name" className="block text-sm font-medium text-warmano-gray-300 mb-2">
                          Name *
                        </label>
                        <input
                          id="referred-name"
                          type="text"
                          required
                          value={formData.referredName}
                          onChange={(e) => setFormData({ ...formData, referredName: e.target.value })}
                          className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white placeholder-warmano-gray-400 focus:outline-none focus:border-warmano-orange transition-colors"
                          placeholder="Name Ihres Freundes"
                        />
                      </div>
                      <div>
                        <label htmlFor="referred-email" className="block text-sm font-medium text-warmano-gray-300 mb-2">
                          E-Mail *
                        </label>
                        <input
                          id="referred-email"
                          type="email"
                          required
                          value={formData.referredEmail}
                          onChange={(e) => setFormData({ ...formData, referredEmail: e.target.value })}
                          className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white placeholder-warmano-gray-400 focus:outline-none focus:border-warmano-orange transition-colors"
                          placeholder="freund@email.de"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label htmlFor="referred-phone" className="block text-sm font-medium text-warmano-gray-300 mb-2">
                        Telefon (optional)
                      </label>
                      <input
                        id="referred-phone"
                        type="tel"
                        value={formData.referredPhone}
                        onChange={(e) => setFormData({ ...formData, referredPhone: e.target.value })}
                        className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white placeholder-warmano-gray-400 focus:outline-none focus:border-warmano-orange transition-colors"
                        placeholder="+49 123 456789"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? (
                      'Wird gesendet...'
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Empfehlung senden
                      </>
                    )}
                  </Button>
                </form>
              )}
            </>
          )}

          {activeTab === 'stats' && (
            <>
              {stats ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-6"
                >
                  {/* Referral Code */}
                  <div className="bg-warmano-gray-900 rounded-xl p-6 border border-warmano-orange/30">
                    <p className="text-sm text-warmano-gray-400 mb-2">Ihr Empfehlungscode</p>
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-bold text-warmano-orange">{stats.referralCode}</span>
                      <button
                        onClick={copyReferralCode}
                        className="p-2 bg-warmano-gray-800 rounded-lg hover:bg-warmano-gray-700 transition-colors"
                      >
                        {copied ? (
                          <Check className="w-5 h-5 text-green-500" />
                        ) : (
                          <Copy className="w-5 h-5 text-warmano-gray-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-warmano-gray-900 rounded-xl p-6 text-center">
                      <p className="text-3xl font-bold text-white">{stats.totalReferrals}</p>
                      <p className="text-sm text-warmano-gray-400">Gesamt</p>
                    </div>
                    <div className="bg-warmano-gray-900 rounded-xl p-6 text-center">
                      <p className="text-3xl font-bold text-green-500">{stats.successfulReferrals}</p>
                      <p className="text-sm text-warmano-gray-400">Erfolgreich</p>
                    </div>
                    <div className="bg-warmano-gray-900 rounded-xl p-6 text-center">
                      <p className="text-3xl font-bold text-yellow-500">{stats.pendingReferrals}</p>
                      <p className="text-sm text-warmano-gray-400">Ausstehend</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setStats(null)}
                    className="text-warmano-gray-400 hover:text-white text-sm"
                  >
                    ← Andere E-Mail eingeben
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleGetStats} className="space-y-6">
                  <div>
                    <label htmlFor="stats-email" className="block text-sm font-medium text-warmano-gray-300 mb-2">
                      Ihre E-Mail *
                    </label>
                    <input
                      id="stats-email"
                      type="email"
                      required
                      value={statsEmail}
                      onChange={(e) => setStatsEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white placeholder-warmano-gray-400 focus:outline-none focus:border-warmano-orange transition-colors"
                      placeholder="ihre@email.de"
                    />
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Button type="submit" disabled={isSubmitting} className="w-full">
                    {isSubmitting ? 'Wird geladen...' : 'Statistiken anzeigen'}
                  </Button>
                </form>
              )}
            </>
          )}
        </div>
      </Container>
    </section>
  )
}
