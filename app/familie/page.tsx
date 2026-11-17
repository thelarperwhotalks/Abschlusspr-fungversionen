import Link from 'next/link'
import { ChevronDown, Crown, Leaf, UsersRound } from 'lucide-react'

export const metadata = { title: 'Familien im Kaiserreich · Wilhelm II. & Bismarck', description: 'Interaktive Stammbäume mit Eltern, Großeltern und Kindern von Kaiser Wilhelm II. und Otto von Bismarck.' }

type Person = { name: string; born: number; died?: number; role?: string; note?: string }
const kaiser: { label: string; people: Person[] }[] = [
  { label: 'Großeltern', people: [
    {name:'Wilhelm I.',born:1797,died:1888,role:'Großvater väterlicherseits',note:'König von Preußen und erster Deutscher Kaiser.'},
    {name:'Augusta von Sachsen-Weimar-Eisenach',born:1811,died:1890,role:'Großmutter väterlicherseits'},
    {name:'Albert von Sachsen-Coburg und Gotha',born:1819,died:1861,role:'Großvater mütterlicherseits'},
    {name:'Königin Victoria',born:1819,died:1901,role:'Großmutter mütterlicherseits',note:'Königin des Vereinigten Königreichs.'},
  ]},
  { label: 'Eltern', people: [
    {name:'Friedrich III.',born:1831,died:1888,role:'Vater',note:'Deutscher Kaiser für 99 Tage im Jahr 1888.'},
    {name:'Victoria, Princess Royal',born:1840,died:1901,role:'Mutter',note:'Älteste Tochter von Königin Victoria.'},
  ]},
  { label: 'Kaiser & Ehefrau', people: [
    {name:'Wilhelm II.',born:1859,died:1941,role:'Kaiser des Deutschen Reichs',note:'Regierte von 1888 bis zur Abdankung 1918.'},
    {name:'Auguste Viktoria',born:1858,died:1921,role:'Ehefrau',note:'Heirat mit Wilhelm II. im Jahr 1881.'},
  ]},
  { label: 'Kinder', people: [
    {name:'Kronprinz Wilhelm',born:1882,died:1951,role:'Ältester Sohn'},
    {name:'Eitel Friedrich',born:1883,died:1942,role:'Sohn'},
    {name:'Adalbert',born:1884,died:1948,role:'Sohn'},
    {name:'August Wilhelm',born:1887,died:1949,role:'Sohn'},
    {name:'Oskar',born:1888,died:1958,role:'Sohn'},
    {name:'Joachim',born:1890,died:1920,role:'Sohn'},
    {name:'Viktoria Luise',born:1892,died:1980,role:'Tochter'},
  ]},
]
const bismarck: { label: string; people: Person[] }[] = [
  { label: 'Großeltern', people: [
    {name:'August Friedrich von Bismarck',born:1695,died:1742,role:'Großvater väterlicherseits'},
    {name:'Stephanie Charlotte von Dewitz',born:1705,died:1776,role:'Großmutter väterlicherseits'},
    {name:'August Friedrich Mencken',born:1742,died:1801,role:'Großvater mütterlicherseits'},
    {name:'Dorothea von Zanthier',born:1743,died:1824,role:'Großmutter mütterlicherseits'},
  ]},
  { label: 'Eltern', people: [
    {name:'Karl Wilhelm Ferdinand von Bismarck',born:1771,died:1845,role:'Vater',note:'Preußischer Gutsbesitzer und Offizier.'},
    {name:'Wilhelmine Luise Mencken',born:1789,died:1839,role:'Mutter'},
  ]},
  { label: 'Reichskanzler & Ehefrau', people: [
    {name:'Otto von Bismarck',born:1815,died:1898,role:'Reichskanzler',note:'Erster Reichskanzler des Deutschen Reichs von 1871 bis 1890.'},
    {name:'Johanna von Puttkamer',born:1824,died:1894,role:'Ehefrau',note:'Heirat mit Otto von Bismarck im Jahr 1847.'},
  ]},
  { label: 'Kinder', people: [
    {name:'Marie von Bismarck',born:1848,died:1926,role:'Tochter'},
    {name:'Herbert von Bismarck',born:1849,died:1904,role:'Sohn',note:'Politiker und Diplomat; später Staatssekretär des Auswärtigen.'},
    {name:'Wilhelm von Bismarck',born:1852,died:1901,role:'Sohn',note:'Verwaltete unter anderem den Familienbesitz.'},
  ]},
]

