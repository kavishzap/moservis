import { getSupabaseBrowserClient } from "@/lib/supabase/browser-client"
import type { WorkerPlanId } from "@/lib/worker-pricing"

export type WorkerApplicationInsert = {
  first_name: string
  last_name: string
  worker_kind: "individual" | "contractor"
  phone: string
  email: string
  job_types: string[]
  other_job_type: string | null
  years_experience: number
  district: string
  areas_served: string | null
  services_offered: string[]
  subscription_plan: WorkerPlanId
  bio: string
  terms_accepted_at: string
}

export function normalizeEmail(raw: string): string {
  return raw.trim().toLowerCase()
}

export function isUniqueViolation(error: { code?: string; message?: string }): boolean {
  if (error.code === "23505") return true
  const m = error.message?.toLowerCase() ?? ""
  return m.includes("duplicate") || m.includes("unique constraint")
}

export async function submitWorkerApplication(row: WorkerApplicationInsert) {
  const supabase = getSupabaseBrowserClient()
  return supabase.from("worker_applications").insert(row)
}
