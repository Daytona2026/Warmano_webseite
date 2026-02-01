import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Impressum | WARMANO',
  description: 'Impressum - WARMANO ist eine Marke der Bavaria Heizungstechnik GmbH',
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
                <p className="font-semibold text-warmano-white text-lg">
                  WARMANO
                </p>
                <p className="text-warmano-orange text-sm mb-3">
                  Eine Marke der Bavaria Heizungstechnik GmbH
                </p>
                <p className="font-semibold text-warmano-white">Bavaria Heizungstechnik GmbH</p>
                <p>Habichtstraße 33</p>
                <p>85716 Unterschleißheim</p>
                <p>Deutschland</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Vertreten durch</h2>
              <div className="text-warmano-gray-300">
                <p>Geschäftsführer: Zoran Pozderovic</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Kontakt</h2>
              <div className="text-warmano-gray-300 space-y-1">
                <p>Telefon: +49 89 99 95 14-133</p>
                <p>
                  E-Mail:{' '}
                  <a href="mailto:info@bavaria-heizungstechnik.de" className="text-warmano-orange hover:underline">
                    info@bavaria-heizungstechnik.de
                  </a>
                </p>
                <p className="mt-2">
                  Für WARMANO-Anfragen:{' '}
                  <a href="mailto:info@warmano.de" className="text-warmano-orange hover:underline">
                    info@warmano.de
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Handelsregister</h2>
              <div className="text-warmano-gray-300 space-y-1">
                <p>Registergericht: Amtsgericht München</p>
                <p>Registernummer: HRB 273654</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Umsatzsteuer-ID</h2>
              <div className="text-warmano-gray-300">
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                <p className="font-medium">DE 367 620 726</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">
                Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
              </h2>
              <div className="text-warmano-gray-300 space-y-1">
                <p>Zoran Pozderovic</p>
                <p>Bavaria Heizungstechnik GmbH</p>
                <p>Habichtstraße 33</p>
                <p>85716 Unterschleißheim</p>
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
              <h2 className="text-xl font-semibold text-warmano-white mb-4">
                Verbraucherstreitbeilegung/Universalschlichtungsstelle
              </h2>
              <div className="text-warmano-gray-300">
                <p>
                  Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Haftung für Inhalte</h2>
              <div className="text-warmano-gray-300 space-y-3">
                <p>
                  Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den
                  allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht
                  verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen
                  zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                </p>
                <p>
                  Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen
                  Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt
                  der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden
                  Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Haftung für Links</h2>
              <div className="text-warmano-gray-300 space-y-3">
                <p>
                  Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss
                  haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte
                  der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                </p>
                <p>
                  Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft.
                  Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente
                  inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer
                  Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige
                  Links umgehend entfernen.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">Urheberrecht</h2>
              <div className="text-warmano-gray-300 space-y-3">
                <p>
                  Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
                  deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung
                  außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen
                  Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht
                  kommerziellen Gebrauch gestattet.
                </p>
                <p>
                  Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte
                  Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie
                  trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden
                  Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
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
