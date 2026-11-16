'use client'

import { useEffect, useRef } from 'react'

type BattlefieldTwoDProps = { elapsed: number; playing: boolean; speed: number }

type Figure = { x: number; y: number; side: 'french' | 'german'; phase: number; scale: number }

export function BattlefieldTwoD({ elapsed, playing, speed }: BattlefieldTwoDProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateRef = useRef({ elapsed, playing, speed })
  stateRef.current = { elapsed, playing, speed }

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const ctx = context
    const backdrop = new Image()
    backdrop.crossOrigin = 'anonymous'
    backdrop.src = '/verdun-2d-scene.png'
    const figures: Figure[] = Array.from({ length: 22 }, (_, index) => ({
      x: 0.12 + ((index * 37) % 77) / 100,
      y: 0.65 + ((index * 19) % 25) / 100,
      side: index % 2 ? 'german' : 'french',
      phase: index * 1.73,
      scale: 0.72 + ((index * 13) % 55) / 100,
    }))
    let frame = 0
    let animation = 0
    let last = 0
    let elapsedRealtime = 0
    let width = 0
    let height = 0
    let dpr = 1

    const resize = () => {
      const bounds = canvas.getBoundingClientRect()
      width = bounds.width
      height = bounds.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(canvas)
    resize()

    const drawFigure = (figure: Figure, now: number, battleTime: number) => {
      const x = figure.x * width
      const ground = figure.y * height
      const scale = figure.scale * Math.max(0.68, Math.min(1.15, height / 440))
      const isFrench = figure.side === 'french'
      const uniform = isFrench ? '#4f6061' : '#4a5148'
      const bob = Math.sin(now * 0.004 + figure.phase) * 1.7 * scale
      const firing = Math.sin(battleTime * 3 + figure.phase) > 0.91
      ctx.save()
      ctx.translate(x, ground + bob)
      ctx.scale(scale, scale)
      ctx.fillStyle = '#171a19'
      ctx.globalAlpha = 0.29
      ctx.beginPath()
      ctx.ellipse(0, 1, 13, 3.6, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.globalAlpha = 1
      ctx.strokeStyle = '#252825'
      ctx.lineWidth = 4
      ctx.lineCap = 'round'
      ctx.beginPath()
      ctx.moveTo(-3, -10)
      ctx.lineTo(-5 + bob, 0)
      ctx.moveTo(3, -10)
      ctx.lineTo(6 - bob, 0)
      ctx.stroke()
      ctx.fillStyle = uniform
      ctx.beginPath()
      ctx.moveTo(-7, -26)
      ctx.lineTo(7, -26)
      ctx.lineTo(9, -11)
      ctx.lineTo(4, -8)
      ctx.lineTo(-6, -9)
      ctx.lineTo(-9, -14)
      ctx.closePath()
      ctx.fill()
      ctx.fillStyle = '#c1a98c'
      ctx.beginPath()
      ctx.arc(0, -31, 4.3, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = isFrench ? '#394143' : '#3b403a'
      ctx.beginPath()
      ctx.ellipse(0, -34, 6.3, 2.6, 0, Math.PI, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = uniform
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(3, -22)
      ctx.lineTo(9, -18)
      ctx.stroke()
      ctx.strokeStyle = '#382e25'
      ctx.lineWidth = 2.3
      ctx.beginPath()
      ctx.moveTo(6, -19)
      ctx.lineTo(27, -24)
      ctx.stroke()
      ctx.fillStyle = '#b28a47'
      ctx.fillRect(25, -25, 4, 2)
      if (firing) {
        ctx.fillStyle = 'rgba(255, 205, 116, 0.92)'
        ctx.beginPath()
        ctx.moveTo(29, -24)
        ctx.lineTo(39, -30)
        ctx.lineTo(36, -24)
        ctx.lineTo(40, -20)
        ctx.lineTo(29, -22)
        ctx.fill()
        ctx.fillStyle = 'rgba(255, 224, 167, 0.76)'
        ctx.beginPath()
        ctx.arc(31, -24, 2.3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    const render = (now: number) => {
      animation = requestAnimationFrame(render)
      const delta = Math.min(0.05, (now - last) / 1000)
      last = now
      if (stateRef.current.playing) elapsedRealtime += delta * stateRef.current.speed
      frame += delta
      ctx.clearRect(0, 0, width, height)
      if (backdrop.complete && backdrop.naturalWidth) {
        const scale = Math.max(width / backdrop.naturalWidth, height / backdrop.naturalHeight)
        const imageWidth = backdrop.naturalWidth * scale
        const imageHeight = backdrop.naturalHeight * scale
        const drift = Math.sin(frame * 0.035) * Math.min(width * 0.012, 12)
        ctx.drawImage(backdrop, (width - imageWidth) / 2 + drift, (height - imageHeight) / 2, imageWidth, imageHeight)
      } else {
        ctx.fillStyle = '#77766a'
        ctx.fillRect(0, 0, width, height)
      }
      const haze = ctx.createLinearGradient(0, height * 0.38, 0, height)
      haze.addColorStop(0, 'rgba(31,35,32,0.03)')
      haze.addColorStop(1, 'rgba(20,22,20,0.58)')
      ctx.fillStyle = haze
      ctx.fillRect(0, 0, width, height)

      figures.forEach((figure) => {
        const activity = Math.sin(elapsedRealtime * 0.23 + figure.phase)
        if (activity > 0.79) {
          const burst = ((elapsedRealtime * 21 + figure.phase * 11) % 1)
          ctx.strokeStyle = `rgba(255, 208, 130, ${0.16 * (1 - burst)})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(figure.x * width + 28 * figure.scale, figure.y * height - 24 * figure.scale)
          ctx.lineTo(figure.x * width + width * 0.12 + burst * width * 0.13, figure.y * height - height * 0.18)
          ctx.stroke()
          const smoke = ctx.createRadialGradient(figure.x * width + 31, figure.y * height - 24, 1, figure.x * width + 31, figure.y * height - 24, 20 + burst * 12)
          smoke.addColorStop(0, 'rgba(224, 215, 191, 0.2)')
          smoke.addColorStop(1, 'rgba(224, 215, 191, 0)')
          ctx.fillStyle = smoke
          ctx.fillRect(figure.x * width + 10, figure.y * height - 50, 55, 48)
        }
        drawFigure(figure, now, elapsedRealtime)
      })

      const label = stateRef.current.elapsed
      const hour = 6 + Math.floor(label / 60)
      const minute = label % 60
      ctx.fillStyle = 'rgba(12, 15, 15, 0.66)'
      ctx.fillRect(18, 18, 154, 45)
      ctx.fillStyle = '#e8e0ce'
      ctx.font = '600 11px system-ui, sans-serif'
      ctx.fillText('VERDUN · DOUAUMONT', 29, 36)
      ctx.font = '12px ui-monospace, monospace'
      ctx.fillStyle = '#d7c5a1'
      ctx.fillText(`${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}  ·  24 OKT 1916`, 29, 52)
    }
    animation = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animation)
      observer.disconnect()
      backdrop.src = ''
    }
  }, [])

  return <canvas ref={canvasRef} className="battle-2d-canvas" aria-label="Animierte 2D-Schlachtfeldszene von Verdun mit Soldaten, Gewehren und Mündungsfeuer" role="img" />
}
