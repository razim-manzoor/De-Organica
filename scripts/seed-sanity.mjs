#!/usr/bin/env node
/**
 * Sanity CMS Seeder & NDJSON Exporter for De Organica LLC
 *
 * Reads single-source-of-truth bilingual defaults from src/data/cms-fallbacks.ts
 * (transpiled in-memory using TypeScript compiler API) and either:
 *   1. Exports `sanity-seed.ndjson` when run with `--export-ndjson`
 *   2. Uploads local images in `public/` & upserts all documents into Sanity
 *      when NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN are configured.
 */

import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import { createClient } from "next-sanity";

const require = createRequire(import.meta.url);
const rootDir = path.resolve(process.cwd());

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
    if (!process.env[key]) {
      process.env[key] = val;
    }
  }
}

loadEnvFile(path.join(rootDir, ".env"));
loadEnvFile(path.join(rootDir, ".env.local"));

/**
 * Minimal in-memory CommonJS loader for TypeScript modules under src/
 */
function loadTsModule(tsFilePath) {
  const moduleCache = new Map();

  function compileAndRun(filePath) {
    const absPath = path.resolve(filePath);
    if (moduleCache.has(absPath)) {
      return moduleCache.get(absPath).exports;
    }

    const source = fs.readFileSync(absPath, "utf8");
    const transpiled = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        esModuleInterop: true,
      },
      fileName: absPath,
    });

    const mod = { exports: {} };
    moduleCache.set(absPath, mod);

    const localRequire = (specifier) => {
      if (specifier.startsWith("@/")) {
        const target = path.join(rootDir, "src", specifier.slice(2));
        for (const ext of ["", ".ts", ".tsx", ".js"]) {
          if (fs.existsSync(target + ext) && fs.statSync(target + ext).isFile()) {
            return compileAndRun(target + ext);
          }
        }
      } else if (specifier.startsWith(".")) {
        const target = path.resolve(path.dirname(absPath), specifier);
        for (const ext of ["", ".ts", ".tsx", ".js"]) {
          if (fs.existsSync(target + ext) && fs.statSync(target + ext).isFile()) {
            return compileAndRun(target + ext);
          }
        }
      }
      return require(specifier);
    };

    const wrapper = new vm.Script(
      `(function (exports, require, module, __filename, __dirname) {\n${transpiled.outputText}\n})`,
      { filename: absPath }
    );
    const fn = wrapper.runInThisContext();
    fn(mod.exports, localRequire, mod, absPath, path.dirname(absPath));
    return mod.exports;
  }

  return compileAndRun(tsFilePath);
}

const fallbacks = loadTsModule(path.join(rootDir, "src", "data", "cms-fallbacks.ts"));

function toSanitySlug(value) {
  return {
    _type: "slug",
    current: value,
  };
}

function addKeys(items, prefix = "item") {
  return (items || []).map((item, idx) => ({
    _key: `${prefix}-${idx + 1}`,
    ...item,
  }));
}

async function resolveMediaField(imagePath, uploadFn) {
  if (!imagePath) return {};
  if (imagePath.startsWith("/images/") && uploadFn) {
    const assetRef = await uploadFn(imagePath);
    if (assetRef) {
      return {
        image: assetRef,
        imageUrl: imagePath,
      };
    }
  }
  return {
    imageUrl: imagePath,
  };
}

