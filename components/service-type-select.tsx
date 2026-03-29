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

const heroTriggerClass =
  "h-12 w-full border-0 bg-secondary/50 pl-10 text-base focus-visible:ring-1 focus-visible:ring-primary [&_svg]:text-muted-foreground"

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
