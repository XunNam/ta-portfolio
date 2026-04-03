import type { Media } from '@/payload-types'

import { getMediaURL } from '@/lib/portfolio/media'
import { sanitizeSVGMarkup } from '@/lib/sanitizeSVG'

import { NamedIcon } from './NamedIcon'
import { SafeSvgIcon } from './SafeSvgIcon'

type Props = {
  className?: string
  fallbackIcon?: string
  iconName?: null | string
  image?: Media | null | string
  imageClassName?: string
  label?: null | string
  type?: null | string
  svgCode?: null | string
}

export const VisualIcon = ({
  className,
  fallbackIcon = 'sparkles',
  iconName,
  image,
  imageClassName,
  label,
  svgCode,
  type,
}: Props) => {
  const resolvedType = type === 'namedIcon' ? 'named' : type
  const imageURL = getMediaURL(image)

  if (resolvedType === 'image' && imageURL) {
    return <img alt={label || ''} className={imageClassName || className} loading="lazy" src={imageURL} />
  }

  if (resolvedType === 'svg') {
    const sanitized = sanitizeSVGMarkup(svgCode)

    if (sanitized) {
      return <SafeSvgIcon className={className} svgCode={sanitized} />
    }
  }

  return <NamedIcon className={className} name={iconName || fallbackIcon} />
}
