import type { Metadata } from 'next'
import Link from 'next/link'
import { FamilyTreeExplorer } from '@/components/family-tree'

export const metadata: Metadata = { title: 'Familien im Kaiserreich · Wilhelm II. & Bismarck', description: 'Kompakte Stammbäume der Hohenzollern um Kaiser Wilhelm II. und der Familie Otto von Bismarcks.' }

export default function FamilyPage() {
  return <article className="page-content"><header className="page-hero"><p className="section-kicker">PERSONEN &amp; VERWANDTSCHAFT</p><h1>Zwei Familien im Kaiserreich</h1><p className="lead">Entdecke die Familien von Kaiser Wilhelm II. und Reichskanzler Otto von Bismarck – mit nachvollziehbaren Verbindungen von Generation zu Generation.</p><Link className="back-link" href="/">← Zurück zur Übersicht</Link></header><FamilyTreeExplorer /></article>
}
