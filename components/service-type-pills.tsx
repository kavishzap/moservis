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

const pillGroupClass =
  "flex w-full min-w-0 max-w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-start"

const pillTextClass =
  "block min-w-0 w-full [overflow-wrap:anywhere] break-words text-sm leading-normal font-medium"

const unselectedPillClass =
  "box-border flex h-auto min-h-9 w-full max-w-full items-center justify-center overflow-hidden rounded-full border border-dashed border-teal/30 bg-muted/30 px-4 py-2.5 text-center text-muted-foreground transition-colors hover:border-teal/50 hover:bg-muted/60 hover:text-foreground sm:max-w-full"

const selectedPillClass =
  "box-border flex h-auto min-h-9 w-full max-w-full items-start justify-start gap-1.5 overflow-hidden rounded-full border-teal/50 bg-teal/10 px-4 py-2.5 pr-2 text-left whitespace-normal text-teal [a&]:hover:bg-teal/20 sm:max-w-full"

/**
 * Multi-select job/service types as removable pills when selected (same pattern as
 * “Services offered” on register) and dashed chips when unselected.
 */
export function ServiceTypePills({ selected, onToggle, className, labelId }: ServiceTypePillsProps) {
  return (
    <div
      className={cn(pillGroupClass, className)}
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
              className={cn(selectedPillClass, "h-auto shrink whitespace-normal")}
            >
              <span className={pillTextClass}>{label}</span>
              <button
                type="button"
                onClick={() => onToggle(value)}
                className="mt-0.5 shrink-0 rounded-full p-0.5 hover:bg-teal/20"
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
            className={unselectedPillClass}
          >
            <span className={pillTextClass}>{label}</span>
          </button>
        )
      })}
    </div>
  )
}
