import type { Metadata } from 'next'
import Link from 'next/link'
import { EmpireMap } from '@/components/empire-map'

export const metadata: Metadata = {
  title: 'Weltkarte 1914 und 2026 im Vergleich',
  description: 'Vergleiche die politische Weltkarte von 1914 mit der Welt im Jahr 2026 – einschließlich der europäischen Kolonialgebiete und heutigen Überseegebiete.'
}

export default function MapPage() {
  return <article className="page-content atlas-page">
    <header className="page-hero atlas-page-hero">
      <p className="section-kicker">KARTENATLAS · GRENZEN IM WANDEL</p>
      <h1>Weltkarte 1914 und 2026</h1>
      <p className="lead">Vergleiche die ganze Welt vor dem Ersten Weltkrieg mit der politischen Karte von 2026. Die Deutschland-Ansicht zeigt zusätzlich die Reichsgrenzen von 1914 im direkten Vergleich mit heute.</p>
      <Link className="back-link" href="/">← Zurück zur Übersicht</Link>
    </header>
    <section className="content-section empire-map-section" id="territorium">
      <div className="atlas-intro"><div><p className="section-kicker">DREI KARTENANSICHTEN · ZWEI ZEITSTÄNDE</p><h2>Grenzen erzählen Geschichte</h2></div><p>Die Weltkarten zeigen die europäischen Kolonialreiche von 1914 und heutige souveräne Staaten sowie Überseegebiete im Stand 2026.</p></div>
      <EmpireMap/>
      <div className="atlas-context">
        <article><span>01 · REICHSGEBIET</span><h3>Ein größerer Staat als heute</h3><p>Das Deutsche Kaiserreich umfasste 1914 unter anderem Elsass-Lothringen, Westpreußen, Posen und Ostpreußen. Die Karte überlagert die damalige Reichsfläche mit den heutigen Grenzen.</p></article>
        <article><span>02 · WELT 1914</span><h3>Imperien über Kontinente hinweg</h3><p>Die Karte zeigt Kolonialgebiete europäischer Mächte auf einer Weltkarte. Die Farbe ordnet Gebiete ihrer Verwaltungsmacht zu, soweit dies der historische Datensatz ausweist.</p></article>
        <article><span>03 · EINORDNUNG</span><h3>Kolonien damals, Überseegebiete heute</h3><p>Die Gegenwartskarte markiert ausgewählte abhängige und überseeische Gebiete europäischer Staaten. Ihr heutiger verfassungsrechtlicher Status ist unterschiedlich und nicht mit den Kolonialverwaltungen von 1914 gleichzusetzen.</p></article>
      </div>
      <p className="atlas-source">Weltkarte 1914: <a href="https://github.com/aourednik/historical-basemaps/blob/master/geojson/world_1914.geojson" target="_blank" rel="noreferrer">Historical Basemaps</a> (<a href="https://www.gnu.org/licenses/gpl-3.0.html" target="_blank" rel="noreferrer">GNU GPL v3</a>). Deutschland-Karte 1914: Jack Kavanagh, <a href="https://doi.org/10.5281/zenodo.21341486" target="_blank" rel="noreferrer">Map of Europe, c. 1914</a>, CC BY 4.0. Heutige Grenzen und ausgewählte Überseegebiete: Natural Earth / world-atlas.</p>
    </section>
  </article>
}
