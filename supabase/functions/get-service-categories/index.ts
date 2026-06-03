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
    return new Response("ok", {
      headers: corsHeaders,
    })
  }

  try {
    if (req.method !== "POST") {
      return jsonResponse({ error: "Method not allowed" }, 405)
    }

    await readEncodedPayload<Record<string, never>>(req)

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

    const supabase = createClient(supabaseUrl, serviceRoleKey)

    const { data, error } = await supabase
      .from("categories")
      .select(`
        id,
        name,
        slug,
        description,
        category_subcategories (
          subcategories (
            id,
            name,
            slug,
            description
          )
        )
      `)
      .eq("is_active", true)
      .eq("category_subcategories.subcategories.is_active", true)
      .order("name", { ascending: true })

    if (error) {
      return jsonResponse(
        {
          error: error.message,
        },
        400,
      )
    }

    const categories = (data || []).map((category) => {
      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        subcategories: (category.category_subcategories || [])
          .map((item) => item.subcategories)
          .filter(Boolean)
          .sort((a, b) => a.name.localeCompare(b.name)),
      }
    })

    return jsonResponse({
      success: true,
      categories,
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
