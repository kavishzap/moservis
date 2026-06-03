"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Facebook, Mail, MapPin, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
import { TikTokIcon } from "@/components/icons/tiktok-icon"
import {
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_PHONES,
  SITE_FACEBOOK_URL,
  SITE_TIKTOK_URL,
  buildWhatsAppHref,
  PLATFORM_WHATSAPP_DEFAULT_MESSAGE,
  formatSitePhoneDisplay,
} from "@/lib/contact"
import { AUTH_PATHS } from "@/lib/auth-urls"
import { goldButtonClassName } from "@/lib/brand-buttons"
import { heroContainer } from "@/lib/site-layout"
import { scrollToSection, markSkipNextHashScroll } from "@/lib/scroll-to-section"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

type NavItem = {
  key: string
  id: string
  label: string
  href?: string
}

const sectionNav: NavItem[] = [
  { key: "community", id: "why-choose-us", label: "Community" },
  { key: "categories", id: "categories", label: "Browse by Category" },
  { key: "faq", id: "faq", label: "FAQ" },
  { key: "join-worker", id: "become-a-worker", label: "Join as a Worker" },
]

const desktopNavLinkClassName =
  "nav-link-underline whitespace-nowrap text-sm font-medium text-slate transition-colors duration-300 ease-out hover:text-teal"

const mobileNavLinkClassName =
  "nav-link-underline rounded-lg px-3 py-3 text-base font-medium text-slate transition-colors duration-300 ease-out hover:bg-secondary/80 hover:text-teal"

function blurNavLink(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.blur()
}

function useWorkerLoggedIn() {
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

  return isLoggedIn
}

function SectionNavLink({
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
      <Link
        href={href}
        className={className}
        onClick={(e) => {
          onNavigate?.()
          blurNavLink(e)
        }}
      >
        {label}
      </Link>
    )
  }

  if (sectionId === "become-a-worker") {
    return (
      <Link
        href="/register"
        className={className}
        onClick={(e) => {
          onNavigate?.()
          blurNavLink(e)
        }}
      >
        {label}
      </Link>
    )
  }

  const hashHref = isHome ? `#${sectionId}` : `/#${sectionId}`

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.()
    blurNavLink(e)

    if (isHome) {
      e.preventDefault()
      scrollToSection(sectionId)
      return
    }

    e.preventDefault()
    router.push(hashHref)
  }

  return (
    <Link
      href={hashHref}
      className={className}
      scroll={false}
      onClick={handleClick}
    >
      {label}
    </Link>
  )
}

