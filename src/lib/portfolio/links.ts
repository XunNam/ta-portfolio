type LinkTargetValue = {
  emailAddress?: null | string
  linkType?: null | string
  openInNewTab?: null | boolean
  sectionId?: null | string
  url?: null | string
}

export type ResolvedLinkTarget = {
  href: null | string
  rel?: string
  target?: string
}

export const resolveLinkTarget = (link: LinkTargetValue | null | undefined): ResolvedLinkTarget => {
  if (!link?.linkType) {
    return { href: null }
  }

  if (link.linkType === 'section' && link.sectionId) {
    return { href: `#${link.sectionId}` }
  }

  if (link.linkType === 'email' && link.emailAddress) {
    return { href: `mailto:${link.emailAddress}` }
  }

  if (link.linkType === 'custom' && link.url?.trim()) {
    return {
      href: link.url.trim(),
      rel: link.openInNewTab ? 'noreferrer noopener' : undefined,
      target: link.openInNewTab ? '_blank' : undefined,
    }
  }

  return { href: null }
}
