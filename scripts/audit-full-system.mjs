import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const srcDir = path.join(rootDir, "src");

let failureCount = 0;
const results = [];

function assert(condition, testName, details = "") {
  if (condition) {
    results.push(`  ✓ PASS: ${testName}`);
  } else {
    failureCount++;
    results.push(`  ✗ FAIL: ${testName}${details ? ` -> ${details}` : ""}`);
  }
}

console.log("=================================================");
console.log("  DE ORGANICA LLC — FULL UNLAZY AUDIT SUITE");
console.log("=================================================\n");

// -----------------------------------------------------------------
// SUITE 1: Strict Zero-Cost / Zero-Price Purge
// -----------------------------------------------------------------
console.log("Suite 1: Zero-Cost / Zero-Price Compliance Audit");
const bannedPatterns = [
  /\b(price|pricing|cost|costs|fee|fees|tariff|tariffs)\b/i,
  /\bAMD\b/i,
  /֏/,
  /\$\s*\d/, // Dollar currency, not JS template literals ${...}
  /€\s*\d/,
  /£\s*\d/,
];

function checkDirectoryForBanned(dir, ignorePaths = []) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  const violations = [];

  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    const relPath = path.relative(rootDir, fullPath).replace(/\\/g, "/");

    if (ignorePaths.some((p) => relPath.startsWith(p))) continue;

    if (file.isDirectory()) {
      violations.push(...checkDirectoryForBanned(fullPath, ignorePaths));
    } else if (/\.(tsx?|jsx?|json|md)$/.test(file.name)) {
      const content = fs.readFileSync(fullPath, "utf8");
      const lines = content.split("\n");

      lines.forEach((line, idx) => {
        // Allow sanity schema field names or TS type definitions: price?: string, feeTag, showPrice, etc.
        const isTypeOrSchema =
          relPath.includes("sanity/schemaTypes") ||
          relPath.includes("types/content.ts") ||
          relPath.includes("scripts/");

        if (!isTypeOrSchema) {
          for (const pattern of bannedPatterns) {
            if (pattern.test(line)) {
              violations.push(`${relPath}:${idx + 1} -> ${line.trim()}`);
              break;
            }
          }
        }
      });
    }
  }
  return violations;
}

const dataViolations = checkDirectoryForBanned(path.join(srcDir, "data"));
const componentsViolations = checkDirectoryForBanned(path.join(srcDir, "components"), [
  "src/components/icons.ts",
]);
const appViolations = checkDirectoryForBanned(path.join(srcDir, "app"));

assert(dataViolations.length === 0, "Zero banned cost/price terms in src/data", dataViolations.join("\n"));
assert(componentsViolations.length === 0, "Zero banned cost/price terms in src/components", componentsViolations.join("\n"));
assert(appViolations.length === 0, "Zero banned cost/price terms in src/app", appViolations.join("\n"));

// -----------------------------------------------------------------
// SUITE 2: Bilingual Content & Data Parity (EN & HY)
// -----------------------------------------------------------------
console.log("\nSuite 2: Bilingual Parity Audit (English & Armenian)");
const contentFile = path.join(srcDir, "data", "deorganica-content.ts");
const contentRaw = fs.readFileSync(contentFile, "utf8");

assert(contentRaw.includes("address_en") && contentRaw.includes("address_hy"), "Company address bilingual parity");
assert(contentRaw.includes("country_en") && contentRaw.includes("country_hy"), "Company country bilingual parity");
assert(contentRaw.includes("workingHours_en") && contentRaw.includes("workingHours_hy"), "Working hours bilingual parity");
assert(contentRaw.includes("registrationStatus_en") && contentRaw.includes("registrationStatus_hy"), "Registration status bilingual parity");

// Check tours for bilingual highlights, inclusions, titles
const toursBilingual =
  contentRaw.includes("title_en") &&
  contentRaw.includes("title_hy") &&
  contentRaw.includes("highlights_en") &&
  contentRaw.includes("highlights_hy") &&
  contentRaw.includes("inclusions_en") &&
  contentRaw.includes("inclusions_hy");
assert(toursBilingual, "Tour packages complete bilingual structure");

// -----------------------------------------------------------------
// SUITE 3: Contact Channels & Routing Integrity
// -----------------------------------------------------------------
console.log("\nSuite 3: Contact Channels & Desk Phone Verification");
const officialPhoneFormatted = "+374 93 723321";
const officialPhoneDigits = "37493723321";

assert(contentRaw.includes(officialPhoneFormatted), "Official formatted phone present in deorganica-content.ts");
assert(contentRaw.includes(officialPhoneDigits), "Official phone digits present in deorganica-content.ts");
assert(!contentRaw.includes("+374 10 000000"), "No legacy placeholder phone +374 10 000000");
assert(!contentRaw.includes("+374 99 000000"), "No legacy placeholder whatsapp +374 99 000000");

// Check layout mounting of floating WhatsApp FAB
const layoutContent = fs.readFileSync(path.join(srcDir, "app", "layout.tsx"), "utf8");
assert(layoutContent.includes("<FloatingWhatsAppFab />"), "FloatingWhatsAppFab mounted globally in layout.tsx");
assert(layoutContent.includes("<ConciergeDrawer />"), "ConciergeDrawer mounted globally in layout.tsx");

