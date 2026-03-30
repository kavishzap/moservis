"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import type { Worker } from "@/lib/worker-map"
import { workerMatchesFilters } from "@/lib/worker-map"
import { parseSearchUrlParams } from "@/lib/search-url"
import {
  SearchFiltersMobile,
  SearchFiltersProvider,
  SearchFiltersSidebar,
  useSearchFilters,
} from "@/components/search/search-filters"
import { WorkerCard } from "@/components/search/worker-card"
import { Button } from "@/components/ui/button"

const PAGE_SIZE = 10

function SearchResultsInner({ workers }: { workers: Worker[] }) {
  const { selectedDistrict, selectedJobTypes } = useSearchFilters()
  const [page, setPage] = useState(1)

  const filtered = useMemo(
    () =>
      workers.filter((w) => workerMatchesFilters(w, selectedDistrict, selectedJobTypes)),
    [workers, selectedDistrict, selectedJobTypes]
  )

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const start = (safePage - 1) * PAGE_SIZE
  const pageWorkers = filtered.slice(start, start + PAGE_SIZE)
  const rangeEnd = filtered.length === 0 ? 0 : Math.min(start + PAGE_SIZE, filtered.length)

  useEffect(() => {
    setPage(1)
  }, [selectedDistrict, selectedJobTypes])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const goToPage = (next: number) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex gap-8">
        <SearchFiltersSidebar />

        <div className="min-w-0 flex-1">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <p className="text-muted-foreground">
              {filtered.length > 0 ? (
                <>
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {start + 1}–{rangeEnd}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">{filtered.length}</span>
                  {filtered.length === 1 ? " worker" : " workers"}
                </>
              ) : (
                <>
                  <span className="font-medium text-foreground">0</span> workers
                </>
              )}
              {workers.length !== filtered.length && filtered.length > 0 && (
                <span className="text-muted-foreground">
                  {" "}
                  (of {workers.length} active)
                </span>
              )}
            </p>
            <SearchFiltersMobile />
          </div>

          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-primary/30 bg-muted/30 px-6 py-12 text-center">
              <p className="font-medium text-foreground">
                {workers.length === 0
                  ? "No active workers listed yet"
                  : "No workers match your filters"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {workers.length === 0
                  ? "Launching on 11 APRIL 2024"
                  : "Try another district or job type, or clear filters to see everyone."}
              </p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {pageWorkers.map((worker) => (
                  <WorkerCard key={worker.id} worker={worker} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-col items-stretch gap-4 border-t border-primary/20 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-center text-sm text-muted-foreground sm:text-left">
                    Page <span className="font-medium text-foreground">{safePage}</span> of{" "}
                    <span className="font-medium text-foreground">{totalPages}</span>
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full border-primary/35"
                      disabled={safePage <= 1}
                      onClick={() => goToPage(safePage - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-full border-primary/35"
                      disabled={safePage >= totalPages}
                      onClick={() => goToPage(safePage + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function SearchResultsClient({ workers }: { workers: Worker[] }) {
  const searchParams = useSearchParams()
  const urlKey = searchParams.toString()
  const { district: initialDistrict, jobTypes: initialJobTypes } = useMemo(
    () => parseSearchUrlParams(new URLSearchParams(urlKey)),
    [urlKey]
  )

  return (
    <SearchFiltersProvider
      key={urlKey}
      initialDistrict={initialDistrict}
      initialJobTypes={initialJobTypes}
    >
      <SearchResultsInner workers={workers} />
    </SearchFiltersProvider>
  )
}
