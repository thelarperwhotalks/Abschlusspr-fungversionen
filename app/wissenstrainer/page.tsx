import type {Metadata} from 'next'
import Link from 'next/link'
import {KnowledgeTrainer} from '@/components/knowledge-trainer'
export const metadata:Metadata={title:'Lernen · Deutsches Kaiserreich',description:'Wiederhole Geschichte, Begriffe und Zeitleiste des Deutschen Kaiserreichs mit interaktiven Lernmodi.'}
export default function TrainerPage(){return <article className="page-content"><header className="page-hero"><p className="section-kicker">LERNEN & WIEDERHOLEN</p><h1>Wissensspeicher</h1><p className="lead">Wiederhole wichtige Stationen, politische Begriffe und Personen aus der Geschichte des Kaiserreichs. Dein Lernfortschritt bleibt auf diesem Gerät erhalten.</p><Link className="back-link" href="/">← Zurück zur Übersicht</Link></header><KnowledgeTrainer/></article>}
