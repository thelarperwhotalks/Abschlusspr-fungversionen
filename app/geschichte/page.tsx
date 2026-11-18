import type { Metadata } from 'next'
import Link from 'next/link'
import { connection } from 'next/server'
import { getHistoryContent } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Geschichte des Kaiserreichs · 1871–1918',
  description: 'Ein kompakter Überblick zur Gründung, Verfassung, Gesellschaft und zum Ende des Deutschen Kaiserreichs.',
}

export default async function HistoryPage() {
  await connection()
  const content = await getHistoryContent()

  return (
    <article className="page-content">
      <header className="page-hero">
        <p className="section-kicker">HISTORISCHER ÜBERBLICK · 1871–1918</p>
        <h1>Geschichte des Kaiserreichs</h1>
        <p className="lead">{content.lead}</p>
        <Link className="back-link" href="/">← Zurück zur Übersicht</Link>
      </header>
      <section className="content-section" id="gruendung">
        <p className="section-kicker">DIE REICHSGRÜNDUNG</p>
        <h2>Ein deutscher Bundesstaat</h2>
        {content.founding.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </section>
      <section className="content-section" id="verfassung">
        <p className="section-kicker">POLITIK &amp; VERFASSUNG</p>
        <h2>Wie war das Reich organisiert?</h2>
        <div className="article-grid">
          {content.institutions.map(({ name, detail }, index) => (
            <article className="info-card" key={name}>
              <span className="article-number">0{index + 1}</span>
              <h3>{name}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
        <p className="source-note">{content.constitutionalNote}</p>
      </section>
      <section className="content-section" id="zeitleiste">
        <p className="section-kicker">SIEBEN WENDEPUNKTE</p>
        <h2>Zeitleiste 1871–1918</h2>
        <div className="timeline-phase-list">
          <div className="timeline-list">
            {content.timeline.map(({ date, detail }) => (
              <article className="timeline-entry" key={date}>
                <time>{date}</time>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="content-section" id="gesellschaft">
        <p className="section-kicker">INDUSTRIE, STADT &amp; ALLTAG</p>
        <h2>Eine Gesellschaft im Wandel</h2>
        <div className="everyday-panel">
          {content.society.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
      </section>
      <section className="content-section" id="ende">
        <p className="section-kicker">KRIEG, REVOLUTION &amp; ENDE</p>
        <h2>1918: Das Ende der Monarchie</h2>
        {content.ending.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <div className="article-callout">
          <strong>Einordnung</strong>
          <p>{content.conclusion}</p>
        </div>
      </section>
      <section className="content-section" aria-labelledby="history-sources-heading">
        <p className="section-kicker">BELEGE &amp; EINORDNUNG</p>
        <h2 id="history-sources-heading">Quellen zur Zeitleiste</h2>
        {content.citations.length > 0 ? (
          <ul className="history-citation-list">
            {content.citations.map((citation) => (
              <li key={citation.sourceId}>
                {citation.url ? (
                  <a href={citation.url} target="_blank" rel="noopener noreferrer">{citation.title}</a>
                ) : (
                  <span>{citation.title}</span>
                )}
                {citation.locator && <p>{citation.locator}</p>}
                {citation.attributionNote && <p>{citation.attributionNote}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="source-register-note">Für die Aussagen auf dieser Seite sind noch keine geprüften Einzelnachweise hinterlegt. Die verlinkten Recherche-Portale sind Einstiegspunkte, keine Einzelbelege. <Link className="text-link" href="/quellen">Zum Quellenregister</Link></p>
        )}
      </section>
      <section className="content-section">
        <p className="section-kicker">WEITERENTDECKEN</p>
        <h2>Personen und Territorium</h2>
        <div className="quick-links-row">
          <Link href="/familie">Stammbäume: Wilhelm II. und Bismarck →</Link>
          <Link href="/entdeckerkarte">Karte des Kaiserreichs →</Link>
          <Link href="/quellen">Quellen und Literatur →</Link>
        </div>
      </section>
    </article>
  )
}
