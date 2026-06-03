import { cn } from "@/lib/utils"
import { sectionScrollMargin, siteContainer } from "@/lib/site-layout"
import { SectionWaveTop } from "@/components/home/section-wave"
import { IconFrame } from "@/components/icons/illustrative/icon-frame"
import {
  TrustedExpertsIllustration,
  CommunityFocusIllustration,
  SimpleTransparentIllustration,
} from "@/components/icons/illustrative/trust-icons"

const trustItems = [
  {
    Illustration: TrustedExpertsIllustration,
    title: "Trusted Local Experts",
    description: "Vetted workers from your neighborhood. Verified skills for peace of mind.",
  },
  {
    Illustration: CommunityFocusIllustration,
    title: "Community Focus",
    description: "We support local growth and build connections. Your projects help our island thrive.",
  },
  {
    Illustration: SimpleTransparentIllustration,
    title: "Simple & Transparent",
    description: "Clear pricing, easy booking, and honest communication. No hidden fees.",
  },
] as const

export function TrustSection() {
  return (
    <div
      className="relative -mt-2 bg-ocean pb-8 md:-mt-4 md:pb-10"
      aria-labelledby="why-choose-us"
    >
      <SectionWaveTop />
      <div className={`${siteContainer} pt-4 md:pt-6`}>
        <div className="mx-auto mb-6 max-w-2xl text-center md:mb-8">
          <h2
            id="why-choose-us"
            className={`${sectionScrollMargin} text-balance text-xl font-bold tracking-tight text-white sm:text-2xl`}
          >
            Why Choose Our Community
          </h2>
        </div>

        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4 lg:gap-5">
          {trustItems.map((item) => (
            <li key={item.title}>
              <div
                className={cn(
                  "flex h-full flex-col items-center rounded-3xl bg-white px-4 py-5 text-center shadow-md sm:px-5 sm:py-6",
                  "transition-transform duration-300 hover:-translate-y-0.5 hover:shadow-lg",
                )}
              >
                <IconFrame size="lg" className="mb-3 overflow-hidden rounded-2xl sm:mb-4">
                  <item.Illustration />
                </IconFrame>
                <h3 className="mb-1.5 text-sm font-bold leading-snug text-ocean sm:text-base">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate sm:text-sm">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
