import { encodedInvoke } from "@/lib/encoded-function"

export type WorkerType = "Individual" | "Company"

export type WorkerDashboardProfile = {
  id: string
  user_id: string

  worker_type: WorkerType

  display_name: string | null

  first_name: string | null
  last_name: string | null
  company_name: string | null

  phone_number: string
  email: string

  years_of_experience: number | null
  district: string | null
  areas_served: string | null
  about: string | null

  subscription_plan: "Monthly" | "Yearly" | null
  trial_start_date: string
  trial_end_date: string
  subscription_start_date: string | null
  subscription_end_date: string | null
  is_trial_active: boolean
  is_subscription_active: boolean

  is_active: boolean
  is_verified: boolean
  verification_status: "Pending" | "Verified" | "Rejected"

  review_token: string
  review_link: string

  average_rating: number
  total_reviews: number

  category_ids: string[]
  subcategory_ids: string[]

  categories: {
    id: string
    name: string
    slug: string
    description: string | null
  }[]

  subcategories: {
    id: string
    name: string
    slug: string
    description: string | null
  }[]

  created_at: string
  updated_at: string
}

export type GetMyWorkerProfileResult = {
  success: boolean
  profile: WorkerDashboardProfile
}

export type UpdateMyWorkerProfilePayload = {
  worker_type?: WorkerType

  first_name?: string | null
  last_name?: string | null
  company_name?: string | null

  phone_number?: string
  email?: string

  years_of_experience?: number | null
  district?: string | null
  areas_served?: string | null
  about?: string | null

  category_ids?: string[]
  subcategory_ids?: string[]
}

export type UpdateMyWorkerProfileResult = {
  success: boolean
  message: string
  profile: WorkerDashboardProfile
}

export async function getMyWorkerProfile(): Promise<GetMyWorkerProfileResult> {
  return encodedInvoke<Record<string, never>, GetMyWorkerProfileResult>(
    "get-my-worker-profile",
    {},
  )
}

export async function updateMyWorkerProfile(
  payload: UpdateMyWorkerProfilePayload,
): Promise<UpdateMyWorkerProfileResult> {
  return encodedInvoke<
    UpdateMyWorkerProfilePayload,
    UpdateMyWorkerProfileResult
  >("update-my-worker-profile", payload)
}
