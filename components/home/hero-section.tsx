"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Zap, Droplets, Sparkles, Paintbrush, Hammer } from "lucide-react"
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
    <section className="relative overflow-hidden pb-16 pt-12 md:-mt-16 md:pb-24 md:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-20">
        <Image
          src="/background_image_mobile.png"
          alt=""
          fill
          priority
          className="object-cover object-center md:hidden"
          sizes="100vw"
        />
        <Image
          src="/background_image.png"
          alt=""
          fill
          priority
          className="hidden object-cover object-center md:block"
          sizes="100vw"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-black/45" aria-hidden />

      <div className="container relative mx-auto px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="mx-auto max-w-3xl text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex flex-col items-center gap-0.5 rounded-full border border-white/15 bg-white/10 px-4 py-2 backdrop-blur-sm lg:mx-0">
              <span className="text-sm font-medium text-white">Trusted by 1,000+ Mauritians</span>
              <span className="text-xs font-medium text-white/80">We are still growing</span>
            </div>

            {/* Headline */}
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
              Find Trusted Workers Near You
            </h1>
            <p className="mb-8 text-pretty text-lg text-white/85 md:text-xl">
              Electricians, plumbers, cleaners, gardeners and more across Mauritius.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mb-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="neon-border flex flex-col gap-3 rounded-2xl border border-primary/35 bg-zinc-950/60 p-3 backdrop-blur-sm md:flex-row md:items-center md:gap-2 md:p-2">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-white" />
                <ServiceTypeSelect
                  variant="hero"
                  value={category}
                  onValueChange={setCategory}
                  placeholder="Services you need?"
                  allOption={{ value: "all", label: "Services you need?" }}
                />
              </div>
              <div className="relative min-w-0 flex-1">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-white" />
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
              <Link href={searchHref} className="w-full md:w-auto">
                <Button
                  size="lg"
                  className="h-12 w-full rounded-full px-8 font-semibold text-white shadow-[0_0_24px_rgba(57,255,20,0.25)] md:w-auto"
                >
                  Find Workers
                </Button>
              </Link>
            </div>
          </div>

            {/* Quick Category Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="mr-2 text-sm text-white/75">Popular:</span>
              {quickCategories.map((categoryItem) => (
                <Link key={categoryItem.label} href={categoryItem.href}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-primary/60 hover:bg-primary/15 hover:text-white hover:shadow-[0_0_20px_rgba(57,255,20,0.12)]"
                  >
                    <categoryItem.icon className="h-4 w-4" />
                    {categoryItem.label}
                  </Button>
                </Link>
              ))}
            </div>
        </div>
      </div>
    </section>
  )
}
