"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { MAURITIUS_DISTRICTS, SERVICE_TYPES } from "@/lib/search-options"
import { cn } from "@/lib/utils"

type SearchFiltersContextValue = {
  selectedJobTypes: string[]
  toggleJobType: (value: string) => void
  clearFilters: () => void
}

const SearchFiltersContext = createContext<SearchFiltersContextValue | null>(null)

function useSearchFiltersContext() {
  const ctx = useContext(SearchFiltersContext)
  if (!ctx) {
    throw new Error("Search filters must be used within SearchFiltersProvider")
  }
  return ctx
}

export function SearchFiltersProvider({ children }: { children: ReactNode }) {
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([])

  const toggleJobType = useCallback((value: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    )
  }, [])

  const clearFilters = useCallback(() => {
    setSelectedJobTypes([])
  }, [])

  const value = useMemo(
    () => ({ selectedJobTypes, toggleJobType, clearFilters }),
    [selectedJobTypes, toggleJobType, clearFilters]
  )

  return (
    <SearchFiltersContext.Provider value={value}>{children}</SearchFiltersContext.Provider>
  )
}

function LocationField({ className }: { className?: string }) {
  return (
    <div className={cn("min-w-0", className)}>
      <h3 className="mb-3 text-base font-semibold text-foreground">Location</h3>
      <Select>
        <SelectTrigger className="h-auto min-h-11 w-full min-w-0 whitespace-normal py-2.5 text-left text-sm [&>span]:line-clamp-3 [&>span]:text-left">
          <SelectValue placeholder="Select district" />
        </SelectTrigger>
        <SelectContent className="max-h-[min(60vh,24rem)] w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]">
          {MAURITIUS_DISTRICTS.map((d) => (
            <SelectItem key={d.value} value={d.value} className="whitespace-normal py-2.5 text-sm leading-snug">
              {d.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function JobTypeField({ className }: { className?: string }) {
  const { selectedJobTypes, toggleJobType } = useSearchFiltersContext()

  return (
    <div className={cn("min-w-0", className)}>
      <h3 className="mb-3 text-base font-semibold text-foreground">Job type</h3>
      <div className="space-y-2.5">
        {SERVICE_TYPES.map(({ label, value }) => (
          <div key={value} className="flex gap-3">
            <Checkbox
              id={value}
              checked={selectedJobTypes.includes(value)}
              onCheckedChange={() => toggleJobType(value)}
              className="mt-0.5 shrink-0"
            />
            <Label
              htmlFor={value}
              className="min-w-0 flex-1 cursor-pointer text-sm leading-snug text-muted-foreground break-words"
            >
              {label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}

function FilterContent() {
  const { selectedJobTypes, clearFilters } = useSearchFiltersContext()

  return (
    <div className="space-y-8">
      <LocationField />
      <JobTypeField />

      {selectedJobTypes.length > 0 && (
        <Button variant="outline" size="sm" onClick={clearFilters} className="w-full shrink-0">
          <X className="mr-2 h-4 w-4 shrink-0" />
          Clear filters
        </Button>
      )}
    </div>
  )
}

/** Desktop sidebar — large screens only */
export function SearchFiltersSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 lg:block">
      <div className="sticky top-24 rounded-2xl border border-border bg-card p-5 sm:p-6">
        <h2 className="mb-5 text-lg font-semibold text-foreground">Filters</h2>
        <FilterContent />
      </div>
    </aside>
  )
}

/** Mobile sheet trigger — use in the results header row */
export function SearchFiltersMobile() {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" className="gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-[min(100vw,20rem)] max-w-[min(100vw,20rem)] flex-col gap-0 overflow-hidden p-0 sm:max-w-sm"
        >
          <SheetHeader className="shrink-0 border-b border-border px-4 pb-4 pt-6 pr-14 text-left">
            <SheetTitle className="text-lg font-semibold leading-tight">Filters</SheetTitle>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-5">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
