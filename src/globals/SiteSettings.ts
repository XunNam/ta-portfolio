import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { anyone } from '@/access/anyone'
import { createLinkTargetFields } from '@/fields/LinkTarget'
import { metaFields } from '@/fields/MetaFields'
import { createSocialLinkFields } from '@/fields/SocialLink'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: {
    read: anyone,
    update: adminOnly,
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      required: true,
    },
    {
      name: 'brandText',
      type: 'text',
      required: true,
    },
    {
      name: 'brandLogo',
      type: 'relationship',
      relationTo: 'media',
    },
    {
      name: 'meta',
      type: 'group',
      fields: metaFields,
    },
    {
      name: 'navbarLinks',
      type: 'array',
      fields: createLinkTargetFields({
        description: 'Use section links for one-page navigation targets.',
        requireResolvedTarget: true,
      }),
      minRows: 1,
      required: true,
    },
    {
      name: 'footer',
      type: 'group',
      fields: [
        {
          name: 'links',
          type: 'array',
          fields: createLinkTargetFields({
            description: 'Footer quick links can target sections, URLs, or email.',
            requireResolvedTarget: true,
          }),
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: createSocialLinkFields(),
        },
        {
          name: 'noticeText',
          type: 'textarea',
        },
        {
          name: 'copyrightText',
          type: 'text',
          required: true,
        },
        {
          name: 'showYear',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'useCurrentYear',
          type: 'checkbox',
          admin: {
            condition: (_, siblingData) => siblingData?.showYear !== false,
          },
          defaultValue: true,
        },
        {
          name: 'customYear',
          type: 'number',
          admin: {
            condition: (_, siblingData) =>
              siblingData?.showYear !== false && siblingData?.useCurrentYear === false,
          },
        },
      ],
    },
  ],
}
