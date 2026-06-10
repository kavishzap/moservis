import { Skeleton } from "@/components/ui/skeleton"
import { siteContainer } from "@/lib/site-layout"
import { WorkerCardSkeletonList } from "@/components/search/worker-card-skeleton"

function SearchFiltersSidebarSkeleton() {
  return (
    <aside className="hidden w-full min-w-0 shrink-0 lg:block lg:w-72 xl:w-80" aria-hidden>
      <div className="sticky top-24 overflow-hidden rounded-2xl border border-teal/25 bg-card p-5 shadow-[0_8px_30px_rgb(30_111_138_/_0.1)] sm:p-6">
        <Skeleton className="mb-5 h-6 w-24" />
        <div className="space-y-5">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-9 w-full rounded-full" />
            <Skeleton className="h-9 w-full rounded-full" />
            <Skeleton className="h-9 w-3/4 rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-9 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </aside>
  )
}

function SearchToolbarSkeleton() {
  return (
    <div className="mb-6 flex min-w-0 items-center gap-2 sm:gap-3" aria-hidden>
      <Skeleton className="hidden h-4 w-32 md:block" />
      <Skeleton className="h-10 min-w-0 flex-1 rounded-full" />
      <Skeleton className="h-10 w-24 shrink-0 rounded-full lg:hidden" />
    </div>
  )
}

export function SearchPageSkeleton({ cardCount = 4 }: { cardCount?: number }) {
  return (
    <div
      className={`${siteContainer} py-6 sm:py-8`}
      aria-busy="true"
      aria-label="Loading workers"
    >
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <SearchFiltersSidebarSkeleton />

        <div className="min-w-0 flex-1 lg:min-w-0">
          <SearchToolbarSkeleton />
          <WorkerCardSkeletonList count={cardCount} />
        </div>
      </div>
    </div>
  )
}
