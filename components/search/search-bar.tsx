"use client"

import { Search, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSearchFilters } from "@/components/search/search-filters"
import { cn } from "@/lib/utils"

type SearchBarProps = {
  className?: string
}

export function SearchBar({ className }: SearchBarProps) {
  const { searchQuery, setSearchQuery } = useSearchFilters()

  return (
    <div className={cn("relative w-full", className)}>
      <Search
        className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden
      />
      <Input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by name, service, or location…"
        className="h-10 w-full min-w-0 rounded-full border-teal/30 bg-card pl-10 pr-10 text-sm shadow-sm ring-1 ring-black/[0.04] placeholder:text-xs sm:placeholder:text-sm"
        aria-label="Search workers"
      />
      {searchQuery.length > 0 && (
        <button
          type="button"
          onClick={() => setSearchQuery("")}
          className="absolute right-3 top-1/2 z-10 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
