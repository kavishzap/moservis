"use client"

import { useRef, useState } from "react"
import { ImagePlus, Loader2, Trash2 } from "lucide-react"
import { toast } from "@/lib/toast"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  MAX_PORTFOLIO_IMAGES,
  PortfolioImageError,
  readImageAsBase64,
} from "@/lib/read-image-as-base64"
import { cn } from "@/lib/utils"

type PortfolioUploadProps = {
  images: string[]
  onChange: (images: string[]) => void
  disabled?: boolean
}

export function PortfolioUpload({
  images,
  onChange,
  disabled = false,
}: PortfolioUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [loading, setLoading] = useState(false)

  const remaining = MAX_PORTFOLIO_IMAGES - images.length
  const canAdd = remaining > 0

  const handleFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? [])
    event.target.value = ""

    if (files.length === 0) return

    if (files.length > remaining) {
      toast.error(`You can add up to ${remaining} more image${remaining === 1 ? "" : "s"}.`)
      return
    }

    setLoading(true)
    try {
      const encoded: string[] = []
      for (const file of files) {
        encoded.push(await readImageAsBase64(file))
      }
      onChange([...images, ...encoded])
    } catch (err) {
      toast.error(
        err instanceof PortfolioImageError
          ? err.message
          : "Could not add portfolio image.",
      )
    } finally {
      setLoading(false)
    }
  }

  const removeAt = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <Label className="text-sm font-medium">Portfolio</Label>
        <span className="text-xs text-muted-foreground">
          {images.length}/{MAX_PORTFOLIO_IMAGES} images
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {images.map((src, index) => (
          <div
            key={`${index}-${src.slice(0, 32)}`}
            className="group relative aspect-square overflow-hidden rounded-xl border border-teal/25 bg-muted/30"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt={`Portfolio ${index + 1}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              className="absolute right-1.5 top-1.5 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
              disabled={disabled || loading}
              onClick={() => removeAt(index)}
              aria-label={`Remove portfolio image ${index + 1}`}
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden />
            </Button>
          </div>
        ))}

        {canAdd ? (
          <button
            type="button"
            disabled={disabled || loading}
            onClick={() => inputRef.current?.click()}
            className={cn(
              "flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-teal/35 bg-muted/20 text-muted-foreground transition-colors",
              "hover:border-teal/55 hover:bg-muted/40 hover:text-foreground",
              "disabled:pointer-events-none disabled:opacity-50",
            )}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
            ) : (
              <ImagePlus className="h-5 w-5" aria-hidden />
            )}
            <span className="text-xs font-medium">Add image</span>
          </button>
        ) : null}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
        multiple
        className="sr-only"
        disabled={disabled || loading || !canAdd}
        onChange={(event) => void handleFiles(event)}
      />

      <p className="text-xs text-muted-foreground">
        Up to {MAX_PORTFOLIO_IMAGES} images, 5 MB each.
      </p>
    </div>
  )
}
