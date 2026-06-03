import { MAURITIUS_DISTRICTS } from "@/lib/search-options"

/** Map stored district (label or slug) to select value. */
export function resolveDistrictSelectValue(stored: string | null | undefined): string {
  if (!stored?.trim()) return ""
  const trimmed = stored.trim()
  const byLabel = MAURITIUS_DISTRICTS.find(
    (d) => d.label.toLowerCase() === trimmed.toLowerCase()
  )
  if (byLabel) return byLabel.value
  const byValue = MAURITIUS_DISTRICTS.find((d) => d.value === trimmed)
  return byValue?.value ?? trimmed
}

/** Send district label to API (matches worker profile storage). */
export function districtLabelForApi(selectValue: string): string {
  if (!selectValue) return ""
  const match = MAURITIUS_DISTRICTS.find((d) => d.value === selectValue)
  return match?.label ?? selectValue
}

type PlanProfileFields = {
  is_subscription_active: boolean
  is_trial_active: boolean
  subscription_plan: "Monthly" | "Yearly" | null
  trial_start_date: string
  trial_end_date: string
  subscription_start_date: string | null
  subscription_end_date: string | null
}

function formatDashboardDate(value: string | null | undefined): string {
  if (!value?.trim()) return ""
  const date = value.includes("T")
    ? new Date(value)
    : new Date(`${value.trim()}T12:00:00`)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-MU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

function formatDateRange(
  start: string | null | undefined,
  end: string | null | undefined,
): string {
  const startLabel = formatDashboardDate(start)
  const endLabel = formatDashboardDate(end)
  if (startLabel && endLabel) return `${startLabel} – ${endLabel}`
  if (endLabel) return `Until ${endLabel}`
  if (startLabel) return `From ${startLabel}`
  return ""
}

/** Main plan label for dashboard KPI card. */
export function planKpiTitle(profile: PlanProfileFields): string {
  if (profile.is_subscription_active) {
    return profile.subscription_plan ?? "Active subscription"
  }
  if (profile.is_trial_active) return "Trial active"
  return "Inactive"
}

/** Billing or trial period shown under the plan KPI title. */
export function planKpiPeriod(profile: PlanProfileFields): string | null {
  if (profile.is_subscription_active) {
    const period = formatDateRange(
      profile.subscription_start_date,
      profile.subscription_end_date,
    )
    return period || null
  }

  if (profile.is_trial_active) {
    const period = formatDateRange(profile.trial_start_date, profile.trial_end_date)
    return period || null
  }

  const subscriptionPeriod = formatDateRange(
    profile.subscription_start_date,
    profile.subscription_end_date,
  )
  if (subscriptionPeriod) return subscriptionPeriod

  const trialPeriod = formatDateRange(profile.trial_start_date, profile.trial_end_date)
  return trialPeriod || null
}
