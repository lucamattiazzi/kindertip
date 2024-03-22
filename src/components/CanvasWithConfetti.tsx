import { useEffect, useRef } from "react"

const CONFETTI_WIDTH = 16 * 2
const CONFETTI_HEIGHT = 6 * 2
const CONFETTI_COUNT = 100

function generateConfetti(): [number, number, number][] {
  return Array.from({ length: CONFETTI_COUNT }, () => [
    Math.random(),
    Math.random(),
    Math.random() * Math.PI * 2
  ])
}


export function CanvasWithConfetti() {
  const canvas = useRef<HTMLCanvasElement>(null)


  useEffect(() => {
    if (!canvas.current) return
    const ctx = canvas.current.getContext("2d")
    if (!ctx) return
    ctx.canvas.width = 2 * canvas.current.clientWidth
    ctx.canvas.height = 2 * canvas.current.clientHeight
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    const confetti = generateConfetti()
    for (const [x, y, angle] of confetti) {
      ctx.beginPath()
      ctx.save()
      ctx.translate(x * ctx.canvas.width + CONFETTI_WIDTH / 2 , y * ctx.canvas.height + CONFETTI_HEIGHT / 2)
      ctx.rotate(angle)
      ctx.fillStyle = "rgb(59, 130, 246)"
      ctx.fillRect(-CONFETTI_WIDTH / 2, -CONFETTI_HEIGHT / 2, CONFETTI_WIDTH, CONFETTI_HEIGHT)
      ctx.restore()
    }
  }, [canvas])

  return (
    <canvas className="absolute top-0 left-0 w-full h-full z-0 rounded-4xl" ref={canvas}/>
  )
}
