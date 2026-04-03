import type { Field } from 'payload'

import { SECTION_OPTIONS } from '@/constants/sectionOptions'

type Options = {
  description?: string
  requireResolvedTarget?: boolean
}

export const createLinkTargetFields = ({ description, requireResolvedTarget = true }: Options = {}): Field[] => [
  {
    name: 'label',
    type: 'text',
    required: true,
  },
  {
    name: 'linkType',
    type: 'select',
    options: [
      { label: 'Section', value: 'section' },
      { label: 'Custom URL', value: 'custom' },
      { label: 'Email', value: 'email' },
    ],
    required: true,
  },
  {
    name: 'sectionId',
    type: 'select',
    admin: {
      condition: (_, siblingData) => (siblingData as any)?.linkType === 'section',
      description,
    },
    options: SECTION_OPTIONS,
    validate: (value: unknown, { siblingData }: any) => {
      if (requireResolvedTarget && siblingData?.linkType === 'section' && !value) {
        return 'Choose a section target.'
      }

      return true
    },
  },
  {
    name: 'url',
    type: 'text',
    admin: {
      condition: (_, siblingData) => (siblingData as any)?.linkType === 'custom',
      description,
    },
    validate: (value: unknown, { siblingData }: any) => {
      if (requireResolvedTarget && siblingData?.linkType === 'custom' && !value) {
        return 'Enter a custom URL.'
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
      if (requireResolvedTarget && siblingData?.linkType === 'email' && !value) {
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
    defaultValue: false,
  },
]
