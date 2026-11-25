#!/usr/bin/env node
/**
 * Surgical Sanity CMS Remediation Script (Pass 3)
 *
 * Updates live Sanity documents safely using targeted .patch().set() calls
 * (and creates jobSector-agriculture) without overwriting unrelated custom content.
 */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import { createClient } from "next-sanity";

const require = createRequire(import.meta.url);
const rootDir = path.resolve(process.cwd());
const srcDir = path.join(rootDir, "src");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");
  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const eqIdx = line.indexOf("=");
    if (eqIdx === -1) continue;
    const key = line.slice(0, eqIdx).trim();
    let val = line.slice(eqIdx + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    if (!process.env[key]) process.env[key] = val;
  }
}

loadEnvFile(path.join(rootDir, ".env"));
loadEnvFile(path.join(rootDir, ".env.local"));

function loadTs(relPath) {
  const source = fs.readFileSync(path.join(rootDir, relPath), "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  });
  const mod = { exports: {} };
  const wrapper = vm.runInThisContext(
    `(function (exports, require, module) {\n${outputText}\n})`
  );
  wrapper(mod.exports, require, mod);
  return mod.exports;
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-11-01",
  useCdn: false,
  token,
});

const { deorganicaConfig } = loadTs("src/data/deorganica-content.ts");

