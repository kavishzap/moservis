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

type WorkerType = "Individual" | "Company"

type UpdateMyWorkerProfilePayload = {
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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders })
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405)
  }

  try {
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

    const { data: existingWorker, error: existingWorkerError } =
      await serviceClient
        .from("worker_profiles")
        .select("id, user_id")
        .eq("user_id", publicUser.id)
        .maybeSingle()

    if (existingWorkerError) {
      console.error("existing worker error:", existingWorkerError)

      return jsonResponse(
        {
          error: "Failed to validate worker profile",
          details: existingWorkerError.message,
        },
        500,
      )
    }

    if (!existingWorker) {
      return jsonResponse(
        { error: "Worker profile not found" },
        404,
      )
    }

    const body = await readEncodedPayload<UpdateMyWorkerProfilePayload>(req)

    const updatePayload = buildUpdatePayload(body)

    if (Object.keys(updatePayload).length > 0) {
      const { error: updateError } = await serviceClient
        .from("worker_profiles")
        .update({
          ...updatePayload,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingWorker.id)

      if (updateError) {
        console.error("update worker profile error:", updateError)

        return jsonResponse(
          {
            error: "Failed to update worker profile",
            details: updateError.message,
          },
          500,
        )
      }
    }

    if (Array.isArray(body.category_ids)) {
      const categoryIds = uniqueIds(body.category_ids)

      const { error: deleteCategoriesError } = await serviceClient
        .from("worker_categories")
        .delete()
        .eq("worker_id", existingWorker.id)

      if (deleteCategoriesError) {
        console.error("delete worker categories error:", deleteCategoriesError)

        return jsonResponse(
          {
            error: "Failed to update worker categories",
            details: deleteCategoriesError.message,
          },
          500,
        )
      }

      if (categoryIds.length > 0) {
        const categoryRows = categoryIds.map((categoryId) => ({
          worker_id: existingWorker.id,
          category_id: categoryId,
        }))

        const { error: insertCategoriesError } = await serviceClient
          .from("worker_categories")
          .insert(categoryRows)

        if (insertCategoriesError) {
          console.error("insert worker categories error:", insertCategoriesError)

          return jsonResponse(
            {
              error: "Failed to save worker categories",
              details: insertCategoriesError.message,
            },
            500,
          )
        }
      }
    }

    if (Array.isArray(body.subcategory_ids)) {
      const subcategoryIds = uniqueIds(body.subcategory_ids)

      const { error: deleteSubcategoriesError } = await serviceClient
        .from("worker_subcategories")
        .delete()
        .eq("worker_id", existingWorker.id)

      if (deleteSubcategoriesError) {
        console.error(
          "delete worker subcategories error:",
          deleteSubcategoriesError,
        )

        return jsonResponse(
          {
            error: "Failed to update worker subcategories",
            details: deleteSubcategoriesError.message,
          },
          500,
        )
      }

      if (subcategoryIds.length > 0) {
        const subcategoryRows = subcategoryIds.map((subcategoryId) => ({
          worker_id: existingWorker.id,
          subcategory_id: subcategoryId,
        }))

        const { error: insertSubcategoriesError } = await serviceClient
          .from("worker_subcategories")
          .insert(subcategoryRows)

        if (insertSubcategoriesError) {
          console.error(
            "insert worker subcategories error:",
            insertSubcategoriesError,
          )

          return jsonResponse(
            {
              error: "Failed to save worker subcategories",
              details: insertSubcategoriesError.message,
            },
            500,
          )
        }
      }
    }

    const { data: updatedWorker, error: fetchUpdatedError } = await serviceClient
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
      .eq("id", existingWorker.id)
      .single()

    if (fetchUpdatedError) {
      console.error("fetch updated worker error:", fetchUpdatedError)

      return jsonResponse(
        {
          error: "Profile updated, but failed to fetch updated profile",
          details: fetchUpdatedError.message,
        },
        500,
      )
    }

    const profile = {
      id: updatedWorker.id,
      user_id: updatedWorker.user_id,

      worker_type: updatedWorker.worker_type,

      display_name:
        updatedWorker.worker_type === "Company"
          ? updatedWorker.company_name
          : [updatedWorker.first_name, updatedWorker.last_name]
              .filter(Boolean)
              .join(" "),

      first_name: updatedWorker.first_name,
      last_name: updatedWorker.last_name,
      company_name: updatedWorker.company_name,

      phone_number: updatedWorker.phone_number,
      email: updatedWorker.email,

      years_of_experience: updatedWorker.years_of_experience,
      district: updatedWorker.district,
      areas_served: updatedWorker.areas_served,
      about: updatedWorker.about,

      subscription_plan: updatedWorker.subscription_plan,
      trial_start_date: updatedWorker.trial_start_date,
      trial_end_date: updatedWorker.trial_end_date,
      subscription_start_date: updatedWorker.subscription_start_date,
      subscription_end_date: updatedWorker.subscription_end_date,
      is_trial_active: updatedWorker.is_trial_active,
      is_subscription_active: updatedWorker.is_subscription_active,

      is_active: updatedWorker.is_active,
      is_verified: updatedWorker.is_verified,
      verification_status: updatedWorker.verification_status,

      review_token: updatedWorker.review_token,
      review_link: `/review-worker/${updatedWorker.review_token}`,

      average_rating: Number(updatedWorker.average_rating ?? 0),
      total_reviews: updatedWorker.total_reviews ?? 0,

      category_ids:
        updatedWorker.worker_categories?.map((item: any) => item.category_id) ??
        [],

      subcategory_ids:
        updatedWorker.worker_subcategories?.map(
          (item: any) => item.subcategory_id,
        ) ?? [],

      categories:
        updatedWorker.worker_categories
          ?.map((item: any) => item.categories)
          .filter(Boolean) ?? [],

      subcategories:
        updatedWorker.worker_subcategories
          ?.map((item: any) => item.subcategories)
          .filter(Boolean) ?? [],

      created_at: updatedWorker.created_at,
      updated_at: updatedWorker.updated_at,
    }

    return jsonResponse({
      success: true,
      message: "Profile updated successfully",
      profile,
    })
  } catch (error) {
    console.error("Unexpected update-my-worker-profile error:", error)

    return jsonResponse(
      { error: "Unexpected server error" },
      500,
    )
  }
})

