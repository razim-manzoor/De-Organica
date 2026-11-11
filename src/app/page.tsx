import React from "react";
import { Header } from "@/components/Header";
import { HeroDualGateway } from "@/components/HeroDualGateway";
import { TravelServicesMatrix } from "@/components/TravelServicesMatrix";
import { FeaturedToursGrid } from "@/components/FeaturedToursGrid";
import { DmcPartnerSection } from "@/components/DmcPartnerSection";
import { ManpowerCandidateHub } from "@/components/ManpowerCandidateHub";
import { ManpowerEmployerSection } from "@/components/ManpowerEmployerSection";
import { CorporateFoundation } from "@/components/CorporateFoundation";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <HeroDualGateway />
        <TravelServicesMatrix />
        <FeaturedToursGrid />
        <DmcPartnerSection />
        <ManpowerCandidateHub />
        <ManpowerEmployerSection />
        <CorporateFoundation />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
