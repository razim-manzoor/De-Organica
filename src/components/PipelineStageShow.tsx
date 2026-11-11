"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import {
  ShieldCheck,
  CheckCircle2,
  FileText,
  Building2,
  Plane,
  Users2,
  Lock,
  ArrowRight,
  Sparkles,
  Clock,
  BadgeCheck,
} from "lucide-react";

interface PipelineStage {
  id: string;
  step: string;
  title_en: string;
  title_hy: string;
  badge_en: string;
  badge_hy: string;
  role_en: string;
  role_hy: string;
  description_en: string;
  description_hy: string;
  safeguards_en: string[];
  safeguards_hy: string[];
  metrics_en: string;
  metrics_hy: string;
}

const PIPELINE_STAGES: PipelineStage[] = [
  {
    id: "stage-1",
    step: "01",
    title_en: "Corporate Employer Requisition",
    title_hy: "Գործատուի պահանջարկի գրանցում",
    badge_en: "Verified Enterprise",
    badge_hy: "Ստուգված գործատու",
    role_en: "For Armenian Enterprises",
    role_hy: "ՀՀ Գործատուներին",
    description_en:
      "Armenian corporate employers register active labor quotas in hospitality, skilled construction, agriculture, or logistics with our Yerevan HR desk.",
    description_hy:
      "Հայաստանի առաջատար ընկերությունները ներկայացնում են թափուր հաստիքների պահանջարկը՝ սահմանելով աշխատավարձը, պայմանները և տեղավորման պահանջները:",
    safeguards_en: [
      "Official Republic of Armenia commercial entity check",
      "Guaranteed monthly wage escrow and contract verification",
      "Safe worker housing and medical insurance compliance",
    ],
    safeguards_hy: [
      "ՀՀ պետական ռեգիստրի իրավաբանական ստուգում",
      "Աշխատավարձի և պայմանագրի պաշտոնական երաշխիք",
      "Ապահով կացարանի և առողջապահական ապահովագրության համապատասխանություն",
    ],
    metrics_en: "2–4 Days Audit",
    metrics_hy: "2–4 Օր Ստուգում",
  },
  {
    id: "stage-2",
    step: "02",
    title_en: "Zero-Fee Candidate Sourcing & Skill Vetting",
    title_hy: "Անվճար ընտրություն և որակավորման ստուգում",
    badge_en: "100% Free for Applicants",
    badge_hy: "100% Անվճար Թեկնածուներին",
    role_en: "For International Candidates",
    role_hy: "Միջազգային Թեկնածուներին",
    description_en:
      "International job seekers undergo thorough technical interviews and credential verification. Under our Ethical Charter, candidates never pay registration or interview fees.",
    description_hy:
      "Թեկնածուները մասնակցում են հարցազրույցի և մասնագիտական ստուգման: Գրանցման կամ դիմումի համար որևէ կանխավճար չի գանձվում:",
    safeguards_en: [
      "Zero registration, interview, or CV submission fees",
      "Structured video interviews and practical trade skill testing",
      "Transparent contingency terms (payable only upon verified job placement)",
    ],
    safeguards_hy: [
      "Զրո նախնական վճար CV-ի ընդունման և հարցազրույցների համար",
      "Տեսահարցազրույցներ և գործնական հմտությունների ստուգում",
      "Վճարում միայն աշխատանքի պաշտոնական հաստատումից հետո",
    ],
    metrics_en: "3–7 Days Matching",
    metrics_hy: "3–7 Օր Ընտրություն",
  },
  {
    id: "stage-3",
    step: "03",
    title_en: "Ministry of Labor Permits & Visa Filing",
    title_hy: "Աշխատանքի թույլտվություն և վիզայի ձևակերպում",
    badge_en: "Legal Ministry Approval",
    badge_hy: "Պաշտոնական Թույլտվություն",
    role_en: "Legal Compliance",
    role_hy: "Իրավական Լիարժեքություն",
    description_en:
      "De Organica's legal team coordinates with the Unified Migration Service and Ministry of Labor of the Republic of Armenia to secure official work permits and entry visas.",
    description_hy:
      "«Դե Օրգանիկա»-ի իրավաբանական թիմը համակարգում է փաստաթղթերի հանձնումը Միասնական միգրացիոն ծառայություն և Աշխատանքի նախարարություն:",
    safeguards_en: [
      "Official Armenian electronic work permit issuance",
      "Pre-arrival consular or eVisa entry clearance",
      "Full compliance with Armenian Migration & Labor Code",
    ],
    safeguards_hy: [
      "ՀՀ պաշտոնական էլեկտրոնային աշխատանքային թույլտվության ստացում",
      "Մուտքի վիզայի նախնական հաստատում",
      "ՀՀ աշխատանքային և միգրացիոն օրենսդրության լիարժեք պահպանում",
    ],
    metrics_en: "Official Government Timeline",
    metrics_hy: "Պետական Գործընթաց",
  },
  {
    id: "stage-4",
    step: "04",
    title_en: "EVN Reception, Housing & Onboarding",
    title_hy: "Դիմավորում Զվարթնոցում և տեղավորում",
    badge_en: "Full Ground Care",
    badge_hy: "Ամբողջական Սպասարկում",
    role_en: "Arrival & Integration",
    role_hy: "Ժամանում և Ադապտացիա",
    description_en:
      "Our ground team greets selected candidates at Zvartnots EVN Airport, arranges dedicated transport, assists with comfortable accommodation, and ensures smooth employer onboarding.",
    description_hy:
      "Մեր թիմը դիմավորում է աշխատակցին Զվարթնոց օդանավակայանում, ապահովում է տրանսֆեր, կացարան և աջակցում է գործատուի մոտ աշխատանքի առաջին օրերին:",
    safeguards_en: [
      "24/7 airport meet & greet with dedicated ground transport",
      "Assistance with SIM cards, local registration, and bank accounts",
      "Dedicated bilingual coordinator for ongoing employer-worker harmony",
    ],
    safeguards_hy: [
      "24/7 դիմավորում օդանավակայանում և տրանսպորտային սպասարկում",
      "Աջակցություն բնակության գրանցման և բանկային հաշիվների բացման հարցում",
      "Երկլեզու կոորդինատորի աջակցություն ամբողջ ժամանակահատվածում",
    ],
    metrics_en: "Day 1 Reception",
    metrics_hy: "Առաջին Օրվանից",
  },
];

