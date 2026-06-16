"use client"

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { BrandAmbientBlurs } from "@/components/home/brand-ambient"
import { WorkerContactActions } from "@/components/worker-contact-actions"
import { WorkerReviewActions } from "@/components/worker/worker-review-actions"
import { SearchPaginationNav } from "@/components/search/search-pagination"
import { WorkerAvatar } from "@/components/worker/worker-avatar"
import { WorkerPortfolioSection } from "@/components/worker/worker-portfolio-section"
import { WorkerSocialLinks } from "@/components/worker/worker-social-links"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  MapPin,
  Star,
  BadgeCheck,
  Clock,
  Mail,
  UserCircle,
} from "lucide-react"
import { WorkerProfileSkeleton, ReviewCardSkeletonList } from "@/components/worker/worker-profile-skeleton"
import { siteContainer } from "@/lib/site-layout"
import {
  districtLabel,
  formatReviewDate,
  parseAreasServed,
  reviewAuthorInitials,
  workerDisplayInitials,
  workerLocationLine,
  workerProfileTitle,
} from "@/lib/worker-profile"
import {
  getWorkerById,
  EMPTY_WORKER_PORTFOLIO,
  type WorkerDetails,
  type WorkerPortfolio,
  type WorkerReview,
} from "@/services/workerService"
import { cn } from "@/lib/utils"

const REVIEWS_LIMIT = 10

function ProfileCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-teal/25 bg-card p-5 shadow-[0_2px_10px_rgb(11_60_93_/_0.04)] sm:p-6",
        className
      )}
    >
      {children}
    </section>
  )
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of ${max} stars`}>
      {Array.from({ length: max }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < rating ? "fill-gold text-gold" : "text-muted-foreground/30"}`}
          aria-hidden
        />
      ))}
    </div>
  )
}

function WorkerProfileMeta({
  worker,
  rating,
  reviewCount,
  variant,
}: {
  worker: WorkerDetails
  rating: number
  reviewCount: number
  variant: "stacked" | "inline"
}) {
  if (variant === "stacked") {
    return (
      <ul className="space-y-2.5 text-sm text-muted-foreground">
        <li className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
          <span className="min-w-0 leading-snug">{workerLocationLine(worker)}</span>
        </li>
        {worker.years_of_experience != null && (
          <li className="flex items-start gap-2.5">
            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
            <span className="min-w-0 leading-snug">
              {worker.years_of_experience} years experience
            </span>
          </li>
        )}
        <li className="flex items-start gap-2.5">
          <UserCircle className="mt-0.5 h-4 w-4 shrink-0 text-teal" aria-hidden />
          <span className="min-w-0 capitalize leading-snug">{worker.worker_type}</span>
        </li>
        {reviewCount > 0 && (
          <li className="flex items-start gap-2.5">
            <Star className="mt-0.5 h-4 w-4 shrink-0 fill-gold text-gold" aria-hidden />
            <span className="inline-flex min-w-0 flex-wrap items-center gap-1 leading-snug">
              <span className="font-medium text-ocean">{rating.toFixed(1)}</span>
              <span>
                ({reviewCount} {reviewCount === 1 ? "review" : "reviews"})
              </span>
            </span>
          </li>
        )}
      </ul>
    )
  }

  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
      <span className="inline-flex items-center gap-1">
        <MapPin className="h-4 w-4 shrink-0 text-teal" aria-hidden />
        {workerLocationLine(worker)}
      </span>
      {worker.years_of_experience != null && (
        <span className="inline-flex items-center gap-1">
          <Clock className="h-4 w-4 shrink-0 text-teal" aria-hidden />
          {worker.years_of_experience} years experience
        </span>
      )}
      <span className="inline-flex items-center gap-1 capitalize">
        <UserCircle className="h-4 w-4 shrink-0 text-teal" aria-hidden />
        {worker.worker_type}
      </span>
      {reviewCount > 0 && (
        <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 px-2.5 py-0.5">
          <Star className="h-4 w-4 fill-gold text-gold" aria-hidden />
          <span className="font-medium text-ocean">{rating.toFixed(1)}</span>
          <span className="text-muted-foreground">({reviewCount})</span>
        </span>
      )}
    </div>
  )
}

