import type { Metadata } from "next"
import { Poppins, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

const siteUrl = "https://zotservis.com"

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ZotServis",
  url: siteUrl,
  description:
    "ZotServis is a Mauritius marketplace for finding local service workers such as electricians, plumbers, cleaners, gardeners and more.",
}

export const metadata: Metadata = {
  title: "ZotServis",
  description:
    "Find trusted workers near you in Mauritius. Electricians, plumbers, cleaners, gardeners and more.",
  keywords: [
    "Mauritius",
    "workers",
    "services",
    "electrician",
    "plumber",
    "cleaner",
    "gardener",
    "local services",
  ],
}

export const viewport = {
  themeColor: "#f59e0b",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} ${geistMono.variable} font-sans antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
