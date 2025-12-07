import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Calendar, Clock, GraduationCap, MapPin, Monitor, User } from 'lucide-react'
import RichText from '@/components/RichText'
import { Media } from '@/components/Media'
import { generateMeta } from '@/utilities/generateMeta'
import { getLocale } from '@/utilities/getLocale'
import { t, type Locale } from '@/i18n'
import type { Course } from '@/payload-types'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const courses = await payload.find({
    collection: 'courses',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return courses.docs.map(({ slug }) => ({ slug }))
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

const levelLabels = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

const deliveryLabels = {
  online: 'Online',
  offline: 'In-Person',
  hybrid: 'Hybrid',
}

export default async function CoursePage({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const locale = await getLocale()
  const course = await queryCourseBySlug({ slug: decodeURIComponent(slug), locale })

  if (!course) return notFound()

  const {
    title,
    description,
    priceType,
    deliveryType,
    price,
    currency,
    duration,
    level,
    startDate,
    instructorName,
    address,
    city,
    country,
    featuredImage,
  } = course

  const formattedStartDate = startDate ? format(new Date(startDate), 'PPP') : null

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
        <h1 className="text-4xl font-bold mb-2">{title}</h1>

        {/* Instructor */}
        {instructorName && (
          <p className="text-lg text-muted-foreground mb-6">by {instructorName}</p>
        )}

        {/* Course Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 p-6 bg-muted rounded-lg">
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

          {/* Level */}
          {level && (
            <div className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Level</p>
                <p className="text-sm text-muted-foreground">{levelLabels[level]}</p>
              </div>
            </div>
          )}

          {/* Start Date */}
          {formattedStartDate && (
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">{formattedStartDate}</p>
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
                {deliveryLabels[deliveryType || 'online']}
              </p>
            </div>
          </div>

          {/* Location (if not online) */}
          {deliveryType !== 'online' && (address || city || country) && (
            <div className="flex items-start gap-3">
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

          {/* Instructor */}
          {instructorName && (
            <div className="flex items-start gap-3">
              <User className="w-5 h-5 mt-0.5 text-primary" />
              <div>
                <p className="font-medium">Instructor</p>
                <p className="text-sm text-muted-foreground">{instructorName}</p>
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
            {priceType === 'free' ? 'Free Course' : `${price} ${currency}`}
          </span>
        </div>

        {/* Description */}
        {description && (
          <div className="prose dark:prose-invert max-w-none">
            <h2>About This Course</h2>
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
  const course = await queryCourseBySlug({ slug: decodeURIComponent(slug), locale })
  return generateMeta({ doc: course })
}

const queryCourseBySlug = cache(async ({ slug, locale }: { slug: string; locale: Locale }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'courses',
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
