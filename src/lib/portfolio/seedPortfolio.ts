import type { Payload } from 'payload'

import { defaultHomePage, defaultProjects, defaultSiteSettings } from './defaults'

const MONGO_RETRY_PATTERNS = [/write conflict/i, /namespace .* is already in use/i]
const MAX_RETRIES = 3
const RETRY_DELAY_MS = 250

const shouldRetryMongoSeedError = (error: unknown): boolean => {
  const message = error instanceof Error ? error.message : String(error)

  return MONGO_RETRY_PATTERNS.some((pattern) => pattern.test(message))
}

const wait = async (ms: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms)
  })

const withMongoSeedRetry = async <T>(operation: () => Promise<T>): Promise<T> => {
  let lastError: unknown

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt += 1) {
    try {
      return await operation()
    } catch (error) {
      lastError = error

      if (!shouldRetryMongoSeedError(error) || attempt === MAX_RETRIES) {
        throw error
      }

      await wait(RETRY_DELAY_MS * attempt)
    }
  }

  throw lastError
}

export const seedPortfolioDefaults = async (payload: Payload): Promise<void> => {
  await withMongoSeedRetry(() =>
    payload.updateGlobal({
      data: defaultSiteSettings as any,
      slug: 'siteSettings',
    }),
  )

  await withMongoSeedRetry(() =>
    payload.updateGlobal({
      data: defaultHomePage as any,
      slug: 'homePage',
    }),
  )

  for (const project of defaultProjects) {
    const existing = await withMongoSeedRetry(() =>
      payload.find({
        collection: 'projects',
        limit: 1,
        overrideAccess: true,
        where: {
          slug: {
            equals: project.slug,
          },
        },
      }),
    )

    if (existing.docs[0]) {
      await withMongoSeedRetry(() =>
        payload.update({
          collection: 'projects',
          data: project as any,
          id: existing.docs[0].id,
          overrideAccess: true,
        }),
      )

      continue
    }

    await withMongoSeedRetry(() =>
      payload.create({
        collection: 'projects',
        data: project as any,
        overrideAccess: true,
      }),
    )
  }
}
