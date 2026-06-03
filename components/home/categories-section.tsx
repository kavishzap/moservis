import Link from "next/link"
import { buildSearchHref } from "@/lib/search-url"
import { sectionScrollMargin, siteContainer } from "@/lib/site-layout"
import { IconFrame } from "@/components/icons/illustrative/icon-frame"
import {
  CategoryIllustrationBySeed,
  MoreCategoriesIllustration,
} from "@/components/icons/illustrative/category-icons"
import type { ServiceCategory } from "@/services/categoryService"

/** Mockup-style rows: 4 + 4 + remainder centered */
function chunkCategories<T>(items: readonly T[]): T[][] {
  if (items.length <= 4) return [items.slice()]
  if (items.length <= 8) return [items.slice(0, 4), items.slice(4)]
  return [items.slice(0, 4), items.slice(4, 8), items.slice(8)]
}

type CategoriesSectionProps = {
  categories: ServiceCategory[]
}

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  const rows = chunkCategories(categories)

  return (
    <div
      id="categories"
      className={`${sectionScrollMargin} border-t border-border/60 bg-background pb-12 pt-6 md:pb-14 md:pt-8`}
    >
      <div className={siteContainer}>
        <div className="mb-5 text-center md:mb-6">
          <h3 className="mb-2 text-lg font-semibold text-ocean sm:text-xl">
            Browse by Category
          </h3>
          <p className="mx-auto max-w-2xl text-xs text-slate sm:text-sm">
            Select a category to explore trusted local workers for your home and business.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            Categories are unavailable right now.{" "}
            <Link href={buildSearchHref()} className="font-medium text-teal hover:underline">
              Browse all workers
            </Link>
          </p>
        ) : (
          <div className="flex flex-col items-center gap-3 sm:gap-4">
            {rows.map((row, rowIndex) => (
              <ul
                key={rowIndex}
                className="flex w-full flex-wrap items-center justify-center gap-2.5 sm:gap-3"
              >
                {row.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={buildSearchHref({ categoryIds: [category.id] })}
                      className="group flex min-w-[9.5rem] items-center gap-3 rounded-full bg-white px-4 py-3 shadow-sm ring-1 ring-black/[0.06] transition-all hover:-translate-y-0.5 hover:shadow-md sm:min-w-[10.5rem] sm:px-5 sm:py-3.5"
                    >
                      <IconFrame size="sm" className="rounded-xl bg-sand/80 p-1">
                        <CategoryIllustrationBySeed seed={category.id} />
                      </IconFrame>
                      <span className="text-left text-sm font-semibold leading-tight text-ocean">
                        {category.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            ))}

            <Link
              href={buildSearchHref()}
              className="group mt-1 flex min-w-[9.5rem] items-center gap-3 rounded-full bg-white px-4 py-3 shadow-sm ring-1 ring-black/[0.06] transition-all hover:-translate-y-0.5 hover:shadow-md sm:min-w-[10.5rem] sm:px-5 sm:py-3.5"
            >
              <IconFrame size="sm">
                <MoreCategoriesIllustration />
              </IconFrame>
              <span className="text-sm font-semibold text-ocean">View all workers</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
