import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { EventCard } from '@/components/EventCard'
import { getLocale } from '@/utilities/getLocale'
import { t } from '@/i18n'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Events',
  description: 'Browse our upcoming events, meetups, and gatherings.',
}

export default async function EventsPage() {
  const locale = await getLocale()
  const payload = await getPayload({ config: configPromise })

  const events = await payload.find({
    collection: 'events',
    depth: 1,
    limit: 12,
    locale,
    overrideAccess: false,
    sort: '-startDate',
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-12">
        <h1 className="text-4xl font-bold mb-4">{t(locale, 'events.title')}</h1>
        <p className="text-lg text-muted-foreground">
          {t(locale, 'events.description')}
        </p>
      </div>

      <div className="container">
        {events.docs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.docs.map((event) => (
              <EventCard key={event.id} event={event} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t(locale, 'events.noEvents')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
