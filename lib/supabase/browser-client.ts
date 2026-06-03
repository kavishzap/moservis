import { supabase } from "@/lib/supabase"
import type { SupabaseClient } from "@supabase/supabase-js"

export function getSupabaseBrowserClient(): SupabaseClient {
  return supabase
}
