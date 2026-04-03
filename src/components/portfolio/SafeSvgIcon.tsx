import { sanitizeSVGMarkup } from '@/lib/sanitizeSVG'

type Props = {
  className?: string
  svgCode?: null | string
}

export const SafeSvgIcon = ({ className, svgCode }: Props) => {
  const sanitized = sanitizeSVGMarkup(svgCode)

  if (!sanitized) {
    return null
  }

  return <span aria-hidden className={className} dangerouslySetInnerHTML={{ __html: sanitized }} />
}
