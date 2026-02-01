import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | WARMANO',
  description: 'Datenschutzerklärung der WARMANO GmbH',
}

export default function DatenschutzPage() {
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
          <h1 className="text-4xl font-bold text-warmano-white mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-invert prose-orange max-w-none space-y-8 text-warmano-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">2. Verantwortliche Stelle</h2>
              <div className="space-y-1">
                <p className="font-semibold text-warmano-white">WARMANO GmbH</p>
                <p>Musterstraße 123</p>
                <p>80331 München</p>
                <p>Deutschland</p>
                <p className="mt-4">Telefon: +49 (0) 89 123 456 789</p>
                <p>E-Mail: datenschutz@warmano.de</p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">3. Datenerfassung auf dieser Website</h2>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Cookies</h3>
              <p>
                Unsere Internetseiten verwenden so genannte &bdquo;Cookies&ldquo;. Cookies sind kleine Datenpakete und
                richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer
                einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Kontaktformular / Buchungsformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular oder über unser Buchungsformular Anfragen zukommen lassen,
                werden Ihre Angaben aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten
                zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">4. Ihre Rechte</h2>
              <p>Sie haben jederzeit das Recht:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten</li>
                <li>Berichtigung unrichtiger Daten zu verlangen</li>
                <li>Löschung Ihrer Daten zu verlangen</li>
                <li>Einschränkung der Verarbeitung zu verlangen</li>
                <li>Der Verarbeitung zu widersprechen</li>
                <li>Datenübertragbarkeit zu verlangen</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">5. Analyse-Tools und Werbung</h2>
              <p>
                Details zu eingesetzten Analyse-Tools und deren Datenschutzbestimmungen werden hier ergänzt,
                sobald entsprechende Tools implementiert werden.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">6. SSL-/TLS-Verschlüsselung</h2>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte
                eine SSL-/TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
                Adresszeile des Browsers von &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol in
                Ihrer Browserzeile.
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
