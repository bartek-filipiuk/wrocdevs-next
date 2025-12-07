import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Workshop } from '../../../payload-types'

export const revalidateWorkshop: CollectionAfterChangeHook<Workshop> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/workshops/${doc.slug}`

      payload.logger.info(`Revalidating workshop at path: ${path}`)

      revalidatePath(path)
      revalidateTag('workshops-sitemap')
      revalidateTag('workshops-list')
    }

    // If the workshop was previously published, we need to revalidate the old path
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      const oldPath = `/workshops/${previousDoc.slug}`

      payload.logger.info(`Revalidating old workshop at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('workshops-sitemap')
      revalidateTag('workshops-list')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Workshop> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/workshops/${doc?.slug}`
    revalidatePath(path)
    revalidateTag('workshops-sitemap')
    revalidateTag('workshops-list')
  }

  return doc
}
