import type { Field } from 'payload'

export const metaFields: Field[] = [
  {
    name: 'metaTitle',
    type: 'text',
  },
  {
    name: 'metaDescription',
    type: 'textarea',
  },
  {
    name: 'metaKeywords',
    type: 'array',
    fields: [
      {
        name: 'keyword',
        type: 'text',
        required: true,
      },
    ],
  },
  {
    name: 'metaImage',
    type: 'relationship',
    relationTo: 'media',
  },
  {
    name: 'canonicalUrl',
    type: 'text',
  },
  {
    name: 'robots',
    type: 'text',
  },
]
