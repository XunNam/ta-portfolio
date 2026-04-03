import { resolveLinkTarget } from '@/lib/portfolio/links'

type Props = {
  children: React.ReactNode
  className?: string
  inactiveClassName?: string
  link?: {
    emailAddress?: null | string
    linkType?: null | string
    openInNewTab?: null | boolean
    sectionId?: null | string
    url?: null | string
  } | null
}

export const CMSLink = ({ children, className, inactiveClassName, link }: Props) => {
  const resolved = resolveLinkTarget(link)

  if (!resolved.href) {
    return <span className={inactiveClassName ? `${className || ''} ${inactiveClassName}`.trim() : className}>{children}</span>
  }

  return (
    <a className={className} href={resolved.href} rel={resolved.rel} target={resolved.target}>
      {children}
    </a>
  )
}
