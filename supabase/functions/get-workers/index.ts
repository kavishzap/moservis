import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import {
  readEncodedPayload,
  encodedJsonResponse,
} from "../_shared/encoded.ts"
import { sanitizeProfileImageForResponse } from "../_shared/response-images.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
}

type WorkerType = "Individual" | "Company"

/** Match frontend `MAURITIUS_DISTRICTS` — slugs in URLs, labels often stored in DB. */
const MAURITIUS_DISTRICTS = [
  { label: "Port Louis (Capital)", value: "port-louis" },
  { label: "Pamplemousses", value: "pamplemousses" },
  { label: "Rivière du Rempart", value: "riviere-du-rempart" },
  { label: "Flacq", value: "flacq" },
  { label: "Moka", value: "moka" },
  { label: "Plaines Wilhems", value: "plaines-wilhems" },
  { label: "Black River (Rivière Noire)", value: "black-river" },
  { label: "Grand Port", value: "grand-port" },
  { label: "Savanne", value: "savanne" },
] as const

type GetWorkersPayload = {
  page?: number
  limit?: number

  search?: string | null
  district?: string | null
  worker_type?: WorkerType | null

  category_ids?: string[]
  subcategory_ids?: string[]

  min_rating?: number | null
  verified_only?: boolean | null

  sort_by?: "rating" | "reviews" | "newest" | "experience"
  sort_order?: "asc" | "desc"
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

    const body = await readEncodedPayload<GetWorkersPayload>(req)

    const page = Math.max(Number(body.page ?? 1), 1)
    const limit = Math.min(Math.max(Number(body.limit ?? 12), 1), 50)

    const from = (page - 1) * limit
    const to = from + limit - 1

    const search = body.search?.trim() || null
    const district = body.district?.trim() || null
    const workerType = body.worker_type || null

    const categoryIds = Array.isArray(body.category_ids)
      ? body.category_ids.filter(Boolean)
      : []

    const subcategoryIds = Array.isArray(body.subcategory_ids)
      ? body.subcategory_ids.filter(Boolean)
      : []

    const minRating =
      typeof body.min_rating === "number" && body.min_rating > 0
        ? body.min_rating
        : null

    const verifiedOnly = body.verified_only === true

    const sortBy = body.sort_by ?? "rating"
    const sortOrder = body.sort_order ?? "desc"

    const hasCategoryFilter = categoryIds.length > 0
    const hasSubcategoryFilter = subcategoryIds.length > 0

    const select = buildWorkerSelect(hasCategoryFilter, hasSubcategoryFilter)

    let query = supabase
      .from("worker_profiles")
      .select(select, { count: "exact" })
      .eq("is_active", true)
      .or(
        [
          "is_trial_active.eq.true",
          "is_subscription_active.eq.true",
        ].join(","),
      )

    if (workerType) {
      query = query.eq("worker_type", workerType)
    }

    if (district) {
      const districtTerms = districtMatchTerms(district)
      if (districtTerms.length === 1) {
        query = query.ilike("district", `%${escapeIlike(districtTerms[0])}%`)
      } else {
        query = query.or(
          districtTerms
            .map((term) => `district.ilike.%${escapeIlike(term)}%`)
            .join(","),
        )
      }
    }

    if (minRating !== null) {
      query = query.gte("average_rating", minRating)
    }

    if (verifiedOnly) {
      query = query.eq("is_verified", true)
    }

    if (search) {
      const tokens = search.split(/\s+/).filter(Boolean)

      for (const token of tokens) {
        const escapedSearch = escapeIlike(token)

        query = query.or(
          [
            `first_name.ilike.%${escapedSearch}%`,
            `last_name.ilike.%${escapedSearch}%`,
            `company_name.ilike.%${escapedSearch}%`,
            `phone_number.ilike.%${escapedSearch}%`,
            `email.ilike.%${escapedSearch}%`,
            `about.ilike.%${escapedSearch}%`,
            `areas_served.ilike.%${escapedSearch}%`,
            `district.ilike.%${escapedSearch}%`,
          ].join(","),
        )
      }
    }

    if (hasCategoryFilter) {
      query = query.in("worker_categories_filter.category_id", categoryIds)
    }

    if (hasSubcategoryFilter) {
      query = query.in(
        "worker_subcategories_filter.subcategory_id",
        subcategoryIds,
      )
    }

    switch (sortBy) {
      case "reviews":
        query = query.order("total_reviews", {
          ascending: sortOrder === "asc",
        })
        break

      case "newest":
        query = query.order("created_at", {
          ascending: sortOrder === "asc",
        })
        break

      case "experience":
        query = query.order("years_of_experience", {
          ascending: sortOrder === "asc",
          nullsFirst: false,
        })
        break

      case "rating":
      default:
        query = query.order("average_rating", {
          ascending: sortOrder === "asc",
        })
        query = query.order("total_reviews", {
          ascending: false,
        })
        break
    }

    query = query.range(from, to)

    const { data, error, count } = await query

    if (error) {
      console.error("get-workers error:", error)

      return jsonResponse(
        {
          error: "Failed to fetch workers",
          details: error.message,
        },
        500,
      )
    }

    const workers = (data ?? []).map((worker: any) => ({
      id: worker.id,
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
      profile_image: sanitizeProfileImageForResponse(worker.profile_image),

      is_verified: worker.is_verified,

      average_rating: Number(worker.average_rating ?? 0),
      total_reviews: worker.total_reviews ?? 0,

      review_token: worker.review_token,

      categories:
        worker.worker_categories
          ?.map((item: any) => item.categories)
          .filter(Boolean) ?? [],

      subcategories:
        worker.worker_subcategories
          ?.map((item: any) => item.subcategories)
          .filter(Boolean) ?? [],

      created_at: worker.created_at,
    }))

    const total = count ?? 0
    const totalPages = Math.ceil(total / limit)

    return jsonResponse({
      success: true,
      workers,
      pagination: {
        page,
        limit,
        total,
        total_pages: totalPages,
        has_next_page: page < totalPages,
        has_previous_page: page > 1,
      },
    })
  } catch (error) {
    console.error("Unexpected get-workers error:", error)

    return encodedJsonResponse(
      {
        error: error instanceof Error ? error.message : "Unexpected server error",
      },
      500,
      corsHeaders,
    )
  }
})

