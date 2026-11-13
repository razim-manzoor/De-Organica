import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ContactSection } from "@/components/ContactSection";
import { CorporateFoundation } from "@/components/CorporateFoundation";
import { Footer } from "@/components/Footer";
import { getContactPageContent } from "@/sanity/lib/fetch";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPageContent();
  const title =
    contactPage.seo?.seoTitle ||
    "Contact De Organica LLC · Yerevan Corporate Desk";
  const description =
    contactPage.seo?.seoDescription ||
    "Direct contact channels for De Organica LLC in Yerevan, Republic of Armenia. WhatsApp desk, corporate email, and prompt consultation for travel and manpower inquiries.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      ...(contactPage.seo?.ogImage
        ? { images: [{ url: contactPage.seo.ogImage }] }
        : {}),
    },
  };
}

export default async function ContactPage() {
  const contactPage = await getContactPageContent();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main id="main-content" className="flex-grow pt-8">
        <ContactSection headingLevel="h1" content={contactPage} />
        <CorporateFoundation />
      </main>
      <Footer />
    </div>
  );
}
