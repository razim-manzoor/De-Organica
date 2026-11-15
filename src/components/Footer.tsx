"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { useSiteData } from "@/context/SiteDataContext";
import { MapPin, Mail, Phone, ShieldCheck, ArrowUpRight } from "lucide-react";

export function Footer() {
  const { locale } = useLanguage();
  const { openTravelDrawer, openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const { siteSettings } = useSiteData();
  const company = siteSettings.company;
  const isHy = locale === "hy";
  const currentYear = 2026;

  return (
    <footer className="bg-brand-forest text-white border-t border-brand-forest-deep mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-18">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/15">
          {/* Column 1: Institutional Crest */}
          <div className="lg:col-span-4 space-y-5">
            <Link href="/" className="inline-block rounded-lg">
              <Logo variant="horizontal" inverted />
            </Link>

            <p className="text-sm text-brand-stone-200 leading-relaxed max-w-sm">
              {isHy
                ? siteSettings.footerDescription_hy
                : siteSettings.footerDescription_en}
            </p>

            <div className="pt-2 space-y-1.5 text-xs text-brand-stone-200">
              <div className="flex items-center gap-2 font-semibold text-brand-olive-onDark">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>
                  {isHy
                    ? company.registrationStatus_hy
                    : company.registrationStatus_en}
                </span>
              </div>
            </div>
          </div>

          {/* Column 2: Travel & Tours */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-serif text-base font-bold text-brand-olive-onDark tracking-wide">
              {isHy ? "Տուրիզմ և Տուրեր" : "Travel & Tours"}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-brand-stone-200">
              <li>
                <Link href="/travel" className="hover:text-white transition-colors inline-block py-0.5">
                  {isHy ? "Տուրիստական Բաժին" : "Travel Overview"}
                </Link>
              </li>
              <li>
                <Link href="/travel#tours" className="hover:text-white transition-colors inline-block py-0.5">
                  {isHy ? "Հայաստանի Տուրեր" : "Armenia Tours"}
                </Link>
              </li>
              <li>
                <Link href="/travel#services" className="hover:text-white transition-colors inline-block py-0.5">
                  {isHy ? "Ծառայություններ" : "Ground Services"}
                </Link>
              </li>
              <li>
                <Link href="/travel#dmc" className="hover:text-white transition-colors inline-block py-0.5">
                  {isHy ? "B2B DMC Գործընկերներ" : "B2B DMC Partners"}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openTravelDrawer("General Travel Inquiry")}
                  className="hover:text-white text-brand-olive-onDark font-semibold inline-flex items-center gap-1 py-0.5 cursor-pointer"
                >
                  <span>{isHy ? "Հարցում Տուրի Համար" : "Plan Custom Trip"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Manpower & Recruitment */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-base font-bold text-brand-olive-onDark tracking-wide">
              {isHy ? "Միջազգային Կադրեր" : "International Manpower"}
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm text-brand-stone-200">
              <li>
                <Link href="/manpower" className="hover:text-white transition-colors inline-block py-0.5">
                  {isHy ? "Կադրերի Բաժին" : "Manpower Overview"}
                </Link>
              </li>
              <li>
                <Link
                  href="/manpower#manpower-candidates"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  {isHy ? "Թափուր Հաստիքներ" : "Active Vacancies"}
                </Link>
              </li>
              <li>
                <Link
                  href="/manpower#manpower-employers"
                  className="hover:text-white transition-colors inline-block py-0.5"
                >
                  {isHy ? "Գործատուների Համար" : "Enterprise Staffing"}
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openCandidateDrawer()}
                  className="hover:text-white text-brand-olive-onDark font-semibold inline-flex items-center gap-1 py-0.5 cursor-pointer"
                >
                  <span>{isHy ? "Ուղարկել CV / Ռեզյումե" : "Submit CV / Resume"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={openEmployerDrawer}
                  className="hover:text-white transition-colors inline-flex items-center gap-1 py-0.5 cursor-pointer"
                >
                  <span>{isHy ? "Պատվիրել Աշխատուժ" : "Hire International Staff"}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Yerevan Headquarters */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="font-serif text-base font-bold text-brand-olive-onDark tracking-wide">
              {isHy ? "Երևանի Գլխավոր Դեսկ" : "Yerevan Operations Desk"}
            </h3>
            <div className="space-y-3 text-xs sm:text-sm text-brand-stone-200">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-olive-onDark shrink-0 mt-1" />
                <span>
                  {isHy ? company.address_hy : company.address_en}
                </span>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-brand-olive-onDark shrink-0 mt-1" />
                <a
                  href={`tel:${company.phoneYerevanDesk.replace(/\s+/g, "")}`}
                  className="font-mono hover:text-white underline underline-offset-2 transition-colors"
                >
                  {company.phoneYerevanDesk}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-brand-olive-onDark shrink-0 mt-1" />
                <a
                  href={`mailto:${company.email}`}
                  className="font-mono hover:text-white underline underline-offset-2 transition-colors break-all"
                >
                  {company.email}
                </a>
              </div>

              <p className="text-xs text-brand-stone-200 pt-1">
                {isHy
                  ? company.workingHours_hy
                  : company.workingHours_en}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Compliance Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-brand-stone-200">
          <p>
            {isHy
              ? `© ${currentYear} «Դե Օրգանիկա» ՍՊԸ: Բոլոր իրավունքները պաշտպանված են:`
              : `© ${currentYear} ${company.legalName}. All rights reserved.`}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-4">
            <Link href="/privacy" className="hover:text-white underline underline-offset-2">
              {isHy ? "Գաղտնիություն" : "Privacy Policy"}
            </Link>
            <Link href="/terms" className="hover:text-white underline underline-offset-2">
              {isHy ? "Պայմաններ" : "Terms of Service"}
            </Link>
            <Link href="/contact" className="hover:text-white underline underline-offset-2">
              {isHy ? "Կապ և Գրասենյակ" : "Contact & Desk"}
            </Link>
            <span className="text-brand-olive-onDark font-medium">
              {isHy
                ? "Տուրիզմ և ՀՀ Աշխատանքի Թույլտվություններ"
                : "Licensed Tours & RA Work Permit Compliance"}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
