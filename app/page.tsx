'use client'

import { useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronDown, Clock3, Moon, RotateCcw, Sun } from 'lucide-react'

const navItems = [['Geschichte', 'geschichte'], ['Zeitleiste', 'zeitleiste'], ['Begriffe', 'begriffe'], ['Entdeckerkarte', 'karte'], ['Anleitung', 'anleitung'], ['Klappentexte', 'klappentexte'], ['Wissens-Check', 'check'], ['Quellen', 'quellen']]
const facts = [['≈ 700.000', 'Tote und Verwundete'], ['26 Mio.', 'Sprenggranaten'], ['≈ 15 €', 'Materialkosten'], ['4–6 Std.', 'Bauzeit']]
const glossary = [
  ['Stellungskrieg', 'Krieg, in dem sich Frontlinien über längere Zeit kaum bewegen und beide Seiten aus befestigten Stellungen kämpfen.', 'Beispiel', 'Die Schützengräben bei Verdun machten jeden Geländegewinn extrem teuer.'],
  ['Materialschlacht', 'Eine Schlacht, in der industrielle Produktionskraft und der Verbrauch von Waffen und Munition entscheidend sind.', 'Merksatz', 'Nicht nur Soldaten, sondern Fabriken und Nachschub entschieden mit.'],
  ['Abnutzungskrieg', 'Eine Strategie, die den Gegner durch dauerhaft höhere Verluste und Erschöpfung zum Aufgeben zwingen soll.', 'Bei Verdun', 'Falkenhayn hoffte, Frankreichs Kriegswillen „auszubluten“.'],
  ['Voie Sacrée', 'Die „Heilige Straße“ war die wichtigste französische Versorgungsroute von Bar-le-Duc nach Verdun.', 'Bedeutung', 'Über sie kamen Verstärkung, Munition und Material an die Front.'],
  ['Fort Douaumont', 'Das größte und strategisch wichtigste Fort im Festungsring von Verdun.', 'Datum', 'Es fiel am 25. Februar 1916 und wurde im Oktober zurückerobert.'],
  ['Nivelle-Offensive', 'Die französische Gegenoffensive im Herbst 1916, die viele verlorene Stellungen zurückbrachte.', 'Folge', 'Die Front stabilisierte sich, ohne dass eine Seite wirklich siegte.'],
]
const quiz = [
  ['Wie lange dauerte die Schlacht um Verdun?', ['302 Tage', '42 Tage', '1916 Monate'], 0],
  ['Was war die Voie Sacrée?', ['Ein Fort', 'Eine Versorgungsstraße', 'Ein Waffenstillstand'], 1],
  ['Welche Waffe prägte den Stellungskrieg besonders?', ['Artillerie', 'Pfeil und Bogen', 'Segelschiffe'], 0],
]

