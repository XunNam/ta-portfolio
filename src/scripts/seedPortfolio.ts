import 'dotenv/config'

import { getPayload } from 'payload'

import { seedPortfolioDefaults } from '@/lib/portfolio/seedPortfolio'
import config from '@/payload.config'

const run = async () => {
  const payload = await getPayload({ config })

  await seedPortfolioDefaults(payload)

  payload.logger.info('Portfolio default content seeded.')
  process.exit(0)
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
