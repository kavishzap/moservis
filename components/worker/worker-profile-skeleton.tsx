import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandAmbientBlurs } from "@/components/home/brand-ambient"
import { Skeleton } from "@/components/ui/skeleton"
import { siteContainer } from "@/lib/site-layout"

function ProfileCardSkeleton({ children }: { children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-teal/25 bg-card p-5 shadow-[0_2px_10px_rgb(11_60_93_/_0.04)] sm:p-6">
      {children}
    </section>
  )
}

function ReviewCardSkeleton() {
  return (
    <div className="rounded-xl border border-teal/20 bg-muted/20 p-4" aria-hidden>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
        <Skeleton className="h-4 w-20" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3.5 w-full" />
        <Skeleton className="h-3.5 w-5/6" />
      </div>
    </div>
  )
}

export function WorkerProfileSkeleton() {
  return (
    <div className="flex min-h-screen flex-col" aria-busy="true" aria-label="Loading worker profile">
      <Navbar />
      <main className="relative flex-1">
        <BrandAmbientBlurs subtle />

        <div className={`${siteContainer} py-6 sm:py-8`}>
          <Skeleton className="mb-5 h-4 w-32" />

          <ProfileCardSkeleton>
            <div className="space-y-4">
              <div className="flex justify-end gap-2">
                <Skeleton className="h-9 w-[4.5rem] rounded-full" />
                <Skeleton className="h-9 w-[4.5rem] rounded-full" />
              </div>
              <div className="flex items-start gap-4">
                <Skeleton className="h-16 w-16 shrink-0 rounded-full lg:h-20 lg:w-20" />
                <div className="min-w-0 flex-1 space-y-2 pt-0.5">
                  <Skeleton className="h-7 w-3/5 max-w-[12rem] lg:h-8" />
                  <Skeleton className="h-4 w-2/5 max-w-[8rem]" />
                </div>
              </div>
              <div className="space-y-2.5">
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-24" />
              </div>
              <div className="flex flex-wrap items-center gap-2 lg:hidden">
                <Skeleton className="h-9 w-24 rounded-full" />
                <Skeleton className="h-9 w-28 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
                <Skeleton className="h-9 w-9 rounded-full" />
              </div>
            </div>
          </ProfileCardSkeleton>

          <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="space-y-5">
              <ProfileCardSkeleton>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-20 rounded-full" />
                      <Skeleton className="h-6 w-24 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-28 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-28" />
                    <div className="flex flex-wrap gap-2">
                      <Skeleton className="h-6 w-24 rounded-full" />
                      <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-16" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-full" />
                    <Skeleton className="h-3.5 w-4/5" />
                  </div>
                </div>
              </ProfileCardSkeleton>

              <ProfileCardSkeleton>
                <Skeleton className="mb-4 h-5 w-24" />
              <div className="flex flex-col gap-4 sm:hidden">
                <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                <Skeleton className="aspect-[4/3] w-full rounded-xl" />
              </div>
              <div className="hidden gap-3 sm:grid sm:grid-cols-2 lg:grid-cols-3">
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="aspect-square w-full rounded-xl" />
                <Skeleton className="aspect-square w-full rounded-xl" />
              </div>
              </ProfileCardSkeleton>

              <ProfileCardSkeleton>
                <Skeleton className="mb-4 h-5 w-24" />
                <div className="mb-4 flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-12 rounded-full" />
                  <Skeleton className="h-8 w-12 rounded-full" />
                  <Skeleton className="h-8 w-12 rounded-full" />
                  <Skeleton className="h-8 w-12 rounded-full" />
                  <Skeleton className="h-8 w-12 rounded-full" />
                  <Skeleton className="h-8 w-12 rounded-full" />
                </div>
                <div className="space-y-3">
                  <ReviewCardSkeleton />
                  <ReviewCardSkeleton />
                  <ReviewCardSkeleton />
                </div>
              </ProfileCardSkeleton>
            </div>

            <aside className="hidden lg:block" aria-hidden>
              <div className="sticky top-24">
                <ProfileCardSkeleton>
                  <Skeleton className="mb-4 h-6 w-40" />
                  <div className="space-y-3">
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                    <Skeleton className="h-10 w-full rounded-md" />
                  </div>
                </ProfileCardSkeleton>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export function ReviewCardSkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3" aria-busy="true" aria-label="Loading reviews">
      {Array.from({ length: count }).map((_, index) => (
        <ReviewCardSkeleton key={index} />
      ))}
    </div>
  )
}
