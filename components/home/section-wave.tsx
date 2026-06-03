/** Curved transition into the ocean trust section */
export function SectionWaveTop({ className = "text-ocean" }: { className?: string }) {
  return (
    <div className={`w-full leading-[0] ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className="block h-8 w-full sm:h-10 md:h-12"
      >
        <path
          fill="currentColor"
          d="M0,56 L0,28 C360,56 720,8 1080,28 C1260,40 1380,48 1440,20 L1440,56 Z"
        />
      </svg>
    </div>
  )
}
