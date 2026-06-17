"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { BrandAmbientBlurs } from "@/components/home/brand-ambient"
import { sectionScrollMargin, siteContainer } from "@/lib/site-layout"

const faqs = [
  {
    question: "How do I find a service provider?",
    answer:
      "Use the search bar to choose a service category and district, or browse by category on the homepage. When you find a service provider that fits your needs, you can contact them directly by phone or WhatsApp.",
  },
  {
    question: "How do I contact a service provider?",
    answer:
      "Each public profile includes Call now and WhatsApp options. Use either to contact the service provider directly. ZotServis does not handle bookings or payments.",
  },
  {
    question: "How can I register as a service provider?",
    answer:
      "Click Join as a Service Provider in the navigation menu and complete the registration form with your contact details, service categories, areas served, and experience. Once your profile is reviewed, it can be published in the directory.",
  },
  {
    question: "Is ZotServis free?",
    answer:
      "Yes. ZotServis is free for public users to search and contact service providers. Service providers pay a simple subscription to keep their profile visible after the free period: Rs 100 per month, or Rs 1,000 per year (about 17% less than paying monthly).",
  },
  {
    question: "Are service provider profiles reviewed?",
    answer:
      "Service provider profiles may be reviewed for completeness before being published on ZotServis. Profile status is shown where applicable, along with service details, photos, experience, and areas served.",
  },
]

export function FAQSection() {
  return (
    <section
      id="faq"
      className={`${sectionScrollMargin} relative overflow-hidden py-10 md:py-14`}
    >
      <BrandAmbientBlurs subtle />
      <div className={`relative z-0 ${siteContainer}`}>
        <div className="mb-6 text-center md:mb-8">
          <h2 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-sm text-muted-foreground sm:text-base">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] lg:gap-10 xl:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] xl:gap-12">
          <div className="min-w-0">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                  <AccordionTrigger className="py-3 text-left text-base text-foreground hover:text-teal hover:no-underline sm:py-3.5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-3 text-sm leading-relaxed text-muted-foreground sm:pb-3.5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none lg:pt-1">
            <picture>
              <source srcSet="/zotservismap.webp" type="image/webp" />
              <img
                src="/zotservismap.png"
                alt="Map of Mauritius showing local service providers across the island"
                width={640}
                height={640}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-2xl"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  )
}
