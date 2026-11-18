'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, type GeographiesProps } from 'react-simple-maps'
import countries from 'world-atlas/countries-50m.json'
import historicalEurope from '@/lib/europe-1914.json'

const modernGermany = '276'
const europeanIds = new Set(['008', '020', '031', '040', '051', '056', '070', '100', '112', '191', '196', '203', '208', '233', '246', '250', '268', '276', '292', '300', '336', '348', '352', '372', '380', '398', '428', '438', '440', '442', '470', '498', '499', '504', '528', '578', '616', '620', '642', '643', '674', '688', '703', '704', '705', '724', '752', '756', '792', '804', '807', '826'])
const historicGermany = {
  ...historicalEurope,
  features: historicalEurope.features.filter((feature) => feature.properties?.name === 'Germany'),
} as GeographiesProps['geography']
const historicColors: Record<string, string> = {
  Germany: '#51565b',
  'Austria-Hungary': '#ad4d50',
  Russia: '#4d8263',
  'United Kingdom': '#87577c',
  France: '#557ba5',
  Italy: '#83a36c',
  'Ottoman Empire': '#a67a43',
  Spain: '#c17f49',
  Sweden: '#5d9990',
  Norway: '#86b2a3',
  Denmark: '#627da1',
  Greece: '#6f9ca9',
  Romania: '#b5a44d',
  Bulgaria: '#8a7860',
  Serbia: '#a35f45',
  Albania: '#8a9e71',
  Montenegro: '#7c6a9c',
  Portugal: '#b45e67',
  Switzerland: '#d08475',
  Liechtenstein: '#9b8b63',
  Netherlands: '#5b9b9a',
  Luxembourg: '#927baf',
  Belgium: '#c08c53',
}
const modernColors: Record<string, string> = {
  Germany: '#666c72', Austria: '#b96970', Russia: '#57906b', France: '#6088b5',
  'United Kingdom': '#8c6490', Italy: '#8daa72', Spain: '#c58d59', Portugal: '#a95f6b',
  Poland: '#d293a0', Czechia: '#b47c89', Slovakia: '#8e7388', Hungary: '#b7a15c',
  Ukraine: '#9caa57', Belarus: '#78955a', Estonia: '#6b9eaa', Latvia: '#6b8ca9',
  Lithuania: '#9b8d61', Finland: '#78a99b', Sweden: '#4f9189', Norway: '#81aa9c',
  Denmark: '#7288aa', Netherlands: '#5d9d9a', Belgium: '#c18c53', Luxembourg: '#927baf',
  Switzerland: '#c77a6b', Slovenia: '#80a976', Croatia: '#b78654', Bosnia: '#7d8d9d',
  'Bosnia and Herzegovina': '#7d8d9d', Serbia: '#ad694e', Montenegro: '#8f7aa3',
  Albania: '#879d6e', 'North Macedonia': '#b89b57', Greece: '#719eac', Romania: '#b9a545',
  Bulgaria: '#8d8065', Moldova: '#a28d55', 'Republic of Moldova': '#a28d55', Ireland: '#71a372',
  Iceland: '#7998b2', Turkey: '#be755d', Cyprus: '#c09a64', 'San Marino': '#819e80',
  Andorra: '#9e846e', Monaco: '#ab7580', 'Vatican City': '#a8905a', 'Holy See': '#a8905a',
  Kosovo: '#8579a6', Georgia: '#a96d60', Armenia: '#bf8a62', Azerbaijan: '#658f80',
}
const successorHints: Record<string, string> = {
  Germany: 'Heute: Deutschland, Polen, Frankreich, Dänemark, Russland und Litauen.',
  'Austria-Hungary': 'Heute unter anderem: Österreich, Ungarn, Tschechien, Slowakei, Slowenien, Kroatien, Bosnien und Herzegowina sowie Teile Polens, Rumäniens und Italiens.',
  Russia: 'Heute unter anderem: Russland, Finnland, Estland, Lettland, Litauen, Belarus, Ukraine und Polen.',
  'Ottoman Empire': 'Heute vor allem: Türkei sowie Teile des Balkans.',
}

