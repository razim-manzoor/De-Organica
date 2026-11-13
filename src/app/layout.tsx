import type { Metadata } from "next";
import {
  Lora,
  Plus_Jakarta_Sans,
  Noto_Serif_Armenian,
  Noto_Sans_Armenian,
} from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { DrawerProvider } from "@/context/DrawerContext";
import { SiteDataProvider } from "@/context/SiteDataContext";
import { ConciergeDrawer } from "@/components/ConciergeDrawer";
import {
  getSiteSettings,
  getTours,
  getTravelServices,
} from "@/sanity/lib/fetch";

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["500", "600", "700"],
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

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title =
    settings.seoTitle ||
    "De Organica LLC · Armenia Travel & International Manpower";
  const description =
    settings.seoDescription ||
    "Official corporate portal of De Organica LLC (Yerevan, Republic of Armenia). Curated Armenia cultural tours, international holiday packages, visa assistance, and ethical international manpower recruitment.";

  return {
    metadataBase: new URL("https://deorganica.am"),
    title,
    description,
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
    authors: [{ name: settings.company.legalName, url: "https://deorganica.am" }],
    openGraph: {
      title,
      description,
      url: "https://deorganica.am",
      siteName: settings.company.legalName,
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
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [siteSettings, tours, travelServices] = await Promise.all([
    getSiteSettings(),
    getTours(),
    getTravelServices(),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://deorganica.am/#organization",
        name: siteSettings.company.legalName,
        alternateName: "«Դե Օրգանիկա» ՍՊԸ",
        url: "https://deorganica.am",
        logo: "https://deorganica.am/images/de-organica-logo.jpg",
        description:
          "De Organica LLC is an officially registered enterprise in Yerevan, Republic of Armenia, operating bespoke travel & tour management and ethical international manpower recruitment.",
        address: {
          "@type": "PostalAddress",
          streetAddress: siteSettings.company.address_en,
          addressLocality: siteSettings.company.city,
          postalCode: "0010",
          addressCountry: "AM",
        },
        contactPoint: {
          "@type": "ContactPoint",
          telephone: siteSettings.company.phoneYerevanDesk,
          contactType: "customer service",
          email: siteSettings.company.email,
          availableLanguage: ["English", "Armenian"],
        },
      },
      {
        "@type": "TravelAgency",
        "@id": "https://deorganica.am/#travel-agency",
        name: "De Organica Travel & Tours",
        url: "https://deorganica.am/travel",
        parentOrganization: {
          "@id": "https://deorganica.am/#organization",
        },
        priceRange: "$$",
      },
      {
        "@type": "EmploymentAgency",
        "@id": "https://deorganica.am/#manpower-agency",
        name: "De Organica Manpower",
        url: "https://deorganica.am/manpower",
        parentOrganization: {
          "@id": "https://deorganica.am/#organization",
        },
      },
    ],
  };

  return (
    <html
      lang="en"
      className={`${lora.variable} ${plusJakarta.variable} ${notoSerifArmenian.variable} ${notoSansArmenian.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased min-h-screen flex flex-col bg-brand-stone-50 text-brand-ink selection:bg-brand-olive-subtle selection:text-brand-forest">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2.5 focus:rounded-xl focus:bg-brand-forest focus:text-white focus:text-xs focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        <SiteDataProvider value={{ siteSettings, tours, travelServices }}>
          <LanguageProvider>
            <DrawerProvider>
              {children}
              <ConciergeDrawer />
            </DrawerProvider>
          </LanguageProvider>
        </SiteDataProvider>
      </body>
    </html>
  );
}
