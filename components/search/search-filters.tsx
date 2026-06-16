"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"
import { BadgeCheck, Filter, Star, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CategorySubcategoryFilters } from "@/components/search/category-filter-selects"
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
import { getServiceCategories, type ServiceCategory } from "@/services/categoryService"

export { ALL_DISTRICTS } from "@/lib/search-url"

type SearchFiltersContextValue = {
  selectedDistrict: string
  setSelectedDistrict: (value: string) => void
  selectedCategoryIds: string[]
  toggleCategoryId: (categoryId: string) => void
  selectedSubcategoryIds: string[]
  toggleSubcategoryId: (subcategoryId: string) => void
  categories: ServiceCategory[]
  categoriesLoading: boolean
  selectedJobTypes: string[]
  toggleJobType: (value: string) => void
  searchQuery: string
  setSearchQuery: (value: string) => void
  selectedMinRating: number | null
  setSelectedMinRating: (value: number | null) => void
  verifiedOnly: boolean
  setVerifiedOnly: (value: boolean) => void
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
  initialCategoryIds = [],
  initialSubcategoryIds = [],
  initialJobTypes = [],
  initialSearchQuery = "",
  initialMinRating = null,
  initialVerifiedOnly = false,
}: {
  children: ReactNode
  initialDistrict?: string
  initialCategoryIds?: string[]
  initialSubcategoryIds?: string[]
  initialJobTypes?: string[]
  initialSearchQuery?: string
  initialMinRating?: number | null
  initialVerifiedOnly?: boolean
}) {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [selectedDistrict, setSelectedDistrict] = useState<string>(initialDistrict)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(initialCategoryIds)
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] =
    useState<string[]>(initialSubcategoryIds)
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>(initialJobTypes)
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [selectedMinRating, setSelectedMinRating] = useState<number | null>(initialMinRating)
  const [verifiedOnly, setVerifiedOnly] = useState(initialVerifiedOnly)

  useEffect(() => {
    setSelectedDistrict(initialDistrict)
    setSelectedCategoryIds(initialCategoryIds)
    setSelectedSubcategoryIds(initialSubcategoryIds)
    setSelectedJobTypes(initialJobTypes)
    setSearchQuery(initialSearchQuery)
    setSelectedMinRating(initialMinRating)
    setVerifiedOnly(initialVerifiedOnly)
  }, [
    initialDistrict,
    initialCategoryIds,
    initialSubcategoryIds,
    initialJobTypes,
    initialSearchQuery,
    initialMinRating,
    initialVerifiedOnly,
  ])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setCategoriesLoading(true)
        const result = await getServiceCategories()
        if (!cancelled) setCategories(result)
      } catch (err) {
        console.error("Search filters categories:", err)
      } finally {
        if (!cancelled) setCategoriesLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const toggleCategoryId = useCallback((categoryId: string) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(categoryId)) {
        const category = categories.find((c) => c.id === categoryId)
        const subIds = new Set(category?.subcategories.map((s) => s.id) ?? [])
        setSelectedSubcategoryIds((subs) => subs.filter((id) => !subIds.has(id)))
        return prev.filter((id) => id !== categoryId)
      }
      return [...prev, categoryId]
    })
  }, [categories])

  const toggleSubcategoryId = useCallback((subcategoryId: string) => {
    setSelectedSubcategoryIds((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    )
  }, [])

  const toggleJobType = useCallback((value: string) => {
    setSelectedJobTypes((prev) =>
      prev.includes(value) ? prev.filter((t) => t !== value) : [...prev, value]
    )
  }, [])

  const clearFilters = useCallback(() => {
    setSelectedDistrict(ALL_DISTRICTS)
    setSelectedCategoryIds([])
    setSelectedSubcategoryIds([])
    setSelectedJobTypes([])
    setSearchQuery("")
    setSelectedMinRating(null)
    setVerifiedOnly(false)
  }, [])

  const value = useMemo(
    () => ({
      selectedDistrict,
      setSelectedDistrict,
      selectedCategoryIds,
      toggleCategoryId,
      selectedSubcategoryIds,
      toggleSubcategoryId,
      categories,
      categoriesLoading,
      selectedJobTypes,
      toggleJobType,
      searchQuery,
      setSearchQuery,
      selectedMinRating,
      setSelectedMinRating,
      verifiedOnly,
      setVerifiedOnly,
      clearFilters,
    }),
    [
      selectedDistrict,
      selectedCategoryIds,
      toggleCategoryId,
      selectedSubcategoryIds,
      toggleSubcategoryId,
      categories,
      categoriesLoading,
      selectedJobTypes,
      toggleJobType,
      searchQuery,
      selectedMinRating,
      verifiedOnly,
      clearFilters,
    ]
  )

  return (
    <SearchFiltersContext.Provider value={value}>{children}</SearchFiltersContext.Provider>
  )
}

