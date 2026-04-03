import type { CollectionConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { publishedProjectsRead } from '@/access/publishedProjectsRead'
import { ICON_OPTIONS } from '@/constants/iconOptions'
import { formatSlug } from '@/hooks/formatSlug'
import { sanitizeSVGValue } from '@/hooks/sanitizeSVGValue'

const hasButtonURL = (siblingData: any) => Boolean(siblingData?.buttonUrl?.trim())

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
      type: 'row',
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
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      admin: {
        description: 'Short description used on the homepage project card.',
      },
      required: true,
    },
    {
      name: 'fullDescription',
      type: 'richText',
    },
    {
      type: 'row',
      fields: [
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
            description: 'Preview image used on the project card when the visual type is set to image.',
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
      ],
    },
    {
      name: 'tags',
      type: 'array',
      admin: {
        description: 'Add any number of technology, framework, or category tags for the card.',
      },
      labels: {
        plural: 'Tags',
        singular: 'Tag',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'buttonLabel',
          type: 'text',
          admin: {
            description: 'Optional. Frontend falls back to "Xem chi tiết" when left empty.',
          },
        },
        {
          name: 'buttonUrl',
          type: 'text',
          admin: {
            description: 'Optional. Leave empty to render a non-clickable CTA on the card.',
          },
        },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          admin: {
            condition: (_, siblingData) => hasButtonURL(siblingData),
          },
          defaultValue: false,
        },
      ],
    },
    {
      type: 'row',
      fields: [
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
          name: 'sortOrder',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
  ],
}
