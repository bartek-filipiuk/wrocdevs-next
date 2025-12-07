import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Calendar, Clock, MapPin, Monitor, Users } from 'lucide-react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { generateMeta } from '@/utilities/generateMeta'
import { getLocale } from '@/utilities/getLocale'
import { t, type Locale } from '@/i18n'
import type { Workshop } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const workshops = await payload.find({
    collection: 'workshops',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return workshops.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const deliveryLabels = {
  online: 'Online',
  offline: 'In-Person',
  hybrid: 'Hybrid',
}

export default async function WorkshopPage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const locale = await getLocale()
  const workshop = await queryWorkshopBySlug({ slug: decodeURIComponent(slug), locale })

  if (!workshop) return notFound()

  const {
    title,
    description,
    date,
    priceType,
    deliveryType,
    price,
    currency,
    duration,
    maxParticipants,
    address,
    city,
    country,
    featuredImage,
  } = workshop

  const formattedDate = date ? format(new Date(date), 'PPP p') : null

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

        {/* Workshop Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-muted rounded-lg">
          {/* Date & Time */}
          {formattedDate && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Date & Time</p>
                <p className="text-sm text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
          )}

          {/* Duration */}
          {duration && (
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Duration</p>
                <p className="text-sm text-muted-foreground">{duration}</p>
              </div>
            </div>
          )}

          {/* Delivery Type */}
          <div className="flex items-start gap-3">
            {deliveryType === 'online' ? (
              <Monitor className="w-5 h-5 mt-0.5 text-primary" />
            ) : (
              <MapPin className="w-5 h-5 mt-0.5 text-primary" />
            )}
            <div>
              <p className="font-medium">Delivery</p>
              <p className="text-sm text-muted-foreground">
                {deliveryLabels[deliveryType || 'offline']}
              </p>
            </div>
          </div>

          {/* Max Participants */}
          {maxParticipants && (
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Capacity</p>
                <p className="text-sm text-muted-foreground">Max {maxParticipants} participants</p>
              </div>
            </div>
          )}

          {/* Location (if not online) */}
          {deliveryType !== 'online' && (address || city || country) && (
            <div className="flex items-start gap-3 md:col-span-2">
              <MapPin className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Location</p>
                {address && <p className="text-sm text-muted-foreground">{address}</p>}
                {(city || country) && (
                  <p className="text-sm text-muted-foreground">
                    {[city, country].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-8">
          <span
            className={`text-lg font-semibold px-4 py-2 rounded ${
              priceType === 'free'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-primary/10 text-primary'
            }`}
          >
            {priceType === 'free' ? 'Free Workshop' : `${price} ${currency}`}
          </span>
        </div>

        {/* Description */}
        {description && (
          <div className="prose dark:prose-invert max-w-none">
            <h2>About This Workshop</h2>
            <RichText data={description} />
          </div>
        )}
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const locale = await getLocale()
  const workshop = await queryWorkshopBySlug({ slug: decodeURIComponent(slug), locale })
  return generateMeta({ doc: workshop })
}

const queryWorkshopBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'workshops',
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