async function buildDocuments(uploadFn) {
  const {
    defaultSiteSettings,
    defaultHomePageContent,
    defaultTravelPageContent,
    defaultManpowerPageContent,
    defaultContactPageContent,
    defaultTours,
    defaultTravelServices,
    defaultJobVacancies,
    defaultTravelFaqs,
    defaultManpowerFaqs,
  } = fallbacks;

  const docs = [];

  // 1. Site Settings Singleton
  docs.push({
    _id: "siteSettings",
    _type: "siteSettings",
    company: defaultSiteSettings.company,
    nav: addKeys(defaultSiteSettings.nav, "nav"),
    footerDescription_en: defaultSiteSettings.footerDescription_en,
    footerDescription_hy: defaultSiteSettings.footerDescription_hy,
    corporateFoundation: {
      ...defaultSiteSettings.corporateFoundation,
      signals: addKeys(defaultSiteSettings.corporateFoundation.signals, "signal"),
    },
    seoTitle: defaultSiteSettings.seoTitle,
    seoDescription: defaultSiteSettings.seoDescription,
  });

  // 2. Home Page Singleton
  const travelPillarMedia = await resolveMediaField(
    defaultHomePageContent.travelPillar.image,
    uploadFn
  );
  const manpowerPillarMedia = await resolveMediaField(
    defaultHomePageContent.manpowerPillar.image,
    uploadFn
  );

  docs.push({
    _id: "homePage",
    _type: "homePage",
    masthead: defaultHomePageContent.masthead,
    travelPillar: {
      badge_en: defaultHomePageContent.travelPillar.badge_en,
      badge_hy: defaultHomePageContent.travelPillar.badge_hy,
      locationStrip_en: defaultHomePageContent.travelPillar.locationStrip_en,
      locationStrip_hy: defaultHomePageContent.travelPillar.locationStrip_hy,
      dispatchTag_en: defaultHomePageContent.travelPillar.dispatchTag_en,
      dispatchTag_hy: defaultHomePageContent.travelPillar.dispatchTag_hy,
      title_en: defaultHomePageContent.travelPillar.title_en,
      title_hy: defaultHomePageContent.travelPillar.title_hy,
      description_en: defaultHomePageContent.travelPillar.description_en,
      description_hy: defaultHomePageContent.travelPillar.description_hy,
      features: addKeys(defaultHomePageContent.travelPillar.features, "tp-feat"),
      ...travelPillarMedia,
      imageAlt_en: defaultHomePageContent.travelPillar.imageAlt_en,
      imageAlt_hy: defaultHomePageContent.travelPillar.imageAlt_hy,
      ctaPrimary_en: defaultHomePageContent.travelPillar.ctaPrimary_en,
      ctaPrimary_hy: defaultHomePageContent.travelPillar.ctaPrimary_hy,
      ctaSecondary_en: defaultHomePageContent.travelPillar.ctaSecondary_en,
      ctaSecondary_hy: defaultHomePageContent.travelPillar.ctaSecondary_hy,
    },
    manpowerPillar: {
      badge_en: defaultHomePageContent.manpowerPillar.badge_en,
      badge_hy: defaultHomePageContent.manpowerPillar.badge_hy,
      feeTag_en: defaultHomePageContent.manpowerPillar.feeTag_en,
      feeTag_hy: defaultHomePageContent.manpowerPillar.feeTag_hy,
      slaTag_en: defaultHomePageContent.manpowerPillar.slaTag_en,
      slaTag_hy: defaultHomePageContent.manpowerPillar.slaTag_hy,
      title_en: defaultHomePageContent.manpowerPillar.title_en,
      title_hy: defaultHomePageContent.manpowerPillar.title_hy,
      description_en: defaultHomePageContent.manpowerPillar.description_en,
      description_hy: defaultHomePageContent.manpowerPillar.description_hy,
      features: addKeys(defaultHomePageContent.manpowerPillar.features, "mp-feat"),
      ...manpowerPillarMedia,
      imageAlt_en: defaultHomePageContent.manpowerPillar.imageAlt_en,
      imageAlt_hy: defaultHomePageContent.manpowerPillar.imageAlt_hy,
      ctaPrimary_en: defaultHomePageContent.manpowerPillar.ctaPrimary_en,
      ctaPrimary_hy: defaultHomePageContent.manpowerPillar.ctaPrimary_hy,
      ctaSecondary_en: defaultHomePageContent.manpowerPillar.ctaSecondary_en,
      ctaSecondary_hy: defaultHomePageContent.manpowerPillar.ctaSecondary_hy,
    },
    crossroadsBanner: {
      ...defaultHomePageContent.crossroadsBanner,
      cards: addKeys(defaultHomePageContent.crossroadsBanner.cards, "cr-card"),
    },
    seo: defaultHomePageContent.seo,
  });

  // 3. Travel Page Singleton
  const travelDestinations = [];
  for (let i = 0; i < defaultTravelPageContent.hero.destinations.length; i++) {
    const dest = defaultTravelPageContent.hero.destinations[i];
    const media = await resolveMediaField(dest.image, uploadFn);
    const { image: _discard, ...rest } = dest;
    travelDestinations.push({
      _key: `dest-${i + 1}`,
      ...rest,
      ...media,
    });
  }

  const itineraryDays = [];
  for (let i = 0; i < defaultTravelPageContent.itineraryStageShow.days.length; i++) {
    const d = defaultTravelPageContent.itineraryStageShow.days[i];
    const media = await resolveMediaField(d.image, uploadFn);
    const { image: _discard, ...rest } = d;
    itineraryDays.push({
      _key: `day-${d.day}`,
      ...rest,
      ...media,
    });
  }

  const heritagePillars = [];
  for (let i = 0; i < defaultTravelPageContent.heritageShowcase.pillars.length; i++) {
    const p = defaultTravelPageContent.heritageShowcase.pillars[i];
    const media = await resolveMediaField(p.image, uploadFn);
    const { image: _discard, ...rest } = p;
    heritagePillars.push({
      _key: `pillar-${i + 1}`,
      ...rest,
      ...media,
    });
  }

  docs.push({
    _id: "travelPage",
    _type: "travelPage",
    hero: {
      eyebrow_en: defaultTravelPageContent.hero.eyebrow_en,
      eyebrow_hy: defaultTravelPageContent.hero.eyebrow_hy,
      headline_en: defaultTravelPageContent.hero.headline_en,
      headline_hy: defaultTravelPageContent.hero.headline_hy,
      subtext_en: defaultTravelPageContent.hero.subtext_en,
      subtext_hy: defaultTravelPageContent.hero.subtext_hy,
      ctaPrimary_en: defaultTravelPageContent.hero.ctaPrimary_en,
      ctaPrimary_hy: defaultTravelPageContent.hero.ctaPrimary_hy,
      ctaSecondary_en: defaultTravelPageContent.hero.ctaSecondary_en,
      ctaSecondary_hy: defaultTravelPageContent.hero.ctaSecondary_hy,
      badges: addKeys(defaultTravelPageContent.hero.badges, "th-badge"),
      destinations: travelDestinations,
    },
    itineraryStageShow: {
      ...defaultTravelPageContent.itineraryStageShow,
      days: itineraryDays,
    },
    servicesHeader: defaultTravelPageContent.servicesHeader,
    toursHeader: defaultTravelPageContent.toursHeader,
    heritageShowcase: {
      ...defaultTravelPageContent.heritageShowcase,
      pillars: heritagePillars,
    },
    dmcPartner: {
      ...defaultTravelPageContent.dmcPartner,
      pillars: addKeys(defaultTravelPageContent.dmcPartner.pillars, "dmc"),
    },
    faqHeader: defaultTravelPageContent.faqHeader,
    seo: defaultTravelPageContent.seo,
  });

  // 4. Manpower Page Singleton
  docs.push({
    _id: "manpowerPage",
    _type: "manpowerPage",
    hero: {
      ...defaultManpowerPageContent.hero,
      metrics: addKeys(defaultManpowerPageContent.hero.metrics, "mp-metric"),
      candidateStages: addKeys(defaultManpowerPageContent.hero.candidateStages, "cand-stage"),
      employerStages: addKeys(defaultManpowerPageContent.hero.employerStages, "emp-stage"),
    },
    pipelineStageShow: {
      ...defaultManpowerPageContent.pipelineStageShow,
      stages: addKeys(defaultManpowerPageContent.pipelineStageShow.stages, "pipe-stage"),
    },
    candidateHub: {
      ...defaultManpowerPageContent.candidateHub,
      trustPillars: addKeys(defaultManpowerPageContent.candidateHub.trustPillars, "trust"),
      mobilitySteps: addKeys(defaultManpowerPageContent.candidateHub.mobilitySteps, "mob"),
      sectors: addKeys(defaultManpowerPageContent.candidateHub.sectors, "sec"),
    },
    complianceBanner: {
      ...defaultManpowerPageContent.complianceBanner,
      trustMetrics: addKeys(defaultManpowerPageContent.complianceBanner.trustMetrics, "comp-metric"),
    },
    employerSection: {
      ...defaultManpowerPageContent.employerSection,
      steps: addKeys(defaultManpowerPageContent.employerSection.steps, "emp-step"),
    },
    faqHeader: defaultManpowerPageContent.faqHeader,
    seo: defaultManpowerPageContent.seo,
  });

  // 4b. Contact Desk Page Singleton
  docs.push({
    _id: "contactPage",
    _type: "contactPage",
    ...defaultContactPageContent,
  });

  // 4c. Job Sectors (Normalized Filter Reference Docs)
  const sectorDocs = (defaultManpowerPageContent.candidateHub?.sectors || []).filter(
    (s) => s.id && s.id !== "all"
  );
  for (let i = 0; i < sectorDocs.length; i++) {
    const sec = sectorDocs[i];
    docs.push({
      _id: `jobSector-${sec.id}`,
      _type: "jobSector",
      orderRank: i + 1,
      slug: toSanitySlug(sec.id),
      label_en: sec.label_en,
      label_hy: sec.label_hy,
    });
  }

  // 5. Tour Packages
  for (let i = 0; i < defaultTours.length; i++) {
    const tour = defaultTours[i];
    const media = await resolveMediaField(tour.image, uploadFn);
    const { image: _discard, slug, ...rest } = tour;
    docs.push({
      _id: `tourPackage-${tour.id}`,
      _type: "tourPackage",
      orderRank: i + 1,
      ...rest,
      slug: toSanitySlug(slug),
      isPublished: tour.isPublished !== false,
      ...media,
    });
  }

  // 6. Travel Services
  for (let i = 0; i < defaultTravelServices.length; i++) {
    const svc = defaultTravelServices[i];
    const media = await resolveMediaField(svc.image, uploadFn);
    const { image: _discard, slug, ...rest } = svc;
    docs.push({
      _id: `travelService-${svc.id}`,
      _type: "travelService",
      orderRank: i + 1,
      ...rest,
      slug: toSanitySlug(slug),
      isPublished: svc.isPublished !== false,
      ...media,
    });
  }

  // 7. Job Vacancies
  const seededSectorIds = new Set(sectorDocs.map((s) => s.id));
  for (let i = 0; i < defaultJobVacancies.length; i++) {
    const job = defaultJobVacancies[i];
    const { slug, ...rest } = job;
    docs.push({
      _id: `jobVacancy-${job.id}`,
      _type: "jobVacancy",
      orderRank: i + 1,
      ...rest,
      ...(seededSectorIds.has(job.sector)
        ? {
            sectorRef: {
              _type: "reference",
              _ref: `jobSector-${job.sector}`,
            },
          }
        : {}),
      slug: toSanitySlug(slug || job.id),
    });
  }

  // 8. FAQs (Travel + Manpower)
  const allFaqs = [...defaultTravelFaqs, ...defaultManpowerFaqs];
  for (let i = 0; i < allFaqs.length; i++) {
    const faq = allFaqs[i];
    docs.push({
      _id: `faqItem-${faq.category}-${i + 1}`,
      _type: "faqItem",
      orderRank: i + 1,
      ...faq,
      isPublished: true,
    });
  }

  return docs;
}