const views = [
  { id: 'germany', label: 'Deutschland · Vergleich' },
  { id: 'europe-today', label: 'Europa heute (2026)' },
  { id: 'europe-1914', label: 'Europa 1914' },
] as const

type ViewId = (typeof views)[number]['id']
const viewDetails: Record<ViewId, { title: string; description: string; center: [number, number]; scale: number }> = {
  germany: { title: 'Deutschland im Wandel', description: 'Die Reichsgrenzen von 1914 liegen über den heutigen Staatsgrenzen. So werden Gebietsverluste und Grenzverschiebungen sichtbar.', center: [13, 51.3], scale: 2300 },
  'europe-today': { title: 'Europa heute · 2026', description: 'Heutige Staatsgrenzen in Europa. Jedes Land ist farblich einzeln gekennzeichnet; per Hover oder Fokus erscheinen Name und Hinweis.', center: [15, 52], scale: 850 },
  'europe-1914': { title: 'Europa vor dem Ersten Weltkrieg', description: 'Die politischen Grenzen von 1914: Österreich-Ungarn, das Russische Kaiserreich, das Deutsche Kaiserreich und das Osmanische Reich erscheinen als damalige Staaten – ohne heutige Landesgrenzen.', center: [15, 52], scale: 850 },
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
      const countryName = String(geography.properties?.name ?? 'Unbekanntes Gebiet')
      const european = europeanIds.has(id)
      const isGermany = id === modernGermany
      const fill = isGermany ? 'var(--atlas-germany)' : european ? modernColors[countryName] ?? '#9a8e7c' : 'var(--atlas-context)'
      return <Geography
        key={`${view}-${geography.rsmKey}`}
        geography={geography}
        className={`atlas-country${european ? ' is-europe' : ' is-context'}${isGermany ? ' is-modern-germany' : ''}`}
        fill={fill}
        stroke={european ? fill : 'var(--atlas-border)'}
        strokeWidth={european ? 1.1 : 0.55}
        aria-label={european ? `${countryName} · heutige Grenzen (Stand 2026)` : countryName}
        tabIndex={european ? 0 : -1}
        {...{ title: european ? `${countryName} · heutige Grenzen (Stand 2026)` : countryName }}
      />
    })}
  </Geographies>
}

