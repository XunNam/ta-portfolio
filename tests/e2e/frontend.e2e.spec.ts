import { getPayload } from 'payload'
import { test, expect } from '@playwright/test'

import config from '../../src/payload.config.js'
import { seedPortfolioDefaults } from '../../src/lib/portfolio/seedPortfolio.js'

test.describe('Frontend', () => {
  test.beforeAll(async () => {
    const payload = await getPayload({ config })
    await seedPortfolioDefaults(payload)
  })

  test('can go on homepage', async ({ page }) => {
    await page.goto('http://localhost:3000')

    await expect(page).toHaveTitle(/Portfolio - Bùi Thế Anh/)

    const heading = page.locator('h1').first()
    const nav = page.locator('nav')
    const projectsHeading = page.getByRole('heading', { name: 'Dự án tiêu biểu' })

    await expect(heading).toHaveText('Bùi Thế Anh')
    await expect(nav).toContainText('Giới thiệu')
    await expect(nav).toContainText('Kỹ năng')
    await expect(nav).toContainText('Dự án')
    await expect(nav).toContainText('Liên hệ')
    await expect(projectsHeading).toBeVisible()
    await expect(page.getByText('E-Commerce Dashboard')).toBeVisible()
    await expect(page.getByText('React').first()).toBeVisible()
    await expect(page.getByText('Xem chi tiết').first()).toBeVisible()
  })
})
