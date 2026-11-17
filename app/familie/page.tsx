import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Familien im Kaiserreich · Wilhelm II. & Bismarck', description: 'Kompakte Stammbäume der Hohenzollern um Kaiser Wilhelm II. und der Familie Otto von Bismarcks.' }

type Person = { name: string; years: string; detail?: string }
const kaiser: Person[][] = [
  [{name:'Wilhelm I.',years:'1797–1888'},{name:'Augusta von Sachsen-Weimar-Eisenach',years:'1811–1890'},{name:'Albert von Sachsen-Coburg und Gotha',years:'1819–1861'},{name:'Königin Victoria',years:'1819–1901'}],
  [{name:'Friedrich III.',years:'1831–1888'},{name:'Victoria, Princess Royal',years:'1840–1901'}],
  [{name:'Wilhelm II.',years:'1859–1941',detail:'Deutscher Kaiser 1888–1918'},{name:'Auguste Viktoria',years:'1858–1921',detail:'Ehe ab 1881'}],
  [{name:'Kronprinz Wilhelm',years:'1882–1951'},{name:'Eitel Friedrich',years:'1883–1942'},{name:'Adalbert',years:'1884–1948'},{name:'August Wilhelm',years:'1887–1949'},{name:'Oskar',years:'1888–1958'},{name:'Joachim',years:'1890–1920'},{name:'Viktoria Luise',years:'1892–1980'}],
]
const bismarck: Person[][] = [
  [{name:'Karl Wilhelm Ferdinand von Bismarck',years:'1771–1845'},{name:'Wilhelmine Luise Mencken',years:'1789–1839'}],
  [{name:'Otto von Bismarck',years:'1815–1898',detail:'Reichskanzler 1871–1890'},{name:'Johanna von Puttkamer',years:'1824–1894',detail:'Ehe ab 1847'}],
  [{name:'Marie von Bismarck',years:'1848–1926'},{name:'Herbert von Bismarck',years:'1849–1904'},{name:'Wilhelm von Bismarck',years:'1852–1901'}],
]
function Tree({ generations, label }: { generations: Person[][]; label: string }) {
 return <div className="family-tree" role="group" aria-label={label}>{generations.map((generation,index)=><div className="family-generation" key={index}><p className="generation-label">{index===0?'Elterngeneration':index===generations.length-1?'Kinder':'Generation '+(index+1)}</p><div className="family-nodes">{generation.map(person=><article className={`family-person${person.detail?' featured':''}`} key={person.name}><strong>{person.name}</strong><span>{person.years}</span>{person.detail&&<small>{person.detail}</small>}</article>)}</div>{index<generations.length-1&&<div className="family-connector" aria-hidden="true"/>}</div>)}</div>
}
export default function FamilyPage(){return <article className="page-content"><header className="page-hero"><p className="section-kicker">PERSONEN &amp; VERWANDTSCHAFT</p><h1>Zwei Familien im Kaiserreich</h1><p className="lead">Die Stammbäume zeigen die engsten Familienbeziehungen von Kaiser Wilhelm II. und Reichskanzler Otto von Bismarck – bewusst auf die wichtigsten Generationen begrenzt.</p><Link className="back-link" href="/">← Zurück zur Übersicht</Link></header><section className="content-section" id="hohenzollern"><p className="section-kicker">HAUS HOHENZOLLERN</p><h2>Wilhelm II. und seine Familie</h2><p>Wilhelm II. war der Sohn Kaiser Friedrichs III. und Victoria, Princess Royal. Über seine Mutter war er ein Enkel der britischen Königin Victoria. Er regierte von 1888 bis zum Ende der Monarchie im November 1918.</p><Tree generations={kaiser} label="Familienstammbaum von Kaiser Wilhelm II."/><p className="family-note">Wilhelm II. hatte mit Auguste Viktoria sieben Kinder. Nach ihrem Tod heiratete er 1922 Hermine Reuss; aus dieser Ehe gingen keine Kinder hervor. Die Darstellung zeigt keine weiterführenden Nachkommen.</p></section><section className="content-section" id="bismarck"><p className="section-kicker">FAMILIE VON BISMARCK</p><h2>Otto von Bismarck und seine Familie</h2><p>Otto von Bismarck entstammte einer preußischen Adelsfamilie. Mit Johanna von Puttkamer hatte er drei Kinder. Sein Sohn Herbert wurde ebenfalls Politiker und Diplomat.</p><Tree generations={bismarck} label="Familienstammbaum von Otto von Bismarck"/><p className="family-note">Die Übersicht zeigt die engste Familie und erhebt keinen Anspruch auf einen vollständigen genealogischen Stammbaum.</p></section></article>}