function age(person: Person) { return person.died ? person.died - person.born : new Date().getFullYear() - person.born }
function FamilyTree({ generations, label }: { generations: typeof kaiser; label: string }) {
  return <div className="family-tree" role="group" aria-label={label}>{generations.map((generation,index)=><section className="family-generation" key={generation.label} aria-labelledby={`${label}-${index}`}>
    <div className="generation-heading"><span>{String(index + 1).padStart(2,'0')}</span><h3 id={`${label}-${index}`}>{generation.label}</h3><i /></div>
    <div className="family-nodes">{generation.people.map((person)=><details className={`family-person${person.role?.includes('Kaiser')||person.role==='Reichskanzler'?' featured':''}`} key={person.name}>
      <summary><span className="person-symbol"><UsersRound size={16}/></span><span className="person-copy"><strong>{person.name}</strong><span className="person-dates">{person.born}–{person.died ?? 'heute'}</span><small>{person.role}</small></span><ChevronDown className="person-chevron" size={16}/></summary>
      <div className="person-details"><span><b>Name</b>{person.name}</span><span><b>Geburtsjahr</b>{person.born}</span><span><b>Alter</b>{person.died?`${age(person)} Jahre (bei Tod)`:`${age(person)} Jahre`}</span>{person.note&&<span className="person-note"><b>Einordnung</b>{person.note}</span>}</div>
    </details>)}</div>
  </section>)}</div>
}
function FamilySection({ title, subtitle, intro, generations, label, className }: {title:string;subtitle:string;intro:string;generations:typeof kaiser;label:string;className:string}) {
 return <section className={`content-section family-section ${className}`}><div className="family-section-heading"><span className="family-seal"><Crown size={19}/></span><div><p className="section-kicker">{subtitle}</p><h2>{title}</h2></div></div><p className="family-intro">{intro}</p><FamilyTree generations={generations} label={label}/><p className="family-note"><Leaf size={15}/> Wähle ein Familienmitglied aus, um Geburtsjahr, Lebensalter und historische Einordnung zu sehen.</p></section>
}
export default function FamilyPage(){return <article className="page-content family-page"><header className="page-hero family-hero"><p className="section-kicker">PERSONEN &amp; VERWANDTSCHAFT</p><h1>Familien, die Geschichte prägten</h1><p className="lead">Zwei Lebenswelten, vier Generationen: Entdecke die Familien von Kaiser Wilhelm II. und Reichskanzler Otto von Bismarck – mit den wichtigsten Verbindungen und kurzen biografischen Einblicken.</p><div className="family-overview"><span><b>2</b> Familien</span><span><b>4</b> Generationen</span><span><b>10</b> Großeltern</span><span><b>10</b> Kinder</span></div><Link className="back-link" href="/">← Zurück zur Übersicht</Link></header>
 <FamilySection className="hohenzollern-section" subtitle="HAUS HOHENZOLLERN · PREUSSEN" title="Wilhelm II. und die Hohenzollern" intro="Wilhelm II. stand an der Spitze einer europäischen Herrscherfamilie. Über seine Mutter Victoria war er eng mit dem britischen Königshaus verbunden; sein Vater Friedrich III. war nur 99 Tage Kaiser. Sieben Kinder aus der Ehe mit Auguste Viktoria bilden die jüngste dargestellte Generation." generations={kaiser} label="Familienstammbaum von Kaiser Wilhelm II."/>
 <FamilySection className="bismarck-section" subtitle="FAMILIE VON BISMARCK · ADEL & POLITIK" title="Otto von Bismarck und seine Familie" intro="Bismarcks Herkunft aus einer preußischen Gutsbesitzerfamilie prägte sein Selbstverständnis. Mit Johanna von Puttkamer hatte er drei Kinder. Herbert trat in die Politik ein, während Marie und Wilhelm eigene Wege innerhalb des Familienverbandes gingen." generations={bismarck} label="Familienstammbaum von Otto von Bismarck"/>
 </article>}
