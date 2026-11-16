'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FastForward, Maximize2, Pause, Play, RotateCcw, VolumeX } from 'lucide-react'

export function BattlefieldViewer() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(true)
  const [locked, setLocked] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [speed, setSpeed] = useState(1)
  const playingState = useRef(playing)
  const speedState = useRef(speed)
  const elapsedState = useRef(elapsed)
  playingState.current = playing
  speedState.current = speed
  elapsedState.current = elapsed

  useEffect(() => {
    if (elapsed >= 720) setPlaying(false)
  }, [elapsed])

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#bbc4bf')
    scene.fog = new THREE.Fog('#bbc4bf', 42, 155)
    const camera = new THREE.PerspectiveCamera(62, host.clientWidth / host.clientHeight, 0.1, 220)
    camera.position.set(0, 7, 22)
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
    renderer.setSize(host.clientWidth, host.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    host.appendChild(renderer.domElement)
    const hemi = new THREE.HemisphereLight('#e9eee8', '#474239', 2.1)
    scene.add(hemi)
    const sun = new THREE.DirectionalLight('#fff0d2', 2.7)
    sun.position.set(-28, 40, 22)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    scene.add(sun)

    const terrainGeo = new THREE.PlaneGeometry(180, 180, 100, 100)
    terrainGeo.rotateX(-Math.PI / 2)
    const pos = terrainGeo.attributes.position as THREE.BufferAttribute
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i)
      const crater = (cx: number, cz: number, r: number, depth: number) => -depth * Math.exp(-((x-cx)**2+(z-cz)**2)/(r*r))
      pos.setY(i, Math.sin(x*.12)*.65 + Math.cos(z*.11)*.55 + Math.sin((x+z)*.07)*.45 + crater(-12,-5,5,2.4)+crater(17,7,7,2.8)+crater(4,-24,6,2.1)+crater(-28,19,7,2.6))
    }
    terrainGeo.computeVertexNormals()
    const terrain = new THREE.Mesh(terrainGeo, new THREE.MeshStandardMaterial({ color: '#77745f', roughness: 1, vertexColors: false }))
    terrain.receiveShadow = true
    scene.add(terrain)

    const groundPatch = (x: number,z: number,w: number,d: number,color: string,rot=0) => {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(w,d), new THREE.MeshStandardMaterial({ color, roughness: 1, side: THREE.DoubleSide }))
      m.rotation.x = -Math.PI/2; m.rotation.z = rot; m.position.set(x,.16,z); scene.add(m); return m
    }
    // Broken earth and shallow trench networks are illustrative, not to scale.
    groundPatch(-8,0,4,49,'#37372f',.07); groundPatch(1,1,3,43,'#403d34',-.1); groundPatch(10,0,3.5,39,'#38372f',.11)
    for (const [x,z] of [[-8,-22],[-8,20],[1,-19],[1,23],[10,-17],[10,21]] as const) {
      const berm = new THREE.Mesh(new THREE.BoxGeometry(5,.65,2.4), new THREE.MeshStandardMaterial({color:'#8d846e',roughness:1}))
      berm.position.set(x,.35,z); berm.castShadow=true; scene.add(berm)
    }
    // Sparse, subdued tree silhouettes and timber revetments establish scale.
    const treeMat = new THREE.MeshStandardMaterial({color:'#4d5145',roughness:1})
    for (let i=0;i<68;i++) {
      const x=(Math.sin(i*91.7)*.5+.5)*150-75, z=(Math.cos(i*37.3)*.5+.5)*150-75
      if (Math.abs(x)<17 && Math.abs(z)<35) continue
      const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.12,.22,2.2,5),new THREE.MeshStandardMaterial({color:'#514537'})); trunk.position.set(x,1,z); scene.add(trunk)
      const crown=new THREE.Mesh(new THREE.ConeGeometry(1.15,3.2,6),treeMat); crown.position.set(x,3.4,z); scene.add(crown)
    }
    const markerGroup = new THREE.Group(); scene.add(markerGroup)
    const markers: THREE.Mesh[] = []
    for (let i=0;i<24;i++) {
      const french=i%2===0
      const marker=new THREE.Mesh(new THREE.SphereGeometry(.32,12,10),new THREE.MeshStandardMaterial({color:french?'#667d8a':'#8b6659',emissive:french?'#24343a':'#3c2721',emissiveIntensity:.35}))
      marker.position.set((french?-1:1)*(18+(i%5)*2),.65,-24+Math.floor(i/2)*4.2)
      marker.userData={startX:marker.position.x,startZ:marker.position.z,phase:i*.71,side:french?-1:1}
      markerGroup.add(marker); markers.push(marker)
    }
    // Smoke is ambient and non-graphic, simply indicating distant artillery activity.
    const smokeMat=new THREE.MeshStandardMaterial({color:'#777873',transparent:true,opacity:.22,roughness:1})
    for(let i=0;i<13;i++){const puff=new THREE.Mesh(new THREE.SphereGeometry(1.1+(i%3)*.45,10,8),smokeMat);puff.position.set(-25+i*4.2,2.8+(i%4)*.5,-26+(i%3)*10);scene.add(puff)}

    const keys=new Set<string>(); let yaw=0,pitch=-.12, isLocked=false, frame=0, last=performance.now()
    const onKeyDown=(e:KeyboardEvent)=>{keys.add(e.code);if(['Space','ArrowUp','ArrowDown'].includes(e.code))e.preventDefault()}
    const onKeyUp=(e:KeyboardEvent)=>keys.delete(e.code)
    const onMouse=(e:MouseEvent)=>{if(!isLocked)return;yaw-=e.movementX*.0022;pitch=Math.max(-1.25,Math.min(1.15,pitch-e.movementY*.0022))}
    const onLock=()=>{isLocked=document.pointerLockElement===renderer.domElement;setLocked(isLocked)}
    const onResize=()=>{if(!host)return;camera.aspect=host.clientWidth/host.clientHeight;camera.updateProjectionMatrix();renderer.setSize(host.clientWidth,host.clientHeight)}
    const requestLock=()=>renderer.domElement.requestPointerLock?.()
    renderer.domElement.addEventListener('click',requestLock)
    document.addEventListener('pointerlockchange',onLock);document.addEventListener('mousemove',onMouse)
    window.addEventListener('keydown',onKeyDown);window.addEventListener('keyup',onKeyUp);window.addEventListener('resize',onResize)
    const animate=(now:number)=>{frame=requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.05);last=now
      if(playingState.current){if(keys.has('KeyW')||keys.has('ArrowUp'))camera.translateZ(-dt*11);if(keys.has('KeyS')||keys.has('ArrowDown'))camera.translateZ(dt*11);if(keys.has('KeyA')||keys.has('ArrowLeft'))camera.translateX(-dt*11);if(keys.has('KeyD')||keys.has('ArrowRight'))camera.translateX(dt*11);if(keys.has('Space'))camera.position.y+=dt*8;if(keys.has('ShiftLeft'))camera.position.y-=dt*8;camera.position.y=Math.max(1.2,Math.min(32,camera.position.y));camera.rotation.order='YXZ';camera.rotation.set(pitch,yaw,0);const time=elapsedState.current*.017;markers.forEach(m=>{const u=m.userData;m.position.x=u.startX+u.side*Math.sin(time+u.phase)*1.1;m.position.z=u.startZ+Math.sin(time*.8+u.phase)*.48})}
      renderer.render(scene,camera)
    }
    frame=requestAnimationFrame(animate)
    const clock=window.setInterval(()=>{if(playingState.current)setElapsed(v=>Math.min(720,v+speedState.current))},1000)
    return()=>{cancelAnimationFrame(frame);clearInterval(clock);renderer.domElement.removeEventListener('click',requestLock);document.removeEventListener('pointerlockchange',onLock);document.removeEventListener('mousemove',onMouse);window.removeEventListener('keydown',onKeyDown);window.removeEventListener('keyup',onKeyUp);window.removeEventListener('resize',onResize);if(document.pointerLockElement===renderer.domElement)document.exitPointerLock();terrainGeo.dispose();renderer.dispose();host.removeChild(renderer.domElement)}
  }, [])
  const reset=()=>{setElapsed(0);setSpeed(1);if(hostRef.current)document.exitPointerLock()}
  const skipTime=(minutes:number)=>setElapsed(value=>Math.min(720,value+minutes))
  const toggleFullscreen=()=>{const el=hostRef.current?.parentElement;if(el?.requestFullscreen)void el.requestFullscreen()}
  const formatTime=(minutes:number)=>`${String(6+Math.floor(minutes/60)).padStart(2,'0')}:${String(minutes%60).padStart(2,'0')}`
  const stage=elapsed<120?'Die französischen Verteidiger ordnen sich neu.':elapsed<300?'Der Gegenangriff rückt auf das Fort vor.':elapsed<480?'Kämpfe erreichen die Zugänge von Douaumont.':elapsed<660?'Französische Truppen sichern das Fort.':'Die Stellung wird gefestigt; die Front beruhigt sich.'
  return <div className="battle-page">
    <div className="battle-heading"><div><span className="battle-eyebrow">HISTORISCHE 3D-REKONSTRUKTION · VERDUN</span><h1>Ein Tag im Schlachtfeld</h1><p>Eine stille 3D-Perspektive auf den 24. Oktober 1916. Pausiere, wähle 1× bis 3× Geschwindigkeit oder springe auf der Zeitleiste vor.</p></div><span className="battle-date">24 OKT<br/><b>1916</b></span></div>
    <div className="battle-layout"><section className="viewer-shell" aria-label="Interaktive 3D-Schlachtfeldkarte"><div className="viewer-topline"><span><i/> ZEITLICHER ABLAUF</span><span>DOUAUMONT · WESTLICHER ABSCHNITT</span></div><div className="battle-canvas" ref={hostRef}><div className="viewer-hint"><strong>{locked?'FREIE KAMERA AKTIV':'KAMERA OHNE SPIELERFIGUR'}</strong><span>{locked?'Maus: Blickrichtung · WASD: bewegen · Leertaste/Shift: Höhe':'Klicke auf die Landschaft, um die Kamera zu übernehmen'}</span></div><div className="map-label label-fort">FORT DOUAUMONT</div><div className="map-label label-positions">FRANZÖSISCHE STELLUNGEN</div><div className="map-compass">N<br/><span>↑</span></div><div className="viewer-controls"><button onClick={()=>setPlaying(v=>!v)} aria-label={playing?'Zeit anhalten':'Zeit fortsetzen'}>{playing?<Pause size={16}/>:<Play size={16}/>}</button><span className="clock" aria-label={`Simulationszeit ${formatTime(elapsed)} Uhr`}>{formatTime(elapsed)}</span><div className="timeline-track"><i style={{width:`${Math.min(100,elapsed/7.2)}%`}}/></div><div className="speed-controls" role="group" aria-label="Spielgeschwindigkeit">{[1,2,3].map(value=><button key={value} className={speed===value?'speed-active':''} aria-pressed={speed===value} onClick={()=>setSpeed(value)}>{value}×</button>)}</div><button onClick={()=>skipTime(60)} aria-label="Eine Stunde vorspringen">+1h</button><button onClick={()=>skipTime(180)} aria-label="Drei Stunden vorspringen"><FastForward size={15}/> +3h</button><button onClick={reset} aria-label="Zeit und Kamera zurücksetzen"><RotateCcw size={15}/></button><button onClick={toggleFullscreen} aria-label="Vollbild öffnen"><Maximize2 size={15}/></button></div><label className="battle-scrubber"><span>Zeit direkt wählen</span><input type="range" min="0" max="720" step="15" value={elapsed} aria-label="Simulationszeit am 24. Oktober 1916" onChange={event=>setElapsed(Number(event.target.value))}/><span>{formatTime(elapsed)}–18:00</span></label></div></section>
    <aside className="battle-info"><div className="info-label">DIE LAGE · {formatTime(elapsed)} UHR</div><h2>{elapsed<120?'Der Gegenangriff beginnt':elapsed<300?'Vorstoß auf Douaumont':elapsed<480?'Kämpfe am Fort':elapsed<660?'Fort Douaumont zurückerobert':'Die Front stabilisiert sich'}</h2><p>{stage} Die französische Offensive am 24. Oktober 1916 führte zur Rückeroberung von Fort Douaumont. Der Zeitverlauf ist eine vereinfachte, nicht taktische Darstellung.</p><div className="legend"><span><i className="legend-blue"/> Französische Bewegung</span><span><i className="legend-rust"/> Deutsche Stellungen</span><span><i className="legend-line"/> Grabenlinien</span></div><div className="historical-note"><b>Einordnung</b><p>Die Bewegungen sind schematisch und dienen der Orientierung. Sie zeigen keine exakten Truppenpositionen und keine taktische Simulation.</p></div><div className="controls-note"><b>Kamerasteuerung</b><span>Maus bewegen <small>Blickrichtung</small></span><span>W A S D <small>Vorwärts / seitwärts</small></span><span>Leertaste / Shift <small>Auf / ab</small></span></div></aside></div>
    <p className="battle-disclaimer"><VolumeX size={15}/> Ohne Ton, ohne Gore — eine ruhige historische Visualisierung. Für Tastatursteuerung zuerst in die Karte klicken.</p>
  </div>
}