function VerifiedFilterField({ className }: { className?: string }) {
  const { verifiedOnly, setVerifiedOnly } = useSearchFilters()

  const options: { value: boolean; label: string }[] = [
    { value: false, label: "All service providers" },
    { value: true, label: "Listed profiles" },
  ]

  return (
    <div className={cn("min-w-0", className)}>
      <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
        <BadgeCheck className="h-4 w-4 text-accent" aria-hidden />
        Profile status
      </h3>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter service providers by profile status"
      >
        {options.map(({ value, label }) => {
          const isActive = verifiedOnly === value
          return (
            <button
              key={label}
              type="button"
              aria-pressed={isActive}
              onClick={() => setVerifiedOnly(value)}
              className={cn(
                "inline-flex h-8 items-center rounded-full border px-3 text-xs font-medium transition-colors",
                isActive
                  ? "border-teal/50 bg-teal/10 text-teal"
                  : "border-teal/25 bg-muted/30 text-muted-foreground hover:border-teal/40 hover:text-foreground"
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function RatingFilterField({ className }: { className?: string }) {
  const { selectedMinRating, setSelectedMinRating } = useSearchFilters()

  const options: { rating: number | null; label: string }[] = [
    { rating: null, label: "All ratings" },
    ...([5, 4, 3, 2, 1] as const).map((rating) => ({
      rating,
      label: `${rating}★ & up`,
    })),
  ]

  return (
    <div className={cn("min-w-0", className)}>
      <h3 className="mb-3 flex items-center gap-2 text-base font-semibold text-foreground">
        <Star className="h-4 w-4 fill-gold text-gold" aria-hidden />
        Rating
      </h3>
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter service providers by minimum rating"
      >
        {options.map(({ rating, label }) => {
          const isActive = selectedMinRating === rating
          return (
            <button
              key={rating ?? "all"}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedMinRating(rating)}
              className={cn(
                "inline-flex h-8 items-center rounded-full border px-3 text-xs font-medium transition-colors",
                isActive
                  ? "border-teal/50 bg-teal/10 text-teal"
                  : "border-teal/25 bg-muted/30 text-muted-foreground hover:border-teal/40 hover:text-foreground"
              )}
            >
              {label}
            </button>
          )
        })}
      </div>
    </div>
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

function CategorySubcategoryField({ className }: { className?: string }) {
  const {
    categories,
    categoriesLoading,
    selectedCategoryIds,
    toggleCategoryId,
    selectedSubcategoryIds,
    toggleSubcategoryId,
  } = useSearchFilters()

  return (
    <div className={cn("w-full min-w-0", className)}>
      <CategorySubcategoryFilters
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        selectedSubcategoryIds={selectedSubcategoryIds}
        onToggleCategory={toggleCategoryId}
        onToggleSubcategory={toggleSubcategoryId}
        loading={categoriesLoading}
      />
    </div>
  )
}

function LegacyJobTypeField({ className }: { className?: string }) {
  const { selectedJobTypes, toggleJobType } = useSearchFilters()

  if (selectedJobTypes.length === 0) return null

  return (
    <div className={cn("min-w-0", className)}>
      <h3 className="mb-2 text-base font-semibold text-foreground" id="filter-job-type-heading">
        Job type (legacy)
      </h3>
      <ServiceTypePills
        selected={selectedJobTypes}
        onToggle={toggleJobType}
        labelId="filter-job-type-heading"
      />
    </div>
  )
}

function FilterContent() {
  const {
    selectedJobTypes,
    selectedDistrict,
    selectedCategoryIds,
    selectedSubcategoryIds,
    searchQuery,
    selectedMinRating,
    verifiedOnly,
    clearFilters,
  } = useSearchFilters()
  const hasFilters =
    selectedJobTypes.length > 0 ||
    selectedDistrict !== ALL_DISTRICTS ||
    selectedCategoryIds.length > 0 ||
    selectedSubcategoryIds.length > 0 ||
    searchQuery.trim().length > 0 ||
    selectedMinRating != null ||
    verifiedOnly

  return (
    <div className="min-w-0 space-y-8 overflow-hidden">
      <LocationField />
      <VerifiedFilterField />
      <RatingFilterField />
      <CategorySubcategoryField />
      <LegacyJobTypeField />

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
    <aside className="hidden w-full min-w-0 shrink-0 lg:block lg:w-72 xl:w-80">
      <div className="sticky top-24 overflow-hidden rounded-2xl border border-teal/25 bg-card p-5 shadow-[0_8px_30px_rgb(30_111_138_/_0.1)] sm:p-6">
        <h2 className="mb-5 text-lg font-semibold uppercase tracking-wide text-foreground">
          Filters
        </h2>
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
          <Button variant="outline" className="gap-2 rounded-full border-teal/35 font-semibold">
            <Filter className="h-4 w-4" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="flex w-[min(100vw,22rem)] max-w-[min(100vw,22rem)] flex-col gap-0 overflow-hidden bg-white p-0 sm:max-w-md"
        >
          <SheetHeader className="shrink-0 border-b border-border bg-white px-4 pb-4 pt-6 pr-14 text-left">
            <SheetTitle className="text-lg font-semibold leading-tight">Filters</SheetTitle>
          </SheetHeader>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain bg-white px-4 pb-8 pt-5">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
