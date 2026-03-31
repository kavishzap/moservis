import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HashScrollHandler } from "@/components/hash-scroll-handler"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { TrustSection } from "@/components/home/trust-section"
import { CTASection } from "@/components/home/cta-section"
import { FAQSection } from "@/components/home/faq-section"

export const metadata: Metadata = {
  title: "Find Trusted Workers in Mauritius | ZotServis",
  description:
    "Find electricians, plumbers, cleaners, gardeners and more across Mauritius. Browse worker cards and contact them directly by phone or WhatsApp.",
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <HashScrollHandler />
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <TrustSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
