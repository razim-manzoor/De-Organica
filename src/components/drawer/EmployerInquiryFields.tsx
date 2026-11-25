import React from "react";
import type { InvalidFieldKey } from "./drawer-constants";

interface EmployerInquiryFieldsProps {
  section: "top" | "details";
  isHy: boolean;
  companyName: string;
  setCompanyName: (c: string) => void;
  companyNameRef: React.RefObject<HTMLInputElement | null>;
  invalidField: InvalidFieldKey;
  industrySector: string;
  setIndustrySector: (s: string) => void;
  headcountRequired: string;
  setHeadcountRequired: (h: string) => void;
  employerJurisdiction: string;
  setEmployerJurisdiction: (j: string) => void;
  employerUrgency: string;
  setEmployerUrgency: (u: string) => void;
  employerHousing: string;
  setEmployerHousing: (h: string) => void;
}

export function EmployerInquiryFields({
  section,
  isHy,
  companyName,
  setCompanyName,
  companyNameRef,
  invalidField,
  industrySector,
  setIndustrySector,
  headcountRequired,
  setHeadcountRequired,
  employerJurisdiction,
  setEmployerJurisdiction,
  employerUrgency,
  setEmployerUrgency,
  employerHousing,
  setEmployerHousing,
}: EmployerInquiryFieldsProps) {
  if (section === "top") {
    return (
      <div>
        <label
          htmlFor="employerCompanyNameInput"
          className="block text-xs font-semibold text-brand-forest mb-1.5"
        >
          {isHy ? "Ընկերության անվանումը *" : "Company Name *"}
        </label>
        <input
          ref={companyNameRef}
          id="employerCompanyNameInput"
          type="text"
          autoComplete="organization"
          maxLength={200}
          required
          aria-invalid={invalidField === "companyName"}
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder={
            isHy ? "օրինակ՝ Արմենիա Հյուրանոցային Խումբ" : "e.g. Yerevan Construction Group LLC"
          }
          className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border bg-white focus:outline-none focus:ring-2 focus:ring-brand-olive focus:border-transparent text-base sm:text-sm text-brand-ink shadow-sm transition-colors duration-200 ${
            invalidField === "companyName" ? "border-[#B43C30]" : "border-brand-stone-300"
          }`}
        />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="employerIndustryInput"
            className="block text-xs font-semibold text-brand-forest mb-1.5"
          >
            {isHy ? "Արդյունաբերության ոլորտը" : "Industry Sector"}
          </label>
          <input
            id="employerIndustryInput"
            type="text"
            maxLength={160}
            value={industrySector}
            onChange={(e) => setIndustrySector(e.target.value)}
            placeholder={
              isHy
                ? "օրինակ՝ Շինարարություն / Հյուրընկալություն / Լոգիստիկա"
                : "e.g. Construction / Hospitality / Fleet"
            }
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="employerHeadcountInput"
            className="block text-xs font-semibold text-brand-forest mb-1.5"
          >
            {isHy ? "Պահանջվող աշխատակիցների թիվը" : "Required Headcount"}
          </label>
          <input
            id="employerHeadcountInput"
            type="text"
            maxLength={60}
            value={headcountRequired}
            onChange={(e) => setHeadcountRequired(e.target.value)}
            placeholder={isHy ? "օրինակ՝ 5–10 աշխատակից" : "e.g. 5–10 workers"}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Corporate Jurisdiction & Target Timeline */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="employerJurisdictionSelect"
            className="block text-xs font-semibold text-brand-forest mb-1.5"
          >
            {isHy ? "Գրանցման Երկիր" : "Registration Jurisdiction"}
          </label>
          <select
            id="employerJurisdictionSelect"
            value={employerJurisdiction}
            onChange={(e) => setEmployerJurisdiction(e.target.value)}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
          >
            <option value="Armenia (ՀՎՀՀ / TIN)">
              {isHy ? "Հայաստան (ՀՎՀՀ գրանցված ընկերություն)" : "Armenia (ՀՎՀՀ Registered Enterprise)"}
            </option>
            <option value="UAE & GCC Enterprise">
              {isHy ? "ԱՄԷ և Ծոցի երկրների ընկերություն" : "UAE & GCC Corporation"}
            </option>
            <option value="Europe / International">
              {isHy ? "Եվրոպա / Միջազգային ընկերություն" : "Europe / International Business"}
            </option>
          </select>
        </div>

        <div>
          <label
            htmlFor="employerUrgencySelect"
            className="block text-xs font-semibold text-brand-forest mb-1.5"
          >
            {isHy ? "Աշխատանքի Սկիզբ" : "Target Start Date"}
          </label>
          <select
            id="employerUrgencySelect"
            value={employerUrgency}
            onChange={(e) => setEmployerUrgency(e.target.value)}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
          >
            <option value="Urgent (15–25 Business Days Permit SLA)">
              {isHy ? "Շտապ (15–25 աշխ. օր թույլտվություն)" : "Urgent (Within 15–25 Business Days SLA)"}
            </option>
            <option value="Standard (30 Days)">
              {isHy ? "Ստանդարտ խմբաքանակ (30 օր)" : "Standard Batch (30 Days)"}
            </option>
            <option value="Project Base (60+ Days)">
              {isHy ? "Նախագծային ընդլայնում (60+ օր)" : "Project Expansion (60+ Days)"}
            </option>
          </select>
        </div>
      </div>

      {/* Accommodation & Housing Policy */}
      <div>
        <span className="block text-xs font-semibold text-brand-forest mb-1.5">
          {isHy
            ? "Կացարանի Տրամադրում"
            : "Housing Provision"}
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
          {[
            {
              id: "Employer Housing Included",
              label_en: "Housing Provided",
              label_hy: "Կացարանը ներառված է",
            },
            {
              id: "Worker Self-Arranged",
              label_en: "Worker Arranges",
              label_hy: "Աշխատակիցն է հոգում",
            },
            {
              id: "De Organica Assistance Required",
              label_en: "De Organica Assist",
              label_hy: "Անհրաժեշտ է օգնություն",
            },
          ].map((h) => (
            <button
              key={h.id}
              type="button"
              aria-pressed={employerHousing === h.id}
              onClick={() => setEmployerHousing(h.id)}
              className={`min-h-[40px] p-2.5 rounded-xl border text-center transition-colors duration-200 cursor-pointer ${
                employerHousing === h.id
                  ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-sm"
                  : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
              }`}
            >
              <span className="block font-bold leading-tight">
                {isHy ? h.label_hy : h.label_en}
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
