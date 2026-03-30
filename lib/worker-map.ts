import { MAURITIUS_DISTRICTS, SERVICE_TYPES } from "@/lib/search-options"
import { ALL_DISTRICTS } from "@/lib/search-url"

export type WorkerApplicationRow = {
  id: string
  first_name: string
  last_name: string
  worker_kind: "individual" | "contractor"
  phone: string
  email: string | null
  job_types: string[]
  other_job_type: string | null
  years_experience: number
  district: string
  areas_served: string | null
  services_offered: string[]
  subscription_plan: "monthly_100" | "yearly_1000"
  bio: string
  profile_status: string
}

export type Worker = {
  id: string
  name: string
  title: string
  /** District slug (for filtering) */
  districtValue: string
  /** Human-readable location line */
  location: string
  description: string
  services: string[]
  experience: number
  verified: boolean
  phone: string
  email: string | null
  initials: string
  workerKind: "individual" | "contractor"
  jobTypes: string[]
  jobTypeLabels: string[]
  areasServed: string | null
  subscriptionPlan: "monthly_100" | "yearly_1000"
  subscriptionPlanLabel: string
}

function labelForJobType(value: string): string {
  const found = SERVICE_TYPES.find((s) => s.value === value)
  if (value === "other") return "Other"
  return found?.label ?? value
}

function districtLabel(slug: string): string {
  return MAURITIUS_DISTRICTS.find((d) => d.value === slug)?.label ?? slug
}

function titleFromJobTypes(jobTypes: string[], otherJobType: string | null): string {
  if (jobTypes.length === 0) return "Service professional"
  const primary = jobTypes[0]
  if (primary === "other" && otherJobType?.trim()) return otherJobType.trim()
  return labelForJobType(primary)
}

function initials(first: string, last: string): string {
  const a = first.trim().charAt(0).toUpperCase()
  const b = last.trim().charAt(0).toUpperCase()
  return `${a}${b}` || "?"
}

export function mapRowToWorker(row: WorkerApplicationRow): Worker {
  const name = `${row.first_name.trim()} ${row.last_name.trim()}`.trim()
  const planLabel =
    row.subscription_plan === "monthly_100" ? "Rs 100 / month" : "Rs 1,000 / year"

  return {
    id: row.id,
    name,
    title: titleFromJobTypes(row.job_types, row.other_job_type),
    districtValue: row.district,
    location: row.areas_served?.trim()
      ? `${districtLabel(row.district)} · ${row.areas_served.trim()}`
      : districtLabel(row.district),
    description: row.bio,
    services: row.services_offered?.length ? row.services_offered : [],
    experience: row.years_experience,
    verified: row.profile_status === "active",
    phone: row.phone,
    email: row.email,
    initials: initials(row.first_name, row.last_name),
    workerKind: row.worker_kind,
    jobTypes: row.job_types,
    jobTypeLabels: row.job_types.map(labelForJobType),
    areasServed: row.areas_served,
    subscriptionPlan: row.subscription_plan,
    subscriptionPlanLabel: planLabel,
  }
}

export function workerMatchesFilters(
  worker: Worker,
  districtFilter: string,
  jobTypeFilters: string[]
): boolean {
  if (districtFilter && districtFilter !== ALL_DISTRICTS && worker.districtValue !== districtFilter) {
    return false
  }
  if (jobTypeFilters.length === 0) return true
  return jobTypeFilters.some((j) => worker.jobTypes.includes(j))
}
