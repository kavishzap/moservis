/** Soft primary (amber) glow orbs — same language as Trust / “Why choose us”. */
export function AmberAmbientBlurs({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/[0.055] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-primary/[0.04] blur-3xl" />
      <div className="absolute left-0 top-1/2 h-64 w-64 -translate-x-1/3 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-3xl" />
    </div>
  )
}
