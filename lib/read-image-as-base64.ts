const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
])

const MAX_FILE_BYTES = 350_000

export class PortfolioImageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "PortfolioImageError"
  }
}

export function readImageAsBase64(file: File): Promise<string> {
  if (!ACCEPTED_TYPES.has(file.type)) {
    return Promise.reject(new PortfolioImageError("Use a JPG, PNG, WebP, or GIF image."))
  }

  if (file.size > MAX_FILE_BYTES) {
    return Promise.reject(new PortfolioImageError("Each image must be 350 KB or smaller."))
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result !== "string") {
        reject(new PortfolioImageError("Could not read this image."))
        return
      }
      resolve(reader.result)
    }
    reader.onerror = () => reject(new PortfolioImageError("Could not read this image."))
    reader.readAsDataURL(file)
  })
}

export const MAX_PORTFOLIO_IMAGES = 5
