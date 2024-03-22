import { sum } from "lodash-es";
import { useEffect, useRef } from "react";

const { random, round, sin ,cos, PI } = Math

function generateBubble(): [number, number][]{
  const vertexCount = 2 * (3 + round(random() * 3))
  const centerRadius = 0.2 + random() * 0.3
  const centerAngle = random() * PI * 2
  const center = [
    0.5 + cos(centerAngle) * centerRadius,
    0.5 + sin(centerAngle) * centerRadius,
  ]
  const angleRatios = Array.from({ length: vertexCount }, () => random())
  const totalRatios = sum(angleRatios)
  const angles = angleRatios.reduce<number[]>((angles, ratio) => {
    const currentAngle = ratio * PI * 2 / totalRatios
    const lastAngle = angles[angles.length - 1] || 0
    return [...angles, lastAngle + currentAngle]
  }, [])
  
  const points = angles.map((angle) => {
    const radius = 0.4
    return [
      center[0] + cos(angle) * radius,
      center[1] + sin(angle) * radius
    ] as [number, number]
  })
  return points
}

export function CanvasWithShape() {
  const canvas = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvas.current) return
    const ctx = canvas.current.getContext("2d")
    if (!ctx) return
    ctx.canvas.width = 2 * canvas.current.clientWidth
    ctx.canvas.height = 2 * canvas.current.clientHeight
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const bubble = generateBubble()
    ctx.beginPath()
    for (const idx in bubble) {
      const point = bubble[idx]
      const x = point[0] * ctx.canvas.width
      const y = point[1] * ctx.canvas.height
      if (idx === '0') {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }
    ctx.fillStyle = "rgb(244, 114, 182)"
    ctx.fill()
  }, [canvas])

  return (
    <canvas className="absolute top-0 left-0 w-full h-full z-0 rounded-4xl" ref={canvas}/>
  )
}
