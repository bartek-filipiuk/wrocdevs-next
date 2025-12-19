'use client'

import React, { useState, useEffect, useRef } from 'react'

interface TypeWriterProps {
  text: string
  speed?: number // ms per character
  delay?: number // initial delay before typing starts
  cursor?: boolean
  cursorChar?: string
  className?: string
  onComplete?: () => void
}

export const TypeWriter: React.FC<TypeWriterProps> = ({
  text,
  speed = 50,
  delay = 0,
  cursor = true,
  cursorChar = '|',
  className = '',
  onComplete,
}) => {
  const [mounted, setMounted] = useState(false)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [showCursor, setShowCursor] = useState(true)
  const indexRef = useRef(0)
  const hasStartedRef = useRef(false)

  // Mount check to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Reset when text changes
    setDisplayedText('')
    indexRef.current = 0
    hasStartedRef.current = false
    setIsTyping(false)

    const startDelay = setTimeout(() => {
      hasStartedRef.current = true
      setIsTyping(true)
    }, delay)

    return () => clearTimeout(startDelay)
  }, [text, delay])

  useEffect(() => {
    if (!isTyping || !hasStartedRef.current) return

    if (indexRef.current < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, indexRef.current + 1))
        indexRef.current += 1
      }, speed)

      return () => clearTimeout(timeout)
    } else {
      setIsTyping(false)
      onComplete?.()
    }
  }, [isTyping, displayedText, text, speed, onComplete])

  // Cursor blink effect
  useEffect(() => {
    if (!cursor) return

    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => clearInterval(blinkInterval)
  }, [cursor])

  // On server, render empty to match initial client state
  if (!mounted) {
    return (
      <span className={className} aria-label={text}>
        <span aria-hidden="true">
          {cursor && (
            <span className="inline-block ml-0.5 opacity-100">
              {cursorChar}
            </span>
          )}
        </span>
      </span>
    )
  }

  return (
    <span className={className} aria-label={text}>
      <span aria-hidden="true">
        {displayedText}
        {cursor && (
          <span
            className={`inline-block ml-0.5 transition-opacity duration-100 ${
              showCursor ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {cursorChar}
          </span>
        )}
      </span>
    </span>
  )
}
