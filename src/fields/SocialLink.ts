import type { Field } from 'payload'

import { ICON_OPTIONS } from '@/constants/iconOptions'
import { sanitizeSVGValue } from '@/hooks/sanitizeSVGValue'

export const createSocialLinkFields = (): Field[] => [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'linkType',
    type: 'select',
    options: [
      { label: 'Custom URL', value: 'custom' },
      { label: 'Email', value: 'email' },
    ],
    required: true,
  },
  {
    name: 'url',
    type: 'text',
    admin: {
      condition: (_, siblingData) => (siblingData as any)?.linkType === 'custom',
    },
    validate: (value: unknown, { siblingData }: any) => {
      if (siblingData?.linkType === 'custom' && !value) {
        return 'Enter a URL for the social link.'
      }

      return true
    },
  },
  {
    name: 'emailAddress',
    type: 'email',
    admin: {
      condition: (_, siblingData) => (siblingData as any)?.linkType === 'email',
    },
    validate: (value: unknown, { siblingData }: any) => {
      if (siblingData?.linkType === 'email' && !value) {
        return 'Enter an email address.'
      }

      return true
    },
  },
  {
    name: 'openInNewTab',
    type: 'checkbox',
    admin: {
      condition: (_, siblingData) => (siblingData as any)?.linkType === 'custom',
    },
    defaultValue: true,
  },
  {
    name: 'iconType',
    type: 'select',
    options: [
      { label: 'Named icon', value: 'named' },
      { label: 'Raw SVG', value: 'svg' },
      { label: 'Uploaded image', value: 'image' },
    ],
    required: true,
    defaultValue: 'named',
  },
  {
    name: 'iconName',
    type: 'select',
    admin: {
      condition: (_, siblingData) => (siblingData as any)?.iconType === 'named',
    },
    options: ICON_OPTIONS,
    validate: (value: unknown, { siblingData }: any) => {
      if (siblingData?.iconType === 'named' && !value) {
        return 'Choose an icon.'
      }

      return true
    },
  },
  {
    name: 'svgCode',
    type: 'textarea',
    admin: {
      condition: (_, siblingData) => (siblingData as any)?.iconType === 'svg',
      description: 'SVG is sanitized before save. Unsafe markup will be stripped.',
    },
    hooks: {
      beforeChange: [sanitizeSVGValue],
      beforeValidate: [sanitizeSVGValue],
    },
    validate: (value: unknown, { siblingData }: any) => {
      if (siblingData?.iconType === 'svg' && !value) {
        return 'Paste SVG markup.'
      }

      return true
    },
  },
  {
    name: 'iconImage',
    type: 'relationship',
    admin: {
      condition: (_, siblingData) => (siblingData as any)?.iconType === 'image',
    },
    relationTo: 'media',
    validate: (value: unknown, { siblingData }: any) => {
      if (siblingData?.iconType === 'image' && !value) {
        return 'Select an uploaded image.'
      }

      return true
    },
  },
]
