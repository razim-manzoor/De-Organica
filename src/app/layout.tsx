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
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://deorganica.am/#organization",
      "name": "De Organica LLC",
      "alternateName": "«Դե Օրգանիկա» ՍՊԸ",
      "url": "https://deorganica.am",
      "logo": "https://deorganica.am/images/de-organica-logo.jpg",
      "description":
        "De Organica LLC is an officially registered enterprise in Yerevan, Republic of Armenia, operating bespoke travel & tour management and ethical international manpower recruitment.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Nalbandyan St, Republic Square District",
        "addressLocality": "Yerevan",
        "postalCode": "0010",
        "addressCountry": "AM"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+374-99-000000",
        "contactType": "customer service",
        "email": "deorganicallc@gmail.com",
        "availableLanguage": ["English", "Armenian"]
      }
    },
    {
      "@type": "TravelAgency",
      "@id": "https://deorganica.am/#travel-agency",
      "name": "De Organica Travel & Tours",
      "url": "https://deorganica.am/travel",
      "parentOrganization": {
        "@id": "https://deorganica.am/#organization"
      },
      "priceRange": "$$"
    },
    {
      "@type": "EmploymentAgency",
      "@id": "https://deorganica.am/#manpower-agency",
      "name": "De Organica Manpower",
      "url": "https://deorganica.am/manpower",
      "parentOrganization": {
        "@id": "https://deorganica.am/#organization"
      }
    }
  ]
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
