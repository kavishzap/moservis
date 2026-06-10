import { encodedInvoke } from "@/lib/encoded-function"

export type RegisterWorkerPayload = {
  email: string
  worker_type: "Individual" | "Company"
  first_name?: string | null
  last_name?: string | null
  company_name?: string | null
  phone_number: string
  years_of_experience?: number | null
  district?: string | null
  areas_served?: string | null
  about?: string | null
  subscription_plan?: "Monthly" | "Yearly" | null
  terms_accepted: boolean
  category_ids: string[]
  subcategory_ids: string[]
}

export type RegisterWorkerResult = {
  success: boolean
  message: string
  user_id: string
  worker_id: string
}

export type GetWorkersPayload = {
  page?: number
  limit?: number

  search?: string | null
  district?: string | null
  worker_type?: "Individual" | "Company" | null

  category_ids?: string[]
  subcategory_ids?: string[]

  min_rating?: number | null
  verified_only?: boolean | null

  sort_by?: "rating" | "reviews" | "newest" | "experience"
  sort_order?: "asc" | "desc"
}

export type WorkerListItem = {
  id: string
  worker_type: "Individual" | "Company"

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
  profile_image: string | null

  facebook_url: string | null
  instagram_url: string | null
  tiktok_url: string | null

  is_verified: boolean

  average_rating: number
  total_reviews: number

  review_token: string

  categories: {
    id: string
    name: string
    slug: string
  }[]

  subcategories: {
    id: string
    name: string
    slug: string
  }[]

  created_at: string
}

export type GetWorkersResult = {
  success: boolean
  workers: WorkerListItem[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
    has_next_page: boolean
    has_previous_page: boolean
  }
}

export async function registerWorker(
  payload: RegisterWorkerPayload
): Promise<RegisterWorkerResult> {
  return encodedInvoke<RegisterWorkerPayload, RegisterWorkerResult>(
    "register-worker",
    payload,
  )
}

export async function getWorkers(
  payload: GetWorkersPayload = {},
): Promise<GetWorkersResult> {
  return encodedInvoke<GetWorkersPayload, GetWorkersResult>(
    "get-workers",
    payload,
  )
}

export type GetWorkerByIdPayload = {
  worker_id?: string
  review_token?: string

  reviews_page?: number
  reviews_limit?: number
  reviews_rating?: number | null
}

export type WorkerReview = {
  id: string
  date_of_service: string | null
  employee_name: string | null
  rating: number
  comments: string | null
  created_at: string
}

export type RatingBreakdownItem = {
  count: number
  percentage: number
}

export type WorkerPortfolio = {
  count: number
  images: string[]
}

export const EMPTY_WORKER_PORTFOLIO: WorkerPortfolio = {
  count: 0,
  images: [],
}

export type WorkerDetails = {
  id: string
  user_id: string

  worker_type: "Individual" | "Company"

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
  profile_image: string | null

  facebook_url: string | null
  instagram_url: string | null
  tiktok_url: string | null

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

  average_rating: number
  total_reviews: number

  calculated_average_rating: number
  calculated_total_reviews: number

  rating_breakdown: {
    5: RatingBreakdownItem
    4: RatingBreakdownItem
    3: RatingBreakdownItem
    2: RatingBreakdownItem
    1: RatingBreakdownItem
  }

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

export type GetWorkerByIdResult = {
  success: boolean
  worker: WorkerDetails
  portfolio: WorkerPortfolio
  reviews: WorkerReview[]
  reviews_pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
    has_next_page: boolean
    has_previous_page: boolean
  }
}

export async function getWorkerById(
  payload: GetWorkerByIdPayload
): Promise<GetWorkerByIdResult> {
  return encodedInvoke<GetWorkerByIdPayload, GetWorkerByIdResult>(
    "get-worker-id",
    payload,
  )
}

export type SaveWorkerReviewPayload = {
  review_token: string
  rating: number
  comments?: string | null
  date_of_service?: string | null
  employee_name?: string | null
}

export type SaveWorkerReviewResult = {
  success: boolean
  message: string
  review: {
    id: string
    worker_id: string
    date_of_service: string | null
    employee_name: string | null
    rating: number
    comments: string | null
    is_approved: boolean
    is_flagged: boolean
    created_at: string
  }
  worker_rating: {
    average_rating: number
    total_reviews: number
  }
}

export async function saveWorkerReview(
  payload: SaveWorkerReviewPayload
): Promise<SaveWorkerReviewResult> {
  return encodedInvoke<SaveWorkerReviewPayload, SaveWorkerReviewResult>(
    "save-worker-review",
    payload,
  )
}
