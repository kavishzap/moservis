import type { Metadata } from "next"
import Link from "next/link"
import { LegalDocLayout } from "@/components/legal-doc-layout"
import { SITE_CONTACT_EMAIL } from "@/lib/contact"
import { SiteWhatsAppPhoneLinks } from "@/components/site-whatsapp-phone-links"

export const metadata: Metadata = {
  title: "Privacy Policy | ZotServis",
  description:
    "How ZotServis collects, uses, stores, shares, and protects personal data for public users and service providers in Mauritius.",
}

export default function PrivacyPage() {
  return (
    <LegalDocLayout title="Privacy Policy" lastUpdated="3 June 2026">
      <p>
        ZotServis (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) respects your privacy. This Privacy Policy
        explains how we collect, use, store, share, and protect personal data when you use the ZotServis
        website, applications, profiles, contact features, and related services (collectively, the
        &quot;Platform&quot;).
      </p>
      <p>
        This Privacy Policy applies to public users browsing for service providers and to service providers
        registering or listed on the Platform.
      </p>

      <h2>1. Who we are</h2>
      <p>
        ZotServis operates in Mauritius as an online directory and visibility platform for independent
        service providers.
      </p>
      <p>
        For the purposes of applicable data protection law, ZotServis is responsible for personal data
        processed through the Platform where we decide why and how that data is processed.
      </p>
      <p>
        <strong>Contact details:</strong>
      </p>
      <ul>
        <li>
          Email: <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
        </li>
        <li>
          WhatsApp: <SiteWhatsAppPhoneLinks />
        </li>
        <li>Location: Mauritius</li>
      </ul>

      <h2>2. Important note about public profiles</h2>
      <p>Service Provider profiles are intended to be public.</p>
      <p>
        If you register as a Service Provider, information you submit for your profile may be displayed
        publicly on ZotServis and may be viewed by public users, search engines, social media platforms,
        and other online services.
      </p>
      <p>
        Public profile information may include your name or business name, service category, service
        description, service area, phone number, WhatsApp number, email address, website, social media
        links, profile photo, logo, work images, and other information you choose or agree to display.
      </p>
      <p>Do not submit information for public display if you do not want it to be public.</p>

      <h2>3. Personal data we collect</h2>
      <h3>3.1 Public Users</h3>
      <p>When you browse or use ZotServis as a Public User, we may collect:</p>
      <ul>
        <li>
          technical information such as IP address, browser type, device type, operating system, pages
          viewed, timestamps, and basic logs;
        </li>
        <li>
          search and usage information, such as categories viewed, filters used, districts selected, and
          profile pages opened;
        </li>
        <li>
          communication information if you contact ZotServis by email, WhatsApp, form, social media, or
          other channel;
        </li>
        <li>
          limited interaction data when you click a contact button or link, such as a WhatsApp, phone,
          email, website, or social media link.
        </li>
      </ul>
      <p>
        ZotServis does not control the personal data you choose to share directly with a Service Provider
        after leaving the Platform or contacting them through WhatsApp, phone, social media, email, or other
        external channels.
      </p>

      <h3>3.2 Service Providers</h3>
      <p>
        When you register, request a listing, subscribe, or maintain a profile as a Service Provider, we may
        collect:
      </p>
      <ul>
        <li>name, business name, email address, phone number, WhatsApp number, and other contact details;</li>
        <li>
          service category, service description, service areas, location or district, availability
          information, and profile details;
        </li>
        <li>photos, logos, work images, documents, or other materials you upload or send to us;</li>
        <li>
          account information, login details, registration date, profile status, subscription status, and
          communication history;
        </li>
        <li>
          billing and payment information, such as plan selected, payment status, billing name, transaction
          reference, invoice or receipt information, and payment history;
        </li>
        <li>information needed to review, moderate, support, update, suspend, or remove your profile.</li>
      </ul>
      <p>
        If we introduce verification features, we may collect additional information for that purpose. Any
        verification process will be explained when requested or introduced.
      </p>

      <h3>3.3 All Users</h3>
      <p>For all Users, we may collect:</p>
      <ul>
        <li>cookies or similar technology data;</li>
        <li>security logs and anti-fraud information;</li>
        <li>support requests, complaints, reports, and correspondence;</li>
        <li>information required to comply with legal obligations or protect the Platform.</li>
      </ul>

      <h2>4. How we use personal data</h2>
      <p>We use personal data to:</p>
      <ul>
        <li>operate, maintain, secure, and improve the Platform;</li>
        <li>create, display, manage, update, suspend, or remove Service Provider profiles;</li>
        <li>allow Public Users to find and contact Service Providers directly;</li>
        <li>
          manage Service Provider subscriptions, billing, receipts, payment status, and visibility periods;
        </li>
        <li>
          communicate with Users about accounts, profiles, subscriptions, support, security, policy updates,
          and service notices;
        </li>
        <li>respond to questions, complaints, reports, and requests;</li>
        <li>prevent misuse, fraud, spam, illegal activity, security incidents, and breaches of our Terms;</li>
        <li>analyse usage and improve performance, design, categories, search, and user experience;</li>
        <li>comply with legal, accounting, tax, regulatory, or dispute-related obligations.</li>
      </ul>

      <h2>5. Legal basis for processing</h2>
      <p>Where applicable data protection law requires a legal basis, we may rely on one or more of the following:</p>
      <ul>
        <li>
          performance of a contract, where processing is needed to provide the Platform, manage profiles, or
          manage subscriptions;
        </li>
        <li>
          consent, for example where you choose to submit public profile information, agree to certain
          cookies, or opt in to certain communications;
        </li>
        <li>
          legitimate interests, such as operating and improving the Platform, preventing fraud, securing the
          service, handling complaints, and maintaining accurate listings;
        </li>
        <li>legal obligation, where we must keep records, respond to lawful requests, or comply with applicable law;</li>
        <li>
          protection of rights and safety, where processing is needed to protect ZotServis, Users, Service
          Providers, or third parties.
        </li>
      </ul>

      <h2>6. Public sharing of Service Provider information</h2>
      <p>
        Service Providers understand and agree that profile information submitted for listing may be publicly
        displayed.
      </p>
      <p>
        Publicly displayed information may be accessible to anyone using the internet. It may also be copied,
        saved, indexed, cached, shared, or displayed by search engines, social media platforms, browsers, or
        third-party services outside ZotServis&apos; direct control.
      </p>
      <p>
        If you want to update or remove public profile information, contact ZotServis or use any available
        account tools.
      </p>

      <h2>7. Sharing with third parties</h2>
      <p>We may share personal data with:</p>
      <ul>
        <li>hosting providers and technical infrastructure providers;</li>
        <li>email, messaging, customer support, analytics, security, and website service providers;</li>
        <li>payment processors, banks, or payment service providers where subscriptions or payments are processed;</li>
        <li>professional advisers, such as accountants, legal advisers, or consultants;</li>
        <li>
          authorities, courts, regulators, or other parties where required by law or necessary to protect
          rights, safety, or legal interests;
        </li>
        <li>
          potential business successors if ZotServis is reorganised, transferred, merged, or sold, subject
          to appropriate safeguards.
        </li>
      </ul>
      <p>We do not sell personal data as our business model.</p>

      <h2>8. External links and direct contact with Service Providers</h2>
      <p>
        Service Provider profiles may include external links or contact options, such as WhatsApp, phone,
        email, websites, Facebook, Instagram, TikTok, or other social media.
      </p>
      <p>
        When you click or use those external services, their own terms and privacy policies may apply. Zot
        Servis does not control how those external platforms or Service Providers process personal data.
      </p>
      <p>
        Any information exchanged directly between a Public User and a Service Provider outside ZotServis is
        the responsibility of those parties, not ZotServis.
      </p>

      <h2>9. Cookies and similar technologies</h2>
      <p>We may use cookies and similar technologies for:</p>
      <ul>
        <li>essential website operation;</li>
        <li>security and fraud prevention;</li>
        <li>remembering preferences;</li>
        <li>analytics and performance measurement;</li>
        <li>improving user experience;</li>
        <li>marketing or campaign measurement, where applicable.</li>
      </ul>
      <p>
        You can control cookies through your browser settings. Blocking some cookies may affect how the
        Platform works.
      </p>
      <p>Where required by law, we will request consent for non-essential cookies.</p>

      <h2>10. Retention</h2>
      <p>
        We keep personal data only for as long as reasonably necessary for the purposes described in this
        Privacy Policy.
      </p>
      <p>For example:</p>
      <ul>
        <li>public profile information may be kept while the Service Provider profile is active;</li>
        <li>
          account, subscription, billing, receipt, and payment records may be kept for accounting, tax, legal,
          and dispute purposes;
        </li>
        <li>
          support messages and complaints may be kept for follow-up, safety, legal, and moderation purposes;
        </li>
        <li>
          technical logs may be kept for shorter periods unless needed for security, fraud prevention, or
          legal reasons;
        </li>
        <li>
          removed or suspended profile data may be retained for a reasonable period where needed for legal,
          safety, abuse-prevention, accounting, or dispute purposes.
        </li>
      </ul>
      <p>
        You may request deletion of your data, but some information may be retained where required or permitted
        by law.
      </p>

      <h2>11. Security</h2>
      <p>
        We use reasonable technical and organisational measures to protect personal data against unauthorised
        access, loss, misuse, alteration, or disclosure.
      </p>
      <p>
        However, no website, online platform, communication channel, or internet transmission is completely
        secure. Users are responsible for protecting their own devices, passwords, email accounts, WhatsApp
        accounts, and social media accounts.
      </p>
      <p>
        Service Providers should avoid sending unnecessary sensitive documents or personal data unless
        requested and clearly required.
      </p>

      <h2>12. Your rights</h2>
      <p>Subject to applicable law, you may have rights to:</p>
      <ul>
        <li>request access to personal data we hold about you;</li>
        <li>request correction of inaccurate or incomplete data;</li>
        <li>request deletion of certain personal data;</li>
        <li>object to certain processing;</li>
        <li>request restriction of certain processing;</li>
        <li>withdraw consent where processing is based on consent;</li>
        <li>ask questions or make a complaint about how we process personal data.</li>
      </ul>
      <p>To exercise your rights, contact us at:</p>
      <ul>
        <li>
          Email: <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
        </li>
        <li>
          WhatsApp: <SiteWhatsAppPhoneLinks />
        </li>
      </ul>
      <p>We may need to verify your identity before responding to certain requests.</p>
      <p>You may also have the right to contact the relevant data protection authority in Mauritius.</p>

      <h2>13. International transfers</h2>
      <p>
        Some of our service providers, systems, hosting, analytics, email, payment, or support tools may
        process data outside Mauritius.
      </p>
      <p>
        Where personal data is transferred internationally, we take steps designed to protect the data in
        accordance with applicable law, such as using appropriate contractual, technical, and organisational
        safeguards where required.
      </p>

      <h2>14. Children&apos;s privacy</h2>
      <p>The Platform is not intended for children under 16.</p>
      <p>
        We do not knowingly collect personal data from children under 16 without appropriate authority or
        consent where required by law.
      </p>
      <p>
        If you believe a child has provided personal data to ZotServis without appropriate authority, contact
        us so we can review and take appropriate action.
      </p>

      <h2>15. Accuracy of information</h2>
      <p>Service Providers are responsible for keeping their profile information accurate, complete, and up to date.</p>
      <p>
        ZotServis is not responsible if Public Users cannot contact a Service Provider because the Service
        Provider submitted incorrect, outdated, incomplete, or inactive contact details.
      </p>

      <h2>16. Changes to this Privacy Policy</h2>
      <p>We may update this Privacy Policy from time to time.</p>
      <p>
        When we update it, we will change the &quot;Last updated&quot; date. Where appropriate, we may also
        notify Users through the Platform, email, WhatsApp, or other reasonable method.
      </p>
      <p>
        Your continued use of the Platform after an updated Privacy Policy is posted means you acknowledge the
        updated policy.
      </p>

      <h2>17. Contact</h2>
      <p>For privacy questions, requests, or complaints, contact ZotServis at:</p>
      <ul>
        <li>
          Email: <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
        </li>
        <li>
          WhatsApp: <SiteWhatsAppPhoneLinks />
        </li>
        <li>Location: Mauritius</li>
      </ul>
      <p>
        See also our <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/service-provider-agreement">Service Provider Agreement</Link>.
      </p>
    </LegalDocLayout>
  )
}
