import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { WorkshopCard } from '@/components/WorkshopCard'
import { getLocale } from '@/utilities/getLocale'
import { t } from '@/i18n'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Workshops',
  description: 'Join our hands-on workshops and learn new skills.',
}

export default async function WorkshopsPage() {
  const locale = await getLocale()
  const payload = await getPayload({ config: configPromise })

  const workshops = await payload.find({
    collection: 'workshops',
    depth: 1,
    limit: 12,
    locale,
    overrideAccess: false,
    sort: '-date',
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-12">
        <h1 className="text-4xl font-bold mb-4">{t(locale, 'workshops.title')}</h1>
        <p className="text-lg text-muted-foreground">
          {t(locale, 'workshops.description')}
        </p>
      </div>

      <div className="container">
        {workshops.docs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workshops.docs.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t(locale, 'workshops.noWorkshops')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
