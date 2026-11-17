import Link from 'next/link'
import { ArrowDown, ArrowRight, BookOpen, Crown, Globe2, Map, ScrollText, UsersRound } from 'lucide-react'

const milestones = [
  ['1871', 'Das Reich entsteht', 'Die Proklamation in Versailles begründet einen deutschen Nationalstaat unter preußischer Führung.'],
  ['1888', 'Ein Jahr, drei Kaiser', 'Auf Wilhelm I. folgt Friedrich III.; nach nur 99 Tagen wird Wilhelm II. Kaiser.'],
  ['1890', 'Bismarcks Abschied', 'Nach fast zwei Jahrzehnten als Reichskanzler scheidet Otto von Bismarck aus dem Amt.'],
  ['1914', 'Europa im Krieg', 'Der Erste Weltkrieg verändert Alltag, Politik und das Leben von Millionen Menschen.'],
  ['1918', 'Umbruch und Republik', 'Revolution und Abdankung beenden die Monarchie und das Kaiserreich.'],
]
const features = [
  { href: '/geschichte', image: '/imperial-berlin.png', eyebrow: '01 · POLITIK & GESELLSCHAFT', icon: BookOpen, title: 'Ein Reich im Wandel', text: 'Von der Reichsgründung bis zur Revolution: die wichtigsten Ereignisse und Kräfte.', action: 'Geschichte entdecken' },
  { href: '/entdeckerkarte', image: '/german-empire-hero.png', eyebrow: '02 · LÄNDER & GRENZEN', icon: Map, title: '25 Länder, ein Reich', text: 'Entdecke die föderale Landkarte und die Regionen des Kaiserreichs.', action: 'Karte erkunden' },
  { href: '/familie', image: '/imperial-industry.png', eyebrow: '03 · MENSCHEN & FAMILIEN', icon: UsersRound, title: 'Familien im Wandel', text: 'Lerne die Hohenzollern und Bismarcks mit interaktiven Stammbäumen kennen.', action: 'Familien kennenlernen' },
]

export function EmpireHome() {
  return <>
    <section className="hero empire-hero" id="start">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow"><span className="eyebrow-mark" /> Ein digitales Geschichtsmagazin · 1871—1918</p>
        <h1>Eine Zeit.<br/><em>Ein Reich.</em><br/>Ein Umbruch.</h1>
        <p className="hero-copy">Tauche ein in die Geschichte eines Landes zwischen Aufbruch, Macht und Wandel. Entdecke die Menschen, Ideen und Ereignisse, die Deutschland geprägt haben.</p>
        <div className="hero-actions"><Link className="button button-fill" href="/geschichte">Die Geschichte erleben <ArrowRight size={16}/></Link><a className="button button-ghost" href="#zeitleiste">Zeitreise starten <ArrowDown size={16}/></a></div>
        <div className="hero-facts"><div><strong>47</strong><span>Jahre Zeitgeschichte</span></div><div><strong>25</strong><span>Bundesstaaten</span></div><div><strong>3</strong><span>Kaiser</span></div></div>
      </div>
      <div className="hero-caption"><span>Berlin, um 1900</span><span>Ein Reich im Aufbruch</span></div>
      <a className="scroll-cue" href="#zeitleiste" aria-label="Zur Zeitleiste"><ArrowDown size={18}/></a>
    </section>
    <section className="empire-timeline content-section" id="zeitleiste">
      <div className="section-heading-row"><div><p className="section-kicker">EIN HALBES JAHRHUNDERT AUF EINEN BLICK</p><h2>Fünf Momente,<br/><em>die alles veränderten.</em></h2></div><p className="section-sidecopy">Folge den Spuren eines jungen Nationalstaats – von seinem glanzvollen Anfang bis zu seinem dramatischen Ende.</p></div>
      <div className="empire-milestones">{milestones.map(([year,title,detail],index)=><article className="empire-milestone" key={year}><time>{year}</time><span className="milestone-dot" aria-hidden="true"/><div><span className="milestone-index">0{index+1}</span><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
    </section>
    <section className="empire-discover content-section" id="themen">
      <p className="section-kicker">DAS KAISERREICH ENTDECKEN</p><div className="section-heading-row discover-heading"><h2>Geschichte, die<br/><em>näher kommt.</em></h2><p className="section-sidecopy">Mehr als Jahreszahlen: Bilder, Orte und Geschichten erzählen vom Leben in einer Epoche voller Gegensätze.</p></div>
      <div className="empire-feature-grid">{features.map(({href,image,eyebrow,icon:Icon,title,text,action})=><Link className="empire-feature" href={href} key={href}><span className="feature-image" style={{backgroundImage:`url(${image})`}} role="img" aria-label={title}/><span className="feature-content"><span className="feature-topline"><span className="empire-feature-icon"><Icon size={17}/></span><small>{eyebrow}</small></span><b>{title}</b><small className="feature-description">{text}</small><span className="feature-action">{action}<ArrowRight size={15}/></span></span></Link>)}</div>
    </section>
    <section className="empire-constitution content-section">
      <div className="constitution-image" role="img" aria-label="Historische Ansicht des Reichstags in Berlin"/>
      <div className="constitution-copy"><p className="section-kicker">MACHT, POLITIK & GESELLSCHAFT</p><h2>Ein Reich.<br/><em>Viele Stimmen.</em></h2><p>Eine Monarchie, ein gewähltes Parlament und 25 Bundesstaaten: Das politische System des Kaiserreichs war geprägt von Zusammenarbeit und Machtkonflikten.</p><div className="empire-three"><article><Crown/><h3>Kaiser & Kanzler</h3><p>Der Kaiser ernannte den Reichskanzler und prägte die Außenpolitik.</p></article><article><ScrollText/><h3>Reichstag</h3><p>Gewählte Abgeordnete debattierten über Gesetze und den Haushalt.</p></article><article><Globe2/><h3>Bundesstaaten</h3><p>Die Länder behielten eigene Regierungen und unterschiedliche Rechte.</p></article></div><Link className="text-link" href="/geschichte#verfassung">Das politische System verstehen <ArrowRight size={15}/></Link></div>
    </section>
    <section className="home-endnote"><span className="endnote-ornament"><Crown size={18}/></span><p>Geschichte ist nie nur Vergangenheit.</p><h2>Sie erzählt, wie wir<br/><em>geworden sind.</em></h2><Link className="button button-fill" href="/wissenstrainer">Wissen testen <ArrowRight size={16}/></Link></section>
  </>
}
