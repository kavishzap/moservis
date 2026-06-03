/** Auth link type from Supabase hash or query (invite, recovery, etc.). */
import { AUTH_PATHS } from "@/lib/auth-urls"

export function readAuthLinkType(): string | null {
  if (typeof window === "undefined") return null

  const hash = window.location.hash.startsWith("#")
    ? window.location.hash.slice(1)
    : window.location.hash
  const hashType = new URLSearchParams(hash).get("type")
  if (hashType) return hashType

  return new URLSearchParams(window.location.search).get("type")
}

export function readAuthNextPath(): string {
  if (typeof window === "undefined") return AUTH_PATHS.dashboardProfile

  const next = new URLSearchParams(window.location.search).get("next")
  if (next && next.startsWith("/") && !next.startsWith("//")) {
    return next
  }

  return AUTH_PATHS.dashboardProfile
}

export function isPasswordSetupType(type: string | null): boolean {
  return type === "invite" || type === "recovery"
}
