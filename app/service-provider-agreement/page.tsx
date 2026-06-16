import type { Metadata } from "next"
import Link from "next/link"
import { LegalDocLayout } from "@/components/legal-doc-layout"
import { SITE_CONTACT_EMAIL } from "@/lib/contact"
import { SiteWhatsAppPhoneLinks } from "@/components/site-whatsapp-phone-links"
import { WORKER_MONTHLY_RS, WORKER_YEARLY_RS } from "@/lib/worker-pricing"

export const metadata: Metadata = {
  title: "Service Provider Agreement | ZotServis",
  description:
    "Agreement for service providers registering or listed on ZotServis in Mauritius — profile visibility, subscriptions, and responsibilities.",
}

export default function ServiceProviderAgreementPage() {
  const monthly = WORKER_MONTHLY_RS
  const yearly = WORKER_YEARLY_RS

  return (
    <LegalDocLayout title="Service Provider Agreement" lastUpdated="3 June 2026">
      <p>
        This Service Provider Agreement (&quot;Agreement&quot;) applies to any person, freelancer,
        professional, business, organisation, or other service provider who registers, submits information,
        creates a profile, or is listed on ZotServis.
      </p>
      <p>
        By registering as a Service Provider, submitting your information, paying for a plan, continuing to use
        the Platform, or allowing your profile to remain visible on ZotServis, you agree to this Agreement, the{" "}
        <Link href="/terms">ZotServis Terms of Service</Link>, and the{" "}
        <Link href="/privacy">ZotServis Privacy Policy</Link>.
      </p>
      <p>
        If you do not agree to this Agreement, you must not register or continue to be listed as a Service
        Provider on ZotServis.
      </p>

      <h2>1. About ZotServis</h2>
      <p>
        ZotServis is an online directory and visibility platform for independent service providers in Mauritius.
      </p>
      <p>
        ZotServis allows Service Providers to display their services, profile information, and contact details so
        that members of the public can find and contact them directly.
      </p>
      <p>
        ZotServis is not a recruitment agency, employment agency, booking platform, payment platform,
        contractor, employer, agent, representative, or manager of any Service Provider.
      </p>
      <p>
        ZotServis does not recruit, interview, select, employ, place, assign, supervise, control, recommend,
        guarantee, or manage Service Providers.
      </p>
      <p>
        Any communication, negotiation, quotation, booking, payment, meeting, work, service, or dispute between a
        Service Provider and a customer is strictly between the Service Provider and that customer.
      </p>

      <h2>2. Definitions</h2>
      <p>In this Agreement:</p>
      <ul>
        <li>
          <strong>&quot;ZotServis&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;</strong> means the
          operator of the ZotServis Platform.
        </li>
        <li>
          <strong>&quot;Platform&quot;</strong> means the ZotServis website, pages, profiles, listing features,
          registration forms, contact features, and related services.
        </li>
        <li>
          <strong>&quot;Service Provider&quot;, &quot;you&quot;, or &quot;your&quot;</strong> means the
          independent person, freelancer, professional, business, organisation, or other provider listed or
          requesting to be listed on ZotServis.
        </li>
        <li>
          <strong>&quot;Public User&quot; or &quot;Customer&quot;</strong> means any person who browses,
          searches, views, contacts, communicates with, or enters into an arrangement with a Service Provider.
        </li>
        <li>
          <strong>&quot;Profile&quot;</strong> means the public listing, page, card, or information displayed
          about a Service Provider on ZotServis.
        </li>
        <li>
          <strong>&quot;Subscription&quot;</strong> means the paid visibility plan selected by a Service Provider
          after any free period.
        </li>
        <li>
          <strong>&quot;Free Period&quot;</strong> means the initial free listing period offered by ZotServis,
          currently three months from registration unless ZotServis states otherwise in writing.
        </li>
      </ul>

      <h2>3. Independent Service Provider status</h2>
      <p>You understand and agree that you are independent from ZotServis.</p>
      <p>
        Nothing in this Agreement creates an employment relationship, worker relationship, agency relationship,
        partnership, joint venture, franchise, mandate, representation, or contractor relationship between you
        and ZotServis.
      </p>
      <p>
        You are not authorised to represent ZotServis, make promises on behalf of ZotServis, bind ZotServis to
        any agreement, collect money on behalf of ZotServis, or present yourself as being employed, approved,
        verified, guaranteed, recommended, or managed by ZotServis unless ZotServis gives express written
        permission.
      </p>
      <p>
        You are fully responsible for your own services, customers, pricing, communication, work quality,
        attendance, behaviour, legal obligations, tax obligations, insurance, permits, licences, and business
        operations.
      </p>

      <h2>4. No recruitment, employment, booking, or payment service</h2>
      <p>You understand and agree that ZotServis only provides profile visibility and public contact access.</p>
      <p>ZotServis does not:</p>
      <ul>
        <li>recruit you for customers;</li>
        <li>recruit customers for you;</li>
        <li>act as an employment agency;</li>
        <li>act as a private recruitment agency;</li>
        <li>place you into employment or work assignments;</li>
        <li>guarantee customers, jobs, bookings, enquiries, income, or results;</li>
        <li>arrange contracts between you and customers;</li>
        <li>accept bookings on your behalf;</li>
        <li>manage your calendar, availability, pricing, or service delivery;</li>
        <li>collect customer payments for your services;</li>
        <li>hold deposits, escrow, or customer funds for you;</li>
        <li>take commission from your customer payments;</li>
        <li>supervise, inspect, approve, or guarantee your work.</li>
      </ul>
      <p>Any service arrangement is made directly between you and the customer outside ZotServis.</p>

      <h2>5. Registration information</h2>
      <p>
        When registering or submitting information to ZotServis, you agree to provide information that is
        accurate, complete, current, lawful, and not misleading.
      </p>
      <p>This may include, depending on the registration process:</p>
      <ul>
        <li>your name or business name;</li>
        <li>phone number;</li>
        <li>WhatsApp number;</li>
        <li>email address;</li>
        <li>service category;</li>
        <li>service description;</li>
        <li>service area or location;</li>
        <li>profile photo;</li>
        <li>business logo;</li>
        <li>work images;</li>
        <li>website link;</li>
        <li>social media links;</li>
        <li>pricing information, if provided;</li>
        <li>any other information requested by ZotServis.</li>
      </ul>
      <p>You are responsible for ensuring that your information remains correct and up to date.</p>
      <p>
        ZotServis is not responsible if customers cannot contact you because you provided incorrect, outdated,
        incomplete, inactive, or inaccessible contact details.
      </p>

      <h2>6. Public profile consent</h2>
      <p>You understand and agree that your Profile is intended to be publicly visible on ZotServis.</p>
      <p>
        By submitting your information, you consent to ZotServis displaying your approved profile information
        publicly on the Platform.
      </p>
      <p>Public profile information may include:</p>
      <ul>
        <li>your name or business name;</li>
        <li>service category;</li>
        <li>service description;</li>
        <li>district, area, or service location;</li>
        <li>phone number;</li>
        <li>WhatsApp number;</li>
        <li>email address;</li>
        <li>website link;</li>
        <li>social media links;</li>
        <li>profile photo;</li>
        <li>business logo;</li>
        <li>work images;</li>
        <li>other profile information you submit or approve for display.</li>
      </ul>
      <p>
        You understand that public profile information may be viewed by members of the public and may also be
        indexed, cached, shared, previewed, or displayed by search engines, browsers, social media platforms,
        and third-party services outside ZotServis&apos; direct control.
      </p>
      <p>You must not submit information for public display if you do not want that information to be public.</p>

      <h2>7. Permission to use your content</h2>
      <p>
        You retain ownership of content you submit to ZotServis, such as descriptions, photos, logos, business
        information, and work images.
      </p>
      <p>
        However, by submitting content, you grant ZotServis a non-exclusive, worldwide, royalty-free licence to
        host, store, use, reproduce, display, edit for formatting, resize, crop, publish, share, promote, and
        distribute that content for the purpose of operating, displaying, marketing, improving, and promoting
        ZotServis and your Profile.
      </p>
      <p>
        This licence continues for as long as your Profile is active or as reasonably needed for legal,
        administrative, backup, marketing, or record-keeping purposes.
      </p>
      <p>You confirm that you own or have permission to use all content you submit.</p>
      <p>
        You must not submit stolen images, copyrighted content without permission, false documents, fake reviews,
        misleading information, or images of other people without the necessary rights or consent.
      </p>

      <h2>8. Free period</h2>
      <p>
        Service Providers currently receive a free visibility period of three months starting from the date of
        registration, unless ZotServis states a different promotional period in writing.
      </p>
      <p>
        The Free Period gives you the opportunity to have your Profile visible on ZotServis without paying a
        subscription fee during that period.
      </p>
      <p>
        The Free Period does not guarantee that you will receive customers, enquiries, bookings, jobs, revenue,
        profit, or any specific result.
      </p>
      <p>
        ZotServis may refuse, delay, edit, hide, suspend, or remove a Profile during the Free Period if the Profile
        breaches this Agreement, creates risk, contains incorrect information, or is unsuitable for the Platform.
      </p>

      <h2>9. Paid plans after the free period</h2>
      <p>After the Free Period ends, you may choose one of the available paid visibility plans:</p>
      <ul>
        <li>
          <strong>Monthly plan:</strong> Rs {monthly} per month.
        </li>
        <li>
          <strong>Yearly plan:</strong> Rs {yearly.toLocaleString("en-MU")} per year.
        </li>
      </ul>
      <p>These fees are for visibility on the ZotServis Platform only.</p>
      <p>
        They are not recruitment fees, job placement fees, customer referral fees, commission, agency fees, or
        payment for guaranteed customers.
      </p>
      <p>ZotServis does not take commission from payments you receive from customers.</p>
      <p>
        ZotServis does not guarantee that a paid plan will result in enquiries, customers, bookings, jobs,
        income, revenue, profit, or any particular outcome.
      </p>

      <h2>10. Failure to choose a plan</h2>
      <p>
        If you do not choose and pay for a plan after the Free Period ends, ZotServis may hide, suspend,
        archive, unpublish, or remove your Profile from public view.
      </p>
      <p>
        ZotServis may contact you before or after the Free Period ends, but ZotServis is not required to keep
        your Profile visible after the Free Period without an active paid plan.
      </p>
      <p>
        If your Profile is removed or hidden, ZotServis may retain certain account, billing, support,
        moderation, and legal records as explained in the Privacy Policy.
      </p>

      <h2>11. Payment terms</h2>
      <p>
        Subscription fees, accepted payment methods, billing periods, renewal rules, and applicable taxes will be
        displayed or communicated by ZotServis at the time of payment.
      </p>
      <p>
        You are responsible for paying the applicable subscription fee on time if you wish to keep your Profile
        visible after the Free Period.
      </p>
      <p>
        If payment is not received, fails, is reversed, is disputed, or is cancelled, ZotServis may suspend, hide,
        or remove your Profile.
      </p>
      <p>
        Unless ZotServis states otherwise in writing, subscription fees are generally non-refundable once the paid
        visibility period has started, except where required by law or where ZotServis confirms that a billing
        error occurred.
      </p>

      <h2>12. Price changes</h2>
      <p>
        ZotServis may change its subscription prices, plans, features, billing cycles, or visibility rules in the
        future.
      </p>
      <p>
        If you already have an active paid plan, ZotServis will make reasonable efforts to communicate material
        changes before they affect your next renewal or future paid period.
      </p>
      <p>
        Continuing to use the Platform after a price or plan change means you accept the updated price or plan for
        future periods.
      </p>

      <h2>13. Your responsibilities towards customers</h2>
      <p>You are fully responsible for your communication and dealings with customers.</p>
      <p>You must:</p>
      <ul>
        <li>respond honestly and professionally;</li>
        <li>
          clearly explain your prices, quotation, scope of work, timing, payment terms, cancellation terms, and
          any extra charges;
        </li>
        <li>perform services with reasonable care and skill;</li>
        <li>
          comply with applicable laws, permits, licences, professional obligations, tax obligations, and safety
          requirements;
        </li>
        <li>keep appropriate records of quotations, agreements, payments, and disputes;</li>
        <li>treat customers respectfully and lawfully;</li>
        <li>avoid misleading, abusive, discriminatory, unsafe, fraudulent, or illegal conduct.</li>
      </ul>
      <p>You are responsible for resolving any issue with your customers directly.</p>

      <h2>14. Customer payments</h2>
      <p>
        ZotServis does not collect, hold, process, guarantee, or protect payments between you and customers.
      </p>
      <p>You are fully responsible for agreeing payment terms directly with customers.</p>
      <p>This includes responsibility for:</p>
      <ul>
        <li>deposits;</li>
        <li>cash payments;</li>
        <li>bank transfers;</li>
        <li>mobile payments;</li>
        <li>receipts;</li>
        <li>refunds;</li>
        <li>cancellations;</li>
        <li>unpaid invoices;</li>
        <li>overcharging disputes;</li>
        <li>payment fraud;</li>
        <li>tax reporting.</li>
      </ul>
      <p>
        ZotServis is not responsible if a customer refuses to pay, delays payment, cancels a service, disputes a
        payment, makes a false claim, behaves badly, or causes any loss or damage.
      </p>

      <h2>15. No guarantee of customer conduct</h2>
      <p>You understand that ZotServis does not control Public Users or customers.</p>
      <p>
        ZotServis does not guarantee that customers will be honest, safe, respectful, punctual, serious, able to
        pay, or satisfied with your services.
      </p>
      <p>
        Any risk from communicating with, meeting, visiting, accepting work from, or receiving payment from a
        customer remains your responsibility.
      </p>
      <p>
        You should take reasonable precautions before meeting or working with customers, especially when visiting
        private locations, meeting unknown persons, or accepting high-value work.
      </p>

      <h2>16. Your legal compliance</h2>
      <p>You are responsible for ensuring that you are legally allowed to offer your services.</p>
      <p>Depending on your activity, this may include responsibility for:</p>
      <ul>
        <li>business registration;</li>
        <li>trade licences;</li>
        <li>professional licences;</li>
        <li>permits;</li>
        <li>insurance;</li>
        <li>tax registration and tax filings;</li>
        <li>health and safety requirements;</li>
        <li>consumer protection obligations;</li>
        <li>employment obligations if you have your own staff;</li>
        <li>industry-specific rules;</li>
        <li>any other legal or regulatory requirement that applies to your services.</li>
      </ul>
      <p>
        ZotServis does not provide legal, tax, financial, insurance, licensing, employment, or professional
        advice.
      </p>
      <p>
        Being listed on ZotServis does not mean that ZotServis has verified your legal status, licences,
        qualifications, insurance, or compliance.
      </p>

      <h2>17. Prohibited services and content</h2>
      <p>
        You must not use ZotServis to advertise, offer, promote, arrange, or support anything illegal, harmful,
        misleading, abusive, unsafe, or unsuitable for the Platform.
      </p>
      <p>
        ZotServis may refuse or remove any Profile, category, service, image, text, link, or content at its
        discretion.
      </p>
      <p>You must not post or submit content that:</p>
      <ul>
        <li>is false, misleading, or deceptive;</li>
        <li>
          claims qualifications, experience, licences, approvals, awards, or guarantees that you do not have;
        </li>
        <li>
          infringes another person&apos;s intellectual property, privacy, image rights, or other rights;
        </li>
        <li>
          contains hate speech, threats, harassment, abuse, sexual exploitation, discrimination, or illegal content;
        </li>
        <li>promotes scams, fraud, pyramid schemes, illegal services, or unsafe activity;</li>
        <li>contains malware, spam, phishing links, or harmful code;</li>
        <li>damages the reputation, safety, trust, or proper operation of ZotServis.</li>
      </ul>

      <h2>18. Profile review and moderation</h2>
      <p>
        ZotServis may review, edit, format, approve, reject, hide, suspend, archive, or remove any Profile or
        content.
      </p>
      <p>ZotServis may do this at any time, with or without notice, where ZotServis believes that:</p>
      <ul>
        <li>the information is incorrect, outdated, incomplete, misleading, or unlawful;</li>
        <li>the Profile breaches this Agreement, the Terms of Service, or the Privacy Policy;</li>
        <li>the Service Provider has not paid after the Free Period;</li>
        <li>the Service Provider has misused the Platform;</li>
        <li>ZotServis has received complaints or reports;</li>
        <li>the Profile creates legal, safety, reputational, technical, commercial, or operational risk;</li>
        <li>the category or service is unsuitable for ZotServis;</li>
        <li>
          removal is necessary to protect ZotServis, Public Users, customers, Service Providers, or third parties.
        </li>
      </ul>
      <p>ZotServis is not required to publish, keep visible, or reinstate any Profile.</p>

      <h2>19. Complaints and reports</h2>
      <p>
        ZotServis may allow Public Users or other persons to report Profiles, content, behaviour, scams,
        incorrect information, or disputes.
      </p>
      <p>
        If ZotServis receives a complaint about you, ZotServis may review the matter and may request information
        from you.
      </p>
      <p>
        ZotServis may take action based on a complaint, including warning you, editing your Profile, hiding your
        Profile, suspending your access, or removing your Profile.
      </p>
      <p>
        ZotServis is not required to investigate every complaint fully and is not required to mediate or resolve
        disputes between you and customers.
      </p>

      <h2>20. Disputes with customers</h2>
      <p>All disputes between you and customers are strictly between you and the customer.</p>
      <p>This includes disputes about:</p>
      <ul>
        <li>price;</li>
        <li>deposits;</li>
        <li>payment;</li>
        <li>refunds;</li>
        <li>cancellation;</li>
        <li>delays;</li>
        <li>attendance;</li>
        <li>communication;</li>
        <li>behaviour;</li>
        <li>safety;</li>
        <li>work quality;</li>
        <li>materials;</li>
        <li>damage;</li>
        <li>loss;</li>
        <li>injury;</li>
        <li>theft;</li>
        <li>fraud;</li>
        <li>customer satisfaction;</li>
        <li>any other issue relating to your service.</li>
      </ul>
      <p>ZotServis is not a party to your agreement with the customer.</p>
      <p>
        ZotServis is not responsible for resolving, paying, refunding, compensating, enforcing, or participating
        in customer disputes.
      </p>
      <p>
        ZotServis may, at its discretion, review complaints for the purpose of protecting the Platform, but this
        does not make ZotServis responsible for the dispute.
      </p>

      <h2>21. Disputes with ZotServis</h2>
      <p>
        If you have an issue with your Profile, subscription, billing, payment, removal, suspension, or use of the
        Platform, you should contact ZotServis first so that the matter can be reviewed.
      </p>
      <p>Contact:</p>
      <ul>
        <li>
          Email: <a href={`mailto:${SITE_CONTACT_EMAIL}`}>{SITE_CONTACT_EMAIL}</a>
        </li>
        <li>
          WhatsApp: <SiteWhatsAppPhoneLinks />
        </li>
      </ul>
      <p>
        ZotServis will make reasonable efforts to review genuine support requests, but does not guarantee a
        particular outcome.
      </p>

      <h2>22. Suspension or termination by ZotServis</h2>
      <p>
        ZotServis may suspend, hide, archive, remove, or terminate your Profile or access to the Platform at any
        time if:
      </p>
      <ul>
        <li>you breach this Agreement;</li>
        <li>you breach the Terms of Service or Privacy Policy;</li>
        <li>you provide false, misleading, incomplete, or outdated information;</li>
        <li>you fail to pay a required subscription fee;</li>
        <li>you misuse the Platform;</li>
        <li>
          you behave in a way that may harm Public Users, customers, ZotServis, other Service Providers, or third
          parties;
        </li>
        <li>you offer illegal, unsafe, misleading, or unsuitable services;</li>
        <li>ZotServis receives serious complaints about you;</li>
        <li>
          continued listing may create legal, safety, reputational, technical, commercial, or operational risk.
        </li>
      </ul>
      <p>
        Where practical, ZotServis may give notice, but ZotServis may act without notice where it considers
        immediate action necessary.
      </p>

      <h2>23. Cancellation by Service Provider</h2>
      <p>
        You may request removal of your Profile by contacting ZotServis or by using any available account/profile
        tools.
      </p>
      <p>
        If you cancel during a paid period, your Profile may be removed or hidden, but subscription fees already
        paid are generally non-refundable unless ZotServis agrees otherwise in writing or unless required by law.
      </p>
      <p>
        ZotServis may retain certain information after cancellation where necessary for legal, accounting, tax,
        security, dispute, fraud-prevention, backup, or legitimate business purposes.
      </p>

      <h2>24. No misuse of the Platform</h2>
      <p>You must not:</p>
      <ul>
        <li>copy, scrape, harvest, or misuse data from ZotServis;</li>
        <li>interfere with the Platform&apos;s security or operation;</li>
        <li>create fake profiles or duplicate profiles without permission;</li>
        <li>impersonate another person or business;</li>
        <li>
          use another person&apos;s phone number, photos, logo, business name, or social links without permission;
        </li>
        <li>send spam or abusive messages through or because of the Platform;</li>
        <li>
          attempt to damage ZotServis&apos; reputation or mislead the public about your relationship with Zot
          Servis.
        </li>
      </ul>

      <h2>25. Intellectual property of ZotServis</h2>
      <p>
        The ZotServis name, logo, brand, design, website layout, platform structure, text, graphics, software,
        features, and other materials created by ZotServis belong to ZotServis or its licensors.
      </p>
      <p>
        You must not copy, reproduce, imitate, modify, sell, misuse, or create confusingly similar branding, pages,
        content, or services without written permission from ZotServis.
      </p>
      <p>
        You may truthfully state that you are &quot;listed on ZotServis&quot; while your Profile is active, but
        you must not state or imply that you are employed, approved, certified, verified, guaranteed, endorsed, or
        managed by ZotServis unless ZotServis expressly confirms this in writing.
      </p>

      <h2>26. Privacy and personal data</h2>
      <p>
        ZotServis processes personal data as explained in the{" "}
        <Link href="/privacy">ZotServis Privacy Policy</Link>.
      </p>
      <p>
        By registering or submitting information, you confirm that you have read the Privacy Policy and understand
        how your personal data may be collected, used, stored, shared, and displayed.
      </p>
      <p>You understand that your public Profile information may be displayed publicly.</p>
      <p>
        You must not submit personal data of another person unless you have the right and permission to do so.
      </p>
      <p>
        If your Profile includes photos, names, testimonials, reviews, staff details, customer details, or
        third-party information, you are responsible for ensuring that you have the required consent or legal basis
        to provide and display that information.
      </p>

      <h2>27. Platform availability</h2>
      <p>
        ZotServis aims to keep the Platform available, but does not guarantee that it will always be online,
        uninterrupted, secure, error-free, or available at all times.
      </p>
      <p>
        ZotServis may update, maintain, suspend, restrict, replace, or discontinue any part of the Platform at any
        time.
      </p>
      <p>
        ZotServis is not liable for loss of enquiries, loss of visibility, loss of business, loss of profit, or
        loss of opportunity caused by downtime, technical issues, maintenance, changes, removal, suspension, or
        discontinuation of the Platform.
      </p>

      <h2>28. Disclaimers</h2>
      <p>The Platform is provided on an &quot;as is&quot; and &quot;as available&quot; basis.</p>
      <p>To the fullest extent permitted by law, ZotServis makes no warranty or guarantee that:</p>
      <ul>
        <li>your Profile will be accepted or remain visible;</li>
        <li>your Profile will appear in a particular order or position;</li>
        <li>customers will contact you;</li>
        <li>customers will book your services;</li>
        <li>customers will pay you;</li>
        <li>customers will behave properly;</li>
        <li>your business will grow;</li>
        <li>your subscription will generate revenue or profit;</li>
        <li>the Platform will always be available or error-free.</li>
      </ul>
      <p>You use ZotServis at your own risk.</p>

      <h2>29. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by Mauritian law, ZotServis and its owners, directors, team members,
        partners, contractors, and affiliates will not be liable for any indirect, incidental, special,
        consequential, punitive, or economic loss, including loss of profit, loss of revenue, loss of data, loss of
        customers, loss of enquiries, loss of opportunity, loss of goodwill, or business interruption.
      </p>
      <p>
        ZotServis will not be liable for any claim, loss, damage, injury, theft, fraud, misconduct, poor
        workmanship, delay, non-payment, overcharging, cancellation, accident, harassment, or dispute arising from
        your communication, meetings, payments, services, or arrangements with customers.
      </p>
      <p>
        Where ZotServis cannot legally exclude liability, ZotServis&apos; total liability for claims relating to
        this Agreement or the Platform will be limited to the amount you paid to ZotServis in the twelve months
        before the claim, or Rs 5,000, whichever is greater, unless a different limit is required by law.
      </p>
      <p>
        Nothing in this Agreement excludes or limits liability where it cannot be excluded or limited under
        applicable law.
      </p>

      <h2>30. Indemnity</h2>
      <p>
        To the fullest extent permitted by law, you agree to indemnify and hold harmless ZotServis and its owners,
        directors, team members, partners, contractors, and affiliates from any claims, losses, damages,
        liabilities, penalties, costs, and expenses arising from:
      </p>
      <ul>
        <li>your breach of this Agreement;</li>
        <li>your breach of the Terms of Service or Privacy Policy;</li>
        <li>your misuse of the Platform;</li>
        <li>your Profile information or content;</li>
        <li>your services;</li>
        <li>your dealings with customers;</li>
        <li>
          your failure to comply with laws, licences, permits, taxes, insurance, or professional requirements;
        </li>
        <li>your infringement of third-party rights;</li>
        <li>
          any complaint, claim, or dispute made by a customer or third party against you or ZotServis because of
          your conduct, services, information, or content.
        </li>
      </ul>

      <h2>31. Updates to this Agreement</h2>
      <p>ZotServis may update this Agreement from time to time.</p>
      <p>
        When updated, the new version will be posted on the Platform or communicated by another reasonable method.
      </p>
      <p>
        Your continued use of the Platform, continued Profile visibility, or continued subscription after an updated
        Agreement is posted or communicated means you accept the updated Agreement, where permitted by law.
      </p>
      <p>
        If you do not agree with the updated Agreement, you must stop using the Platform and request removal of your
        Profile.
      </p>

      <h2>32. Governing law and jurisdiction</h2>
      <p>This Agreement is governed by the laws of the Republic of Mauritius.</p>
      <p>
        The courts of Mauritius shall have jurisdiction over disputes relating to this Agreement, the Platform, your
        Profile, or your use of ZotServis, subject to any mandatory rights or protections that apply under
        Mauritian law.
      </p>

      <h2>33. Entire agreement</h2>
      <p>
        This Agreement, together with the ZotServis Terms of Service and Privacy Policy, forms the agreement between
        you and ZotServis regarding your registration, Profile, subscription, and use of the Platform as a Service
        Provider.
      </p>
      <p>
        If there is any conflict between this Agreement and the general Terms of Service regarding Service
        Provider matters, this Agreement will apply to the Service Provider-specific issue, unless ZotServis states
        otherwise in writing.
      </p>

      <h2>34. Contact</h2>
      <p>
        For questions about this Agreement, your Profile, your subscription, or removal requests, contact ZotServis
        at:
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
    </LegalDocLayout>
  )
}
