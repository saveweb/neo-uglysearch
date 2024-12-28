import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ViewTransitions } from 'next-view-transitions';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '丑搜 v3',
  description: '中文独立博客全文搜索引擎（收录 2k+ 博客）',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <meta name="theme-color" content="#FE9F61" />
      </head>
      <body className={inter.className}>
        <ViewTransitions>
          {children}
        </ViewTransitions>
      </body>
    </html>
  )
}

