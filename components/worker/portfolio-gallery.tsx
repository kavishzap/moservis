"use client"

import { useCallback, useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, LayoutGrid, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const PREVIEW_COUNT = 4

type PortfolioGalleryProps = {
  images: string[]
}

function PortfolioImage({
  src,
  alt,
  onClick,
  className,
  reserveBottomSpace = false,
}: {
  src: string
  alt: string
  onClick: () => void
  className?: string
  reserveBottomSpace?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex w-full min-h-[11rem] max-h-[min(62vw,17.5rem)] items-center justify-center overflow-hidden rounded-xl border border-teal/20 bg-muted/30 p-2 shadow-[0_8px_24px_rgb(11_60_93_/_0.1)] transition-transform active:scale-[0.99] sm:min-h-0 sm:max-h-none sm:aspect-square sm:p-0",
        reserveBottomSpace && "pb-12 sm:pb-0",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn(
          "max-h-full max-w-full object-contain sm:h-full sm:w-full sm:object-cover",
          reserveBottomSpace && "max-h-[calc(100%-2.75rem)] sm:max-h-full",
        )}
      />
    </button>
  )
}

function ViewMoreButton({
  onClick,
  label = "View more photos",
}: {
  onClick: () => void
  label?: string
}) {
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation()
        onClick()
      }}
      className="absolute right-2.5 bottom-2.5 z-10 inline-flex max-w-[calc(100%-1.25rem)] items-center gap-1.5 rounded-full bg-white/95 px-2.5 py-1.5 text-[11px] leading-tight font-semibold whitespace-nowrap text-foreground shadow-[0_4px_16px_rgb(0_0_0_/_0.18)] backdrop-blur-sm transition-colors hover:bg-white min-[380px]:gap-2 min-[380px]:px-3 min-[380px]:py-2 min-[380px]:text-xs"
    >
      <LayoutGrid className="h-3.5 w-3.5 shrink-0 text-teal min-[380px]:h-4 min-[380px]:w-4" aria-hidden />
      <span className="truncate">{label}</span>
    </button>
  )
}

function PortfolioLightbox({
  images,
  index,
  onClose,
  onPrev,
  onNext,
}: {
  images: string[]
  index: number
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}) {
  const src = images[index]
  const alt = `Portfolio work ${index + 1}`

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/90 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio image viewer"
      onClick={onClose}
    >
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10 h-10 w-10 rounded-full text-white hover:bg-white/15 hover:text-white"
        onClick={onClose}
        aria-label="Close"
      >
        <X className="h-5 w-5" />
      </Button>

      {images.length > 1 && (
        <>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 left-3 z-10 h-11 w-11 -translate-y-1/2 rounded-full text-white hover:bg-white/15 hover:text-white sm:left-6"
            onClick={(event) => {
              event.stopPropagation()
              onPrev()
            }}
            aria-label="Previous photo"
          >
            <ChevronLeft className="h-7 w-7" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute top-1/2 right-3 z-10 h-11 w-11 -translate-y-1/2 rounded-full text-white hover:bg-white/15 hover:text-white sm:right-6"
            onClick={(event) => {
              event.stopPropagation()
              onNext()
            }}
            aria-label="Next photo"
          >
            <ChevronRight className="h-7 w-7" />
          </Button>
        </>
      )}

      <div
        className="relative flex max-h-[85vh] w-full max-w-4xl items-center justify-center"
        onClick={(event) => event.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-[85vh] max-w-full rounded-lg object-contain"
        />
        <p className="absolute -bottom-8 left-1/2 w-full -translate-x-1/2 text-center text-sm text-white/80">
          {index + 1} / {images.length}
        </p>
      </div>
    </div>
  )
}

export function PortfolioGallery({ images }: PortfolioGalleryProps) {
  const [showAll, setShowAll] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const previewCount = Math.min(images.length, PREVIEW_COUNT)
  const visibleImages = showAll ? images : images.slice(0, previewCount)
  const canExpand = images.length > PREVIEW_COUNT
  const buttonAnchorIndex = visibleImages.length - 1

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = () => setLightboxIndex(null)

  const handleViewMore = () => {
    if (!showAll && canExpand) {
      setShowAll(true)
      return
    }
    openLightbox(0)
  }

  const goPrev = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null
      return current > 0 ? current - 1 : images.length - 1
    })
  }, [images.length])

  const goNext = useCallback(() => {
    setLightboxIndex((current) => {
      if (current === null) return null
      return current < images.length - 1 ? current + 1 : 0
    })
  }, [images.length])

  useEffect(() => {
    if (lightboxIndex === null) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev()
      if (event.key === "ArrowRight") goNext()
      if (event.key === "Escape") closeLightbox()
    }

    document.body.style.overflow = "hidden"
    window.addEventListener("keydown", onKeyDown)

    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [lightboxIndex, goPrev, goNext])

  if (images.length === 0) return null

  const viewMoreLabel =
    !showAll && canExpand ? "View more photos" : "View all photos"
  const viewMoreLabelShort =
    !showAll && canExpand ? "View more" : "View all"

  return (
    <>
      {/* Mobile — stacked */}
      <div className="flex w-full min-w-0 flex-col gap-4 sm:hidden">
        {visibleImages.map((src, index) => {
          const showViewMore = index === buttonAnchorIndex

          return (
            <div
              key={`${index}-${src.slice(0, 32)}`}
              className="relative w-full min-w-0"
            >
              <PortfolioImage
                src={src}
                alt={`Portfolio work ${index + 1}`}
                onClick={() => openLightbox(index)}
                reserveBottomSpace={showViewMore}
              />

              {showViewMore ? (
                <ViewMoreButton
                  onClick={handleViewMore}
                  label={viewMoreLabelShort}
                />
              ) : null}
            </div>
          )
        })}
      </div>

      {/* Desktop — grid with expand + lightbox */}
      <div className="hidden w-full min-w-0 sm:block">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
          {(showAll ? images : images.slice(0, previewCount)).map((src, index) => (
            <PortfolioImage
              key={`${index}-${src.slice(0, 32)}`}
              src={src}
              alt={`Portfolio work ${index + 1}`}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={handleViewMore}
            className="inline-flex items-center gap-2 rounded-full border border-teal/35 bg-card px-4 py-2.5 text-sm font-semibold text-teal shadow-sm transition-colors hover:border-teal/50 hover:bg-teal/5"
          >
            <LayoutGrid className="h-4 w-4 shrink-0" aria-hidden />
            {viewMoreLabel}
          </button>
        </div>
      </div>

      {lightboxIndex !== null ? (
        <PortfolioLightbox
          images={images}
          index={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      ) : null}
    </>
  )
}
