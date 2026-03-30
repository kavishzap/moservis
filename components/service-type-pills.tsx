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
      className={cn("flex flex-wrap gap-2", className)}
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
              className="h-8 gap-1 rounded-full border-primary/50 bg-primary/15 pr-1 text-sm font-medium text-primary [a&]:hover:bg-primary/25"
            >
              {label}
              <button
                type="button"
                onClick={() => onToggle(value)}
                className="ml-0.5 rounded-full p-0.5 hover:bg-primary/20"
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
            className="inline-flex h-8 items-center rounded-full border border-dashed border-primary/30 bg-muted/30 px-3 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/55 hover:bg-muted/60 hover:text-foreground"
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}
