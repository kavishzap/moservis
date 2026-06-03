/** Base URL for Supabase Auth redirects (invite, recovery). */
export function getSiteUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
}

export function getAuthCallbackUrl(): string {
  return `${getSiteUrl()}/auth/callback`
}

export const AUTH_PATHS = {
  login: "/login",
  forgotPassword: "/auth/forgot-password",
  updatePassword: "/auth/update-password",
  callback: "/auth/callback",
  register: "/register",
  dashboard: "/dashboard",
  dashboardProfile: "/dashboard/profile",
} as const
