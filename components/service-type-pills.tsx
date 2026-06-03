"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SERVICE_TYPES } from "@/lib/search-options"
import { cn } from "@/lib/utils"

type ServiceTypePillsProps = {
  selected: string[]
  onToggle: (value: string) => void
  className?: string
  /** When set, adds a hint for screen readers on unselected chips */
  labelId?: string
}

/**
 * Multi-select job/service types as removable pills when selected (same pattern as
 * “Services offered” on register) and dashed chips when unselected.
 */
export function ServiceTypePills({ selected, onToggle, className, labelId }: ServiceTypePillsProps) {
  return (
    <div
      className={cn(
        "flex w-full min-w-0 max-w-full flex-wrap items-start justify-start gap-2",
        className
      )}
      role="group"
      aria-labelledby={labelId}
    >
      {SERVICE_TYPES.map(({ label, value }) => {
        const isOn = selected.includes(value)
        if (isOn) {
          return (
            <Badge
              key={value}
              variant="outline"
              className="inline-flex h-auto min-h-8 w-auto max-w-full shrink items-start justify-start gap-1 rounded-full border-teal/50 bg-teal/10 px-3 py-1.5 pr-1 text-left text-sm leading-snug font-medium whitespace-normal text-teal [a&]:hover:bg-teal/20"
            >
              <span className="min-w-0 break-words">{label}</span>
              <button
                type="button"
                onClick={() => onToggle(value)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-teal/20"
                aria-label={`Remove ${label}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )
        }
        return (
          <button
            key={value}
            type="button"
            onClick={() => onToggle(value)}
            aria-pressed={false}
            className="inline-flex h-auto min-h-8 max-w-full items-center rounded-full border border-dashed border-teal/30 bg-muted/30 px-3 py-1.5 text-left text-sm leading-snug font-medium whitespace-normal text-muted-foreground transition-colors hover:border-teal/50 hover:bg-muted/60 hover:text-foreground"
          >
            <span className="min-w-0 break-words">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
