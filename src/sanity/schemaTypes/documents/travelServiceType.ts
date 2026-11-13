import { defineField, defineType } from "sanity";

export const travelServiceType = defineType({
  name: "travelService",
  title: "Travel Service",
  type: "document",
  groups: [
    { name: "basics", title: "Basics & Icon", default: true },
    { name: "english", title: "English" },
    { name: "armenian", title: "Հայերեն (Armenian)" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({ name: "orderRank", title: "Display Order", type: "number", initialValue: 10, group: "basics" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title_en", maxLength: 96 },
      validation: (r) => r.required(),
      group: "basics",
    }),
    defineField({ name: "isPublished", title: "Published on Website", type: "boolean", initialValue: true, group: "basics" }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Compass", value: "Compass" },
          { title: "Plane", value: "Plane" },
          { title: "File Check", value: "FileCheck" },
          { title: "Car", value: "Car" },
          { title: "Sparkles", value: "Sparkles" },
          { title: "Building 2", value: "Building2" },
        ],
      },
      initialValue: "Compass",
      group: "basics",
    }),
    defineField({
      name: "inquiryType",
      title: "Concierge Drawer Preset Value",
      type: "string",
      description: "Pre-selects this service inside the Travel Inquiry Drawer.",
      group: "basics",
    }),
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
    defineField({ name: "badge_en", title: "Badge (EN)", type: "string", group: "english" }),
    defineField({ name: "description_en", title: "Description (EN)", type: "text", rows: 3, group: "english" }),
    defineField({ name: "features_en", title: "Key Deliverables (EN)", type: "array", of: [{ type: "string" }], group: "english" }),

    // Armenian Tab
    defineField({ name: "title_hy", title: "Title (HY)", type: "string", validation: (r) => r.required(), group: "armenian" }),
    defineField({ name: "tagline_hy", title: "Tagline (HY)", type: "string", group: "armenian" }),
    defineField({ name: "badge_hy", title: "Badge (HY)", type: "string", group: "armenian" }),
    defineField({ name: "description_hy", title: "Description (HY)", type: "text", rows: 3, group: "armenian" }),
    defineField({ name: "features_hy", title: "Key Deliverables (HY)", type: "array", of: [{ type: "string" }], group: "armenian" }),

    // Media Tab
    defineField({ name: "image", title: "Service Image (Upload)", type: "image", options: { hotspot: true }, group: "media" }),
    defineField({
      name: "imageUrl",
      title: "Fallback Image Path / URL",
      type: "string",
      description: "Developer fallback asset path used automatically if no service photo is uploaded.",
      hidden: ({ document }) => Boolean(document?.image),
      group: "media",
    }),
  ],
  preview: {
    select: {
      title: "title_en",
      subtitle: "tagline_en",
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
