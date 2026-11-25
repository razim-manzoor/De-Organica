import React from "react";
import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LegalDocumentView } from "@/components/LegalDocumentView";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Privacy & Candidate Data Policy | De Organica LLC",
  description:
    "How De Organica LLC (Yerevan, Republic of Armenia) protects client travel details, candidate CV submissions, and personal data.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-brand-stone-50">
      <Header />
      <main id="main-content" className="flex-grow pt-8">
        <LegalDocumentView mode="privacy" />
      </main>
      <Footer />
    </div>
  );
}
