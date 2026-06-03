import { MAURITIUS_DISTRICTS } from "@/lib/search-options"
import type { WorkerDetails } from "@/services/workerService"

export function districtLabel(value: string | null): string {
  if (!value) return "Mauritius"
  const bySlug = MAURITIUS_DISTRICTS.find((d) => d.value === value)
  if (bySlug) return bySlug.label
  const byLabel = MAURITIUS_DISTRICTS.find(
    (d) => d.label.toLowerCase() === value.toLowerCase()
  )
  return byLabel?.label ?? value
}

export function workerDisplayInitials(worker: WorkerDetails): string {
  if (worker.worker_type === "Company" && worker.company_name?.trim()) {
    return worker.company_name.trim().slice(0, 2).toUpperCase()
  }
  const a = worker.first_name?.trim().charAt(0).toUpperCase() ?? ""
  const b = worker.last_name?.trim().charAt(0).toUpperCase() ?? ""
  return `${a}${b}` || "?"
}

export function workerProfileTitle(worker: WorkerDetails): string {
  const primarySubcategory = worker.subcategories[0]?.name
  const primaryCategory = worker.categories[0]?.name
  return primarySubcategory ?? primaryCategory ?? "Service worker"
}

export function workerLocationLine(worker: WorkerDetails): string {
  const district = districtLabel(worker.district)
  if (worker.areas_served?.trim()) {
    return `${district} · ${worker.areas_served.trim()}`
  }
  return district
}

export function parseAreasServed(areas: string | null): string[] {
  if (!areas?.trim()) return []
  return areas
    .split(/[,;]/)
    .map((s) => s.trim())
    .filter(Boolean)
}

export function reviewAuthorInitials(name: string | null): string {
  if (!name?.trim()) return "?"
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()
}

export function formatReviewDate(iso: string | null): string {
  if (!iso) return ""
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return ""
  return date.toLocaleDateString("en-MU", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}
