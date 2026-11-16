'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { FastForward, Maximize2, Pause, Play, RotateCcw, VolumeX } from 'lucide-react'
import { BattlefieldTwoD } from '@/components/battlefield-two-d'

export function BattlefieldViewer() {
  const hostRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(true)
  const [locked, setLocked] = useState(false)
  const [elapsed, setElapsed] = useState(0)
  const [speed, setSpeed] = useState(1)
  const [sceneMode, setSceneMode] = useState<'2d' | '3d'>('3d')
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
    camera.position.set(0, 13, 27)
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

    const terrainGeo = new THREE.PlaneGeometry(180, 180, 220, 220)
    terrainGeo.rotateX(-Math.PI / 2)
    const pos = terrainGeo.attributes.position as THREE.BufferAttribute
    const colors = new Float32Array(pos.count * 3)
    const colorA = new THREE.Color('#625f50'), colorB = new THREE.Color('#817760'), colorC = new THREE.Color('#47483f')
    const craterSpecs = [[-12,-5,5,2.4],[17,7,7,2.8],[4,-24,6,2.1],[-28,19,7,2.6],[-38,-31,8,2.7],[31,-34,5,1.8],[37,29,9,2.5],[-3,38,6,1.9]]
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i), z = pos.getZ(i)
      const broad = Math.sin(x*.12)*.65 + Math.cos(z*.11)*.55 + Math.sin((x+z)*.07)*.45
      const detail = Math.sin(x*1.8+z*.6)*.09 + Math.cos(z*2.2-x*.35)*.07 + Math.sin((x-z)*4.1)*.025
      let impact = 0
      for (const [cx,cz,r,depth] of craterSpecs) {
        const distance = Math.hypot(x-cx,z-cz)
        impact -= depth * Math.exp(-(distance*distance)/(r*r*.3))
        impact += .42 * Math.exp(-((distance-r*1.05)**2)/(r*r*.035))
      }
      const height = broad + detail + impact
      pos.setY(i, height)
      const color = colorA.clone().lerp(colorB, Math.max(0, Math.min(.75, .34 + height*.08 + Math.sin(x*.31+z*.17)*.12)))
      if (impact < -.35) color.lerp(colorC, Math.min(.7, -impact*.18))
      const tint = (Math.sin(x*3.7+z*2.4)*Math.cos(z*4.1-x*.9))*.045
      color.offsetHSL(0, 0, tint)
      colors[i*3]=color.r; colors[i*3+1]=color.g; colors[i*3+2]=color.b
    }
    terrainGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    terrainGeo.computeVertexNormals()
    const terrain = new THREE.Mesh(terrainGeo, new THREE.MeshStandardMaterial({ roughness: 1, vertexColors: true }))
    terrain.receiveShadow = true
    scene.add(terrain)

    const earthMat = new THREE.MeshStandardMaterial({color:'#484438',roughness:1})
    const timberMat = new THREE.MeshStandardMaterial({color:'#514637',roughness:1})
    const trenchPath = (points: [number,number][], radius:number, material:THREE.Material) => {
      const curve = new THREE.CatmullRomCurve3(points.map(([x,z])=>new THREE.Vector3(x,.18,z)))
      const trench = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(40,points.length*8), radius, 6, false), material)
      trench.receiveShadow=true; scene.add(trench)
      const parapet = new THREE.Mesh(new THREE.TubeGeometry(curve, Math.max(40,points.length*8), radius*1.85, 6, false), new THREE.MeshStandardMaterial({color:'#77705d',roughness:1}))
      parapet.position.y=.23; parapet.receiveShadow=true; scene.add(parapet)
    }
    trenchPath([[-38,-29],[-27,-25],[-21,-19],[-14,-18],[-7,-14],[0,-16],[9,-12],[18,-13],[28,-9],[39,-12]],.32,earthMat)
    trenchPath([[-39,5],[-29,3],[-20,7],[-13,4],[-5,8],[2,5],[11,9],[19,6],[30,10],[40,7]],.27,earthMat)
    trenchPath([[-32,29],[-23,25],[-15,28],[-7,24],[2,27],[10,23],[18,26],[27,22],[36,25]],.25,earthMat)
    trenchPath([[-18,-31],[-16,-22],[-19,-13],[-15,-5],[-18,4],[-14,13],[-17,23]],.2,timberMat)
    trenchPath([[13,-29],[11,-21],[15,-13],[12,-4],[17,5],[14,14],[19,24]],.2,timberMat)

    const rubbleMat = new THREE.MeshStandardMaterial({color:'#716b5c',roughness:1})
    const fort = new THREE.Group(); fort.position.set(0,.2,-37); scene.add(fort)
    const fortBase = new THREE.Mesh(new THREE.CylinderGeometry(8,9,2.2,12),new THREE.MeshStandardMaterial({color:'#625e52',roughness:1}))
    fortBase.position.y=.65; fortBase.castShadow=true; fortBase.receiveShadow=true; fort.add(fortBase)
    const keep = new THREE.Mesh(new THREE.CylinderGeometry(4.3,4.8,3.2,10),new THREE.MeshStandardMaterial({color:'#777262',roughness:.96}))
    keep.position.y=2.9; keep.castShadow=true; keep.receiveShadow=true; fort.add(keep)
    for(let i=0;i<22;i++){
      const angle=i*2.399, radius=5.3+(i%4)*.75
      const stone=new THREE.Mesh(new THREE.BoxGeometry(1.3+(i%3)*.55,.45+(i%4)*.22,1.2),rubbleMat)
      stone.position.set(Math.cos(angle)*radius,.4+(i%3)*.16,Math.sin(angle)*radius); stone.rotation.y=angle; stone.rotation.z=(i%2?1:-1)*.12; stone.castShadow=true; fort.add(stone)
    }
    const craterMat = new THREE.MeshStandardMaterial({color:'#514d42',roughness:1,side:THREE.DoubleSide})
    for(const [cx,cz,r] of craterSpecs){
      const rim=new THREE.Mesh(new THREE.TorusGeometry(r,.22,5,36),new THREE.MeshStandardMaterial({color:'#827864',roughness:1}))
      rim.rotation.x=Math.PI/2; rim.position.set(cx,.12,cz); rim.scale.set(1,.72,1); rim.castShadow=true; scene.add(rim)
      const floor=new THREE.Mesh(new THREE.CircleGeometry(r*.92,28),craterMat)
      floor.rotation.x=-Math.PI/2; floor.position.set(cx,-.03,cz); floor.scale.set(1,.72,1); scene.add(floor)
    }

    const treeMat = new THREE.MeshStandardMaterial({color:'#454a40',roughness:1})
    const trunkMat = new THREE.MeshStandardMaterial({color:'#514537',roughness:1})
    for (let i=0;i<180;i++) {
      const x=(Math.sin(i*91.7)*.5+.5)*150-75, z=(Math.cos(i*37.3)*.5+.5)*150-75
      if (Math.abs(x)<21 && Math.abs(z)<43) continue
      const scale=.55+((i*17)%11)/12
      const trunk=new THREE.Mesh(new THREE.CylinderGeometry(.1*scale,.2*scale,2.1*scale,5),trunkMat); trunk.position.set(x,1.05*scale,z); trunk.castShadow=true; scene.add(trunk)
      const crown=new THREE.Mesh(new THREE.ConeGeometry(1.2*scale,3.5*scale,6),treeMat); crown.position.set(x,3.25*scale,z); crown.castShadow=true; scene.add(crown)
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

    const keys=new Set<string>(); let yaw=0,pitch=-.48, isLocked=false, frame=0, last=performance.now()
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
    <div className="battle-heading"><div><span className="battle-eyebrow">HISTORISCHE FILMREKONSTRUKTION · VERDUN</span><h1>Ein Tag im Schlachtfeld</h1><p>Beobachte den 24. Oktober 1916 als animierte 2D-Szene oder erkunde das Gelände in 3D. Pausiere, ändere das Tempo oder springe auf der Zeitleiste.</p></div><span className="battle-date">24 OKT<br/><b>1916</b></span></div>
    <div className="battle-view-switch" role="group" aria-label="Darstellungsmodus"><span>ANSICHT</span><button type="button" className={sceneMode === '2d' ? 'selected' : ''} aria-pressed={sceneMode === '2d'} onClick={() => setSceneMode('2d')}>2D · Filmszene</button><button type="button" className={sceneMode === '3d' ? 'selected' : ''} aria-pressed={sceneMode === '3d'} onClick={() => setSceneMode('3d')}>3D · Freie Kamera</button></div>
    <div className="battle-layout"><section className="viewer-shell" aria-label={sceneMode === '2d' ? 'Animierte 2D-Schlachtfeldszene' : 'Interaktive 3D-Schlachtfeldkarte'}><div className="viewer-topline"><span><i/> ZEITLICHER ABLAUF</span><span>DOUAUMONT · WESTLICHER ABSCHNITT</span></div><div className={`battle-canvas${sceneMode === '2d' ? ' battle-canvas-show-2d' : ''}`} ref={hostRef}>{sceneMode === '2d' && <BattlefieldTwoD elapsed={elapsed} playing={playing} speed={speed}/>}<div className="viewer-hint"><strong>{locked?'FREIE KAMERA AKTIV':'KAMERA OHNE SPIELERFIGUR'}</strong><span>{locked?'Maus: Blickrichtung · WASD: bewegen · Leertaste/Shift: Höhe':'Klicke auf die Landschaft, um die Kamera zu übernehmen'}</span></div><div className="map-label label-fort">FORT DOUAUMONT</div><div className="map-label label-positions">FRANZÖSISCHE STELLUNGEN</div><div className="map-compass">N<br/><span>↑</span></div><div className="viewer-controls"><button onClick={()=>setPlaying(v=>!v)} aria-label={playing?'Zeit anhalten':'Zeit fortsetzen'}>{playing?<Pause size={16}/>:<Play size={16}/>}</button><span className="clock" aria-label={`Simulationszeit ${formatTime(elapsed)} Uhr`}>{formatTime(elapsed)}</span><div className="timeline-track"><i style={{width:`${Math.min(100,elapsed/7.2)}%`}}/></div><div className="speed-controls" role="group" aria-label="Spielgeschwindigkeit">{[1,2,3].map(value=><button key={value} className={speed===value?'speed-active':''} aria-pressed={speed===value} onClick={()=>setSpeed(value)}>{value}×</button>)}</div><button onClick={()=>skipTime(60)} aria-label="Eine Stunde vorspringen">+1h</button><button onClick={()=>skipTime(180)} aria-label="Drei Stunden vorspringen"><FastForward size={15}/> +3h</button><button onClick={reset} aria-label="Zeit und Kamera zurücksetzen"><RotateCcw size={15}/></button><button onClick={toggleFullscreen} aria-label="Vollbild öffnen"><Maximize2 size={15}/></button></div><label className="battle-scrubber"><span>Zeit direkt wählen</span><input type="range" min="0" max="720" step="15" value={elapsed} aria-label="Simulationszeit am 24. Oktober 1916" onChange={event=>setElapsed(Number(event.target.value))}/><span>{formatTime(elapsed)}–18:00</span></label></div></section>
    <aside className="battle-info"><div className="info-label">DIE LAGE · {formatTime(elapsed)} UHR</div><h2>{elapsed<120?'Der Gegenangriff beginnt':elapsed<300?'Vorstoß auf Douaumont':elapsed<480?'Kämpfe am Fort':elapsed<660?'Fort Douaumont zurückerobert':'Die Front stabilisiert sich'}</h2><p>{stage} Die französische Offensive am 24. Oktober 1916 führte zur Rückeroberung von Fort Douaumont. Der Zeitverlauf ist eine vereinfachte, nicht taktische Darstellung.</p><div className="legend"><span><i className="legend-blue"/> Französische Bewegung</span><span><i className="legend-rust"/> Deutsche Stellungen</span><span><i className="legend-line"/> Grabenlinien</span></div><div className="historical-note"><b>Einordnung</b><p>Die animierten Figuren, Gewehre und Mündungsblitze sind eine stilisierte Rekonstruktion. Sie stellen keine identifizierbaren historischen Personen, exakten Truppenpositionen oder taktische Simulation dar.</p></div><div className="controls-note"><b>{sceneMode === '2d' ? 'Wiedergabe' : 'Kamerasteuerung'}</b>{sceneMode === '2d' ? <><span>1×–3× <small>Tempo ändern</small></span><span>+1h / +3h <small>Zeitsprung</small></span><span>Zeitleiste <small>Zeitpunkt auswählen</small></span></> : <><span>Maus bewegen <small>Blickrichtung</small></span><span>W A S D <small>Vorwärts / seitwärts</small></span><span>Leertaste / Shift <small>Auf / ab</small></span></>}</div></aside></div>
    <p className="battle-disclaimer"><VolumeX size={15}/> Ohne Ton, ohne Gore — eine ruhige historische Visualisierung. Für Tastatursteuerung zuerst in die Karte klicken.</p>
  </div>
}
