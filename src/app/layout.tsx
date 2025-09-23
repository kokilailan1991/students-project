import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ProjectPAL - AI-Powered Project Content Generation',
  description: 'Generate professional project abstracts, reports, and presentations with AI. Transform your project ideas into academic-quality content in seconds.',
  keywords: 'project generation, AI abstracts, academic reports, project presentations, student tools, education technology',
  authors: [{ name: 'ProjectPAL' }],
  openGraph: {
    title: 'ProjectPAL - AI-Powered Project Content Generation',
    description: 'Generate professional project abstracts, reports, and presentations with AI.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}