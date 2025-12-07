import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { CourseCard } from '@/components/CourseCard'
import { getLocale } from '@/utilities/getLocale'
import { t } from '@/i18n'

export const dynamic = 'force-static'
export const revalidate = 600

export const metadata: Metadata = {
  title: 'Courses',
  description: 'Browse our courses and start learning today.',
}

export default async function CoursesPage() {
  const locale = await getLocale()
  const payload = await getPayload({ config: configPromise })

  const courses = await payload.find({
    collection: 'courses',
    depth: 1,
    limit: 12,
    locale,
    overrideAccess: false,
    sort: '-createdAt',
  })

  return (
    <div className="pt-24 pb-24">
      <div className="container mb-12">
        <h1 className="text-4xl font-bold mb-4">{t(locale, 'courses.title')}</h1>
        <p className="text-lg text-muted-foreground">
          {t(locale, 'courses.description')}
        </p>
      </div>

      <div className="container">
        {courses.docs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.docs.map((course) => (
              <CourseCard key={course.id} course={course} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t(locale, 'courses.noCourses')}</p>
          </div>
        )}
      </div>
    </div>
  )
}
