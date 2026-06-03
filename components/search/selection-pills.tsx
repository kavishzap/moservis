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
  "flex w-full min-w-0 max-w-full flex-wrap items-start justify-start gap-2"

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
                "inline-flex h-auto min-h-8 w-auto max-w-full shrink items-start justify-start gap-1 rounded-full px-3 py-1.5 text-left text-sm leading-snug font-medium whitespace-normal",
                isHero
                  ? "border-white/50 bg-white/20 text-white [a&]:hover:bg-white/25"
                  : "border-teal/50 bg-teal/10 text-teal [a&]:hover:bg-teal/20"
              )}
            >
              <span className="min-w-0 break-words">{name}</span>
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
              "inline-flex h-auto min-h-8 max-w-full items-center rounded-full border border-dashed px-3 py-1.5 text-left text-sm leading-snug font-medium whitespace-normal transition-colors",
              isHero
                ? "border-white/35 bg-white/10 text-white/85 hover:border-white/50 hover:bg-white/16 hover:text-white"
                : "border-teal/30 bg-muted/30 text-muted-foreground hover:border-teal/50 hover:bg-muted/60 hover:text-foreground"
            )}
          >
            <span className="min-w-0 break-words">{name}</span>
          </button>
        )
      })}
    </div>
  )
}