export function PipelineStageShow() {
  const { locale } = useLanguage();
  const { openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const isHy = locale === "hy";

  const [activeStageId, setActiveStageId] = useState<string>("stage-2");
  const activeStage =
    PIPELINE_STAGES.find((s) => s.id === activeStageId) || PIPELINE_STAGES[1];

  return (
    <section className="py-20 lg:py-28 bg-brand-stone-50 border-t border-brand-stone-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* StageShow Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-brand-olive" />
              <span>{isHy ? "Հավաքագրման և Վիզայի Գործընթաց" : "Recruitment & Visa Process"}</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-forest tracking-tight mb-4">
              {isHy ? "Ինչպես է Աշխատում՝ Դիմումից Մինչև Ժամանում" : "How It Works: From Application to Arrival"}
            </h2>

            <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
              {isHy
                ? "Թափանցիկ 4-փուլ գործընթաց՝ 0 ֏ կանխավճարով, հմտությունների ստուգմամբ և ՀՀ աշխատանքի օրինական թույլտվությամբ:"
                : "A transparent 4-stage pathway ensuring zero candidate fees, rigorous skill vetting, and official Republic of Armenia work permits."}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <button
              type="button"
              onClick={() => openCandidateDrawer()}
              className="px-4 py-2.5 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep active:scale-95 transition-all shadow-xs cursor-pointer"
            >
              {isHy ? "Ուղարկել CV" : "Submit CV"}
            </button>
            <button
              type="button"
              onClick={() => openEmployerDrawer()}
              className="px-4 py-2.5 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-xs font-semibold hover:bg-brand-stone-100 active:scale-95 transition-all shadow-2xs cursor-pointer"
            >
              {isHy ? "Գործատուներին" : "Hire Staff"}
            </button>
          </div>
        </div>

        {/* StageShow Interactive Bento Framework */}
        <div className="rounded-3xl bg-white border border-brand-stone-200/90 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Step Selector Ribbon (4 Cols) */}
          <div className="lg:col-span-4 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-brand-stone-200 bg-brand-stone-50/50 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-olive block mb-2">
              {isHy ? "01 · Ընտրեք աշխատանքային փուլը" : "01 · Select Pipeline Stage"}
            </span>

            {PIPELINE_STAGES.map((s) => {
              const isSelected = s.id === activeStageId;
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setActiveStageId(s.id)}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? "bg-brand-forest text-white shadow-md ring-1 ring-brand-forest/30"
                      : "bg-white text-brand-forest border border-brand-stone-200/80 hover:bg-white hover:border-brand-olive/40 active:scale-98"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-serif text-xs font-bold ${
                        isSelected ? "bg-brand-olive text-white" : "bg-brand-stone-100 text-brand-forest border border-brand-stone-200"
                      }`}
                    >
                      {s.step}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold leading-tight">
                        {isHy ? s.title_hy : s.title_en}
                      </h4>
                      <span
                        className={`text-[10px] block mt-0.5 ${
                          isSelected ? "text-brand-olive-light" : "text-brand-ink-muted"
                        }`}
                      >
                        {isHy ? s.role_hy : s.role_en}
                      </span>
                    </div>
                  </div>

                  <ArrowRight
                    className={`w-4 h-4 transition-transform ${
                      isSelected ? "text-brand-olive-light translate-x-0.5" : "text-brand-stone-400 opacity-50"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Interactive Stage Detail Body (8 Cols) */}
          <div className="lg:col-span-8 p-8 sm:p-10 flex flex-col justify-between bg-white space-y-8">
            <div>
              {/* Header Badges */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-6 border-b border-brand-stone-100">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-olive-subtle text-brand-forest border border-brand-olive/30">
                    {isHy ? `Փուլ ${activeStage.step}` : `Stage ${activeStage.step}`} · {isHy ? activeStage.badge_hy : activeStage.badge_en}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-forest bg-brand-stone-100 px-3 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-brand-olive" />
                  <span>{isHy ? activeStage.metrics_hy : activeStage.metrics_en}</span>
                </div>
              </div>

              {/* Title & Narrative Description */}
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest mb-3">
                {isHy ? activeStage.title_hy : activeStage.title_en}
              </h3>

              <p className="text-sm text-brand-ink-muted leading-relaxed mb-8 max-w-2xl">
                {isHy ? activeStage.description_hy : activeStage.description_en}
              </p>

              {/* Safeguards Checklist */}
              <div className="space-y-3 p-6 rounded-2xl bg-brand-stone-50 border border-brand-stone-200/80">
                <span className="text-[11px] font-bold uppercase tracking-wider text-brand-forest block mb-2">
                  {isHy ? "Իրավական Երաշխիքներ և Պաշտպանություն" : "Legal Standards & Candidate Protections"}
                </span>

                {(isHy ? activeStage.safeguards_hy : activeStage.safeguards_en).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-brand-ink">
                    <CheckCircle2 className="w-4 h-4 text-brand-olive shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="pt-6 border-t border-brand-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-brand-ink-muted">
                <ShieldCheck className="w-4 h-4 text-brand-olive shrink-0" />
                <span>
                  {isHy
                    ? "0 ՀՀ դրամ կանխավճար · ՀՀ պաշտոնական աշխատանքի թույլտվություններ"
                    : "Zero Upfront Placement Fees · Republic of Armenia Work Permits"}
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => openCandidateDrawer()}
                  className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl bg-brand-forest text-white text-xs font-semibold hover:bg-brand-forest-deep active:scale-95 transition-all cursor-pointer shadow-xs text-center"
                >
                  {isHy ? "Ուղարկել ռեզյումե (CV)" : "Submit Candidate CV"}
                </button>
                <button
                  type="button"
                  onClick={() => openEmployerDrawer()}
                  className="flex-1 sm:flex-none py-2.5 px-4 rounded-xl border border-brand-stone-300 bg-white text-brand-forest text-xs font-semibold hover:bg-brand-stone-100 active:scale-95 transition-all cursor-pointer shadow-2xs text-center"
                >
                  {isHy ? "Հայտ գործատուներին" : "Request Manpower"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
