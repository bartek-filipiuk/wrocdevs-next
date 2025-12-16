'use client'

import React, { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

import type { PartnerLogosBlock as Props } from '@/payload-types'

import { Media } from '@/components/Media'
import { ScrollReveal } from '@/components/ScrollReveal'

export const PartnerLogosBlock: React.FC<Props> = ({
  sectionTitle,
  sectionDescription,
  logos,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true,
      containScroll: false,
      slidesToScroll: 1,
    },
    [
      AutoScroll({
        speed: 1,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
        playOnInit: true,
      }),
    ],
  )

  // Respect reduced motion preference
  useEffect(() => {
    if (!emblaApi) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mediaQuery.matches) {
      emblaApi.plugins()?.autoScroll?.stop()
    }
  }, [emblaApi])

  // Duplicate logos for seamless infinite loop
  const duplicatedLogos = logos && logos.length > 0 ? [...logos, ...logos] : []

  if (!logos || logos.length === 0) {
    return null
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 gradient-blue-radial opacity-5" />

      <div className="container">
        {/* Optional Header Section */}
        {(sectionTitle || sectionDescription) && (
          <ScrollReveal animation="fade-up">
            <div className="text-center mb-16">
              {sectionTitle && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-blue">
                  {sectionTitle}
                </h2>
              )}
              {sectionDescription && (
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  {sectionDescription}
                </p>
              )}
            </div>
          </ScrollReveal>
        )}

        {/* Carousel Section */}
        <ScrollReveal animation="fade">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {duplicatedLogos.map((item, index) => (
                <div
                  key={`${item.id || index}-${index}`}
                  className="flex-shrink-0 basis-full min-[480px]:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="glass rounded-2xl p-6 hover:glow-blue-sm transition-all duration-300 aspect-square flex items-center justify-center">
                    {item.logo && typeof item.logo === 'object' ? (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <Media
                          resource={item.logo}
                          imgClassName="object-contain max-w-[200px] max-h-[200px] w-full h-full"
                          alt={item.partnerName || 'Partner logo'}
                        />
                      </div>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
