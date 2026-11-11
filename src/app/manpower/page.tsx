import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ManpowerHero } from "@/components/ManpowerHero";
import { PipelineStageShow } from "@/components/PipelineStageShow";
import { ManpowerCandidateHub } from "@/components/ManpowerCandidateHub";
import { ManpowerEmployerSection } from "@/components/ManpowerEmployerSection";
import { CorporateFoundation } from "@/components/CorporateFoundation";
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

        {/* Corporate Employers: Sourcing, Screening, and Deployment */}
        <div id="employers">
          <ManpowerEmployerSection />
        </div>

        {/* Institutional Foundation */}
        <CorporateFoundation />

        {/* Direct Contact Desk */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
