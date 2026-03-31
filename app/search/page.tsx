import { Suspense } from "react"
import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SearchResultsClient } from "@/components/search/search-results-client"
import { fetchActiveWorkers } from "@/lib/supabase/fetch-workers"

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "Search Workers Across Mauritius | ZotServis",
  description:
    "Search electricians, plumbers, cleaners, gardeners and more across Mauritius. Filter by job type and district to find trusted workers near you.",
}

function SearchHeader() {
  return (
    <div className="border-b border-primary/15 bg-secondary/25 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold uppercase tracking-tight text-foreground md:text-3xl">
          Find <span className="text-primary">Workers</span> Near You
        </h1>
      </div>
    </div>
  )
}

async function SearchResults() {
  const workers = await fetchActiveWorkers()
  return <SearchResultsClient workers={workers} />
}

export default function SearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <SearchHeader />
        <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
          <SearchResults />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
