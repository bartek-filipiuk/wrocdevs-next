import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { revalidateEvent, revalidateDelete } from './hooks/revalidateEvent'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Events: CollectionConfig<'events'> = {
  slug: 'events',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
    startDate: true,
    featuredImage: true,
  },
  admin: {
    defaultColumns: ['title', 'startDate', 'eventType', 'isFree', 'updatedAt'],
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
              label: 'Event Description',
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
          label: 'Date & Time',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'startDate',
                  type: 'date',
                  required: true,
                  label: 'Start Date & Time',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                    width: '50%',
                  },
                },
                {
                  name: 'endDate',
                  type: 'date',
                  label: 'End Date & Time',
                  admin: {
                    date: {
                      pickerAppearance: 'dayAndTime',
                    },
                    width: '50%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Location',
          fields: [
            {
              name: 'eventType',
              type: 'select',
              required: true,
              defaultValue: 'offline',
              label: 'Event Type',
              options: [
                { label: 'Offline (In-Person)', value: 'offline' },
                { label: 'Online', value: 'online' },
                { label: 'Hybrid', value: 'hybrid' },
              ],
            },
            {
              name: 'location',
              type: 'group',
              label: 'Physical Location',
              admin: {
                condition: (data) => data.eventType !== 'online',
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
              name: 'meetingLink',
              type: 'text',
              label: 'Online Meeting Link',
              admin: {
                condition: (data) => data.eventType !== 'offline',
                description: 'Link to the online meeting (Zoom, Google Meet, etc.)',
              },
            },
          ],
        },
        {
          label: 'Registration',
          fields: [
            {
              name: 'maxParticipants',
              type: 'number',
              label: 'Maximum Participants',
              admin: {
                description: 'Leave empty for unlimited',
              },
            },
            {
              name: 'registrationDeadline',
              type: 'date',
              label: 'Registration Deadline',
              admin: {
                date: {
                  pickerAppearance: 'dayAndTime',
                },
              },
            },
            {
              name: 'externalRegistrationUrl',
              type: 'text',
              label: 'External Registration URL',
              admin: {
                description: 'Link to external registration page (Eventbrite, Meetup, etc.)',
              },
            },
          ],
        },
        {
          label: 'Pricing',
          fields: [
            {
              name: 'isFree',
              type: 'checkbox',
              defaultValue: true,
              label: 'Free Event',
            },
            {
              type: 'row',
              admin: {
                condition: (data) => !data.isFree,
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
          ],
        },
        {
          label: 'Categories',
          fields: [
            {
              name: 'categories',
              type: 'relationship',
              relationTo: 'categories',
              hasMany: true,
              label: 'Event Categories',
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
    afterChange: [revalidateEvent],
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
