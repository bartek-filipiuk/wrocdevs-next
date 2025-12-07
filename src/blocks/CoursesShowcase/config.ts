import type { Block } from 'payload'

import { link } from '../../fields/link'

export const CoursesShowcase: Block = {
  slug: 'coursesShowcase',
  interfaceName: 'CoursesShowcaseBlock',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Our Courses',
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'courses',
      type: 'array',
      label: 'Courses',
      minRows: 1,
      maxRows: 8,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
        },
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
          name: 'duration',
          type: 'text',
          label: 'Duration (e.g., "8 weeks")',
        },
        {
          name: 'level',
          type: 'select',
          options: [
            { label: 'Beginner', value: 'beginner' },
            { label: 'Intermediate', value: 'intermediate' },
            { label: 'Advanced', value: 'advanced' },
          ],
        },
        {
          name: 'price',
          type: 'text',
          label: 'Price (e.g., "$199" or "Free")',
        },
        link({
          appearances: ['default', 'outline'],
          overrides: {
            name: 'link',
            label: 'Course Link',
          },
        }),
      ],
    },
    link({
      appearances: ['default', 'outline'],
      overrides: {
        name: 'viewAllLink',
        label: 'View All Courses Link',
      },
    }),
  ],
  labels: {
    plural: 'Courses Showcases',
    singular: 'Courses Showcase',
  },
}
