import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FunDS Lite — Design Manifest',
  description: 'A pocket-sized handbook for shipping consistent fintech UI. One URL for humans and AI agents.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body data-theme="cool">{children}</body>
    </html>
  )
}
