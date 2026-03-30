import Link from "next/link"
import { Users, Phone, TrendingUp, UserCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  WORKER_MONTHLY_RS,
  WORKER_YEARLY_RS,
  WORKER_YEARLY_SAVINGS_PCT,
  WORKER_YEARLY_SAVINGS_RS,
} from "@/lib/worker-pricing"

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
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-zinc-950 to-black shadow-xl shadow-black/40">
          <div className="relative grid items-start gap-10 p-8 md:grid-cols-2 md:items-center md:gap-12 md:p-12 lg:p-16">
            {/* Left Content */}
            <div className="flex flex-col items-center text-center md:items-start md:text-left">
              <p className="mb-4 inline-flex w-fit items-center rounded-full border border-primary/50 bg-primary/10 px-4 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-primary">
                Are you a worker?
              </p>
              <h2 className="mb-4 max-w-xl text-balance text-3xl font-bold leading-[1.15] tracking-tight md:text-4xl lg:text-[2.35rem]">
                <span className="block text-white drop-shadow-[0_0_24px_rgba(255,255,255,0.08)]">
                  Join{" "}
                  <span className="bg-gradient-to-r from-primary via-[#7fff6a] to-primary bg-clip-text text-transparent">
                    ZotServis
                  </span>
                </span>
                <span className="mt-2 block text-2xl font-semibold leading-snug text-white/90 md:text-3xl">
                  and get more clients
                </span>
              </h2>
              <p className="mb-4 max-w-xl text-pretty text-base leading-relaxed text-white/70 md:text-lg">
                Register your profile and start receiving job requests from customers across Mauritius.
              </p>
              <div className="mb-8 w-full max-w-xl rounded-2xl border border-primary/35 bg-primary/[0.06] p-5 text-left shadow-[inset_0_1px_0_0_rgba(57,255,20,0.12)]">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-primary">
                  Pricing
                </p>
                <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-end sm:gap-8">
                  <div>
                    <p className="text-3xl font-bold tabular-nums text-white">
                      Rs {WORKER_MONTHLY_RS}
                      <span className="text-lg font-semibold text-white/65">/month</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <p className="text-3xl font-bold tabular-nums text-white">
                      Rs {WORKER_YEARLY_RS.toLocaleString("en-MU")}
                      <span className="text-lg font-semibold text-white/65">/year</span>
                    </p>
                    <span className="inline-flex rounded-full border border-primary/40 bg-primary/15 px-3 py-1 text-sm font-bold text-primary">
                      Save {WORKER_YEARLY_SAVINGS_PCT}%
                    </span>
                  </div>
                </div>
                <p className="mt-3 text-sm text-white/55">
                  Yearly billing saves Rs {WORKER_YEARLY_SAVINGS_RS} compared to 12 monthly payments (
                  {WORKER_YEARLY_SAVINGS_PCT}% off).
                </p>
              </div>
              <div className="w-full max-w-xl">
                <Link href="/register" className="block w-full md:inline-block md:w-auto">
                  <Button
                    size="lg"
                    className="h-12 w-full rounded-full px-8 font-semibold text-white shadow-[0_0_24px_rgba(57,255,20,0.25)] md:w-auto"
                  >
                    Register as a Worker
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right - benefits */}
            <div className="flex flex-col gap-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="rounded-2xl border border-primary/20 bg-white/[0.04] p-5 backdrop-blur-sm transition-colors hover:border-primary/35 hover:bg-white/[0.06]"
                  >
                    <div className="mb-3 inline-flex rounded-lg border border-primary/25 bg-primary/10 p-2">
                      <benefit.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="mb-1 font-semibold text-white">{benefit.title}</h3>
                    <p className="text-sm text-white/65">{benefit.description}</p>
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
