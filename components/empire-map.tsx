'use client'

import { useState } from 'react'
import { ComposableMap, Geographies, Geography, Marker, ZoomableGroup } from 'react-simple-maps'
import countries from 'world-atlas/countries-50m.json'

const highlighted = new Set(['276'])
const places = [
 {name:'Berlin',coordinates:[13.405,52.52] as [number,number],type:'capital'},
 {name:'Königsberg',coordinates:[20.51,54.71] as [number,number],type:'historic'},
 {name:'Straßburg',coordinates:[7.75,48.58] as [number,number],type:'historic'},
 {name:'München',coordinates:[11.58,48.14] as [number,number],type:'city'},
 {name:'Danzig',coordinates:[18.65,54.35] as [number,number],type:'historic'},
]

export function EmpireMap(){const [zoom,setZoom]=useState(1);return <div className="empire-map"><div className="map-zoom-controls" role="group" aria-label="Kartenzoom"><button type="button" onClick={()=>setZoom(value=>Math.min(2.2,value+.2))} aria-label="Karte vergrößern">+</button><button type="button" onClick={()=>setZoom(value=>Math.max(.8,value-.2))} aria-label="Karte verkleinern">−</button><button type="button" onClick={()=>setZoom(1)} aria-label="Kartenansicht zurücksetzen">Zurücksetzen</button></div><ComposableMap projection="geoMercator" projectionConfig={{center:[13,51.3],scale:2300}} width={960} height={570} aria-label="Geografische Orientierungskarte Mitteleuropa"><ZoomableGroup center={[13,51.3]} zoom={zoom} minZoom={.8} maxZoom={2.2}>
<Geographies geography={countries as unknown as string}>{({geographies})=>geographies.map(geo=>{const isGermany=highlighted.has(String(geo.id));return <Geography key={geo.rsmKey} geography={geo} className={`map-region${isGermany?' map-region-germany':''}`} fill={isGermany?'#8b4537':'#ddd8ce'} stroke="#fbf8ef" strokeWidth={.8}/>})}</Geographies>
{places.map(place=><Marker key={place.name} coordinates={place.coordinates}><circle r={place.type==='capital'?5:3.5} fill={place.type==='capital'?'#8b4537':'#46576a'} stroke="#f8f3e8" strokeWidth={1.5}/><text textAnchor="middle" y={place.type==='capital'?-11:13} className="map-place-label">{place.name}</text></Marker>)}
</ZoomableGroup></ComposableMap><div className="map-legend"><span><i className="map-current"/> Heutiges Deutschland</span><span><i className="map-historical"/> Historische Orte (1914)</span><span>Zoomsteuerung oben rechts</span></div></div>}
