import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LegalDocumentView } from "@/components/LegalDocumentView";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Terms of Service & Placement Policy | De Organica LLC",
  description:
    "Official corporate terms of service, travel booking conditions, and strict Zero Upfront Candidate Fee policy for De Organica LLC.",
};

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-canvas">
      <Header />
      <main id="main-content" className="flex-grow pt-8">
        <LegalDocumentView mode="terms" />
      </main>
      <Footer />
    </div>
  );
}
