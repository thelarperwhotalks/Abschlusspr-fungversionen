import type { Metadata } from 'next'
import { BattlefieldViewer } from '@/components/battlefield-viewer'

export const metadata: Metadata = { title: '3D-Schlachtfeld · Verdun 1916', description: 'Erkunde eine historische 3D-Rekonstruktion des Schlachtfelds von Verdun am 24. Oktober 1916.' }

export default function SchlachtfeldPage() {
  return <BattlefieldViewer />
}
