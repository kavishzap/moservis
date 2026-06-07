"use client"

import { useEffect, useState } from "react"
import { Analytics } from "@vercel/analytics/next"
import {
  getCookieConsent,
  hasAnalyticsConsent,
  type CookieConsentChoice,
} from "@/lib/cookie-consent"

export function AnalyticsWithConsent() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    function sync() {
      setEnabled(hasAnalyticsConsent(getCookieConsent()))
    }

    sync()

    function onConsentUpdated(event: Event) {
      const choice = (event as CustomEvent<CookieConsentChoice>).detail
      setEnabled(hasAnalyticsConsent(choice))
    }

    window.addEventListener("zotservis-cookie-consent", onConsentUpdated)
    return () => window.removeEventListener("zotservis-cookie-consent", onConsentUpdated)
  }, [])

  if (!enabled) return null

  return <Analytics />
}