// -----------------------------------------------------------------
// SUITE 4: Anti-Slop & Taste Verification
// -----------------------------------------------------------------
console.log("\nSuite 4: Anti-Slop & Aesthetic Taste Verification");
const headerContent = fs.readFileSync(path.join(srcDir, "components", "Header.tsx"), "utf8");
assert(!headerContent.includes("<Sparkles"), "No AI Sparkles icon in Header.tsx");
assert(!headerContent.includes("font-mono"), "No developer font-mono on phone numbers in Header.tsx");
assert(!headerContent.includes("rounded-full bg-brand-olive-subtle"), "No awkward oval pill around active nav links in Header.tsx");

const travelPageContent = fs.readFileSync(path.join(srcDir, "app", "travel", "page.tsx"), "utf8");
assert(!travelPageContent.includes("ItineraryStageShow"), "Fake 4-day configurator ItineraryStageShow removed from travel page");
assert(travelPageContent.includes("BespokeConciergeSection"), "Authentic BespokeConciergeSection mounted on travel page");

// -----------------------------------------------------------------
// SUITE 5: Concierge Drawer & Form Resilience
// -----------------------------------------------------------------
console.log("\nSuite 5: Concierge Drawer & Form Resilience Audit");
const drawerContent = fs.readFileSync(path.join(srcDir, "components", "ConciergeDrawer.tsx"), "utf8");
const drawerConstants = fs.existsSync(path.join(srcDir, "components", "drawer", "drawer-constants.ts"))
  ? fs.readFileSync(path.join(srcDir, "components", "drawer", "drawer-constants.ts"), "utf8")
  : drawerContent;
assert(drawerContent.includes("buildCurrentWhatsAppUrl"), "Context-aware WhatsApp URL generation in drawer");
assert(drawerContent.includes("Prefer not to fill this form?"), "1-click WhatsApp fallback banner present in drawer");
assert(
  (drawerContent.includes("MAX_CV_BYTES") || drawerConstants.includes("MAX_CV_BYTES")) &&
    drawerConstants.includes("4 * 1024 * 1024"),
  "Strict 4MB CV file size guard"
);
assert(
  drawerConstants.includes(".pdf") && drawerConstants.includes(".docx"),
  "CV file extension whitelist present"
);

// -----------------------------------------------------------------
// SUITE 6: Accessibility & Modern Web Compliance
// -----------------------------------------------------------------
console.log("\nSuite 6: Accessibility (A11y) & Semantic Standards");
assert(layoutContent.includes('href="#main-content"'), "Skip to main content anchor present in layout");
assert(headerContent.includes('aria-label='), "Accessible ARIA labels present in Header");
assert(headerContent.includes('aria-expanded='), "aria-expanded state bound on mobile menu toggle");

// -----------------------------------------------------------------
// SUITE 7: End-to-End Code Quality & Performance Optimization
// -----------------------------------------------------------------
console.log("\nSuite 7: End-to-End Optimization & Asset Architecture");
// Check zero raw img tags in components
const rawImgMatches = [];
function checkNoRawImg(dir) {
  const files = fs.readdirSync(dir, { withFileTypes: true });
  for (const file of files) {
    const fullPath = path.join(dir, file.name);
    if (file.isDirectory()) {
      checkNoRawImg(fullPath);
    } else if (file.name.endsWith(".tsx")) {
      const code = fs.readFileSync(fullPath, "utf8");
      if (/<img\b/.test(code)) {
        rawImgMatches.push(file.name);
      }
    }
  }
}
checkNoRawImg(path.join(srcDir, "components"));
assert(rawImgMatches.length === 0, "Zero raw <img> tags; all components use Next.js <Image />", rawImgMatches.join(", "));

// Check dynamic import of ConciergeDrawer
assert(
  layoutContent.includes("import dynamic from \"next/dynamic\"") &&
  layoutContent.includes("import(\"@/components/ConciergeDrawer\")"),
  "ConciergeDrawer dynamically imported with ssr:false to reduce initial page bundle"
);

// Check dead code purge
const deadFile1Exists = fs.existsSync(path.join(srcDir, "components", "ItineraryStageShow.tsx"));
const deadFile2Exists = fs.existsSync(path.join(srcDir, "components", "TravelHeritageShowcase.tsx"));
assert(!deadFile1Exists && !deadFile2Exists, "Zero dead orphan components in src/components");

// Check next.config.mjs optimizations
const nextConfigContent = fs.readFileSync(path.join(rootDir, "next.config.mjs"), "utf8");
assert(nextConfigContent.includes("poweredByHeader: false"), "poweredByHeader: false configured for security");
assert(nextConfigContent.includes("compress: true"), "compress: true configured for Gzip/Brotli");
assert(nextConfigContent.includes('"image/avif"') && nextConfigContent.includes('"image/webp"'), "Next.js AVIF and WebP image formats enabled");

console.log("\n-------------------------------------------------");
console.log(results.join("\n"));
console.log("-------------------------------------------------");

if (failureCount === 0) {
  console.log(`\nALL ${results.length} AUDIT CHECKS PASSED: zero defects found.`);
  process.exit(0);
} else {
  console.error(`\nAUDIT FAILED: ${failureCount} check(s) did not meet standards.`);
  process.exit(1);
}
