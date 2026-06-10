/** Keep API responses small enough for Edge Function memory + base64 envelope encoding. */
export const MAX_RESPONSE_DATA_URI_LENGTH = 200_000

/** Portfolio images may be larger; capped at store limit (single-worker profile responses). */
export const MAX_PORTFOLIO_IMAGE_STORE_LENGTH = 500_000

export const MAX_PORTFOLIO_RESPONSE_LENGTH = MAX_PORTFOLIO_IMAGE_STORE_LENGTH

export function sanitizeProfileImageForResponse(
  value: string | null | undefined,
): string | null {
  if (!value?.trim()) return null
  const cleaned = value.trim()
  if (cleaned.length > MAX_RESPONSE_DATA_URI_LENGTH) return null
  return cleaned
}

export function sanitizePortfolioImagesForResponse(
  value: unknown,
  maxLength = MAX_PORTFOLIO_RESPONSE_LENGTH,
): string[] {
  if (!Array.isArray(value)) return []

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean)
    .filter((item) => item.length <= maxLength)
    .slice(0, 5)
}

export function normalizePortfolioImages(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean)
  }

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value) as unknown
      if (Array.isArray(parsed)) {
        return parsed
          .map((item) => (typeof item === "string" ? item.trim() : ""))
          .filter(Boolean)
      }
    } catch {
      // not JSON — ignore
    }
  }

  return []
}

export type PortfolioResponse = {
  count: number
  images: string[]
}

export function buildPortfolioResponse(
  value: unknown,
  maxLength = MAX_PORTFOLIO_RESPONSE_LENGTH,
): PortfolioResponse {
  const images = sanitizePortfolioImagesForResponse(value, maxLength)
  return {
    count: images.length,
    images,
  }
}
