import { cache } from 'react'
import { getPayload } from 'payload'

import type { HomePage, Project, SiteSetting } from '@/payload-types'
import config from '@/payload.config'

import { defaultHomePage, defaultProjects, defaultSiteSettings } from './defaults'

const mergeSiteSettings = (value: null | SiteSetting | undefined) => ({
  ...defaultSiteSettings,
  ...value,
  footer: {
    ...defaultSiteSettings.footer,
    ...value?.footer,
    links: value?.footer?.links ?? defaultSiteSettings.footer.links,
    socialLinks: value?.footer?.socialLinks ?? defaultSiteSettings.footer.socialLinks,
  },
  meta: {
    ...defaultSiteSettings.meta,
    ...value?.meta,
    metaKeywords: value?.meta?.metaKeywords ?? defaultSiteSettings.meta.metaKeywords,
  },
  navbarLinks: value?.navbarLinks ?? defaultSiteSettings.navbarLinks,
})

const mergeHomePage = (value: HomePage | null | undefined) => ({
  ...defaultHomePage,
  ...value,
  about: {
    ...defaultHomePage.about,
    ...value?.about,
    items: value?.about?.items ?? defaultHomePage.about.items,
  },
  contact: {
    ...defaultHomePage.contact,
    ...value?.contact,
  },
  hero: {
    ...defaultHomePage.hero,
    ...value?.hero,
    floatingBadge: {
      ...defaultHomePage.hero.floatingBadge,
      ...value?.hero?.floatingBadge,
    },
    socialLinks: value?.hero?.socialLinks ?? defaultHomePage.hero.socialLinks,
  },
  projectsSection: {
    ...defaultHomePage.projectsSection,
    ...value?.projectsSection,
  },
  skills: {
    ...defaultHomePage.skills,
    ...value?.skills,
    softSkills: value?.skills?.softSkills ?? defaultHomePage.skills.softSkills,
    technicalSkills: value?.skills?.technicalSkills ?? defaultHomePage.skills.technicalSkills,
  },
})

export const getPortfolioPageData = cache(async (): Promise<{
  homePage: ReturnType<typeof mergeHomePage>
  projects: Project[]
  siteSettings: ReturnType<typeof mergeSiteSettings>
}> => {
  const payload = await getPayload({ config })
  const fallbackProjects = defaultProjects.map((project) => ({
    ...project,
    createdAt: '',
    id: project.slug,
    updatedAt: '',
  })) as unknown as Project[]

  let siteSettings: null | SiteSetting = null
  let homePage: HomePage | null = null
  let projects: Project[] = fallbackProjects

  try {
    siteSettings = await payload.findGlobal({
      depth: 1,
      overrideAccess: false,
      slug: 'siteSettings',
    })
  } catch {
    siteSettings = null
  }

  try {
    homePage = await payload.findGlobal({
      depth: 1,
      overrideAccess: false,
      slug: 'homePage',
    })
  } catch {
    homePage = null
  }

  try {
    const projectsResponse = await payload.find({
      collection: 'projects',
      depth: 1,
      limit: homePage?.projectsSection?.limit || defaultHomePage.projectsSection.limit,
      overrideAccess: false,
      sort: 'sortOrder',
      where:
        homePage?.projectsSection?.featuredOnly === false
          ? undefined
          : {
              featured: {
                equals: true,
              },
            },
    })

    projects = projectsResponse.docs
  } catch {
    projects = fallbackProjects
  }

  return {
    homePage: mergeHomePage(homePage),
    projects,
    siteSettings: mergeSiteSettings(siteSettings),
  }
})
