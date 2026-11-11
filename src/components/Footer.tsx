"use client";

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { deorganicaConfig } from "@/data/deorganica-content";
import { ShieldCheck, MapPin, Mail, PhoneCall, Sparkles } from "lucide-react";

export function Footer() {
  const { locale } = useLanguage();
  const isHy = locale === "hy";

  return (
    <footer className="bg-brand-forest text-brand-stone-300 pt-16 pb-12 border-t border-brand-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-brand-stone-800">
          {/* Brand & Corporate Overview (Col 1-2) */}
          <div className="lg:col-span-2 space-y-4">
            <Logo inverted />
            <p className="text-xs text-brand-stone-300 leading-relaxed max-w-sm pt-2">
              {isHy
                ? "«Դե Օրգանիկա» ՍՊԸ — Համաշխարհային զբոսաշրջության և միջազգային աշխատուժի շարժունակության կորպորատիվ հարթակ՝ գրանցված Երևանում, Հայաստանի Հանրապետություն:"
                : "De Organica LLC is an officially registered corporate enterprise in Yerevan, Republic of Armenia, operating bespoke travel & tour management and ethical international manpower mobility."}
            </p>

            <div className="pt-2 text-xs text-brand-stone-400 space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-olive-light shrink-0" />
                <span>{isHy ? deorganicaConfig.company.address_hy : deorganicaConfig.company.address_en}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-brand-olive-light shrink-0" />
                <a href={`mailto:${deorganicaConfig.company.email}`} className="hover:text-white transition-colors">
                  {deorganicaConfig.company.email}
                </a>
              </div>
            </div>
          </div>

          {/* Division I: Travel Links (Col 3) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {isHy ? "Զբոսաշրջություն" : "Travel & Tours"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/travel" className="hover:text-white transition-colors">
                  {isHy ? "Մշակութային տուրեր" : "Armenia Cultural Tours"}
                </Link>
              </li>
              <li>
                <Link href="/travel#tours-matrix" className="hover:text-white transition-colors">
                  {isHy ? "Տուրիստական փաթեթներ" : "Featured Tour Packages"}
                </Link>
              </li>
              <li>
                <Link href="/travel#travel-services" className="hover:text-white transition-colors">
                  {isHy ? "Վիզաների աջակցություն" : "Visa & Documentation"}
                </Link>
              </li>
              <li>
                <Link href="/travel#travel-services" className="hover:text-white transition-colors">
                  {isHy ? "Օդանավակայանի տրանսֆեր" : "EVN Airport Transfers"}
                </Link>
              </li>
              <li>
                <Link href="/travel#dmc" className="hover:text-white transition-colors">
                  {isHy ? "B2B DMC Գործընկերություն" : "B2B DMC Net Tariffs"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Division II: Manpower Links (Col 4) */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {isHy ? "Աշխատուժ և Կարիերա" : "Manpower & Careers"}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/manpower" className="hover:text-white transition-colors">
                  {isHy ? "Թափուր աշխատատեղեր" : "Active Job Vacancies"}
                </Link>
              </li>
              <li>
                <Link href="/manpower#manpower-candidates" className="hover:text-white transition-colors">
                  {isHy ? "Ուղարկել ռեզյումե (CV)" : "Submit General CV"}
                </Link>
              </li>
              <li>
                <Link href="/manpower#manpower-candidates" className="hover:text-white transition-colors">
                  {isHy ? "Զրոյական նախնական վճար" : "Pay-After-Job Guarantee"}
                </Link>
              </li>
              <li>
                <Link href="/manpower#manpower-employers" className="hover:text-white transition-colors">
                  {isHy ? "Գործատուներին (B2B Staffing)" : "For Hiring Employers"}
                </Link>
              </li>
              <li>
                <Link href="/manpower#manpower-employers" className="hover:text-white transition-colors">
                  {isHy ? "Աշխատանքի թույլտվություններ" : "Work Permit Compliance"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Language & Provenance (Col 5) */}
          <div className="space-y-4">
            <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">
              {isHy ? "Լեզվի Ընտրություն" : "Language / Լեզու"}
            </h4>
            <LanguageSwitcher />

            <div className="pt-2 text-[11px] text-brand-stone-400 leading-snug">
              <span className="font-semibold text-white block mb-1">
                {isHy ? "ՀՀ Իրավական Գրանցում" : "Republic of Armenia"}
              </span>
              <span>{isHy ? deorganicaConfig.company.registrationStatus_hy : deorganicaConfig.company.registrationStatus_en}</span>
            </div>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-brand-stone-400 gap-4">
          <p>
            © {new Date().getFullYear()} {deorganicaConfig.company.legalName}. All rights reserved.
          </p>

          <p className="max-w-md text-left sm:text-right text-[10px] text-brand-stone-400">
            {isHy
              ? "«Դե Օրգանիկա» ՍՊԸ-ն գործում է թեկնածուների պաշտպանության և էթիկական հավաքագրման միջազգային սկզբունքներով:"
              : "Zero Upfront Candidate Placement Fees · Verified Republic of Armenia Ministry of Labor Work Permits."}
          </p>
        </div>
      </div>
    </footer>
  );
}