async function main() {
  const tx = client.transaction();

  // 1. Add Agriculture & Agrotech Job Sector
  tx.createOrReplace({
    _id: "jobSector-agriculture",
    _type: "jobSector",
    orderRank: 35,
    slug: { _type: "slug", current: "agriculture" },
    label_en: "Agriculture & Agrotech",
    label_hy: "Գյուղատնտեսություն և Ագրոտեխ",
  });

  // 2. Patch live Job Vacancy typos & sector references
  tx.patch("jobVacancy-greenhouse-agricultural-technician", (p) =>
    p.set({
      sector: "agriculture",
      sector_en: "Agriculture & Agrotech",
      sector_hy: "Գյուղատնտեսություն և Ագրոտեխ",
      sectorRef: { _type: "reference", _ref: "jobSector-agriculture" },
    })
  );

  tx.patch("jobVacancy-construction-finishing-craftsmen", (p) =>
    p.set({
      title_en: "Construction Finishing Craftsmen (Tile, Plaster & MEP)",
      benefits_en: [
        "Employer-provided furnished housing",
        "Work permit & residence card sponsorship assistance",
        "Overtime pay",
        "Tool & protective gear provided",
      ],
    })
  );

  tx.patch("jobVacancy-fleet-delivery-driver", (p) =>
    p.set({
      title_en: "Commercial Delivery, Taxi & Fleet Drivers (Yandex Partner)",
    })
  );

  tx.patch("jobVacancy-heavy-equipment-crane-operator", (p) =>
    p.set({
      benefits_hy: [
        "Հավելավճարներ արտաժամյա աշխատանքի համար",
        "Տրանսպորտ և կացություն",
        "Սոցիալական ապահովություն",
        "Տարեկան ավիատոմս",
      ],
    })
  );

  // 3. Patch FAQ ("Philippine" -> "Filipino")
  tx.patch("faqItem-travel-1", (p) =>
    p.set({
      a_en: "Citizens of the European Union, United States, UAE, Qatar, Georgia, and Russia enjoy 180-day visa-free entry. For Indian, Filipino, and other nationalities requiring an entry visa, De Organica provides certified eVisa invitation file processing and consular assistance with rapid 3–5 day issuance.",
    })
  );

  // 4. Patch all 5 Tour Packages with structured Day-by-Day itineraries + minor EN/HY alignment
  const tourMap = new Map(deorganicaConfig.starterTours.map((t) => [`tourPackage-${t.id}`, t]));
  for (const [docId, tour] of tourMap.entries()) {
    const itinerary = (tour.itinerary || []).map((step) => ({
      _key: `day-${step.day}`,
      _type: "tourItineraryStep",
      day: step.day,
      title_en: step.title_en,
      title_hy: step.title_hy,
      description_en: step.description_en,
      description_hy: step.description_hy,
    }));

    const patchFields = { itinerary };
    if (docId === "tourPackage-classic-armenia-discovery") {
      patchFields.highlights_hy = tour.highlights_hy;
    } else if (docId === "tourPackage-yerevan-city-monasteries") {
      patchFields.title_en = tour.title_en;
      patchFields.description_en = tour.description_en;
      patchFields.description_hy = tour.description_hy;
      patchFields.highlights_en = tour.highlights_en;
      patchFields.highlights_hy = tour.highlights_hy;
    }

    tx.patch(docId, (p) => p.set(patchFields));
  }

  // 5. Patch travelPage eyebrow_hy, sevan season, servicesHeader
  tx.patch("travelPage", (p) =>
    p.set({
      "hero.eyebrow_hy": "Հայաստանի Մուտքային DMC · Երևան",
      'hero.destinations[id=="sevan"].season_en': "Winter Ski & Summer",
      'hero.destinations[id=="sevan"].season_hy': "Ձմեռ (Դեկտ–Մարտ) և Ամառ",
      servicesHeader: {
        eyebrow_en: "Holidays, Fleet & Consular Desk",
        eyebrow_hy: "Տուրեր, Ավտոպարկ և Վիզաներ",
        title_en: "Outbound Holidays, Chauffeur Fleet & Visa Desk",
        title_hy: "Արտագնա Տուրեր, Ավտոպարկ և Վիզային Աջակցություն",
        subtitle_en:
          "End-to-end travel logistics from Yerevan: curated holiday packages abroad, 24/7 Zvartnots (EVN) airport reception, private Mercedes fleet, and consular eVisa documentation.",
        subtitle_hy:
          "Հուսալի սպասարկում Երևանից՝ արտագնա հանգիստ, 24/7 դիմավորում Զվարթնոց (EVN) օդանավակայանում, վարորդով ավտոպարկ և պաշտոնական վիզային աջակցություն:",
      },
    })
  );

  // 6. Patch manpowerPage metrics (figure_hy + deduped compliance cards + Within 72 Hours)
  tx.patch("manpowerPage", (p) =>
    p.set({
      "hero.metrics": [
        {
          _key: "mp-metric-1",
          figure: "100% Legal",
          figure_hy: "100% Օրինական",
          label_en: "Work Permit Compliance",
          label_hy: "Օրինական Թույլտվություն",
        },
        {
          _key: "mp-metric-2",
          figure: "15–25 Days",
          figure_hy: "15–25 Աշխ. Օր",
          label_en: "Ministry Permit SLA",
          label_hy: "ՀՀ Թույլտվության Ժամկետ",
        },
        {
          _key: "mp-metric-3",
          figure: "< 72 Hours",
          figure_hy: "< 72 Ժամում",
          label_en: "Corporate Shortlist",
          label_hy: "Թեկնածուների Ցանկ",
        },
      ],
      'pipelineStageShow.stages[id=="stage-2"].metrics_en': "Within 72 Hours",
      'pipelineStageShow.stages[id=="stage-2"].metrics_hy': "Մինչև 72 Ժամում",
      "complianceBanner.trustMetrics": [
        {
          _key: "comp-metric-1",
          figure: "100% Legal",
          figure_hy: "100% Օրինական",
          label_en: "Government Work Permits",
          label_hy: "Պետական Թույլտվություն",
          detail_en: "Direct coordination with RA Unified Migration Service and Ministry of Labor.",
          detail_hy: "Ուղիղ համագործակցություն ՀՀ միգրացիոն ծառայության և նախարարության հետ:",
        },
        {
          _key: "comp-metric-2",
          figure: "15–25 Days",
          figure_hy: "15–25 Աշխ. Օր",
          label_en: "Electronic Residence Filing",
          label_hy: "ՀՀ Կացության Քարտ",
          detail_en: "Official workpermit.am filings and unified migration residence cards.",
          detail_hy: "Պաշտոնական էլեկտրոնային աշխատանքային թույլտվություն և կացության քարտ:",
        },
        {
          _key: "comp-metric-3",
          figure: "30-Day SLA",
          figure_hy: "30-Օրյա Երաշխիք",
          label_en: "Replacement Warranty",
          label_hy: "Փոխարինման Երաշխիք",
          detail_en: "Guaranteed talent replacement warranty for corporate enterprises.",
          detail_hy: "Կորպորատիվ գործատուների համար երաշխիքային սպասարկում:",
        },
      ],
    })
  );

  // 7. Patch siteSettings multilingual pillar description (include South Asian languages in HY)
  tx.patch("siteSettings", (p) =>
    p.set({
      "corporateFoundation.signals[2].desc_hy":
        "Անգլերեն, հայերեն, ռուսերեն և հարավասիական լեզուներով հաղորդակցություն՝ միջազգային հարթակում արդյունավետ աշխատանքի համար:",
    })
  );

  const res = await tx.commit();
  console.log("Sanity transaction committed cleanly:", res.transactionId || "OK");
}

main().catch((err) => {
  console.error("Sanity patch failed:", err);
  process.exit(1);
});
