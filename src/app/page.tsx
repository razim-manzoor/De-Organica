import React from "react";
import { Header } from "@/components/Header";
import { HeroDualGateway } from "@/components/HeroDualGateway";
import { CorporateFoundation } from "@/components/CorporateFoundation";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Executive Corporate Gateway (Dual-Pillar Split to /travel and /manpower) */}
        <HeroDualGateway />

        {/* Corporate Foundation & Institutional Trust Signals */}
        <CorporateFoundation />

        {/* Executive Contact & Desk Hub */}
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
