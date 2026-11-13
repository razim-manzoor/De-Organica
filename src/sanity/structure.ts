import type { StructureResolver } from "sanity/structure";

const SINGLETON_IDS = new Set([
  "siteSettings",
  "homePage",
  "travelPage",
  "manpowerPage",
  "contactPage",
]);

export const structure: StructureResolver = (S) =>
  S.list()
    .title("De Organica CMS Desk")
    .items([
      S.listItem()
        .title("Site Settings & Identity")
        .id("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings & Brand Identity")
        ),
      S.divider(),
      S.listItem()
        .title("Pages (Singletons)")
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home Gateway Page")
                .id("homePage")
                .child(
                  S.document()
                    .schemaType("homePage")
                    .documentId("homePage")
                    .title("Home Gateway Page")
                ),
              S.listItem()
                .title("Travel & Tours Page")
                .id("travelPage")
                .child(
                  S.document()
                    .schemaType("travelPage")
                    .documentId("travelPage")
                    .title("Travel & Tours Page")
                ),
              S.listItem()
                .title("Manpower & Recruitment Page")
                .id("manpowerPage")
                .child(
                  S.document()
                    .schemaType("manpowerPage")
                    .documentId("manpowerPage")
                    .title("Manpower & Recruitment Page")
                ),
              S.listItem()
                .title("Contact Desk Page")
                .id("contactPage")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                    .title("Contact Desk Page")
                ),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("tourPackage").title("Tour Packages"),
      S.documentTypeListItem("travelService").title("Travel Services"),
      S.divider(),
      S.documentTypeListItem("jobVacancy").title("Job Vacancies"),
      S.documentTypeListItem("jobSector").title("Job Sectors"),
      S.documentTypeListItem("faqItem").title("FAQs"),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETON_IDS.has(listItem.getId() || "") &&
          ![
            "tourPackage",
            "travelService",
            "jobVacancy",
            "jobSector",
            "faqItem",
          ].includes(listItem.getId() || "")
      ),
    ]);
