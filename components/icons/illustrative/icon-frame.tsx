import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type IconFrameProps = {
  children: ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
  label?: string
}

const sizeClass = {
  sm: "h-11 w-11",
  md: "h-16 w-16 sm:h-[4.5rem] sm:w-[4.5rem]",
  lg: "h-20 w-20 sm:h-24 sm:w-24",
} as const

/** Wraps illustrative SVGs with consistent sizing. */
export function IconFrame({ children, className, size = "md", label }: IconFrameProps) {
  return (
    <span
      className={cn("inline-flex shrink-0 items-center justify-center", sizeClass[size], className)}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {children}
    </span>
  )
}
