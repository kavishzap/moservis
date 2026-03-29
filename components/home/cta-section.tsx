import Image from "next/image"
import Link from "next/link"
import { Users, Phone, TrendingUp, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  WORKER_MONTHLY_RS,
  WORKER_YEARLY_RS,
  WORKER_YEARLY_SAVINGS_PCT,
  WORKER_YEARLY_SAVINGS_RS,
} from "@/lib/worker-pricing"
import { CTA_WORKER_PNG } from "@/lib/promo-assets"

const benefits = [
  {
    icon: Users,
    title: "Get Discovered",
    description: "Be found by customers looking for your services",
  },
  {
    icon: Phone,
    title: "Direct Contact",
    description: "Receive calls and WhatsApp messages directly",
  },
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    description: "Expand your customer base locally",
  },
  {
    icon: UserCheck,
    title: "Build Trust",
    description: "Create a verified profile with reviews",
  },
]

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-primary/80">
          <div className="grid items-center gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-12 lg:p-16">
            {/* Left Content */}
            <div className="text-center md:text-left">
              <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
                Are you a worker? Join ZotServis and get more clients.
              </h2>
              <p className="mb-4 text-primary-foreground/80">
                Register your profile and start receiving job requests from customers across Mauritius.
              </p>
              <div className="mb-8 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-5 text-left">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary-foreground/90">
                  Pricing
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-8">
                  <div>
                    <p className="text-3xl font-bold tabular-nums text-primary-foreground">
                      Rs {WORKER_MONTHLY_RS}
                      <span className="text-lg font-semibold text-primary-foreground/80">/month</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <p className="text-3xl font-bold tabular-nums text-primary-foreground">
                      Rs {WORKER_YEARLY_RS.toLocaleString("en-MU")}
                      <span className="text-lg font-semibold text-primary-foreground/80">/year</span>
                    </p>
                    <span className="inline-flex rounded-full bg-accent px-3 py-1 text-sm font-bold text-accent-foreground">
                      Save {WORKER_YEARLY_SAVINGS_PCT}%
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-primary-foreground/75">
                  Yearly billing saves Rs {WORKER_YEARLY_SAVINGS_RS} compared to 12 monthly payments (
                  {WORKER_YEARLY_SAVINGS_PCT}% off).
                </p>
              </div>
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Register as a Worker
                </Button>
              </Link>
            </div>

            {/* Right - Worker visual + benefits */}
            <div className="flex flex-col gap-6">
              <div className="relative mx-auto w-full max-w-sm min-h-[200px] sm:min-h-[240px]">
                <Image
                  src={CTA_WORKER_PNG}
                  alt="Industrial worker representing skilled trades on ZotServis"
                  fill
                  className="object-contain object-bottom drop-shadow-md"
                  sizes="(max-width: 768px) 100vw, 384px"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-2xl bg-primary-foreground/10 p-5 backdrop-blur-sm"
                  >
                    <div className="mb-3 inline-flex rounded-lg bg-primary-foreground/20 p-2">
                      <benefit.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <h3 className="mb-1 font-semibold text-primary-foreground">{benefit.title}</h3>
                    <p className="text-sm text-primary-foreground/70">{benefit.description}</p>
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
