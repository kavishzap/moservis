"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { toast } from "@/lib/toast"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandAmbientBlurs } from "@/components/home/brand-ambient"
import { WorkerReviewForm } from "@/components/worker/worker-review-form"
import { Button } from "@/components/ui/button"
import { siteContainer } from "@/lib/site-layout"
import { getWorkerById } from "@/services/workerService"

type ReviewWorkerPageClientProps = {
  reviewToken: string
}

export function ReviewWorkerPageClient({ reviewToken }: ReviewWorkerPageClientProps) {
  const token = reviewToken.trim()

  const [workerName, setWorkerName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadWorker = useCallback(async () => {
    if (!token) {
      setError("Missing review link token.")
      setWorkerName(null)
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const result = await getWorkerById({ review_token: token, reviews_limit: 1 })
      setWorkerName(result.worker.display_name?.trim() || "Worker")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid or expired review link.")
      setWorkerName(null)
    } finally {
      setLoading(false)
    }
  }, [token])

  useEffect(() => {
    void loadWorker()
  }, [loadWorker])

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex-1">
        <BrandAmbientBlurs />
        <div className={`${siteContainer} py-8`}>
          <Link
            href="/worker"
            className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Find Service Providers
          </Link>

          <div className="mx-auto max-w-lg rounded-2xl border border-teal/25 bg-card p-6 shadow-[0_8px_28px_rgb(30_111_138_/_0.08)] sm:p-8">
            <h1 className="text-2xl font-bold text-foreground">Leave a review</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Your feedback helps other people discover local service providers on ZotServis.
            </p>

            {loading ? (
              <div className="mt-8 flex items-center justify-center gap-2 py-12 text-muted-foreground">
                <Loader2 className="h-5 w-5 animate-spin text-teal" aria-hidden />
                Loading worker…
              </div>
            ) : error || !workerName ? (
              <div className="mt-8 space-y-4 text-center">
                <p className="font-medium text-foreground">Review link unavailable</p>
                <p className="text-sm text-muted-foreground">{error}</p>
                <Button asChild variant="outline">
                  <Link href="/worker">Find Service Providers</Link>
                </Button>
              </div>
            ) : (
              <div className="mt-6">
                <WorkerReviewForm workerName={workerName} reviewToken={token} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
