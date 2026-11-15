import type { Metadata } from 'next'
import Link from 'next/link'
import { glossary, timeline } from '@/lib/trainer-data'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

export const metadata: Metadata = {
  title: 'Geschichte & Zeitleiste · Verdun 1916',
  description: 'Ursachen, Verlauf, Verluste, chemische Waffen, Alltag und Begriffe der Schlacht um Verdun 1916.',
}

const faq = [
  ['Warum endete die Schlacht ohne Sieger?', 'Keine Seite erreichte einen entscheidenden Durchbruch. Nach enormen Verlusten stabilisierte sich die Front bis zum Jahresende; Frankreich gewann im Dezember verlorene Stellungen zurück.'],
  ['Wie viele Soldaten starben bei Verdun?', 'Die häufig genannten Gesamtzahlen umfassen Tote, Verwundete und Vermisste – nicht nur Todesopfer. Schätzungen weichen je nach Quelle und Zählweise voneinander ab.'],
  ['Was ist heute in Verdun zu sehen?', 'Zu den wichtigen Erinnerungsorten gehören das Ossuaire de Douaumont, erhaltene Forts, Gedenkstätten und die Ruinen der zerstörten Dörfer.'],
  ['Was war die Voie Sacrée?', 'Die Straße von Bar-le-Duc nach Verdun war eine zentrale französische Versorgungsroute. Über sie kamen Soldaten, Munition und Lebensmittel an die Front.'],
  ['Wurde bei Verdun Giftgas eingesetzt?', 'Ja. Beide Seiten setzten im Verlauf der Schlacht chemische Kampfstoffe in Artilleriegeschossen ein. Besonders bekannt ist der deutsche Beschuss mit Diphosgen-Granaten im Juni 1916.'],
  ['Wurde Senfgas bei Verdun eingesetzt?', 'Nein. Bei Verdun wurden vor allem Phosgen und Diphosgen eingesetzt. Senfgas (Lost) kam erst 1917 an der Westfront zum Einsatz.'],
  ['Warum nennt man Verdun eine Materialschlacht?', 'Der Einsatz von Artillerie, Munition und Nachschub war außergewöhnlich groß. Produktion und Versorgung prägten den Verlauf ebenso wie die Kämpfe an der Front.'],
]

const lossRows = [
  ['Frankreich', 'ca. 163.000', 'ca. 216.000', 'ca. 379.000'],
  ['Deutsches Reich', 'ca. 143.000', 'ca. 190.000', 'ca. 333.000'],
  ['Zusammen', 'ca. 306.000', 'ca. 406.000', 'ca. 712.000'],
]

