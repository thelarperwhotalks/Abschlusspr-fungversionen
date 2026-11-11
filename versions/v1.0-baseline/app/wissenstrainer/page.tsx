import type {Metadata} from 'next'
import Link from 'next/link'
import {KnowledgeTrainer} from '@/components/knowledge-trainer'
export const metadata:Metadata={title:'Wissenstrainer · Verdun 1916',description:'Übe Geschichte, Begriffe und Zeitleiste in fünf interaktiven Trainingsmodi.'}
export default function TrainerPage(){return <article className="page-content"><header className="page-hero"><p className="section-kicker">ÜBEN & WIEDERHOLEN</p><h1>Der Wissenstrainer</h1><p className="lead">Multiple Choice, Fehlertraining, Lernkarten, Zeitleiste und Begriffs-Duell – dein Fortschritt bleibt lokal auf diesem Gerät.</p><Link className="back-link" href="/">← Zurück zur Übersicht</Link></header><KnowledgeTrainer/></article>}
