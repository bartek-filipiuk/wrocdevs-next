import React from 'react'

import type { GlassHeroBlock as GlassHeroProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { StaticNeuralNetwork } from '@/components/StaticNeuralNetwork'

export const GlassHeroBlock: React.FC<GlassHeroProps> = ({
  headline,
  subheadline,
  primaryCTA,
  secondaryCTA,
  backgroundMedia,
}) => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background layer */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />

      {/* Neural network background */}
      <div className="absolute inset-0">
        {backgroundMedia && typeof backgroundMedia === 'object' ? (
          <Media
            resource={backgroundMedia}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <>
            {/* Gradient orbs for depth */}
            <div className="absolute top-20 left-10 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-80 h-80 bg-sky-400/20 dark:bg-sky-500/10 rounded-full blur-3xl" />
            {/* Static neural network */}
            <StaticNeuralNetwork />
          </>
        )}
      </div>

      {/* Glass card content */}
      <div className="container relative z-10">
        <div className="glass-strong rounded-3xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto text-center glow-blue">
          {headline && (
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gradient-blue">
              {headline}
            </h1>
          )}

          {subheadline && (
            <div className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              <RichText data={subheadline} enableGutter={false} />
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && primaryCTA.label && (
              <CMSLink
                {...primaryCTA}
                size="lg"
                className="gradient-blue text-white hover:opacity-90 transition-opacity px-8 py-4 rounded-xl font-semibold shadow-lg"
              />
            )}
            {secondaryCTA && secondaryCTA.label && (
              <CMSLink
                {...secondaryCTA}
                size="lg"
                className="glass border-white/30 hover:bg-white/20 transition-colors px-8 py-4 rounded-xl font-semibold"
              />
            )}
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
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
