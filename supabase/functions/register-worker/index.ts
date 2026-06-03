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

type RegisterWorkerPayload = {
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: corsHeaders,
    })
  }

  try {
    if (req.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405)
    }

    const body = await readEncodedPayload<RegisterWorkerPayload>(req)

    const {
      email,
      worker_type,
      first_name,
      last_name,
      company_name,
      phone_number,
      years_of_experience,
      district,
      areas_served,
      about,
      subscription_plan,
      terms_accepted,
      category_ids,
      subcategory_ids,
    } = body

    if (!email || !worker_type || !phone_number) {
      return jsonResponse(
        {
          error: "Email, worker type, and phone number are required.",
        },
        400,
      )
    }

    if (!terms_accepted) {
      return jsonResponse(
        {
          error: "Terms of Service and Privacy Policy must be accepted.",
        },
        400,
      )
    }

    if (!["Individual", "Company"].includes(worker_type)) {
      return jsonResponse({ error: "Invalid worker type." }, 400)
    }

    if (
      subscription_plan &&
      !["Monthly", "Yearly"].includes(subscription_plan)
    ) {
      return jsonResponse({ error: "Invalid subscription plan." }, 400)
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")

    if (!supabaseUrl || !serviceRoleKey) {
      return jsonResponse(
        {
          error: "Missing Supabase environment variables.",
        },
        500,
      )
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey)

    const siteUrl = Deno.env.get("SITE_URL") || "http://localhost:3000"

    const { data: inviteData, error: inviteError } =
      await adminClient.auth.admin.inviteUserByEmail(email, {
        data: {
          role: "Employee",
        },
        redirectTo: `${siteUrl}/auth/callback`,
      })

    if (inviteError || !inviteData.user) {
      return jsonResponse(
        {
          error: inviteError?.message || "Could not invite auth user.",
        },
        400,
      )
    }

    const userId = inviteData.user.id

    const { error: userError } = await adminClient.from("users").insert({
      id: userId,
      email,
      role: "Employee",
      is_active: true,
    })

    if (userError) {
      await adminClient.auth.admin.deleteUser(userId)

      return jsonResponse(
        {
          error: userError.message,
        },
        400,
      )
    }

    const { data: workerProfile, error: workerError } = await adminClient
      .from("worker_profiles")
      .insert({
        user_id: userId,
        worker_type,
        first_name: first_name || null,
        last_name: last_name || null,
        company_name: company_name || null,
        phone_number,
        email,
        years_of_experience: years_of_experience ?? null,
        district: district || null,
        areas_served: areas_served || null,
        about: about || null,
        subscription_plan: subscription_plan || null,
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString(),
        is_active: true,
        is_verified: false,
        verification_status: "Pending",
        is_trial_active: true,
        is_subscription_active: false,
      })
      .select("id")
      .single()

    if (workerError || !workerProfile) {
      await adminClient.from("users").delete().eq("id", userId)
      await adminClient.auth.admin.deleteUser(userId)

      return jsonResponse(
        {
          error: workerError?.message || "Could not create worker profile.",
        },
        400,
      )
    }

    const workerId = workerProfile.id

    if (Array.isArray(category_ids) && category_ids.length > 0) {
      const categoryRows = category_ids.map((categoryId: string) => ({
        worker_id: workerId,
        category_id: categoryId,
      }))

      const { error: categoryError } = await adminClient
        .from("worker_categories")
        .insert(categoryRows)

      if (categoryError) {
        return jsonResponse({ error: categoryError.message }, 400)
      }
    }

    if (Array.isArray(subcategory_ids) && subcategory_ids.length > 0) {
      const subcategoryRows = subcategory_ids.map((subcategoryId: string) => ({
        worker_id: workerId,
        subcategory_id: subcategoryId,
      }))

      const { error: subcategoryError } = await adminClient
        .from("worker_subcategories")
        .insert(subcategoryRows)

      if (subcategoryError) {
        return jsonResponse({ error: subcategoryError.message }, 400)
      }
    }

    const trialStartDate = new Date()
    const trialEndDate = new Date()
    trialEndDate.setMonth(trialEndDate.getMonth() + 3)

    const { error: subscriptionError } = await adminClient
      .from("worker_subscriptions")
      .insert({
        worker_id: workerId,
        status: "Trial",
        trial_start_date: trialStartDate.toISOString().slice(0, 10),
        trial_end_date: trialEndDate.toISOString().slice(0, 10),
      })

    if (subscriptionError) {
      return jsonResponse({ error: subscriptionError.message }, 400)
    }

    return jsonResponse({
      success: true,
      message: "Worker registered successfully.",
      user_id: userId,
      worker_id: workerId,
    })
  } catch (error) {
    return jsonResponse(
      {
        error: error instanceof Error ? error.message : "Unexpected error.",
      },
      500,
    )
  }
})

function jsonResponse(body: unknown, status = 200) {
  return encodedJsonResponse(body, status, corsHeaders)
}
