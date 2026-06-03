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
    question: "How do I find a worker?",
    answer: "Simply use our search bar to enter the service you need and your location. You can also browse by category. Once you find a worker you like, you can contact them directly via phone or WhatsApp.",
  },
  {
    question: "How do I contact a worker?",
    answer: "Each worker profile has a Call Now and WhatsApp button. Simply click on either to contact them directly. There's no middleman - you deal directly with the worker.",
  },
  {
    question: "How can I register as a worker?",
    answer: "Click on 'Join as a Worker' in the navigation menu and fill out the registration form. You'll need to provide your contact details, service area, and some information about your experience. Once verified, your profile will be visible to customers.",
  },
  {
    question: "Is ZotServis free?",
    answer:
      "Yes! ZotServis is completely free for customers to use. Workers subscribe to list their profile and receive job requests: Rs 100 per month, or Rs 1,000 per year (about 17% less than paying monthly).",
  },
  {
    question: "Are workers verified?",
    answer: "We verify all workers through a review process. Verified workers display a verification badge on their profile. We also show customer reviews and ratings to help you make informed decisions.",
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

        <div className="mx-auto max-w-3xl">
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
      </div>
    </section>
  )
}
