"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
    answer: "Click on 'Become a Worker' in the navigation menu and fill out the registration form. You'll need to provide your contact details, service area, and some information about your experience. Once verified, your profile will be visible to customers.",
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
    <section id="faq" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-foreground md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
                <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
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
