import Link from "next/link"
import { Users, Phone, TrendingUp, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  WORKER_MONTHLY_RS,
  WORKER_YEARLY_RS,
  WORKER_YEARLY_SAVINGS_PCT,
  WORKER_YEARLY_SAVINGS_RS,
} from "@/lib/worker-pricing"
import { goldButtonClassName } from "@/lib/brand-buttons"
import { sectionScrollMargin, siteContainer } from "@/lib/site-layout"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: Users,
    title: "Get Discovered",
    description: "Be found by people searching for your services across Mauritius",
  },
  {
    icon: Phone,
    title: "Direct Contact",
    description: "Receive direct calls and WhatsApp messages from interested public users",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Increase your local online visibility",
  },
  {
    icon: UserCheck,
    title: "Build Trust",
    description: "Create a complete public profile with service details, photos, and areas served",
  },
]

export function CTASection() {
  return (
    <section
      id="become-a-worker"
      className={`${sectionScrollMargin} py-16 md:py-24`}
    >
      <div className={`${siteContainer}`}>
        <div className="relative w-full overflow-hidden rounded-3xl bg-ocean ring-1 ring-white/10">
          <div className="pointer-events-none absolute -right-20 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-teal/15 blur-3xl" aria-hidden />
          <div className="relative grid items-start gap-10 p-8 md:grid-cols-2 md:items-center md:gap-12 md:p-12 lg:p-16">
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="mb-4 inline-flex w-fit items-center rounded-full border border-teal/40 bg-teal/15 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-white/90">
                Do you offer a service?
              </p>
              <h2 className="mb-4 max-w-xl text-balance text-3xl font-bold leading-[1.15] tracking-tight text-white md:text-4xl lg:text-[2.35rem]">
                <span className="block">
                  Join <span className="text-gold">ZotServis</span>
                </span>
                <span className="mt-2 block text-2xl font-semibold leading-snug text-white/90 md:text-3xl">
                  and make your services easier to find
                </span>
              </h2>
              <p className="mb-4 max-w-xl text-pretty text-base leading-relaxed text-white/75 md:text-lg">
                Create a public service provider profile so people across Mauritius can find and contact
                you directly.
              </p>
              <div className="mb-8 w-full max-w-xl rounded-2xl border border-white/15 bg-white/10 p-5 text-left">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-white/85">
                  Pricing
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-8">
                  <div>
                    <p className="text-3xl font-bold tabular-nums text-gold">
                      Rs {WORKER_MONTHLY_RS}
                      <span className="text-lg font-semibold text-gold/80">/month</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <p className="text-3xl font-bold tabular-nums text-gold">
                      Rs {WORKER_YEARLY_RS.toLocaleString("en-MU")}
                      <span className="text-lg font-semibold text-gold/80">/year</span>
                    </p>
                    <span className="inline-flex rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-sm font-bold text-gold">
                      Save {WORKER_YEARLY_SAVINGS_PCT}%
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/60">
                  Yearly billing saves Rs {WORKER_YEARLY_SAVINGS_RS} compared to 12 monthly payments (
                  {WORKER_YEARLY_SAVINGS_PCT}% off).
                </p>
              </div>
              <div className="w-full max-w-xl">
                <Button
                  asChild
                  className={cn(
                    goldButtonClassName,
                    "h-12 w-full shrink-0 rounded-full px-8 md:w-auto"
                  )}
                >
                  <Link href="/register">Register as a Service Provider</Link>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-colors hover:border-teal/35 hover:bg-white/14"
                  >
                    <div className="mb-3 inline-flex rounded-full border border-white/35 bg-white/10 p-2.5 text-white">
                      <benefit.icon className="h-5 w-5 shrink-0 text-white" aria-hidden />
                    </div>
                    <h3 className="mb-1 font-semibold text-gold">{benefit.title}</h3>
                    <p className="text-sm text-white/70">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
