import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AGB | WARMANO',
  description: 'Allgemeine Geschäftsbedingungen - WARMANO ist eine Marke der Bavaria Heizungstechnik GmbH',
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
                Bavaria Heizungstechnik GmbH, Habichtstraße 33, 85716 Unterschleißheim, handelnd unter
                der Marke &bdquo;WARMANO&ldquo; (nachfolgend &bdquo;Anbieter&ldquo;) und dem Kunden über
                Wartungsdienstleistungen für Wärmepumpen.
              </p>
              <p>
                (2) Abweichende Bedingungen des Kunden werden nicht anerkannt, es sei denn, der Anbieter
                stimmt ihrer Geltung ausdrücklich schriftlich zu.
              </p>
              <p>
                (3) Diese AGB gelten auch für alle zukünftigen Geschäftsbeziehungen, auch wenn sie nicht
                nochmals ausdrücklich vereinbart werden.
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
              <p>
                (3) Der Vertragstext wird vom Anbieter gespeichert. Der Kunde kann diesen vor Absenden
                der Bestellung über die übliche Browserfunktion ausdrucken. Der Anbieter sendet dem Kunden
                außerdem eine Auftragsbestätigung mit allen Bestelldaten an die von ihm angegebene
                E-Mail-Adresse.
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
              <p>
                (4) Der Anbieter ist berechtigt, die Wartungsleistungen durch qualifizierte Subunternehmer
                erbringen zu lassen.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 4 Vertragslaufzeit und Kündigung</h2>
              <p>
                (1) Die Vertragslaufzeit richtet sich nach dem gewählten Vertragsmodell:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                <li>
                  <strong>1-Jahresvertrag:</strong> Der Vertrag hat eine Laufzeit von einem Jahr und verlängert
                  sich automatisch um ein weiteres Jahr, wenn er nicht mit einer Frist von 4 Wochen vor Ablauf
                  gekündigt wird.
                </li>
                <li>
                  <strong>3-Jahresvertrag:</strong> Der Vertrag hat eine feste Laufzeit von drei Jahren.
                  Eine ordentliche Kündigung vor Ablauf der drei Jahre ist ausgeschlossen. Nach Ablauf
                  verlängert sich der Vertrag automatisch um jeweils ein Jahr, wenn er nicht mit einer
                  Frist von 4 Wochen vor Ablauf gekündigt wird.
                </li>
              </ul>
              <p>
                (2) Das Recht zur außerordentlichen Kündigung aus wichtigem Grund bleibt unberührt.
              </p>
              <p>
                (3) Die Kündigung bedarf der Textform (E-Mail an info@warmano.de genügt).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 5 Preise und Zahlung</h2>
              <p>
                (1) Es gelten die zum Zeitpunkt der Buchung angegebenen Preise. Alle Preise verstehen sich
                inklusive der gesetzlichen Mehrwertsteuer.
              </p>
              <p>
                (2) Die Zahlungsmodalitäten richten sich nach der gewählten Option:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-2 ml-4">
                <li>
                  <strong>Jährliche Zahlung:</strong> Der Jahresbetrag ist bei Vertragsbeginn bzw. zu jedem
                  Vertragsjahr im Voraus fällig.
                </li>
                <li>
                  <strong>Monatliche Zahlung:</strong> Der monatliche Betrag ist jeweils zum Monatsanfang
                  fällig. Die monatliche Zahlweise setzt ein SEPA-Lastschriftmandat voraus.
                </li>
              </ul>
              <p>
                (3) Die Zahlung erfolgt per SEPA-Lastschrift, Kreditkarte oder Überweisung.
              </p>
              <p>
                (4) Bei 3-Jahresverträgen mit Aktionsrabatt (1. Jahr gratis) wird der Gesamtbetrag für
                2 Jahre berechnet und kann jährlich, monatlich oder als Einmalzahlung beglichen werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 6 Terminvereinbarung</h2>
              <p>
                (1) Die Terminvereinbarung für die Wartung erfolgt in Abstimmung mit dem Kunden per
                E-Mail oder Telefon.
              </p>
              <p>
                (2) Der Kunde ist verpflichtet, den vereinbarten Termin einzuhalten und den Zugang
                zur Wärmepumpe zu gewährleisten.
              </p>
              <p>
                (3) Bei Nichterreichbarkeit oder fehlendem Zugang zum vereinbarten Termin kann der
                Anbieter eine Aufwandsentschädigung von 50 € für die Anfahrt berechnen.
              </p>
              <p>
                (4) Die Terminvorlaufzeiten richten sich nach dem gewählten Paket und sind auf der
                Website beschrieben.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 7 Widerrufsrecht</h2>
              <p>
                Verbraucher haben ein 14-tägiges Widerrufsrecht. Einzelheiten zum Widerrufsrecht ergeben
                sich aus der Widerrufsbelehrung, die dem Kunden bei Vertragsschluss übermittelt wird.
              </p>
              <div className="bg-warmano-gray-900/50 rounded-lg p-4 mt-4">
                <h3 className="text-lg font-medium text-warmano-white mb-3">Widerrufsbelehrung</h3>
                <p className="font-medium">Widerrufsrecht</p>
                <p className="mt-2">
                  Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
                  Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
                </p>
                <p className="mt-2">
                  Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Bavaria Heizungstechnik GmbH, Habichtstraße 33,
                  85716 Unterschleißheim, E-Mail: info@warmano.de, Tel: +49 89 99 95 14-133) mittels einer
                  eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder E-Mail) über Ihren
                  Entschluss, diesen Vertrag zu widerrufen, informieren.
                </p>
                <p className="mt-2 font-medium">Folgen des Widerrufs</p>
                <p className="mt-2">
                  Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten
                  haben, unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die
                  Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 8 Haftung</h2>
              <p>
                (1) Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit.
              </p>
              <p>
                (2) Bei leichter Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher
                Vertragspflichten (Kardinalpflichten) und begrenzt auf den vorhersehbaren, vertragstypischen Schaden.
              </p>
              <p>
                (3) Die Haftung für Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit
                bleibt unberührt.
              </p>
              <p>
                (4) Die vorstehenden Haftungsbeschränkungen gelten auch für die persönliche Haftung der
                Mitarbeiter, Vertreter und Erfüllungsgehilfen des Anbieters.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 9 Datenschutz</h2>
              <p>
                Die Verarbeitung personenbezogener Daten erfolgt gemäß unserer{' '}
                <Link href="/datenschutz" className="text-warmano-orange hover:underline">
                  Datenschutzerklärung
                </Link>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">§ 10 Schlussbestimmungen</h2>
              <p>
                (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.
              </p>
              <p>
                (2) Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches
                Sondervermögen, ist Gerichtsstand für alle Streitigkeiten München.
              </p>
              <p>
                (3) Sollten einzelne Bestimmungen dieses Vertrages unwirksam sein oder werden, so berührt
                dies die Wirksamkeit der übrigen Bestimmungen nicht. Die unwirksame Bestimmung ist durch
                eine wirksame zu ersetzen, die dem wirtschaftlichen Zweck der unwirksamen Bestimmung am
                nächsten kommt.
              </p>
              <p>
                (4) Die Vertragssprache ist Deutsch.
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
