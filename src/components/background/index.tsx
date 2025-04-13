import { useEffect, useRef } from 'react'

interface MatrixBackgroundProps {
  speed?: number
}

const MatrixBackground = ({ speed = 1 }: MatrixBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const dropsRef = useRef<number[]>([])
  const lastTime = useRef(0)
  const characters = '01'
  const fontSize = 14

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const spacing = fontSize * 4
      const columns = Math.ceil(canvas.width / spacing)
      dropsRef.current = Array(columns).fill(1)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let animationFrameId: number

    const animate = () => {
      const currentTime = Date.now()
      const deltaTime = currentTime - lastTime.current

      if (deltaTime > 30) {
        lastTime.current = currentTime

        ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#00FF00'
        ctx.font = `${fontSize}px monospace`

        dropsRef.current.forEach((drop, i) => {
          const text = characters.charAt(
            Math.floor(Math.random() * characters.length)
          )
          const x = i * (fontSize * 4)
          const y = drop * fontSize

          ctx.fillText(text, x, y)

          for (let j = 0; j < 5; j++) {
            const opacity = (5 - j) / 5
            ctx.fillStyle = `rgba(0, 255, 0, ${opacity * 0.5})`
            ctx.fillText(text, x, y - j * fontSize)
          }

          if (y > canvas.height && Math.random() > 0.975) {
            dropsRef.current[i] = 0
          }
          dropsRef.current[i] += speed * (deltaTime / 30)
        })
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [speed])

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-black">
        <canvas ref={canvasRef} />
      </div>
      <div className="absolute top-0 left-0 w-full h-full -z-9 bg-black/60" />
    </>
  )
}

export default MatrixBackground
