import React from 'react'

import type { CoursesShowcaseBlock as CoursesProps } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'

const levelColors: Record<string, string> = {
  beginner: 'bg-green-500/20 text-green-700',
  intermediate: 'bg-yellow-500/20 text-yellow-700',
  advanced: 'bg-red-500/20 text-red-700',
}

export const CoursesShowcaseBlock: React.FC<CoursesProps> = ({
  sectionTitle,
  sectionDescription,
  courses,
  viewAllLink,
}) => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/5 to-transparent" />
      </div>

      <div className="container">
        {(sectionTitle || sectionDescription) && (
          <div className="text-center mb-16">
            {sectionTitle && (
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-blue">
                {sectionTitle}
              </h2>
            )}
            {sectionDescription && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {sectionDescription}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses?.map((course, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden hover:glow-blue-sm transition-all duration-300 hover:-translate-y-2 group"
            >
              {/* Image with overlay */}
              {course.image && typeof course.image === 'object' && (
                <div className="relative h-52 overflow-hidden">
                  <Media
                    resource={course.image}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Price badge */}
                  {course.price && (
                    <div className="absolute top-4 right-4 gradient-blue text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                      {course.price}
                    </div>
                  )}

                  {/* Level badge */}
                  {course.level && (
                    <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${levelColors[course.level] || ''}`}>
                      {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                    </div>
                  )}
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>

                {course.duration && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {course.duration}
                  </p>
                )}

                {course.description && (
                  <p className="text-muted-foreground line-clamp-2 mb-4">{course.description}</p>
                )}

                {course.link?.label && (
                  <CMSLink
                    {...course.link}
                    className="w-full gradient-blue text-white hover:opacity-90 transition-opacity py-2 px-4 rounded-xl font-medium text-center block"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {viewAllLink?.label && (
          <div className="text-center mt-12">
            <CMSLink
              {...viewAllLink}
              size="lg"
              className="glass border-primary/30 hover:bg-primary/10 transition-colors px-8 py-3 rounded-xl font-semibold inline-flex items-center gap-2"
            />
          </div>
        )}
      </div>
    </section>
  )
}
