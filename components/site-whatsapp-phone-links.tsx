import {
  SITE_CONTACT_PHONES,
  buildWhatsAppHref,
  PLATFORM_WHATSAPP_DEFAULT_MESSAGE,
  formatSitePhoneDisplay,
} from "@/lib/contact"

type SiteWhatsAppPhoneLinksProps = {
  separator?: string
  className?: string
}

/** Inline WhatsApp links to platform numbers (legal copy, etc.). */
export function SiteWhatsAppPhoneLinks({
  separator = " · ",
  className = "text-primary underline underline-offset-2 hover:text-primary/90",
}: SiteWhatsAppPhoneLinksProps) {
  return (
    <>
      {SITE_CONTACT_PHONES.map((phone, i) => (
        <span key={phone}>
          {i > 0 ? separator : null}
          <a
            href={buildWhatsAppHref(phone, PLATFORM_WHATSAPP_DEFAULT_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className={className}
          >
            {formatSitePhoneDisplay(phone)}
          </a>
        </span>
      ))}
    </>
  )
}
