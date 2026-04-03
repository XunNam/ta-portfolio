import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'roles',
      type: 'select',
      access: {
        update: ({ req: { user } }) => isAdmin(user),
      },
      defaultValue: ['admin'],
      hasMany: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      required: true,
      saveToJWT: true,
    },
  ],
}
