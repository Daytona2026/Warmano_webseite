import { Metadata } from 'next'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Datenschutzerklärung | WARMANO',
  description: 'Datenschutzerklärung - WARMANO ist eine Marke der Bavaria Heizungstechnik GmbH',
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

            {/* 1. Datenschutz auf einen Blick */}
            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">1. Datenschutz auf einen Blick</h2>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
                Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit
                denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema
                Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Datenerfassung auf dieser Website</h3>
              <p className="font-medium text-warmano-white">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</p>
              <p>
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                können Sie dem Abschnitt &bdquo;Hinweis zur verantwortlichen Stelle&ldquo; in dieser Datenschutzerklärung entnehmen.
              </p>

              <p className="font-medium text-warmano-white mt-4">Wie erfassen wir Ihre Daten?</p>
              <p>
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich
                z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
              </p>
              <p className="mt-2">
                Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere
                IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder
                Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website
                betreten.
              </p>

              <p className="font-medium text-warmano-white mt-4">Wofür nutzen wir Ihre Daten?</p>
              <p>
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten.
                Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>

              <p className="font-medium text-warmano-white mt-4">Welche Rechte haben Sie bezüglich Ihrer Daten?</p>
              <p>
                Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung
                oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt
                haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das
                Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten
                zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
              </p>
              <p className="mt-2">
                Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden.
              </p>
            </section>

            {/* 2. Hosting */}
            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">2. Hosting</h2>
              <p>
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Externes Hosting</h3>
              <p>
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst
                werden, werden auf den Servern des Hosters / der Hoster gespeichert. Hierbei kann es sich v. a.
                um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten,
                Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
              </p>
              <p className="mt-2">
                Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und
                bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
                effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter
                (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            {/* 3. Verantwortliche Stelle */}
            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln
                Ihre personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften
                sowie dieser Datenschutzerklärung.
              </p>
              <p className="mt-2">
                Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben.
                Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können.
                Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie
                nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
              </p>
              <p className="mt-2">
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per
                E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
                Dritte ist nicht möglich.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Hinweis zur verantwortlichen Stelle</h3>
              <p>Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:</p>
              <div className="bg-warmano-gray-900/50 rounded-lg p-4 mt-3 space-y-1">
                <p className="font-semibold text-warmano-white">WARMANO</p>
                <p className="text-warmano-orange text-sm">Eine Marke der Bavaria Heizungstechnik GmbH</p>
                <p className="mt-2">Bavaria Heizungstechnik GmbH</p>
                <p>Habichtstraße 33</p>
                <p>85716 Unterschleißheim</p>
                <p className="mt-2">Telefon: +49 89 99 95 14-133</p>
                <p>E-Mail: info@warmano.de</p>
              </div>
              <p className="mt-3">
                Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam
                mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten
                (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Speicherdauer</h3>
              <p>
                Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde,
                verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt.
                Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung
                widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für
                die Speicherung Ihrer personenbezogenen Daten haben (z. B. steuer- oder handelsrechtliche
                Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">
                Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website
              </h3>
              <p>
                Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen
                Daten auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern
                besondere Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer
                ausdrücklichen Einwilligung in die Übertragung personenbezogener Daten in Drittstaaten erfolgt
                die Datenverarbeitung außerdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die
                Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endgerät (z. B. via
                Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zusätzlich auf
                Grundlage von § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p>
                Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich.
                Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der
                bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">
                Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)
              </h3>
              <p className="bg-warmano-gray-900/50 rounded-lg p-4">
                WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT,
                HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN,
                GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH
                FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN
                EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH
                EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI
                DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE
                INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG,
                AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Beschwerderecht bei der zuständigen Aufsichtsbehörde</h3>
              <p>
                Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres
                Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht
                unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Recht auf Datenübertragbarkeit</h3>
              <p>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines
                Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen,
                maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten
                an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Auskunft, Berichtigung und Löschung</h3>
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf
                unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und
                Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung
                dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich
                jederzeit an uns wenden.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Recht auf Einschränkung der Verarbeitung</h3>
              <p>
                Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
                verlangen. Hierzu können Sie sich jederzeit an uns wenden.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">SSL- bzw. TLS-Verschlüsselung</h3>
              <p>
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte,
                wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine
                SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die
                Adresszeile des Browsers von &bdquo;http://&ldquo; auf &bdquo;https://&ldquo; wechselt und an dem Schloss-Symbol
                in Ihrer Browserzeile.
              </p>
              <p className="mt-2">
                Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns
                übermitteln, nicht von Dritten mitgelesen werden.
              </p>
            </section>

            {/* 4. Datenerfassung auf dieser Website */}
            <section>
              <h2 className="text-xl font-semibold text-warmano-white mb-4">4. Datenerfassung auf dieser Website</h2>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Cookies</h3>
              <p>
                Unsere Internetseiten verwenden so genannte &bdquo;Cookies&ldquo;. Cookies sind kleine Datenpakete
                und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die
                Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät
                gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente
                Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine
                automatische Löschung durch Ihren Webbrowser erfolgt.
              </p>
              <p className="mt-2">
                Cookies können von uns (First-Party-Cookies) oder von Drittunternehmen stammen (sog.
                Third-Party-Cookies). Third-Party-Cookies ermöglichen die Einbindung bestimmter
                Dienstleistungen von Drittunternehmen innerhalb von Webseiten (z. B. Cookies zur Abwicklung
                von Zahlungsdienstleistungen).
              </p>
              <p className="mt-2">
                Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da
                bestimmte Webseitenfunktionen ohne diese nicht funktionieren würden (z. B. die
                Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies können zur Auswertung des
                Nutzerverhaltens oder zu Werbezwecken verwendet werden.
              </p>
              <p className="mt-2">
                Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur Bereitstellung
                bestimmter, von Ihnen erwünschter Funktionen (z. B. für die Warenkorbfunktion) oder zur
                Optimierung der Website (z. B. Cookies zur Messung des Webpublikums) erforderlich sind
                (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern
                keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse
                an der Speicherung von notwendigen Cookies zur technisch fehlerfreien und optimierten
                Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies und
                vergleichbaren Wiedererkennungstechnologien abgefragt wurde, erfolgt die Verarbeitung
                ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1
                TDDDG); die Einwilligung ist jederzeit widerrufbar.
              </p>
              <p className="mt-2">
                Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden
                und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder
                generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers
                aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website
                eingeschränkt sein.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Kontaktformular</h3>
              <p>
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
                Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung
                der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben
                wir nicht ohne Ihre Einwilligung weiter.
              </p>
              <p className="mt-2">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern
                Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
                vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
                auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten
                Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
                sofern diese abgefragt wurde.
              </p>
              <p className="mt-2">
                Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur
                Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die
                Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende
                gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
              </p>

              <h3 className="text-lg font-medium text-warmano-white mt-6 mb-3">Anfrage per E-Mail, Telefon oder Telefax</h3>
              <p>
                Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller
                daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres
                Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre
                Einwilligung weiter.
              </p>
              <p className="mt-2">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern
                Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung
                vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung
                auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten
                Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO)
                sofern diese abgefragt wurde; die Einwilligung ist jederzeit widerrufbar.
              </p>
              <p className="mt-2">
                Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur
                Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die
                Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende
                gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
              </p>
            </section>

            {/* Stand */}
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
