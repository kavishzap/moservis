import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HashScrollHandler } from "@/components/hash-scroll-handler"
import { HeroSection } from "@/components/home/hero-section"
import { CategoriesSection } from "@/components/home/categories-section"
import { TrustSection } from "@/components/home/trust-section"
import { CTASection } from "@/components/home/cta-section"
import { FAQSection } from "@/components/home/faq-section"

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
