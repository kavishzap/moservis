import type { Metadata } from "next"
import Link from "next/link"
import { LegalDocLayout } from "@/components/legal-doc-layout"
import { SITE_CONTACT_EMAIL } from "@/lib/contact"
import { SiteWhatsAppPhoneLinks } from "@/components/site-whatsapp-phone-links"

export const metadata: Metadata = {
  title: "Privacy Policy | ZotServis",
  description:
    "How ZotServis collects, uses, and protects personal data for Customers and Workers in Mauritius.",
}

export default function PrivacyPage() {
  return (
    <LegalDocLayout title="Privacy Policy" lastUpdated="29 March 2026">
      <p>
        ZotServis (&quot;we&quot;, &quot;us&quot;) respects your privacy. This Privacy Policy explains how we
        collect, use, store, and share personal information when you use our website and services in{" "}
        <strong>Mauritius</strong>, whether you are a <strong>Customer</strong> (searching for workers) or a{" "}
        <strong>Worker</strong> (listing your services and, where applicable, paying a subscription).
      </p>

      <h2>1. Data controller</h2>
      <p>
        The data controller responsible for personal data processed through the Platform is ZotServis, operating
        in Mauritius. Contact: <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>. WhatsApp:{" "}
        <SiteWhatsAppPhoneLinks />.
      </p>

      <h2>2. What we collect</h2>
      <h3>2.1 Customers</h3>
      <ul>
        <li>
          <strong>Usage data:</strong> pages viewed, search queries or filters (e.g. service type, district),
          approximate technical data (browser type, device type) to run and improve the Platform.
        </li>
        <li>
          <strong>Communications:</strong> if you email us or use a contact form, we keep the content and metadata
          needed to respond.
        </li>
        <li>
          We may process data you share when contacting a Worker outside our site (e.g. phone or WhatsApp); that
          is primarily between you and the Worker, but we may see limited technical logs if links are opened via
          our app or tracking we disclose separately.
        </li>
      </ul>
      <h3>2.2 Workers (including subscribers)</h3>
      <ul>
        <li>
          <strong>Registration and profile:</strong> name, phone, WhatsApp number, email (if provided), service
          areas, job types, services offered, description, and optional photos or documents you upload.
        </li>
        <li>
          <strong>Subscription and billing:</strong> billing name, payment-related identifiers, transaction history,
          and subscription status (monthly or yearly plan). Payment processing may be handled by a third-party
          payment provider; we do not store full card numbers on our servers where the provider tokenises them.
        </li>
        <li>
          <strong>Verification:</strong> if we offer verification, we may process extra information you submit for
          that purpose.
        </li>
      </ul>
      <h3>2.3 All users</h3>
      <ul>
        <li>
          <strong>Technical logs:</strong> IP address, timestamps, cookies or similar technologies (see below).
        </li>
      </ul>

      <h2>3. How we use your information</h2>
      <p>We use personal data to:</p>
      <ul>
        <li>Operate the Platform: show search results, Worker profiles, and contact options.</li>
        <li>
          Manage Worker accounts and <strong>subscriptions</strong> (billing, renewals, access to visibility
          features).
        </li>
        <li>Communicate with you about the service, security, or legal notices.</li>
        <li>Improve performance, analytics, and user experience (including aggregated or de-identified data).</li>
        <li>Comply with law, prevent fraud, and enforce our Terms of Service.</li>
      </ul>

      <h2>4. Legal bases (summary)</h2>
      <p>
        Where the Data Protection Act of Mauritius and related rules apply, we rely on appropriate grounds such
        as: <strong>performance of a contract</strong> (providing the Platform and subscriptions),{" "}
        <strong>legitimate interests</strong> (security, improvement, analytics with safeguards),{" "}
        <strong>consent</strong> where required (e.g. certain marketing cookies or emails), and{" "}
        <strong>legal obligation</strong> where we must retain or disclose data.
      </p>

      <h2>5. Sharing</h2>
      <ul>
        <li>
          <strong>Public Worker profiles:</strong> information you choose to display (e.g. name, services, area,
          phone) is visible to Customers and search engines as designed.
        </li>
        <li>
          <strong>Service providers:</strong> hosting, analytics, email delivery, payment processing, and support
          tools — under contracts that require protection of personal data.
        </li>
        <li>
          <strong>Legal:</strong> authorities or third parties when required by law or to protect rights and
          safety.
        </li>
        <li>We do not sell your personal data for money as a business model.</li>
      </ul>

      <h2>6. Retention</h2>
      <p>
        We keep data only as long as needed for the purposes above: for example, account and billing records for
        the duration of the relationship and a reasonable period after (for tax, disputes, and legal compliance).
        Logs may be kept for shorter technical periods. You may request deletion subject to legal exceptions.
      </p>

      <h2>7. Security</h2>
      <p>
        We implement appropriate technical and organisational measures to protect personal data. No online
        service is completely secure; use strong passwords and protect your devices.
      </p>

      <h2>8. Your rights</h2>
      <p>
        Subject to applicable law, you may have the right to access, rectify, erase, restrict, or object to
        certain processing, and to withdraw consent where processing is consent-based. You may also have the
        right to lodge a complaint with a supervisory authority in Mauritius. To exercise rights, contact{" "}
        <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a> or WhatsApp: <SiteWhatsAppPhoneLinks />.
      </p>

      <h2>9. Cookies</h2>
      <p>
        We use cookies and similar technologies for essential operation (e.g. session, preferences), analytics,
        and (where applicable) marketing. You can control cookies through your browser; blocking some cookies may
        affect functionality.
      </p>

      <h2>10. Children</h2>
      <p>
        The Platform is not directed at children under 16. We do not knowingly collect personal data from
        children without parental authority as required by law.
      </p>

      <h2>11. International transfers</h2>
      <p>
        Data may be processed on servers or by providers outside Mauritius. Where we transfer personal data
        internationally, we take steps consistent with applicable law (e.g. appropriate safeguards or
        agreements).
      </p>

      <h2>12. Changes</h2>
      <p>
        We may update this Privacy Policy from time to time. The &quot;Last updated&quot; date will change; we
        will post the new version here. Material changes may be communicated by email or a notice on the
        Platform where appropriate.
      </p>

      <h2>13. Contact</h2>
      <p>
        Privacy questions: <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>. WhatsApp:{" "}
        <SiteWhatsAppPhoneLinks />. See also our{" "}
        <Link href="/terms">Terms of Service</Link>.
      </p>
    </LegalDocLayout>
  )
}