function buildUpdatePayload(body: UpdateMyWorkerProfilePayload) {
  const payload: Record<string, unknown> = {}

  if (body.worker_type !== undefined) {
    if (!["Individual", "Company"].includes(body.worker_type)) {
      throw new Error("Invalid worker_type")
    }

    payload.worker_type = body.worker_type
  }

  if (body.first_name !== undefined) {
    payload.first_name = cleanNullableString(body.first_name, 100)
  }

  if (body.last_name !== undefined) {
    payload.last_name = cleanNullableString(body.last_name, 100)
  }

  if (body.company_name !== undefined) {
    payload.company_name = cleanNullableString(body.company_name, 150)
  }

  if (body.phone_number !== undefined) {
    const phone = body.phone_number.trim()

    if (!phone) {
      throw new Error("phone_number cannot be empty")
    }

    if (phone.length > 50) {
      throw new Error("phone_number is too long")
    }

    payload.phone_number = phone
  }

  if (body.email !== undefined) {
    const email = body.email.trim().toLowerCase()

    if (!email) {
      throw new Error("email cannot be empty")
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email")
    }

    payload.email = email
  }

  if (body.years_of_experience !== undefined) {
    if (body.years_of_experience === null) {
      payload.years_of_experience = null
    } else {
      const years = Number(body.years_of_experience)

      if (!Number.isInteger(years) || years < 0) {
        throw new Error("years_of_experience must be 0 or greater")
      }

      payload.years_of_experience = years
    }
  }

  if (body.district !== undefined) {
    payload.district = cleanNullableString(body.district, 100)
  }

  if (body.areas_served !== undefined) {
    payload.areas_served = cleanNullableString(body.areas_served, 1000)
  }

  if (body.about !== undefined) {
    payload.about = cleanNullableString(body.about, 2000)
  }

  return payload
}

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

function cleanNullableString(
  value: string | null | undefined,
  maxLength: number,
) {
  if (value === null || value === undefined) {
    return null
  }

  const cleaned = value.trim()

  if (!cleaned) {
    return null
  }

  if (cleaned.length > maxLength) {
    throw new Error(`Value must not exceed ${maxLength} characters`)
  }

  return cleaned
}

function uniqueIds(values: string[]) {
  return [...new Set(values.map((value) => value.trim()).filter(Boolean))]
}

function jsonResponse(body: unknown, status = 200) {
  return encodedJsonResponse(body, status, corsHeaders)
}