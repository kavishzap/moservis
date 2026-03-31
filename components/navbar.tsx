"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
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

const sectionNav = [
  { id: "categories", label: "Category" },
  { id: "why-choose-us", label: "Why choose us" },
  { id: "become-a-worker", label: "Become a worker" },
  { id: "faq", label: "FAQ" },
] as const

function SectionNavLink({
  sectionId,
  label,
  className,
  onNavigate,
}: {
  sectionId: string
  label: string
  className?: string
  onNavigate?: () => void
}) {
  const pathname = usePathname()
  const isHome = pathname === "/"

  if (isHome) {
    if (sectionId === "become-a-worker") {
      return (
        <Link href="/register" className={className} onClick={() => onNavigate?.()}>
          {label}
        </Link>
      )
    }

    return (
      <a
        href={`#${sectionId}`}
        className={className}
        onClick={() => onNavigate?.()}
      >
        {label}
      </a>
    )
  }

  return (
    <Link
      href={sectionId === "become-a-worker" ? "/register" : `/#${sectionId}`}
      className={className}
      onClick={() => onNavigate?.()}
    >
      {label}
    </Link>
  )
}

function MobileDrawerContact({ onNavigate }: { onNavigate: () => void }) {
  const primaryPhone = SITE_CONTACT_PHONES[0]

  return (
    <div className="border-t border-primary/20 pt-4">
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
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              {formatSitePhoneDisplay(phone)}
            </a>
          </li>
        ))}
        <li className="flex items-center gap-2">
          <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
          <a
            href={`mailto:${SITE_CONTACT_EMAIL}`}
            onClick={onNavigate}
            className="font-medium text-foreground transition-colors hover:text-primary"
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
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 text-primary transition-colors hover:bg-primary/10"
          aria-label={`Email ${SITE_CONTACT_EMAIL}`}
          onClick={onNavigate}
        >
          <Mail className="h-3.5 w-3.5" strokeWidth={1.5} />
        </a>
        <a
          href={buildWhatsAppHref(primaryPhone, PLATFORM_WHATSAPP_DEFAULT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 text-[#25D366] transition-colors hover:bg-primary/10"
          aria-label={`WhatsApp ${formatSitePhoneDisplay(primaryPhone)}`}
          onClick={onNavigate}
        >
          <WhatsAppIcon className="h-3.5 w-3.5" />
        </a>
        <a
          href={SITE_FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 text-[#1877F2] transition-colors hover:bg-primary/10"
          aria-label="Facebook"
          onClick={onNavigate}
        >
          <Facebook className="h-3.5 w-3.5" strokeWidth={1.75} fill="currentColor" />
        </a>
        <a
          href={SITE_TIKTOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-primary/30 text-foreground transition-colors hover:bg-primary/10"
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
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(false)

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
    <header className="sticky top-0 z-50 w-full bg-background/55 backdrop-blur-md supports-[backdrop-filter]:bg-background/40">
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
        <Link href="/" className="flex shrink-0 items-center py-0.5" onClick={close}>
          <Image
            src="/zotservis_whitelogo.png"
            alt="Zot Servis"
            width={360}
            height={80}
            className="h-12 w-auto max-w-[min(340px,72vw)] object-contain object-left sm:h-[3.35rem] sm:max-w-[min(360px,78vw)] md:h-14 md:max-w-[360px]"
            priority
          />
        </Link>

        <div className="hidden items-center gap-5 lg:gap-8 md:flex">
          <nav className="flex flex-wrap items-center justify-end gap-x-4 gap-y-1 lg:gap-x-6">
            {sectionNav.map((item) => (
              <SectionNavLink
                key={item.id}
                sectionId={item.id}
                label={item.label}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              />
            ))}
          </nav>
          <Button
            size="sm"
            className="rounded-full font-semibold shadow-[0_0_18px_rgba(245,158,11,0.3)]"
            asChild
          >
            <Link href="/search">Find Workers</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex items-center justify-center md:hidden"
          onClick={() => setIsOpen((o) => !o)}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-drawer"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile: slide-in drawer from right */}
      {isOpen ? (
        <div className="fixed inset-0 z-[100] md:hidden" role="presentation">
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
            className="nav-drawer-panel absolute right-0 top-0 flex h-[100dvh] w-full max-w-[min(100vw,20rem)] flex-col border-l border-primary/20 bg-background shadow-2xl"
          >
            <div className="flex items-center justify-between gap-3 border-b border-primary/15 px-4 py-4">
              <Link href="/" className="flex min-w-0 items-center py-0.5" onClick={close}>
                <Image
                  src="/zotservis_whitelogo.png"
                  alt="Zot Servis"
                  width={360}
                  height={80}
                  className="h-11 w-auto max-w-[min(260px,58vw)] object-contain object-left"
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
                {sectionNav.map((item) => (
                  <SectionNavLink
                    key={item.id}
                    sectionId={item.id}
                    label={item.label}
                    className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary"
                    onNavigate={close}
                  />
                ))}
              </nav>

              <div className="mt-3 shrink-0 border-t border-primary/15 pt-4">
                <Button
                  size="sm"
                  className="w-full rounded-full font-semibold shadow-[0_0_18px_rgba(245,158,11,0.3)]"
                  asChild
                >
                  <Link href="/search" onClick={close}>
                    Find Workers
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
