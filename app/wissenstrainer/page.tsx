import type {Metadata} from 'next'
import Link from 'next/link'
import {KnowledgeTrainer} from '@/components/knowledge-trainer'
export const metadata:Metadata={title:'Wissensspeicher · Verdun 1916',description:'Wiederhole Geschichte, Begriffe und Zeitleiste mit fünf interaktiven Lernmodi.'}
export default function TrainerPage(){return <article className="page-content"><header className="page-hero"><p className="section-kicker">LERNEN & WIEDERHOLEN</p><h1>Wissensspeicher</h1><p className="lead">Beantworte Fragen, übe schwierige Aufgaben und lerne wichtige Begriffe. Dein Fortschritt wird auf diesem Gerät gespeichert.</p><Link className="back-link" href="/">← Zurück zur Übersicht</Link></header><KnowledgeTrainer/></article>}