export default function HistoryPage() {
  return (
    <article className="page-content">
      <header className="page-hero">
        <p className="section-kicker">HISTORISCHER ÜBERBLICK</p>
        <h1>Geschichte der Schlacht</h1>
        <p className="lead">Die Schlacht um Verdun war eine der längsten und schlimmsten Schlachten des Ersten Weltkriegs. Hier erfährst du, warum sie begann, wie sie verlief und was sie für die Menschen bedeutete.</p>
        <Link className="back-link" href="/">← Zurück zur Übersicht</Link>
      </header>

      <section className="content-section" id="fakten">
        <p className="section-kicker">HINTERGRUND</p>
        <h2>Warum wurde Verdun angegriffen?</h2>
        <div className="article-grid">
          <article className="info-card"><span className="article-number">01</span><h3>Ein Ort von hoher Bedeutung</h3><p>Verdun liegt an der Maas in Frankreich. Viele Festungen schützten die Stadt. Für Frankreich war Verdun wichtig: Die Stadt sollte unbedingt verteidigt werden.</p></article>
          <article className="info-card"><span className="article-number">02</span><h3>Der deutsche Angriffsplan</h3><p>Am 21. Februar 1916 griff die deutsche Armee Verdun an. Der deutsche General Erich von Falkenhayn wollte Frankreich zu langen Kämpfen zwingen. Er hoffte, dass dabei so viele französische Soldaten sterben oder verletzt werden würden, dass Frankreich nicht mehr weiterkämpfen könnte.</p></article>
          <article className="info-card"><span className="article-number">03</span><h3>Kein schneller Durchbruch</h3><p>Die Verteidigung, der Nachschub über die Voie Sacrée und die hohen Kosten jedes Geländegewinns verhinderten einen raschen Abschluss. Im Dezember stabilisierte sich die Front nach französischen Gegenangriffen.</p></article>
          <article className="info-card"><span className="article-number">04</span><h3>Folgen</h3><p>Die Schlacht hinterließ tiefe Spuren in der Landschaft und im kollektiven Gedächtnis. Verdun steht bis heute für die Folgen industrieller Kriegsführung und für das Gedenken an die Opfer.</p></article>
        </div>
      </section>

      <section className="content-section" id="zeitleiste">
        <p className="section-kicker">21. FEBRUAR – 18. DEZEMBER 1916</p>
        <h2>Die Zeitleiste</h2>
        <div className="timeline-phase-list">
          {[
            { label: 'Frühjahr · Februar–April', events: timeline.slice(0, 4) },
            { label: 'Sommer · Mai–August', events: timeline.slice(4, 10) },
            { label: 'Herbst und Jahresende · Oktober–Dezember', events: timeline.slice(10) },
          ].map((phase) => (
            <div className="timeline-phase" key={phase.label}>
              <h3>{phase.label}</h3>
              <div className="timeline-list">
                {phase.events.map(([date, detail]) => <article className="timeline-entry" key={date}><time>{date}</time><p>{detail}</p></article>)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="content-section" id="verluste">
        <p className="section-kicker">ZAHLEN EINORDNEN</p>
        <h2>Verluste und Opferzahlen</h2>
        <p>Für die Schlacht werden häufig etwa 700.000 bis 712.000 militärische Verluste auf beiden Seiten zusammen genannt. Die Zahl meint Tote, Verwundete und Vermisste; sie bezeichnet nicht 700.000 Tote. Historische Angaben unterscheiden sich, weil Quellen und Zählweisen etwa Vermisste, später Verstorbene oder mehrfach Verwundete unterschiedlich behandeln.</p>
        <div className="table-wrap">
          <table>
            <caption>Häufig zitierte Schätzungen für 1916 · gerundete Zahlen</caption>
            <thead><tr><th scope="col">Streitkraft</th><th scope="col">Tote / Vermisste</th><th scope="col">Verwundete</th><th scope="col">Gesamtverluste</th></tr></thead>
            <tbody>{lossRows.map(([side, dead, wounded, total]) => <tr key={side}><th scope="row">{side}</th><td>{dead}</td><td>{wounded}</td><td>{total}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="source-note">Die Aufteilung ist eine verbreitete Zusammenstellung von Schätzwerten. Einzelne Werke nennen abweichende Zahlen; „Tote / Vermisste“ ist zudem nicht in allen Quellen gleich abgegrenzt. Die Zahlen sollten deshalb als Größenordnung und nicht als abschließende Zählung gelesen werden.</p>
      </section>

      <section className="content-section" id="gas">
        <p className="section-kicker">CHEMISCHE KRIEGSFÜHRUNG</p>
        <h2>Gas bei Verdun: Was wurde eingesetzt?</h2>
        <p>Ja – sowohl französische als auch deutsche Truppen setzten 1916 chemische Kampfstoffe ein. Bei Verdun kamen sie überwiegend als Artilleriegeschosse zum Einsatz. Das war etwas anderes als die großen, windabhängigen Gaswolken, die 1915 durch das Öffnen von Gasflaschen freigesetzt worden waren.</p>
        <div className="gas-card"><div><strong>Februar 1916 · französische Geschosse</strong><p>Französische Truppen verwendeten bei Verdun Phosgen-Granaten. Phosgen ist ein erstickend wirkender, hochgiftiger Kampfstoff; seine Wirkung konnte verzögert einsetzen und war schwer zu erkennen.</p></div></div>
        <div className="gas-card"><div><strong>22.–23. Juni 1916 · deutscher Beschuss bei Verdun</strong><p>Vor dem Angriff auf französische Stellungen bei Fleury, Froideterre und Fort Souville verschoss die deutsche Artillerie zehntausende „Grünkreuz“-Geschosse mit Diphosgen. Der Beschuss sollte unter anderem französische Geschütze und Versorgungslinien ausschalten.</p></div></div>
        <aside className="article-callout"><strong>Wichtig: kein Senfgas bei Verdun</strong><p>Die bei Verdun besonders dokumentierten Kampfstoffe waren Phosgen und Diphosgen – nicht Senfgas. Senfgas, auch Lost oder Yperit genannt, wurde von deutschen Truppen erst 1917 an der Westfront eingesetzt.</p></aside>
        <p className="source-note">Angaben zu chemischen Waffen sind hier bewusst knapp zusammengefasst. Details zu Zeitpunkt, Menge und Wirkung können je nach militärhistorischer Quelle variieren. Weiterführende Einstiege: <Link className="text-link" href="/quellen">Mémorial de Verdun, DHM/LeMO und Historial de la Grande Guerre</Link>.</p>
      </section>

      <section className="content-section" id="alltag">
        <p className="section-kicker">LEBENSBEDINGUNGEN</p>
        <h2>Alltag in einer Mondlandschaft</h2>
        <div className="everyday-panel">
          <p>Wiederholter Artilleriebeschuss verwandelte Wälder, Wege und Dörfer in eine Landschaft aus dicht überlappenden Granattrichtern. Schützengräben konnten einstürzen oder volllaufen; Schlamm, Kälte und fehlender Schutz machten den Alltag zusätzlich schwer.</p>
          <p>Ratten und Läuse verbreiteten sich in den Stellungen. Die Artillerie verursachte den größten Anteil der Verluste. Versorgung und Ablösung über die Voie Sacrée waren deshalb lebenswichtig, aber auch gefährlich.</p>
          <p>Heute lässt sich die Umgebung an erhaltenen Forts, Gedenkstätten und in Ausstellungen nachvollziehen. Sie machen sichtbar, wie Gelände, Nachschub und Befestigungen zusammenwirkten.</p>
        </div>
      </section>

      <section className="content-section" id="begriffe">
        <p className="section-kicker">GLOSSAR</p>
        <h2>Begriffe verstehen</h2>
        <div className="glossary-grid">{glossary.map(([term, definition]) => <details className="glossary-card" key={term}><summary><b>{term}</b><span>+</span></summary><p>{definition}</p></details>)}</div>
      </section>

      <section className="content-section" id="faq">
        <p className="section-kicker">HÄUFIGE FRAGEN</p>
        <h2>Häufige Fragen</h2>
        <Accordion className="faq-accordion" multiple>
          {faq.map(([question, answer]) => <AccordionItem value={question} key={question}><AccordionTrigger className="faq-trigger">{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}
        </Accordion>
      </section>
    </article>
  )
}
