"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { useDrawer } from "@/context/DrawerContext";
import { ChevronDown, HelpCircle, MessageCircle, ShieldCheck } from "lucide-react";
import { buildWhatsAppUrl, buildCandidateWhatsAppMessage } from "@/lib/whatsapp";

interface FaqItem {
  q_en: string;
  q_hy: string;
  a_en: string;
  a_hy: string;
  target: "candidate" | "employer" | "both";
}

const MANPOWER_FAQS: FaqItem[] = [
  {
    target: "candidate",
    q_en: "How does the Zero Upfront Fee guarantee protect international candidates?",
    q_hy: "Ինչպե՞ս է 0.00 AMD նախնական վճարի երաշխիքը պաշտպանում միջազգային թեկնածուներին:",
    a_en:
      "Under our strict ethical charter, submitting your CV, qualification assessment, and employer video interviews are 100% free of charge. Candidates never pay a single Dram in advance. Placement terms apply strictly upon verified job contract signing and official Ministry of Labor work permit clearance.",
    a_hy:
      "Մեր էթիկական կանոնադրության համաձայն՝ ռեզյումեի հանձնումը, հմտությունների ստուգումը և գործատուի հետ հարցազրույցները 100% անվճար են: Թեկնածուն երբեք չի վճարում որևէ կանխավճար: Պայմանները գործում են միայն պաշտոնական աշխատանքային հրավերի և ՀՀ օրինական աշխատանքի թույլտվության ձևակերպումից հետո:",
  },
  {
    target: "both",
    q_en: "How long does the legal work permit and residence card process take in Armenia?",
    q_hy: "Որքա՞ն ժամանակ է պահանջվում ՀՀ աշխատանքի թույլտվության և կացության քարտի ձևակերպման համար:",
    a_en:
      "The legal immigration process is handled via the Unified Migration Service under the Ministry of Internal Affairs and the Ministry of Labor and Social Affairs of the Republic of Armenia. Standard processing timelines range from 20 to 35 business days from dossier submission to permit issuance.",
    a_hy:
      "Իրավական գործընթացն իրականացվում է ՀՀ միգրացիոն ծառայության և Աշխատանքի և սոցիալական հարցերի նախարարության միջոցով: Փաստաթղթերի ներկայացումից մինչև աշխատանքի թույլտվության և կացության քարտի տրամադրումը տևում է միջինում 20-ից 35 աշխատանքային օր:",
  },
  {
    target: "employer",
    q_en: "What is the 30-Day Employer Replacement Warranty for enterprise hires?",
    q_hy: "Ի՞նչ է իրենից ներկայացնում գործատուների համար գործող 30-օրյա փոխարինման երաշխիքը:",
    a_en:
      "We stand behind the quality of our vetted talent. If a deployed candidate fails to satisfy the technical competencies or work attendance expectations outlined in the job description within their first 30 days of employment, De Organica provides an expedited replacement candidate at zero additional agency placement charge.",
    a_hy:
      "Մենք երաշխավորում ենք ընտրված մասնագետների որակը: Եթե տեղավորված աշխատակիցը փորձաշրջանի առաջին 30 օրվա ընթացքում չի համապատասխանում պահանջներին, «Դե Օրգանիկա»-ն տրամադրում է նոր որակավորված թեկնածու՝ առանց որևէ հավելյալ վճարի:",
  },
  {
    target: "candidate",
    q_en: "How are worker wages paid, and what taxes/social insurance apply in Armenia?",
    q_hy: "Ինչպե՞ս են վճարվում աշխատավարձերը և ի՞նչ հարկեր են գործում Հայաստանում:",
    a_en:
      "All salaries are legally disbursed via official Armenian bank account transfer in Armenian Dram (AMD). Employers must provide formal pay slips showing compliant income tax and social insurance deductions, which entitle workers to legal medical coverage and workplace protections under the RA Labor Code.",
    a_hy:
      "Բոլոր աշխատավարձերը վճարվում են բացառապես անկանխիկ՝ հայաստանյան բանկային հաշիվներին ՀՀ դրամով (AMD): Գործատուն կատարում է օրենքով սահմանված հարկային և սոցիալական վճարումները, ինչն ապահովում է բժշկական ապահովագրություն և աշխատանքային իրավունքների պաշտպանություն:",
  },
  {
    target: "both",
    q_en: "Does De Organica arrange Zvartnots airport reception and initial accommodation?",
    q_hy: "Արդյո՞ք «Դե Օրգանիկա»-ն ապահովում է դիմավորում օդանավակայանում և կացարան:",
    a_en:
      "Yes. Every international deployment includes end-to-end ground care: 24/7 airport reception at Zvartnots International Airport (EVN), direct transport to pre-vetted corporate staff quarters or apartments, local SIM card allocation, and registration with municipal authorities.",
    a_hy:
      "Այո: Յուրաքանչյուր միջազգային աշխատակցի համար գործում է լիարժեք ընդունելության ծրագիր. 24/7 դիմավորում Զվարթնոց օդանավակայանում, տեղափոխում կացարան, տեղական SIM քարտի տրամադրում և պաշտոնական հաշվառում համապատասխան մարմիններում:",
  },
];

