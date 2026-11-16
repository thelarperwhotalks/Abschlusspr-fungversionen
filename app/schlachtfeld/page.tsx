import type { Metadata } from 'next'
import { BattlefieldViewer } from '@/components/battlefield-viewer'

export const metadata: Metadata = { title: 'Verdun-Zeitraffer · 1916', description: 'Beobachte eine stilisierte 2D-Schlachtfeldszene oder erkunde eine historische 3D-Rekonstruktion zur Rückeroberung von Fort Douaumont am 24. Oktober 1916.' }

export default function SchlachtfeldPage() {
  return <BattlefieldViewer />
}
