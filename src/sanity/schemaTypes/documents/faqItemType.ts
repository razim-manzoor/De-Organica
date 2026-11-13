import { defineField, defineType } from "sanity";

export const faqItemType = defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  groups: [
    { name: "classification", title: "Category & Order", default: true },
    { name: "english", title: "English" },
    { name: "armenian", title: "Հայերեն (Armenian)" },
  ],
  fields: [
    defineField({ name: "orderRank", title: "Display Order", type: "number", initialValue: 10, group: "classification" }),
    defineField({ name: "isPublished", title: "Published on Website", type: "boolean", initialValue: true, group: "classification" }),
    defineField({
      name: "category",
      title: "Page Category",
      type: "string",
      options: {
        list: [
          { title: "Travel & Tours", value: "travel" },
          { title: "Manpower & Recruitment", value: "manpower" },
        ],
      },
      validation: (r) => r.required(),
      group: "classification",
    }),
    defineField({
      name: "target",
      title: "Audience Target (Manpower)",
      type: "string",
      options: {
        list: [
          { title: "Both", value: "both" },
          { title: "Candidates", value: "candidate" },
          { title: "Employers", value: "employer" },
        ],
      },
      initialValue: "both",
      hidden: ({ document }) => document?.category !== "manpower",
      group: "classification",
    }),
    defineField({ name: "q_en", title: "Question (EN)", type: "string", validation: (r) => r.required(), group: "english" }),
    defineField({ name: "a_en", title: "Answer (EN)", type: "text", rows: 4, validation: (r) => r.required(), group: "english" }),
    defineField({ name: "q_hy", title: "Question (HY)", type: "string", validation: (r) => r.required(), group: "armenian" }),
    defineField({ name: "a_hy", title: "Answer (HY)", type: "text", rows: 4, validation: (r) => r.required(), group: "armenian" }),
  ],
  preview: {
    select: {
      title: "q_en",
      subtitle: "category",
      isPublished: "isPublished",
    },
    prepare({ title, subtitle, isPublished }) {
      return {
        title: isPublished === false ? `[Hidden] ${title}` : title,
        subtitle: subtitle ? String(subtitle).toUpperCase() : undefined,
      };
    },
  },
});
