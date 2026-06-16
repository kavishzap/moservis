import Link from "next/link"
import {
  BadgeCheck,
  MapPin,
  MessageCircle,
  Search,
  Star,
  UserRound,
  Phone,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { buildSearchHref } from "@/lib/search-url"
import { sectionScrollMargin, siteContainer } from "@/lib/site-layout"
import { SectionWaveTop } from "@/components/home/section-wave"
import { IconFrame } from "@/components/icons/illustrative/icon-frame"
import {
  TrustedExpertsIllustration,
  CommunityFocusIllustration,
  SimpleTransparentIllustration,
} from "@/components/icons/illustrative/trust-icons"

const trustSignals = [
  { icon: BadgeCheck, label: "Public service provider profiles" },
  { icon: Star, label: "Profile details and provider information" },
  { icon: MessageCircle, label: "Direct WhatsApp & call" },
  { icon: MapPin, label: "Coverage across Mauritius" },
] as const

const trustItems = [
  {
    Illustration: TrustedExpertsIllustration,
    title: "Local Service Providers",
    description:
      "Service provider profiles may be reviewed for completeness before being published on ZotServis.",
    highlights: [
      "Basic profile details reviewed for completeness",
      "Profile status shown where applicable",
      "Portfolio and experience visible upfront",
    ],
  },
  {
    Illustration: CommunityFocusIllustration,
    title: "Community Focus",
    description: "Built for Mauritian households, tradespeople, and small businesses.",
    highlights: [
      "Service providers listed by district and service area",
      "Supports local skills and livelihoods",
      "Categories from home repair to professional services",
    ],
  },
  {
    Illustration: SimpleTransparentIllustration,
    title: "Simple & Transparent",
    description:
      "Free for public users to browse — you contact service providers directly outside ZotServis.",
    highlights: [
      "Free to search and contact service providers",
      "Clear subscription pricing for service providers only",
      "Clear profile information from listed service providers",
    ],
  },
] as const

const howItWorks = [
  {
    step: "1",
    icon: Search,
    title: "Search locally",
    description:
      "Filter by category, district, and service area to find relevant local providers.",
  },
  {
    step: "2",
    icon: UserRound,
    title: "Compare profiles",
    description:
      "View profile details, photos, experience, categories, and areas served.",
  },
  {
    step: "3",
    icon: Phone,
    title: "Contact directly",
    description:
      "Call or WhatsApp the service provider directly — ZotServis does not handle bookings or payments.",
  },
] as const

function HowItWorksStepContent({
  item,
}: {
  item: (typeof howItWorks)[number]
}) {
  return (
    <>
      <div className="mb-1.5 flex items-center justify-center gap-2">
        <item.icon className="h-4 w-4 text-gold" aria-hidden />
        <h4 className="text-sm font-semibold text-white">{item.title}</h4>
      </div>
      <p className="text-xs leading-relaxed text-white/70 sm:text-sm">{item.description}</p>
    </>
  )
}

function StepNumberBadge({ step }: { step: string }) {
  return (
    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-sm font-bold text-gold ring-1 ring-white/15">
      {step}
    </div>
  )
}

export function TrustSection() {
  return (
    <div
      className="relative -mt-2 bg-ocean pb-10 md:-mt-4 md:pb-14"
      aria-labelledby="why-choose-us"
    >
      <SectionWaveTop />
      <div className={`${siteContainer} pt-4 md:pt-6`}>
        <div className="mx-auto mb-6 max-w-2xl text-center md:mb-8">
          <h2
            id="why-choose-us"
            className={`${sectionScrollMargin} text-balance text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl`}
          >
            Why Choose Our Community
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/75 sm:text-base">
            ZotServis helps people in Mauritius discover listed local service providers and contact
            them directly by phone or WhatsApp, with clear profile information in one place.
          </p>
        </div>

        <ul className="mb-6 flex flex-wrap items-center justify-center gap-2 sm:mb-8 sm:gap-2.5">
          {trustSignals.map(({ icon: Icon, label }) => (
            <li key={label}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:text-sm">
                <Icon className="h-3.5 w-3.5 shrink-0 text-gold" aria-hidden />
                {label}
              </span>
            </li>
          ))}
        </ul>

        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {trustItems.map((item) => (
            <li key={item.title}>
              <div
                className={cn(
                  "flex h-full flex-col rounded-3xl bg-white px-4 py-5 text-left shadow-md sm:px-5 sm:py-6",
                  "transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg",
                )}
              >
                <div className="mb-3 flex justify-center sm:mb-4">
                  <IconFrame size="lg" className="overflow-hidden rounded-2xl">
                    <item.Illustration />
                  </IconFrame>
                </div>
                <h3 className="mb-2 text-center text-sm font-bold leading-snug text-ocean sm:text-base">
                  {item.title}
                </h3>
                <p className="mb-3 text-center text-xs leading-relaxed text-slate sm:text-sm">
                  {item.description}
                </p>
                {/* <ul className="mt-auto space-y-1.5 border-t border-teal/10 pt-3">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-xs leading-snug text-slate sm:text-sm"
                    >
                      <BadgeCheck
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal"
                        aria-hidden
                      />
                      {highlight}
                    </li>
                  ))}
                </ul> */}
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm sm:mt-10 sm:p-6 md:p-8">
          <div className="mb-5 text-center sm:mb-6">
            <h3 className="text-base font-bold text-white sm:text-lg">How it works for you</h3>
            <p className="mt-1 text-xs text-white/70 sm:text-sm">
              Browse local service providers by category and area — free for public users.
            </p>
          </div>
          {/* Mobile — stacked steps, unchanged */}
          <ol className="grid gap-4 sm:hidden">
            {howItWorks.map((item) => (
              <li key={item.step} className="text-center">
                <div className="mb-3 inline-flex">
                  <StepNumberBadge step={item.step} />
                </div>
                <HowItWorksStepContent item={item} />
              </li>
            ))}
          </ol>

          {/* Desktop — centered step row with connecting lines */}
          <div className="hidden sm:block">
            <div className="mx-auto grid max-w-3xl grid-cols-3">
              {howItWorks.map((item, index) => (
                <div key={item.step} className="relative flex justify-center">
                  {index < howItWorks.length - 1 ? (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute top-5 left-1/2 z-0 h-px w-full bg-white/30"
                    />
                  ) : null}
                  <div className="relative z-[1]">
                    <StepNumberBadge step={item.step} />
                  </div>
                </div>
              ))}
            </div>
            <ol className="mx-auto mt-6 grid max-w-3xl grid-cols-3 gap-5">
              {howItWorks.map((item) => (
                <li key={item.step} className="text-center">
                  <HowItWorksStepContent item={item} />
                </li>
              ))}
            </ol>
          </div>
          <div className="mt-6 flex justify-center sm:mt-8">
            <Link
              href={buildSearchHref()}
              className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-ocean transition-colors hover:bg-gold/90"
            >
              <Search className="h-4 w-4" aria-hidden />
              Find a Service Provider
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
