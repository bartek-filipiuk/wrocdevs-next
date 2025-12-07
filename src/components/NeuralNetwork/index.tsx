'use client'

import React, { useEffect, useRef } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
}

export const NeuralNetwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>(0)
  const nodesRef = useRef<Node[]>([])
  const initializedRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      const width = rect.width || window.innerWidth
      const height = rect.height || window.innerHeight

      canvas.width = width
      canvas.height = height

      // Reinitialize nodes on resize if not initialized
      if (!initializedRef.current || nodesRef.current.length === 0) {
        const nodeCount = Math.floor((width * height) / 12000)
        nodesRef.current = Array.from({ length: Math.min(Math.max(nodeCount, 30), 100) }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1.5,
        }))
        initializedRef.current = true
      }
    }

    // Initial resize after a small delay to ensure container is sized
    setTimeout(resizeCanvas, 100)
    window.addEventListener('resize', resizeCanvas)

    const maxDistance = 180

    const animate = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const nodes = nodesRef.current
      if (nodes.length === 0) {
        animationRef.current = requestAnimationFrame(animate)
        return
      }

      // Update positions
      nodes.forEach((node) => {
        node.x += node.vx
        node.y += node.vy

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width) node.vx *= -1
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1

        // Keep in bounds
        node.x = Math.max(0, Math.min(canvas.width, node.x))
        node.y = Math.max(0, Math.min(canvas.height, node.y))
      })

      // Check if dark mode - check both data-theme and prefers-color-scheme
      const theme = document.documentElement.getAttribute('data-theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const isDark = theme === 'dark' || (theme === null && prefersDark)

      // Colors based on theme
      const lineColor = isDark
        ? 'rgba(255, 160, 80, '
        : 'rgba(255, 120, 50, '
      const nodeColor = isDark
        ? 'rgba(255, 180, 100, '
        : 'rgba(255, 100, 30, '

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            const opacity = (1 - distance / maxDistance) * (isDark ? 0.25 : 0.35)
            ctx.beginPath()
            ctx.strokeStyle = lineColor + opacity + ')'
            ctx.lineWidth = 1
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        // Glow effect
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius + 3, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor + (isDark ? '0.15)' : '0.2)')
        ctx.fill()

        // Core dot
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fillStyle = nodeColor + (isDark ? '0.6)' : '0.7)')
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      cancelAnimationFrame(animationRef.current)
    }
  }, [])

  return (
    <div ref={containerRef} className={`absolute inset-0 w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />
    </div>
  )
}