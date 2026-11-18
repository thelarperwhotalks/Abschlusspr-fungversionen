import type { Metadata } from 'next'
import Link from 'next/link'
import { EmpireMap } from '@/components/empire-map'

export const metadata: Metadata = {
  title: 'Deutschland und Europa im Kartenvergleich',
  description: 'Vergleiche heutige Grenzen Deutschlands und Europas mit den politischen Grenzen des Deutschen Kaiserreichs und Europas im Jahr 1914.',
}

export default function MapPage() {
  return <article className="page-content atlas-page">
    <header className="page-hero atlas-page-hero">
      <p className="section-kicker">KARTENATLAS · GRENZEN IM WANDEL</p>
      <h1>Deutschland und Europa im Vergleich</h1>
      <p className="lead">Vergleiche Europa mit den heutigen Grenzen (2026) und der politischen Landkarte von 1914. Die Deutschland-Ansicht zeigt zusätzlich die Reichsgrenzen im direkten Vergleich mit heute.</p>
      <Link className="back-link" href="/">← Zurück zur Übersicht</Link>
    </header>
    <section className="content-section empire-map-section" id="territorium">
      <div className="atlas-intro"><div><p className="section-kicker">DREI KARTENANSICHTEN · ZWEI ZEITSTÄNDE</p><h2>Grenzen erzählen Geschichte</h2></div><p>Die Karten zeigen, wie stark sich politische Zugehörigkeiten und Staatsgrenzen in Europa verändert haben.</p></div>
      <EmpireMap/>
      <div className="atlas-context">
        <article><span>01 · REICHSGEBIET</span><h3>Ein größerer Staat als heute</h3><p>Das Deutsche Kaiserreich umfasste 1914 unter anderem Elsass-Lothringen, Westpreußen, Posen und Ostpreußen. Die Karte überlagert die damalige Reichsfläche mit den heutigen Grenzen.</p></article>
        <article><span>02 · EUROPA 1914</span><h3>Imperien und Nationalstaaten</h3><p>Vor dem Ersten Weltkrieg prägten große Vielvölkerreiche wie Österreich-Ungarn, Russland und das Osmanische Reich die politische Karte Europas.</p></article>
        <article><span>03 · EINORDNUNG</span><h3>Keine heutigen Grenzen in der Vergangenheit</h3><p>Die historischen Flächen folgen dem Forschungsdatensatz für 1914. Grenzen und Staatsformen änderten sich im Verlauf der Epoche; diese Ansicht bildet einen Stichtag ab.</p></article>
      </div>
      <p className="atlas-source">Kartendaten: Jack Kavanagh, <a href="https://doi.org/10.5281/zenodo.21341486" target="_blank" rel="noreferrer">Map of Europe, c. 1914</a>, Zenodo, CC BY 4.0. Heutige Ländergrenzen: Natural Earth / world-atlas.</p>
    </section>
  </article>
}
