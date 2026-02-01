import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Impressum | WARMANO',
  description: 'Impressum der WARMANO GmbH',
}

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-warmano-black pt-24 pb-16">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-warmano-gray-400 hover:text-warmano-orange transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        <div className="max-w-3xl">
          <h1 className="text-4xl font-bold text-warmano-white mb-8">Impressum</h1>

          <div className="prose prose-invert prose-orange max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Angaben gemäß § 5 TMG</h2>
              <div className="text-warmano-gray-300 space-y-1">
                <p className="font-semibold text-warmano-white">WARMANO GmbH</p>
                <p>Musterstraße 123</p>
                <p>80331 München</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Kontakt</h2>
              <div className="text-warmano-gray-300 space-y-1">
                <p>Telefon: +49 (0) 89 123 456 789</p>
                <p>E-Mail: info@warmano.de</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Handelsregister</h2>
              <div className="text-warmano-gray-300 space-y-1">
                <p>Registergericht: Amtsgericht München</p>
                <p>Registernummer: HRB XXXXXX</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Geschäftsführung</h2>
              <div className="text-warmano-gray-300">
                <p>[Name des Geschäftsführers]</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Umsatzsteuer-ID</h2>
              <div className="text-warmano-gray-300">
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                <p>DE XXX XXX XXX</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
              <div className="text-warmano-gray-300 space-y-1">
                <p>[Name des Verantwortlichen]</p>
                <p>WARMANO GmbH</p>
                <p>Musterstraße 123</p>
                <p>80331 München</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">EU-Streitschlichtung</h2>
              <div className="text-warmano-gray-300">
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-warmano-orange hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                  </a>
                </p>
                <p className="mt-2">Unsere E-Mail-Adresse finden Sie oben im Impressum.</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Verbraucherstreitbeilegung/Universalschlichtungsstelle</h2>
              <div className="text-warmano-gray-300">
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </section>

            <section className="pt-8 border-t border-warmano-gray-800">
              <p className="text-warmano-gray-500 text-sm">
                Stand: {new Date().toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })}
              </p>
            </section>
          </div>
        </div>
      </Container>
    </main>
  )
}
