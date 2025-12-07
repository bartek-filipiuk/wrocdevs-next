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
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>

        {/* Date */}
        {formattedDate && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="w-4 h-4" />
            {formattedDate}
          </div>
        )}

        {/* Location/Type */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          {eventType === 'online' ? (
            <>
              <ExternalLink className="w-4 h-4" />
              {t(locale, 'events.onlineEvent')}
            </>
          ) : (
            <>
              <MapPin className="w-4 h-4" />
              {location?.city || t(locale, 'events.location')}
            </>
          )}
        </div>

        {/* Max Participants */}
        {maxParticipants && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <Users className="w-4 h-4" />
            {t(locale, 'events.maxParticipants', { count: maxParticipants })}
          </div>
        )}

        {/* Price Badge */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'text-sm font-medium px-2 py-1 rounded',
              isFree ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-primary/10 text-primary',
            )}
          >
            {isFree ? t(locale, 'common.free') : `${price} ${currency}`}
          </span>
          <span className="text-xs text-muted-foreground capitalize">{eventType}</span>
        </div>
      </div>
    </Link>
  )
}
