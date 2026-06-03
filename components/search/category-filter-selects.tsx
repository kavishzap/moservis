"use client"

import { useMemo } from "react"
import { Layers, ListFilter, Loader2 } from "lucide-react"
import { SelectionPills } from "@/components/search/selection-pills"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { heroSearchSelectTriggerClassName } from "@/components/service-type-select"
import { ALL_CATEGORIES, ALL_SUBCATEGORIES } from "@/lib/search-url"
import type { ServiceCategory } from "@/services/categoryService"
import { cn } from "@/lib/utils"

type CategorySubcategoryFiltersProps = {
  categories: ServiceCategory[]
  selectedCategoryIds: string[]
  selectedSubcategoryIds: string[]
  onToggleCategory: (categoryId: string) => void
  onToggleSubcategory: (subcategoryId: string) => void
  /** Hero search: single category select */
  onCategorySelect?: (categoryId: string | null) => void
  /** Hero search: single subcategory select */
  onSubcategorySelect?: (subcategoryId: string | null) => void
  variant?: "default" | "hero"
  loading?: boolean
  className?: string
}

export function CategorySubcategoryFilters({
  categories,
  selectedCategoryIds,
  selectedSubcategoryIds,
  onToggleCategory,
  onToggleSubcategory,
  onCategorySelect,
  onSubcategorySelect,
  variant = "default",
  loading = false,
  className,
}: CategorySubcategoryFiltersProps) {
  const isHero = variant === "hero"

  const categoryItems = useMemo(
    () => categories.map((c) => ({ id: c.id, name: c.name })),
    [categories]
  )

  const subcategoryItems = useMemo(() => {
    return categories
      .filter((c) => selectedCategoryIds.includes(c.id))
      .flatMap((c) =>
        c.subcategories.map((s) => ({
          id: s.id,
          name: s.name,
          categoryName: c.name,
        }))
      )
  }, [categories, selectedCategoryIds])

  const subcategoriesByCategory = useMemo(() => {
    return categories.filter(
      (c) => selectedCategoryIds.includes(c.id) && c.subcategories.length > 0
    )
  }, [categories, selectedCategoryIds])

  const selectedCategoryId = selectedCategoryIds[0] ?? ""
  const selectedSubcategoryId = selectedSubcategoryIds[0] ?? ""

  const heroSubcategoryOptions = useMemo(() => {
    if (!selectedCategoryId) return []
    const category = categories.find((c) => c.id === selectedCategoryId)
    return category?.subcategories ?? []
  }, [categories, selectedCategoryId])

  if (loading && categories.length === 0 && !isHero) {
    return (
      <p className={cn("flex items-center gap-2 text-sm text-muted-foreground")}>
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Loading categories…
      </p>
    )
  }

  if (isHero) {
    if (loading && categories.length === 0) {
      return (
        <div
          className={cn(
            "flex min-w-0 flex-1 flex-col gap-2.5 sm:flex-row sm:items-center",
            className
          )}
        >
          <div className="relative min-w-0 flex-1">
            <Select disabled>
              <SelectTrigger className={heroSearchSelectTriggerClassName}>
                <SelectValue placeholder="Loading categories…" />
              </SelectTrigger>
            </Select>
          </div>
        </div>
      )
    }

    return (
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3",
          className
        )}
      >
        <div className="relative min-w-0 flex-1">
          <ListFilter
            className="pointer-events-none absolute top-1/2 left-3.5 z-10 h-4 w-4 -translate-y-1/2 text-white/80"
            aria-hidden
          />
          <Select
            value={selectedCategoryId || ALL_CATEGORIES}
            onValueChange={(value) => {
              if (onCategorySelect) {
                onCategorySelect(value === ALL_CATEGORIES ? null : value)
                return
              }
              if (value === ALL_CATEGORIES) {
                selectedCategoryIds.forEach((id) => onToggleCategory(id))
                return
              }
              selectedCategoryIds
                .filter((id) => id !== value)
                .forEach((id) => onToggleCategory(id))
              if (!selectedCategoryIds.includes(value)) onToggleCategory(value)
            }}
          >
            <SelectTrigger className={heroSearchSelectTriggerClassName} aria-label="Category">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_CATEGORIES}>All categories</SelectItem>
              {categoryItems.map(({ id, name }) => (
                <SelectItem key={id} value={id} className="whitespace-normal py-2.5">
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative min-w-0 flex-1">
          <Layers
            className="pointer-events-none absolute top-1/2 left-3.5 z-10 h-4 w-4 -translate-y-1/2 text-white/80"
            aria-hidden
          />
          <Select
            value={selectedSubcategoryId || ALL_SUBCATEGORIES}
            onValueChange={(value) => {
              if (onSubcategorySelect) {
                onSubcategorySelect(value === ALL_SUBCATEGORIES ? null : value)
                return
              }
              if (value === ALL_SUBCATEGORIES) {
                selectedSubcategoryIds.forEach((id) => onToggleSubcategory(id))
                return
              }
              selectedSubcategoryIds
                .filter((id) => id !== value)
                .forEach((id) => onToggleSubcategory(id))
              if (!selectedSubcategoryIds.includes(value)) onToggleSubcategory(value)
            }}
            disabled={!selectedCategoryId || heroSubcategoryOptions.length === 0}
          >
            <SelectTrigger className={heroSearchSelectTriggerClassName} aria-label="Subcategory">
              <SelectValue placeholder="All subcategories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_SUBCATEGORIES}>All subcategories</SelectItem>
              {heroSubcategoryOptions.map((sub) => (
                <SelectItem key={sub.id} value={sub.id} className="whitespace-normal py-2.5">
                  {sub.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full min-w-0 max-w-full space-y-5 overflow-hidden", className)}>
      <div className="w-full min-w-0 space-y-2">
        <p
          className="text-sm font-medium text-foreground"
          id="filter-categories-label"
        >
          Categories
        </p>
        <SelectionPills
          items={categoryItems}
          selectedIds={selectedCategoryIds}
          onToggle={onToggleCategory}
          labelId="filter-categories-label"
        />
      </div>

      {selectedCategoryIds.length > 0 && (
        <div className="w-full min-w-0 space-y-3">
          <p
            className="text-sm font-medium text-foreground"
            id="filter-subcategories-label"
          >
            Subcategories
          </p>
          {subcategoriesByCategory.length > 0 ? (
            <div className="w-full min-w-0 space-y-4">
              {subcategoriesByCategory.map((category) => (
                <div key={category.id} className="w-full min-w-0 space-y-2">
                  <p className="text-xs font-medium uppercase tracking-wide break-words text-muted-foreground">
                    {category.name}
                  </p>
                  <SelectionPills
                    items={category.subcategories.map((s) => ({
                      id: s.id,
                      name: s.name,
                    }))}
                    selectedIds={selectedSubcategoryIds}
                    onToggle={onToggleSubcategory}
                    labelId="filter-subcategories-label"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">
              No subcategories for your selected categories.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/** @deprecated Use CategorySubcategoryFilters */
export const CategoryFilterSelects = CategorySubcategoryFilters