function buildWorkerSelect(
  hasCategoryFilter: boolean,
  hasSubcategoryFilter: boolean,
): string {
  const parts = [
    `
        id,
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
        profile_image,
        is_verified,
        average_rating,
        total_reviews,
        review_token,
        created_at,

        worker_categories (
          category_id,
          categories (
            id,
            name,
            slug
          )
        ),

        worker_subcategories (
          subcategory_id,
          subcategories (
            id,
            name,
            slug
          )
        )
      `,
  ]

  // Inner join aliases filter parent rows without trimming embedded category lists.
  if (hasCategoryFilter) {
    parts.push(`
        worker_categories_filter:worker_categories!inner (
          category_id
        )
      `)
  }

  if (hasSubcategoryFilter) {
    parts.push(`
        worker_subcategories_filter:worker_subcategories!inner (
          subcategory_id
        )
      `)
  }

  return parts.join(",")
}

/** Resolve slug or label to both forms so DB rows match either storage format. */
function districtMatchTerms(input: string): string[] {
  const trimmed = input.trim()
  if (!trimmed) return []

  const bySlug = MAURITIUS_DISTRICTS.find((d) => d.value === trimmed)
  if (bySlug) return [bySlug.label, bySlug.value]

  const byLabel = MAURITIUS_DISTRICTS.find(
    (d) => d.label.toLowerCase() === trimmed.toLowerCase(),
  )
  if (byLabel) return [byLabel.label, byLabel.value]

  return [trimmed]
}

function jsonResponse(body: unknown, status = 200) {
  return encodedJsonResponse(body, status, corsHeaders)
}

function escapeIlike(value: string) {
  return value.replace(/[%_]/g, "\\$&")
}