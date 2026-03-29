import Image from "next/image"
import { Shield, MapPin, Phone, Search } from "lucide-react"
import { TRUST_SECTION_PNG } from "@/lib/promo-assets"
import { cn } from "@/lib/utils"

const trustItems = [
  {
    icon: Shield,
    title: "Verified Workers",
    description: "All workers are verified for quality and reliability",
  },
  {
    icon: MapPin,
    title: "Local Mauritian Platform",
    description: "Built for Mauritians, by Mauritians",
  },
  {
    icon: Phone,
    title: "Direct Contact",
    description: "No middleman — connect directly with workers",
  },
  {
    icon: Search,
    title: "Fast & Easy Search",
    description: "Find the right worker in seconds",
  },
]

export function TrustSection() {
  return (
    <section
      className="relative overflow-hidden bg-secondary/30 py-16 md:py-24"
      aria-labelledby="trust-section-heading"
    >
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/[0.07] blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-1/4 translate-y-1/4 rounded-full bg-accent/[0.08] blur-3xl" />
      </div>

      <div className="container mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading block */}
        <div className="mx-auto mb-12 max-w-2xl text-center md:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.12em] text-primary">
            Why choose us
          </p>
          <h2
            id="trust-section-heading"
            className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl"
          >
            Why Choose ZotServis?
          </h2>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">
            The trusted platform for finding local workers in Mauritius
          </p>
        </div>

        {/* Visual + benefits: image first on mobile, side‑by‑side on large screens */}
        <div className="grid items-stretch gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          {/* Image panel */}
          <div className="flex lg:col-span-5">
            <div className="flex w-full flex-col justify-center">
              <div
                className={cn(
                  "relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-card to-secondary/40",
                  "p-6 shadow-sm ring-1 ring-border/50 md:p-8",
                )}
              >
                <div className="relative mx-auto aspect-[4/3] w-full max-w-lg">
                  <Image
                    src={TRUST_SECTION_PNG}
                    alt="Local workers and trades represented on ZotServis"
                    fill
                    className="object-contain object-center"
                    sizes="(max-width: 1024px) 100vw, 42vw"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature grid */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
              {trustItems.map((item) => (
                <li key={item.title}>
                  <div
                    className={cn(
                      "flex h-full flex-col rounded-2xl border border-border/80 bg-card p-5 shadow-sm",
                      "transition-colors hover:border-primary/25 hover:bg-card/90",
                    )}
                  >
                    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5 shrink-0" aria-hidden />
                    </div>
                    <h3 className="mb-1.5 text-base font-semibold leading-snug text-foreground">
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
