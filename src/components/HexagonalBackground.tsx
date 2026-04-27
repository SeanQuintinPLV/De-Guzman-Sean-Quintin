import { useEffect, useRef } from 'react'

function HexagonalBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mousePos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    setCanvasSize()

    // Hexagon parameters
    const hexSize = 40
    const hexWidth = hexSize * 2
    const hexHeight = (Math.sqrt(3) / 2) * hexWidth

    // Mouse tracking
    const onMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX
      mousePos.current.y = e.clientY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) {
        mousePos.current.x = e.touches[0].clientX
        mousePos.current.y = e.touches[0].clientY
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('resize', setCanvasSize)

    // Draw glow effect
    const drawGlow = (x: number, y: number, radius: number) => {
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
      gradient.addColorStop(0, 'rgba(191, 165, 106, 0.4)')
      gradient.addColorStop(0.5, 'rgba(191, 165, 106, 0.1)')
      gradient.addColorStop(1, 'rgba(191, 165, 106, 0)')

      ctx.fillStyle = gradient
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
    }

    let animationFrameId = 0
    const animate = () => {
      // Clear canvas
      ctx.fillStyle = '#04040f'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw glow at mouse position
      drawGlow(mousePos.current.x, mousePos.current.y, 150)

      // Draw hexagonal grid
      const cols = Math.ceil(canvas.width / hexWidth) + 2
      const rows = Math.ceil(canvas.height / hexHeight) + 2

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * hexWidth + (row % 2) * (hexWidth / 2)
          const y = row * hexHeight * 0.75

          // Calculate distance from mouse
          const dx = x - mousePos.current.x
          const dy = y - mousePos.current.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 300

          // Opacity based on distance
          let opacity = 0.3
          if (distance < maxDistance) {
            opacity = 0.3 + (1 - distance / maxDistance) * 0.6
          }

          // Color based on distance (golden to dim)
          ctx.save()
          ctx.globalAlpha = opacity
          if (distance < maxDistance) {
            const blend = 1 - distance / maxDistance
            ctx.strokeStyle = `rgba(${
              Math.floor(191 + (255 - 191) * blend)
            }, ${Math.floor(165 + (200 - 165) * blend)}, ${Math.floor(
              106 + (100 - 106) * blend
            )}, 1)`
          } else {
            ctx.strokeStyle = '#6b6b54'
          }
          ctx.lineWidth = distance < maxDistance ? 2 : 1
          ctx.beginPath()

          for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3
            const hx = x + hexSize * Math.cos(angle)
            const hy = y + hexSize * Math.sin(angle)
            if (i === 0) ctx.moveTo(hx, hy)
            else ctx.lineTo(hx, hy)
          }
          ctx.closePath()
          ctx.stroke()
          ctx.restore()
        }
      }

      animationFrameId = window.requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('resize', setCanvasSize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 block"
      style={{ pointerEvents: 'none' }}
    />
  )
}

export default HexagonalBackground
