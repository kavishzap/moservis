import { MAURITIUS_DISTRICTS } from "@/lib/search-options"
import { ALL_DISTRICTS } from "@/lib/search-url"
import type { ServiceCategory } from "@/services/categoryService"
import type { GetWorkersPayload, WorkerListItem } from "@/services/workerService"
import { districtLabelForApi } from "@/lib/worker-dashboard"

export type Worker = {
  id: string
  name: string
  title: string
  /** District slug or stored value (for display / filters) */
  districtValue: string
  location: string
  description: string
  experience: number
  verified: boolean
  phone: string
  email: string | null
  initials: string
  workerKind: "individual" | "company"
  categories: WorkerListItem["categories"]
  subcategories: WorkerListItem["subcategories"]
  /** Category slugs — used for badges */
  jobTypes: string[]
  jobTypeLabels: string[]
  /** Subcategory names — shown as service chips */
  services: string[]
  areasServed: string | null
  averageRating: number
  totalReviews: number
}

function districtLabel(value: string | null): string {
  if (!value) return "Mauritius"
  const bySlug = MAURITIUS_DISTRICTS.find((d) => d.value === value)
  if (bySlug) return bySlug.label
  const byLabel = MAURITIUS_DISTRICTS.find(
    (d) => d.label.toLowerCase() === value.toLowerCase()
  )
  return byLabel?.label ?? value
}

function initialsFromWorker(item: WorkerListItem): string {
  if (item.worker_type === "Company" && item.company_name?.trim()) {
    return item.company_name.trim().slice(0, 2).toUpperCase()
  }
  const a = item.first_name?.trim().charAt(0).toUpperCase() ?? ""
  const b = item.last_name?.trim().charAt(0).toUpperCase() ?? ""
  return `${a}${b}` || "?"
}

export function mapWorkerListItemToWorker(item: WorkerListItem): Worker {
  const name = item.display_name?.trim() || "Worker"
  const primarySubcategory = item.subcategories[0]?.name
  const primaryCategory = item.categories[0]?.name ?? "Service worker"
  const districtValue = item.district ?? ""

  return {
    id: item.id,
    name,
    title: primarySubcategory ?? primaryCategory,
    districtValue,
    location: item.areas_served?.trim()
      ? `${districtLabel(districtValue)} · ${item.areas_served.trim()}`
      : districtLabel(districtValue),
    description: item.about ?? "",
    experience: item.years_of_experience ?? 0,
    verified: Boolean(item.is_verified),
    phone: item.phone_number,
    email: item.email,
    initials: initialsFromWorker(item),
    workerKind: item.worker_type === "Company" ? "company" : "individual",
    categories: item.categories,
    subcategories: item.subcategories,
    jobTypes: item.categories.map((c) => c.slug),
    jobTypeLabels: item.categories.map((c) => c.name),
    services: item.subcategories.map((s) => s.name),
    areasServed: item.areas_served,
    averageRating: item.average_rating,
    totalReviews: item.total_reviews,
  }
}

export function buildWorkersSearchPayload(options: {
  page: number
  limit: number
  searchQuery: string
  district: string
  categoryIds: string[]
  subcategoryIds: string[]
  jobTypes: string[]
  categories: ServiceCategory[]
  minRating: number | null
  verifiedOnly: boolean
}): GetWorkersPayload {
  const payload: GetWorkersPayload = {
    page: options.page,
    limit: options.limit,
    sort_by: "rating",
    sort_order: "desc",
  }

  const search = options.searchQuery.trim()
  if (search) payload.search = search

  if (options.district && options.district !== ALL_DISTRICTS) {
    payload.district = districtLabelForApi(options.district)
  }

  const categoryIds = [...options.categoryIds]
  if (categoryIds.length === 0 && options.jobTypes.length > 0 && options.categories.length > 0) {
    for (const slug of options.jobTypes) {
      const match = options.categories.find((c) => c.slug === slug)
      if (match && !categoryIds.includes(match.id)) categoryIds.push(match.id)
    }
  }
  if (categoryIds.length > 0) payload.category_ids = categoryIds

  if (options.subcategoryIds.length > 0) {
    payload.subcategory_ids = [...options.subcategoryIds]
  }

  if (options.minRating != null && options.minRating >= 1) {
    payload.min_rating = options.minRating
  }

  if (options.verifiedOnly) {
    payload.verified_only = true
  }

  return payload
}
