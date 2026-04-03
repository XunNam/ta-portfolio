import sanitizeHtml from 'sanitize-html'

const SVG_ALLOWED_TAGS = [
  'svg',
  'g',
  'defs',
  'desc',
  'title',
  'path',
  'circle',
  'ellipse',
  'line',
  'polyline',
  'polygon',
  'rect',
  'linearGradient',
  'radialGradient',
  'stop',
  'clipPath',
  'mask',
  'use',
] as const

const SVG_ALLOWED_ATTRIBUTES: Record<string, string[]> = {
  '*': [
    'aria-hidden',
    'class',
    'clip-path',
    'clip-rule',
    'cx',
    'cy',
    'd',
    'fill',
    'fill-opacity',
    'fill-rule',
    'focusable',
    'gradientTransform',
    'gradientUnits',
    'height',
    'href',
    'mask',
    'offset',
    'opacity',
    'points',
    'preserveAspectRatio',
    'r',
    'role',
    'rx',
    'ry',
    'stop-color',
    'stop-opacity',
    'stroke',
    'stroke-linecap',
    'stroke-linejoin',
    'stroke-miterlimit',
    'stroke-opacity',
    'stroke-width',
    'transform',
    'viewBox',
    'width',
    'x',
    'x1',
    'x2',
    'xmlns',
    'xmlns:xlink',
    'y',
    'y1',
    'y2',
  ],
}

export const sanitizeSVGMarkup = (value: unknown): string => {
  if (typeof value !== 'string') {
    return ''
  }

  const trimmed = value.trim()

  if (!trimmed) {
    return ''
  }

  const sanitized = sanitizeHtml(trimmed, {
    allowedAttributes: SVG_ALLOWED_ATTRIBUTES,
    allowedSchemes: ['http', 'https', 'mailto'],
    allowedTags: [...SVG_ALLOWED_TAGS],
    nonBooleanAttributes: ['*'],
    parser: {
      lowerCaseAttributeNames: false,
      lowerCaseTags: false,
    },
  }).trim()

  return sanitized.startsWith('<svg') ? sanitized : ''
}
