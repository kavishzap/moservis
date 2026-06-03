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

type SaveWorkerReviewPayload = {
  review_token: string
  rating: number
  comments?: string | null
  date_of_service?: string | null
  employee_name?: string | null
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

    const body = await readEncodedPayload<SaveWorkerReviewPayload>(req)

    const reviewToken = body.review_token?.trim()
    const rating = Number(body.rating)

    const comments = body.comments?.trim() || null
    const employeeName = body.employee_name?.trim() || null
    const dateOfService = body.date_of_service?.trim() || null

    if (!reviewToken) {
      return jsonResponse({ error: "review_token is required" }, 400)
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return jsonResponse(
        { error: "rating must be an integer between 1 and 5" },
        400,
      )
    }

    if (comments && comments.length > 1000) {
      return jsonResponse(
        { error: "comments must not exceed 1000 characters" },
        400,
      )
    }

    if (employeeName && employeeName.length > 150) {
      return jsonResponse(
        { error: "employee_name must not exceed 150 characters" },
        400,
      )
    }

    if (dateOfService && !isValidDate(dateOfService)) {
      return jsonResponse(
        { error: "date_of_service must be a valid date in YYYY-MM-DD format" },
        400,
      )
    }

    const { data: worker, error: workerError } = await supabase
      .from("worker_profiles")
      .select(
        `
        id,
        worker_type,
        first_name,
        last_name,
        company_name,
        is_active,
        is_trial_active,
        is_subscription_active
      `,
      )
      .eq("review_token", reviewToken)
      .eq("is_active", true)
      .or(
        [
          "is_trial_active.eq.true",
          "is_subscription_active.eq.true",
        ].join(","),
      )
      .maybeSingle()

    if (workerError) {
      console.error("save-worker-review worker error:", workerError)

      return jsonResponse(
        {
          error: "Failed to validate worker",
          details: workerError.message,
        },
        500,
      )
    }

    if (!worker) {
      return jsonResponse(
        { error: "Worker not found or not active" },
        404,
      )
    }

    const { data: review, error: reviewError } = await supabase
      .from("worker_reviews")
      .insert({
        worker_id: worker.id,
        date_of_service: dateOfService,
        employee_name: employeeName,
        rating,
        comments,
        is_approved: true,
        is_flagged: false,
      })
      .select(
        `
        id,
        worker_id,
        date_of_service,
        employee_name,
        rating,
        comments,
        is_approved,
        is_flagged,
        created_at
      `,
      )
      .single()

    if (reviewError) {
      console.error("save-worker-review insert error:", reviewError)

      return jsonResponse(
        {
          error: "Failed to save review",
          details: reviewError.message,
        },
        500,
      )
    }

    const { data: approvedReviews, error: aggregateError } = await supabase
      .from("worker_reviews")
      .select("rating")
      .eq("worker_id", worker.id)
      .eq("is_approved", true)
      .eq("is_flagged", false)

    if (aggregateError) {
      console.error("save-worker-review aggregate error:", aggregateError)

      return jsonResponse(
        {
          error: "Review saved, but failed to update worker rating",
          details: aggregateError.message,
        },
        500,
      )
    }

    const totalReviews = approvedReviews?.length ?? 0

    const averageRating =
      totalReviews === 0
        ? 0
        : Number(
            (
              approvedReviews.reduce(
                (sum, item) => sum + Number(item.rating ?? 0),
                0,
              ) / totalReviews
            ).toFixed(2),
          )

    const { error: updateWorkerError } = await supabase
      .from("worker_profiles")
      .update({
        average_rating: averageRating,
        total_reviews: totalReviews,
        updated_at: new Date().toISOString(),
      })
      .eq("id", worker.id)

    if (updateWorkerError) {
      console.error("save-worker-review update worker error:", updateWorkerError)

      return jsonResponse(
        {
          error: "Review saved, but failed to update worker profile rating",
          details: updateWorkerError.message,
        },
        500,
      )
    }

    return jsonResponse({
      success: true,
      message: "Review submitted successfully",
      review,
      worker_rating: {
        average_rating: averageRating,
        total_reviews: totalReviews,
      },
    })
  } catch (error) {
    console.error("Unexpected save-worker-review error:", error)

    return jsonResponse(
      { error: "Unexpected server error" },
      500,
    )
  }
})

function isValidDate(value: string) {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/

  if (!dateRegex.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00.000Z`)

  return !Number.isNaN(date.getTime())
}

function jsonResponse(body: unknown, status = 200) {
  return encodedJsonResponse(body, status, corsHeaders)
}