'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, type GeographiesProps } from 'react-simple-maps'
import countries from 'world-atlas/countries-50m.json'
import historicalEurope from '@/lib/europe-1914.json'

const modernGermany = '276'
const europeanIds = new Set(['008', '020', '031', '040', '051', '056', '070', '100', '112', '191', '196', '203', '208', '233', '246', '250', '268', '276', '292', '300', '336', '348', '352', '372', '380', '398', '428', '438', '440', '442', '470', '498', '499', '504', '528', '578', '616', '620', '642', '643', '674', '688', '703', '704', '705', '724', '752', '756', '804', '807', '826'])
const historicGermany = {
  ...historicalEurope,
  features: historicalEurope.features.filter((feature) => feature.properties?.name === 'Germany'),
} as GeographiesProps['geography']
const historicColors: Record<string, string> = {
  Germany: '#9a4939',
  'Austria-Hungary': '#b28043',
  Russia: '#8d6269',
  'United Kingdom': '#617d92',
  France: '#637d71',
  Italy: '#7f9467',
  'Ottoman Empire': '#b29a50',
  Spain: '#b77d50',
  Sweden: '#6f8d87',
  Norway: '#7d9992',
  Denmark: '#8598ac',
  Greece: '#7c9a9d',
  Romania: '#b1a064',
  Bulgaria: '#a28b61',
  Serbia: '#8b9a68',
  Albania: '#a1a080',
  Montenegro: '#738763',
}

const views = [
  { id: 'germany', label: 'Deutschland · Vergleich' },
  { id: 'europe-today', label: 'Europa · heute' },
  { id: 'europe-1914', label: 'Europa · 1914' },
] as const

type ViewId = (typeof views)[number]['id']
const viewDetails: Record<ViewId, { title: string; description: string; center: [number, number]; scale: number }> = {
  germany: { title: 'Deutschland im Wandel', description: 'Die Reichsgrenzen von 1914 liegen über den heutigen Staatsgrenzen. So werden Gebietsverluste und Grenzverschiebungen sichtbar.', center: [13, 51.3], scale: 2300 },
  'europe-today': { title: 'Europa heute', description: 'Eine Übersicht heutiger Staatsgrenzen als räumliche Orientierung für den historischen Vergleich.', center: [15, 52], scale: 850 },
  'europe-1914': { title: 'Europa vor dem Ersten Weltkrieg', description: 'Die politischen Grenzen Europas im Jahr 1914 – unmittelbar vor Beginn des Ersten Weltkriegs.', center: [15, 52], scale: 850 },
}

function PlaceMarker({ coordinates, label, kind = 'historic' }: { coordinates: [number, number]; label: string; kind?: 'capital' | 'historic' }) {
  return <Marker coordinates={coordinates}>
    <g className={`atlas-marker atlas-marker-${kind}`}>
      <circle r={kind === 'capital' ? 4 : 3}/>
      <text textAnchor="middle" y={kind === 'capital' ? -9 : 11}>{label}</text>
    </g>
  </Marker>
}

function ModernBoundaries({ view }: { view: ViewId }) {
  return <Geographies geography={countries as unknown as string}>
    {({ geographies }) => geographies.map((geography) => {
      const id = String(geography.id).padStart(3, '0')
      const european = europeanIds.has(id)
      const isGermany = id === modernGermany
      return <Geography
        key={`${view}-${geography.rsmKey}`}
        geography={geography}
        className={`atlas-country${european ? ' is-europe' : ' is-context'}${isGermany ? ' is-modern-germany' : ''}`}
        fill={isGermany ? 'var(--atlas-germany)' : european ? 'var(--atlas-europe)' : 'var(--atlas-context)'}
        stroke="var(--atlas-border)"
        strokeWidth={isGermany ? 1.2 : 0.55}
      />
    })}
  </Geographies>
}

function GermanyComparison() {
  return <>
    <ModernBoundaries view="germany"/>
    <Geographies geography={historicGermany}>
      {({ geographies }) => geographies.map((geography) => <Geography key={`empire-${geography.rsmKey}`} geography={geography} className="atlas-historic-germany" fill="var(--atlas-empire)" fillOpacity={0.62} stroke="var(--atlas-empire-edge)" strokeWidth={1.5}/>)}</Geographies>
    <Geographies geography={countries as unknown as string}>
      {({ geographies }) => geographies.filter((geography) => String(geography.id).padStart(3, '0') === modernGermany).map((geography) => <Geography key={`today-germany-${geography.rsmKey}`} geography={geography} className="atlas-modern-germany" fill="var(--atlas-germany)" fillOpacity={0.9} stroke="var(--atlas-current-edge)" strokeWidth={1.3}/>)}</Geographies>
    <PlaceMarker coordinates={[13.405, 52.52]} label="Berlin" kind="capital"/>
    <PlaceMarker coordinates={[20.51, 54.71]} label="Königsberg"/>
    <PlaceMarker coordinates={[7.75, 48.58]} label="Straßburg"/>
    <PlaceMarker coordinates={[18.65, 54.35]} label="Danzig"/>
  </>
}

