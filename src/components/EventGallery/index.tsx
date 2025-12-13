'use client'

import React, { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Media } from '@/components/Media'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media as MediaType } from '@/payload-types'

interface GalleryImage {
  image: number | MediaType
  id?: string | null
}

interface EventGalleryProps {
  images: GalleryImage[] | null | undefined
  emptyText: string
  title: string
}

export const EventGallery: React.FC<EventGalleryProps> = ({ images, emptyText, title }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Filter valid images (where image is an object with url)
  const validImages = (images || []).filter(
    (item): item is GalleryImage & { image: MediaType } =>
      item.image !== null && typeof item.image === 'object' && 'url' in item.image,
  )

  if (validImages.length === 0) {
    return (
      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-8 text-gradient-blue">{title}</h2>
        <div className="glass rounded-2xl p-8">
          <p className="text-muted-foreground text-center">{emptyText}</p>
        </div>
      </div>
    )
  }

  // Prepare slides for lightbox
  const slides = validImages.map((item) => ({
    src: getMediaUrl(item.image.url),
    width: item.image.width || undefined,
    height: item.image.height || undefined,
  }))

  const handleImageClick = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-8 text-gradient-blue">{title}</h2>
      <div className="glass rounded-2xl p-8">
        {/* Responsive grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {validImages.map((item, index) => (
            <button
              key={item.id || index}
              onClick={() => handleImageClick(index)}
              className="relative aspect-video overflow-hidden rounded-lg cursor-pointer group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-label={`View image ${index + 1} in gallery`}
            >
              <Media
                resource={item.image}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
      />
    </div>
  )
}
