"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Search, Zap, Droplets, Sparkles, Paintbrush, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MAURITIUS_DISTRICTS } from "@/lib/search-options"
import {
  ServiceTypeSelect,
  heroSearchSelectTriggerClassName,
} from "@/components/service-type-select"

const quickCategories = [
  { icon: Zap, label: "Electrician", href: "/search?category=electrician" },
  { icon: Droplets, label: "Plumber", href: "/search?category=plumber" },
  { icon: Sparkles, label: "Cleaner", href: "/search?category=cleaner" },
  { icon: Paintbrush, label: "Painter", href: "/search?category=painter" },
  { icon: Hammer, label: "Carpenter", href: "/search?category=carpenter" },
]

export function HeroSection() {
  const [category, setCategory] = useState("all")
  const [district, setDistrict] = useState("all")

  const searchHref = useMemo(() => {
    const params = new URLSearchParams()
    if (category !== "all") params.set("category", category)
    if (district !== "all") params.set("location", district)
    const q = params.toString()
    return q ? `/search?${q}` : "/search"
  }, [category, district])

  return (
    <section className="relative isolate flex min-h-svh flex-col overflow-hidden pb-20 pt-[4.5rem] md:-mt-16 md:min-h-svh md:pb-28 md:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-20 min-h-full w-full">
        <div className="relative h-full min-h-full w-full">
          <Image
            src="/workersbackground.png"
            alt=""
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>
      {/* Even vignette so centered type stays legible on the photo */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/70 via-black/48 to-black/72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_85%_65%_at_50%_38%,transparent_0%,rgba(0,0,0,0.55)_72%,rgba(0,0,0,0.85)_100%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-black to-transparent md:h-40" aria-hidden />

      <div className="container relative z-0 mx-auto flex flex-1 flex-col justify-start pt-2 md:justify-center md:pt-0 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-center text-center max-md:px-1">
          <div
            className="hero-animate-in mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.09] py-1.5 pl-2 pr-5 shadow-lg shadow-black/20 backdrop-blur-md"
            style={{ animationDelay: "0ms" }}
          >
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            <span className="text-sm font-medium tracking-wide text-white/95">
              Launching 11th April 2026
            </span>
          </div>

          <h1
            className="hero-animate-in mb-5 w-full max-w-[22ch] text-balance text-center text-4xl font-bold leading-[1.08] tracking-tight text-white max-md:mx-auto sm:max-w-3xl sm:text-5xl lg:text-6xl lg:leading-[1.05]"
            style={{ animationDelay: "80ms" }}
          >
            <span className="block">Find trusted workers</span>
            <span className="mt-1 block text-gradient-neon">near you.</span>
          </h1>
          <p
            className="hero-animate-in mb-10 w-full max-w-xl text-pretty text-center text-base leading-relaxed text-white/80 max-md:mx-auto sm:text-lg"
            style={{ animationDelay: "160ms" }}
          >
            Electricians, plumbers, cleaners, gardeners and more across Mauritius.
          </p>

          <div
            className="hero-animate-in mb-10 w-full max-w-2xl max-md:mx-auto"
            style={{ animationDelay: "240ms" }}
          >
            <div className="hero-gradient-border rounded-[1.35rem] p-px transition-transform duration-500 ease-out md:rounded-full md:hover:scale-[1.008]">
              <div className="hero-search-shell flex flex-col gap-4 rounded-[1.3rem] bg-zinc-950/50 p-3.5 backdrop-blur-2xl md:flex-row md:items-center md:gap-4 md:rounded-full md:p-1.5 md:pl-3 md:pr-2">
                <div className="relative min-w-0 flex-1 md:min-w-[10rem] md:flex-[1.1]">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-primary/90" />
                  <ServiceTypeSelect
                    variant="hero"
                    value={category}
                    onValueChange={setCategory}
                    placeholder="Services you need?"
                    allOption={{ value: "all", label: "Services you need?" }}
                  />
                </div>
                <div
                  className="hidden h-8 w-px shrink-0 self-center bg-gradient-to-b from-transparent via-white/20 to-transparent md:mx-1 md:block"
                  aria-hidden
                />
                <div className="relative min-w-0 flex-1 md:min-w-[10rem] md:flex-[1.1]">
                  <MapPin className="pointer-events-none absolute left-3.5 top-1/2 z-10 h-[1.125rem] w-[1.125rem] -translate-y-1/2 text-primary/90" />
                  <Select value={district} onValueChange={setDistrict}>
                    <SelectTrigger className={heroSearchSelectTriggerClassName}>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Select district</SelectItem>
                      {MAURITIUS_DISTRICTS.map((d) => (
                        <SelectItem key={d.value} value={d.value}>
                          {d.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Link href={searchHref} className="w-full shrink-0 md:w-auto md:pl-1">
                  <Button
                    size="sm"
                    className="group/btn h-10 w-full gap-1.5 rounded-full px-6 text-sm font-semibold shadow-[0_0_28px_rgba(245,158,11,0.28)] transition-[box-shadow,transform] duration-300 hover:shadow-[0_0_36px_rgba(245,158,11,0.38)] active:scale-[0.98] md:w-auto"
                  >
                    Find workers
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
                  </Button>
                </Link>
              </div>
            </div>
            <p className="mt-5 text-center text-xs leading-relaxed text-white/45 md:mt-3">
              No account needed to browse — contact pros directly.
            </p>
          </div>

          <div
            className="hero-animate-in flex w-full max-w-2xl flex-col items-center gap-3 max-md:mx-auto"
            style={{ animationDelay: "320ms" }}
          >
            <span className="text-center text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-white/50">
              Popular right now
            </span>
            {/* Mobile: 3 + 2 grid, centered; md+: single wrapped row */}
            <div className="hidden w-full max-w-xs flex-col items-center gap-2 md:flex md:max-w-2xl md:flex-row md:flex-wrap md:justify-center">
              {quickCategories.map((categoryItem) => (
                <Link key={categoryItem.label} href={categoryItem.href} className="shrink-0">
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-9 gap-2 rounded-full border-white/15 bg-white/[0.06] px-3.5 text-xs font-medium text-white/95 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-primary/15 hover:text-white hover:shadow-[0_12px_40px_-12px_rgba(245,158,11,0.32)] sm:h-10 sm:px-4 sm:text-sm"
                  >
                    <categoryItem.icon className="h-3.5 w-3.5 text-primary/90 sm:h-4 sm:w-4" />
                    {categoryItem.label}
                  </Button>
                </Link>
              ))}
            </div>
            <div className="flex w-full max-w-xs flex-col items-center gap-2 md:hidden">
              <div className="grid w-full grid-cols-3 gap-2">
                {quickCategories.slice(0, 3).map((categoryItem) => (
                  <Link key={categoryItem.label} href={categoryItem.href} className="min-w-0">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 w-full gap-1 rounded-full border-white/15 bg-white/[0.06] px-2 text-[0.7rem] font-medium text-white/95 backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:bg-primary/15 hover:text-white hover:shadow-[0_12px_40px_-12px_rgba(245,158,11,0.32)]"
                    >
                      <categoryItem.icon className="h-3 w-3 shrink-0 text-primary/90" />
                      <span className="truncate">{categoryItem.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
              <div className="flex w-2/3 min-w-0 justify-center gap-2">
                {quickCategories.slice(3).map((categoryItem) => (
                  <Link key={categoryItem.label} href={categoryItem.href} className="min-w-0 flex-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9 w-full gap-1 rounded-full border-white/15 bg-white/[0.06] px-2 text-[0.7rem] font-medium text-white/95 backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:bg-primary/15 hover:text-white hover:shadow-[0_12px_40px_-12px_rgba(245,158,11,0.32)]"
                    >
                      <categoryItem.icon className="h-3 w-3 shrink-0 text-primary/90" />
                      <span className="truncate">{categoryItem.label}</span>
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
