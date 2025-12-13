'use client'

import React from 'react'

import type { TestimonialsBlock as TestimonialsProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { ScrollReveal } from '@/components/ScrollReveal'

export const TestimonialsBlock: React.FC<TestimonialsProps> = ({
  sectionTitle,
  sectionDescription,
  testimonials,
}) => {
  const renderStars = (rating: number = 5) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 gradient-blue-radial opacity-5" />

      <div className="container">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials?.map((testimonial, index) => (
            <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
              <div className="glass rounded-2xl p-6 hover:glow-blue-sm transition-all duration-300 relative h-full">
              {/* Quote icon */}
              <div className="absolute -top-3 -left-3 w-10 h-10 gradient-blue rounded-full flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Rating */}
              {testimonial.rating && (
                <div className="flex gap-1 mb-4 pt-2">
                  {renderStars(testimonial.rating)}
                </div>
              )}

              {/* Quote */}
              <p className="text-foreground/90 mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                {testimonial.avatar && typeof testimonial.avatar === 'object' ? (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/30">
                    <Media
                      resource={testimonial.avatar}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full gradient-blue flex items-center justify-center text-white font-semibold">
                    {testimonial.author?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  {testimonial.role && (
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
