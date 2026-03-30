/** Platform WhatsApp lines (footer, marketing). */
export const SITE_CONTACT_PHONES = ["+230 57833020", "+230 59182520"] as const

/** Default message when opening WhatsApp to the platform. */
export const PLATFORM_WHATSAPP_DEFAULT_MESSAGE = "Hello, I'm contacting ZotServis."

/** Platform support email (footer, mailto links). */
export const SITE_CONTACT_EMAIL = "zotservissupport@gmail.com"

/** Pretty +230 XXXX XXXX for display. */
export function formatSitePhoneDisplay(phone: string): string {
  const d = normalizePhoneDigits(phone)
  if (d.length === 11 && d.startsWith("230")) {
    const local = d.slice(3)
    return `+230 ${local.slice(0, 4)} ${local.slice(4)}`
  }
  if (d.length === 8 && d.startsWith("5")) {
    return `+230 ${d.slice(0, 4)} ${d.slice(4)}`
  }
  return phone
}

/** Example format for phone fields on forms (not the platform line). */
export const PHONE_INPUT_PLACEHOLDER = "+230 5XXX XXXX"

/** Strip to digits only */
export function normalizePhoneDigits(input: string): string {
  return input.replace(/\D/g, "")
}

/**
 * Mauritius mobile: often 8 digits starting with 5 (e.g. 51234567).
 * Full international: 230 + 8 digits = 11 digits total.
 */
export function toInternationalDigits(phone: string): string {
  let d = normalizePhoneDigits(phone)
  if (d.length === 0) return d
  if (d.length === 8 && d.startsWith("5")) {
    d = "230" + d
  }
  if (d.length >= 10 && d.startsWith("0")) {
    d = "230" + d.replace(/^0+/, "")
  }
  return d
}

export function buildTelHref(phone: string): string {
  const d = toInternationalDigits(phone)
  if (!d) return "#"
  return `tel:+${d}`
}

export function buildWhatsAppHref(phone: string, message: string): string {
  const d = toInternationalDigits(phone)
  if (!d) return "#"
  const text = encodeURIComponent(message.trim() || " ")
  return `https://wa.me/${d}?text=${text}`
}

export function defaultWhatsAppMessage(workerName: string, title: string): string {
  const first = workerName.trim().split(/\s+/)[0] ?? workerName
  return `Hi ${first}, I found your profile on ZotServis and I'm interested in your ${title} services.

Could you please let me know your availability?`
}
