import './globals.css'
import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions';

// import "@ibm/plex-sans-sc/css/ibm-plex-sans-sc-all.min.css";

export const metadata: Metadata = {
  title: "丑搜 v3",
  description: "中文独立博客全文搜索引擎（收录 2k+ 博客）",
  openGraph: {
    images: {
      url: "/preview.png",
      type: "image/png",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh">
      <head>
        <meta name="theme-color" content="#c24812" />
      </head>
      <body>
        <ViewTransitions>
          {children}
        </ViewTransitions>
      </body>
    </html>
  )
}
