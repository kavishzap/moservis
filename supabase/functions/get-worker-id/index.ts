import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import {
  readEncodedPayload,
  encodedJsonResponse,
} from "../_shared/encoded.ts"
import {
  normalizePortfolioImages,
  MAX_RESPONSE_DATA_URI_LENGTH,
  MAX_PORTFOLIO_RESPONSE_LENGTH,
  buildPortfolioResponse,
  sanitizeProfileImageForResponse,
} from "../_shared/response-images.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

type GetWorkerByIdPayload = {
  worker_id?: string
  review_token?: string

  reviews_page?: number
  reviews_limit?: number
  /** Filter reviews by star rating (1–5). Omit for all ratings. */
  reviews_rating?: number | null
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405)
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse(
        { error: "Missing Supabase environment variables" },
        500,
      )
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const body = await readEncodedPayload<GetWorkerByIdPayload>(req)

    const workerId = body.worker_id?.trim() || null
    const reviewToken = body.review_token?.trim() || null

    if (!workerId && !reviewToken) {
      return jsonResponse(
        { error: "worker_id or review_token is required" },
        400,
      )
    }

    const reviewsPage = Math.max(Number(body.reviews_page ?? 1), 1)
    const reviewsLimit = Math.min(
      Math.max(Number(body.reviews_limit ?? 10), 1),
      50,
    )

    const reviewsFrom = (reviewsPage - 1) * reviewsLimit
    const reviewsTo = reviewsFrom + reviewsLimit - 1

    const reviewsRatingRaw = body.reviews_rating
    const reviewsRating =
      reviewsRatingRaw != null && reviewsRatingRaw !== ""
        ? Number(reviewsRatingRaw)
        : null
    const hasRatingFilter =
      reviewsRating != null &&
      Number.isInteger(reviewsRating) &&
      reviewsRating >= 1 &&
      reviewsRating <= 5

    let workerQuery = supabase
      .from("worker_profiles")
      .select(
        `
        id,
        user_id,
        worker_type,
        first_name,
        last_name,
        company_name,
        phone_number,
        email,
        years_of_experience,
        district,
        areas_served,
        about,
        facebook_url,
        instagram_url,
        tiktok_url,
        subscription_plan,
        trial_start_date,
        trial_end_date,
        subscription_start_date,
        subscription_end_date,
        is_trial_active,
        is_subscription_active,
        is_active,
        is_verified,
        verification_status,
        review_token,
        average_rating,
        total_reviews,
        created_at,
        updated_at,

        worker_categories (
          category_id,
          categories (
            id,
            name,
            slug,
            description
          )
        ),

        worker_subcategories (
          subcategory_id,
          subcategories (
            id,
            name,
            slug,
            description
          )
        )
      `,
      )
      .eq("is_active", true)
      .or(
        [
          "is_trial_active.eq.true",
          "is_subscription_active.eq.true",
        ].join(","),
      )
      .limit(1)

    if (workerId) {
      workerQuery = workerQuery.eq("id", workerId)
    } else if (reviewToken) {
      workerQuery = workerQuery.eq("review_token", reviewToken)
    }

    const { data: workerRows, error: workerError } = await workerQuery

    if (workerError) {
      return jsonResponse(
        {
          error: "Failed to fetch worker",
          details: workerError.message,
        },
        500,
      )
    }

    const rawWorker = workerRows?.[0]

    if (!rawWorker) {
      return jsonResponse(
        {
          error: "Worker not found",
        },
        404,
      )
    }

    const [
      reviewsResult,
      ratingBreakdown,
      portfolioForResponse,
      profileImageForResponse,
    ] = await Promise.all([
      (() => {
        let query = supabase
          .from("worker_reviews")
          .select(
            `
          id,
          date_of_service,
          employee_name,
          rating,
          comments,
          created_at
        `,
            { count: "exact" },
          )
          .eq("worker_id", rawWorker.id)
          .eq("is_approved", true)
          .eq("is_flagged", false)

        if (hasRatingFilter) {
          query = query.eq("rating", reviewsRating)
        }

        return query
          .order("created_at", { ascending: false })
          .range(reviewsFrom, reviewsTo)
      })(),

      fetchRatingBreakdown(supabase, rawWorker.id),

      fetchPortfolioImagesForResponse(supabase, rawWorker.id),

      fetchProfileImageForResponse(supabase, rawWorker.id),
    ])

    if (reviewsResult.error) {
      return jsonResponse(
        {
          error: "Failed to fetch worker reviews",
          details: reviewsResult.error.message,
        },
        500,
      )
    }

    const storedAverageRating = Number(rawWorker.average_rating ?? 0)
    const storedTotalReviews = rawWorker.total_reviews ?? 0

    const worker = {
      id: rawWorker.id,
      user_id: rawWorker.user_id,

      worker_type: rawWorker.worker_type,

      display_name:
        rawWorker.worker_type === "Company"
          ? rawWorker.company_name
          : [rawWorker.first_name, rawWorker.last_name]
              .filter(Boolean)
              .join(" "),

      first_name: rawWorker.first_name,
      last_name: rawWorker.last_name,
      company_name: rawWorker.company_name,

      phone_number: rawWorker.phone_number,
      email: rawWorker.email,

      years_of_experience: rawWorker.years_of_experience,
      district: rawWorker.district,
      areas_served: rawWorker.areas_served,
      about: rawWorker.about,
      profile_image: profileImageForResponse,
      facebook_url: rawWorker.facebook_url,
      instagram_url: rawWorker.instagram_url,
      tiktok_url: rawWorker.tiktok_url,

      subscription_plan: rawWorker.subscription_plan,
      trial_start_date: rawWorker.trial_start_date,
      trial_end_date: rawWorker.trial_end_date,
      subscription_start_date: rawWorker.subscription_start_date,
      subscription_end_date: rawWorker.subscription_end_date,
      is_trial_active: rawWorker.is_trial_active,
      is_subscription_active: rawWorker.is_subscription_active,

      is_active: rawWorker.is_active,
      is_verified: rawWorker.is_verified,
      verification_status: rawWorker.verification_status,

      review_token: rawWorker.review_token,

      average_rating: storedAverageRating,
      total_reviews: storedTotalReviews,

      calculated_average_rating: storedAverageRating,
      calculated_total_reviews: storedTotalReviews,

      rating_breakdown: ratingBreakdown,

      categories:
        rawWorker.worker_categories
          ?.map((item: any) => item.categories)
          .filter(Boolean) ?? [],

      subcategories:
        rawWorker.worker_subcategories
          ?.map((item: any) => item.subcategories)
          .filter(Boolean) ?? [],

      created_at: rawWorker.created_at,
      updated_at: rawWorker.updated_at,
    }

    const reviews = (reviewsResult.data ?? []).map((review) => ({
      id: review.id,
      date_of_service: review.date_of_service,
      employee_name: review.employee_name,
      rating: review.rating,
      comments: review.comments,
      created_at: review.created_at,
    }))

    const reviewsTotal = reviewsResult.count ?? 0
    const reviewsTotalPages = Math.ceil(reviewsTotal / reviewsLimit)

    const portfolio = buildPortfolioResponse(
      portfolioForResponse,
      MAX_PORTFOLIO_RESPONSE_LENGTH,
    )

    return jsonResponse({
      success: true,
      worker,
      portfolio,
      reviews,
      reviews_pagination: {
        page: reviewsPage,
        limit: reviewsLimit,
        total: reviewsTotal,
        total_pages: reviewsTotalPages,
        has_next_page: reviewsPage < reviewsTotalPages,
        has_previous_page: reviewsPage > 1,
      },
    })
  } catch (error) {
    return jsonResponse(
      {
        error: error instanceof Error ? error.message : "Unexpected server error",
      },
      500,
    )
  }
})

