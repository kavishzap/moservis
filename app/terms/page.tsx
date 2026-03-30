import type { Metadata } from "next"
import Link from "next/link"
import { LegalDocLayout } from "@/components/legal-doc-layout"
import { SITE_CONTACT_EMAIL } from "@/lib/contact"
import { SiteWhatsAppPhoneLinks } from "@/components/site-whatsapp-phone-links"
import {
  WORKER_MONTHLY_RS,
  WORKER_YEARLY_RS,
  WORKER_YEARLY_SAVINGS_PCT,
} from "@/lib/worker-pricing"

export const metadata: Metadata = {
  title: "Terms of Service | ZotServis",
  description:
    "Terms of Service for ZotServis — customers and workers using our Mauritius local services platform and worker subscriptions.",
}

export default function TermsPage() {
  const monthly = WORKER_MONTHLY_RS
  const yearly = WORKER_YEARLY_RS
  const yearlySavePct = WORKER_YEARLY_SAVINGS_PCT

  return (
    <LegalDocLayout title="Terms of Service" lastUpdated="29 March 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the ZotServis website,
        applications, and related services (collectively, the &quot;Platform&quot;) operated in Mauritius. By
        using the Platform, you agree to these Terms. If you do not agree, do not use ZotServis.
      </p>

      <h2>1. Who we are</h2>
      <p>
        <strong>ZotServis</strong> (&quot;we&quot;, &quot;us&quot;) is an online marketplace that helps people in{" "}
        <strong>Mauritius</strong> find and contact local service providers (&quot;Workers&quot;) for jobs such
        as electrical work, plumbing, cleaning, painting, gardening, carpentry, and similar services. We provide
        discovery, profiles, and contact tools. We are <strong>not</strong> a party to contracts between Customers
        and Workers for the actual work performed.
      </p>

      <h2>2. Definitions</h2>
      <ul>
        <li>
          <strong>Customer</strong> — anyone who uses the Platform to search for, view, or contact Workers.
        </li>
        <li>
          <strong>Worker</strong> — a service provider who registers a profile on the Platform to be discoverable
          by Customers.
        </li>
        <li>
          <strong>Subscription</strong> — the paid plan that Workers may purchase to keep their profile visible
          and active on the Platform, as described on our site and at registration.
        </li>
        <li>
          <strong>User</strong> — any Customer or Worker (or visitor) using the Platform.
        </li>
      </ul>

      <h2>3. Eligibility</h2>
      <p>
        You must be able to enter a binding contract under Mauritian law. If you use the Platform on behalf of a
        business, you represent that you have authority to bind that business. Workers must provide accurate
        identity and business information where requested for verification or display.
      </p>

      <h2>4. Customers</h2>
      <h3>4.1 Free use</h3>
      <p>
        Searching the directory, viewing Worker profiles, and using contact features made available on the
        Platform (for example phone or WhatsApp links) are offered to Customers{" "}
        <strong>without a subscription fee to ZotServis</strong>, unless we introduce a separate paid Customer
        product in the future (we will notify you before any such fee applies to you).
      </p>
      <h3>4.2 Your responsibilities</h3>
      <ul>
        <li>Use the Platform lawfully and respectfully.</li>
        <li>
          Negotiate scope, price, and terms of work directly with the Worker. ZotServis does not guarantee quotes,
          quality, timing, or outcomes.
        </li>
        <li>
          Do not misuse contact details, harass Workers, or use the Platform for spam, fraud, or illegal activity.
        </li>
      </ul>

      <h2>5. Workers</h2>
      <h3>5.1 Profiles and visibility</h3>
      <p>
        By registering as a Worker, you create a public-facing profile that may include your services, areas
        covered, and contact information you choose to display. You are responsible for keeping that information
        accurate and up to date.
      </p>
      <h3>5.2 Worker subscription (fees)</h3>
      <p>
        To remain <strong>listed and visible</strong> on the Platform, Workers pay a subscription in Mauritian
        Rupees (Rs), as shown on the registration and pricing areas of the site. Unless stated otherwise at
        checkout, the following structure applies:
      </p>
      <ul>
        <li>
          <strong>Monthly:</strong> Rs {monthly} per month.
        </li>
        <li>
          <strong>Yearly:</strong> Rs {yearly.toLocaleString("en-MU")} per year (approximately {yearlySavePct}%
          savings vs twelve monthly payments at the current monthly rate).
        </li>
      </ul>
      <p>
        Fees are <strong>for Platform access and visibility</strong>, not for individual job leads. We do not
        guarantee a minimum number of enquiries, jobs, or revenue. Payment methods, billing cycles, taxes, and any
        promotional pricing will be shown at the time you subscribe.
      </p>
      <h3>5.3 Renewal and cancellation</h3>
      <p>
        Subscriptions renew according to the plan you choose (monthly or yearly) until you cancel through the
        account or billing flow we provide, or as described in your payment confirmation. If you cancel, your
        profile may remain visible until the end of the paid period; after that, visibility may be removed unless
        you renew.
      </p>
      <h3>5.4 Refunds</h3>
      <p>
        Refund rules depend on what we display at purchase and applicable law. Unless we state a cooling-off or
        refund policy for your specific transaction, subscription fees are generally{" "}
        <strong>non-refundable</strong> for partial periods already started. Contact us if you believe a billing
        error occurred.
      </p>
      <h3>5.5 Conduct and compliance</h3>
      <p>
        Workers must perform services in compliance with Mauritian law, hold any licences or insurance where
        required for their trade, and not misrepresent qualifications. You indemnify us against claims arising from
        your work, except where prohibited by law.
      </p>

      <h2>6. Prohibited conduct (all Users)</h2>
      <p>You must not:</p>
      <ul>
        <li>Violate any law or third-party rights.</li>
        <li>Upload malware, scrape the Platform in breach of these Terms, or attempt to bypass security.</li>
        <li>Impersonate others or create fake listings.</li>
        <li>Use the Platform to discriminate unlawfully or to harm others.</li>
      </ul>

      <h2>7. Intellectual property</h2>
      <p>
        The Platform, branding, and content we create are owned by ZotServis or our licensors. You receive a
        limited, revocable licence to use the Platform for its intended purpose. You retain rights to content you
        submit; you grant us a licence to host, display, and promote it on the Platform.
      </p>

      <h2>8. Disclaimers</h2>
      <p>
        The Platform is provided <strong>&quot;as is&quot;</strong> to the fullest extent permitted by law. We do
        not warrant uninterrupted or error-free operation. We do not employ Workers and are{" "}
        <strong>not responsible</strong> for the quality, safety, legality, or timeliness of work performed by
        Workers, or for disputes between Customers and Workers.
      </p>

      <h2>9. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by Mauritian law, ZotServis and its team will not be liable for indirect,
        incidental, special, or consequential damages, or for loss of profits or data, arising from your use of the
        Platform. Our total liability for any claim relating to the Platform is limited to the amount you paid us
        in the twelve months before the claim (if any), or Rs 5,000, whichever is greater, except where liability
        cannot be limited by law.
      </p>

      <h2>10. Governing law</h2>
      <p>
        These Terms are governed by the laws of the <strong>Republic of Mauritius</strong>. Courts of Mauritius
        have jurisdiction, subject to mandatory consumer protections where they apply.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update these Terms by posting a new version on this page and updating the &quot;Last updated&quot;
        date. Continued use after changes constitutes acceptance where permitted by law. Material changes to
        subscription terms will be communicated as required.
      </p>

      <h2>12. Contact</h2>
      <p>
        Questions about these Terms:{" "}
        <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>. WhatsApp: <SiteWhatsAppPhoneLinks />.
        See also our{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </LegalDocLayout>
  )
}
