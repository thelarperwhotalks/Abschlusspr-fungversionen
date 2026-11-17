import Link from 'next/link'
import { ArrowDown, ArrowRight, BookOpen, Crown, Globe2, Map, ScrollText, UsersRound } from 'lucide-react'

const milestones = [
  ['1871', 'Reichsgründung', 'Die deutschen Staaten schließen sich unter preußischer Führung zum Kaiserreich zusammen.'],
  ['1888', 'Dreikaiserjahr', 'Wilhelm I. und Friedrich III. sterben; Wilhelm II. wird Kaiser.'],
  ['1890', 'Ende der Ära Bismarck', 'Bismarck scheidet aus dem Amt des Reichskanzlers aus.'],
  ['1914', 'Erster Weltkrieg', 'Das Reich tritt in den Krieg ein; Europa wird zum Kriegsschauplatz.'],
  ['1918', 'Ende des Kaiserreichs', 'Revolution, Waffenstillstand und Abdankung Wilhelms II. beenden die Monarchie.'],
]
const features = [
  { href: '/geschichte', icon: BookOpen, title: 'Geschichte im Überblick', text: 'Reichsgründung, Verfassung, Politik und das Ende 1918 – kurz und verständlich.' },
  { href: '/entdeckerkarte', icon: Map, title: 'Territorium 1914', text: 'Eine geografische Orientierung zu den Ländern und Regionen des Kaiserreichs.' },
  { href: '/familie', icon: UsersRound, title: 'Zwei Familien im Wandel', text: 'Die Hohenzollern und die Familie Bismarck in kompakten Stammbäumen.' },
]

export function EmpireHome() {
  return <>
    <section className="hero empire-hero" id="start">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">DEUTSCHES KAISERREICH · 1871–1918</p>
        <h1>Ein Reich.<br />47 Jahre Geschichte.</h1>
        <p className="hero-copy">Ein kompakter Überblick über Entstehung, Alltag, Herrschaft und Ende des Deutschen Kaiserreichs – vom Nationalstaat unter Wilhelm I. bis zur Abdankung Wilhelms II.</p>
        <div className="hero-actions"><Link className="button button-fill" href="/geschichte">Geschichte entdecken <ArrowRight size={16} /></Link><a className="button button-ghost" href="#zeitleiste">Zur Zeitleiste <ArrowDown size={16} /></a></div>
        <div className="hero-facts"><div><strong>1871–1918</strong><span>Deutsches Kaiserreich</span></div><div><strong>25</strong><span>Bundesstaaten</span></div><div><strong>3</strong><span>Kaiser</span></div></div>
      </div>
      <a className="scroll-cue" href="#zeitleiste" aria-label="Zur Zeitleiste"><ArrowDown size={18} /></a>
    </section>
    <section className="empire-timeline content-section" id="zeitleiste">
      <p className="section-kicker">FÜNF DATEN ZUR ORIENTIERUNG</p><h2>Vom Nationalstaat zum Umbruch</h2>
      <div className="empire-milestones">{milestones.map(([year,title,detail])=><article className="empire-milestone" key={year}><time>{year}</time><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
    </section>
    <section className="empire-discover content-section" id="themen">
      <p className="section-kicker">THEMEN &amp; EINSTIEGE</p><h2>Das Kaiserreich auf einen Blick</h2><p className="intro">Ein föderaler Staat mit dem Königreich Preußen als stärkstem Glied: Die folgenden Einstiege erklären seine wichtigsten Institutionen, Menschen und Regionen.</p>
      <div className="empire-feature-grid">{features.map(({href,icon:Icon,title,text})=><Link className="empire-feature" href={href} key={href}><span className="empire-feature-icon"><Icon size={19}/></span><span><b>{title}</b><small>{text}</small></span><ArrowRight className="empire-feature-arrow" size={17}/></Link>)}</div>
    </section>
    <section className="empire-constitution content-section">
      <p className="section-kicker">STAAT &amp; GESELLSCHAFT</p><h2>Eine Monarchie mit föderaler Verfassung</h2>
      <div className="empire-three"><article><Crown/><h3>Kaiser und Reichskanzler</h3><p>Der Kaiser war Staatsoberhaupt. Der von ihm ernannte Reichskanzler leitete die Reichspolitik und war dem Kaiser, nicht dem Reichstag, verantwortlich.</p></article><article><ScrollText/><h3>Bundesrat und Reichstag</h3><p>Der Bundesrat vertrat die Regierungen der Bundesstaaten. Der Reichstag wurde von Männern gewählt; das allgemeine Wahlrecht galt nicht für Frauen.</p></article><article><Globe2/><h3>Ein Reich, viele Länder</h3><p>Preußen prägte das Reich, doch Königreiche, Fürstentümer und freie Städte behielten eigene Regierungen und unterschiedliche Zuständigkeiten.</p></article></div>
      <p className="empire-caution">Das Kaiserreich veränderte sich über fast fünf Jahrzehnte. Diese Seite bietet einen Einstieg und vereinfacht Debatten und regionale Unterschiede bewusst.</p>
    </section>
  </>
}
