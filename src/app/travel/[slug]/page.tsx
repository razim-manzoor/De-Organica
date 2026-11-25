import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import TourDetailView from "@/components/TourDetailView";
import { getTourBySlug, getTours } from "@/sanity/lib/fetch";

export const revalidate = 60;

export async function generateStaticParams() {
  const tours = await getTours();
  return tours.map((tour) => ({
    slug: tour.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = await getTourBySlug(slug);
  if (!tour) {
    return {
      title: "Tour Package Not Found | De Organica Travel",
    };
  }

  const title = tour.seo?.seoTitle || `${tour.title_en} | De Organica Travel & Tours`;
  const description = tour.seo?.seoDescription || tour.description_en;
  const ogImage = tour.seo?.ogImage || tour.image;

  return {
    title,
    description,
    alternates: {
      canonical: `/travel/${tour.slug}`,
    },
    openGraph: {
      title,
      description: tour.seo?.seoDescription || tour.tagline_en,
      url: `https://deorganica.am/travel/${tour.slug}`,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tour.seo?.seoDescription || tour.tagline_en,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [tour, allTours] = await Promise.all([
    getTourBySlug(slug),
    getTours(),
  ]);

  if (!tour) {
    notFound();
  }

  const otherTours = allTours.filter((item) => item.slug !== tour.slug);

  const tourJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://deorganica.am/" },
          { "@type": "ListItem", position: 2, name: "Travel & Tours", item: "https://deorganica.am/travel" },
          { "@type": "ListItem", position: 3, name: tour.title_en, item: `https://deorganica.am/travel/${tour.slug}` },
        ],
      },
      {
        "@type": "TouristTrip",
        name: tour.title_en,
        description: tour.description_en,
        url: `https://deorganica.am/travel/${tour.slug}`,
        image: tour.image?.startsWith("http") ? tour.image : `https://deorganica.am${tour.image}`,
        touristType: ["Cultural Tourism", "Private Tours", "B2B Group Tours"],
        provider: {
          "@id": "https://deorganica.am/#travel-agency",
        },
        itinerary: {
          "@type": "ItemList",
          itemListElement: (tour.highlights_en || []).map((h, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: h,
          })),
        },
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-brand-stone-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(tourJsonLd) }}
      />
      <Header />
      <main id="main-content" className="flex-1">
        <TourDetailView tour={tour} otherTours={otherTours} />
      </main>
      <Footer />
    </div>
  );
}