async function fetchProfileImageForResponse(
  supabase: ReturnType<typeof createClient>,
  workerId: string,
): Promise<string | null> {
  const { data, error } = await supabase.rpc("safe_profile_image", {
    p_worker_id: workerId,
    p_max_length: MAX_RESPONSE_DATA_URI_LENGTH,
  })

  if (error || data == null) return null

  return sanitizeProfileImageForResponse(
    typeof data === "string" ? data : null,
  )
}

async function fetchPortfolioImagesForResponse(
  supabase: ReturnType<typeof createClient>,
  workerId: string,
): Promise<string[]> {
  const { data, error } = await supabase.rpc("safe_portfolio_images", {
    p_worker_id: workerId,
    p_max_elem_length: MAX_PORTFOLIO_RESPONSE_LENGTH,
  })

  if (!error && data != null) {
    return normalizePortfolioImages(data)
  }

  const { data: row, error: rowError } = await supabase
    .from("worker_profiles")
    .select("portfolio_images")
    .eq("id", workerId)
    .maybeSingle()

  if (rowError || !row) return []

  return normalizePortfolioImages(row.portfolio_images)
}

async function fetchRatingBreakdown(
  supabase: ReturnType<typeof createClient>,
  workerId: string,
) {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }

  await Promise.all(
    ([1, 2, 3, 4, 5] as const).map(async (rating) => {
      const { count, error } = await supabase
        .from("worker_reviews")
        .select("id", { count: "exact", head: true })
        .eq("worker_id", workerId)
        .eq("is_approved", true)
        .eq("is_flagged", false)
        .eq("rating", rating)

      if (!error && count != null) {
        counts[rating] = count
      }
    }),
  )

  const total = counts[5] + counts[4] + counts[3] + counts[2] + counts[1]

  return {
    5: { count: counts[5], percentage: getPercentage(counts[5], total) },
    4: { count: counts[4], percentage: getPercentage(counts[4], total) },
    3: { count: counts[3], percentage: getPercentage(counts[3], total) },
    2: { count: counts[2], percentage: getPercentage(counts[2], total) },
    1: { count: counts[1], percentage: getPercentage(counts[1], total) },
  }
}

function getPercentage(count: number, total: number) {
  if (total === 0) return 0

  return Number(((count / total) * 100).toFixed(1))
}

function jsonResponse(body: unknown, status = 200) {
  return encodedJsonResponse(body, status, corsHeaders)
}