import { defineField, defineType } from "sanity";

export const jobSectorType = defineType({
  name: "jobSector",
  title: "Job Sector",
  type: "document",
  fields: [
    defineField({
      name: "orderRank",
      title: "Filter Tab Order",
      type: "number",
      initialValue: 10,
    }),
    defineField({
      name: "slug",
      title: "Sector Key / Slug",
      type: "slug",
      description: "Unique filter key used by the Manpower filter bar (click Generate from English label).",
      options: { source: "label_en", maxLength: 64 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label_en",
      title: "Sector Label (EN)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label_hy",
      title: "Sector Label (HY)",
      type: "string",
      validation: (r) => r.required(),
    }),
  ],
  orderings: [
    {
      title: "Filter Tab Order",
      name: "orderAsc",
      by: [{ field: "orderRank", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "label_en",
      subtitle: "label_hy",
    },
  },
});
