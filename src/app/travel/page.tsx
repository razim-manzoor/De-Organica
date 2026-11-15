import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { TravelHero } from "@/components/TravelHero";
import { FeaturedToursGrid } from "@/components/FeaturedToursGrid";
import { BespokeConciergeSection } from "@/components/BespokeConciergeSection";
import { TravelServicesMatrix } from "@/components/TravelServicesMatrix";
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

        {/* 1. Signature Inbound Tour Packages (Primary Visitor Showcase) */}
        <FeaturedToursGrid tours={tours} header={travelPage.toursHeader} />

        {/* 2. Bespoke Private Journey Planning & Concierge Craft */}
        <BespokeConciergeSection />

        {/* 3. Dedicated Ground Logistics, Fleet & Consular Services */}
        <TravelServicesMatrix services={services} header={travelPage.servicesHeader} />

        {/* 4. B2B Destination Management (DMC) Wholesale Partner Portal */}
        <DmcPartnerSection content={travelPage.dmcPartner} />

        {/* 5. Armenia Travel Advisory & FAQ */}
        <TravelFaqSection faqs={faqs} header={travelPage.faqHeader} />

        {/* 6. Contact & Desk Inquiries */}
        <ContactSection variant="travel" content={contactContent} />
      </main>
      <Footer />
    </div>
  );
}
