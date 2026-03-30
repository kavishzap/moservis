import type { Metadata } from 'next'
import { Inter, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter"
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: "--font-geist-mono"
})

export const metadata: Metadata = {
  title: 'ZotServis - Tou servis, pre ar zot',
  description: 'Find trusted workers near you in Mauritius. Electricians, plumbers, cleaners, gardeners and more.',
  keywords: ['Mauritius', 'workers', 'services', 'electrician', 'plumber', 'cleaner', 'gardener', 'local services'],
}

export const viewport = {
  themeColor: '#39ff14',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
