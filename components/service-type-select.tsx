"use client"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SERVICE_TYPES } from "@/lib/search-options"
import { cn } from "@/lib/utils"

/** Hero search bar: glass row, pill fields (readable on photo + overlay). */
export const heroSearchSelectTriggerClassName =
  "h-10 w-full rounded-full border-0 bg-white/[0.06] pl-10 text-sm text-white shadow-none ring-1 ring-inset ring-white/10 transition-colors hover:bg-white/[0.09] focus-visible:ring-2 focus-visible:ring-primary/70 focus-visible:ring-offset-0 data-[placeholder]:text-white/70 [&_[data-slot=select-value]]:text-white [&_[data-slot=select-value][data-placeholder]]:text-white/70 [&_svg]:text-white/60 sm:text-base"

const heroTriggerClass = heroSearchSelectTriggerClassName

const defaultTriggerClass = "w-full"

type ServiceTypeSelectProps = {
  value: string
  onValueChange: (value: string) => void
  id?: string
  placeholder?: string
  variant?: "default" | "hero"
  className?: string
  /** When set, first option uses this value and label (e.g. hero search “all services”) */
  allOption?: { value: string; label: string }
}

/**
 * Same service/job type list everywhere (from `SERVICE_TYPES`).
 */
export function ServiceTypeSelect({
  value,
  onValueChange,
  id,
  placeholder = "Select service type",
  variant = "default",
  className,
  allOption,
}: ServiceTypeSelectProps) {
  return (
    <Select value={value || undefined} onValueChange={onValueChange}>
      <SelectTrigger
        id={id}
        className={cn(variant === "hero" ? heroTriggerClass : defaultTriggerClass, className)}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {allOption && (
          <SelectItem value={allOption.value}>{allOption.label}</SelectItem>
        )}
        {SERVICE_TYPES.map((s) => (
          <SelectItem key={s.value} value={s.value}>
            {s.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
