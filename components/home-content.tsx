'use client'

import Link from 'next/link'
import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, BookOpen, ChevronRight, Skull, ShieldAlert, Clock3, BookMarked } from 'lucide-react'

const tabs = [
  { id: 'ueberblick', label: 'Überblick' },
  { id: 'verlauf', label: 'Verlauf' },
  { id: 'verluste', label: 'Verluste' },
  { id: 'gas', label: 'Giftgas' },
]
const timeline = [
  ['21. Februar', 'Beginn des deutschen Angriffs nach massivem Artilleriebeschuss. Die Operation trägt den Tarnnamen „Gericht“.'],
  ['25. Februar', 'Deutsche Truppen nehmen Fort Douaumont ein – ein schwerer symbolischer Schlag für Frankreich.'],
  ['März–Mai', 'Die Kämpfe weiten sich auf beide Maas-Ufer aus. Fort Vaux wird zum Schauplatz erbitterter Nahkämpfe.'],
  ['7. Juni', 'Die Besatzung von Fort Vaux kapituliert nach ausbleibendem Wasser und tagelanger Einschließung.'],
  ['23. Juni', 'Ein deutscher Großangriff erreicht die Nähe von Fleury; der französische Widerstand hält stand.'],
  ['Oktober–Dezember', 'Französische Gegenoffensiven nehmen Douaumont und Vaux zurück. Am 18. Dezember enden die großen Kampfhandlungen.'],
]
const facts = [
  ['302', 'Tage zwischen Beginn und Ende der Schlacht'], ['≈ 712.000', 'militärische Gesamtverluste beider Seiten, je nach Zählweise'], ['≈ 379.000', 'französische Verluste, je nach Zählweise'], ['≈ 333.000', 'deutsche Verluste, je nach Zählweise'],
]

