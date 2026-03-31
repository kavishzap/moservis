import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  Zap,
  Droplets,
  Sparkles,
  Flower2,
  Paintbrush,
  Hammer,
  Building2,
  Wrench,
  Wind,
  Car,
} from "lucide-react"
import { BROWSE_CATEGORY_ORDER, SERVICE_TYPES } from "@/lib/search-options"
import type { ServiceTypeValue } from "@/lib/search-options"
import { AmberAmbientBlurs } from "@/components/home/amber-ambient"

const CATEGORY_ICONS: Partial<
  Record<ServiceTypeValue, { icon: LucideIcon; color: string }>
> = {
  electrician: { icon: Zap, color: "bg-zinc-950 text-amber-400 ring-1 ring-primary/30" },
  plumber: { icon: Droplets, color: "bg-zinc-950 text-amber-400 ring-1 ring-primary/30" },
  cleaner: { icon: Sparkles, color: "bg-zinc-950 text-amber-400 ring-1 ring-primary/30" },
  gardener: { icon: Flower2, color: "bg-zinc-950 text-amber-400 ring-1 ring-primary/30" },
  painter: { icon: Paintbrush, color: "bg-zinc-950 text-amber-400 ring-1 ring-primary/30" },
  carpenter: { icon: Hammer, color: "bg-zinc-950 text-amber-400 ring-1 ring-primary/30" },
  mason: { icon: Building2, color: "bg-zinc-950 text-amber-400 ring-1 ring-primary/30" },
  handyman: { icon: Wrench, color: "bg-zinc-950 text-amber-400 ring-1 ring-primary/30" },
  "ac-technician": { icon: Wind, color: "bg-zinc-950 text-amber-400 ring-1 ring-primary/30" },
  mechanic: { icon: Car, color: "bg-zinc-950 text-amber-400 ring-1 ring-primary/30" },
}

const labelByValue = Object.fromEntries(SERVICE_TYPES.map((s) => [s.value, s.label])) as Record<
  ServiceTypeValue,
  string
>

export function CategoriesSection() {
  return (
    <section
      id="categories"
      className="scroll-mt-20 relative overflow-hidden py-16 md:py-24"
    >
      <AmberAmbientBlurs />
      <div className="container relative z-0 mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Browse by Category
          </h2>
          <p className="text-muted-foreground">
            Find the right professional for any job around your home or business
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {BROWSE_CATEGORY_ORDER.map((value) => {
            const meta = CATEGORY_ICONS[value]!
            const label = labelByValue[value]
            return (
              <Link
                key={value}
                href={`/search?category=${value}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-primary/25 bg-card p-6 text-center transition-all hover:border-primary/50 hover:shadow-[0_0_24px_rgba(245,158,11,0.16)]"
              >
                <div
                  className={`rounded-xl p-3 ${meta.color} transition-transform group-hover:scale-110`}
                >
                  <meta.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium text-foreground">{label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
