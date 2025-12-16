import type { Block } from 'payload'

export const PartnerLogos: Block = {
  slug: 'partnerLogos',
  interfaceName: 'PartnerLogosBlock',
  fields: [
    {
      name: 'sectionTitle',
      type: 'text',
      label: 'Section Title',
    },
    {
      name: 'sectionDescription',
      type: 'textarea',
      label: 'Section Description',
    },
    {
      name: 'logos',
      type: 'array',
      label: 'Partner Logos',
      minRows: 3,
      maxRows: 20,
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Square format recommended (~200x200px). Transparent PNG works best.',
          },
        },
        {
          name: 'partnerName',
          type: 'text',
          required: true,
          label: 'Partner Name',
          admin: {
            description: 'Used for accessibility (alt text)',
          },
        },
      ],
    },
  ],
  labels: {
    plural: 'Partner Logos Sections',
    singular: 'Partner Logos Section',
  },
}
