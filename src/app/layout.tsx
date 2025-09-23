import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Smart SIP Planner - AI-Powered Investment Planning',
  description: 'Upload your bank statement and get personalized SIP investment recommendations. Transform your financial data into actionable investment insights.',
  keywords: 'SIP, investment, financial planning, bank statement analysis, mutual funds, wealth creation',
  authors: [{ name: 'Smart SIP Planner' }],
  openGraph: {
    title: 'Smart SIP Planner - AI-Powered Investment Planning',
    description: 'Upload your bank statement and get personalized SIP investment recommendations.',
    type: 'website',
    locale: 'en_IN',
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