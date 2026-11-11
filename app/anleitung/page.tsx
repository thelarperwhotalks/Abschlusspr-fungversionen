import type {Metadata} from 'next'
import Link from 'next/link'
import {BuildGuide} from '@/components/build-guide'
export const metadata:Metadata={title:'9-Schritte-Bauanleitung · Verdun 1916',description:'Materialliste, Bauzeiten und Sicherheitshinweise für deine Verdun-Entdeckerkarte aus Karton und LED.'}
export default function BuildPage(){return <article className="page-content"><header className="page-hero"><p className="section-kicker">KARTON + LED · 4–6 STUNDEN</p><h1>Die Bauanleitung</h1><p className="lead">Baue eine interaktive Karte mit Lichtpunkten und Klappstationen. Arbeite sorgfältig, teste den Stromkreis und hole bei scharfen Werkzeugen Unterstützung.</p><Link className="back-link" href="/">← Zurück zur Übersicht</Link></header><BuildGuide/></article>}