export function HomeContent() {
  const [active, setActive] = useState('ueberblick')
  const reduceMotion = useReducedMotion()
  return <>
    <section className="hero verdun-hero" id="start">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow">WESTFRONT · 21. FEBRUAR – 18. DEZEMBER 1916</p>
        <h1>Verdun:<br />eine Schlacht im Ersten Weltkrieg</h1>
        <p className="hero-copy">Die Kämpfe dauerten 302 Tage. Viele Menschen wurden getötet oder verletzt. Hier erfährst du, warum die Schlacht begann, wie sie verlief und welche Folgen sie hatte.</p>
        <a className="button button-fill" href="#artikel">Mehr erfahren <ArrowDown size={16} /></a>
        <div className="hero-credit">Einblicke in Geschichte, Folgen und Erinnerung · Niklas Schaub, Nils Schwemm &amp; Samuel Verstraeten</div>
      </div>
      <a className="scroll-cue" href="#artikel" aria-label="Zum Artikel"><ArrowDown size={18} /></a>
    </section>
    <div className="article-layout" id="artikel">
      <aside className="article-aside"><div className="infobox"><img src="/verdun-hero.png" alt="Zerstörte Landschaft an der Westfront bei Verdun" /><p className="infobox-caption">Die Landschaft um Verdun wurde durch Artilleriefeuer dauerhaft verändert.</p><h2>Schlacht um Verdun</h2><dl><dt>Zeitraum</dt><dd>21. Februar – 18. Dezember 1916</dd><dt>Ort</dt><dd>Verdun, Nordostfrankreich</dd><dt>Parteien</dt><dd>Deutsches Kaiserreich · Frankreich</dd><dt>Ergebnis</dt><dd>Französische Verteidigung; weitgehend Rückkehr zu den Ausgangslinien</dd><dt>Bezeichnung</dt><dd>„L’enfer de Verdun“ – die Hölle von Verdun</dd></dl></div><p className="article-aside-note">Die Zahlen in der Forschung weichen voneinander ab. Definitionen und Erfassungsmethoden unterscheiden sich.</p></aside>
      <article className="article-body">
        <p className="article-kicker">HISTORISCHER ÜBERBLICK</p><h2>Schlacht um Verdun 1916</h2>
        <p className="article-lead">Die Schlacht um Verdun war eine der längsten und verlustreichsten Auseinandersetzungen des Ersten Weltkriegs. Sie wurde an der deutschen Westfront geführt und entwickelte sich zu einem Sinnbild für industrielle Abnutzung, standhafte Verteidigung und millionenfaches Leid.</p>
        <div className="article-tabs" role="tablist" aria-label="Artikelbereiche">{tabs.map((tab) => <button key={tab.id} role="tab" id={`tab-${tab.id}`} aria-selected={active === tab.id} aria-controls="article-panel" className={active === tab.id ? 'selected' : ''} onClick={() => setActive(tab.id)}>{tab.label}</button>)}</div>
        <AnimatePresence mode="wait"><motion.div key={active} id="article-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="article-tab-panel" initial={reduceMotion ? false : { opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={reduceMotion ? undefined : { opacity: 0, x: -8 }} transition={{ duration: reduceMotion ? 0 : .2 }}>
          {active === 'ueberblick' && <section id="hintergrund"><h3>Hintergrund und Zielsetzung</h3><p>Verdun lag in einem befestigten Abschnitt der französischen Front. Die deutschen Streitkräfte unter Kronprinz Wilhelm begannen am 21. Februar 1916 einen Angriff. Generalstabschef Erich von Falkenhayn wollte Frankreich an einem politisch und symbolisch bedeutsamen Ort in eine verlustreiche Schlacht zwingen. Die genaue Interpretation seiner Absichten ist unter Historikern umstritten.</p><p>Der Angriff sollte zunächst durch Artillerieüberlegenheit den Weg öffnen. Doch die französische Armee hielt die Front, organisierte den Nachschub über die Straße von Bar-le-Duc – später als <a href="#voie-sacree">Voie Sacrée</a> bekannt – und führte wiederholt Verstärkungen heran. Verdun wurde damit zum erbitterten Abnutzungskampf.</p><div className="article-callout"><strong>Warum Verdun?</strong><p>Die Festungsstadt hatte militärische und symbolische Bedeutung. Ihr Fall hätte Frankreichs Moral und die Stabilität der Front erschüttern können.</p></div><h3 id="alltag">Leben an der Front</h3><p>Artilleriefeuer zerstörte Wege, Wälder und Dörfer. Soldaten kämpften in Schlamm, Kälte, Rauch und Lärm; Versorgung und Verwundetentransport waren lebensgefährlich. Die Front wechselte abschnittsweise, doch Geländegewinne blieben oft gering. Dörfer wie Fleury-devant-Douaumont wurden vollständig zerstört.</p><h3 id="voie-sacree">Die Voie Sacrée</h3><p>Die Straße zwischen Bar-le-Duc und Verdun war eine zentrale französische Nachschubachse. Fahrzeuge transportierten Truppen, Munition und Lebensmittel in Richtung Front und Verwundete zurück. Ihre kontinuierliche Nutzung machte die Versorgung der Verteidiger trotz des Beschusses möglich.</p></section>}
          {active === 'verlauf' && <section id="zeitleiste"><h3>Verlauf der Schlacht</h3><p>Der Frontverlauf veränderte sich mehrfach. Die Ereignisse zeigen, wie aus dem Angriff eine monatelange Abnutzungsschlacht wurde.</p><div className="history-timeline">{timeline.map(([date, detail]) => <div className="history-event" key={date}><time>{date} 1916</time><p>{detail}</p></div>)}</div><p>Im Oktober und Dezember 1916 eroberte Frankreich wichtige Stellungen zurück. Die Front näherte sich weitgehend den Linien vom Jahresbeginn an; ein eindeutiger militärischer Sieger lässt sich deshalb nur schwer benennen.</p></section>}
          {active === 'verluste' && <section id="verluste"><h3>Verluste und ihre Zählung</h3><p>Verdun kostete Hunderttausende Soldaten das Leben oder ihre Gesundheit. Häufig zitierte Schätzungen kommen für beide Seiten zusammen auf rund 700.000 militärische Verluste. Darin sind Tote, Verwundete und Vermisste enthalten – nicht ausschließlich Gefallene.</p><div className="loss-grid">{facts.map(([number, label]) => <div className="loss-stat" key={number}><strong>{number}</strong><span>{label}</span></div>)}</div><p>Oft genannte Schätzungen beziffern die französischen Verluste auf etwa 377.000 und die deutschen auf etwa 337.000. Andere Quellen kommen zu abweichenden Werten. Unterschiede entstehen unter anderem dadurch, ob Mehrfachverwundungen, Vermisste, spätere Todesfälle und Gefangene einbezogen werden. Die Zahlen sind daher Näherungen und nicht direkt mit reinen Todeszahlen gleichzusetzen.</p><div className="article-callout"><strong>Wichtig zur Einordnung</strong><p>„Verluste“ bezeichnet in militärischen Statistiken häufig Tote, Verwundete, Vermisste und Gefangene zusammen. Es bedeutet nicht automatisch „Gefallene“.</p></div><h3>Unterschiede zwischen den Armeen</h3><p>Beide Armeen erlitten enorme Verluste. Die französische Verteidigung setzte auf rasche Ablösung und Versorgung über die Voie Sacrée; deutsche Truppen kämpften ebenfalls unter schwerem Artilleriefeuer und wurden in wechselnden Angriffswellen eingesetzt. Die oft genannten Gesamtwerte für Frankreich und Deutschland liegen relativ nahe beieinander, sind aber wegen unterschiedlicher Erfassung nicht als exakter Leistungsvergleich zu verstehen.</p></section>}
          {active === 'gas' && <section id="gas"><h3>Chemische Waffen bei Verdun</h3><p><strong>Ja – beide Seiten setzten im Ersten Weltkrieg chemische Kampfstoffe ein.</strong> Bei Verdun sind insbesondere deutsche Angriffe mit Reiz- und Giftgasmunition im Jahr 1916 belegt. Die Berichte sprechen unter anderem von Grünkreuz- und Blaukreuzmunition: Bezeichnungen für deutsche Artilleriegeschosse mit unterschiedlichen chemischen Wirkstoffen und Wirkungen.</p><div className="gas-card"><ShieldAlert size={22}/><div><strong>Was bedeuteten die Kennzeichnungen?</strong><p>„Grünkreuz“ stand für Geschosse mit lungenschädigenden Kampfstoffen, darunter Phosgen beziehungsweise Mischungen. „Blaukreuz“ bezeichnete Reizstoffe, die Atemschutzfilter durchdringen konnten. Die genaue Zusammensetzung einzelner Ladungen variierte.</p></div></div><h3>Wann und wo?</h3><p>Im Umfeld der Kämpfe um Verdun wurden 1916 deutsche Gasgranaten gegen französische Stellungen eingesetzt. Chemische Munition war Teil des Artilleriekriegs und wurde nicht nur in einem einzelnen Angriff verwendet. Zeitgenössische Berichte und spätere Darstellungen unterscheiden sich bei konkreten Orten und der Bewertung der Wirkung; deshalb sollte man einzelne Vorfälle nur mit spezifischem Quellenbeleg datieren.</p><h3>War es Senfgas?</h3><p>Das bekannte Senfgas (Lost) wurde 1917 von deutschen Truppen erstmals großflächig an der Westfront eingesetzt – also nach der Schlacht um Verdun. Für Verdun 1916 sind vor allem andere Kampfstoffe wie Phosgen und Reizstoffe relevant. Senfgas als typischen Verdun-Kampfstoff darzustellen wäre daher irreführend.</p><p>Auch die französische Armee entwickelte und verwendete chemische Waffen im Krieg. Die Quellenlage für den konkreten Einsatz einzelner französischer Kampfstoffe im Verdun-Abschnitt ist jedoch weniger eindeutig als für die dokumentierte deutsche Gasmunition. Ein pauschales „beide Seiten setzten bei Verdun dieselben Gase ein“ wäre nicht belegt.</p><div className="article-callout"><strong>Einordnung</strong><p>Chemische Waffen verursachten Angst, Verletzungen und Todesfälle, aber die überwältigende Zerstörungskraft bei Verdun ging vor allem von Artillerie und konventionellen Waffen aus.</p></div></section>}
        </motion.div></AnimatePresence>
        <section className="article-further"><h3>Weiterlernen</h3><Link href="/wissenstrainer"><BookMarked size={17}/> Wissensspeicher: Begriffe und Bedeutungen <ChevronRight size={16}/></Link><Link href="/quellen"><BookOpen size={17}/> Quellen und weiterführende Literatur <ChevronRight size={16}/></Link></section>
        <p className="article-credits">Redaktion und Gestaltung: Niklas Schaub, Nils Schwemm und Samuel Verstraeten.</p>
      </article>
    </div>
  </>
}
