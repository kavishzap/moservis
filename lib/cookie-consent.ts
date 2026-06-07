export const COOKIE_CONSENT_STORAGE_KEY = "zotservis-cookie-consent"
export const COOKIE_CONSENT_COOKIE_NAME = "zotservis_cookie_consent"
export const COOKIE_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 365

export type CookieConsentChoice = "all" | "essential"

export function isCookieConsentChoice(value: string): value is CookieConsentChoice {
  return value === "all" || value === "essential"
}

export function getCookieConsent(): CookieConsentChoice | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY)
    if (stored && isCookieConsentChoice(stored)) return stored
  } catch {
    // ignore
  }

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_CONSENT_COOKIE_NAME}=([^;]*)`),
  )
  const fromCookie = match?.[1] ? decodeURIComponent(match[1]) : null
  return fromCookie && isCookieConsentChoice(fromCookie) ? fromCookie : null
}

export function setCookieConsent(choice: CookieConsentChoice) {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, choice)
  } catch {
    // ignore
  }

  document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encodeURIComponent(choice)}; path=/; max-age=${COOKIE_CONSENT_MAX_AGE_SECONDS}; SameSite=Lax`

  window.dispatchEvent(
    new CustomEvent("zotservis-cookie-consent", { detail: choice }),
  )
}

export function hasAnalyticsConsent(choice: CookieConsentChoice | null) {
  return choice === "all"
}
