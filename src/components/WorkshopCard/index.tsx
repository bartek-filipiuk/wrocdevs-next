import React from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Calendar, Clock, Users, MapPin, Monitor } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { Workshop } from '@/payload-types'
import { Media } from '@/components/Media'
import { t, defaultLocale, type Locale } from '@/i18n'
import { getLocalizedPath } from '@/utilities/getLocale'

type WorkshopCardProps = {
  workshop: Workshop
  className?: string
  locale?: Locale
}

const deliveryIcons = {
  online: Monitor,
  offline: MapPin,
  hybrid: MapPin,
}

export const WorkshopCard: React.FC<WorkshopCardProps> = ({ workshop, className, locale = defaultLocale }) => {
  const {
    title,
    slug,
    date,
    priceType,
    deliveryType,
    price,
    currency,
    duration,
    maxParticipants,
    featuredImage,
  } = workshop

  const formattedDate = date ? format(new Date(date), 'PPP p') : null
  const DeliveryIcon = deliveryIcons[deliveryType || 'offline']
  const workshopUrl = getLocalizedPath(`/workshops/${slug}`, locale)

  const getDeliveryLabel = (delivery: string) => {
    const key = `courses.delivery.${delivery}` as const
    return t(locale, key as any)
  }

  return (
    <Link
      href={workshopUrl}
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

        {/* Duration */}
        {duration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Clock className="w-4 h-4" />
            {duration}
          </div>
        )}

        {/* Delivery & Participants */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <DeliveryIcon className="w-4 h-4" />
            <span>{getDeliveryLabel(deliveryType || 'offline')}</span>
          </div>
          {maxParticipants && (
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {t(locale, 'events.maxParticipants', { count: maxParticipants })}
            </div>
          )}
        </div>

        {/* Price Badge */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'text-sm font-medium px-2 py-1 rounded',
              priceType === 'free'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-primary/10 text-primary',
            )}
          >
            {priceType === 'free' ? t(locale, 'common.free') : `${price} ${currency}`}
          </span>
        </div>
      </div>
    </Link>
  )
}