export default function Page() {
  const [dark, setDark] = useState(false)
  const [openTerm, setOpenTerm] = useState<number | null>(null)
  const [doneSteps, setDoneSteps] = useState<number[]>([])
  const [question, setQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const progress = useMemo(() => Math.round((doneSteps.length / 5) * 100), [doneSteps])
  const toggleStep = (step: number) => setDoneSteps((current) => current.includes(step) ? current.filter((item) => item !== step) : [...current, step])
  const answer = (option: number) => { if (!answered) { setAnswered(true); if (option === quiz[question][2]) setScore(score + 1) } }
  const nextQuestion = () => { setAnswered(false); setQuestion((question + 1) % quiz.length) }
  const resetQuiz = () => { setQuestion(0); setScore(0); setAnswered(false) }

  return <div className={dark ? 'site dark-mode' : 'site'}>
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Verdun 1916 Startseite"><BookOpen size={20} strokeWidth={1.5} /><span>Verdun 1916</span><em>· Entdeckerkarte &amp; Geschichte</em></a>
      <nav aria-label="Hauptnavigation">{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
      <button className="theme-button" onClick={() => setDark(!dark)} aria-label="Farbschema wechseln">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
    </header>

    <main id="top">
      <section className="hero"><div className="hero-overlay" /><div className="hero-content"><p className="eyebrow">21. FEBRUAR – 18. DEZEMBER 1916 · 302 TAGE</p><h1>Die Schlacht<br />um Verdun 1916</h1><p className="hero-copy">Stellungskrieg an der Westfront: verstehen, warum Verdun ohne Sieger blieb – und wie du die Schlacht mit einer selbstgebauten, interaktiven Entdeckerkarte aus Karton und LED erklären kannst.</p><div className="hero-actions"><a className="button button-fill" href="#anleitung">Zur Bauanleitung <ArrowRight size={16} /></a><a className="button button-ghost" href="#geschichte">Erst die Geschichte</a></div><div className="hero-facts">{facts.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div><a className="scroll-cue" href="#zahlen" aria-label="Zu den Fakten scrollen"><ArrowDown size={18} /></a></section>

      <section className="numbers" id="zahlen"><div className="section-kicker">AUS DER DATENBANK</div><h2>Verdun in Zahlen</h2><div className="number-grid"><div><strong>302</strong><span>Tage Schlacht</span></div><div><strong>19</strong><span>Forts und Zwischenwerke</span></div><div><strong>40 km</strong><span>Frontlinie</span></div><div><strong>1916</strong><span>ein Wendepunkt</span></div></div></section>

      <section className="research" id="geschichte"><p className="section-kicker">HISTORISCHE RECHERCHE</p><h2>Die Schlacht verstehen: Ursachen, Verlauf, Alltag, Folgen</h2><p className="intro">Verdun war mehr als eine einzelne Offensive. Es wurde zum Sinnbild für die industrielle Gewalt des Ersten Weltkriegs und für das Durchhalten unter unmenschlichen Bedingungen.</p><div className="article-grid"><article><span className="article-number">01</span><h3>Ursachen und Ziele: Falkenhayns Plan</h3><p>Verdun war eine alte französische Festungsstadt an der Maas mit hoher Symbolbedeutung. Der deutsche Generalstabschef Erich von Falkenhayn wollte Frankreichs Kriegswillen durch eine konzentrierte Offensive brechen.</p><p>Die Stadt lag in einem Bogen aus 19 Forts und Zwischenwerken. Ihr Fall hätte eine Lücke in der französischen Verteidigung geschaffen.</p></article><article><span className="article-number">02</span><h3>Wie wurde gekämpft: Industrialisierung des Krieges</h3><p>Maschinengewehre, Artillerie, Giftgas, Flammenwerfer und Flugzeuge prägten die Schlacht. Das Gelände wurde über Dutzende Kilometer zu einer Kraterlandschaft.</p><p>Soldaten lebten in Schützengräben, unter ständigem Beschuss und mit kaum ausreichender Versorgung. Verdun wurde zum Sinnbild des modernen Stellungskrieges.</p></article></div></section>

      <section className="timeline" id="zeitleiste"><div><p className="section-kicker">ZEITLEISTE</p><h2>302 Tage zwischen Angriff und Erschöpfung</h2><p className="intro">Die wichtigsten Stationen der Schlacht auf einen Blick.</p></div><div className="timeline-list"><div><b>21.02.1916</b><span>Der deutsche Angriff beginnt mit einem gewaltigen Artilleriebombardement.</span></div><div><b>25.02.1916</b><span>Fort Douaumont fällt. Frankreich organisiert die „Heilige Straße“.</span></div><div><b>07.06.1916</b><span>Fort Vaux kapituliert nach tagelangem Widerstand und Wassermangel.</span></div><div><b>15.12.1916</b><span>Die französische Gegenoffensive gewinnt verlorenes Gelände zurück.</span></div></div></section>

      <section className="glossary-section" id="begriffe"><p className="section-kicker">BEGRIFFE</p><h2>Das Wörterbuch zum Stellungskrieg</h2><p className="intro">Klicke auf einen Begriff, um Erklärung und Beispiel zu öffnen.</p><div className="glossary-grid">{glossary.map(([term, description, label, example], index) => <article className={openTerm === index ? 'glossary-card open' : 'glossary-card'} key={term}><button onClick={() => setOpenTerm(openTerm === index ? null : index)} aria-expanded={openTerm === index}><span><b>{term}</b><small>{description}</small></span><ChevronDown size={17} /></button>{openTerm === index && <div className="glossary-detail"><strong>{label}</strong><p>{example}</p></div>}</article>)}</div></section>

      <section className="guide" id="karte"><div className="guide-copy"><p className="section-kicker">ENTDECKERKARTE</p><h2>Geschichte zum Bauen und Begreifen</h2><p>Deine Karte verbindet eine vereinfachte Topografie mit Lichtpunkten. So wird sichtbar, wo Forts, Frontlinien und Versorgungswege lagen.</p><div className="parts"><div><b>Material</b><span>Karton, Transparentpapier, LED-Lichter, Kupferband</span></div><div><b>Prinzip</b><span>Ein Stromkreis pro Station macht jede Information sichtbar.</span></div></div></div><div className="map-card"><div className="map-lines" /><span className="map-label label-a">VERDUN</span><span className="map-label label-b">FORT VAUX</span><span className="map-label label-c">DOUAUMONT</span><div className="led led-one" /><div className="led led-two" /><div className="led led-three" /></div></section>

      <section className="tutorial" id="anleitung"><p className="section-kicker">BAUANLEITUNG</p><h2>In fünf Schritten zur interaktiven Karte</h2><div className="progress-panel"><div><b>Dein Fortschritt</b><span>{doneSteps.length} von 5 Schritten abgeschlossen</span></div><div className="progress-bar"><i style={{ width: `${progress}%` }} /></div><strong>{progress}%</strong></div><div className="steps">{[['Grundplatte vorbereiten','Zeichne die Maas, Verdun und den Festungsring auf eine stabile Kartonplatte.'],['Gelände und Front anlegen','Arbeite mit Sandpapier, Papier und dunklen Linien für Höhenzüge und Schützengräben.'],['Fort-Stationen markieren','Setze kleine Beschriftungen für Douaumont, Vaux und Souville.'],['LED-Schaltung verbinden','Führe Kupferband von der Batterie zu den LEDs und teste jeden Kontakt.'],['Erklärkarten gestalten','Schreibe kurze Klappentexte und befestige sie neben den Lichtpunkten.']].map(([title, copy], index) => <article className={doneSteps.includes(index) ? 'step done' : 'step'} key={title}><div className="step-number">0{index + 1}</div><div><h3>{title}</h3><p>{copy}</p><button className="step-check" onClick={() => toggleStep(index)} aria-pressed={doneSteps.includes(index)}>{doneSteps.includes(index) ? <Check size={15} /> : <span />} {doneSteps.includes(index) ? 'Erledigt' : 'Als erledigt markieren'}</button></div></article>)}</div></section>

      <section className="flaps" id="klappentexte"><p className="section-kicker">KLAPPENTEXTE</p><h2>Texte für deine Stationen</h2><div className="flap-grid"><article><b>Fort Douaumont</b><p>Das Fort fiel nur wenige Tage nach Beginn der Offensive. Ohne großen Kampf wurde es von einer kleinen deutschen Einheit besetzt – ein Schock für Frankreich.</p></article><article><b>Fort Vaux</b><p>Die Besatzung hielt tagelang aus. Wassermangel, Gas und Erschöpfung machten die Verteidigung zu einem Symbol des Widerstands.</p></article><article><b>Die Voie Sacrée</b><p>Über diese Straße rollten ununterbrochen Lastwagen. Sie hielt die französische Verteidigung mit Soldaten, Munition und Nahrung am Leben.</p></article></div></section>

      <section className="check" id="check"><p className="section-kicker">WISSENS-CHECK</p><h2>Was bleibt hängen?</h2><p>{quiz[question][0]}</p><div className="quiz-options">{(quiz[question][1] as string[]).map((option, index) => <button key={option} disabled={answered} className={answered && index === quiz[question][2] ? 'correct' : ''} onClick={() => answer(index)}>{option}</button>)}</div>{answered && <div className="quiz-result">{question === quiz.length - 1 ? `Du hast ${score} von ${quiz.length} Fragen richtig beantwortet.` : indexText(score, quiz[question][2])}<button className="button button-fill" onClick={question === quiz.length - 1 ? resetQuiz : nextQuestion}>{question === quiz.length - 1 ? <><RotateCcw size={15} /> Nochmal starten</> : <>Nächste Frage <ArrowRight size={15} /></>}</button></div>}</section>
    </main>
    <footer id="quellen"><div><span>Verdun 1916 · Entdeckerkarte &amp; Geschichte</span><small>Eine interaktive Lernseite für den Geschichtsunterricht.</small></div><div><b>Quellen</b><span>LeMO · bpb · Mémorial de Verdun · Deutsches Historisches Museum</span></div></footer>
  </div>
}

function indexText(score: number, answer: number) { return answer === 0 ? 'Richtig. Weiter zur nächsten Frage.' : 'Fast – die markierte Antwort ist die richtige. Weiter geht\'s.' }
