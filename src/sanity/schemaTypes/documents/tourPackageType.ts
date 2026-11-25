import { defineField, defineType } from "sanity";

export const tourPackageType = defineType({
  name: "tourPackage",
  title: "Tour Package",
  type: "document",
  groups: [
    { name: "basics", title: "Basics & URL", default: true },
    { name: "english", title: "English" },
    { name: "armenian", title: "Հայերեն (Armenian)" },
    { name: "media", title: "Photos & Itinerary" },
    { name: "booking", title: "Partner Links" },
    { name: "seo", title: "SEO & Social Share" },
  ],
  fields: [
    defineField({ name: "orderRank", title: "Display Order", type: "number", initialValue: 10, group: "basics" }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      description: "Page address under /travel/<slug>. Click Generate after entering Title (EN).",
      options: { source: "title_en", maxLength: 96 },
      validation: (r) => r.required(),
      group: "basics",
    }),
    defineField({ name: "isPublished", title: "Published on Website", type: "boolean", initialValue: true, group: "basics" }),
    defineField({ name: "isFeatured", title: "Featured Flagship Package", type: "boolean", initialValue: false, group: "basics" }),
    defineField({
      name: "id",
      title: "Internal ID (Developer Fallback)",
      type: "string",
      group: "basics",
      hidden: ({ document }) => !document?.id,
    }),

    // English Tab
    defineField({ name: "title_en", title: "Title (EN)", type: "string", validation: (r) => r.required(), group: "english" }),
    defineField({ name: "tagline_en", title: "Tagline (EN)", type: "string", group: "english" }),
    defineField({ name: "duration_en", title: "Duration (EN)", type: "string", group: "english" }),
    defineField({ name: "location_en", title: "Region / Route (EN)", type: "string", group: "english" }),
    defineField({ name: "description_en", title: "Description (EN)", type: "text", rows: 4, group: "english" }),
    defineField({ name: "highlights_en", title: "Highlights (EN)", type: "array", of: [{ type: "string" }], group: "english" }),
    defineField({ name: "inclusions_en", title: "Inclusions (EN)", type: "array", of: [{ type: "string" }], group: "english" }),

    // Armenian Tab
    defineField({ name: "title_hy", title: "Title (HY)", type: "string", validation: (r) => r.required(), group: "armenian" }),
    defineField({ name: "tagline_hy", title: "Tagline (HY)", type: "string", group: "armenian" }),
    defineField({ name: "duration_hy", title: "Duration (HY)", type: "string", group: "armenian" }),
    defineField({ name: "location_hy", title: "Region / Route (HY)", type: "string", group: "armenian" }),
    defineField({ name: "description_hy", title: "Description (HY)", type: "text", rows: 4, group: "armenian" }),
    defineField({ name: "highlights_hy", title: "Highlights (HY)", type: "array", of: [{ type: "string" }], group: "armenian" }),
    defineField({ name: "inclusions_hy", title: "Inclusions (HY)", type: "array", of: [{ type: "string" }], group: "armenian" }),

    // Media & Per-Tour Itinerary Tab
    defineField({
      name: "image",
      title: "Tour Cover Image (Upload)",
      type: "image",
      options: { hotspot: true },
      group: "media",
    }),
    defineField({
      name: "imageUrl",
      title: "Fallback Image Path / URL",
      type: "string",
      description: "Developer fallback asset path used automatically if no cover photo is uploaded.",
      hidden: ({ document }) => Boolean(document?.image),
      group: "media",
    }),
    defineField({
      name: "gallery",
      title: "Tour Photo Gallery (Optional)",
      type: "array",
      of: [{ type: "tourGalleryItem" }],
      description: "Optional extra photos rendered on the dedicated /travel/<slug> detail page.",
      group: "media",
    }),
    defineField({
      name: "itinerary",
      title: "Day-by-Day Route Breakdown (Optional)",
      type: "array",
      of: [{ type: "tourItineraryStep" }],
      description: "Optional structured itinerary days rendered on /travel/<slug>.",
      group: "media",
    }),

    // Pricing & External Booking Tab
    defineField({ name: "price", title: "Optional Display Price (Hidden)", type: "string", group: "booking", hidden: true }),
    defineField({ name: "showPrice", title: "Show Price Badge (Hidden)", type: "boolean", initialValue: false, group: "booking", hidden: true }),
    defineField({ name: "externalBookingUrl", title: "External Booking URL (Optional)", type: "url", group: "booking" }),
    defineField({ name: "paymentLinkUrl", title: "Payment Link URL (Optional)", type: "url", group: "booking" }),

    // SEO Tab
    defineField({ name: "seo", title: "Tour Page SEO Override", type: "pageSeo", group: "seo" }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title_en",
      subtitle: "duration_en",
      media: "image",
      isPublished: "isPublished",
    },
    prepare({ title, subtitle, media, isPublished }) {
      return {
        title: isPublished === false ? `[Hidden] ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
