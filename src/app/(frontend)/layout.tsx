import React from 'react'
import './styles.css'
import { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import NavigationBar from '@/components/Navigation Bar/NavigationBar'

export const metadata: Metadata = {
  description: 'Dự án Portfolio của Thế Anh được xây dựng trên NextJS.',
  title: 'Thế Anh | Portfolio',
}

// Khai báo phông chữ
const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-gortesk',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export default async function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props

  return (
    <html lang="vi" className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
      <body>
        <nav>
          <NavigationBar />
        </nav>
        <main>{children}</main>
      </body>
    </html>
  )
}
