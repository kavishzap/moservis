import { Suspense } from "react"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandAmbientBlurs } from "@/components/home/brand-ambient"
import { SearchResultsClient } from "@/components/search/search-results-client"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Find Workers Across Mauritius | ZotServis",
  description:
    "Search electricians, plumbers, cleaners, gardeners and more across Mauritius. Filter by category, subcategory, and district to find trusted workers near you.",
}

export default function WorkerSearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex-1">
        <BrandAmbientBlurs />
        <Suspense
          fallback={
            <div className="mx-auto w-full max-w-[min(100%,84rem)] px-4 py-8 text-muted-foreground">
              Loading workers…
            </div>
          }
        >
          <SearchResultsClient />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
