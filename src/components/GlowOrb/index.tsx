'use client'

import React from 'react'

interface GlowOrbProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  color?: 'blue' | 'purple' | 'cyan' | 'pink'
  position?: { top?: string; left?: string; right?: string; bottom?: string }
  animated?: boolean
  delay?: number
  className?: string
}

const sizeClasses = {
  sm: 'w-32 h-32',
  md: 'w-64 h-64',
  lg: 'w-96 h-96',
  xl: 'w-[500px] h-[500px]',
}

const colorClasses = {
  blue: 'bg-blue-400/30 dark:bg-blue-500/20',
  purple: 'bg-purple-400/30 dark:bg-purple-500/20',
  cyan: 'bg-cyan-400/30 dark:bg-cyan-500/20',
  pink: 'bg-pink-400/30 dark:bg-pink-500/20',
}

export const GlowOrb: React.FC<GlowOrbProps> = ({
  size = 'lg',
  color = 'blue',
  position,
  animated = true,
  delay = 0,
  className = '',
}) => {
  const positionStyles = position
    ? {
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }
    : {}

  return (
    <div
      className={`
        absolute rounded-full blur-3xl
        ${sizeClasses[size]}
        ${colorClasses[color]}
        ${animated ? 'animate-glow-breathe' : ''}
        ${className}
      `}
      style={{
        ...positionStyles,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

// Pre-configured glow orbs layout for hero
export const GlowOrbs: React.FC<{ animated?: boolean }> = ({ animated = true }) => {
  return (
    <>
      <GlowOrb
        size="xl"
        color="blue"
        position={{ top: '10%', left: '-5%' }}
        animated={animated}
        delay={0}
      />
      <GlowOrb
        size="lg"
        color="purple"
        position={{ top: '60%', right: '-10%' }}
        animated={animated}
        delay={1}
      />
      <GlowOrb
        size="md"
        color="cyan"
        position={{ bottom: '20%', left: '30%' }}
        animated={animated}
        delay={2}
      />
      <GlowOrb
        size="lg"
        color="pink"
        position={{ top: '30%', right: '20%' }}
        animated={animated}
        delay={1.5}
      />
    </>
  )
}
