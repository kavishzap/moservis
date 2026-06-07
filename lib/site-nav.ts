import { AUTH_PATHS } from "@/lib/auth-urls"

export type SiteNavItem = {
  key: string
  id: string
  label: string
  href?: string
}

/** Home section links — order matches header top bar. */
export const SECTION_NAV: SiteNavItem[] = [
  { key: "categories", id: "categories", label: "Category" },
  { key: "faq", id: "faq", label: "FAQ" },
  { key: "join-worker", id: "become-a-worker", label: "Join as a Worker" },
]

export const FIND_WORKER_NAV: SiteNavItem = {
  key: "find-worker",
  id: "find-worker",
  label: "Find a Worker",
  href: "/worker",
}

export function authNavItem(isLoggedIn: boolean): SiteNavItem {
  return isLoggedIn
    ? { key: "profile", id: "profile", label: "Profile", href: AUTH_PATHS.dashboardProfile }
    : { key: "login", id: "login", label: "Log In", href: AUTH_PATHS.login }
}

export function headerNavItems(isLoggedIn: boolean): SiteNavItem[] {
  return [...SECTION_NAV, authNavItem(isLoggedIn)]
}
