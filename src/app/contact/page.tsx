import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ContactSection } from "@/components/ContactSection";
import { CorporateFoundation } from "@/components/CorporateFoundation";
import { Footer } from "@/components/Footer";
import { getContactPageContent } from "@/sanity/lib/fetch";

export const revalidate = 900;

export async function generateMetadata(): Promise<Metadata> {
  const contactPage = await getContactPageContent();
  const title =
    contactPage.seo?.seoTitle ||
    "Contact De Organica LLC · Yerevan Corporate Desk";
  const description =
    contactPage.seo?.seoDescription ||
    "Direct contact channels for De Organica LLC in Yerevan, Republic of Armenia. WhatsApp desk, corporate email, and prompt consultation for travel and manpower inquiries.";

  const ogImage = contactPage.seo?.ogImage || "/images/og-deorganica.jpg";

  return {
    title,
    description,
    alternates: {
      canonical: "/contact",
    },
    openGraph: {
      title,
      description,
      url: "https://deorganica.am/contact",
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

export default async function ContactPage() {
  const contactPage = await getContactPageContent();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://deorganica.am/" },
      { "@type": "ListItem", position: 2, name: "Contact Desk", item: "https://deorganica.am/contact" },
    ],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Header />
      <main id="main-content" className="flex-grow pt-8">
        <ContactSection headingLevel="h1" content={contactPage} />
        <CorporateFoundation />
      </main>
      <Footer />
    </div>
  );
}