function MobileDrawerContact({ onNavigate }: { onNavigate: () => void }) {
  const primaryPhone = SITE_CONTACT_PHONES[0]

  return (
    <div className="border-t border-teal/20 pt-4">
      <p className="mb-3 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Contact
      </p>
      <ul className="space-y-2.5 text-sm">
        {SITE_CONTACT_PHONES.map((phone) => (
          <li key={phone} className="flex items-start gap-2">
            <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
            <a
              href={buildWhatsAppHref(phone, PLATFORM_WHATSAPP_DEFAULT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={onNavigate}
              className="font-medium text-foreground transition-colors hover:text-teal"
            >
              {formatSitePhoneDisplay(phone)}
            </a>
          </li>
        ))}
        <li className="flex items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-teal" aria-hidden />
          <a
            href={`mailto:${SITE_CONTACT_EMAIL}`}
            onClick={onNavigate}
            className="font-medium text-foreground transition-colors hover:text-teal"
          >
            {SITE_CONTACT_EMAIL}
          </a>
        </li>
        <li className="flex items-center gap-2 text-sm font-medium text-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
          <span>Mauritius</span>
        </li>
      </ul>
      <div className="mt-4 flex flex-wrap justify-center gap-2 border-t border-border/80 pt-4">
        <a
          href={`mailto:${SITE_CONTACT_EMAIL}`}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/30 text-teal transition-colors hover:border-ocean hover:bg-ocean hover:text-white"
          aria-label={`Email ${SITE_CONTACT_EMAIL}`}
          onClick={onNavigate}
        >
          <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
        <a
          href={buildWhatsAppHref(primaryPhone, PLATFORM_WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/30 text-[#25D366] transition-colors hover:border-ocean hover:bg-ocean hover:text-white"
          aria-label={`WhatsApp ${formatSitePhoneDisplay(primaryPhone)}`}
          onClick={onNavigate}
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
        </a>
        <a
          href={SITE_FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/30 text-[#1877F2] transition-colors hover:border-ocean hover:bg-ocean hover:text-white"
          aria-label="Facebook"
          onClick={onNavigate}
        >
          <Facebook className="h-3.5 w-3.5" strokeWidth={1.75} fill="currentColor" />
        </a>
        <a
          href={SITE_TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-teal/30 text-foreground transition-colors hover:border-ocean hover:bg-ocean hover:text-white"
          aria-label="TikTok"
          onClick={onNavigate}
        >
          <TikTokIcon className="h-3.5 w-3.5" />
        </a>
      </div>
    </div>
  )
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const isLoggedIn = useWorkerLoggedIn()
  const close = () => setIsOpen(false)

  const goHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    close()
    e.preventDefault()
    markSkipNextHashScroll()
    router.replace("/")
  }

  useEffect(() => {
    const active = document.activeElement
    if (active instanceof HTMLElement && active.classList.contains("nav-link-underline")) {
      active.blur()
    }
  }, [pathname])

  const authNavItem: NavItem = isLoggedIn
    ? { key: "profile", id: "profile", label: "Profile", href: AUTH_PATHS.dashboardProfile }
    : { key: "login", id: "login", label: "Log In", href: AUTH_PATHS.login }

  const navItems: NavItem[] = [...sectionNav, authNavItem]

  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [isOpen])

  return (
    <header className="pointer-events-none sticky top-0 z-50 w-full">
      <div className={`${heroContainer} pointer-events-auto py-3 sm:py-4`}>
        <div className="mx-auto flex h-12 w-full max-w-[min(100%,76rem)] items-center justify-between gap-2 rounded-full bg-white/95 px-3.5 ring-1 ring-black/[0.06] backdrop-blur-md sm:h-[3.25rem] sm:max-w-[min(100%,72rem)] sm:gap-4 sm:px-5 lg:max-w-[min(100%,68rem)]">
        <Link href="/" className="flex shrink-0 items-center py-0.5" onClick={goHome} aria-label="ZotServis home">
          <Image
            src="/zotservisbluelogo.png"
            alt="Zot Servis"
            width={862}
            height={289}
            className="h-9 w-auto max-w-[min(240px,52vw)] object-contain object-left sm:h-10 sm:max-w-[min(300px,58vw)] lg:h-11 lg:max-w-[360px]"
            priority
          />
        </Link>

        <div className="hidden min-w-0 flex-1 items-center justify-end gap-3 lg:gap-5 md:flex">
          <nav className="flex flex-wrap items-center justify-end gap-x-3 gap-y-1 lg:gap-x-5">
            {navItems.map((item) => (
              <SectionNavLink
                key={item.key}
                sectionId={item.id}
                label={item.label}
                href={item.href}
                className={desktopNavLinkClassName}
              />
            ))}
          </nav>
          <Button
            size="sm"
            className={cn(goldButtonClassName, "shrink-0 rounded-full")}
            asChild
          >
            <Link href="/worker">Find a Worker</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex shrink-0 items-center justify-center md:hidden"
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        </div>
      </div>

      {/* Mobile: slide-in drawer from right */}
      {isOpen ? (
        <div className="fixed inset-0 z-[100] pointer-events-auto md:hidden" role="presentation">
          <button
            type="button"
            className="nav-drawer-backdrop absolute inset-0 bg-black/65 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={close}
          />
          <div
            id="mobile-nav-drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Main menu"
            className="nav-drawer-panel absolute right-0 top-0 flex h-[100dvh] w-full max-w-[min(100vw,20rem)] flex-col border-l border-teal/20 bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-4">
              <Link href="/" className="flex min-w-0 items-center py-0.5" onClick={goHome} aria-label="ZotServis home">
                <Image
                  src="/zotservisbluelogo.png"
                  alt="Zot Servis"
                  width={862}
                  height={289}
                  className="h-10 w-auto max-w-[min(280px,62vw)] object-contain object-left"
                />
              </Link>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/80 text-foreground transition-colors hover:bg-secondary"
                onClick={close}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 py-4 pb-6">
              <nav className="shrink-0 flex flex-col gap-1">
                {navItems.map((item) => (
                  <SectionNavLink
                    key={item.key}
                    sectionId={item.id}
                    label={item.label}
                    href={item.href}
                    className={mobileNavLinkClassName}
                    onNavigate={close}
                  />
                ))}
              </nav>

              <div className="mt-3 shrink-0 border-t border-border pt-4">
                <Button
                  size="sm"
                  className={cn(goldButtonClassName, "w-full rounded-full")}
                  asChild
                >
                  <Link href="/worker" onClick={close}>
                    Find a Worker
                  </Link>
                </Button>
              </div>

              <div className="mt-auto shrink-0 pt-8">
                <MobileDrawerContact onNavigate={close} />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
