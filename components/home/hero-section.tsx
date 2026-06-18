"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { goldButtonClassName } from "@/lib/brand-buttons"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CategorySubcategoryFilters } from "@/components/search/category-filter-selects"
import { heroSearchSelectTriggerClassName } from "@/components/service-type-select"
import { MAURITIUS_DISTRICTS } from "@/lib/search-options"
import { ALL_DISTRICTS, buildSearchHref } from "@/lib/search-url"
import { heroContainer } from "@/lib/site-layout"
import { HeroBackgroundImage } from "@/components/home/hero-background-image"
import { getServiceCategories, type ServiceCategory } from "@/services/categoryService"

function HeroCopyCard({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h1 className="text-balance text-xl font-bold leading-[1.12] tracking-tight text-ocean sm:text-2xl lg:text-[2.125rem] xl:text-[2.375rem]">
        ZotServis Community: Where Locals Help Locals
      </h1>
      <p className="mt-3 text-pretty text-base leading-relaxed text-slate/90 sm:mt-3.5 lg:text-[1.0625rem]">
        Find and contact local service providers for home and business services across Mauritius.
        Browse electricians, plumbers, gardeners, cleaners, and more in one local directory.
      </p>
    </div>
  )
}

function HeroSearchBar({
  categories,
  categoriesLoading,
  selectedCategoryIds,
  selectedSubcategoryIds,
  onCategorySelect,
  onSubcategorySelect,
  onToggleCategory,
  onToggleSubcategory,
  district,
  setDistrict,
  searchHref,
}: {
  categories: ServiceCategory[]
  categoriesLoading: boolean
  selectedCategoryIds: string[]
  selectedSubcategoryIds: string[]
  onCategorySelect: (categoryId: string | null) => void
  onSubcategorySelect: (subcategoryId: string | null) => void
  onToggleCategory: (id: string) => void
  onToggleSubcategory: (id: string) => void
  district: string
  setDistrict: (v: string) => void
  searchHref: string
}) {
  return (
    <div className="hero-search-shell mx-auto flex w-full min-w-0 max-w-[42rem] flex-col gap-3 overflow-hidden rounded-2xl border-[3px] border-white bg-ocean p-4 sm:max-w-[44rem] md:max-w-[min(100%,64rem)] md:flex-row md:items-center md:gap-3 md:p-4 lg:p-5">
      <CategorySubcategoryFilters
        variant="hero"
        categories={categories}
        selectedCategoryIds={selectedCategoryIds}
        selectedSubcategoryIds={selectedSubcategoryIds}
        onToggleCategory={onToggleCategory}
        onToggleSubcategory={onToggleSubcategory}
        onCategorySelect={onCategorySelect}
        onSubcategorySelect={onSubcategorySelect}
        loading={categoriesLoading}
        className="min-w-0 md:min-w-0 md:flex-[2]"
      />

      <div className="relative min-w-0 w-full md:max-w-[13rem] md:flex-1 lg:max-w-[15rem]">
        <MapPin
          className="pointer-events-none absolute top-1/2 left-3.5 z-10 h-4 w-4 -translate-y-1/2 text-white/80"
          aria-hidden
        />
        <Select value={district} onValueChange={setDistrict}>
          <SelectTrigger
            className={cn(heroSearchSelectTriggerClassName, "pl-10")}
          >
            <SelectValue placeholder="Select district" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL_DISTRICTS}>Select district</SelectItem>
            {MAURITIUS_DISTRICTS.map((d) => (
              <SelectItem key={d.value} value={d.value}>
                {d.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div
        className="hidden h-12 w-px shrink-0 bg-white/35 md:mx-2 md:block md:h-[3.25rem] lg:mx-3"
        aria-hidden
      />

      <Button
        asChild
        className={cn(
          goldButtonClassName,
          "h-12 w-full max-w-full shrink-0 rounded-full px-4 text-sm md:h-[3.25rem] md:w-auto md:min-w-[10.5rem] md:max-w-none md:px-6 md:text-base lg:min-w-[11.5rem]"
        )}
      >
        <Link href={searchHref} className="block w-full truncate text-center md:inline-flex md:w-auto">
          Find Service Providers
        </Link>
      </Button>
    </div>
  )
}

export function HeroSection() {
  const [categories, setCategories] = useState<ServiceCategory[]>([])
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([])
  const [selectedSubcategoryIds, setSelectedSubcategoryIds] = useState<string[]>([])
  const [district, setDistrict] = useState(ALL_DISTRICTS)

  const setCategory = (categoryId: string | null) => {
    setSelectedCategoryIds(categoryId ? [categoryId] : [])
    setSelectedSubcategoryIds([])
  }

  const setSubcategory = (subcategoryId: string | null) => {
    setSelectedSubcategoryIds(subcategoryId ? [subcategoryId] : [])
  }

  const toggleCategory = (categoryId: string) => {
    setSelectedCategoryIds((prev) => {
      if (prev.includes(categoryId)) {
        const category = categories.find((c) => c.id === categoryId)
        const subIds = new Set(category?.subcategories.map((s) => s.id) ?? [])
        setSelectedSubcategoryIds((subs) => subs.filter((id) => !subIds.has(id)))
        return prev.filter((id) => id !== categoryId)
      }
      return [...prev, categoryId]
    })
  }

  const toggleSubcategory = (subcategoryId: string) => {
    setSelectedSubcategoryIds((prev) =>
      prev.includes(subcategoryId)
        ? prev.filter((id) => id !== subcategoryId)
        : [...prev, subcategoryId]
    )
  }

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        setCategoriesLoading(true)
        const result = await getServiceCategories()
        if (!cancelled) setCategories(result)
      } catch (err) {
        console.error("Hero categories:", err)
      } finally {
        if (!cancelled) setCategoriesLoading(false)
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const searchHref = useMemo(
    () =>
      buildSearchHref({
        categoryIds: selectedCategoryIds,
        subcategoryIds: selectedSubcategoryIds,
        district,
      }),
    [selectedCategoryIds, selectedSubcategoryIds, district]
  )

  const searchProps = {
    categories,
    categoriesLoading,
    selectedCategoryIds,
    selectedSubcategoryIds,
    onCategorySelect: setCategory,
    onSubcategorySelect: setSubcategory,
    onToggleCategory: toggleCategory,
    onToggleSubcategory: toggleSubcategory,
    district,
    setDistrict,
    searchHref,
  }

  return (
    <section className="relative">
      <div className={`${heroContainer} relative pb-8 pt-1 sm:pb-10 sm:pt-1.5 md:pb-10`}>
        <div className="overflow-hidden rounded-[2.75rem] bg-card ring-1 ring-black/[0.06] sm:rounded-[3.5rem] lg:rounded-[4.5rem] xl:rounded-[5.5rem]">
          <div className="relative min-h-[min(68dvh,36rem)] w-full bg-ocean/10 sm:min-h-[min(72dvh,40rem)] md:min-h-[calc(100dvh-7.25rem)] md:max-h-[min(920px,calc(100dvh-5.5rem))]">
            <HeroBackgroundImage alt="Families and local service providers together in Mauritius" />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-bl from-ocean/55 via-ocean/22 via-45% to-transparent"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-ocean/30 to-transparent md:hidden"
              aria-hidden
            />

            <div className="absolute inset-y-0 right-0 z-10 hidden w-[min(50%,24rem)] items-start justify-center p-5 pt-8 md:flex md:pt-10 lg:w-[min(48%,30rem)] lg:p-8 lg:pt-14 xl:w-[32rem] xl:pt-16">
              <div className="w-full rounded-2xl border border-[#e5dcc8] bg-sand p-7 lg:rounded-3xl lg:p-9 xl:p-10">
                <HeroCopyCard />
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center px-4 pt-16 sm:bottom-8 sm:px-5 md:bottom-10 md:px-8 lg:bottom-12 lg:px-10 xl:bottom-14">
              <HeroSearchBar {...searchProps} />
            </div>
          </div>

          <div className="border-t border-[#e5dcc8] bg-sand px-6 py-6 md:hidden">
            <HeroCopyCard />
          </div>
        </div>
      </div>
    </section>
  )
}
