"use client"

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"
import { Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServiceTypePills } from "@/components/service-type-pills"
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
import { MAURITIUS_DISTRICTS } from "@/lib/search-options"
import { ALL_DISTRICTS } from "@/lib/search-url"
import { cn } from "@/lib/utils"

export { ALL_DISTRICTS } from "@/lib/search-url"

type SearchFiltersContextValue = {
  selectedDistrict: string
  setSelectedDistrict: (value: string) => void
  selectedJobTypes: string[]
  toggleJobType: (value: string) => void
  clearFilters: () => void
}

const SearchFiltersContext = createContext<SearchFiltersContextValue | null>(null)

export function useSearchFilters() {
  const ctx = useContext(SearchFiltersContext)
  if (!ctx) {
    throw new Error("Search filters must be used within SearchFiltersProvider")
  }
  return ctx
}

export function SearchFiltersProvider({
  children,
  initialDistrict = ALL_DISTRICTS,
  initialJobTypes = [],
}: {
  children: ReactNode
  initialDistrict?: string
  initialJobTypes?: string[]
}) {
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict)
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(initialJobTypes)

  const toggleJobType = useCallback((value: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    )
  }, [])

  const clearFilters = useCallback(() => {
    setSelectedDistrict(ALL_DISTRICTS)
    setSelectedJobTypes([])
  }, [])

  const value = useMemo(
    () => ({
      selectedDistrict,
      setSelectedDistrict,
      selectedJobTypes,
      toggleJobType,
      clearFilters,
    }),
    [selectedDistrict, selectedJobTypes, toggleJobType, clearFilters]
  )

  return (
    <SearchFiltersContext.Provider value={value}>{children}</SearchFiltersContext.Provider>
  )
}

function LocationField({ className }: { className?: string }) {
  const { selectedDistrict, setSelectedDistrict } = useSearchFilters()

  return (
    <div className={cn("min-w-0", className)}>
      <h3 className="mb-3 text-base font-semibold text-foreground">Location</h3>
      <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
        <SelectTrigger className="h-auto min-h-11 w-full min-w-0 whitespace-normal py-2.5 text-left text-sm [&>span]:line-clamp-3 [&>span]:text-left">
          <SelectValue placeholder="District" />
        </SelectTrigger>
        <SelectContent className="max-h-[min(60vh,24rem)] w-[var(--radix-select-trigger-width)] max-w-[calc(100vw-2rem)]">
          <SelectItem value={ALL_DISTRICTS} className="text-sm">
            All districts
          </SelectItem>
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
  const { selectedJobTypes, toggleJobType } = useSearchFilters()

  return (
    <div className={cn("min-w-0", className)}>
      <h3 className="mb-2 text-base font-semibold text-foreground" id="filter-job-type-heading">
        Job type
      </h3>
      <p className="mb-3 text-sm text-muted-foreground">Select one or more.</p>
      <ServiceTypePills
        selected={selectedJobTypes}
        onToggle={toggleJobType}
        labelId="filter-job-type-heading"
      />
    </div>
  )
}

function FilterContent() {
  const { selectedJobTypes, selectedDistrict, clearFilters } = useSearchFilters()
  const hasFilters = selectedJobTypes.length > 0 || selectedDistrict !== ALL_DISTRICTS

  return (
    <div className="space-y-8">
      <LocationField />
      <JobTypeField />

      {hasFilters && (
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
      <div className="sticky top-24 rounded-2xl border border-primary/25 bg-card p-5 shadow-[0_0_24px_rgba(245,158,11,0.12)] sm:p-6">
        <h2 className="mb-5 text-lg font-semibold uppercase tracking-wide text-foreground">Filters</h2>
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
          <Button variant="outline" className="gap-2 rounded-full border-primary/35 font-semibold">
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
