import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import {
  readEncodedPayload,
  encodedJsonResponse,
} from "../_shared/encoded.ts"

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
      console.error("get-worker-id worker error:", workerError)

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
      ratingBreakdownResult,
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

      supabase
        .from("worker_reviews")
        .select("rating")
        .eq("worker_id", rawWorker.id)
        .eq("is_approved", true)
        .eq("is_flagged", false),
    ])

    if (reviewsResult.error) {
      console.error("get-worker-id reviews error:", reviewsResult.error)

      return jsonResponse(
        {
          error: "Failed to fetch worker reviews",
          details: reviewsResult.error.message,
        },
        500,
      )
    }

    if (ratingBreakdownResult.error) {
      console.error(
        "get-worker-id rating breakdown error:",
        ratingBreakdownResult.error,
      )

      return jsonResponse(
        {
          error: "Failed to fetch rating breakdown",
          details: ratingBreakdownResult.error.message,
        },
        500,
      )
    }

    const approvedReviews = ratingBreakdownResult.data ?? []

    const ratingBreakdown = buildRatingBreakdown(approvedReviews)
    const calculatedAverageRating = calculateAverageRating(approvedReviews)
    const calculatedTotalReviews = approvedReviews.length

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

      average_rating: Number(rawWorker.average_rating ?? 0),
      total_reviews: rawWorker.total_reviews ?? 0,

      calculated_average_rating: calculatedAverageRating,
      calculated_total_reviews: calculatedTotalReviews,

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

    return jsonResponse({
      success: true,
      worker,
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
    console.error("Unexpected get-worker-id error:", error)

    return jsonResponse(
      {
        error: "Unexpected server error",
      },
      500,
    )
  }
})

function buildRatingBreakdown(reviews: { rating: number }[]) {
  const total = reviews.length

  const breakdown = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  }

  for (const review of reviews) {
    const rating = review.rating as 1 | 2 | 3 | 4 | 5

    if (rating >= 1 && rating <= 5) {
      breakdown[rating] += 1
    }
  }

  return {
    5: {
      count: breakdown[5],
      percentage: getPercentage(breakdown[5], total),
    },
    4: {
      count: breakdown[4],
      percentage: getPercentage(breakdown[4], total),
    },
    3: {
      count: breakdown[3],
      percentage: getPercentage(breakdown[3], total),
    },
    2: {
      count: breakdown[2],
      percentage: getPercentage(breakdown[2], total),
    },
    1: {
      count: breakdown[1],
      percentage: getPercentage(breakdown[1], total),
    },
  }
}

function calculateAverageRating(reviews: { rating: number }[]) {
  if (reviews.length === 0) return 0

  const total = reviews.reduce((sum, review) => sum + review.rating, 0)

  return Number((total / reviews.length).toFixed(1))
}

function getPercentage(count: number, total: number) {
  if (total === 0) return 0

  return Number(((count / total) * 100).toFixed(1))
}

function jsonResponse(body: unknown, status = 200) {
  return encodedJsonResponse(body, status, corsHeaders)
}