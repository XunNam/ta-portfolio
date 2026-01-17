import React from 'react'
import './styles.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Dự án Portfolio của Thế Anh được xây dựng trên NextJS.',
  title: 'Thế Anh | Portfolio',
}

export default async function RootLayout(props: Readonly<{ children: React.ReactNode }>) {
  const { children } = props

  return (
    <html lang="vi">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
