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

export const metadata: Metadata = {
  title: "De Organica Manpower · International Recruitment & B2B Staffing",
  description:
    "Verified international talent supply and recruitment for Armenia. Zero upfront fees for candidates, pay-after-job guarantee, legal Ministry of Labor work permits, and B2B corporate staffing.",
};

export default function ManpowerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Dedicated Manpower & Careers Hero */}
        <ManpowerHero />

        {/* StageShow Interactive Ethical Relocation Pipeline */}
        <PipelineStageShow />

        {/* Candidate Hub: Ethical Charter, 4-Step Pathway, Vacancies & CV Drop */}
        <ManpowerCandidateHub />

        {/* High-Contrast Institutional Compliance & Telemetry Band */}
        <ManpowerComplianceBanner />

        {/* Corporate Employers: Sourcing, Screening, and Deployment */}
        <ManpowerEmployerSection />

        {/* Regulatory Compliance & Labor Standards FAQ */}
        <ManpowerFaqSection />

        {/* Direct Contact Desk (Manpower Specific) */}
        <ContactSection variant="manpower" />
      </main>
      <Footer />
    </div>
  );
}