function ModernEurope() {
  return <>
    <ModernBoundaries view="europe-today"/>
    <PlaceMarker coordinates={[-0.1276, 51.5072]} label="London"/>
    <PlaceMarker coordinates={[2.3522, 48.8566]} label="Paris"/>
    <PlaceMarker coordinates={[13.405, 52.52]} label="Berlin" kind="capital"/>
    <PlaceMarker coordinates={[16.3738, 48.2082]} label="Wien"/>
    <PlaceMarker coordinates={[30.3351, 59.9343]} label="Sankt Petersburg"/>
  </>
}

function HistoricEurope() {
  return <>
    <Geographies geography={historicalEurope as unknown as GeographiesProps['geography']}>
      {({ geographies }) => geographies.map((geography) => {
        const name = String(geography.properties?.name ?? '')
        return <Geography
          key={`1914-${geography.rsmKey}`}
          geography={geography}
          className={`atlas-historic-territory${name === 'Germany' ? ' is-german-empire' : ''}`}
          fill={historicColors[name] ?? '#aa9873'}
          stroke="var(--atlas-historic-border)"
          strokeWidth={0.65}
        />
      })}
    </Geographies>
    <PlaceMarker coordinates={[-0.1276, 51.5072]} label="London"/>
    <PlaceMarker coordinates={[2.3522, 48.8566]} label="Paris"/>
    <PlaceMarker coordinates={[13.405, 52.52]} label="Berlin" kind="capital"/>
    <PlaceMarker coordinates={[16.3738, 48.2082]} label="Wien"/>
    <PlaceMarker coordinates={[30.3351, 59.9343]} label="Sankt Petersburg"/>
    <PlaceMarker coordinates={[28.9784, 41.0082]} label="Konstantinopel"/>
  </>
}

export function EmpireMap() {
  const [view, setView] = useState<ViewId>('germany')
  const [zoom, setZoom] = useState(1)
  const reduceMotion = useReducedMotion()
  const detail = viewDetails[view]
  const center = detail.center

  return <section className="historical-atlas" aria-label="Interaktive historische Vergleichskarten">
    <div className="atlas-toolbar">
      <div className="atlas-view-switch" role="group" aria-label="Kartenansicht auswählen">
        {views.map((item) => <button key={item.id} type="button" aria-pressed={view === item.id} className={view === item.id ? 'is-selected' : ''} onClick={() => { setView(item.id); setZoom(1) }}>{item.label}</button>)}
      </div>
      <div className="atlas-zoom-controls" role="group" aria-label="Kartenzoom">
        <button type="button" onClick={() => setZoom((value) => Math.min(3, value + 0.25))} aria-label="Karte vergrößern">+</button>
        <button type="button" onClick={() => setZoom((value) => Math.max(0.8, value - 0.25))} aria-label="Karte verkleinern">−</button>
        <button type="button" onClick={() => setZoom(1)} aria-label="Kartenzoom zurücksetzen">Zurücksetzen</button>
      </div>
    </div>
    <div className="atlas-heading" aria-live="polite">
      <div><span className="atlas-date">{view === 'germany' ? '1871—1918 / HEUTE' : view === 'europe-1914' ? 'STAND: 1914' : 'GEGENWART'}</span><h3>{detail.title}</h3></div>
      <p>{detail.description}</p>
    </div>
    <AnimatePresence mode="wait" initial={false}>
      <motion.div key={view} className={`atlas-map atlas-map-${view}`} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}>
        <ComposableMap projection="geoMercator" projectionConfig={{ center, scale: detail.scale }} width={960} height={570} aria-label={detail.title}>
          <ZoomableGroup center={center} zoom={zoom} minZoom={0.8} maxZoom={3}>
            {view === 'germany' ? <GermanyComparison/> : view === 'europe-today' ? <ModernEurope/> : <HistoricEurope/>}
          </ZoomableGroup>
        </ComposableMap>
      </motion.div>
    </AnimatePresence>
    <div className="atlas-footer">
      <div className="atlas-legend" aria-label="Kartenlegende">
        {view === 'germany' ? <><span><i className="legend-empire"/> Deutsches Kaiserreich · 1914</span><span><i className="legend-current"/> Deutschland heute</span><span><i className="legend-context"/> Nachbarstaaten</span></> : view === 'europe-1914' ? <><span><i className="legend-empire"/> Deutsches Kaiserreich</span><span><i className="legend-1914"/> Weitere Staaten und Reiche · 1914</span></> : <><span><i className="legend-current"/> Heutige Staatsgrenzen</span><span><i className="legend-context"/> Länder außerhalb Europas</span></>}
      </div>
      <p>Ziehen zum Verschieben · Mausrad oder + / − zum Zoomen</p>
    </div>
  </section>
}
