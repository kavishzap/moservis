import Image from "next/image"
import Link from "next/link"
import { Facebook, Mail, MapPin } from "lucide-react"
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

const sectionLinks = [
  { href: "/#categories", label: "Category" },
  { href: "/#why-choose-us", label: "Why choose us" },
  { href: "/#become-a-worker", label: "Become a worker" },
  { href: "/#faq", label: "FAQ" },
] as const

const legalLinks = [
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms of Service" },
] as const

export function Footer() {
  const primaryPhone = SITE_CONTACT_PHONES[0]

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="container mx-auto px-4 py-14 sm:px-6 md:py-16 lg:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {/* Brand */}
          <div className="space-y-4 lg:max-w-xl">
            <Link href="/" className="inline-flex items-center py-0.5">
              <Image
                src="/zotservis_whitelogo.png"
                alt="Zot Servis"
                width={520}
                height={112}
                className="h-14 w-auto max-w-[min(100%,380px)] object-contain object-left sm:h-16 sm:max-w-[460px] md:h-[4.5rem] md:max-w-[520px]"
              />
            </Link>
            <p className="text-sm leading-relaxed text-zinc-500">
              Tou servis, pre ar zot. Find trusted local workers across Mauritius.
            </p>
          </div>

          {/* Sections */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-[0.8125rem]">
              Sections
            </h3>
            <ul className="space-y-3">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white transition-colors hover:text-zinc-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-[0.8125rem]">
              Legal
            </h3>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-white transition-colors hover:text-zinc-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-[0.8125rem]">
              Contact
            </h3>
            <ul className="space-y-3">
              {SITE_CONTACT_PHONES.map((phone) => (
                <li key={phone} className="flex items-start gap-2.5">
                  <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                  <a
                    href={buildWhatsAppHref(phone, PLATFORM_WHATSAPP_DEFAULT_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-white transition-colors hover:text-zinc-300"
                  >
                    {formatSitePhoneDisplay(phone)}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={`mailto:${SITE_CONTACT_EMAIL}`}
                  className="text-sm font-medium text-white transition-colors hover:text-zinc-300"
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

        <div className="mt-14 border-t border-white/10 pt-8 md:mt-16 md:pt-10">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex flex-wrap items-center justify-center gap-3 sm:justify-start">
              <a
                href={`mailto:${SITE_CONTACT_EMAIL}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-primary transition-colors hover:border-primary/50 hover:bg-white/5"
                aria-label={`Email ${SITE_CONTACT_EMAIL}`}
              >
                <Mail className="h-4 w-4" strokeWidth={1.5} />
              </a>
              <a
                href={buildWhatsAppHref(primaryPhone, PLATFORM_WHATSAPP_DEFAULT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/35 text-[#25D366] transition-colors hover:border-white/55 hover:bg-white/5"
                aria-label={`WhatsApp ${formatSitePhoneDisplay(primaryPhone)}`}
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
            <p className="text-center text-sm text-zinc-500 sm:text-right">
              &copy; {new Date().getFullYear()} ZotServis. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
