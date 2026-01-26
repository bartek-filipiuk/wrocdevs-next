import type { Block } from 'payload'

export const EmbedBlock: Block = {
  slug: 'embed',
  interfaceName: 'EmbedBlock',
  labels: {
    singular: 'Embed',
    plural: 'Embeds',
  },
  fields: [
    {
      name: 'headline',
      type: 'text',
      label: 'Section Headline',
      localized: true,
      admin: {
        description: 'Main heading for this section (e.g., "Zapisz się na wydarzenie")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Section Description',
      localized: true,
      admin: {
        description: 'Supporting text below the headline',
        rows: 2,
      },
    },
    {
      name: 'embedType',
      type: 'select',
      label: 'Embed Type',
      defaultValue: 'iframe',
      options: [
        { label: 'Iframe URL', value: 'iframe' },
        { label: 'Raw HTML', value: 'html' },
      ],
      admin: {
        description: 'Choose how to embed content',
      },
    },
    {
      name: 'embedUrl',
      type: 'text',
      label: 'Embed URL',
      admin: {
        description: 'URL of the embed (e.g., Luma event, YouTube video)',
        placeholder: 'https://luma.com/embed/event/...',
        condition: (_, siblingData) => siblingData?.embedType !== 'html',
      },
    },
    {
      name: 'htmlCode',
      type: 'textarea',
      label: 'HTML Code',
      admin: {
        description: 'Paste HTML embed code (scripts, iframes, forms)',
        rows: 10,
        condition: (_, siblingData) => siblingData?.embedType === 'html',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Iframe Title (for accessibility)',
      localized: true,
      admin: {
        description: 'Descriptive title for screen readers',
        condition: (_, siblingData) => siblingData?.embedType !== 'html',
      },
    },
    {
      type: 'row',
      admin: {
        condition: (_, siblingData) => siblingData?.embedType !== 'html',
      },
      fields: [
        {
          name: 'width',
          type: 'number',
          label: 'Width',
          defaultValue: 600,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'height',
          type: 'number',
          label: 'Height',
          defaultValue: 660,
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}
