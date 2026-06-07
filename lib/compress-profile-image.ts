const ACCEPTED_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
])

const MAX_INPUT_BYTES = 5 * 1024 * 1024
const MAX_OUTPUT_BYTES = 120 * 1024
const MAX_DIMENSION = 256

export class ProfileImageError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ProfileImageError"
  }
}

export async function compressProfileImage(file: File): Promise<string> {
  if (!ACCEPTED_TYPES.has(file.type)) {
    throw new ProfileImageError("Use a JPG, PNG, or WebP image.")
  }

  if (file.size > MAX_INPUT_BYTES) {
    throw new ProfileImageError("Image must be 5 MB or smaller.")
  }

  const objectUrl = URL.createObjectURL(file)

  try {
    const image = await loadImage(objectUrl)
    const { width, height } = fitWithinSquare(image.width, image.height, MAX_DIMENSION)

    const canvas = document.createElement("canvas")
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext("2d")
    if (!context) {
      throw new ProfileImageError("Could not process this image.")
    }

    context.drawImage(image, 0, 0, width, height)

    let quality = 0.82
    let dataUrl = canvas.toDataURL("image/jpeg", quality)

    while (estimateDataUrlBytes(dataUrl) > MAX_OUTPUT_BYTES && quality > 0.45) {
      quality -= 0.08
      dataUrl = canvas.toDataURL("image/jpeg", quality)
    }

    if (estimateDataUrlBytes(dataUrl) > MAX_OUTPUT_BYTES) {
      throw new ProfileImageError(
        "Image is still too large after compression. Try a smaller photo.",
      )
    }

    return dataUrl
  } finally {
    URL.revokeObjectURL(objectUrl)
  }
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.onload = () => resolve(image)
    image.onerror = () => reject(new ProfileImageError("Could not read this image."))
    image.src = src
  })
}

function fitWithinSquare(
  width: number,
  height: number,
  maxSize: number,
): { width: number; height: number } {
  if (width <= maxSize && height <= maxSize) {
    return { width, height }
  }

  const scale = maxSize / Math.max(width, height)
  return {
    width: Math.max(1, Math.round(width * scale)),
    height: Math.max(1, Math.round(height * scale)),
  }
}

function estimateDataUrlBytes(dataUrl: string): number {
  const base64 = dataUrl.split(",")[1] ?? ""
  return Math.ceil((base64.length * 3) / 4)
}
