import { ChevronDown, ExternalLink } from 'lucide-react'

import type { Project } from '@/payload-types'
import { resolveLinkTarget } from '@/lib/portfolio/links'
import { getMediaURL } from '@/lib/portfolio/media'

import { CMSLink } from './CMSLink'
import { CopyButton } from './CopyButton'
import { NamedIcon } from './NamedIcon'
import { PortfolioNavbar } from './PortfolioNavbar'
import styles from './PortfolioPage.module.css'
import { VisualIcon } from './VisualIcon'

type LinkShape = {
  emailAddress?: null | string
  label?: null | string
  linkType?: null | string
  openInNewTab?: null | boolean
  sectionId?: null | string
  url?: null | string
}

type Props = {
  homePage: {
    about: {
      items: Array<{
        description: string
        iconName?: null | string
        image?: any
        svgCode?: null | string
        title: string
        visualType: string
      }>
      sectionIntro?: null | string
      sectionTitle: string
    }
    contact: {
      copyValue?: null | string
      description: string
      emailAddress: string
      primaryCTA?: LinkShape | null
      secondaryCTA?: LinkShape | null
      sectionTitle: string
    }
    hero: {
      avatar?: any
      description: string
      eyebrow?: null | string
      floatingBadge?: {
        enabled?: boolean | null
        iconImage?: any
        iconName?: null | string
        iconType?: null | string
        label?: null | string
        svgCode?: null | string
        value?: null | string
      } | null
      name: string
      primaryCTA?: LinkShape | null
      roleTitle: string
      secondaryCTA?: LinkShape | null
      socialLinks?: any[] | null
    }
    projectsSection: {
      sectionIntro?: null | string
      sectionTitle: string
      viewAllLink?: LinkShape | null
    }
    skills: {
      sectionIntro?: null | string
      sectionTitle: string
      softSkills?: Array<{ label: string; sortOrder?: null | number }> | null
      technicalSkills?: Array<{ name: string; sortOrder?: null | number }> | null
      workPhilosophyQuote?: null | string
      workPhilosophyTitle?: null | string
    }
  }
  projects: Project[]
  siteSettings: {
    brandLogo?: any
    brandText: string
    footer: {
      copyrightText: string
      customYear?: null | number
      links?: LinkShape[] | null
      noticeText?: null | string
      showYear?: boolean | null
      socialLinks?: any[] | null
      useCurrentYear?: boolean | null
    }
    navbarLinks?: LinkShape[] | null
  }
}

const sortByOrder = <T extends { sortOrder?: null | number }>(items: null | T[] | undefined): T[] =>
  [...(items || [])].sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))

const getFooterYear = (footer: Props['siteSettings']['footer']): null | number => {
  if (footer.showYear === false) {
    return null
  }

  if (footer.useCurrentYear === false) {
    return footer.customYear || null
  }

  return new Date().getFullYear()
}

