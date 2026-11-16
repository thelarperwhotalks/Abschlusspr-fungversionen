'use client'

import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import countries from 'world-atlas/countries-50m.json'

const modernGermany = '276'
const empire1914: [number, number][] = [
  [6.4, 49.5], [7.2, 49.1], [7.6, 48.2], [8.2, 47.6], [9.6, 47.6], [10.5, 47.4],
  [12.5, 47.5], [13.8, 48.1], [15.0, 48.8], [16.9, 48.7], [18.1, 49.1], [19.0, 49.0],
  [20.2, 49.3], [21.0, 49.8], [22.0, 50.4], [22.6, 51.2], [23.4, 52.1], [23.6, 53.0],
  [23.3, 54.0], [22.5, 54.4], [21.6, 54.6], [20.5, 54.6], [19.5, 54.5], [18.7, 54.8],
  [17.6, 54.8], [16.6, 54.6], [15.5, 54.4], [14.6, 54.4], [13.6, 54.5], [12.4, 54.5],
  [11.3, 54.6], [10.4, 54.8], [9.2, 54.9], [8.1, 54.7], [7.8, 53.8], [7.6, 52.8],
  [7.2, 51.9], [6.7, 51.2], [6.1, 50.7], [6.4, 49.5],
]

const historicalTerritory = {
  type: 'FeatureCollection' as const,
  features: [{ type: 'Feature' as const, properties: {}, geometry: { type: 'Polygon' as const, coordinates: [[...empire1914].reverse()] } }],
}

const places = [
  { name: 'Berlin', coordinates: [13.405, 52.52] as [number, number], type: 'capital' },
  { name: 'Königsberg', coordinates: [20.51, 54.71] as [number, number], type: 'historic' },
  { name: 'Straßburg', coordinates: [7.75, 48.58] as [number, number], type: 'historic' },
  { name: 'München', coordinates: [11.58, 48.14] as [number, number], type: 'city' },
  { name: 'Danzig', coordinates: [18.65, 54.35] as [number, number], type: 'historic' },
]

export function EmpireMap() {
  const [zoom, setZoom] = useState(1)

  return (
    <div className="empire-map">
      <div className="map-zoom-controls" role="group" aria-label="Kartenzoom">
        <button type="button" onClick={() => setZoom(value => Math.min(2.2, value + 0.2))} aria-label="Karte vergrößern">+</button>
        <button type="button" onClick={() => setZoom(value => Math.max(0.8, value - 0.2))} aria-label="Karte verkleinern">−</button>
        <button type="button" onClick={() => setZoom(1)} aria-label="Kartenansicht zurücksetzen">Zurücksetzen</button>
      </div>
      <ComposableMap projection="geoMercator" projectionConfig={{ center: [13, 51.3], scale: 2300 }} width={960} height={570} aria-label="Karte zum Vergleich der Grenzen des Deutschen Kaiserreichs von 1914 und des heutigen Deutschlands">
        <ZoomableGroup center={[13, 51.3]} zoom={zoom} minZoom={0.8} maxZoom={2.2}>
          <Geographies geography={countries as unknown as string}>
            {({ geographies }) => geographies.map(geo => (
              <Geography key={geo.rsmKey} geography={geo} className="map-region" fill="#ddd8ce" stroke="#fbf8ef" strokeWidth={0.8} />
            ))}
          </Geographies>
          <Geographies geography={historicalTerritory}>
            {({ geographies }) => geographies.map(geo => (
              <Geography key={`historical-${geo.rsmKey}`} geography={geo} fill="#171817" fillOpacity={0.94} stroke="#0d0e0d" strokeWidth={1.25} />
            ))}
          </Geographies>
          <Geographies geography={countries as unknown as string}>
            {({ geographies }) => geographies.filter(geo => String(geo.id) === modernGermany).map(geo => (
              <Geography key={`modern-${geo.rsmKey}`} geography={geo} className="map-region map-region-germany" fill="#bd302f" stroke="#f8f3e8" strokeWidth={1.1} />
            ))}
          </Geographies>
          {places.map(place => (
            <Marker key={place.name} coordinates={place.coordinates}>
              <circle r={place.type === 'capital' ? 5 : 3.5} fill={place.type === 'capital' ? '#bd302f' : '#e4d8bf'} stroke="#1a1b19" strokeWidth={1.4} />
              <text textAnchor="middle" y={place.type === 'capital' ? -11 : 13} className="map-place-label">{place.name}</text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
      <div className="map-legend" aria-label="Legende">
        <span><i className="map-historical" /> Deutsches Kaiserreich · 1914</span>
        <span><i className="map-current" /> Heutiges Deutschland</span>
        <span>Zoomsteuerung oben rechts</span>
      </div>
      <p className="map-source-note">Historische Grenzfläche schematisch nach dem Reichsgebiet von 1914; heutige Grenzen dienen als Orientierung. Die Karte ist keine parzellenscharfe Rekonstruktion.</p>
    </div>
  )
}
