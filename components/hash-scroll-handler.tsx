"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

/** Scroll to `location.hash` on home and on `hashchange` (SPA + soft nav). */
export function HashScrollHandler() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname !== "/") return

    const scrollToHash = () => {
      const id = window.location.hash?.replace(/^#/, "")
      if (!id) return
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
      })
    }

    scrollToHash()
    window.addEventListener("hashchange", scrollToHash)
    return () => window.removeEventListener("hashchange", scrollToHash)
  }, [pathname])

  return null
}
