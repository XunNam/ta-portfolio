import type { GlobalConfig } from 'payload'

import { adminOnly } from '@/access/adminOnly'
import { anyone } from '@/access/anyone'
import { ICON_OPTIONS } from '@/constants/iconOptions'
import { createLinkTargetFields } from '@/fields/LinkTarget'
import { createSocialLinkFields } from '@/fields/SocialLink'
import { sanitizeSVGValue } from '@/hooks/sanitizeSVGValue'

export const HomePage: GlobalConfig = {
  slug: 'homePage',
  access: {
    read: anyone,
    update: adminOnly,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'eyebrow', type: 'text' },
        { name: 'name', type: 'text', required: true },
        { name: 'roleTitle', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'avatar', type: 'relationship', relationTo: 'media' },
        {
          name: 'primaryCTA',
          type: 'group',
          fields: createLinkTargetFields({
            requireResolvedTarget: true,
          }),
        },
        {
          name: 'secondaryCTA',
          type: 'group',
          fields: createLinkTargetFields({
            description: 'Leave the target empty to render an inactive CTA until the final destination is available.',
            requireResolvedTarget: false,
          }),
        },
        {
          name: 'socialLinks',
          type: 'array',
          fields: createSocialLinkFields(),
        },
        {
          name: 'floatingBadge',
          type: 'group',
          fields: [
            { name: 'enabled', type: 'checkbox', defaultValue: true },
            {
              name: 'label',
              type: 'text',
              admin: { condition: (_, siblingData) => siblingData?.enabled !== false },
            },
            {
              name: 'value',
              type: 'text',
              admin: { condition: (_, siblingData) => siblingData?.enabled !== false },
            },
            {
              name: 'iconType',
              type: 'select',
              admin: { condition: (_, siblingData) => siblingData?.enabled !== false },
              defaultValue: 'named',
              options: [
                { label: 'Named icon', value: 'named' },
                { label: 'Raw SVG', value: 'svg' },
                { label: 'Uploaded image', value: 'image' },
              ],
            },
            {
              name: 'iconName',
              type: 'select',
              admin: {
                condition: (_, siblingData) =>
                  siblingData?.enabled !== false && siblingData?.iconType === 'named',
              },
              options: ICON_OPTIONS,
            },
            {
              name: 'svgCode',
              type: 'textarea',
              admin: {
                condition: (_, siblingData) =>
                  siblingData?.enabled !== false && siblingData?.iconType === 'svg',
                description: 'SVG is sanitized before save. Unsafe markup will be stripped.',
              },
              hooks: {
                beforeChange: [sanitizeSVGValue],
                beforeValidate: [sanitizeSVGValue],
              },
            },
            {
              name: 'iconImage',
              type: 'relationship',
              admin: {
                condition: (_, siblingData) =>
                  siblingData?.enabled !== false && siblingData?.iconType === 'image',
              },
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'about',
      type: 'group',
      fields: [
        { name: 'sectionTitle', type: 'text', required: true },
        { name: 'sectionIntro', type: 'textarea' },
        {
          name: 'items',
          type: 'array',
          minRows: 1,
          required: true,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
            {
              name: 'visualType',
              type: 'select',
              defaultValue: 'namedIcon',
              options: [
                { label: 'Named icon', value: 'namedIcon' },
                { label: 'Raw SVG', value: 'svg' },
                { label: 'Uploaded image', value: 'image' },
              ],
              required: true,
            },
            {
              name: 'iconName',
              type: 'select',
              admin: { condition: (_, siblingData) => siblingData?.visualType === 'namedIcon' },
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
              name: 'image',
              type: 'relationship',
              admin: { condition: (_, siblingData) => siblingData?.visualType === 'image' },
              relationTo: 'media',
            },
          ],
        },
      ],
    },
    {
      name: 'skills',
      type: 'group',
      fields: [
        { name: 'sectionTitle', type: 'text', required: true },
        { name: 'sectionIntro', type: 'textarea' },
        {
          name: 'technicalSkills',
          type: 'array',
          minRows: 1,
          required: true,
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'sortOrder', type: 'number', defaultValue: 0 },
          ],
        },
        {
          name: 'softSkills',
          type: 'array',
          minRows: 1,
          required: true,
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'sortOrder', type: 'number', defaultValue: 0 },
          ],
        },
        { name: 'workPhilosophyTitle', type: 'text' },
        { name: 'workPhilosophyQuote', type: 'textarea' },
      ],
    },
    {
      name: 'projectsSection',
      type: 'group',
      fields: [
        { name: 'sectionTitle', type: 'text', required: true },
        { name: 'sectionIntro', type: 'textarea' },
        {
          name: 'viewAllLink',
          type: 'group',
          fields: createLinkTargetFields({
            description: 'Leave the target empty to hide the link in v1.',
            requireResolvedTarget: false,
          }),
        },
        { name: 'featuredOnly', type: 'checkbox', defaultValue: true },
        { name: 'limit', type: 'number', defaultValue: 3 },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'sectionTitle', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'emailAddress', type: 'email', required: true },
        {
          name: 'primaryCTA',
          type: 'group',
          fields: createLinkTargetFields({
            requireResolvedTarget: true,
          }),
        },
        {
          name: 'secondaryCTA',
          type: 'group',
          fields: createLinkTargetFields({
            description: 'Leave the target empty to render a copy-only button in v1.',
            requireResolvedTarget: false,
          }),
        },
        { name: 'copyValue', type: 'text' },
      ],
    },
  ],
}
