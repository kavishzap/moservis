"use client"

import { useEffect, useState } from "react"
import { headerNavItems, FIND_WORKER_NAV } from "@/lib/site-nav"
import { supabase } from "@/lib/supabase"
import { SiteSectionNavLink } from "@/components/site-section-nav-link"

const footerLinkClassName =
  "text-sm font-medium text-white/90 transition-colors duration-200 hover:text-gold"

export function FooterNavLinks() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    let cancelled = false

    supabase.auth.getSession().then(({ data }) => {
      if (!cancelled) setIsLoggedIn(!!data.session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session)
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  const navItems = [...headerNavItems(isLoggedIn), FIND_WORKER_NAV]

  return (
    <ul className="space-y-1.5">
      {navItems.map((item) => (
        <li key={item.key}>
          <SiteSectionNavLink
            sectionId={item.id}
            label={item.label}
            href={item.href}
            className={footerLinkClassName}
          />
        </li>
      ))}
    </ul>
  )
}
