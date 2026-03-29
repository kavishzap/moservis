"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Zap, Droplets, Sparkles, Paintbrush, Hammer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MAURITIUS_DISTRICTS } from "@/lib/search-options"
import { ServiceTypeSelect } from "@/components/service-type-select"

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
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background pb-16 pt-12 md:pb-24 md:pt-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-5 sm:px-6 md:px-8 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="mb-6 inline-flex flex-col items-center gap-0.5 rounded-full bg-accent/10 px-4 py-2 lg:mx-0">
              <span className="text-sm font-medium text-accent">Trusted by 1,000+ Mauritians</span>
              <span className="text-xs font-medium text-accent/80">We are still growing</span>
            </div>

            {/* Headline */}
            <h1 className="mb-4 text-balance text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
              Find Trusted Workers Near You
            </h1>
            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl">
              Electricians, plumbers, cleaners, gardeners and more across Mauritius.
            </p>

            {/* Search Bar */}
            <div className="mx-auto mb-10 max-w-2xl lg:mx-0 lg:max-w-none">
            <div className="flex flex-col gap-3 rounded-2xl bg-card p-3 shadow-lg md:flex-row md:items-center md:gap-2 md:p-2">
              <div className="relative min-w-0 flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <ServiceTypeSelect
                  variant="hero"
                  value={category}
                  onValueChange={setCategory}
                  placeholder="What service do you need?"
                  allOption={{ value: "all", label: "What service do you need?" }}
                />
              </div>
              <div className="relative min-w-0 flex-1">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 z-10 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                <Select value={district} onValueChange={setDistrict}>
                  <SelectTrigger className="h-12 w-full border-0 bg-secondary/50 pl-10 text-base focus-visible:ring-1 focus-visible:ring-primary [&_svg]:text-muted-foreground">
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
                <Button size="lg" className="h-12 w-full bg-primary px-8 text-primary-foreground hover:bg-primary/90 md:w-auto">
                  Find Workers
                </Button>
              </Link>
            </div>
          </div>

            {/* Quick Category Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              <span className="mr-2 text-sm text-muted-foreground">Popular:</span>
              {quickCategories.map((categoryItem) => (
                <Link key={categoryItem.label} href={categoryItem.href}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 rounded-full border-border bg-card text-foreground hover:border-primary hover:bg-primary/5"
                  >
                    <categoryItem.icon className="h-4 w-4" />
                    {categoryItem.label}
                  </Button>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md min-h-[220px] sm:min-h-[280px] lg:min-h-[340px] lg:max-w-none">
              <Image
                src="/Industrial-Worker-PNG-Image-Background.png"
                alt="Professional worker ready to help"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-bottom"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
