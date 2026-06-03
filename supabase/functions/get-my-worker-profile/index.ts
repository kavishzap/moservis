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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405)
  }

  try {
    await readEncodedPayload<Record<string, never>>(req)

    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (!supabaseUrl || !anonKey || !serviceRoleKey) {
      return jsonResponse(
        { error: "Missing Supabase environment variables" },
        500,
      )
    }

    const authHeader = req.headers.get("Authorization")

    if (!authHeader) {
      return jsonResponse({ error: "Missing Authorization header" }, 401)
    }

    const token = authHeader.replace("Bearer ", "").trim()

    if (!token) {
      return jsonResponse({ error: "Missing auth token" }, 401)
    }

    const authClient = createClient(supabaseUrl, anonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    })

    const serviceClient = createClient(supabaseUrl, serviceRoleKey)

    const {
      data: { user: authUser },
      error: authError,
    } = await authClient.auth.getUser()

    if (authError || !authUser) {
      return jsonResponse({ error: "Unauthorized" }, 401)
    }

    const publicUser = await getPublicUser(serviceClient, {
      authUserId: authUser.id,
      email: authUser.email,
    })

    if (!publicUser) {
      return jsonResponse(
        { error: "User record not found" },
        404,
      )
    }

    const { data: worker, error: workerError } = await serviceClient
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

        terms_accepted,
        terms_accepted_at,

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
      .eq("user_id", publicUser.id)
      .maybeSingle()

    if (workerError) {
      console.error("get-my-worker-profile error:", workerError)

      return jsonResponse(
        {
          error: "Failed to fetch worker profile",
          details: workerError.message,
        },
        500,
      )
    }

    if (!worker) {
      return jsonResponse(
        { error: "Worker profile not found" },
        404,
      )
    }

    const profile = {
      id: worker.id,
      user_id: worker.user_id,

      worker_type: worker.worker_type,

      display_name:
        worker.worker_type === "Company"
          ? worker.company_name
          : [worker.first_name, worker.last_name].filter(Boolean).join(" "),

      first_name: worker.first_name,
      last_name: worker.last_name,
      company_name: worker.company_name,

      phone_number: worker.phone_number,
      email: worker.email,

      years_of_experience: worker.years_of_experience,
      district: worker.district,
      areas_served: worker.areas_served,
      about: worker.about,

      subscription_plan: worker.subscription_plan,
      trial_start_date: worker.trial_start_date,
      trial_end_date: worker.trial_end_date,
      subscription_start_date: worker.subscription_start_date,
      subscription_end_date: worker.subscription_end_date,
      is_trial_active: worker.is_trial_active,
      is_subscription_active: worker.is_subscription_active,

      is_active: worker.is_active,
      is_verified: worker.is_verified,
      verification_status: worker.verification_status,

      terms_accepted: worker.terms_accepted,
      terms_accepted_at: worker.terms_accepted_at,

      review_token: worker.review_token,
      review_link: `/review-worker/${worker.review_token}`,

      average_rating: Number(worker.average_rating ?? 0),
      total_reviews: worker.total_reviews ?? 0,

      category_ids:
        worker.worker_categories?.map((item: any) => item.category_id) ?? [],

      subcategory_ids:
        worker.worker_subcategories?.map((item: any) => item.subcategory_id) ??
        [],

      categories:
        worker.worker_categories
          ?.map((item: any) => item.categories)
          .filter(Boolean) ?? [],

      subcategories:
        worker.worker_subcategories
          ?.map((item: any) => item.subcategories)
          .filter(Boolean) ?? [],

      created_at: worker.created_at,
      updated_at: worker.updated_at,
    }

    return jsonResponse({
      success: true,
      profile,
    })
  } catch (error) {
    console.error("Unexpected get-my-worker-profile error:", error)

    return jsonResponse(
      { error: "Unexpected server error" },
      500,
    )
  }
})

async function getPublicUser(
  supabase: any,
  params: {
    authUserId: string
    email?: string
  },
) {
  const { data: userById, error: userByIdError } = await supabase
    .from("users")
    .select("id, email, role, is_active")
    .eq("id", params.authUserId)
    .maybeSingle()

  if (userByIdError) {
    console.error("get public user by id error:", userByIdError)
  }

  if (userById) {
    return userById
  }

  if (!params.email) {
    return null
  }

  const { data: userByEmail, error: userByEmailError } = await supabase
    .from("users")
    .select("id, email, role, is_active")
    .eq("email", params.email)
    .maybeSingle()

  if (userByEmailError) {
    console.error("get public user by email error:", userByEmailError)
  }

  return userByEmail
}

function jsonResponse(body: unknown, status = 200) {
  return encodedJsonResponse(body, status, corsHeaders)
}