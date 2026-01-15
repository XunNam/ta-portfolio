import React from 'react'
import './styles.css'
import type { Metadata } from 'next'

// Phông chữ
import { Roboto_Mono, Inter } from 'next/font/google'

//Components
import NavigationBar from '@/components/Navigation Bar/Navigation Desktop'

export const metadata: Metadata = {
  description: 'Một dự án Portfolio được xây dựng trên nền tảng NextJS.',
  title: 'Thế Anh | Portfolio',
  icons: {
    icon: '/icon/vercel.ico',
  },
}

// Khai báo phông chữ
export const roboto_mono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
})

export const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="vi" className={`${roboto_mono.variable} ${inter.variable} antialiased`}>
      <body>
        <nav>
          <NavigationBar />
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
