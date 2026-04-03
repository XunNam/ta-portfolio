import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { anyone } from '@/access/anyone'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: anyone,
    update: adminOnly,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'textarea',
    },
  ],
  upload: {
    mimeTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/avif'],
  },
}
