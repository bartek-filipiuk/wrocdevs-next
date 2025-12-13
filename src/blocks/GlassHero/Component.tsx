'use client'

import React, { useEffect, useState } from 'react'

import type { GlassHeroBlock as GlassHeroProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { StaticNeuralNetwork } from '@/components/StaticNeuralNetwork'
import { TypeWriter } from '@/components/TypeWriter'
import { ParallaxLayer, ParallaxContainer, StarField } from '@/components/ParallaxLayers'
import { GlowOrbs } from '@/components/GlowOrb'
import { FloatingShapes } from '@/components/FloatingShapes'

export const GlassHeroBlock: React.FC<GlassHeroProps> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundMedia,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Trigger entrance animation after mount
    const timer = setTimeout(() => setIsVisible(true), 100)
    const contentTimer = setTimeout(() => setShowContent(true), 600)
    return () => {
      clearTimeout(timer)
      clearTimeout(contentTimer)
    }
  }, [])

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden -mt-16">
      {/* Background gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

      {/* Parallax layers */}
      {backgroundMedia && typeof backgroundMedia === 'object' ? (
        <div className="absolute inset-0">
          <Media
            resource={backgroundMedia}
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <ParallaxContainer>
          {/* Layer 1: Star field (furthest, slowest) */}
          <ParallaxLayer speed={0.1}>
            <StarField count={80} />
          </ParallaxLayer>

          {/* Layer 2: Glow orbs */}
          <ParallaxLayer speed={0.25}>
            <GlowOrbs animated />
          </ParallaxLayer>

          {/* Layer 3: Neural network */}
          <ParallaxLayer speed={0.4}>
            <StaticNeuralNetwork />
          </ParallaxLayer>

          {/* Layer 4: Floating shapes (closest, fastest) */}
          <ParallaxLayer speed={0.6}>
            <FloatingShapes />
          </ParallaxLayer>
        </ParallaxContainer>
      )}

      {/* Glass card content with entrance animation */}
      <div className="container relative z-10">
        <div
          className={`
            glass-strong rounded-3xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto text-center
            gradient-border animate-glow-pulse
            transition-all duration-700 ease-out
            ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}
          `}
        >
          {headline && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-blue min-h-[1.2em]">
              {showContent ? (
                <TypeWriter text={headline} speed={40} delay={200} cursor />
              ) : (
                <span className="invisible">{headline}</span>
              )}
            </h1>
          )}

          {subheadline && (
            <div
              className={`
                text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto
                transition-all duration-500 delay-500
                ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <RichText data={subheadline} enableGutter={false} />
            </div>
          )}

          <div
            className={`
              flex flex-col sm:flex-row gap-4 justify-center
              transition-all duration-500 delay-700
              ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            {primaryCTA && primaryCTA.label && (
              <CMSLink
                {...primaryCTA}
                size="lg"
                className="gradient-blue text-white hover:opacity-90 transition-all duration-300 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105"
              />
            )}
            {secondaryCTA && secondaryCTA.label && (
              <CMSLink
                {...secondaryCTA}
                size="lg"
                className="glass border-white/30 hover:bg-white/20 transition-all duration-300 px-8 py-4 rounded-xl font-semibold hover:scale-105"
              />
            )}
          </div>
        </div>
      </div>

      {/* Decorative scroll indicator */}
      <div
        className={`
          absolute bottom-10 left-1/2 -translate-x-1/2 animate-float
          transition-opacity duration-500 delay-1000
          ${showContent ? 'opacity-100' : 'opacity-0'}
        `}
      >
        <svg
          className="w-6 h-10 text-primary/60"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  )
}
