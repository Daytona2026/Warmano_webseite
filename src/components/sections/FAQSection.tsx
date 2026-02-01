'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus, Phone, MessageCircle, HelpCircle } from 'lucide-react'
import Container from '@/components/ui/Container'

const faqs = [
  {
    question: 'Welche Wärmepumpen-Marken warten Sie?',
    answer: 'Wir warten alle gängigen Marken: Viessmann, Bosch, Vaillant, Daikin, Mitsubishi, Panasonic, Stiebel Eltron, Buderus und viele mehr. Unsere Techniker sind auf verschiedene Hersteller geschult.',
  },
  {
    question: 'Wie schnell bekomme ich einen Termin?',
    answer: 'Das hängt von Ihrem Paket ab: Basis in 10 Tagen, Standard in 3-5 Tagen, Premium in 1-2 Tagen. Bei Notfällen sind Premium-Kunden über unseren 24/7-Notdienst abgesichert.',
  },
  {
    question: 'Bleibt meine Herstellergarantie erhalten?',
    answer: 'Ja! Unsere Wartungen werden nach Herstellervorgaben durchgeführt und vollständig dokumentiert. Das digitale Wartungsprotokoll dient als Nachweis für Ihren Garantieanspruch.',
  },
  {
    question: 'Was kostet es, wenn bei der Wartung ein Defekt gefunden wird?',
    answer: 'Wir informieren Sie sofort und erstellen ein transparentes Angebot. Beim Standard-Paket sind Reparaturen bis 100€ inklusive, beim Premium-Paket bis 250€. Größere Reparaturen stimmen wir vorher mit Ihnen ab.',
  },
  {
    question: 'Kann ich jederzeit kündigen?',
    answer: 'Ja, alle Verträge sind jährlich und können 4 Wochen vor Ablauf gekündigt werden. Es gibt keine versteckten Kündigungsfristen oder Mindestlaufzeiten.',
  },
  {
    question: 'In welchen Regionen sind Sie verfügbar?',
    answer: 'Aktuell sind wir in München und im Umkreis von ca. 50km aktiv. Bei der Buchung prüfen wir automatisch, ob wir zu Ihnen kommen können.',
  },
  {
    question: 'Wie läuft die Bezahlung ab?',
    answer: 'Sie zahlen bequem per Lastschrift, Kreditkarte oder Überweisung. Der Jahresbetrag wird einmalig bei Vertragsbeginn fällig. Eine monatliche Zahlung ist auf Anfrage möglich.',
  },
  {
    question: 'Was ist im digitalen Wartungsprotokoll enthalten?',
    answer: 'Das Protokoll dokumentiert alle Prüfpunkte, Messwerte, durchgeführte Arbeiten und enthält Fotos. Sie haben jederzeit online Zugriff und können es für Garantiefälle oder einen späteren Hausverkauf nutzen.',
  },
]

function FAQItem({
  question,
  answer,
  isOpen,
  onClick,
  index,
}: {
  question: string
  answer: string
  isOpen: boolean
  onClick: () => void
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <button
        onClick={onClick}
        className="w-full py-5 flex items-start justify-between text-left"
      >
        <span className="text-warmano-white font-medium pr-4 group-hover:text-warmano-orange transition-colors">
          {question}
        </span>
        <motion.span
          initial={false}
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? 'bg-warmano-orange text-white'
              : 'bg-warmano-gray-800/50 text-warmano-gray-500 group-hover:bg-warmano-orange/20 group-hover:text-warmano-orange'
          }`}
        >
          {isOpen ? (
            <Minus className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.p
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              className="pb-5 text-warmano-gray-400 text-sm leading-relaxed pr-12 pl-1 border-l-2 border-warmano-orange/30 ml-1"
            >
              {answer}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="faq" ref={sectionRef} className="relative py-24 lg:py-32 bg-warmano-black overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-warmano-gray-900/50 via-warmano-black to-warmano-black" />

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
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-warmano-orange/10 border border-warmano-orange/20 text-warmano-orange text-sm font-medium rounded-full mb-4"
          >
            <HelpCircle className="w-4 h-4" />
            FAQ
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmano-white mb-4">
            Häufige{' '}
            <span className="bg-gradient-to-r from-warmano-orange via-amber-500 to-warmano-orange-light bg-clip-text text-transparent">
              Fragen
            </span>
          </h2>
          <p className="text-lg text-warmano-gray-400">
            Alles was Sie vor der Buchung wissen sollten
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-warmano-orange/10 via-transparent to-warmano-orange/10 rounded-3xl blur-xl opacity-50" />

            <div className="relative bg-gradient-to-br from-warmano-gray-800/60 to-warmano-gray-900/80 backdrop-blur-xl rounded-3xl border border-warmano-gray-700/50 divide-y divide-warmano-gray-700/50 px-6 sm:px-8">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  index={index}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-warmano-gray-800/30 border border-warmano-gray-700/50 rounded-2xl p-5">
              <div className="w-12 h-12 rounded-xl bg-warmano-orange/10 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-warmano-orange" />
              </div>
              <div className="text-center sm:text-left">
                <p className="text-warmano-gray-400 text-sm">
                  Noch Fragen? Wir helfen gerne!
                </p>
                <a
                  href="tel:+4989123456789"
                  className="inline-flex items-center gap-2 text-warmano-orange font-semibold hover:underline text-lg"
                >
                  <Phone className="w-4 h-4" />
                  089 123 456 789
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
