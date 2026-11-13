"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteData } from "@/context/SiteDataContext";
import { ShieldCheck, Scale, Mail, ArrowLeft } from "lucide-react";

interface LegalDocumentViewProps {
  mode: "privacy" | "terms";
}

export function LegalDocumentView({ mode }: LegalDocumentViewProps) {
  const { locale } = useLanguage();
  const { siteSettings } = useSiteData();
  const isHy = locale === "hy";
  const company = siteSettings.company;

  const isPrivacy = mode === "privacy";

  return (
    <article className="max-w-4xl mx-auto px-6 py-16 sm:py-24">
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-brand-olive-text hover:text-brand-forest transition-colors min-h-[36px]"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>{isHy ? "Վերադառնալ գլխավոր էջ" : "Back to Main Portal"}</span>
        </Link>
      </div>

      <header className="mb-12 pb-8 border-b border-brand-stone-200">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-olive-subtle text-brand-forest text-xs font-semibold mb-4">
          {isPrivacy ? (
            <ShieldCheck className="w-4 h-4 text-brand-olive-text" aria-hidden="true" />
          ) : (
            <Scale className="w-4 h-4 text-brand-olive-text" aria-hidden="true" />
          )}
          <span>
            {isPrivacy
              ? isHy
                ? "Տվյալների Պաշտպանություն"
                : "Data Protection & CV Privacy"
              : isHy
              ? "Իրավական Պայմաններ"
              : "Corporate Service Terms"}
          </span>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-brand-forest tracking-tight leading-tight">
          {isPrivacy
            ? isHy
              ? "Գաղտնիության Քաղաքականություն"
              : "Privacy & Candidate Data Policy"
            : isHy
            ? "Օգտագործման Պայմաններ և Քաղաքականություն"
            : "Terms of Service & Placement Policy"}
        </h1>

        <p className="mt-4 text-sm text-brand-ink-muted leading-relaxed">
          {isHy
            ? `Կիրառելի է՝ ${company.legalName} (${company.address_hy}) · Թարմացվել է՝ Նոյեմբեր 2026`
            : `Effective Entity: ${company.legalName} (${company.address_en}) · Last Updated: November 2026`}
        </p>
      </header>

      {isPrivacy ? (
        <div className="space-y-10 text-brand-ink leading-relaxed">
          <section aria-labelledby="privacy-controller" className="space-y-3">
            <h2 id="privacy-controller" className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "1. Տվյալների պատասխանատու կազմակերպություն" : "1. Data Controller"}
            </h2>
            <p className="text-brand-ink-muted">
              {isHy
                ? `Այս կայքի («deorganica.am» և հարակից ենթադոմենների) միջոցով ներկայացված տվյալների մշակման պատասխանատուն «Դե Օրգանիկա» ՍՊԸ-ն է (${company.address_hy}), Հայաստանի Հանրապետություն:`
                : `Personal information submitted through ${company.legalName} web portals is controlled by ${company.legalName}, registered in the Republic of Armenia (${company.address_en}).`}
            </p>
          </section>

          <section aria-labelledby="privacy-collection" className="space-y-3">
            <h2 id="privacy-collection" className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "2. Հավաքագրվող տեղեկատվություն և CV ֆայլեր" : "2. Information & Candidate Documents We Collect"}
            </h2>
            <p className="text-brand-ink-muted">
              {isHy
                ? "Հարցումների և կադրերի ընտրության ընթացքում մենք հավաքագրում ենք միայն Ձեր կողմից կամավոր ներկայացված տվյալները՝ անուն, կոնտակտային հեռախոսահամար/WhatsApp, էլ. փոստ, ուղևորության պահանջներ, ինչպես նաև թեկնածուների դեպքում՝ մասնագիտական ռեզյումե (PDF/DOC/DOCX) և քաղաքացիության կամ փորձի վերաբերյալ տեղեկություններ:"
                : "We process only information you voluntarily submit through our concierge forms or direct desk correspondence: full name, WhatsApp/phone number, corporate or personal email, travel dates and accommodation preferences, employer staffing requisitions, and candidate CV/resume documents (PDF, DOC, or DOCX)."}
            </p>
          </section>

          <section aria-labelledby="privacy-purpose" className="space-y-3">
            <h2 id="privacy-purpose" className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "3. Տվյալների օգտագործման նպատակը և երրորդ կողմերը" : "3. Purpose of Processing & Controlled Sharing"}
            </h2>
            <p className="text-brand-ink-muted">
              {isHy
                ? "Տվյալները կիրառվում են բացառապես Ձեր տուրիստական ամրագրումների, վիզային խորհրդատվության կամ օրինական աշխատանքի տեղավորման նպատակով: Մենք երբեք չենք վաճառում անձնական տվյալներ: Հավաստիացված գործատուների, հյուրանոցների կամ ավիաընկերությունների հետ տվյալները կիսվում են միայն Ձեր կոնկրետ հարցման կատարման շրջանակներում:"
                : "Submitted details are used solely to prepare travel itineraries, deliver B2B ground-handling quotes, evaluate candidate eligibility for vetted employers, or administer Republic of Armenia work permit filings. We do not sell personal data. Documents are shared strictly with accredited partner employers, hotels, transport providers, or migration authorities necessary to fulfill your request."}
            </p>
          </section>

          <section aria-labelledby="privacy-storage" className="space-y-3">
            <h2 id="privacy-storage" className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "4. Պահպանում, թխուկներ և անվտանգություն" : "4. Security, Cookies & Data Retention"}
            </h2>
            <p className="text-brand-ink-muted">
              {isHy
                ? "Կայքը չի օգտագործում գովազդային հետագծման թխուկներ. տեղային պահոցում պահվում է միայն Ձեր ընտրած լեզուն (EN/HY): Էլեկտրոնային հայտերը փոխանցվում են պաշտպանված HTTPS ուղիներով մեր պաշտոնական գրասենյակային էլ. փոստին և պահպանվում են միայն ծառայության մատուցման և օրենքով սահմանված ժամկետում:"
                : "This website avoids intrusive third-party advertising trackers; only functional language preference (EN/HY) is stored in your browser. Form payloads and CV attachments are transmitted over encrypted TLS (HTTPS) connections to our Yerevan operations desk and retained only as long as required to fulfill active travel, recruitment, or statutory compliance obligations."}
            </p>
          </section>

          <section aria-labelledby="privacy-rights" className="space-y-3">
            <h2 id="privacy-rights" className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "5. Ձեր իրավունքները և տվյալների հեռացում" : "5. Your Rights & Erasure Requests"}
            </h2>
            <p className="text-brand-ink-muted">
              {isHy
                ? "Դուք ցանկացած պահի կարող եք պահանջել տեսնել, ուղղել կամ ամբողջությամբ հեռացնել Ձեր ռեզյումեն և անձնական տվյալները մեր արխիվներից՝ գրելով մեր գրասենյակի էլ. փոստին:"
                : "You may request access to, correction of, or permanent deletion of your CV or inquiry history at any time by writing directly to our Yerevan desk."}
            </p>
          </section>
        </div>
      ) : (
        <div className="space-y-10 text-brand-ink leading-relaxed">
          <section aria-labelledby="terms-scope" className="space-y-3">
            <h2 id="terms-scope" className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "1. Կորպորատիվ ծառայությունների շրջանակը" : "1. Scope of Corporate Operations"}
            </h2>
            <p className="text-brand-ink-muted">
              {isHy
                ? `${company.legalName}-ն իրականացնում է երկու հիմնական ուղղություն՝ Հայաստանում և արտերկրում տուրիստական ու DMC ծառայություններ, ինչպես նաև միջազգային օրինական աշխատանքի տեղավորում և կորպորատիվ կադրային ապահովում:`
                : `${company.legalName} operates two integrated corporate divisions registered in Yerevan, Republic of Armenia: Division 01 (Inbound Armenia Tours, Outbound Holidays, Visa Desk, & B2B DMC Operations) and Division 02 (Ethical International Manpower & Enterprise Work Permit Facilitation).`}
            </p>
          </section>

          <section aria-labelledby="terms-zero-fee" className="space-y-3">
            <h2 id="terms-zero-fee" className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "2. Զրոյական նախնական վճարի քաղաքականություն (Manpower)" : "2. Strict Zero Upfront Candidate Fee Policy"}
            </h2>
            <p className="text-brand-ink-muted">
              {isHy
                ? "Աշխատանքի տեղավորման բաժինը խիստ արգելում է գրանցման, հարցազրույցի կամ նախնական խորհրդատվության որևէ վճար թեկնածուներից: Ծառայության պայմանագրային վճարումը կամ գործատուի հաշվարկը կատարվում է միայն պաշտոնական աշխատանքի հրավերի և օրինական աշխատանքի թույլտվության ձևակերպումից հետո:"
                : "De Organica strictly forbids charging prospective job candidates any registration fee, CV screening fee, or interview fee prior to employment confirmation. Transparent placement agreements become effective solely upon verified written job offer issuance and formal work permit authorization."}
            </p>
          </section>

          <section aria-labelledby="terms-travel" className="space-y-3">
            <h2 id="terms-travel" className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "3. Տուրիստական առաջարկներ և արժեքներ" : "3. Travel Quotes, Bookings & Currency"}
            </h2>
            <p className="text-brand-ink-muted">
              {isHy
                ? "Կայքում ներկայացված տուրիստական ծրագրերը ծառայում են որպես մեկնարկային երթուղիներ: Վերջնական արժեքը, հյուրանոցների հաստատումը և տրանսֆերների ժամանակացույցը հաստատվում են գրավոր պաշտոնական առաջարկով (invoice / booking voucher) և կախված են սեզոնային առկայությունից:"
                : "Published itineraries on our website serve as curated benchmark programs. Final seasonal pricing, hotel allotments, airline schedules, and B2B net ground-handling rates are confirmed exclusively in official written quotation agreements issued by our Yerevan travel desk."}
            </p>
          </section>

          <section aria-labelledby="terms-law" className="space-y-3">
            <h2 id="terms-law" className="font-serif text-2xl font-bold text-brand-forest">
              {isHy ? "4. Կիրառելի իրավունք" : "4. Governing Law & Jurisdiction"}
            </h2>
            <p className="text-brand-ink-muted">
              {isHy
                ? "Սույն պայմանները և բոլոր մատուցվող ծառայությունները կարգավորվում են Հայաստանի Հանրապետության օրենսդրությամբ:"
                : "All corporate agreements, client engagements, travel operations, and recruitment documentation conducted with De Organica LLC are governed by the laws of the Republic of Armenia."}
            </p>
          </section>
        </div>
      )}

      <aside className="mt-14 p-6 sm:p-8 rounded-2xl bg-brand-stone-100 border border-brand-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="font-serif text-lg font-bold text-brand-forest">
            {isHy ? "Իրավական կամ գրասենյակային հարցումներ" : "Compliance & Legal Correspondence"}
          </p>
          <p className="text-sm text-brand-ink-muted">
            {company.legalName} ·{" "}
            <a
              href={`mailto:${company.email}`}
              className="font-mono text-brand-forest underline underline-offset-2 hover:text-brand-olive-text"
            >
              {company.email}
            </a>
          </p>
        </div>
        <Link
          href="/contact"
          className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-forest text-white text-sm font-semibold hover:bg-brand-forest-deep transition-colors shrink-0"
        >
          <Mail className="w-4 h-4 text-brand-olive-onDark" aria-hidden="true" />
          <span>{isHy ? "Կապ հաստատել" : "Contact Yerevan Desk"}</span>
        </Link>
      </aside>
    </article>
  );
}
