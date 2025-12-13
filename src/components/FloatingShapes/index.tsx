'use client'

import React from 'react'

interface FloatingShapeProps {
  type: 'circle' | 'hexagon' | 'triangle' | 'square' | 'ring'
  size?: number
  position: { top?: string; left?: string; right?: string; bottom?: string }
  delay?: number
  duration?: number
  className?: string
}

const ShapeSVG: React.FC<{ type: FloatingShapeProps['type']; size: number }> = ({ type, size }) => {
  const strokeColor = 'currentColor'
  const strokeWidth = 1.5

  switch (type) {
    case 'circle':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="18" stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      )
    case 'hexagon':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <path
            d="M20 2L36.6 11V29L20 38L3.4 29V11L20 2Z"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </svg>
      )
    case 'triangle':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <path d="M20 4L36 36H4L20 4Z" stroke={strokeColor} strokeWidth={strokeWidth} />
        </svg>
      )
    case 'square':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <rect
            x="4"
            y="4"
            width="32"
            height="32"
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            transform="rotate(15 20 20)"
          />
        </svg>
      )
    case 'ring':
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="16" stroke={strokeColor} strokeWidth={strokeWidth} />
          <circle cx="20" cy="20" r="10" stroke={strokeColor} strokeWidth={strokeWidth * 0.5} />
        </svg>
      )
    default:
      return null
  }
}

export const FloatingShape: React.FC<FloatingShapeProps> = ({
  type,
  size = 40,
  position,
  delay = 0,
  duration = 8,
  className = '',
}) => {
  const positionStyles = {
    top: position.top,
    left: position.left,
    right: position.right,
    bottom: position.bottom,
  }

  return (
    <div
      className={`absolute text-blue-400/30 dark:text-blue-300/20 animate-float-gentle ${className}`}
      style={{
        ...positionStyles,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
      }}
    >
      <ShapeSVG type={type} size={size} />
    </div>
  )
}

// Pre-configured floating shapes layout for hero
export const FloatingShapes: React.FC = () => {
  return (
    <>
      <FloatingShape type="hexagon" size={60} position={{ top: '15%', left: '10%' }} delay={0} duration={10} />
      <FloatingShape type="circle" size={30} position={{ top: '25%', right: '15%' }} delay={1} duration={8} />
      <FloatingShape type="triangle" size={45} position={{ bottom: '30%', left: '20%' }} delay={2} duration={12} />
      <FloatingShape type="ring" size={50} position={{ top: '50%', right: '25%' }} delay={0.5} duration={9} />
      <FloatingShape type="square" size={35} position={{ bottom: '20%', right: '10%' }} delay={1.5} duration={11} />
      <FloatingShape type="hexagon" size={25} position={{ top: '70%', left: '5%' }} delay={2.5} duration={7} />
      <FloatingShape type="circle" size={40} position={{ top: '10%', right: '35%' }} delay={3} duration={10} />
      <FloatingShape type="triangle" size={30} position={{ bottom: '40%', right: '40%' }} delay={0.8} duration={9} />
    </>
  )
}
