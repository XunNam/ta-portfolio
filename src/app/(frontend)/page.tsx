import type { Metadata } from 'next'

import { PortfolioPage } from '@/components/portfolio/PortfolioPage'
import { getPortfolioPageData } from '@/lib/portfolio/data'
import { getMediaURL } from '@/lib/portfolio/media'

export const dynamic = 'force-dynamic'

export const generateMetadata = async (): Promise<Metadata> => {
  const { siteSettings } = await getPortfolioPageData()
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL
  const metaImage = getMediaURL(siteSettings.meta?.metaImage)
  const keywords = siteSettings.meta?.metaKeywords?.map((keyword) => keyword.keyword).filter(Boolean)

  return {
    alternates: siteSettings.meta?.canonicalUrl ? { canonical: siteSettings.meta.canonicalUrl } : undefined,
    description: siteSettings.meta?.metaDescription || undefined,
    keywords: keywords?.length ? keywords : undefined,
    metadataBase: siteURL ? new URL(siteURL) : undefined,
    openGraph: {
      description: siteSettings.meta?.metaDescription || undefined,
      images: metaImage ? [metaImage] : undefined,
      title: siteSettings.meta?.metaTitle || siteSettings.siteName,
    },
    robots: siteSettings.meta?.robots || undefined,
    title: siteSettings.meta?.metaTitle || siteSettings.siteName,
  }
}

export default async function HomePage() {
  const data = await getPortfolioPageData()

  return <PortfolioPage {...data} />
}
