import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { TravelHero } from "@/components/TravelHero";
import { ItineraryStageShow } from "@/components/ItineraryStageShow";
import { TravelServicesMatrix } from "@/components/TravelServicesMatrix";
import { FeaturedToursGrid } from "@/components/FeaturedToursGrid";
import { TravelHeritageShowcase } from "@/components/TravelHeritageShowcase";
import { DmcPartnerSection } from "@/components/DmcPartnerSection";
import { TravelFaqSection } from "@/components/TravelFaqSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import {
  getContactPageContent,
  getFaqs,
  getTours,
  getTravelPageContent,
  getTravelServices,
} from "@/sanity/lib/fetch";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const travelPage = await getTravelPageContent();
  const title =
    travelPage.seo?.seoTitle ||
    "De Organica Travel & Tours · Armenia Inbound & Outbound DMC";
  const description =
    travelPage.seo?.seoDescription ||
    "Curated cultural tours across Armenia (Garni, Geghard, Sevan, Dilijan, Tatev), international holiday escapes, consular visa guidance, and B2B DMC partner services in Yerevan.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(travelPage.seo?.ogImage
        ? { images: [{ url: travelPage.seo.ogImage }] }
        : {}),
    },
  };
}

export default async function TravelPage() {
  const [travelPage, tours, services, faqs, contactContent] = await Promise.all([
    getTravelPageContent(),
    getTours(),
    getTravelServices(),
    getFaqs("travel"),
    getContactPageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow">
        {/* Dedicated Travel Division Hero */}
        <TravelHero content={travelPage.hero} />

        {/* StageShow Interactive Itinerary Explorer */}
        <ItineraryStageShow content={travelPage.itineraryStageShow} />

        {/* 6-Service Ground Operations Matrix */}
        <TravelServicesMatrix services={services} header={travelPage.servicesHeader} />

        {/* Signature Inbound Tour Packages */}
        <FeaturedToursGrid tours={tours} header={travelPage.toursHeader} />

        {/* Living Heritage, Terroir & Gastronomy Showcase */}
        <TravelHeritageShowcase content={travelPage.heritageShowcase} />

        {/* B2B Destination Management (DMC) Wholesale Partner Portal */}
        <DmcPartnerSection content={travelPage.dmcPartner} />

        {/* Armenia Travel Advisory & FAQ */}
        <TravelFaqSection faqs={faqs} header={travelPage.faqHeader} />

        {/* Contact & Desk Inquiries */}
        <ContactSection variant="travel" content={contactContent} />
      </main>
      <Footer />
    </div>
  );
}
