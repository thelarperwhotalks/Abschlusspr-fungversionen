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
  { href: '/geschichte', image: '/imperial-berlin.png', icon: BookOpen, title: 'Geschichte im Überblick', text: 'Reichsgründung, Verfassung, Politik und das Ende 1918 – kurz und verständlich.', tag: 'POLITIK & GESELLSCHAFT' },
  { href: '/entdeckerkarte', image: '/german-empire-hero.png', icon: Map, title: 'Deutschland & Europa im Vergleich', text: 'Heutige Grenzen neben dem Deutschen Kaiserreich und Europa von 1914 entdecken.', tag: 'KARTENATLAS' },
  { href: '/familie', image: '/imperial-industry.png', icon: UsersRound, title: 'Zwei Familien im Wandel', text: 'Die Hohenzollern und die Familie Bismarck in kompakten Stammbäumen.', tag: 'MENSCHEN & FAMILIEN' },
]

export function EmpireHome() {
  return <>
    <section className="hero empire-hero" id="start">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow"><span className="eyebrow-mark"/> DEUTSCHES KAISERREICH · 1871–1918</p>
        <h1>Ein Reich.<br/><em>47 Jahre Geschichte.</em></h1>
        <p className="hero-copy">Ein kompakter Überblick über Entstehung, Alltag, Herrschaft und Ende des Deutschen Kaiserreichs – vom Nationalstaat unter Wilhelm I. bis zur Abdankung Wilhelms II.</p>
        <div className="hero-actions"><Link className="button button-fill" href="/geschichte">Geschichte entdecken <ArrowRight size={16}/></Link><a className="button button-ghost" href="#zeitleiste">Zur Zeitleiste <ArrowDown size={16}/></a></div>
        <div className="hero-facts"><div><strong>1871–1918</strong><span>Deutsches Kaiserreich</span></div><div><strong>25</strong><span>Bundesstaaten</span></div><div><strong>3</strong><span>Kaiser</span></div></div>
      </div>
      <div className="hero-caption"><span>Künstlerische Rekonstruktion</span><span>Keine historische Fotografie</span></div>
      <a className="scroll-cue" href="#zeitleiste" aria-label="Zur Zeitleiste"><ArrowDown size={18}/></a>
    </section>
    <section className="empire-timeline content-section" id="zeitleiste">
      <div className="section-heading-row"><div><p className="section-kicker">FÜNF DATEN ZUR ORIENTIERUNG</p><h2>Vom Nationalstaat<br/><em>zum Umbruch.</em></h2></div><p className="section-sidecopy">Folge den Wendepunkten einer Epoche, die Europa und das Leben seiner Menschen nachhaltig veränderte.</p></div>
      <div className="empire-milestones">{milestones.map(([year,title,detail],index)=><article className="empire-milestone" key={year}><time>{year}</time><span className="milestone-dot" aria-hidden="true"/><div><span className="milestone-index">0{index+1}</span><h3>{title}</h3><p>{detail}</p></div></article>)}</div>
    </section>
    <section className="empire-discover content-section" id="themen">
      <p className="section-kicker">THEMEN & EINSTIEGE</p><div className="section-heading-row discover-heading"><h2>Das Kaiserreich<br/><em>auf einen Blick.</em></h2><p className="section-sidecopy">Entdecke die Epoche durch Orte, Menschen und Ereignisse – mit historischen Bildern und interaktiven Erkundungen.</p></div>
      <div className="empire-feature-grid">{features.map(({href,image,icon:Icon,title,text,tag},index)=><Link className={`empire-feature feature-card-${index+1}`} href={href} key={href}><span className="feature-image" style={{backgroundImage:`url(${image})`}} role="img" aria-label={title}/><span className="feature-content"><span className="feature-topline"><span className="empire-feature-icon"><Icon size={17}/></span><small>{tag}</small></span><b>{title}</b><small className="feature-description">{text}</small><span className="feature-action">Entdecken <ArrowRight size={15}/></span></span></Link>)}</div>
    </section>
    <section className="empire-constitution content-section">
      <div className="constitution-image" role="img" aria-label="Historische Ansicht des Reichstags in Berlin"/>
      <div className="constitution-copy"><p className="section-kicker">STAAT & GESELLSCHAFT</p><h2>Eine Monarchie<br/><em>mit vielen Stimmen.</em></h2><div className="empire-three"><article><Crown/><h3>Kaiser & Reichskanzler</h3><p>Der Kaiser war Staatsoberhaupt. Der Kanzler leitete die Reichspolitik und war dem Kaiser verantwortlich.</p></article><article><ScrollText/><h3>Bundesrat & Reichstag</h3><p>Die Länder wirkten im Bundesrat mit; der Reichstag wurde von Männern gewählt.</p></article><article><Globe2/><h3>Ein Reich, viele Länder</h3><p>Preußen prägte den Bund, während die Länder eigene Regierungen behielten.</p></article></div><Link className="text-link" href="/geschichte#verfassung">Das politische System verstehen <ArrowRight size={15}/></Link></div>
    </section>
    <section className="home-endnote"><span className="endnote-ornament"><Crown size={18}/></span><p>GESCHICHTE · GESELLSCHAFT · ERINNERUNG</p><h2>Vergangenheit<br/><em>in neuem Licht.</em></h2><Link className="button button-fill" href="/wissenstrainer">Wissen testen <ArrowRight size={16}/></Link></section>
  </>
}
