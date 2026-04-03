import { getPayload } from 'payload'
import { test, expect, Page } from '@playwright/test'

import config from '../../src/payload.config.js'
import { seedPortfolioDefaults } from '../../src/lib/portfolio/seedPortfolio.js'

import { login } from '../helpers/login'
import { seedTestUser, cleanupTestUser, testUser } from '../helpers/seedUser'

test.describe('Admin Panel', () => {
  let page: Page

  test.beforeAll(async ({ browser }, testInfo) => {
    await seedTestUser()
    const payload = await getPayload({ config })
    await seedPortfolioDefaults(payload)

    const context = await browser.newContext()
    page = await context.newPage()

    await login({ page, user: testUser })
  })

  test.afterAll(async () => {
    await cleanupTestUser()
  })

  test('can navigate to dashboard', async () => {
    await page.goto('http://localhost:3000/admin')
    await expect(page).toHaveURL('http://localhost:3000/admin')
    const dashboardArtifact = page.locator('span[title="Dashboard"]').first()
    await expect(dashboardArtifact).toBeVisible()
  })

  test('can navigate to site settings global', async () => {
    await page.goto('http://localhost:3000/admin/globals/siteSettings')
    await expect(page).toHaveURL('http://localhost:3000/admin/globals/siteSettings')
    const siteNameField = page.locator('input[name="siteName"]').first()
    await expect(siteNameField).toBeVisible()
  })

  test('can navigate to projects list view', async () => {
    await page.goto('http://localhost:3000/admin/collections/projects')
    await expect(page).toHaveURL('http://localhost:3000/admin/collections/projects')
    const listViewArtifact = page.locator('h1', { hasText: 'Projects' }).first()
    await expect(listViewArtifact).toBeVisible()
  })

  test('can navigate to project create view', async () => {
    await page.goto('http://localhost:3000/admin/collections/projects/create')
    await expect(page).toHaveURL('http://localhost:3000/admin/collections/projects/create')
    const titleField = page.locator('input[name="title"]').first()
    await expect(titleField).toBeVisible()
  })
})
