import { getPayload, Payload } from 'payload'
import config from '@/payload.config'
import { seedPortfolioDefaults } from '@/lib/portfolio/seedPortfolio'

import { afterAll, beforeAll, describe, expect, it } from 'vitest'

let payload: Payload
const draftSlug = 'draft-project-hidden-from-public'

describe('API', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
    await seedPortfolioDefaults(payload)
  })

  afterAll(async () => {
    await payload.delete({
      collection: 'projects',
      overrideAccess: true,
      where: {
        slug: {
          equals: draftSlug,
        },
      },
    })
  })

  it('fetches seeded globals', async () => {
    const siteSettings = await payload.findGlobal({
      depth: 1,
      overrideAccess: false,
      slug: 'siteSettings',
    })
    const homePage = await payload.findGlobal({
      depth: 1,
      overrideAccess: false,
      slug: 'homePage',
    })

    expect(siteSettings.brandText).toBe('Portfolio.')
    expect(homePage.hero?.name).toBe('Bùi Thế Anh')
  })

  it('hides draft projects from public reads', async () => {
    await payload.delete({
      collection: 'projects',
      overrideAccess: true,
      where: {
        slug: {
          equals: draftSlug,
        },
      },
    })

    await payload.create({
      collection: 'projects',
      data: {
        featured: true,
        iconName: 'folder',
        shortDescription: 'Draft-only project',
        slug: draftSlug,
        status: 'draft',
        title: 'Draft Only Project',
        visualType: 'namedIcon',
      },
      overrideAccess: true,
    })

    const projects = await payload.find({
      collection: 'projects',
      overrideAccess: false,
    })

    expect(projects.docs.some((doc) => doc.slug === draftSlug)).toBe(false)
  })
})
