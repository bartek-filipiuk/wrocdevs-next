'use client'

import React from 'react'

import type { UpcomingEventsBlock as EventsProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import { ScrollReveal } from '@/components/ScrollReveal'

export const UpcomingEventsBlock: React.FC<EventsProps> = ({
  sectionTitle,
  sectionDescription,
  events,
  viewAllLink,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      time: date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    }
  }

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent via-primary/5 to-transparent">
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
          {events?.map((event, index) => {
            const dateInfo = event.date ? formatDate(event.date) : null

            return (
              <ScrollReveal key={index} animation="fade-up" delay={index * 100}>
                <div className="glass rounded-2xl overflow-hidden hover:glow-blue-sm transition-all duration-300 hover:-translate-y-1 group h-full">
                {/* Image */}
                {event.image && typeof event.image === 'object' && (
                  <div className="relative h-48 overflow-hidden">
                    <Media
                      resource={event.image}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex gap-4">
                    {/* Date badge */}
                    {dateInfo && (
                      <div className="flex-shrink-0 w-16 h-16 gradient-blue rounded-xl flex flex-col items-center justify-center text-white shadow-lg">
                        <span className="text-2xl font-bold leading-none">{dateInfo.day}</span>
                        <span className="text-xs uppercase">{dateInfo.month}</span>
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold mb-1 truncate">{event.title}</h3>
                      {dateInfo && (
                        <p className="text-sm text-muted-foreground">{dateInfo.time}</p>
                      )}
                      {event.location && (
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {event.description && (
                    <p className="text-muted-foreground mt-4 line-clamp-2">{event.description}</p>
                  )}

                  {event.link?.label && (
                    <div className="mt-4">
                      <CMSLink
                        {...event.link}
                        appearance="inline"
                        className="text-primary hover:text-accent font-medium inline-flex items-center gap-1"
                      />
                    </div>
                  )}
                </div>
              </div>
              </ScrollReveal>
            )
          })}
        </div>

        {viewAllLink?.label && (
          <ScrollReveal animation="fade-up">
            <div className="text-center mt-12">
              <CMSLink
                {...viewAllLink}
                size="lg"
                className="gradient-blue text-white hover:opacity-90 transition-opacity px-8 py-3 rounded-xl font-semibold shadow-lg inline-flex items-center gap-2"
              />
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
