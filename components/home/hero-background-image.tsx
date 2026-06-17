type HeroBackgroundImageProps = {
  alt: string
}

/** Responsive hero art — browser loads only one WebP via `<picture>`. */
export function HeroBackgroundImage({ alt }: HeroBackgroundImageProps) {
  return (
    <picture className="absolute inset-0 block">
      <source
        media="(min-width: 768px)"
        srcSet="/zotservislandscape.webp"
        type="image/webp"
      />
      <source media="(min-width: 768px)" srcSet="/zotservislandscape.png" type="image/png" />
      <source srcSet="/zotservisportrait.webp" type="image/webp" />
      <img
        src="/zotservisportrait.png"
        alt={alt}
        fetchPriority="high"
        decoding="async"
        className="h-full w-full object-cover object-center md:object-[center_28%]"
      />
    </picture>
  )
}
