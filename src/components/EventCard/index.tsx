import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { Event } from '@/payload-types'
import { Media } from '@/components/Media'
import { t, defaultLocale, type Locale } from '@/i18n'
import { getLocalizedPath } from '@/utilities/getLocale'

type EventCardProps = {
  event: Event
  className?: string
  locale?: Locale
}

export const EventCard: React.FC<EventCardProps> = ({ event, className, locale = defaultLocale }) => {
  const {
    title,
    slug,
    startDate,
    eventType,
    location,
    isFree,
    price,
    currency,
    featuredImage,
    maxParticipants,
  } = event

  const formattedDate = startDate ? format(new Date(startDate), 'PPP p') : null
  const eventUrl = getLocalizedPath(`/events/${slug}`, locale)

  return (
    <Link
      href={eventUrl}
      className={cn(
        'group block bg-card rounded-lg border overflow-hidden hover:shadow-lg transition-shadow',
        className,
      )}
    >
      {/* Image */}
      {featuredImage && typeof featuredImage === 'object' && (
        <div className="aspect-video relative overflow-hidden">
          <Media
            resource={featuredImage}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="font-semibold text-xl md:text-2xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Date */}
        {formattedDate && (
          <div className="flex items-center gap-2 text-base text-muted-foreground mb-3">
            <Calendar className="w-5 h-5" />
            {formattedDate}
          </div>
        )}

        {/* Location/Type */}
        <div className="flex items-center gap-2 text-base text-muted-foreground mb-3">
          {eventType === 'online' ? (
            <>
              <ExternalLink className="w-5 h-5" />
              {t(locale, 'events.onlineEvent')}
            </>
          ) : (
            <>
              <MapPin className="w-5 h-5" />
              {location?.city || t(locale, 'events.location')}
            </>
          )}
        </div>

        {/* Max Participants */}
        {maxParticipants && (
          <div className="flex items-center gap-2 text-base text-muted-foreground mb-4">
            <Users className="w-5 h-5" />
            {t(locale, 'events.maxParticipants', { count: maxParticipants })}
          </div>
        )}

        {/* Price Badge */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'text-base font-medium px-3 py-1.5 rounded',
              isFree ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-primary/10 text-primary',
            )}
          >
            {isFree ? t(locale, 'common.free') : `${price} ${currency}`}
          </span>
          <span className="text-sm text-muted-foreground capitalize">{eventType}</span>
        </div>
      </div>
    </Link>
  )
}