function ContactCard({ worker }: { worker: WorkerDetails }) {
  const name = worker.display_name?.trim() || "Worker"
  const firstName = name.split(/\s+/)[0] ?? name
  const socialLinks = {
    facebook_url: worker.facebook_url,
    instagram_url: worker.instagram_url,
    tiktok_url: worker.tiktok_url,
  }

  return (
    <ProfileCard>
      <h3 className="mb-4 text-lg font-semibold text-foreground">Contact {firstName}</h3>
      <div className="space-y-3">
        <WorkerContactActions
          phone={worker.phone_number}
          workerName={name}
          title={workerProfileTitle(worker)}
          layout="stacked"
        />
        {worker.email ? (
          <Button variant="outline" className="w-full gap-2" asChild>
            <a href={`mailto:${worker.email}?subject=Inquiry%20from%20ZotServis`}>
              <Mail className="h-4 w-4" />
              Send inquiry
            </a>
          </Button>
        ) : null}
        <WorkerSocialLinks links={socialLinks} variant="icons" />
      </div>
    </ProfileCard>
  )
}

function ReviewCard({ review }: { review: WorkerReview }) {
  const label =
    review.employee_name?.trim() ||
    (review.date_of_service ? `Customer · ${formatReviewDate(review.date_of_service)}` : "Customer")
  const dateLabel = formatReviewDate(review.created_at)

  return (
    <div className="rounded-xl border border-teal/20 bg-muted/20 p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="h-10 w-10 shrink-0">
            <AvatarFallback className="bg-teal/15 text-teal">
              {reviewAuthorInitials(review.employee_name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-medium text-foreground">{label}</p>
            {dateLabel ? <p className="text-xs text-muted-foreground">{dateLabel}</p> : null}
          </div>
        </div>
        <StarRating rating={review.rating} />
      </div>
      {review.comments ? (
        <p className="text-sm text-muted-foreground">{review.comments}</p>
      ) : (
        <p className="text-sm italic text-muted-foreground">No written comment.</p>
      )}
    </div>
  )
}

function ReviewRatingFilter({
  value,
  onChange,
  breakdown,
  disabled,
}: {
  value: number | null
  onChange: (rating: number | null) => void
  breakdown: WorkerDetails["rating_breakdown"]
  disabled?: boolean
}) {
  const options: { rating: number | null; label: string; count?: number }[] = [
    { rating: null, label: "All" },
    ...([5, 4, 3, 2, 1] as const).map((rating) => ({
      rating,
      label: `${rating}★`,
      count: breakdown[rating].count,
    })),
  ]

  return (
    <div
      className="flex flex-wrap gap-2"
      role="group"
      aria-label="Filter reviews by rating"
    >
      {options.map(({ rating, label, count }) => {
        const isActive = value === rating
        return (
          <button
            key={rating ?? "all"}
            type="button"
            disabled={disabled}
            aria-pressed={isActive}
            onClick={() => onChange(rating)}
            className={cn(
              "inline-flex h-8 items-center gap-1 rounded-full border px-3 text-xs font-medium transition-colors disabled:opacity-50",
              isActive
                ? "border-teal/50 bg-teal/10 text-teal"
                : "border-teal/25 bg-muted/30 text-muted-foreground hover:border-teal/40 hover:text-foreground"
            )}
          >
            {label}
            {count != null && count > 0 ? (
              <span className="text-[10px] opacity-75">({count})</span>
            ) : null}
          </button>
        )
      })}
    </div>
  )
}

export function WorkerProfileClient({ workerId }: { workerId: string }) {
  const [worker, setWorker] = useState<WorkerDetails | null>(null)
  const [portfolio, setPortfolio] = useState<WorkerPortfolio>(EMPTY_WORKER_PORTFOLIO)
  const [reviews, setReviews] = useState<WorkerReview[]>([])
  const [reviewsPage, setReviewsPage] = useState(1)
  const [reviewsTotalPages, setReviewsTotalPages] = useState(1)
  const [reviewsFilteredTotal, setReviewsFilteredTotal] = useState(0)
  const [ratingFilter, setRatingFilter] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [reviewsLoading, setReviewsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)
  const profileLoadedRef = useRef(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const loadProfile = useCallback(
    async (page: number, rating: number | null = ratingFilter) => {
      const reviewsOnly = profileLoadedRef.current

      if (reviewsOnly) {
        setReviewsLoading(true)
      } else {
        setLoading(true)
        setError(null)
      }

      try {
        const result = await getWorkerById({
          worker_id: workerId,
          reviews_page: page,
          reviews_limit: REVIEWS_LIMIT,
          reviews_rating: rating,
        })

        setWorker(result.worker)
        setPortfolio(result.portfolio ?? EMPTY_WORKER_PORTFOLIO)
        setReviews(result.reviews)
        setReviewsPage(result.reviews_pagination.page)
        setReviewsTotalPages(result.reviews_pagination.total_pages)
        setReviewsFilteredTotal(result.reviews_pagination.total)
        profileLoadedRef.current = true
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Could not load worker profile."
        setError(message)
        if (!reviewsOnly) {
          setWorker(null)
          setPortfolio(EMPTY_WORKER_PORTFOLIO)
          setReviews([])
          profileLoadedRef.current = false
        }
      } finally {
        setLoading(false)
        setReviewsLoading(false)
      }
    },
    [workerId, ratingFilter]
  )

  useEffect(() => {
    profileLoadedRef.current = false
    setRatingFilter(null)
    setPortfolio(EMPTY_WORKER_PORTFOLIO)
    setReviews([])
    setReviewsPage(1)
  }, [workerId])

  useEffect(() => {
    void loadProfile(1, ratingFilter)
  }, [loadProfile, ratingFilter])

  const handleRatingFilterChange = (rating: number | null) => {
    setRatingFilter(rating)
    setReviewsPage(1)
  }

  const handleReviewsPageChange = (page: number) => {
    if (page < 1 || page > reviewsTotalPages || page === reviewsPage || reviewsLoading) {
      return
    }
    void loadProfile(page, ratingFilter)
  }

  if (!mounted || loading) {
    return <WorkerProfileSkeleton />
  }

  if (error || !worker) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="relative flex-1">
          <BrandAmbientBlurs subtle />
          <div className={`${siteContainer} flex flex-col items-center justify-center py-16 text-center`}>
            <p className="font-medium text-foreground">Worker not found</p>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {error ?? "This profile may be unavailable or no longer active."}
            </p>
            <Button asChild className="mt-6">
              <Link href="/worker">Back to search</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const name = worker.display_name?.trim() || "Worker"
  const title = workerProfileTitle(worker)
  const rating = worker.calculated_average_rating || worker.average_rating
  const reviewCount = worker.calculated_total_reviews || worker.total_reviews
  const reviewsListTotal = ratingFilter != null ? reviewsFilteredTotal : reviewCount
  const reviewsRangeStart =
    reviewsListTotal === 0 ? 0 : (reviewsPage - 1) * REVIEWS_LIMIT + 1
  const reviewsRangeEnd = Math.min(reviewsPage * REVIEWS_LIMIT, reviewsListTotal)
  const areas = parseAreasServed(worker.areas_served)
  const district = districtLabel(worker.district)
  const socialLinks = {
    facebook_url: worker.facebook_url,
    instagram_url: worker.instagram_url,
    tiktok_url: worker.tiktok_url,
  }
  const hasAboutSection =
    worker.about ||
    worker.categories.length > 0 ||
    worker.subcategories.length > 0 ||
    Boolean(worker.district) ||
    areas.length > 0
  const hasPortfolio = portfolio.count > 0 && portfolio.images.length > 0

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="relative flex-1">
        <BrandAmbientBlurs subtle />

        <div className={`${siteContainer} py-6 sm:py-8`}>
          <Link
            href="/worker"
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-teal hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Find Service Providers
          </Link>

          <ProfileCard className="mb-6">
            {/* Mobile */}
            <div className="space-y-4 lg:hidden">
              <div className="flex justify-end">
                <WorkerReviewActions reviewToken={worker.review_token} />
              </div>

              <div className="flex items-start gap-4">
                <WorkerAvatar
                  profileImage={worker.profile_image}
                  initials={workerDisplayInitials(worker)}
                  className="h-16 w-16 shrink-0"
                  fallbackClassName="text-xl"
                />
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h1 className="text-xl font-bold text-foreground">{name}</h1>
                    {worker.is_verified && (
                      <BadgeCheck className="h-5 w-5 text-accent" aria-label="Listed profile" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{title}</p>
                </div>
              </div>

              <WorkerProfileMeta
                worker={worker}
                rating={rating}
                reviewCount={reviewCount}
                variant="stacked"
              />

              <div className="flex flex-wrap items-center gap-2">
                <WorkerContactActions
                  phone={worker.phone_number}
                  workerName={name}
                  title={title}
                />
                <WorkerSocialLinks links={socialLinks} variant="icons" />
              </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:flex lg:flex-col lg:gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 flex-1 gap-5">
                  <WorkerAvatar
                    profileImage={worker.profile_image}
                    initials={workerDisplayInitials(worker)}
                    className="h-20 w-20 shrink-0"
                    fallbackClassName="text-2xl"
                  />

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-wrap items-center gap-2">
                      <h1 className="text-2xl font-bold text-foreground">{name}</h1>
                      {worker.is_verified && (
                        <BadgeCheck className="h-5 w-5 text-accent" aria-label="Listed profile" />
                      )}
                    </div>
                    <p className="mb-3 text-base text-muted-foreground">{title}</p>

                    <WorkerProfileMeta
                      worker={worker}
                      rating={rating}
                      reviewCount={reviewCount}
                      variant="inline"
                    />
                  </div>
                </div>

                <WorkerReviewActions reviewToken={worker.review_token} />
              </div>
            </div>
          </ProfileCard>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] xl:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="space-y-5">
              {hasAboutSection && (
                <ProfileCard className="space-y-5">
                  {worker.categories.length > 0 && (
                    <div>
                      <h2 className="mb-2 text-base font-semibold text-foreground">Categories</h2>
                      <div className="flex flex-wrap gap-2">
                        {worker.categories.map((c) => (
                          <Badge key={c.id} variant="outline" className="text-xs">
                            {c.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {worker.subcategories.length > 0 && (
                    <div>
                      <h2 className="mb-2 text-base font-semibold text-foreground">
                        Services offered
                      </h2>
                      <div className="flex flex-wrap gap-2">
                        {worker.subcategories.map((s) => (
                          <Badge key={s.id} variant="secondary" className="text-xs">
                            {s.name}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {(worker.district || areas.length > 0) && (
                    <div>
                      <h2 className="mb-2 text-base font-semibold text-foreground">Areas covered</h2>
                      <div className="flex flex-wrap gap-2">
                        {worker.district ? (
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="mr-1 h-3 w-3" aria-hidden />
                            {district}
                          </Badge>
                        ) : null}
                        {areas.map((area) => (
                          <Badge key={area} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                        {areas.length === 0 && !worker.district && (
                          <span className="text-sm text-muted-foreground">Mauritius-wide</span>
                        )}
                      </div>
                    </div>
                  )}

                  {worker.about ? (
                    <div>
                      <h2 className="mb-2 text-base font-semibold text-foreground">About</h2>
                      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">
                        {worker.about}
                      </p>
                    </div>
                  ) : null}
                </ProfileCard>
              )}

              {hasPortfolio && <WorkerPortfolioSection portfolio={portfolio} />}

              <ProfileCard>
                <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                  <h2 className="text-base font-semibold text-foreground">
                    Reviews ({ratingFilter != null ? reviewsFilteredTotal : reviewCount})
                  </h2>
                  {reviewCount > 0 && (
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-gold text-gold" aria-hidden />
                      <span className="font-semibold text-foreground">{rating.toFixed(1)}</span>
                    </div>
                  )}
                </div>

                {reviewCount > 0 && worker.rating_breakdown && (
                  <div className="mb-4">
                    <ReviewRatingFilter
                      value={ratingFilter}
                      onChange={handleRatingFilterChange}
                      breakdown={worker.rating_breakdown}
                      disabled={reviewsLoading && !loading}
                    />
                  </div>
                )}

                {reviewsLoading && reviews.length === 0 ? (
                  <ReviewCardSkeletonList count={3} />
                ) : reviews.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    {ratingFilter != null
                      ? `No ${ratingFilter}-star reviews yet.`
                      : "No reviews yet."}
                  </p>
                ) : (
                  <div
                    className={cn(
                      "space-y-3",
                      reviewsLoading && reviews.length > 0 && "opacity-60"
                    )}
                  >
                    {reviews.map((review) => (
                      <ReviewCard key={review.id} review={review} />
                    ))}
                  </div>
                )}

                {reviewsTotalPages > 1 && reviews.length > 0 && (
                  <div className="mt-5 space-y-3 border-t border-border/80 pt-4">
                    <p className="text-center text-sm text-muted-foreground">
                      Showing{" "}
                      <span className="font-medium text-foreground">
                        {reviewsRangeStart}–{reviewsRangeEnd}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium text-foreground">{reviewsListTotal}</span>
                      {" · "}
                      Page{" "}
                      <span className="font-medium text-foreground">{reviewsPage}</span> of{" "}
                      <span className="font-medium text-foreground">{reviewsTotalPages}</span>
                    </p>
                    <SearchPaginationNav
                      page={reviewsPage}
                      totalPages={reviewsTotalPages}
                      onPageChange={handleReviewsPageChange}
                      showPageNumbers={reviewsTotalPages <= 5}
                      className="justify-center"
                    />
                  </div>
                )}
              </ProfileCard>
            </div>

            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <ContactCard worker={worker} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
