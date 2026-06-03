"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  consumeSkipNextHashScroll,
  scrollToSectionWhenReady,
} from "@/lib/scroll-to-section"

/** Scroll to `location.hash` on home and on `hashchange` (SPA + soft nav). */
export function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") return

    const scrollToHash = () => {
      if (consumeSkipNextHashScroll()) {
        window.history.replaceState(null, "", "/")
        window.scrollTo({ top: 0, behavior: "smooth" })
        return
      }

      const id = window.location.hash?.replace(/^#/, "")
      if (!id) return

      requestAnimationFrame(() => {
        scrollToSectionWhenReady(id)
      })
    }

    scrollToHash()
    window.addEventListener("hashchange", scrollToHash)
    return () => window.removeEventListener("hashchange", scrollToHash)
  }, [pathname])

  return null
}
