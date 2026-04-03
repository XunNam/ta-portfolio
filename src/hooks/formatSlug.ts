import type { FieldHook } from 'payload'

import { slugify } from '@/lib/slugify'

export const formatSlug: FieldHook = ({ siblingData, value }) => {
  const rawValue =
    typeof value === 'string' && value.trim() ? value : typeof siblingData?.title === 'string' ? siblingData.title : ''

  const formatted = slugify(rawValue)

  return formatted || value
}
