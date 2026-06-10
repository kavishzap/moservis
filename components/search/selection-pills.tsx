"use client"

import { X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type SelectionPillsProps = {
  items: { id: string; name: string }[]
  selectedIds: string[]
  onToggle: (id: string) => void
  labelId?: string
  variant?: "default" | "hero"
  className?: string
}

const pillGroupClass =
  "flex w-full min-w-0 max-w-full flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-stretch sm:justify-start"

/** Keeps long labels wrapped and clipped inside the pill border. */
const pillTextClass =
  "block min-w-0 w-full [overflow-wrap:anywhere] break-words text-sm leading-normal font-medium"

const unselectedPillClass =
  "box-border flex h-auto min-h-9 w-full max-w-full items-center justify-center overflow-hidden rounded-full border border-dashed px-4 py-2.5 text-center transition-colors sm:max-w-full"

const selectedPillClass =
  "box-border flex h-auto min-h-9 w-full max-w-full items-start justify-start gap-1.5 overflow-hidden rounded-full px-4 py-2.5 pr-2 text-left whitespace-normal sm:max-w-full"

export function SelectionPills({
  items,
  selectedIds,
  onToggle,
  labelId,
  variant = "default",
  className,
}: SelectionPillsProps) {
  const isHero = variant === "hero"

  return (
    <div
      className={cn(pillGroupClass, className)}
      role="group"
      aria-labelledby={labelId}
    >
      {items.map(({ id, name }) => {
        const isOn = selectedIds.includes(id)
        if (isOn) {
          return (
            <Badge
              key={id}
              variant="outline"
              className={cn(
                selectedPillClass,
                "h-auto shrink whitespace-normal",
                isHero
                  ? "border-white/50 bg-white/20 text-white [a&]:hover:bg-white/25"
                  : "border-teal/50 bg-teal/10 text-teal [a&]:hover:bg-teal/20"
              )}
            >
              <span className={pillTextClass}>{name}</span>
              <button
                type="button"
                onClick={() => onToggle(id)}
                className={cn(
                  "mt-0.5 shrink-0 rounded-full p-0.5",
                  isHero ? "hover:bg-white/25" : "hover:bg-teal/20"
                )}
                aria-label={`Remove ${name}`}
              >
                <X className="h-3 w-3" />
              </button>
            </Badge>
          )
        }
        return (
          <button
            key={id}
            type="button"
            onClick={() => onToggle(id)}
            aria-pressed={false}
            className={cn(
              unselectedPillClass,
              isHero
                ? "border-white/35 bg-white/10 text-white/85 hover:border-white/50 hover:bg-white/16 hover:text-white"
                : "border-teal/30 bg-muted/30 text-muted-foreground hover:border-teal/50 hover:bg-muted/60 hover:text-foreground"
            )}
          >
            <span className={pillTextClass}>{name}</span>
          </button>
        )
      })}
    </div>
  )
}