async function main() {
  const args = new Set(process.argv.slice(2));
  const exportNdjson = args.has("--export-ndjson");

  if (exportNdjson) {
    const docs = await buildDocuments(null);
    const outPath = path.join(rootDir, "sanity-seed.ndjson");
    const ndjson = docs.map((d) => JSON.stringify(d)).join("\n") + "\n";
    fs.writeFileSync(outPath, ndjson, "utf8");
    console.log(`[Sanity Seed] Exported ${docs.length} documents to ${outPath}`);
    return;
  }

  const projectId = (process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "").trim();
  const dataset = (process.env.NEXT_PUBLIC_SANITY_DATASET || "production").trim();
  const apiVersion = (process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01").trim();
  const token = (process.env.SANITY_API_WRITE_TOKEN || "").trim();

  if (!projectId || !token) {
    console.error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in environment (.env.local).\n" +
        "To export an offline NDJSON bundle instead, run:\n" +
        "  node scripts/seed-sanity.mjs --export-ndjson"
    );
    process.exit(1);
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  const uploadedAssetCache = new Map();
  const uploadLocalImage = async (publicRelPath) => {
    if (uploadedAssetCache.has(publicRelPath)) {
      return uploadedAssetCache.get(publicRelPath);
    }
    const localFile = path.join(rootDir, "public", publicRelPath.replace(/^\//, ""));
    if (!fs.existsSync(localFile)) {
      console.warn(`[Sanity Seed] Local image not found: ${localFile}`);
      return null;
    }
    console.log(`[Sanity Seed] Uploading image asset ${publicRelPath}...`);
    const asset = await client.assets.upload("image", fs.createReadStream(localFile), {
      filename: path.basename(localFile),
    });
    const ref = {
      _type: "image",
      asset: {
        _type: "reference",
        _ref: asset._id,
      },
    };
    uploadedAssetCache.set(publicRelPath, ref);
    return ref;
  };

  const docs = await buildDocuments(uploadLocalImage);
  console.log(`[Sanity Seed] Upserting ${docs.length} documents into ${projectId}/${dataset}...`);

  let tx = client.transaction();
  for (const doc of docs) {
    tx = tx.createOrReplace(doc);
  }
  await tx.commit();

  console.log(`[Sanity Seed] Done! Seeded ${docs.length} documents successfully.`);
}

main().catch((err) => {
  console.error("[Sanity Seed] Failed:", err);
  process.exit(1);
});
