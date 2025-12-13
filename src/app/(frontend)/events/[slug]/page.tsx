import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { pl, enUS } from 'date-fns/locale'
import { Calendar, MapPin, Users, ExternalLink, Clock } from 'lucide-react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { EventGallery } from '@/components/EventGallery'
import { Button } from '@/components/ui/button'
import { generateMeta } from '@/utilities/generateMeta'
import { getLocale } from '@/utilities/getLocale'
import { t, type Locale } from '@/i18n'
import type { Event } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const events = await payload.find({
    collection: 'events',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return events.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function EventPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const locale = await getLocale()
  const event = await queryEventBySlug({ slug: decodeURIComponent(slug), locale })

  if (!event) return notFound()

  const {
    title,
    description,
    startDate,
    endDate,
    eventType,
    location,
    meetingLink,
    maxParticipants,
    registrationDeadline,
    externalRegistrationUrl,
    isFree,
    price,
    currency,
    featuredImage,
    agenda,
    gallery,
  } = event

  const dateLocale = locale === 'pl' ? pl : enUS
  const formattedStartDate = startDate
    ? format(new Date(startDate), 'PPP p', { locale: dateLocale })
    : null
  const formattedEndDate = endDate
    ? format(new Date(endDate), 'PPP p', { locale: dateLocale })
    : null
  const formattedDeadline = registrationDeadline
    ? format(new Date(registrationDeadline), 'PPP p', { locale: dateLocale })
    : null

  return (
    <article className="pt-16 pb-24">
      <div className="container max-w-4xl">
        {/* Hero Image */}
        {featuredImage && typeof featuredImage === 'object' && (
          <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
            <Media resource={featuredImage} className="object-cover w-full h-full" />
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold mb-6">{title}</h1>

        {/* Event Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-muted rounded-lg">
          {/* Date & Time */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 mt-0.5 text-primary" />
            <div>
              <p className="font-medium">{t(locale, 'events.dateTime')}</p>
              <p className="text-sm text-muted-foreground">{formattedStartDate}</p>
              {formattedEndDate && (
                <p className="text-sm text-muted-foreground">
                  {locale === 'pl' ? 'do' : 'to'} {formattedEndDate}
                </p>
              )}
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-3">
            {eventType === 'online' ? (
              <ExternalLink className="w-5 h-5 mt-0.5 text-primary" />
            ) : (
              <MapPin className="w-5 h-5 mt-0.5 text-primary" />
            )}
            <div>
              <p className="font-medium">{t(locale, 'events.location')}</p>
              {eventType === 'online' ? (
                <p className="text-sm text-muted-foreground">{t(locale, 'events.onlineEvent')}</p>
              ) : (
                <>
                  {location?.address && (
                    <p className="text-sm text-muted-foreground">{location.address}</p>
                  )}
                  {(location?.city || location?.country) && (
                    <p className="text-sm text-muted-foreground">
                      {[location?.city, location?.country].filter(Boolean).join(', ')}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Participants */}
          {maxParticipants && (
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">{t(locale, 'events.capacity')}</p>
                <p className="text-sm text-muted-foreground">
                  {t(locale, 'events.maxParticipants', { count: maxParticipants })}
                </p>
              </div>
            </div>
          )}

          {/* Registration Deadline */}
          {formattedDeadline && (
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">{t(locale, 'events.registrationDeadline')}</p>
                <p className="text-sm text-muted-foreground">{formattedDeadline}</p>
              </div>
            </div>
          )}
        </div>

        {/* Price & Registration */}
        <div className="flex flex-wrap items-center gap-4 mb-8">
          <span
            className={`text-lg font-semibold px-4 py-2 rounded ${
              isFree
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-primary/10 text-primary'
            }`}
          >
            {isFree ? t(locale, 'events.freeEvent') : `${price} ${currency}`}
          </span>

          {externalRegistrationUrl && (
            <Button asChild>
              <a href={externalRegistrationUrl} target="_blank" rel="noopener noreferrer">
                {t(locale, 'common.registerNow')}
              </a>
            </Button>
          )}

          {meetingLink && eventType !== 'offline' && (
            <Button variant="outline" asChild>
              <a href={meetingLink} target="_blank" rel="noopener noreferrer">
                {t(locale, 'common.joinOnline')}
              </a>
            </Button>
          )}
        </div>

        {/* Description */}
        {description && (
          <div className="prose dark:prose-invert max-w-none">
            <h2>{t(locale, 'events.aboutEvent')}</h2>
            <RichText data={description} />
          </div>
        )}

        {/* Agenda Section */}
        {agenda && agenda.length > 0 && (
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-8 text-gradient-blue">{t(locale, 'events.agenda')}</h2>
            <div className="glass rounded-2xl p-8 space-y-6">
              {agenda.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-6 items-start pb-6 border-b border-border/50 last:border-0 last:pb-0"
                >
                  {/* Time Badge */}
                  <div className="flex-shrink-0 w-20 h-20 gradient-blue rounded-xl flex items-center justify-center text-white shadow-lg">
                    <span className="text-lg font-bold">{item.startTime}</span>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl md:text-2xl">{item.title}</h3>
                    {item.speaker && (
                      <p className="text-base text-muted-foreground flex items-center gap-2 mt-2">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {item.speaker}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-base text-muted-foreground mt-3">{item.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery Section */}
        <EventGallery
          images={gallery}
          title={t(locale, 'events.gallery')}
          emptyText={t(locale, 'events.noGalleryImages')}
        />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const locale = await getLocale()
  const event = await queryEventBySlug({ slug: decodeURIComponent(slug), locale })
  return generateMeta({ doc: event })
}

const queryEventBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'events',
    draft,
    limit: 1,
    locale,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
