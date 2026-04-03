import { Inter } from 'next/font/google'
import React from 'react'

import './styles.css'

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
})

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html className={inter.variable} lang="vi">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
