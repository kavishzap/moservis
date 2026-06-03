import Image from "next/image"
import Link from "next/link"
import { Facebook, Mail, MapPin, Phone } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
import { TikTokIcon } from "@/components/icons/tiktok-icon"
import {
  SITE_CONTACT_PHONE,
  SITE_CONTACT_EMAIL,
  SITE_FACEBOOK_URL,
  SITE_TIKTOK_URL,
  buildTelHref,
  buildWhatsAppHref,
  PLATFORM_WHATSAPP_DEFAULT_MESSAGE,
} from "@/lib/contact"

const sectionLinks = [
  { href: "/#categories", label: "Category" },
  { href: "/#why-choose-us", label: "Why choose us" },
  { href: "/#become-a-worker", label: "Join as a Worker" },
  { href: "/#faq", label: "FAQ" },
] as const

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const

const footerLinkClassName =
  "text-sm font-medium text-white/90 transition-colors duration-200 hover:text-gold"

export function Footer() {
  const primaryPhone = SITE_CONTACT_PHONE

  return (
    <footer className="border-t border-white/10 bg-ocean text-white">
      <div className="container mx-auto px-4 py-8 sm:px-6 md:py-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand */}
          <div className="space-y-2 lg:max-w-xl">
            <Link href="/" className="inline-flex items-center py-0.5">
              <Image
                src="/zotserviswhitelogo.png"
                alt="Zot Servis"
                width={862}
                height={289}
                className="h-14 w-auto max-w-[min(100%,400px)] object-contain object-left sm:h-16 sm:max-w-[min(100%,480px)]"
              />
            </Link>
            <p className="text-sm leading-snug text-white/65">
              ZotServis, Rod Servis, Gagne Solution!!
            </p>
          </div>

          {/* Sections */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 sm:text-[0.8125rem]">
              Sections
            </h3>
            <ul className="space-y-1.5">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={footerLinkClassName}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 sm:text-[0.8125rem]">
              Legal
            </h3>
            <ul className="space-y-1.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={footerLinkClassName}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-white/55 sm:text-[0.8125rem]">
              Contact
            </h3>
            <ul className="space-y-1.5">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a
                  href={buildTelHref(SITE_CONTACT_PHONE)}
                  className={footerLinkClassName}
                >
                  {SITE_CONTACT_PHONE}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                <a
                  href={buildWhatsAppHref(SITE_CONTACT_PHONE, PLATFORM_WHATSAPP_DEFAULT_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={footerLinkClassName}
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold" aria-hidden />
                <a
                  href={`mailto:${SITE_CONTACT_EMAIL}`}
                    className={footerLinkClassName}
                >
                  {SITE_CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5 text-sm font-medium text-white">
                <MapPin className="h-4 w-4 shrink-0 text-zinc-400" aria-hidden />
                <span>Mauritius</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 md:mt-9 md:pt-6">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a
                href={`mailto:${SITE_CONTACT_EMAIL}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-gold transition-colors hover:border-gold/50 hover:bg-white/10"
                aria-label={`Email ${SITE_CONTACT_EMAIL}`}
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={buildWhatsAppHref(primaryPhone, PLATFORM_WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-[#25D366] transition-colors hover:border-white/55 hover:bg-white/5"
                aria-label={`WhatsApp ${SITE_CONTACT_PHONE}`}
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
              <a
                href={SITE_FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-[#1877F2] transition-colors hover:border-white/55 hover:bg-white/5"
                aria-label="ZotServis on Facebook"
              >
                <Facebook className="h-4 w-4" strokeWidth={1.75} fill="currentColor" />
              </a>
              <a
                href={SITE_TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-white transition-colors hover:border-white/55 hover:bg-white/5"
                aria-label="ZotServis on TikTok"
              >
                <TikTokIcon className="h-[1.05rem] w-[1.05rem]" />
              </a>
            </div>
            <p className="text-center text-sm text-white/55 sm:text-right" suppressHydrationWarning>
              &copy; {new Date().getFullYear()} ZotServis. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
