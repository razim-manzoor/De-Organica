import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { TravelHero } from "@/components/TravelHero";
import { ItineraryStageShow } from "@/components/ItineraryStageShow";
import { TravelServicesMatrix } from "@/components/TravelServicesMatrix";
import { FeaturedToursGrid } from "@/components/FeaturedToursGrid";
import { DmcPartnerSection } from "@/components/DmcPartnerSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "De Organica Travel & Tours · Armenia Inbound & Outbound DMC",
  description:
    "Curated cultural tours across Armenia (Garni, Geghard, Sevan, Dilijan, Tatev), international holiday escapes, consular visa guidance, and B2B DMC partner services in Yerevan.",
};

export default function TravelPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Dedicated Travel Division Hero */}
        <TravelHero />

        {/* StageShow Interactive Itinerary Explorer */}
        <ItineraryStageShow />

        {/* 6-Service Hospitality Matrix */}
        <div id="tours-matrix">
          <TravelServicesMatrix />
        </div>

        {/* Signature Inbound Tour Packages */}
        <FeaturedToursGrid />

        {/* B2B Destination Management (DMC) Wholesale Partner Portal */}
        <DmcPartnerSection />

        {/* Contact & Desk Inquiries */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
