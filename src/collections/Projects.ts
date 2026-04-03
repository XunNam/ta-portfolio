import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { publishedProjectsRead } from '@/access/publishedProjectsRead'
import { ICON_OPTIONS } from '@/constants/iconOptions'
import { formatSlug } from '@/hooks/formatSlug'
import { sanitizeSVGValue } from '@/hooks/sanitizeSVGValue'

export const Projects: CollectionConfig = {
  slug: 'projects',
  access: {
    create: adminOnly,
    delete: adminOnly,
    read: publishedProjectsRead,
    update: adminOnly,
  },
  admin: {
    defaultColumns: ['title', 'status', 'featured', 'sortOrder'],
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      hooks: {
        beforeValidate: [formatSlug],
      },
      index: true,
      required: true,
      unique: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'fullDescription',
      type: 'richText',
    },
    {
      name: 'visualType',
      type: 'select',
      defaultValue: 'namedIcon',
      options: [
        { label: 'Uploaded image', value: 'image' },
        { label: 'Named icon', value: 'namedIcon' },
        { label: 'Raw SVG', value: 'svg' },
      ],
      required: true,
    },
    {
      name: 'previewImage',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.visualType === 'image',
      },
      relationTo: 'media',
    },
    {
      name: 'iconName',
      type: 'select',
      admin: {
        condition: (_, siblingData) => siblingData?.visualType === 'namedIcon',
      },
      options: ICON_OPTIONS,
    },
    {
      name: 'svgCode',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => siblingData?.visualType === 'svg',
        description: 'SVG is sanitized before save. Unsafe markup will be stripped.',
      },
      hooks: {
        beforeChange: [sanitizeSVGValue],
        beforeValidate: [sanitizeSVGValue],
      },
    },
    {
      name: 'tags',
      type: 'array',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'sortOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      required: true,
    },
    {
      name: 'buttonLabel',
      type: 'text',
    },
    {
      name: 'buttonUrl',
      type: 'text',
    },
    {
      name: 'openInNewTab',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
}
