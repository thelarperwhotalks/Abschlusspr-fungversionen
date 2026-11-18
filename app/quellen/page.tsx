import type { Metadata } from 'next'
import Link from 'next/link'
import { connection } from 'next/server'
import { getSourceRegistry } from '@/lib/site-content'

export const metadata: Metadata = {
  title: 'Quellen & Mitwirkende · Deutsches Kaiserreich',
  description: 'Institutionelle Quellen, Lizenzstatus und weiterführende Hinweise zur Geschichte des Deutschen Kaiserreichs 1871–1918.',
}

const sourceTypeLabels: Record<string, string> = {
  research_portal: 'Rechercheportal',
  collection_portal: 'Sammlungsportal',
  media_collection: 'Mediensammlung',
  local_asset: 'Lokale Bilddatei',
}

const licenseLabels = {
  unverified: 'Lizenz nicht geprüft',
  public_domain: 'Gemeinfreiheit vermerkt',
  open_license: 'Offene Lizenz vermerkt',
  permission_granted: 'Nutzungserlaubnis vermerkt',
  restricted: 'Nutzung eingeschränkt',
  not_applicable: 'Keine Lizenzangabe nötig',
} as const

export default async function SourcesPage() {
  await connection()
  const sources = await getSourceRegistry()

  return (
    <article className="page-content">
      <header className="page-hero">
        <p className="section-kicker">WEITERLESEN &amp; NACHPRÜFEN</p>
        <h1>Quellen und Mitwirkende</h1>
        <p className="lead">Das Quellenregister wird aus der Datenbank geladen. Es enthält Recherche-Einstiege und Lizenzhinweise; es ersetzt keine Einzelbelege zu konkreten Aussagen.</p>
        <Link className="back-link" href="/">← Zurück zur Übersicht</Link>
      </header>
      <section className="content-section" id="quellenliste">
        <p className="section-kicker">AUSGEWÄHLTE INSTITUTIONEN</p>
        <h2>Weiterführende Quellen</h2>
        <div className="source-list">
          {sources.map((source) => (
            <article className="source-card" key={source.id}>
              <span className="source-type">{sourceTypeLabels[source.sourceType] ?? 'Quelle'}</span>
              <span className="source-status">{licenseLabels[source.licenseStatus]}</span>
              <h3>{source.title}</h3>
              {source.organization && <p className="source-organization">{source.organization}</p>}
              <p>{source.notes}</p>
              {source.requiredCredit && <p><strong>Vorgeschriebener Bildnachweis:</strong> {source.requiredCredit}</p>}
              {source.checkedAt && <time className="source-check-date" dateTime={source.checkedAt}>Lizenzangaben zuletzt geprüft: {new Date(`${source.checkedAt}T00:00:00`).toLocaleDateString('de-DE')}</time>}
              {source.url ? (
                <a href={source.url} target="_blank" rel="noopener noreferrer" aria-label={`${source.title} – Website öffnet in neuem Tab`}>Website öffnen ↗</a>
              ) : (
                <span className="source-check-date">Kein sicherer Weblink hinterlegt.</span>
              )}
            </article>
          ))}
        </div>
        <aside className="source-register-note">
          <h3>Quellenangabe ist keine Nutzungserlaubnis</h3>
          <p>Ein Quellenverzeichnis ersetzt weder Einzelbelege noch eine Lizenz. Texte, Karten und Abbildungen Dritter dürfen nur im Rahmen ihrer jeweiligen Nutzungsbedingungen verwendet werden. Prüfe vor jeder Übernahme Urheber, Lizenz, erforderliche Namensnennung und gegebenenfalls die Erlaubnis zur Bearbeitung.</p>
          <p>Die Titelgrafik dieser Website ist eine künstlerische Rekonstruktion und keine historische Fotografie. Die im Register genannten Portale sind allgemeine Recherche-Einstiege; ihre Aufnahme bestätigt weder eine Lizenz noch die Belegung einzelner Aussagen.</p>
        </aside>
      </section>
      <section className="content-section" id="credits">
        <p className="section-kicker">MITWIRKENDE</p>
        <div className="credit-card">
          <h2>Ein Lernprojekt</h2>
          <p>Projekt: Deutsches Kaiserreich 1871–1918 — Recherche, Konzeption und Gestaltung: Niklas Schaub, Nils Schwemm und Samuel Verstraeten.</p>
          <p>Einzelbelege zu den historischen Inhalten werden schrittweise ergänzt.</p>
        </div>
        <Link className="text-link" href="/impressum">Zum Impressum →</Link>
      </section>
    </article>
  )
}
