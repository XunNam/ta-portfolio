import type { FieldHook } from 'payload'

import { sanitizeSVGMarkup } from '@/lib/sanitizeSVG'

export const sanitizeSVGValue: FieldHook = ({ value }) => sanitizeSVGMarkup(value)
