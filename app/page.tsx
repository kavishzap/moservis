import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HashScrollHandler } from "@/components/hash-scroll-handler"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { TrustSection } from "@/components/home/trust-section"
import { CTASection } from "@/components/home/cta-section"
import { FAQSection } from "@/components/home/faq-section"
import { getServiceCategories } from "@/services/categoryService"

export const metadata: Metadata = {
  title: "Find Trusted Workers in Mauritius | ZotServis",
  description:
    "Find electricians, plumbers, cleaners, gardeners and more across Mauritius. Browse worker cards and contact them directly by phone or WhatsApp.",
}

export default async function HomePage() {
  let categories: Awaited<ReturnType<typeof getServiceCategories>> = []

  try {
    categories = await getServiceCategories()
  } catch (err) {
    console.error("Home categories:", err)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <HashScrollHandler />
      <Navbar />
      <main className="relative flex-1">
        <HeroSection />
        <section className="relative" aria-label="Community">
          <TrustSection />
          <CategoriesSection categories={categories} />
        </section>
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
