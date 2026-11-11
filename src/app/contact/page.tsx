import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ContactSection } from "@/components/ContactSection";
import { CorporateFoundation } from "@/components/CorporateFoundation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact De Organica LLC · Yerevan Corporate Desk",
  description:
    "Direct contact channels for De Organica LLC in Yerevan, Republic of Armenia. WhatsApp desk, corporate email, and prompt consultation for travel and manpower inquiries.",
};

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-8">
        <ContactSection />
        <CorporateFoundation />
      </main>
      <Footer />
    </div>
  );
}
