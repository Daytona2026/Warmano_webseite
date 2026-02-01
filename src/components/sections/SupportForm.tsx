'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle, AlertCircle, Headphones } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function SupportForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    priority: '1',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [ticketNumber, setTicketNumber] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setIsSuccess(true)
        setTicketNumber(result.ticketNumber)
      } else {
        setError(result.error || 'Ein Fehler ist aufgetreten')
      }
    } catch {
      setError('Netzwerkfehler. Bitte versuchen Sie es erneut.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <section id="support" className="py-24 bg-warmano-gray-900">
        <Container>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">
              Ticket erstellt!
            </h2>
            <p className="text-warmano-gray-400 mb-4">
              Ihre Anfrage wurde erfolgreich übermittelt.
            </p>
            <div className="bg-warmano-gray-800 rounded-xl p-4 mb-6">
              <p className="text-sm text-warmano-gray-400">Ticket-Nummer</p>
              <p className="text-2xl font-bold text-warmano-orange">{ticketNumber}</p>
            </div>
            <p className="text-sm text-warmano-gray-500">
              Wir melden uns schnellstmöglich bei Ihnen.
            </p>
          </motion.div>
        </Container>
      </section>
    )
  }

  return (
    <section id="support" className="py-24 bg-warmano-gray-900">
      <Container>
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-warmano-orange/20 flex items-center justify-center">
              <Headphones className="w-8 h-8 text-warmano-orange" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">
              Support & Hilfe
            </h2>
            <p className="text-warmano-gray-400">
              Haben Sie eine Frage oder ein Problem? Wir helfen Ihnen gerne weiter.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-warmano-gray-300 mb-2">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white placeholder-warmano-gray-500 focus:outline-none focus:border-warmano-orange transition-colors"
                  placeholder="Ihr Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warmano-gray-300 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white placeholder-warmano-gray-500 focus:outline-none focus:border-warmano-orange transition-colors"
                  placeholder="ihre@email.de"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-warmano-gray-300 mb-2">
                Betreff *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white placeholder-warmano-gray-500 focus:outline-none focus:border-warmano-orange transition-colors"
                placeholder="Worum geht es?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-warmano-gray-300 mb-2">
                Priorität
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white focus:outline-none focus:border-warmano-orange transition-colors"
              >
                <option value="0">Niedrig - Allgemeine Frage</option>
                <option value="1">Normal - Standardanfrage</option>
                <option value="2">Hoch - Dringend</option>
                <option value="3">Kritisch - Heizung ausgefallen</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-warmano-gray-300 mb-2">
                Nachricht *
              </label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white placeholder-warmano-gray-500 focus:outline-none focus:border-warmano-orange transition-colors resize-none"
                placeholder="Beschreiben Sie Ihr Anliegen..."
              />
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full"
            >
              {isSubmitting ? (
                'Wird gesendet...'
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Ticket erstellen
                </>
              )}
            </Button>
          </form>
        </div>
      </Container>
    </section>
  )
}