function GermanyComparison() {
  return <>
    <ModernBoundaries view="germany"/>
    <Geographies geography={historicGermany}>
      {({ geographies }) => geographies.map((geography) => <Geography key={`empire-${geography.rsmKey}`} geography={geography} className="atlas-historic-germany" fill="var(--atlas-empire)" fillOpacity={0.62} stroke="var(--atlas-empire-edge)" strokeWidth={1.5} aria-label="Deutsches Kaiserreich 1914" tabIndex={0} {...{ title: 'Deutsches Kaiserreich 1914' }}/>)}</Geographies>
    <Geographies geography={countries as unknown as string}>
      {({ geographies }) => geographies.filter((geography) => String(geography.id).padStart(3, '0') === modernGermany).map((geography) => <Geography key={`today-germany-${geography.rsmKey}`} geography={geography} className="atlas-modern-germany" fill="var(--atlas-germany)" fillOpacity={0.9} stroke="var(--atlas-current-edge)" strokeWidth={1.3} aria-label="Deutschland heute (Stand 2026)" tabIndex={0} {...{ title: 'Deutschland heute (Stand 2026)' }}/>)}</Geographies>
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
        const successor = successorHints[name]
        return <Geography
          key={`1914-${geography.rsmKey}`}
          geography={geography}
          className={`atlas-historic-territory${name === 'Germany' ? ' is-german-empire' : ''}`}
          fill={historicColors[name] ?? '#aa9873'}
          stroke={historicColors[name] ?? 'var(--atlas-historic-border)'}
          strokeWidth={0.9}
          aria-label={`${name} · 1914${successor ? `. ${successor}` : ''}`}
          tabIndex={0}
          {...{ title: `${name} · 1914${successor ? `. ${successor}` : ''}` }}
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

function MapLegend({ view }: { view: ViewId }) {
  if (view === 'germany') return <div className="atlas-legend" aria-label="Kartenlegende">
    <span><i className="legend-empire"/>Deutsches Kaiserreich · 1914</span><span><i className="legend-current"/>Deutschland heute</span><span><i className="legend-context"/>Nachbarstaaten</span>
  </div>

  const entries = view === 'europe-1914'
    ? historicalEurope.features.map((feature) => ({ name: String(feature.properties?.name ?? ''), color: historicColors[String(feature.properties?.name)] ?? '#aa9873' }))
    : (countries as unknown as { objects: { countries: { geometries: Array<{ id: string; properties: { name: string } }> } } }).objects.countries.geometries
      .filter((country) => europeanIds.has(String(country.id).padStart(3, '0')))
      .map((country) => ({ name: country.properties.name, color: country.id === modernGermany ? 'var(--atlas-germany)' : modernColors[country.properties.name] ?? '#9a8e7c' }))

  return <div className="atlas-legend atlas-legend-countries" aria-label={`Legende für ${view === 'europe-1914' ? 'Europa 1914' : 'Europa heute'}`}>
    {entries.map(({ name, color }) => <span key={name}><i style={{ backgroundColor: color }}/>{name}</span>)}
  </div>
}

export function EmpireMap() {
  const [view, setView] = useState<ViewId>('germany')
  const [zoom, setZoom] = useState(1)
  const reduceMotion = useReducedMotion()
  const detail = viewDetails[view]
  const center = detail.center

  return <section className="historical-atlas" aria-label="Interaktive historische Vergleichskarten">
    <div className="atlas-toolbar">
      <div className="atlas-view-switch" role="tablist" aria-label="Kartenansicht auswählen">
        {views.map((item) => <button key={item.id} type="button" role="tab" id={`atlas-tab-${item.id}`} aria-controls="atlas-panel" aria-selected={view === item.id} tabIndex={view === item.id ? 0 : -1} className={view === item.id ? 'is-selected' : ''} onKeyDown={(event) => {
          const currentIndex = views.findIndex((tab) => tab.id === item.id)
          const nextIndex = event.key === 'ArrowRight' ? (currentIndex + 1) % views.length : event.key === 'ArrowLeft' ? (currentIndex - 1 + views.length) % views.length : event.key === 'Home' ? 0 : event.key === 'End' ? views.length - 1 : currentIndex
          if (nextIndex !== currentIndex) {
            event.preventDefault()
            const nextTab = views[nextIndex]
            setView(nextTab.id)
            setZoom(1)
            document.getElementById(`atlas-tab-${nextTab.id}`)?.focus()
          }
        }} onClick={() => { setView(item.id); setZoom(1) }}>{item.label}</button>)}
      </div>
      <div className="atlas-zoom-controls" role="group" aria-label="Kartenzoom">
        <button type="button" onClick={() => setZoom((value) => Math.min(3, value + 0.25))} aria-label="Karte vergrößern">+</button>
        <button type="button" onClick={() => setZoom((value) => Math.max(0.8, value - 0.25))} aria-label="Karte verkleinern">−</button>
        <button type="button" onClick={() => setZoom(1)} aria-label="Kartenzoom zurücksetzen">Zurücksetzen</button>
      </div>
    </div>
    <div className="atlas-heading" aria-live="polite">
      <div><span className="atlas-date">{view === 'germany' ? '1871—1918 / HEUTE' : view === 'europe-1914' ? 'STAND: 1914' : 'STAND: 2026'}</span><h3>{detail.title}</h3></div>
      <p>{detail.description}</p>
    </div>
    <div id="atlas-panel" role="tabpanel" aria-labelledby={`atlas-tab-${view}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={view} className={`atlas-map atlas-map-${view}`} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}>
          <ComposableMap projection="geoMercator" projectionConfig={{ center, scale: detail.scale }} width={960} height={570} aria-label={detail.title}>
            <ZoomableGroup center={center} zoom={zoom} minZoom={0.8} maxZoom={3}>
              {view === 'germany' ? <GermanyComparison/> : view === 'europe-today' ? <ModernEurope/> : <HistoricEurope/>}
            </ZoomableGroup>
          </ComposableMap>
        </motion.div>
      </AnimatePresence>
    </div>
    <div className="atlas-footer">
      <MapLegend view={view}/>
      <p>Ziehen zum Verschieben · Mausrad oder + / − zum Zoomen</p>
    </div>
  </section>
}
