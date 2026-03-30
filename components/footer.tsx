import Image from "next/image"
import Link from "next/link"
import { Mail, MapPin } from "lucide-react"
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon"
import {
  SITE_CONTACT_EMAIL,
  SITE_CONTACT_PHONES,
  buildWhatsAppHref,
  PLATFORM_WHATSAPP_DEFAULT_MESSAGE,
  formatSitePhoneDisplay,
} from "@/lib/contact"

const platformLinks = [
  { href: "/", label: "Home" },
  { href: "/search", label: "Find Workers" },
  { href: "/register", label: "Become a Worker" },
  { href: "/#faq", label: "FAQ" },
]

export function Footer() {
  return (
    <footer className="border-t border-primary/20 bg-secondary/40">
      <div className="container mx-auto px-4 py-10 sm:px-6">
        <div className="grid gap-10 md:grid-cols-3">
          <div className="space-y-3">
            <Link href="/" className="inline-flex items-center gap-2">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/35 bg-card p-1 shadow-[0_0_14px_rgba(57,255,20,0.12)]">
                <Image
                  src="/logo.png"
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span className="text-xl font-bold text-foreground">ZotServis</span>
            </Link>
            <p className="max-w-sm text-sm text-muted-foreground">
              Tou servis, pre ar zot. Find trusted local workers across Mauritius.
            </p>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Platform</h3>
            <ul className="space-y-2">
              {platformLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-3 text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-2">
              {SITE_CONTACT_PHONES.map((phone) => (
                <li key={phone} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#25D366]" />
                  <a
                    href={buildWhatsAppHref(phone, PLATFORM_WHATSAPP_DEFAULT_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-foreground"
                  >
                    {formatSitePhoneDisplay(phone)}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 shrink-0" />
                <a
                  href={`mailto:${SITE_CONTACT_EMAIL}`}
                  className="transition-colors hover:text-foreground"
                >
                  {SITE_CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Mauritius</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
            <p>&copy; {new Date().getFullYear()} ZotServis. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-foreground">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
