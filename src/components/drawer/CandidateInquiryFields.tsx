import React, { useState } from "react";
import { Briefcase, Upload, FileText, Trash2 } from "lucide-react";
import type { InvalidFieldKey } from "./drawer-constants";

interface CandidateInquiryFieldsProps {
  isHy: boolean;
  nationality: string;
  setNationality: (n: string) => void;
  currentCountry: string;
  setCurrentCountry: (c: string) => void;
  targetRole: string;
  setTargetRole: (r: string) => void;
  isChangingRole: boolean;
  setIsChangingRole: (b: boolean) => void;
  targetRoleRef: React.RefObject<HTMLInputElement | null>;
  invalidField: InvalidFieldKey;
  cvFile: File | null;
  setCvFile: (f: File | null) => void;
  handleCvFileChange: (file: File | null) => void;
  experienceLevel: string;
  setExperienceLevel: (exp: string) => void;
  primaryLanguage: string;
  setPrimaryLanguage: (l: string) => void;
  candidateStatus: string;
  setCandidateStatus: (s: string) => void;
  candidateConsent: boolean;
  setCandidateConsent: (c: boolean) => void;
  consentRef: React.RefObject<HTMLInputElement | null>;
}

export function CandidateInquiryFields({
  isHy,
  nationality,
  setNationality,
  currentCountry,
  setCurrentCountry,
  targetRole,
  setTargetRole,
  isChangingRole,
  setIsChangingRole,
  targetRoleRef,
  invalidField,
  cvFile,
  setCvFile,
  handleCvFileChange,
  experienceLevel,
  setExperienceLevel,
  primaryLanguage,
  setPrimaryLanguage,
  candidateStatus,
  setCandidateStatus,
  candidateConsent,
  setCandidateConsent,
  consentRef,
}: CandidateInquiryFieldsProps) {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="candidateNationalityInput"
            className="block text-xs font-semibold text-brand-forest mb-1.5"
          >
            {isHy ? "Քաղաքացիություն" : "Nationality"}
          </label>
          <input
            id="candidateNationalityInput"
            type="text"
            autoComplete="country-name"
            maxLength={120}
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            placeholder={isHy ? "օրինակ՝ ՀՀ քաղաքացի, Վրաստան" : "e.g. Georgia, Armenia, International"}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="candidateCountryInput"
            className="block text-xs font-semibold text-brand-forest mb-1.5"
          >
            {isHy ? "Ներկայիս երկիրը" : "Current Country of Residence"}
          </label>
          <input
            id="candidateCountryInput"
            type="text"
            autoComplete="country-name"
            maxLength={120}
            value={currentCountry}
            onChange={(e) => setCurrentCountry(e.target.value)}
            placeholder={isHy ? "օրինակ՝ Հայաստան, ԱՄԷ, Վրաստան" : "e.g. UAE / Armenia / Georgia / Poland"}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
          />
        </div>
      </div>

      {targetRole && !isChangingRole ? (
        <div className="p-3.5 rounded-2xl bg-brand-stone-100 border border-brand-stone-200/90 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-forest text-brand-olive-onDark flex items-center justify-center shrink-0 shadow-sm">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand-olive-text block">
                {isHy ? "Հայցվող Պաշտոն" : "Applied Position"}
              </span>
              <span className="text-sm font-serif font-bold text-brand-forest block leading-snug">
                {targetRole}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsChangingRole(true)}
            className="text-xs font-semibold text-brand-olive-text hover:text-brand-forest transition-colors underline cursor-pointer shrink-0 ml-2 px-2 py-1"
          >
            {isHy ? "Փոխել" : "Change"}
          </button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="candidateTargetRoleInput"
              className="text-xs font-semibold text-brand-forest"
            >
              {isHy ? "Ցանկալի պաշտոնը *" : "Target Role *"}
            </label>
            {targetRole && (
              <button
                type="button"
                onClick={() => setIsChangingRole(false)}
                className="text-xs text-brand-olive-text font-semibold underline cursor-pointer"
              >
                {isHy ? "Պահպանել" : "Keep Current"}
              </button>
            )}
          </div>
          <input
            ref={targetRoleRef}
            id="candidateTargetRoleInput"
            type="text"
            maxLength={200}
            required
            aria-invalid={invalidField === "targetRole"}
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            placeholder="e.g. Specialty Line Cook / Heavy Machinery Operator / Driver"
            className={`w-full min-h-[44px] px-4 py-2.5 rounded-xl border bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none ${
              invalidField === "targetRole" ? "border-[#B43C30]" : "border-brand-stone-300"
            }`}
          />
        </div>
      )}

      {/* CV File Upload */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="cvUploadInput"
            className="text-xs font-semibold text-brand-forest"
          >
            {isHy ? "Կցել Ռեզյումե (CV / Resume)" : "Attach CV / Resume (PDF / DOCX)"}
          </label>
          <span className="text-xs text-brand-ink-subtle">Max 4 MB</span>
        </div>
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const file = e.dataTransfer.files?.[0] ?? null;
            if (file) handleCvFileChange(file);
          }}
          className={`relative border-2 border-dashed rounded-xl p-4 text-center transition-all shadow-sm ${
            isDragging
              ? "border-brand-forest bg-brand-olive-subtle/50 scale-[1.01]"
              : invalidField === "cvFile"
              ? "border-[#B43C30] bg-[#FDF2F0]"
              : "border-brand-stone-300 hover:border-brand-olive-dark bg-brand-stone-100/60"
          }`}
        >
          <input
            id="cvUploadInput"
            type="file"
            accept=".pdf,.doc,.docx"
            aria-invalid={invalidField === "cvFile"}
            onChange={(e) => {
              const selected = e.target.files?.[0] ?? null;
              handleCvFileChange(selected);
            }}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="flex items-center justify-center gap-2 text-xs text-brand-ink-muted">
            {cvFile ? (
              <div className="flex items-center gap-2.5 relative z-10 min-w-0">
                <FileText className="w-5 h-5 text-brand-olive-text shrink-0" />
                <div className="truncate text-left">
                  <span className="font-semibold text-brand-forest truncate block max-w-[200px] sm:max-w-[260px]">
                    {cvFile.name}
                  </span>
                  <span className="text-[11px] text-brand-ink-subtle font-mono block">
                    {(cvFile.size / (1024 * 1024)).toFixed(2)} MB
                  </span>
                </div>
                <button
                  type="button"
                  aria-label={isHy ? "Հեռացնել կցված ֆայլը" : "Remove attached resume"}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCvFile(null);
                  }}
                  className="min-w-[32px] min-h-[32px] flex items-center justify-center rounded-full text-brand-ink-subtle hover:text-[#B43C30] transition-colors cursor-pointer shrink-0 ml-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-1.5 py-1">
                <Upload className="w-5 h-5 text-brand-stone-600" />
                <span className="font-medium text-brand-forest">
                  {isHy ? "Սեղմեք ֆայլ ընտրելու համար" : "Click or drag resume file here"}
                </span>
                <span className="text-xs text-brand-ink-subtle">
                  Supports PDF, DOC, DOCX
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Professional Experience Level */}
      <div>
        <span className="block text-xs font-semibold text-brand-forest mb-1.5">
          {isHy ? "Աշխատանքային փորձի տևողությունը" : "Years of Professional Experience"}
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
          {[
            { id: "1–2 Years", label_en: "1–2 Yrs", label_hy: "1–2 Տարի" },
            { id: "3–5 Years", label_en: "3–5 Yrs", label_hy: "3–5 Տարի" },
            { id: "5+ Years", label_en: "5+ Yrs", label_hy: "5+ Տարի" },
            { id: "Entry Level", label_en: "Entry", label_hy: "Սկսնակ" },
          ].map((exp) => (
            <button
              key={exp.id}
              type="button"
              aria-pressed={experienceLevel === exp.id}
              onClick={() => setExperienceLevel(exp.id)}
              className={`min-h-[40px] py-2 px-1 rounded-xl border text-center transition-colors duration-200 cursor-pointer ${
                experienceLevel === exp.id
                  ? "bg-brand-forest text-white border-brand-forest font-semibold shadow-sm"
                  : "bg-white border-brand-stone-200 text-brand-ink-muted hover:border-brand-olive/50"
              }`}
            >
              <span className="block font-bold leading-tight text-xs">
                {isHy ? exp.label_hy : exp.label_en}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Primary Working Language & Mobility Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="candidateLangSelect"
            className="block text-xs font-semibold text-brand-forest mb-1.5"
          >
            {isHy ? "Հիմնական լեզուն" : "Primary Language"}
          </label>
          <select
            id="candidateLangSelect"
            value={primaryLanguage}
            onChange={(e) => setPrimaryLanguage(e.target.value)}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
          >
            <option value="English Conversational">
              English (Conversational / Fluent)
            </option>
            <option value="Russian Fluent">Russian (Ռուսերեն - Fluent)</option>
            <option value="Basic Armenian">Armenian (Հայերեն - Basic/Learning)</option>
            <option value="Arabic">Arabic (العربية)</option>
            <option value="Hindi / Urdu">Hindi / Urdu</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="candidateMobilitySelect"
            className="block text-xs font-semibold text-brand-forest mb-1.5"
          >
            {isHy ? "Տեղափոխման պատրաստվածություն" : "Relocation Availability"}
          </label>
          <select
            id="candidateMobilitySelect"
            value={candidateStatus}
            onChange={(e) => setCandidateStatus(e.target.value)}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-base sm:text-sm text-brand-ink shadow-sm focus:ring-2 focus:ring-brand-olive focus:border-transparent focus:outline-none"
          >
            <option value="In Home Country (Ready for Visa)">
              In Home Country (Ready for Visa Filing)
            </option>
            <option value="Currently in Armenia">Currently in Armenia (Active Stay)</option>
            <option value="Working in UAE / Gulf">
              Working in UAE / GCC (Ready to Relocate)
            </option>
          </select>
        </div>
      </div>

      {/* Candidate Legal Placement Consent Checkbox */}
      <div
        className={`p-3.5 rounded-2xl border shadow-sm ${
          invalidField === "consent"
            ? "bg-[#FDF2F0] border-[#B43C30]"
            : "bg-brand-olive-subtle/80 border-brand-olive/35"
        }`}
      >
        <label htmlFor="candidateConsentCheckbox" className="flex items-start gap-3 cursor-pointer">
          <input
            ref={consentRef}
            id="candidateConsentCheckbox"
            type="checkbox"
            aria-invalid={invalidField === "consent"}
            checked={candidateConsent}
            onChange={(e) => setCandidateConsent(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded border-brand-stone-400 text-brand-forest focus:ring-brand-olive cursor-pointer"
          />
          <div className="text-xs">
            <span className="font-bold text-brand-forest block">
              {isHy
                ? "Օրինական Աշխատանքի Տեղավորման և Վիզայի Պայմանների Համաձայնություն"
                : "Verified Placement & Work Permit Terms Consent"}
            </span>
            <span className="text-brand-ink-muted leading-relaxed block mt-0.5">
              {isHy
                ? "Հաստատում եմ ներկայացված տվյալների և փաստաթղթերի իսկությունը: Հասկանում եմ, որ աշխատանքի տեղավորումը և ՀՀ օրինական աշխատանքի թույլտվության ձևակերպումն իրականացվում են պաշտոնական աշխատանքի հրավերի հիման վրա:"
                : "I confirm that all submitted details and documents are authentic. I understand that candidate placement and legal Republic of Armenia work permit processing proceed strictly upon verified employer job offer."}
            </span>
          </div>
        </label>
      </div>
    </>
  );
}
