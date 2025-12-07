'use client'

import React, { useEffect, useRef, useCallback } from 'react'

interface Node {
  x: number
  y: number
  vx: number
  vy: number
}

const NODE_COUNT = 70
const MAX_DISTANCE = 150
const SPEED = 0.15 // Very slow movement
const DOT_RADIUS = 1.5
const GLOW_RADIUS = 3
const LINE_WIDTH = 0.4
const MAX_LINE_OPACITY = 0.15
const WIDTH = 1080
const HEIGHT = 540

// Initialize nodes with random positions and velocities
const createNodes = (): Node[] => {
  const nodes: Node[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    const angle = Math.random() * Math.PI * 2
    nodes.push({
      x: Math.random() * WIDTH,
      y: Math.random() * HEIGHT,
      vx: Math.cos(angle) * SPEED,
      vy: Math.sin(angle) * SPEED,
    })
  }
  return nodes
}

export const StaticNeuralNetwork: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<SVGSVGElement>(null)
  const nodesRef = useRef<Node[]>(createNodes())
  const animationRef = useRef<number>()
  const linesRef = useRef<SVGGElement>(null)
  const dotsRef = useRef<SVGGElement>(null)

  const updatePositions = useCallback(() => {
    const nodes = nodesRef.current

    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]

      // Update position
      node.x += node.vx
      node.y += node.vy

      // Wrap around edges smoothly
      if (node.x < -10) node.x = WIDTH + 10
      if (node.x > WIDTH + 10) node.x = -10
      if (node.y < -10) node.y = HEIGHT + 10
      if (node.y > HEIGHT + 10) node.y = -10

      // Occasionally add slight randomness to velocity for organic feel
      if (Math.random() < 0.002) {
        const angle = Math.random() * Math.PI * 2
        node.vx = Math.cos(angle) * SPEED
        node.vy = Math.sin(angle) * SPEED
      }
    }
  }, [])

  const render = useCallback(() => {
    const nodes = nodesRef.current
    const linesGroup = linesRef.current
    const dotsGroup = dotsRef.current

    if (!linesGroup || !dotsGroup) return

    // Clear and rebuild lines
    const lineElements: string[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x
        const dy = nodes[i].y - nodes[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < MAX_DISTANCE) {
          const opacity = (1 - distance / MAX_DISTANCE) * MAX_LINE_OPACITY
          lineElements.push(
            `<line x1="${nodes[i].x}" y1="${nodes[i].y}" x2="${nodes[j].x}" y2="${nodes[j].y}" stroke="currentColor" stroke-width="${LINE_WIDTH}" opacity="${opacity.toFixed(3)}" />`
          )
        }
      }
    }
    linesGroup.innerHTML = lineElements.join('')

    // Update dot positions
    const dotElements: string[] = []
    for (let i = 0; i < nodes.length; i++) {
      const node = nodes[i]
      dotElements.push(
        `<circle cx="${node.x}" cy="${node.y}" r="${GLOW_RADIUS}" class="fill-blue-400/10 dark:fill-blue-500/10" />` +
        `<circle cx="${node.x}" cy="${node.y}" r="${DOT_RADIUS}" class="fill-blue-500/60 dark:fill-blue-400/60" />`
      )
    }
    dotsGroup.innerHTML = dotElements.join('')
  }, [])

  const animate = useCallback(() => {
    updatePositions()
    render()
    animationRef.current = requestAnimationFrame(animate)
  }, [updatePositions, render])

  useEffect(() => {
    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [animate])

  return (
    <svg
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full text-blue-400 dark:text-blue-500 ${className}`}
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      style={{ pointerEvents: 'none', willChange: 'contents' }}
    >
      {/* Connection lines */}
      <g ref={linesRef} className="neural-lines" />

      {/* Nodes */}
      <g ref={dotsRef} className="neural-nodes" />
    </svg>
  )
}
