import { MAURITIUS_DISTRICTS, SERVICE_TYPES } from "@/lib/search-options"

const DISTRICT_VALUES = new Set(MAURITIUS_DISTRICTS.map((d) => d.value))
const SERVICE_VALUES = new Set(SERVICE_TYPES.map((s) => s.value))

/** Same value as sidebar “All districts” — must match filter state */
export const ALL_DISTRICTS = "all"

/**
 * Reads hero / quick-link query params: `category`, `job`, `location`, `district`.
 * Ignores unknown slugs.
 */
export function parseSearchUrlParams(searchParams: URLSearchParams): {
  district: string
  jobTypes: string[]
} {
  const loc = searchParams.get("location") ?? searchParams.get("district") ?? ""
  const cat = searchParams.get("category") ?? searchParams.get("job") ?? ""

  const district = loc && DISTRICT_VALUES.has(loc) ? loc : ALL_DISTRICTS

  const jobTypes: string[] = []
  if (cat && cat !== ALL_DISTRICTS && SERVICE_VALUES.has(cat)) {
    jobTypes.push(cat)
  }

  return { district, jobTypes }
}
