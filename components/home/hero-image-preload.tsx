/** Preload only the hero image matching the current viewport. */
export function HeroImagePreload() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/zotservisportrait.webp"
        type="image/webp"
        media="(max-width: 767px)"
      />
      <link
        rel="preload"
        as="image"
        href="/zotservislandscape.webp"
        type="image/webp"
        media="(min-width: 768px)"
      />
    </>
  )
}
