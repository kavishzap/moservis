import { LazyImage } from "@/components/worker/lazy-image"

type PortfolioGalleryProps = {
  images: string[]
}

export function PortfolioGallery({ images }: PortfolioGalleryProps) {
  if (images.length === 0) return null

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {images.map((src, index) => (
        <LazyImage
          key={`${index}-${src.slice(0, 32)}`}
          src={src}
          alt={`Portfolio work ${index + 1}`}
          className="aspect-square w-full rounded-xl border border-teal/20"
        />
      ))}
    </div>
  )
}
