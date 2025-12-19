'use client'

import React, { useEffect, useRef, useState, ReactNode } from 'react'

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'scale-up'

interface ScrollRevealProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number // ms delay before animation
  duration?: number // animation duration in ms
  threshold?: number // 0-1, how much visible before triggering
  once?: boolean // only animate once (default true)
  className?: string
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
  className = '',
}) => {
  const [mounted, setMounted] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Mount check to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [mounted])

  useEffect(() => {
    // If user prefers reduced motion, show content immediately
    if (prefersReducedMotion) {
      setIsRevealed(true)
      return
    }

    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsRevealed(true)
            if (once) {
              observer.unobserve(element)
            }
          } else if (!once) {
            setIsRevealed(false)
          }
        })
      },
      {
        threshold,
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before element fully enters
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [threshold, once, prefersReducedMotion])

  // Before mount or if reduced motion, render without animation styles
  // This ensures server and initial client render match
  if (!mounted || prefersReducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${isRevealed ? 'revealed' : ''} ${className}`}
      data-animation={animation}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  )
}
