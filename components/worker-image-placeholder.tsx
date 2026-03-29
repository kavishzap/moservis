import { ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"

type PlaceholderVariant = "hero" | "section" | "cta" | "compact"

const variantStyles: Record<
  PlaceholderVariant,
  { box: string; icon: string; text: string }
> = {
  hero: {
    box: "min-h-[220px] sm:min-h-[280px] lg:min-h-[340px]",
    icon: "h-12 w-12",
    text: "text-sm",
  },
  section: {
    box: "min-h-[180px] sm:min-h-[220px]",
    icon: "h-10 w-10",
    text: "text-xs sm:text-sm",
  },
  cta: {
    box: "min-h-[200px] sm:min-h-[240px]",
    icon: "h-10 w-10",
    text: "text-xs sm:text-sm",
  },
  compact: {
    box: "min-h-[140px]",
    icon: "h-8 w-8",
    text: "text-xs",
  },
}

export interface WorkerImagePlaceholderProps {
  variant?: PlaceholderVariant
  className?: string
  /** Screen-reader label */
  label?: string
}

/**
 * Area reserved for a worker illustration (e.g. transparent PNG).
 * Add your asset under `public/images/` and render an `<img>` as a child, or replace this component.
 */
export function WorkerImagePlaceholder({
  variant = "section",
  className,
  label = "Worker illustration placeholder",
}: WorkerImagePlaceholderProps) {
  const v = variantStyles[variant]
  const isCta = variant === "cta"

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border-2 border-dashed",
        isCta
          ? "border-primary-foreground/35 bg-primary-foreground/[0.07]"
          : "border-muted-foreground/30 bg-muted/25",
        v.box,
        className,
      )}
      role="img"
      aria-label={label}
    >
      {/* Add your image (transparent background works well), e.g.:
          <img
            src="/images/hero-worker.png"
            alt=""
            className="pointer-events-none absolute inset-x-0 bottom-0 z-10 mx-auto max-h-[95%] w-auto object-contain object-bottom"
          />
      */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center",
          isCta ? "text-primary-foreground/55" : "text-muted-foreground/70",
        )}
      >
        <ImageIcon
          className={cn(
            v.icon,
            isCta ? "text-primary-foreground/40" : "text-muted-foreground/45",
          )}
          aria-hidden
        />
        <p className={cn("max-w-[16rem] leading-snug", v.text)}>
          <span
            className={cn(
              "font-medium",
              isCta ? "text-primary-foreground/90" : "text-foreground/80",
            )}
          >
            Image placeholder
          </span>
          <br />
          <span className={isCta ? "text-primary-foreground/65" : "text-muted-foreground"}>
            Drop a worker illustration here (PNG with transparent background)
          </span>
        </p>
      </div>
    </div>
  )
}
