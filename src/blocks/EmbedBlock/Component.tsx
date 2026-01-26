'use client'

import React from 'react'
import { ScrollReveal } from '@/components/ScrollReveal'
import type { EmbedBlock as EmbedBlockProps } from '@/payload-types'

type Props = EmbedBlockProps & {
  className?: string
}

export const EmbedBlock: React.FC<Props> = (props) => {
  const {
    headline,
    description,
    embedType = 'iframe',
    embedUrl,
    htmlCode,
    title,
    width = 600,
    height = 660,
  } = props

  // Require either embedUrl (for iframe) or htmlCode (for html)
  if (embedType === 'html' && !htmlCode) return null
  if (embedType !== 'html' && !embedUrl) return null

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10 gradient-blue opacity-90" />

      {/* Decorative blur orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/10 rounded-full filter blur-3xl" />
      </div>

      <div className="container relative z-10">
        <ScrollReveal animation="fade-up">
          {/* Headline and description */}
          {(headline || description) && (
            <div className="text-center mb-10">
              {headline && (
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                  {headline}
                </h2>
              )}
              {description && (
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}

          {/* Embed in glass container */}
          <div className="glass-dark rounded-3xl p-6 md:p-10 max-w-3xl mx-auto">
            {embedType === 'html' && htmlCode ? (
              <div
                className="embed-html-content"
                dangerouslySetInnerHTML={{ __html: htmlCode }}
              />
            ) : (
              <iframe
                src={embedUrl!}
                width={width}
                height={height}
                frameBorder="0"
                style={{
                  border: 'none',
                  borderRadius: '12px',
                  maxWidth: '100%',
                  display: 'block',
                  margin: '0 auto',
                }}
                allow="fullscreen; payment"
                aria-hidden="false"
                aria-label={title || 'Embedded content'}
                tabIndex={0}
                title={title || 'Embedded content'}
              />
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