export const PortfolioPage = ({ homePage, projects, siteSettings }: Props) => {
  const navLinks =
    siteSettings.navbarLinks
      ?.map((link) => ({
        label: link.label || '',
        ...resolveLinkTarget(link),
      }))
      .filter((link) => Boolean(link.href)) || []

  const viewAllLink = resolveLinkTarget(homePage.projectsSection.viewAllLink)
  const footerYear = getFooterYear(siteSettings.footer)
  const brandLogoURL = getMediaURL(siteSettings.brandLogo)
  const avatarURL = getMediaURL(homePage.hero.avatar)
  const technicalSkills = sortByOrder(homePage.skills.technicalSkills)
  const softSkills = sortByOrder(homePage.skills.softSkills)
  const heroBadge = homePage.hero.floatingBadge
  const showHeroBadge = Boolean(heroBadge?.enabled !== false && heroBadge?.label && heroBadge?.value)

  return (
    <div className={styles.pageShell} id="top">
      <PortfolioNavbar
        brand={
          brandLogoURL ? (
            <img alt={siteSettings.brandLogo?.alt || siteSettings.brandText} className={styles.brandLogo} src={brandLogoURL} />
          ) : (
            <span className={styles.brandText}>{siteSettings.brandText}</span>
          )
        }
        links={navLinks as Array<{ href: string; label: string; rel?: string; target?: string }>}
      />

      <main className={styles.page}>
        <section className={styles.heroSection}>
          <div className={styles.heroBlobPrimary} />
          <div className={styles.heroBlobSecondary} />

          <div className={styles.heroInner}>
            <div className={styles.heroContent}>
              {homePage.hero.eyebrow ? <div className={styles.heroEyebrow}>{homePage.hero.eyebrow}</div> : null}
              <h1 className={styles.heroTitle}>{homePage.hero.name}</h1>
              <p className={styles.heroRole}>{homePage.hero.roleTitle}</p>
              <p className={styles.heroDescription}>{homePage.hero.description}</p>

              <div className={styles.heroActions}>
                <CMSLink className={styles.primaryButton} inactiveClassName={styles.inactiveButton} link={homePage.hero.primaryCTA}>
                  {homePage.hero.primaryCTA?.label || 'Liên hệ ngay'}
                </CMSLink>
                <CMSLink className={styles.secondaryButton} inactiveClassName={styles.inactiveButton} link={homePage.hero.secondaryCTA}>
                  <span className={styles.secondaryButtonContent}>
                    <NamedIcon name="briefcase" size={16} />
                    {homePage.hero.secondaryCTA?.label || 'Xem CV'}
                  </span>
                </CMSLink>
              </div>

              {homePage.hero.socialLinks?.length ? (
                <div className={styles.socialLinks}>
                  {homePage.hero.socialLinks.map((social, index) => (
                    <CMSLink
                      className={styles.socialLink}
                      inactiveClassName={styles.socialLinkInactive}
                      key={`${social.label || 'social'}-${index}`}
                      link={social}
                    >
                      <VisualIcon
                        className={styles.socialIcon}
                        fallbackIcon="link"
                        iconName={social.iconName}
                        image={social.iconImage}
                        label={social.label}
                        svgCode={social.svgCode}
                        type={social.iconType}
                      />
                    </CMSLink>
                  ))}
                </div>
              ) : null}
            </div>

            <div className={styles.heroVisual}>
              <div className={styles.heroCard}>
                <div className={styles.heroCardLayerA} />
                <div className={styles.heroCardLayerB} />
                <div className={styles.heroCardInner}>
                  {avatarURL ? (
                    <img alt={homePage.hero.name} className={styles.heroAvatar} src={avatarURL} />
                  ) : (
                    <div className={styles.heroAvatarFallback}>
                      <NamedIcon className={styles.heroAvatarFallbackIcon} name="image" size={72} strokeWidth={1.4} />
                    </div>
                  )}
                </div>

                {showHeroBadge ? (
                  <div className={styles.floatingBadge}>
                    <div className={styles.floatingBadgeIcon}>
                      <VisualIcon
                        className={styles.floatingBadgeSvg}
                        fallbackIcon="badge"
                        iconName={heroBadge?.iconName}
                        image={heroBadge?.iconImage}
                        label={heroBadge?.label}
                        svgCode={heroBadge?.svgCode}
                        type={heroBadge?.iconType}
                      />
                    </div>
                    <div>
                      <div className={styles.floatingBadgeLabel}>{heroBadge?.label}</div>
                      <div className={styles.floatingBadgeValue}>{heroBadge?.value}</div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          <a className={styles.scrollCue} href="#about">
            <ChevronDown size={30} />
          </a>
        </section>

        <section className={styles.section} id="about">
          <div className={styles.sectionHeading}>
            <h2>{homePage.about.sectionTitle}</h2>
            <div className={styles.sectionAccent} />
            {homePage.about.sectionIntro ? <p>{homePage.about.sectionIntro}</p> : null}
          </div>

          <div className={styles.aboutGrid}>
            {homePage.about.items.map((item, index) => (
              <article className={styles.aboutCard} key={`${item.title}-${index}`}>
                <div className={styles.aboutIconFrame}>
                  <VisualIcon
                    className={styles.aboutIcon}
                    fallbackIcon="sparkles"
                    iconName={item.iconName}
                    image={item.image}
                    imageClassName={styles.aboutImage}
                    label={item.title}
                    svgCode={item.svgCode}
                    type={item.visualType}
                  />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.skillsSection}`} id="skills">
          <div className={styles.sectionHeading}>
            <h2>{homePage.skills.sectionTitle}</h2>
            {homePage.skills.sectionIntro ? <p>{homePage.skills.sectionIntro}</p> : null}
          </div>

          <div className={styles.skillsPanel}>
            <div className={styles.skillsColumn}>
              <h3 className={styles.panelTitle}>
                <NamedIcon className={styles.inlineIcon} name="code" size={22} />
                Technical Skills
              </h3>
              <div className={styles.skillList}>
                {technicalSkills.map((skill) => (
                  <div className={styles.skillRow} key={skill.name}>
                    <span>{skill.name}</span>
                    <div className={styles.skillPill}>Core</div>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.skillsColumn}>
              <h3 className={styles.panelTitle}>
                <NamedIcon className={styles.inlineIcon} name="briefcase" size={22} />
                Soft Skills
              </h3>
              <div className={styles.softSkillList}>
                {softSkills.map((skill) => (
                  <span className={styles.softSkillChip} key={skill.label}>
                    {skill.label}
                  </span>
                ))}
              </div>

              {homePage.skills.workPhilosophyQuote ? (
                <div className={styles.philosophyCard}>
                  <h4>{homePage.skills.workPhilosophyTitle || 'Phương châm làm việc'}</h4>
                  <p>{homePage.skills.workPhilosophyQuote}</p>
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <section className={styles.section} id="projects">
          <div className={styles.projectsHeader}>
            <div>
              <h2>{homePage.projectsSection.sectionTitle}</h2>
              {homePage.projectsSection.sectionIntro ? <p>{homePage.projectsSection.sectionIntro}</p> : null}
            </div>

            {viewAllLink.href ? (
              <a className={styles.viewAllLink} href={viewAllLink.href} rel={viewAllLink.rel} target={viewAllLink.target}>
                {homePage.projectsSection.viewAllLink?.label || 'Xem tất cả'}
                <ExternalLink size={16} />
              </a>
            ) : null}
          </div>

          <div className={styles.projectsGrid}>
            {projects.map((project) => {
              const projectLink = resolveLinkTarget({
                linkType: project.buttonUrl ? 'custom' : undefined,
                openInNewTab: project.openInNewTab,
                url: project.buttonUrl,
              })

              return (
                <article className={styles.projectCard} key={project.id}>
                  <div className={styles.projectVisual}>
                    <VisualIcon
                      className={styles.projectIcon}
                      fallbackIcon="briefcase"
                      iconName={project.iconName}
                      image={project.previewImage}
                      imageClassName={styles.projectImage}
                      label={project.title}
                      svgCode={project.svgCode}
                      type={project.visualType}
                    />
                  </div>

                  <div className={styles.projectBody}>
                    {project.tags?.length ? (
                      <div className={styles.projectTags}>
                        {project.tags.map((tag, index) => (
                          <span className={styles.projectTag} key={`${tag.tag}-${index}`}>
                            {tag.tag}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    <h3>{project.title}</h3>
                    <p>{project.shortDescription}</p>

                    {projectLink.href ? (
                      <a className={styles.projectLink} href={projectLink.href} rel={projectLink.rel} target={projectLink.target}>
                        {project.buttonLabel || 'Xem chi tiết'}
                        <ExternalLink size={14} />
                      </a>
                    ) : project.buttonLabel ? (
                      <span className={`${styles.projectLink} ${styles.projectLinkInactive}`}>
                        {project.buttonLabel}
                        <ExternalLink size={14} />
                      </span>
                    ) : null}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <section className={styles.contactSection} id="contact">
          <div className={styles.contactInner}>
            <h2>{homePage.contact.sectionTitle}</h2>
            <p>{homePage.contact.description}</p>

            <div className={styles.contactActions}>
              <CMSLink className={styles.contactPrimaryButton} inactiveClassName={styles.inactiveButton} link={homePage.contact.primaryCTA}>
                <span className={styles.secondaryButtonContent}>
                  <NamedIcon name="send" size={18} />
                  {homePage.contact.primaryCTA?.label || 'Gửi Email Ngay'}
                </span>
              </CMSLink>

              <CopyButton
                className={styles.contactSecondaryButton}
                label={homePage.contact.secondaryCTA?.label || 'Sao chép Email'}
                value={homePage.contact.copyValue || homePage.contact.emailAddress}
              />
            </div>

            <div className={styles.footer}>
              <div className={styles.footerTop}>
                <p className={styles.footerCopyright}>
                  {footerYear ? `${footerYear} ` : ''}
                  {siteSettings.footer.copyrightText}
                </p>

                {siteSettings.footer.links?.length ? (
                  <div className={styles.footerLinks}>
                    {siteSettings.footer.links.map((link, index) => {
                      const resolved = resolveLinkTarget(link)

                      if (!resolved.href) {
                        return null
                      }

                      return (
                        <a key={`${link.label}-${index}`} href={resolved.href} rel={resolved.rel} target={resolved.target}>
                          {link.label}
                        </a>
                      )
                    })}
                  </div>
                ) : null}
              </div>

              {siteSettings.footer.noticeText ? <p className={styles.footerNotice}>{siteSettings.footer.noticeText}</p> : null}

              {siteSettings.footer.socialLinks?.length ? (
                <div className={styles.footerSocials}>
                  {siteSettings.footer.socialLinks.map((social, index) => (
                    <CMSLink
                      className={styles.footerSocialLink}
                      inactiveClassName={styles.socialLinkInactive}
                      key={`footer-social-${index}`}
                      link={social}
                    >
                      <VisualIcon
                        className={styles.socialIcon}
                        fallbackIcon="link"
                        iconName={social.iconName}
                        image={social.iconImage}
                        label={social.label}
                        svgCode={social.svgCode}
                        type={social.iconType}
                      />
                    </CMSLink>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
