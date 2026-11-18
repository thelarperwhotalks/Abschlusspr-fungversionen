'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup, type GeographiesProps } from 'react-simple-maps'
import countries from 'world-atlas/countries-50m.json'
import historicalEurope from '@/lib/europe-1914.json'
import historicalWorld from '@/lib/world-1914.json'

const modernGermany = '276'
const europeanIds = new Set(['008', '020', '031', '040', '051', '056', '070', '100', '112', '191', '196', '203', '208', '233', '246', '250', '268', '276', '292', '300', '336', '348', '352', '372', '380', '398', '428', '438', '440', '442', '470', '498', '499', '504', '528', '578', '616', '620', '642', '643', '674', '688', '703', '704', '705', '724', '752', '756', '792', '804', '807', '826'])
const historicGermany = {
  ...historicalEurope,
  features: historicalEurope.features.filter((feature) => feature.properties?.name === 'Germany'),
} as GeographiesProps['geography']
const historicColors: Record<string, string> = {
  Germany: '#51565b',
  'German Empire': '#51565b',
  'Austro-Hungarian Empire': '#ad4d50',
  'United Kingdom of Great Britain and Ireland': '#87577c',
  'United Kingdom': '#87577c',
  'Austria-Hungary': '#ad4d50',
  Russia: '#4d8263',
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
const historicTerritoryOwners: Record<string, string> = {
  'Anglo-Egyptian Sudan': 'United Kingdom of Great Britain and Ireland', Botswana: 'United Kingdom of Great Britain and Ireland',
  'British East Africa': 'United Kingdom of Great Britain and Ireland', 'British Protectorate': 'United Kingdom of Great Britain and Ireland',
  'British Somaliland': 'United Kingdom of Great Britain and Ireland', 'British Raj': 'United Kingdom of Great Britain and Ireland',
  'Gold Coast': 'United Kingdom of Great Britain and Ireland', 'Gambia, The': 'United Kingdom of Great Britain and Ireland',
  Ceylon: 'United Kingdom of Great Britain and Ireland', Malaya: 'United Kingdom of Great Britain and Ireland',
  'Sierra Leone': 'United Kingdom of Great Britain and Ireland', Uganda: 'United Kingdom of Great Britain and Ireland',
  Nigeria: 'United Kingdom of Great Britain and Ireland', Rhodesia: 'United Kingdom of Great Britain and Ireland',
  Malta: 'United Kingdom of Great Britain and Ireland',
  'German E. Africa (Tanganyika)': 'German Empire', 'German South-West Africa': 'German Empire', Kamerun: 'German Empire', Togoland: 'German Empire',
  'Belgian Congo': 'Belgium', Djibouti: 'France', 'French Equatorial Africa': 'France', 'French Indochina': 'France',
  'French West Africa': 'France', 'French Guiana': 'France', 'Madagascar (France)': 'France', Guadeloupe: 'France', Martinique: 'France',
  Morocco: 'France', Tunisia: 'France',
  'Netherlands Antilles': 'Netherlands', 'Netherlands Indies': 'Netherlands', Suriname: 'Netherlands',
  Angola: 'Portugal', 'Portuguese Guinea': 'Portugal', Mozambique: 'Portugal',
  'Spanish Morocco': 'Spain', 'Spanish Sahara': 'Spain', 'Rio De Oro': 'Spain',
  Eritrea: 'Italy', 'Italian Somaliland': 'Italy', Libya: 'Italy',
  'Grand Duchy of Finland': 'Russia', 'Russian Empire': 'Russia', 'Sakhalin (RU)': 'Russia',
  Canada: 'United Kingdom of Great Britain and Ireland', Australia: 'United Kingdom of Great Britain and Ireland',
  'New Zealand': 'United Kingdom of Great Britain and Ireland', 'South Africa': 'United Kingdom of Great Britain and Ireland',
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
const currentOverseasOwners: Record<string, string> = {
  '060': 'United Kingdom', '086': 'United Kingdom', '092': 'United Kingdom', '136': 'United Kingdom',
  '238': 'United Kingdom', '292': 'United Kingdom', '500': 'United Kingdom', '612': 'United Kingdom',
  '654': 'United Kingdom', '660': 'United Kingdom', '796': 'United Kingdom', '831': 'United Kingdom',
  '832': 'United Kingdom', '833': 'United Kingdom',
  '234': 'Denmark', '304': 'Denmark',
  '531': 'Netherlands', '533': 'Netherlands', '534': 'Netherlands',
  '258': 'France', '260': 'France', '540': 'France', '652': 'France', '663': 'France', '666': 'France', '876': 'France',
}
const currentOverseasColors: Record<string, string> = {
  'United Kingdom': modernColors['United Kingdom'], Denmark: modernColors.Denmark,
  Netherlands: modernColors.Netherlands, France: modernColors.France,
}
const views = [
  { id: 'germany', label: 'Deutschland · Vergleich' },
  { id: 'world-today', label: 'Welt heute (2026)' },
  { id: 'world-1914', label: 'Welt 1914' },
] as const

type ViewId = (typeof views)[number]['id']
const viewDetails: Record<ViewId, { title: string; description: string; center: [number, number]; scale: number }> = {
  germany: { title: 'Deutschland im Wandel', description: 'Die Reichsgrenzen von 1914 liegen über den heutigen Staatsgrenzen. So werden Gebietsverluste und Grenzverschiebungen sichtbar.', center: [13, 51.3], scale: 2300 },
  'world-today': { title: 'Die Welt heute · 2026', description: 'Eine Weltkarte mit europäischen Staaten und ausgewählten heutigen Überseegebieten. Deren heutige Status sind nicht mit den Kolonien von 1914 gleichzusetzen; andere Länder dienen als geografischer Kontext.', center: [0, 15], scale: 155 },
  'world-1914': { title: 'Die Welt im Jahr 1914', description: 'Die globale politische Karte vor dem Ersten Weltkrieg – einschließlich der Kolonialgebiete und Einflussgebiete europäischer Mächte.', center: [0, 15], scale: 155 },
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
      const territoryOwner = currentOverseasOwners[id]
      const fill = isGermany ? 'var(--atlas-germany)' : european ? modernColors[countryName] ?? '#9a8e7c' : territoryOwner ? currentOverseasColors[territoryOwner] : 'var(--atlas-context)'
      const label = territoryOwner ? `${countryName} · heutiges Überseegebiet von ${territoryOwner}` : european ? `${countryName} · heutige Grenzen (Stand 2026)` : countryName
      return <Geography
        key={`${view}-${geography.rsmKey}`}
        geography={geography}
        className={`atlas-country${european ? ' is-europe' : ' is-context'}${territoryOwner ? ' is-overseas-territory' : ''}${isGermany ? ' is-modern-germany' : ''}`}
        fill={fill}
        stroke={european || territoryOwner ? fill : 'var(--atlas-border)'}
        strokeWidth={european || territoryOwner ? 1.1 : 0.55}
        aria-label={label}
        tabIndex={european || territoryOwner ? 0 : -1}
        {...{ title: label }}
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
  return <ModernBoundaries view="world-today"/>
}

function HistoricWorld() {
  return <Geographies geography={historicalWorld as unknown as GeographiesProps['geography']}>
    {({ geographies }) => geographies.map((geography) => {
      const name = String(geography.properties?.NAME ?? 'Unbekanntes Gebiet')
      const owner = historicTerritoryOwners[name] ?? String(geography.properties?.SUBJECTO ?? '')
      const fill = historicColors[owner] ?? historicColors[name] ?? '#9a8e7c'
      const colonialLabel = owner && owner !== name ? ` · Verwaltung: ${owner}` : ''
      return <Geography
        key={`world-1914-${geography.rsmKey}`}
        geography={geography}
        className="atlas-historic-territory"
        fill={fill}
        stroke="var(--atlas-historic-border)"
        strokeWidth={0.45}
        aria-label={`${name} · 1914${colonialLabel}`}
        tabIndex={0}
        {...{ title: `${name} · 1914${colonialLabel}` }}
      />
    })}
  </Geographies>
}

function MapLegend({ view }: { view: ViewId }) {
  if (view === 'germany') return <div className="atlas-legend" aria-label="Kartenlegende">
    <span><i className="legend-empire"/>Deutsches Kaiserreich · 1914</span><span><i className="legend-current"/>Deutschland heute</span><span><i className="legend-context"/>Nachbarstaaten</span>
  </div>

  if (view === 'world-1914') {
    const empires = [
      ['United Kingdom of Great Britain and Ireland', 'Britisches Weltreich'], ['France', 'Frankreich'],
      ['German Empire', 'Deutsches Kaiserreich'], ['Russia', 'Russisches Kaiserreich'], ['Italy', 'Italien'],
      ['Spain', 'Spanien'], ['Portugal', 'Portugal'], ['Netherlands', 'Niederlande'], ['Belgium', 'Belgien'],
    ]
    return <div className="atlas-legend atlas-legend-countries" aria-label="Kartenlegende für die Welt 1914">
      {empires.map(([key, label]) => <span key={key}><i style={{ backgroundColor: historicColors[key] ?? '#9a8e7c' }}/>{label}</span>)}
      <span><i style={{ backgroundColor: '#9a8e7c' }}/>Weitere Staaten und Gebiete</span>
    </div>
  }

  const countriesOnMap = (countries as unknown as { objects: { countries: { geometries: Array<{ id: string; properties: { name: string } }> } } }).objects.countries.geometries
  const entries = [
    ...countriesOnMap.filter((country) => europeanIds.has(String(country.id).padStart(3, '0')))
      .map((country) => ({ name: country.properties.name, color: country.id === modernGermany ? 'var(--atlas-germany)' : modernColors[country.properties.name] ?? '#9a8e7c' })),
    ...Object.entries(currentOverseasColors).map(([name, color]) => ({ name: `Überseegebiete: ${name}`, color })),
  ]

  return <div className="atlas-legend atlas-legend-countries" aria-label="Kartenlegende für die Welt heute">
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
      <div><span className="atlas-date">{view === 'germany' ? 'STAND: 1914 / 2026' : view === 'world-1914' ? 'STAND: 1914' : 'STAND: 2026'}</span><h3>{detail.title}</h3></div>
      <p>{detail.description}</p>
    </div>
    <div id="atlas-panel" role="tabpanel" aria-labelledby={`atlas-tab-${view}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={view} className={`atlas-map atlas-map-${view}`} initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -5 }} transition={{ duration: reduceMotion ? 0 : 0.22, ease: 'easeOut' }}>
          <ComposableMap projection={view === 'germany' ? 'geoMercator' : 'geoEqualEarth'} projectionConfig={{ center, scale: detail.scale }} width={960} height={570} aria-label={detail.title}>
            <ZoomableGroup center={center} zoom={zoom} minZoom={0.8} maxZoom={3}>
              {view === 'germany' ? <GermanyComparison/> : view === 'world-today' ? <ModernEurope/> : <HistoricWorld/>}
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
