import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidateWorkshop, revalidateDelete } from './hooks/revalidateWorkshop'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Workshops: CollectionConfig<'workshops'> = {
  slug: 'workshops',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    date: true,
    featuredImage: true,
  },
  admin: {
    defaultColumns: ['title', 'date', 'priceType', 'deliveryType', 'updatedAt'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'description',
              type: 'richText',
              label: 'Workshop Description',
              localized: true,
            },
            {
              name: 'featuredImage',
              type: 'upload',
              relationTo: 'media',
              label: 'Featured Image',
            },
          ],
        },
        {
          label: 'Details',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'priceType',
                  type: 'select',
                  required: true,
                  defaultValue: 'paid',
                  label: 'Price Type',
                  options: [
                    { label: 'Free', value: 'free' },
                    { label: 'Paid', value: 'paid' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'deliveryType',
                  type: 'select',
                  required: true,
                  defaultValue: 'offline',
                  label: 'Delivery Type',
                  options: [
                    { label: 'Online', value: 'online' },
                    { label: 'Offline (In-Person)', value: 'offline' },
                    { label: 'Hybrid', value: 'hybrid' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              admin: {
                condition: (data) => data.priceType === 'paid',
              },
              fields: [
                {
                  name: 'price',
                  type: 'number',
                  label: 'Price',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'currency',
                  type: 'select',
                  defaultValue: 'PLN',
                  label: 'Currency',
                  options: [
                    { label: 'PLN', value: 'PLN' },
                    { label: 'EUR', value: 'EUR' },
                    { label: 'USD', value: 'USD' },
                  ],
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'date',
                  type: 'date',
                  required: true,
                  label: 'Workshop Date & Time',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                    width: '50%',
                  },
                },
                {
                  name: 'duration',
                  type: 'text',
                  label: 'Duration',
                  admin: {
                    description: 'e.g., "4 hours", "2 days"',
                    width: '50%',
                  },
                },
              ],
            },
            {
              name: 'maxParticipants',
              type: 'number',
              label: 'Maximum Participants',
              admin: {
                description: 'Leave empty for unlimited',
              },
            },
          ],
        },
        {
          label: 'Location',
          admin: {
            condition: (data) => data.deliveryType !== 'online',
          },
          fields: [
            {
              name: 'address',
              type: 'text',
              label: 'Street Address',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  label: 'City',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'country',
                  type: 'text',
                  label: 'Country',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidateWorkshop],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100,
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
