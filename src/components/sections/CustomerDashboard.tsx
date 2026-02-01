'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Ticket, Euro, Calendar, ExternalLink, AlertCircle } from 'lucide-react'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

interface Invoice {
  id: number
  number: string
  date: string
  dueDate: string
  amount: number
  amountDue: number
  status: 'draft' | 'posted' | 'paid' | 'cancelled'
  pdfUrl?: string
}

interface TicketItem {
  id: number
  number: string
  subject: string
  status: string
  createDate: string
}

export default function CustomerDashboard() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [invoices, setInvoices] = useState<Invoice[] | null>(null)
  const [tickets, setTickets] = useState<TicketItem[] | null>(null)
  const [activeTab, setActiveTab] = useState<'invoices' | 'tickets'>('invoices')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      // Fetch both invoices and tickets
      const [invoicesRes, ticketsRes] = await Promise.all([
        fetch(`/api/invoices?email=${encodeURIComponent(email)}`),
        fetch(`/api/support?email=${encodeURIComponent(email)}`),
      ])

      const invoicesData = await invoicesRes.json()
      const ticketsData = await ticketsRes.json()

      if (invoicesData.success) {
        setInvoices(invoicesData.invoices || [])
      }
      if (ticketsData.success) {
        setTickets(ticketsData.tickets || [])
      }

      if (!invoicesData.success && !ticketsData.success) {
        setError('Keine Daten gefunden. Bitte prüfen Sie Ihre E-Mail-Adresse.')
      }
    } catch {
      setError('Netzwerkfehler. Bitte versuchen Sie es erneut.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-500 bg-green-500/10'
      case 'posted':
        return 'text-yellow-500 bg-yellow-500/10'
      case 'draft':
        return 'text-warmano-gray-400 bg-warmano-gray-800'
      case 'cancelled':
        return 'text-red-500 bg-red-500/10'
      default:
        return 'text-warmano-gray-400 bg-warmano-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Bezahlt'
      case 'posted':
        return 'Offen'
      case 'draft':
        return 'Entwurf'
      case 'cancelled':
        return 'Storniert'
      default:
        return status
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    return new Date(dateStr).toLocaleDateString('de-DE')
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount)
  }

  // Login form
  if (invoices === null && tickets === null) {
    return (
      <section id="dashboard" className="py-24 bg-warmano-gray-900">
        <Container>
          <div className="max-w-md mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-warmano-orange/20 flex items-center justify-center">
                <FileText className="w-8 h-8 text-warmano-orange" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Kundenbereich
              </h2>
              <p className="text-warmano-gray-400">
                Sehen Sie Ihre Rechnungen und Support-Tickets ein.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-warmano-gray-300 mb-2">
                  E-Mail-Adresse
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-warmano-gray-800 border border-warmano-gray-700 rounded-xl text-white placeholder-warmano-gray-500 focus:outline-none focus:border-warmano-orange transition-colors"
                  placeholder="ihre@email.de"
                />
              </div>

              {error && (
                <div className="flex items-center gap-2 text-red-400 bg-red-400/10 px-4 py-3 rounded-xl">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Wird geladen...' : 'Anmelden'}
              </Button>

              <p className="text-center text-sm text-warmano-gray-500">
                Für das vollständige Portal nutzen Sie bitte den{' '}
                <a
                  href="https://warmano.odoo.com/web/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-warmano-orange hover:underline"
                >
                  Odoo Login
                </a>
              </p>
            </form>
          </div>
        </Container>
      </section>
    )
  }

  // Dashboard
  return (
    <section id="dashboard" className="py-24 bg-warmano-gray-900">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">Kundenbereich</h2>
            <button
              onClick={() => {
                setInvoices(null)
                setTickets(null)
                setEmail('')
              }}
              className="text-sm text-warmano-gray-400 hover:text-white"
            >
              Abmelden
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8">
            <button
              onClick={() => setActiveTab('invoices')}
              className={`flex items-center gap-2 py-3 px-6 rounded-xl font-medium transition-colors ${
                activeTab === 'invoices'
                  ? 'bg-warmano-orange text-white'
                  : 'bg-warmano-gray-800 text-warmano-gray-400 hover:text-white'
              }`}
            >
              <Euro className="w-5 h-5" />
              Rechnungen
              {invoices && invoices.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">
                  {invoices.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('tickets')}
              className={`flex items-center gap-2 py-3 px-6 rounded-xl font-medium transition-colors ${
                activeTab === 'tickets'
                  ? 'bg-warmano-orange text-white'
                  : 'bg-warmano-gray-800 text-warmano-gray-400 hover:text-white'
              }`}
            >
              <Ticket className="w-5 h-5" />
              Tickets
              {tickets && tickets.length > 0 && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-white/20 rounded-full">
                  {tickets.length}
                </span>
              )}
            </button>
          </div>

          {/* Invoices Tab */}
          {activeTab === 'invoices' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {invoices && invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="bg-warmano-gray-800 rounded-xl p-6 border border-warmano-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-white">{invoice.number}</h3>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(invoice.status)}`}>
                            {getStatusText(invoice.status)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-warmano-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(invoice.date)}
                          </span>
                          {invoice.status !== 'paid' && invoice.dueDate && (
                            <span>Fällig: {formatDate(invoice.dueDate)}</span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-white">{formatCurrency(invoice.amount)}</p>
                        {invoice.amountDue > 0 && invoice.amountDue !== invoice.amount && (
                          <p className="text-sm text-yellow-500">Offen: {formatCurrency(invoice.amountDue)}</p>
                        )}
                        {invoice.pdfUrl && (
                          <a
                            href={invoice.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-warmano-orange hover:underline mt-2"
                          >
                            <ExternalLink className="w-4 h-4" />
                            Ansehen
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-warmano-gray-400">
                  <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Keine Rechnungen vorhanden</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Tickets Tab */}
          {activeTab === 'tickets' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {tickets && tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="bg-warmano-gray-800 rounded-xl p-6 border border-warmano-gray-700"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-warmano-orange font-mono">{ticket.number}</span>
                          <h3 className="font-semibold text-white">{ticket.subject}</h3>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-warmano-gray-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(ticket.createDate)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="px-3 py-1 text-sm font-medium bg-warmano-gray-700 text-warmano-gray-300 rounded-full">
                          {ticket.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-12 text-warmano-gray-400">
                  <Ticket className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Keine Tickets vorhanden</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  )
}
