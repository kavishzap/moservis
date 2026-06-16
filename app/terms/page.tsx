import type { Metadata } from "next"
import Link from "next/link"
import { LegalDocLayout } from "@/components/legal-doc-layout"
import { SITE_CONTACT_EMAIL } from "@/lib/contact"
import { SiteWhatsAppPhoneLinks } from "@/components/site-whatsapp-phone-links"
import { WORKER_MONTHLY_RS, WORKER_YEARLY_RS } from "@/lib/worker-pricing"

export const metadata: Metadata = {
  title: "Terms of Service | ZotServis",
  description:
    "Terms of Service for ZotServis — public users and service providers using our Mauritius directory and visibility platform.",
}

export default function TermsPage() {
  const monthly = WORKER_MONTHLY_RS
  const yearly = WORKER_YEARLY_RS

  return (
    <LegalDocLayout title="Terms of Service" lastUpdated="3 June 2026">
      <p>
        These Terms of Service (&quot;Terms&quot;) govern your access to and use of the ZotServis website,
        applications, pages, profiles, contact features, and related services (collectively, the
        &quot;Platform&quot;) operated in Mauritius.
      </p>
      <p>
        By accessing or using ZotServis, you agree to these Terms. If you do not agree, you should not use
        the Platform.
      </p>

      <h2>1. Who we are</h2>
      <p>
        ZotServis is an online directory and visibility platform that allows independent service providers in
        Mauritius to create public profiles so that members of the public can find and contact them directly.
      </p>
      <p>
        ZotServis is not a recruitment agency, employment agency, booking platform, payment platform,
        contractor, employer, agent, representative, or manager of any service provider.
      </p>
      <p>
        ZotServis does not recruit, interview, select, employ, place, supervise, recommend, assign, control,
        or manage service providers. ZotServis does not arrange employment or work contracts between public
        users and service providers.
      </p>
      <p>
        Any communication, negotiation, booking, quotation, payment, service arrangement, meeting, or work
        performed is strictly between the public user and the service provider.
      </p>

      <h2>2. Definitions</h2>
      <p>In these Terms:</p>
      <ul>
        <li>
          <strong>&quot;Public User&quot;</strong> means any person who browses, searches, views, contacts, or
          interacts with service providers through or because of the Platform.
        </li>
        <li>
          <strong>&quot;Service Provider&quot;</strong> means an independent person, professional, freelancer,
          business, or organisation that registers or is listed on the Platform to display services and contact
          details.
        </li>
        <li>
          <strong>&quot;Profile&quot;</strong> means the public listing page or information displayed about a
          Service Provider.
        </li>
        <li>
          <strong>&quot;Subscription&quot;</strong> means the paid visibility plan that a Service Provider may
          choose after any free promotional period.
        </li>
        <li>
          <strong>&quot;User&quot;</strong> means any Public User, Service Provider, visitor, or other person
          using the Platform.
        </li>
      </ul>

      <h2>3. Platform-only role</h2>
      <p>ZotServis provides online visibility and contact access only.</p>
      <p>ZotServis does not:</p>
      <ul>
        <li>employ Service Providers;</li>
        <li>recruit workers for employers or customers;</li>
        <li>act as a recruitment agency;</li>
        <li>guarantee work, customers, leads, income, bookings, enquiries, or payments;</li>
        <li>accept bookings on behalf of Service Providers;</li>
        <li>collect or hold customer payments for Service Providers;</li>
        <li>take commission from Service Providers&apos; customer payments;</li>
        <li>supervise, control, or inspect work done by Service Providers;</li>
        <li>
          guarantee the identity, skills, licences, qualifications, behaviour, reliability, pricing,
          availability, safety, or quality of any Service Provider;
        </li>
        <li>become a party to any agreement between a Public User and a Service Provider.</li>
      </ul>
      <p>
        Any contract or arrangement is made directly between the Public User and the Service Provider outside
        ZotServis.
      </p>

      <h2>4. Public Users</h2>
      <h3>4.1 Free public access</h3>
      <p>
        Public Users may browse the Platform, view Service Provider profiles, and use available contact links
        such as phone, WhatsApp, email, website, or social media links free of charge, unless ZotServis
        introduces a separate paid public feature in the future.
      </p>
      <h3>4.2 Public User responsibility</h3>
      <p>
        Public Users are fully responsible for their own decisions when contacting, meeting, booking, paying, or
        working with a Service Provider.
      </p>
      <p>Before agreeing to any service, Public Users should make their own checks, including where relevant:</p>
      <ul>
        <li>confirming the identity of the Service Provider;</li>
        <li>
          checking experience, references, qualifications, licences, permits, insurance, or business
          registration where applicable;
        </li>
        <li>
          agreeing the scope of work, price, timing, materials, payment method, cancellation terms, and safety
          requirements directly with the Service Provider;
        </li>
        <li>keeping written proof of important discussions, quotations, payments, and agreements;</li>
        <li>using safe meeting practices, especially when meeting someone for the first time;</li>
        <li>not sharing unnecessary personal, financial, or sensitive information.</li>
      </ul>
      <p>
        ZotServis is not responsible for any loss, damage, injury, theft, fraud, poor workmanship, delay,
        failed service, payment dispute, misconduct, harassment, or other issue arising between a Public User
        and a Service Provider.
      </p>
      <h3>4.3 No guarantee</h3>
      <p>
        Information on Service Provider profiles is submitted by Service Providers or collected for listing
        purposes. ZotServis may review, moderate, edit, hide, or remove profiles, but this does not mean that
        ZotServis verifies or guarantees the information.
      </p>
      <p>Public Users must not rely only on a ZotServis profile when making a decision.</p>
      <h3>4.4 Public User conduct</h3>
      <p>Public Users must not:</p>
      <ul>
        <li>harass, threaten, abuse, discriminate against, or misuse the contact details of Service Providers;</li>
        <li>use the Platform for spam, scams, fraud, illegal activity, or misleading messages;</li>
        <li>impersonate another person or business;</li>
        <li>attempt to bypass the security or proper operation of the Platform;</li>
        <li>
          use information from the Platform for mass marketing, scraping, resale, or unauthorised databases.
        </li>
      </ul>

      <h2>5. Service Providers</h2>
      <h3>5.1 Independent status</h3>
      <p>Service Providers are independent from ZotServis.</p>
      <p>
        A Service Provider is not an employee, worker, agent, partner, franchisee, contractor, representative,
        or legal delegate of ZotServis.
      </p>
      <p>
        Service Providers are responsible for how they communicate with Public Users, how they price their
        services, how they perform their work, and how they handle customers, payments, disputes, taxes,
        licences, insurance, and legal obligations.
      </p>
      <p>
        Service Providers must also comply with the{" "}
        <Link href="/service-provider-agreement">Service Provider Agreement</Link>.
      </p>
      <h3>5.2 Registration and profile information</h3>
      <p>
        By registering or submitting information for a profile, the Service Provider confirms that all
        information provided is accurate, lawful, up to date, and not misleading.
      </p>
      <p>
        Service Providers are responsible for ensuring that their phone number, WhatsApp number, email address,
        social media links, service area, service category, description, photos, documents, prices, and other
        displayed information are correct.
      </p>
      <p>
        ZotServis is not responsible if a Public User cannot contact a Service Provider because the Service
        Provider submitted incorrect, outdated, incomplete, or inactive contact details.
      </p>
      <h3>5.3 Public display of profile</h3>
      <p>
        Service Providers understand and agree that their profile information may be publicly visible on Zot
        Servis and may be indexed or displayed by search engines, social media previews, and other online
        services.
      </p>
      <p>This may include, depending on what is submitted or approved for display:</p>
      <ul>
        <li>name or business name;</li>
        <li>service category and service description;</li>
        <li>district, area, or service location;</li>
        <li>phone number, WhatsApp number, email address, website, or social media links;</li>
        <li>profile photo, work images, logo, or other uploaded content.</li>
      </ul>
      <p>
        Service Providers must not upload personal data or images of other people unless they have the right and
        permission to do so.
      </p>
      <h3>5.4 Free period and paid visibility</h3>
      <p>
        Service Providers receive a free visibility period of three months starting from the date of
        registration, unless ZotServis states a different promotional period in writing.
      </p>
      <p>After the free period ends, the Service Provider may choose one of the following visibility plans:</p>
      <ul>
        <li>
          <strong>Monthly plan:</strong> Rs {monthly} per month.
        </li>
        <li>
          <strong>Yearly plan:</strong> Rs {yearly.toLocaleString("en-MU")} per year.
        </li>
      </ul>
      <p>
        These fees are for profile visibility and access to the Platform only. They are not commission,
        recruitment fees, job placement fees, or payment for customer leads.
      </p>
      <p>
        ZotServis does not guarantee that a Service Provider will receive enquiries, customers, bookings,
        jobs, revenue, profit, or any specific result from being listed.
      </p>
      <h3>5.5 End of free period</h3>
      <p>
        If a Service Provider does not choose and pay for a visibility plan after the free period, ZotServis may
        hide, suspend, archive, or remove the Service Provider profile from public view.
      </p>
      <p>
        ZotServis may also contact the Service Provider before or after the free period ends, but ZotServis is
        not required to keep a profile visible without an active plan.
      </p>
      <h3>5.6 Payments and refunds</h3>
      <p>
        Subscription fees, billing periods, accepted payment methods, and any applicable taxes will be shown at
        the time of payment or communicated by ZotServis.
      </p>
      <p>
        Unless ZotServis states otherwise in writing, subscription payments are generally non-refundable once
        the paid visibility period has started, except where required by applicable law or where ZotServis
        confirms that a billing error occurred.
      </p>
      <p>
        If a payment fails, is reversed, or is not received, ZotServis may suspend or remove the profile
        visibility.
      </p>
      <h3>5.7 Service Provider legal compliance</h3>
      <p>
        Service Providers are responsible for complying with all laws, regulations, trade requirements, tax
        obligations, licences, permits, professional rules, insurance requirements, and safety standards that
        apply to their services.
      </p>
      <p>
        Service Providers must not claim qualifications, licences, approvals, experience, prices, offers, or
        abilities that they do not have.
      </p>
      <p>
        ZotServis may request supporting information, edit a profile, reject a profile, or remove a profile,
        but ZotServis is not responsible for verifying every claim made by a Service Provider.
      </p>
      <h3>5.8 Service Provider conduct</h3>
      <p>Service Providers must not:</p>
      <ul>
        <li>provide false, misleading, illegal, offensive, discriminatory, or harmful information;</li>
        <li>
          use stolen images, copyrighted content, fake reviews, fake qualifications, or unauthorised
          third-party material;
        </li>
        <li>behave abusively, dishonestly, dangerously, or unlawfully towards Public Users;</li>
        <li>use ZotServis to promote illegal services or activities;</li>
        <li>attempt to collect payments in a fraudulent or misleading way;</li>
        <li>
          represent that they are employed, endorsed, approved, guaranteed, or managed by ZotServis unless Zot
          Servis expressly confirms this in writing.
        </li>
      </ul>
      <h3>5.9 Disputes with Public Users</h3>
      <p>All disputes between a Public User and a Service Provider are strictly between those parties.</p>
      <p>
        This includes disputes about price, payment, deposits, refunds, timing, attendance, cancellation,
        materials, quality of work, damage, loss, injury, behaviour, communication, or any other matter.
      </p>
      <p>
        ZotServis may, at its discretion, receive complaints, review listings, remove profiles, or restrict
        access to the Platform. However, ZotServis is not required to mediate, resolve, compensate, enforce,
        or participate in disputes between Public Users and Service Providers.
      </p>

      <h2>6. Content and intellectual property</h2>
      <p>
        The ZotServis name, logo, website design, platform content, branding, layout, software, and
        materials created by ZotServis belong to ZotServis or its licensors.
      </p>
      <p>
        Service Providers retain ownership of content they submit, such as descriptions, photos, logos, and
        profile materials, but they grant ZotServis a non-exclusive, worldwide, royalty-free licence to host,
        store, display, reproduce, edit for formatting, promote, and share that content for the purpose of
        operating, marketing, and improving the Platform.
      </p>
      <p>Service Providers confirm that they have the rights and permissions needed to submit their content.</p>

      <h2>7. Moderation and removal</h2>
      <p>
        ZotServis may, at any time and without liability, refuse, edit, hide, suspend, or remove any profile,
        content, account, or access where ZotServis believes that:
      </p>
      <ul>
        <li>information is false, misleading, outdated, incomplete, or unlawful;</li>
        <li>the User has breached these Terms;</li>
        <li>the listing may create legal, safety, reputational, technical, or operational risk;</li>
        <li>the User has misused the Platform;</li>
        <li>payment has not been made where required;</li>
        <li>removal is necessary to protect ZotServis, Public Users, Service Providers, or third parties.</li>
      </ul>
      <p>ZotServis is not required to publish every submitted profile.</p>

      <h2>8. No emergency service</h2>
      <p>ZotServis is not an emergency response service.</p>
      <p>
        Public Users should not rely on ZotServis for urgent, dangerous, medical, police, fire, rescue,
        electrical hazard, gas hazard, or other emergency situations. In an emergency, contact the appropriate
        emergency services or competent authorities.
      </p>

      <h2>9. Disclaimers</h2>
      <p>The Platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis.</p>
      <p>To the fullest extent permitted by Mauritian law, ZotServis does not give any warranty or guarantee that:</p>
      <ul>
        <li>the Platform will always be available, uninterrupted, secure, or error-free;</li>
        <li>Service Provider profiles are accurate, complete, verified, lawful, safe, or up to date;</li>
        <li>Public Users will find a suitable Service Provider;</li>
        <li>Service Providers will receive customers, enquiries, bookings, jobs, income, or results;</li>
        <li>
          any service arranged outside the Platform will be safe, lawful, satisfactory, timely, or properly
          performed.
        </li>
      </ul>

      <h2>10. Limitation of liability</h2>
      <p>
        To the maximum extent permitted by Mauritian law, ZotServis and its owners, directors, team members,
        partners, contractors, and affiliates will not be liable for any indirect, incidental, special,
        consequential, punitive, or economic loss, including loss of profit, loss of revenue, loss of data, loss
        of opportunity, loss of goodwill, or business interruption.
      </p>
      <p>
        ZotServis will not be liable for any claim, loss, damage, injury, theft, fraud, misconduct, poor
        workmanship, delay, non-payment, overcharging, cancellation, accident, harassment, or dispute arising
        from communications, meetings, payments, services, or arrangements between Public Users and Service
        Providers.
      </p>
      <p>
        Where ZotServis cannot legally exclude liability, ZotServis&apos; total liability for claims relating
        to the Platform will be limited to the amount paid by the User to ZotServis in the twelve months before
        the claim, or Rs 5,000, whichever is greater, unless a different limit is required by law.
      </p>
      <p>
        Nothing in these Terms excludes or limits liability where it cannot be excluded or limited under
        applicable law.
      </p>

      <h2>11. Indemnity</h2>
      <p>
        To the fullest extent permitted by law, you agree to indemnify and hold harmless ZotServis and its
        owners, directors, team members, partners, contractors, and affiliates from claims, losses, damages,
        liabilities, costs, and expenses arising from:
      </p>
      <ul>
        <li>your breach of these Terms;</li>
        <li>your misuse of the Platform;</li>
        <li>content or information you submit;</li>
        <li>services you offer, request, arrange, pay for, or perform;</li>
        <li>disputes between you and another User;</li>
        <li>your breach of law, rights, licences, permits, tax obligations, or third-party rights.</li>
      </ul>

      <h2>12. Privacy</h2>
      <p>
        Our <Link href="/privacy">Privacy Policy</Link> explains how we collect, use, store, share, and protect
        personal data.
      </p>
      <p>
        By using the Platform, you agree that ZotServis may process personal data as described in the Privacy
        Policy.
      </p>
      <p>Service Providers understand that profile information submitted for public listing may be displayed publicly.</p>

      <h2>13. Changes to the Platform</h2>
      <p>
        ZotServis may update, modify, suspend, limit, replace, or discontinue any part of the Platform at any
        time.
      </p>
      <p>
        ZotServis may also change categories, profile features, contact options, pricing, visibility rules, and
        subscription options. Where required, material changes to paid subscription terms will be communicated
        before they affect existing paid plans.
      </p>

      <h2>14. Changes to these Terms</h2>
      <p>
        ZotServis may update these Terms from time to time by posting a new version on the Platform and
        updating the &quot;Last updated&quot; date.
      </p>
      <p>
        Your continued use of the Platform after updated Terms are posted means you accept the updated Terms,
        where permitted by law.
      </p>
      <p>
        For Service Providers, continued use of a profile or subscription after changes are posted or
        communicated means acceptance of the updated Terms.
      </p>

      <h2>15. Governing law and jurisdiction</h2>
      <p>These Terms are governed by the laws of the Republic of Mauritius.</p>
      <p>
        The courts of Mauritius shall have jurisdiction over disputes relating to these Terms or the Platform,
        subject to any mandatory rights or protections that apply under Mauritian law.
      </p>

      <h2>16. Contact</h2>
      <p>For questions about these Terms, contact ZotServis at:</p>
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
        See also our <Link href="/privacy">Privacy Policy</Link> and{" "}
        <Link href="/service-provider-agreement">Service Provider Agreement</Link>.
      </p>
    </LegalDocLayout>
  )
}
