"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { scrollToSection } from "@/lib/scroll-to-section"
import { cn } from "@/lib/utils"

export function SiteSectionNavLink({
  sectionId,
  label,
  href,
  className,
  onNavigate,
}: {
  sectionId: string
  label: string
  href?: string
  className?: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"

  if (href) {
    return (
      <Link href={href} className={className} onClick={() => onNavigate?.()}>
        {label}
      </Link>
    )
  }

  if (sectionId === "become-a-worker") {
    return (
      <Link href="/register" className={className} onClick={() => onNavigate?.()}>
        {label}
      </Link>
    )
  }

  const hashHref = isHome ? `#${sectionId}` : `/#${sectionId}`

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.()

    if (isHome) {
      e.preventDefault()
      scrollToSection(sectionId)
      return
    }

    e.preventDefault()
    router.push(hashHref)
  }

  return (
    <Link href={hashHref} className={cn(className)} scroll={false} onClick={handleClick}>
      {label}
    </Link>
  )
}
