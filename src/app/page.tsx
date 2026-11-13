import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { HeroDualGateway } from "@/components/HeroDualGateway";
import { YerevanCrossroadsBanner } from "@/components/YerevanCrossroadsBanner";
import { CorporateFoundation } from "@/components/CorporateFoundation";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { getContactPageContent, getHomePageContent } from "@/sanity/lib/fetch";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const homeContent = await getHomePageContent();
  const title = homeContent.seo?.seoTitle;
  const description = homeContent.seo?.seoDescription;
  const ogImage = homeContent.seo?.ogImage;

  return {
    ...(title ? { title } : {}),
    ...(description ? { description } : {}),
    ...(title || description || ogImage
      ? {
          openGraph: {
            ...(title ? { title } : {}),
            ...(description ? { description } : {}),
            ...(ogImage ? { images: [{ url: ogImage }] } : {}),
          },
        }
      : {}),
  };
}

export default async function HomePage() {
  const [homeContent, contactContent] = await Promise.all([
    getHomePageContent(),
    getContactPageContent(),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow">
        {/* Executive Corporate Gateway (Dual-Pillar Split to /travel and /manpower) */}
        <HeroDualGateway content={homeContent} />

        {/* High-Contrast Editorial Intermission: Sovereign Crossroads Banner */}
        <YerevanCrossroadsBanner content={homeContent.crossroadsBanner} />

        {/* Corporate Foundation & Institutional Trust Signals */}
        <CorporateFoundation />

        {/* Executive Contact & Desk Hub */}
        <ContactSection content={contactContent} />
      </main>
      <Footer />
    </div>
  );
}
