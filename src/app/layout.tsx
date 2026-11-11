import type { Metadata } from "next";
import {
  Cinzel,
  Plus_Jakarta_Sans,
  Noto_Serif_Armenian,
  Noto_Sans_Armenian,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { DrawerProvider } from "@/context/DrawerContext";
import { ConciergeDrawer } from "@/components/ConciergeDrawer";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["500", "600", "700", "800"],
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoSerifArmenian = Noto_Serif_Armenian({
  subsets: ["armenian"],
  variable: "--font-armenian-serif",
  display: "swap",
  weight: ["500", "600", "700"],
});

const notoSansArmenian = Noto_Sans_Armenian({
  subsets: ["armenian"],
  variable: "--font-armenian-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "De Organica LLC · Armenia Travel & International Manpower",
  description:
    "Official corporate portal of De Organica LLC (Yerevan, Republic of Armenia). Curated Armenia cultural tours, international holiday packages, visa assistance, and ethical international manpower recruitment.",
  keywords: [
    "Armenia Travel",
    "Armenia Tours",
    "Yerevan Tourism",
    "Armenia DMC",
    "De Organica LLC",
    "International Manpower Armenia",
    "Armenia Work Permit",
    "Armenia Visa Assistance",
    "Yerevan Hotel Transfers",
  ],
  authors: [{ name: "De Organica LLC", url: "https://deorganica.am" }],
  openGraph: {
    title: "De Organica LLC · Armenia Travel & International Manpower",
    description:
      "Bespoke Armenia cultural journeys, outbound holiday packages, visa logistics, and verified international talent supply.",
    url: "https://deorganica.am",
    siteName: "De Organica LLC",
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${plusJakarta.variable} ${notoSerifArmenian.variable} ${notoSansArmenian.variable}`}
    >
      <body className="antialiased min-h-screen flex flex-col bg-brand-stone-50 text-brand-ink selection:bg-brand-olive selection:text-white">
        <LanguageProvider>
          <DrawerProvider>
            {children}
            <ConciergeDrawer />
          </DrawerProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
