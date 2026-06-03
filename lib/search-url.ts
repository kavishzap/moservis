import { MAURITIUS_DISTRICTS, SERVICE_TYPES } from "@/lib/search-options"

const DISTRICT_VALUES = new Set(MAURITIUS_DISTRICTS.map((d) => d.value))
const SERVICE_VALUES = new Set(SERVICE_TYPES.map((s) => s.value))

/** Same value as sidebar “All districts” — must match filter state */
export const ALL_DISTRICTS = "all"

/** @deprecated Use empty arrays for “no category filter” */
export const ALL_CATEGORIES = "all"
/** @deprecated Use empty arrays for “no subcategory filter” */
export const ALL_SUBCATEGORIES = "all"

export type ParsedSearchParams = {
  district: string
  categoryIds: string[]
  subcategoryIds: string[]
  /** Legacy slug-based job types from `?category=plumber` browse links */
  jobTypes: string[]
  searchQuery: string
  minRating: number | null
  verifiedOnly: boolean
}

function readIdParams(searchParams: URLSearchParams, key: string): string[] {
  const fromAll = searchParams.getAll(key).filter(Boolean)
  if (fromAll.length > 0) return fromAll

  const single = searchParams.get(key)
  if (single && single !== ALL_CATEGORIES && single !== ALL_SUBCATEGORIES) {
    return [single]
  }

  return []
}

/**
 * Reads search query params: repeated `category_id`, `subcategory_id`, `location`, legacy `category` slug.
 */
export function parseSearchUrlParams(searchParams: URLSearchParams): ParsedSearchParams {
  const loc = searchParams.get("location") ?? searchParams.get("district") ?? ""
  const searchQuery = (searchParams.get("q") ?? searchParams.get("search") ?? "").trim()

  const district =
    loc && DISTRICT_VALUES.has(loc as (typeof MAURITIUS_DISTRICTS)[number]["value"])
      ? loc
      : ALL_DISTRICTS

  const categoryIds = readIdParams(searchParams, "category_id")
  const subcategoryIds = readIdParams(searchParams, "subcategory_id")
  const jobTypes: string[] = []

  if (categoryIds.length === 0) {
    const cat = searchParams.get("category") ?? searchParams.get("job") ?? ""
    if (cat && cat !== ALL_DISTRICTS && SERVICE_VALUES.has(cat as (typeof SERVICE_TYPES)[number]["value"])) {
      jobTypes.push(cat)
    }
  }

  const minRatingRaw = searchParams.get("min_rating")
  const minRatingParsed = minRatingRaw ? Number(minRatingRaw) : NaN
  const minRating =
    Number.isInteger(minRatingParsed) && minRatingParsed >= 1 && minRatingParsed <= 5
      ? minRatingParsed
      : null

  const verifiedParam = searchParams.get("verified")
  const verifiedOnly = verifiedParam === "1" || verifiedParam === "true"

  return { district, categoryIds, subcategoryIds, jobTypes, searchQuery, minRating, verifiedOnly }
}

/** Builds `/worker` href for hero and category browse links. */
export function buildSearchHref(options: {
  categoryIds?: string[]
  subcategoryIds?: string[]
  district?: string
  /** Text search — stored as `q` (not `search`) */
  q?: string
  /** Legacy job slug(s) from browse links */
  categorySlug?: string
  jobTypes?: string[]
  minRating?: number | null
  verifiedOnly?: boolean
} = {}): string {
  const params = new URLSearchParams()

  if (options.categorySlug) {
    params.set("category", options.categorySlug)
  } else if ((options.categoryIds ?? []).length === 0 && (options.jobTypes ?? []).length === 1) {
    params.set("category", options.jobTypes![0])
  } else {
    for (const id of options.categoryIds ?? []) {
      if (id) params.append("category_id", id)
    }
    for (const id of options.subcategoryIds ?? []) {
      if (id) params.append("subcategory_id", id)
    }
  }

  if (options.district && options.district !== ALL_DISTRICTS) {
    params.set("location", options.district)
  }

  const search = options.q?.trim()
  if (search) params.set("q", search)

  if (options.minRating != null && options.minRating >= 1 && options.minRating <= 5) {
    params.set("min_rating", String(options.minRating))
  }

  if (options.verifiedOnly) {
    params.set("verified", "1")
  }

  const q = params.toString()
  return q ? `/worker?${q}` : "/worker"
}
