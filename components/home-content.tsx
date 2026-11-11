'use client'

import Link from 'next/link'
import { BookOpen, Clock3, FileText, Hammer, HelpCircle, Map, ScrollText, Trophy, ArrowRight, ArrowDown, Compass } from 'lucide-react'
import { useEffect, useState } from 'react'
const previews = [
  { href: '/geschichte', label: 'Geschichte', detail: 'Ursachen, Verlauf und Alltag', Icon: BookOpen },
  { href: '/entdeckerkarte', label: 'Entdeckerkarte', detail: 'Karton, LED und Lernstationen', Icon: Map },
  { href: '/anleitung', label: '9-Schritte-Anleitung', detail: 'Vom Material zur fertigen Karte', Icon: Hammer },
  { href: '/klappentexte', label: 'Klappentexte', detail: 'Texte für deine Präsentation', Icon: ScrollText },
  { href: '/wissenscheck', label: 'Wissens-Check', detail: 'Zwölf Fragen zur Geschichte', Icon: HelpCircle },
  { href: '/wissenstrainer', label: 'Wissenstrainer', detail: 'Fünf spielerische Lernmodi', Icon: Trophy },
  { href: '/quellen', label: 'Quellen', detail: 'Weiterführende Recherche', Icon: FileText },
]
export function HomeContent() {
  const [resume, setResume] = useState<{ href: string; label: string; step?: number } | null>(null)
  useEffect(() => { try { const saved = JSON.parse(localStorage.getItem('verdun-last-place') ?? 'null'); if (saved?.path && saved.path !== '/') setResume(saved) } catch { setResume(null) } }, [])
  return <>
    <section className="hero" id="start"><div className="hero-overlay"/><div className="hero-content"><p className="eyebrow">21. FEBRUAR – 18. DEZEMBER 1916 · 302 TAGE</p><h1>Die Schlacht<br/>um Verdun 1916</h1><p className="hero-copy">Eine sachliche Entdeckungsreise durch Ursachen, Alltag und Folgen der Schlacht – mit einer interaktiven Lernkarte aus Karton und LED.</p><div className="hero-actions"><Link className="button button-fill" href="/anleitung">Zur Bauanleitung <ArrowRight size={16}/></Link><Link className="button button-ghost" href="/geschichte">Erst die Geschichte</Link></div><div className="hero-facts"><div><strong>21. Feb. – 18. Dez.</strong><span>302 Tage</span></div><div><strong>≈ 700.000</strong><span>Tote und Verwundete</span></div><div><strong>26 Mio.</strong><span>Sprenggranaten</span></div><div><strong>≈ 15 €</strong><span>Materialkosten</span></div><div><strong>4–6 Std.</strong><span>Bauzeit</span></div></div><p className="creator-note">Ein Projekt von Niklas Schaub</p></div><a className="scroll-cue" href="#schnellzugriff" aria-label="Zu den Seiten"><ArrowDown size={18}/></a></section>
    <section className="quick-access page-section" id="schnellzugriff"><p className="section-kicker">SCHNELLZUGRIFF</p><h2>Wohin möchtest du?</h2><p className="intro">Wähle eine Seite oder springe direkt zu einem wichtigen Lernbereich.</p><div className="quick-grid">{previews.map(({ href, label, detail, Icon })=><Link className="quick-card" href={href} key={href}><span className="quick-icon"><Icon size={21}/></span><span><b>{label}</b><small>{detail}</small></span><ArrowRight className="quick-arrow" size={16}/></Link>)}</div><div className="quick-links-row"><Link href="/geschichte#zeitleiste"><Clock3 size={16}/>Zeitleiste</Link><Link href="/geschichte#begriffe"><BookOpen size={16}/>Begriffe</Link><Link href="/geschichte#faq"><HelpCircle size={16}/>FAQ</Link><Link href="/anleitung#materialliste"><Hammer size={16}/>Materialliste</Link><Link href="/wissenscheck"><Compass size={16}/>Wissens-Check</Link></div>{resume&&<Link className="resume-card" href={resume.href}><Clock3 size={18}/><span><b>Weiter machen</b><small>Zuletzt: {resume.label}{resume.step?`, Schritt ${resume.step}`:''}</small></span><ArrowRight size={17}/></Link>}</section>
    <section className="numbers page-section" id="fakten"><p className="section-kicker">EIN HISTORISCHER ÜBERBLICK</p><h2>Verdun in Zahlen</h2><div className="number-grid"><div><strong>302</strong><span>Tage Schlacht</span></div><div><strong>19</strong><span>Forts und Zwischenwerke</span></div><div><strong>40 km</strong><span>Frontlinie</span></div><div><strong>1916</strong><span>ein Wendepunkt</span></div></div><p className="stat-caveat">Verlustangaben variieren je nach Quelle und danach, ob Tote, Verwundete und Vermisste zusammengezählt werden.</p></section>
  </>
}