export function ManpowerFaqSection() {
  const { locale } = useLanguage();
  const { openCandidateDrawer, openEmployerDrawer } = useDrawer();
  const isHy = locale === "hy";

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const handleWhatsAppInquiry = () => {
    const msg = buildCandidateWhatsAppMessage({
      role: "Manpower Policy Inquiry",
      notes: "Hello De Organica HR team, I have questions regarding work permits, visa clearance timelines, or employer hiring terms.",
    });
    window.open(buildWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20 lg:py-28 bg-brand-stone-50 border-t border-brand-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive mb-3">
            <ShieldCheck className="w-4 h-4 text-brand-olive" />
            <span>{isHy ? "Իրավական Պաշտպանություն և Կանոնադրություն" : "Regulatory Compliance & Manpower FAQ"}</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest tracking-tight mb-4">
            {isHy ? "Հաճախ Տրվող Հարցեր և Օրենսդրական Կարգավորումներ" : "Frequently Asked Questions & Labor Standards"}
          </h2>
          <p className="text-sm text-brand-ink-muted max-w-2xl mx-auto leading-relaxed">
            {isHy
              ? "Թեկնածուների իրավունքների պաշտպանություն, աշխատանքի թույլտվությունների ժամկետներ և կորպորատիվ գործատուների երաշխիքներ:"
              : "Clear answers on zero upfront fee contingency, Ministry of Labor permit timelines, AMD banking, and our 30-day replacement warranty."}
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {MANPOWER_FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-brand-stone-200/90 overflow-hidden transition-all duration-200 shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-brand-stone-50/70 transition-colors"
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-brand-forest leading-snug">
                    {isHy ? faq.q_hy : faq.q_en}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-200 ${
                      isOpen
                        ? "bg-brand-forest text-white border-brand-forest rotate-180"
                        : "bg-brand-stone-100 text-brand-forest border-brand-stone-200"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 pt-1 text-xs sm:text-sm text-brand-ink-muted leading-relaxed border-t border-brand-stone-100 font-sans">
                    {isHy ? faq.a_hy : faq.a_en}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Fast Action Prompt */}
        <div className="mt-12 p-6 rounded-2xl bg-white border border-brand-stone-200 text-center flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xs">
          <div className="text-left">
            <span className="text-xs font-bold text-brand-forest block">
              {isHy ? "Հարցեր ունե՞ք ՀՀ աշխատանքային թույլտվությունների վերաբերյալ:" : "Have questions on RA work quotas or candidate screening?"}
            </span>
            <span className="text-xs text-brand-ink-muted">
              {isHy ? "Մեր իրավական և HR թիմը պատասխանում է 4 աշխատանքային ժամում:" : "Direct access to our Yerevan legal and recruitment desks."}
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>
            <button
              type="button"
              onClick={() => openCandidateDrawer()}
              className="px-4 py-2.5 rounded-xl bg-brand-forest hover:bg-brand-forest-deep text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              {isHy ? "Ուղարկել CV" : "Drop CV"}
            </button>
            <button
              type="button"
              onClick={() => openEmployerDrawer()}
              className="px-4 py-2.5 rounded-xl bg-brand-stone-100 hover:bg-brand-stone-200 text-brand-forest text-xs font-semibold transition-colors cursor-pointer"
            >
              {isHy ? "Գործատու" : "Hire Staff"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
