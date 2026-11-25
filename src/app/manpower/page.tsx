import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ManpowerHero } from "@/components/ManpowerHero";
import { PipelineStageShow } from "@/components/PipelineStageShow";
import { ManpowerCandidateHub } from "@/components/ManpowerCandidateHub";
import { ManpowerComplianceBanner } from "@/components/ManpowerComplianceBanner";
import { ManpowerEmployerSection } from "@/components/ManpowerEmployerSection";
import { ManpowerFaqSection } from "@/components/ManpowerFaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import {
  getContactPageContent,
  getFaqs,
  getJobVacancies,
  getManpowerPageContent,
} from "@/sanity/lib/fetch";

export const revalidate = 900;

export async function generateMetadata(): Promise<Metadata> {
  const manpowerPage = await getManpowerPageContent();
  const title =
    manpowerPage.seo?.seoTitle ||
    "De Organica Manpower · Armenia Recruitment & Enterprise Staffing";
  const description =
    manpowerPage.seo?.seoDescription ||
    "Verified international talent supply and recruitment for Armenia. Direct placement with verified employers, legal Ministry of Labor work permits, and B2B corporate staffing.";

  const ogImage = manpowerPage.seo?.ogImage || "/images/og-deorganica.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: "/manpower",
    },
    openGraph: {
      title,
      description,
      url: "https://deorganica.am/manpower",
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function ManpowerPage() {
  const [manpowerPage, vacancies, faqs, contactContent] = await Promise.all([
    getManpowerPageContent(),
    getJobVacancies(),
    getFaqs("manpower"),
    getContactPageContent(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://deorganica.am/" },
          { "@type": "ListItem", position: 2, name: "Manpower & Careers", item: "https://deorganica.am/manpower" },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q_en,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a_en,
          },
        })),
      },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main id="main-content" className="flex-grow">
        {/* Dedicated Manpower & Careers Hero */}
        <ManpowerHero content={manpowerPage.hero} />

        {/* StageShow Interactive Ethical Relocation Pipeline */}
        <PipelineStageShow content={manpowerPage.pipelineStageShow} />

        {/* Candidate Hub: Ethical Charter, 4-Step Pathway, Vacancies & CV Drop */}
        <ManpowerCandidateHub
          content={manpowerPage.candidateHub}
          vacancies={vacancies}
        />

        {/* High-Contrast Institutional Compliance & Telemetry Band */}
        <ManpowerComplianceBanner content={manpowerPage.complianceBanner} />

        {/* Corporate Employers: Sourcing, Screening, and Deployment */}
        <ManpowerEmployerSection content={manpowerPage.employerSection} />

        {/* Regulatory Compliance & Labor Standards FAQ */}
        <ManpowerFaqSection faqs={faqs} header={manpowerPage.faqHeader} />

        {/* Direct Contact Desk (Manpower Specific) */}
        <ContactSection variant="manpower" content={contactContent} />
      </main>
      <Footer />
    </div>
  );
}
