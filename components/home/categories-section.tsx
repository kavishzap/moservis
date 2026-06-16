import Link from "next/link"
import { buildSearchHref } from "@/lib/search-url"
import { sectionScrollMargin, siteContainer } from "@/lib/site-layout"
import { IconFrame } from "@/components/icons/illustrative/icon-frame"
import {
  CategoryIllustrationBySeed,
  MoreCategoriesIllustration,
} from "@/components/icons/illustrative/category-icons"
import type { ServiceCategory } from "@/services/categoryService"

type CategoriesSectionProps = {
  categories: ServiceCategory[]
}

const categoryCardClassName =
  "group flex h-full min-h-[4.5rem] items-center gap-3 rounded-2xl border border-teal/15 bg-card px-4 py-3.5 shadow-[0_2px_10px_rgb(11_60_93_/_0.04)] transition-all hover:-translate-y-0.5 hover:border-teal/35 hover:shadow-[0_8px_24px_rgb(30_111_138_/_0.1)]"

export function CategoriesSection({ categories }: CategoriesSectionProps) {
  return (
    <div
      id="categories"
      className={`${sectionScrollMargin} border-t border-border/60 bg-muted/20 pb-14 pt-10 md:pb-16 md:pt-12`}
    >
      <div className={siteContainer}>
        <div className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <h3 className="mb-2 text-xl font-bold text-ocean sm:text-2xl">
            Browse by Category
          </h3>
          <p className="text-sm text-muted-foreground sm:text-base">
            Select a category to explore local service providers for home and business services across Mauritius.
          </p>
        </div>

        {categories.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground">
            Categories are unavailable right now.{" "}
            <Link href={buildSearchHref()} className="font-medium text-teal hover:underline">
              Browse all service providers
            </Link>
          </p>
        ) : (
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((category) => (
              <li key={category.id} className="min-h-0">
                <Link
                  href={buildSearchHref({ categoryIds: [category.id] })}
                  className={categoryCardClassName}
                >
                  <IconFrame
                    size="sm"
                    className="rounded-xl bg-sand/80 p-1 transition-colors group-hover:bg-sand"
                  >
                    <CategoryIllustrationBySeed seed={category.id} />
                  </IconFrame>
                  <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-ocean">
                    {category.name}
                  </span>
                </Link>
              </li>
            ))}
            <li className="min-h-0">
              <Link href={buildSearchHref()} className={categoryCardClassName}>
                <IconFrame
                  size="sm"
                  className="rounded-xl bg-sand/80 p-1 transition-colors group-hover:bg-sand"
                >
                  <MoreCategoriesIllustration />
                </IconFrame>
                <span className="min-w-0 flex-1 text-sm font-semibold leading-snug text-ocean">
                  View all Service Providers
                </span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  )
}
