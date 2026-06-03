"use client"

import type { MouseEvent } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export const PAGE_SIZE_OPTIONS = [10, 20, 50] as const
export const DEFAULT_PAGE_SIZE = PAGE_SIZE_OPTIONS[0]

function buildPageItems(current: number, total: number): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const items: (number | "ellipsis")[] = [1]

  if (current > 3) items.push("ellipsis")

  const start = Math.max(2, current - 1)
  const end = Math.min(total - 1, current + 1)

  for (let p = start; p <= end; p++) {
    items.push(p)
  }

  if (current < total - 2) items.push("ellipsis")

  items.push(total)
  return items
}

type PaginationState = {
  page: number
  totalPages: number
  rangeStart: number
  rangeEnd: number
  totalItems: number
  onPageChange: (page: number) => void
}

export function SearchResultsSummary({
  rangeStart,
  rangeEnd,
  totalItems,
  workersTotal,
  filteredFromTotal,
  className,
}: {
  rangeStart: number
  rangeEnd: number
  totalItems: number
  workersTotal?: number
  filteredFromTotal?: boolean
  className?: string
}) {
  return (
    <p className={cn("shrink-0 whitespace-nowrap text-muted-foreground", className)}>
      {totalItems > 0 ? (
        <>
          <span className="hidden min-[480px]:inline">Showing </span>
          <span className="font-medium text-foreground">
            {rangeStart}–{rangeEnd}
          </span>
          <span className="hidden min-[480px]:inline"> of </span>
          <span className="min-[480px]:hidden text-muted-foreground">/</span>{" "}
          <span className="font-medium text-foreground">{totalItems}</span>
          <span className="hidden sm:inline">{totalItems === 1 ? " worker" : " workers"}</span>
        </>
      ) : (
        <>
          <span className="font-medium text-foreground">0</span>
          <span className="hidden sm:inline"> workers</span>
        </>
      )}
      {filteredFromTotal && workersTotal != null && totalItems > 0 && (
        <span className="text-muted-foreground">
          {" "}
          (of {workersTotal} active)
        </span>
      )}
    </p>
  )
}

export function SearchPaginationNav({
  page,
  totalPages,
  onPageChange,
  showPageNumbers = true,
  className,
}: Pick<PaginationState, "page" | "totalPages" | "onPageChange"> & {
  showPageNumbers?: boolean
  className?: string
}) {
  if (totalPages <= 1) return null

  const items = buildPageItems(page, totalPages)

  const handleClick = (next: number) => (event: MouseEvent) => {
    event.preventDefault()
    if (next >= 1 && next <= totalPages && next !== page) {
      onPageChange(next)
    }
  }

  return (
    <Pagination className={cn("mx-0 w-auto justify-end", className)}>
      <PaginationContent className="flex-wrap gap-1">
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={handleClick(page - 1)}
            aria-disabled={page <= 1}
            className={cn(
              "rounded-full border border-teal/35 bg-background px-3 shadow-xs",
              page <= 1 && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>

        {showPageNumbers &&
          items.map((item, index) =>
            item === "ellipsis" ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href="#"
                  isActive={item === page}
                  onClick={handleClick(item)}
                  className={cn(
                    "min-w-9 rounded-full border border-transparent",
                    item === page && "border-teal/40 bg-secondary font-semibold",
                  )}
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={handleClick(page + 1)}
            aria-disabled={page >= totalPages}
            className={cn(
              "rounded-full border border-teal/35 bg-background px-3 shadow-xs",
              page >= totalPages && "pointer-events-none opacity-50",
            )}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

type SearchPaginationProps = PaginationState & {
  pageSize: number
  onPageSizeChange: (size: number) => void
  className?: string
}

export function SearchPagination({
  page,
  totalPages,
  pageSize,
  totalItems,
  rangeStart,
  rangeEnd,
  onPageChange,
  onPageSizeChange,
  className,
}: SearchPaginationProps) {
  return (
    <div
      className={cn(
        "mt-8 flex flex-col gap-4 border-t border-teal/20 pt-6",
        className,
      )}
      aria-label="Search results pagination"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="search-page-size" className="text-sm text-muted-foreground">
            Rows per page
          </label>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger
              id="search-page-size"
              className="h-9 w-[5.5rem] rounded-full border-teal/30 bg-background text-sm"
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-medium text-foreground">
            {rangeStart}–{rangeEnd}
          </span>{" "}
          of <span className="font-medium text-foreground">{totalItems}</span>
          {totalItems === 1 ? " worker" : " workers"}
          {totalPages > 1 && (
            <>
              {" "}
              · Page{" "}
              <span className="font-medium text-foreground">{page}</span> of{" "}
              <span className="font-medium text-foreground">{totalPages}</span>
            </>
          )}
        </p>
      </div>

      <SearchPaginationNav
        page={page}
        totalPages={totalPages}
        onPageChange={onPageChange}
        className="justify-center sm:justify-end"
      />
    </div>
  )
}
