import type {Metadata} from 'next'
import Link from 'next/link'
import {KnowledgeCheck} from '@/components/knowledge-check'
export const metadata:Metadata={title:'Wissens-Check · Verdun 1916',description:'Teste dein Wissen mit zwölf Fragen zu Geschichte, Begriffen, Alltag und Forts bei Verdun.'}
export default function QuizPage(){return <article className="page-content"><header className="page-hero"><p className="section-kicker">WISSEN TESTEN</p><h1>Der Wissens-Check</h1><p className="lead">Zwölf Fragen: acht Grundlagen und vier Zusatzfragen zu Voie Sacrée, Fort Vaux, Fleury und dem Ossuaire.</p><Link className="back-link" href="/">← Zurück zur Übersicht</Link></header><section className="content-section" id="fragen"><KnowledgeCheck/><p className="intro">Für gezieltes Üben gibt es zusätzlich den <Link className="text-link" href="/wissenstrainer">Wissenstrainer mit fünf Lernmodi</Link>.</p></section></article>}
