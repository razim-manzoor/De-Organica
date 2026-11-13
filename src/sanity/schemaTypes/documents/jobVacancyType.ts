import { defineField, defineType } from "sanity";

export const jobVacancyType = defineType({
  name: "jobVacancy",
  title: "Job Vacancy",
  type: "document",
  groups: [
    { name: "basics", title: "Basics & Sector", default: true },
    { name: "english", title: "English" },
    { name: "armenian", title: "Հայերեն (Armenian)" },
    { name: "compensation", title: "Salary & Portal Link" },
  ],
  fields: [
    defineField({ name: "orderRank", title: "Display Order", type: "number", initialValue: 10, group: "basics" }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title_en", maxLength: 96 },
      group: "basics",
    }),
    defineField({
      name: "isPublished",
      title: "Active / Published Vacancy",
      type: "boolean",
      initialValue: true,
      description: "Turn off to hide this opening immediately without deleting it.",
      group: "basics",
    }),
    defineField({
      name: "sectorRef",
      title: "Job Sector",
      type: "reference",
      to: [{ type: "jobSector" }],
      description: "Pick from Job Sectors so filter buttons and job badges always stay synchronized.",
      validation: (r) =>
        r.custom((value, context) =>
          value || context.document?.sector ? true : "Please choose a Job Sector"
        ),
      group: "basics",
    }),
    defineField({
      name: "id",
      title: "Internal ID (Developer Fallback)",
      type: "string",
      group: "basics",
      hidden: ({ document }) => !document?.id,
    }),
    defineField({
      name: "sector",
      title: "Legacy Sector Key",
      type: "string",
      group: "basics",
      hidden: ({ document }) => !document?.sector || Boolean(document?.sectorRef),
    }),
    defineField({
      name: "sector_en",
      title: "Legacy Sector Display Label (EN)",
      type: "string",
      group: "basics",
      hidden: ({ document }) => !document?.sector_en || Boolean(document?.sectorRef),
    }),
    defineField({
      name: "sector_hy",
      title: "Legacy Sector Display Label (HY)",
      type: "string",
      group: "basics",
      hidden: ({ document }) => !document?.sector_hy || Boolean(document?.sectorRef),
    }),

    // English Tab
    defineField({ name: "title_en", title: "Role Title (EN)", type: "string", validation: (r) => r.required(), group: "english" }),
    defineField({ name: "location_en", title: "Location (EN)", type: "string", group: "english" }),
    defineField({ name: "type_en", title: "Contract Type (EN)", type: "string", group: "english" }),
    defineField({ name: "description_en", title: "Description (EN)", type: "text", rows: 4, group: "english" }),
    defineField({ name: "requirements_en", title: "Requirements (EN)", type: "array", of: [{ type: "string" }], group: "english" }),
    defineField({ name: "benefits_en", title: "Benefits (EN)", type: "array", of: [{ type: "string" }], group: "english" }),

    // Armenian Tab
    defineField({ name: "title_hy", title: "Role Title (HY)", type: "string", validation: (r) => r.required(), group: "armenian" }),
    defineField({ name: "location_hy", title: "Location (HY)", type: "string", group: "armenian" }),
    defineField({ name: "type_hy", title: "Contract Type (HY)", type: "string", group: "armenian" }),
    defineField({ name: "description_hy", title: "Description (HY)", type: "text", rows: 4, group: "armenian" }),
    defineField({ name: "requirements_hy", title: "Requirements (HY)", type: "array", of: [{ type: "string" }], group: "armenian" }),
    defineField({ name: "benefits_hy", title: "Benefits (HY)", type: "array", of: [{ type: "string" }], group: "armenian" }),

    // Compensation & Links Tab
    defineField({ name: "salary", title: "Optional Compensation Range", type: "string", group: "compensation" }),
    defineField({ name: "showSalary", title: "Show Compensation Range", type: "boolean", initialValue: false, group: "compensation" }),
    defineField({ name: "externalRecruitmentUrl", title: "External Recruitment Portal URL", type: "url", group: "compensation" }),
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
      subtitle: "location_en",
      sectorLabel: "sectorRef.label_en",
      isPublished: "isPublished",
    },
    prepare({ title, subtitle, sectorLabel, isPublished }) {
      return {
        title: isPublished === false ? `[Closed] ${title}` : title,
        subtitle: [sectorLabel, subtitle].filter(Boolean).join(" · "),
      };
    },
  },
});
