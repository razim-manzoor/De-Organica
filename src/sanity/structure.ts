import type { StructureResolver } from "sanity/structure";
import {
  Settings,
  Home,
  Compass,
  Briefcase,
  Phone,
  MapPin,
  Car,
  Layers,
  HelpCircle,
} from "lucide-react";

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
        .icon(Settings)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Site Settings & Brand Identity")
        ),
      S.divider(),
      S.listItem()
        .title("Pages (Singletons)")
        .icon(Layers)
        .child(
          S.list()
            .title("Pages")
            .items([
              S.listItem()
                .title("Home Gateway Page")
                .id("homePage")
                .icon(Home)
                .child(
                  S.document()
                    .schemaType("homePage")
                    .documentId("homePage")
                    .title("Home Gateway Page")
                ),
              S.listItem()
                .title("Travel & Tours Page")
                .id("travelPage")
                .icon(Compass)
                .child(
                  S.document()
                    .schemaType("travelPage")
                    .documentId("travelPage")
                    .title("Travel & Tours Page")
                ),
              S.listItem()
                .title("Manpower & Recruitment Page")
                .id("manpowerPage")
                .icon(Briefcase)
                .child(
                  S.document()
                    .schemaType("manpowerPage")
                    .documentId("manpowerPage")
                    .title("Manpower & Recruitment Page")
                ),
              S.listItem()
                .title("Contact Desk Page")
                .id("contactPage")
                .icon(Phone)
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                    .title("Contact Desk Page")
                ),
            ])
        ),
      S.divider(),
      S.documentTypeListItem("tourPackage").title("Tour Packages").icon(MapPin),
      S.documentTypeListItem("travelService").title("Travel Services").icon(Car),
      S.divider(),
      S.documentTypeListItem("jobVacancy").title("Job Vacancies").icon(Briefcase),
      S.documentTypeListItem("jobSector").title("Job Sectors").icon(Layers),
      S.documentTypeListItem("faqItem").title("FAQs").icon(HelpCircle),
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
