import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AGB | WARMANO',
  description: 'Allgemeine Geschäftsbedingungen der WARMANO GmbH',
}

export default function AGBPage() {
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
          <h1 className="text-4xl font-bold text-warmano-white mb-8">Allgemeine Geschäftsbedingungen</h1>

          <div className="prose prose-invert prose-orange max-w-none space-y-8 text-warmano-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 1 Geltungsbereich</h2>
              <p>
                (1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen der
                WARMANO GmbH, Musterstraße 123, 80331 München (nachfolgend &bdquo;Anbieter&ldquo;) und dem Kunden
                über Wartungsdienstleistungen für Wärmepumpen.
              </p>
              <p>
                (2) Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der Anbieter
                stimmt ihrer Geltung ausdrücklich schriftlich zu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 2 Vertragsschluss</h2>
              <p>
                (1) Die Darstellung der Leistungen auf der Website stellt kein rechtlich bindendes Angebot,
                sondern eine Aufforderung zur Abgabe eines Angebots dar.
              </p>
              <p>
                (2) Durch Absenden des Buchungsformulars gibt der Kunde ein verbindliches Angebot ab.
                Der Vertrag kommt zustande, wenn der Anbieter das Angebot durch eine Auftragsbestätigung
                per E-Mail annimmt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 3 Leistungsbeschreibung</h2>
              <p>
                (1) Der Umfang der Wartungsleistungen richtet sich nach dem gewählten Paket (Basis, Standard, Premium).
              </p>
              <p>
                (2) Die Wartung umfasst die Prüfung und Instandhaltung der Wärmepumpe nach Herstellervorgaben
                sowie die Erstellung eines digitalen Wartungsprotokolls.
              </p>
              <p>
                (3) Die genauen Leistungen der einzelnen Pakete sind auf der Website beschrieben und werden
                Vertragsbestandteil.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 4 Preise und Zahlung</h2>
              <p>
                (1) Es gelten die zum Zeitpunkt der Buchung angegebenen Preise. Alle Preise verstehen sich
                inklusive der gesetzlichen Mehrwertsteuer.
              </p>
              <p>
                (2) Die Zahlung erfolgt per Lastschrift, Kreditkarte oder Überweisung. Der Jahresbetrag
                ist bei Vertragsbeginn fällig.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 5 Vertragslaufzeit und Kündigung</h2>
              <p>
                (1) Der Wartungsvertrag hat eine Laufzeit von einem Jahr und verlängert sich automatisch
                um ein weiteres Jahr, wenn er nicht mit einer Frist von 4 Wochen vor Ablauf gekündigt wird.
              </p>
              <p>
                (2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
              </p>
              <p>
                (3) Die Kündigung bedarf der Textform (E-Mail genügt).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 6 Widerrufsrecht</h2>
              <p>
                Verbraucher haben ein 14-tägiges Widerrufsrecht. Einzelheiten zum Widerrufsrecht ergeben
                sich aus der Widerrufsbelehrung, die dem Kunden bei Vertragsschluss übermittelt wird.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 7 Haftung</h2>
              <p>
                (1) Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.
              </p>
              <p>
                (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher
                Vertragspflichten und begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
              </p>
              <p>
                (3) Die Haftung für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit
                bleibt unberührt.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 8 Datenschutz</h2>
              <p>
                Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer{' '}
                <Link href="/datenschutz" className="text-warmano-orange hover:underline">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 9 Schlussbestimmungen</h2>
              <p>
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
              </p>
              <p>
                (2) Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
                Sondervermögen, ist Gerichtsstand für alle Streitigkeiten München.
              </p>
              <p>
                (3) Sollten einzelne Bestimmungen unwirksam sein, bleibt die Wirksamkeit der übrigen
                Bestimmungen unberührt.
              </p>
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
