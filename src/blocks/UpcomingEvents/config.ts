import type { Block } from 'payload'

import { link } from '../../fields/link'

export const UpcomingEvents: Block = {
  slug: 'upcomingEvents',
  interfaceName: 'UpcomingEventsBlock',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Upcoming Events',
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'events',
      type: 'array',
      label: 'Events',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
        {
          name: 'date',
          type: 'date',
          required: true,
          admin: {
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: 'location',
          type: 'text',
          label: 'Location',
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            name: 'link',
            label: 'Event Link',
          },
        }),
      ],
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        name: 'viewAllLink',
        label: 'View All Events Link',
      },
    }),
  ],
  labels: {
    plural: 'Upcoming Events Sections',
    singular: 'Upcoming Events Section',
  },
}
