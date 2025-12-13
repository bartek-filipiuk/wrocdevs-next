'use client'

import React, { useEffect, useRef, useState, ReactNode } from 'react'

interface ParallaxLayerProps {
  speed: number // 0 = stationary, 1 = moves with scroll
  children: ReactNode
  className?: string
}

export const ParallaxLayer: React.FC<ParallaxLayerProps> = ({
  speed,
  children,
  className = '',
}) => {
  const [offset, setOffset] = useState(0)
  const layerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          setOffset(scrollY * speed)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [speed])

  return (
    <div
      ref={layerRef}
      className={`absolute inset-0 will-change-transform ${className}`}
      style={{
        transform: `translateY(${offset}px)`,
      }}
    >
      {children}
    </div>
  )
}

interface ParallaxContainerProps {
  children: ReactNode
  className?: string
}

export const ParallaxContainer: React.FC<ParallaxContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {children}
    </div>
  )
}

// Star field background component
export const StarField: React.FC<{ count?: number }> = ({ count = 100 }) => {
  const [stars, setStars] = useState<Array<{ x: number; y: number; size: number; opacity: number }>>([])

  useEffect(() => {
    const newStars = Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.5 + 0.2,
    }))
    setStars(newStars)
  }, [count])

  return (
    <div className="absolute inset-0">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white dark:bg-blue-200 animate-twinkle"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}
    </div>
  )
}
