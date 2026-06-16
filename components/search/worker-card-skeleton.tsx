import { Skeleton } from "@/components/ui/skeleton"

export function WorkerCardSkeleton() {
  return (
    <article
      className="rounded-2xl border border-teal/25 bg-card p-6 shadow-[0_8px_28px_rgb(30_111_138_/_0.08)]"
      aria-hidden
    >
      <div className="flex flex-col gap-4 sm:flex-row">
        <Skeleton className="h-16 w-16 shrink-0 rounded-full" />

        <div className="min-w-0 flex-1 space-y-3">
          <Skeleton className="h-5 w-2/5 max-w-[12rem]" />

          <div className="flex flex-wrap gap-3">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-3.5 w-4/5" />
          </div>

          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          <div className="flex flex-wrap gap-2">
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-28 rounded-full" />
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            <Skeleton className="h-9 w-28 rounded-full" />
            <Skeleton className="h-9 w-32 rounded-full" />
          </div>
        </div>
      </div>
    </article>
  )
}

export function WorkerCardSkeletonList({ count = 4 }: { count?: number }) {
  return (
    <div className="space-y-4" aria-busy="true" aria-label="Loading service providers">
      {Array.from({ length: count }).map((_, index) => (
        <WorkerCardSkeleton key={index} />
      ))}
    </div>
  )
}
