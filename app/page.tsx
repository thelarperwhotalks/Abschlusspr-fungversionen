import type { Metadata } from 'next'
import { EmpireHome } from '@/components/empire-home'

export const metadata: Metadata = { title: 'Deutsches Kaiserreich · Geschichte 1871–1918', description: 'Entdecke die Geschichte des Deutschen Kaiserreichs: Gründung, Verfassung, Zeitleiste, Territorium und Familien.' }

export default function HomePage() { return <EmpireHome /> }
