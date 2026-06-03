import { cn } from "@/lib/utils"

/** Soft teal / ocean glow orbs for section backgrounds. */
export function BrandAmbientBlurs({ subtle = false }: { subtle?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div
        className={cn(
          "absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full blur-3xl",
          subtle ? "bg-teal/[0.03]" : "bg-teal/[0.07]"
        )}
      />
      <div
        className={cn(
          "absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full blur-3xl",
          subtle ? "bg-ocean/[0.025]" : "bg-ocean/[0.05]"
        )}
      />
      <div
        className={cn(
          "absolute left-0 top-1/2 h-64 w-64 -translate-x-1/3 -translate-y-1/2 rounded-full blur-3xl",
          subtle ? "bg-gold/[0.02]" : "bg-gold/[0.04]"
        )}
      />
    </div>
  )
}
