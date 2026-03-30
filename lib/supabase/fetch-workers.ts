import { createClient } from "@supabase/supabase-js"
import { mapRowToWorker, type Worker, type WorkerApplicationRow } from "@/lib/worker-map"

export async function fetchActiveWorkers(): Promise<Worker[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) {
    console.warn("fetchActiveWorkers: missing Supabase env")
    return []
  }

  const supabase = createClient(url, key)
  const { data, error } = await supabase
    .from("worker_applications")
    .select(
      "id, first_name, last_name, worker_kind, phone, email, job_types, other_job_type, years_experience, district, areas_served, services_offered, subscription_plan, bio, profile_status"
    )
    .eq("profile_status", "active")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("fetchActiveWorkers:", error.message)
    return []
  }

  const rows = (data ?? []) as WorkerApplicationRow[]
  return rows.map(mapRowToWorker)
}
