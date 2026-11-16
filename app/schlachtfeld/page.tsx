import type { Metadata } from 'next'
import { BattlefieldViewer } from '@/components/battlefield-viewer'

export const metadata: Metadata = { title: '3D-Zeitraffer · Verdun 1916', description: 'Erkunde den historischen 3D-Zeitraffer zur Rückeroberung von Fort Douaumont am 24. Oktober 1916.' }

export default function SchlachtfeldPage() {
  return <BattlefieldViewer />
}
