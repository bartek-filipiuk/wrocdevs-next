import React from 'react'
import Link from 'next/link'
import { Clock, GraduationCap, MapPin, Monitor } from 'lucide-react'
import { cn } from '@/utilities/ui'
import type { Course } from '@/payload-types'
import { Media } from '@/components/Media'
import { t, defaultLocale, type Locale } from '@/i18n'
import { getLocalizedPath } from '@/utilities/getLocale'

type CourseCardProps = {
  course: Course
  className?: string
  locale?: Locale
}

const deliveryIcons = {
  online: Monitor,
  offline: MapPin,
  hybrid: GraduationCap,
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, className, locale = defaultLocale }) => {
  const {
    title,
    slug,
    priceType,
    deliveryType,
    price,
    currency,
    duration,
    level,
    featuredImage,
    instructorName,
  } = course

  const DeliveryIcon = deliveryIcons[deliveryType || 'online']
  const courseUrl = getLocalizedPath(`/courses/${slug}`, locale)

  const getLevelLabel = (lvl: string) => {
    const key = `courses.levels.${lvl}` as const
    return t(locale, key as any)
  }

  const getDeliveryLabel = (delivery: string) => {
    const key = `courses.delivery.${delivery}` as const
    return t(locale, key as any)
  }

  return (
    <Link
      href={courseUrl}
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

        {/* Instructor */}
        {instructorName && (
          <p className="text-sm text-muted-foreground mb-2">{instructorName}</p>
        )}

        {/* Duration & Level */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          {duration && (
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {duration}
            </div>
          )}
          {level && (
            <div className="flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              {getLevelLabel(level)}
            </div>
          )}
        </div>

        {/* Delivery Type */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <DeliveryIcon className="w-4 h-4" />
          <span>{getDeliveryLabel(deliveryType || 'online')}</span>
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
