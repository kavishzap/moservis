"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Worker } from "@/lib/worker-map"
import { buildWorkersSearchPayload, mapWorkerListItemToWorker } from "@/lib/worker-map"
import { buildSearchHref, parseSearchUrlParams, ALL_DISTRICTS } from "@/lib/search-url"
import {
  SearchFiltersMobile,
  SearchFiltersProvider,
  SearchFiltersSidebar,
  useSearchFilters,
} from "@/components/search/search-filters"
import { SearchBar } from "@/components/search/search-bar"
import { WorkerCard } from "@/components/search/worker-card"
import { WorkerCardSkeletonList } from "@/components/search/worker-card-skeleton"
import {
  DEFAULT_PAGE_SIZE,
  SearchPagination,
  SearchPaginationNav,
  SearchResultsSummary,
} from "@/components/search/search-pagination"
import { getWorkers } from "@/services/workerService"
import { siteContainer } from "@/lib/site-layout"

const SEARCH_DEBOUNCE_MS = 350

function SearchResultsInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const {
    selectedDistrict,
    selectedJobTypes,
    selectedCategoryIds,
    selectedSubcategoryIds,
    searchQuery,
    categories,
    selectedMinRating,
    verifiedOnly,
    clearFilters,
  } = useSearchFilters()

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery.trim())
  const [workers, setWorkers] = useState<Worker[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE)
  const [totalItems, setTotalItems] = useState(0)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const skipUrlSyncRef = useRef(true)
  const queryPageRef = useRef(1)

  useEffect(() => {
    queryPageRef.current = page
  }, [page])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim())
    }, SEARCH_DEBOUNCE_MS)

    return () => window.clearTimeout(timer)
  }, [searchQuery])

  useLayoutEffect(() => {
    queryPageRef.current = 1
    setPage(1)
  }, [
    selectedDistrict,
    selectedJobTypes,
    debouncedSearchQuery,
    selectedCategoryIds,
    selectedSubcategoryIds,
    selectedMinRating,
    verifiedOnly,
    pageSize,
  ])

  useEffect(() => {
    const href = buildSearchHref({
      district: selectedDistrict,
      categoryIds: selectedCategoryIds,
      subcategoryIds: selectedSubcategoryIds,
      jobTypes: selectedJobTypes,
      q: debouncedSearchQuery,
      minRating: selectedMinRating,
      verifiedOnly,
    })

    const currentQs = searchParams.toString()
    const currentHref = currentQs ? `/worker?${currentQs}` : "/worker"

    if (skipUrlSyncRef.current) {
      skipUrlSyncRef.current = false
      return
    }

    if (href !== currentHref) {
      router.replace(href, { scroll: false })
    }
  }, [
    debouncedSearchQuery,
    router,
    searchParams,
    selectedCategoryIds,
    selectedDistrict,
    selectedJobTypes,
    selectedSubcategoryIds,
    selectedMinRating,
    verifiedOnly,
  ])

  const loadWorkers = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const payload = buildWorkersSearchPayload({
        page: queryPageRef.current,
        limit: pageSize,
        searchQuery: debouncedSearchQuery,
        district: selectedDistrict,
        categoryIds: selectedCategoryIds,
        subcategoryIds: selectedSubcategoryIds,
        jobTypes: selectedJobTypes,
        categories,
        minRating: selectedMinRating,
        verifiedOnly,
      })

      const result = await getWorkers(payload)
      setWorkers(result.workers.map(mapWorkerListItemToWorker))
      setTotalItems(result.pagination.total)
      setTotalPages(Math.max(1, result.pagination.total_pages))
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not load service providers."
      setError(message)
      setWorkers([])
      setTotalItems(0)
      setTotalPages(1)
    } finally {
      setLoading(false)
    }
  }, [
    page,
    pageSize,
    debouncedSearchQuery,
    selectedDistrict,
    selectedCategoryIds,
    selectedSubcategoryIds,
    selectedJobTypes,
    categories,
    selectedMinRating,
    verifiedOnly,
  ])

  useEffect(() => {
    void loadWorkers()
  }, [loadWorkers])

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [page, totalPages])

  const safePage = Math.min(page, totalPages)
  const rangeStart = totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1
  const rangeEnd = totalItems === 0 ? 0 : Math.min(safePage * pageSize, totalItems)

  const hasActiveFilters =
    debouncedSearchQuery.length > 0 ||
    selectedDistrict !== ALL_DISTRICTS ||
    selectedCategoryIds.length > 0 ||
    selectedSubcategoryIds.length > 0 ||
    selectedJobTypes.length > 0 ||
    selectedMinRating != null ||
    verifiedOnly

  const handleClearFilters = () => {
    clearFilters()
    setDebouncedSearchQuery("")
    router.replace("/worker", { scroll: false })
  }

  const goToPage = (next: number) => {
    setPage(next)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
  }

  return (
    <div className={`${siteContainer} py-6 sm:py-8`}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <SearchFiltersSidebar />

        <div className="min-w-0 flex-1 lg:min-w-0">
          <div className="mb-6 flex min-w-0 items-center gap-2 sm:gap-3">
            <SearchResultsSummary
              rangeStart={rangeStart}
              rangeEnd={rangeEnd}
              totalItems={totalItems}
              workersTotal={totalItems}
              filteredFromTotal={false}
              className="text-xs sm:text-sm"
            />
            {totalItems > 0 && !loading && totalPages > 1 && (
              <SearchPaginationNav
                page={safePage}
                totalPages={totalPages}
                onPageChange={goToPage}
                showPageNumbers={false}
                className="hidden shrink-0 md:flex"
              />
            )}
            <SearchBar className="min-w-0 flex-1 basis-0" />
            <SearchFiltersMobile />
          </div>

          {loading ? (
            <WorkerCardSkeletonList count={pageSize} />
          ) : error ? (
            <div className="rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-12 text-center">
              <p className="font-medium text-foreground">Could not load service providers</p>
              <p className="mt-2 text-sm text-muted-foreground">{error}</p>
            </div>
          ) : workers.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-teal/30 bg-muted/30 px-6 py-12 text-center">
              <p className="font-medium text-foreground">
                {hasActiveFilters
                  ? "No service providers match your search"
                  : "No service providers found"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {hasActiveFilters
                  ? "Try a different search term, category, district, rating, profile status, or clear filters."
                  : "Check back soon — new service providers join ZotServis regularly."}
              </p>
              {hasActiveFilters ? (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleClearFilters}
                  className="mt-6 rounded-full border-teal/35 font-semibold"
                >
                  <X className="mr-2 h-4 w-4 shrink-0" aria-hidden />
                  Clear filters
                </Button>
              ) : null}
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {workers.map((worker) => (
                  <WorkerCard key={worker.id} worker={worker} />
                ))}
              </div>

              <SearchPagination
                page={safePage}
                totalPages={totalPages}
                pageSize={pageSize}
                totalItems={totalItems}
                rangeStart={rangeStart}
                rangeEnd={rangeEnd}
                onPageChange={goToPage}
                onPageSizeChange={handlePageSizeChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export function SearchResultsClient() {
  const searchParams = useSearchParams()
  const urlKey = searchParams.toString()
  const {
    district: initialDistrict,
    categoryIds: initialCategoryIds,
    subcategoryIds: initialSubcategoryIds,
    jobTypes: initialJobTypes,
    searchQuery: initialSearchQuery,
    minRating: initialMinRating,
    verifiedOnly: initialVerifiedOnly,
  } = useMemo(() => parseSearchUrlParams(new URLSearchParams(urlKey)), [urlKey])

  return (
    <SearchFiltersProvider
      initialDistrict={initialDistrict}
      initialCategoryIds={initialCategoryIds}
      initialSubcategoryIds={initialSubcategoryIds}
      initialJobTypes={initialJobTypes}
      initialSearchQuery={initialSearchQuery}
      initialMinRating={initialMinRating}
      initialVerifiedOnly={initialVerifiedOnly}
    >
      <SearchResultsInner />
    </SearchFiltersProvider>
  )
}
