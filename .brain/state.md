# Project State: De Organica LLC (`deorganica.am`)

**Updated:** 2026-11-19  
**Status:** Sanity CMS Integrated & Seeded (Project ID: `9gdgawyf`, Dataset: `production`, 36 Documents & CDN Images Seeded, Next.js 15 Static Verification PASS)

## Completed Work (Latest Session: Sanity CMS Setup & Content Ingestion)
1. **Sanity CMS Dataset & Authentication:**
   - Linked project ID `9gdgawyf` to local `.env.local` with public dataset `production`.
   - Seeded 36 bilingual documents (singletons: `homePage`, `travelPage`, `manpowerPage`, `contactPage`, `siteSettings`; collections: `tourPackages`, `travelServices`, `jobVacancies`).
   - Uploaded local photography directly from `public/images/tours/`, `public/images/manpower/`, and `public/images/heritage/` into Sanity CDN.
2. **Next.js 15 App Router Hardening:**
   - Updated `src/sanity/lib/client.ts` to `useCdn: false` for strict Next.js App Router Data Cache compliance, eliminating socket hang-ups.
   - Verified static site generation: all 20 routes (`/`, `/travel`, `/travel/[slug]`, `/manpower`, `/contact`, `/studio/[[...tool]]`) prerendered with 0 errors.
   - Synchronized system audit suite (`scripts/audit-full-system.mjs`) to official desk telephone `+374 55 569553` (32/32 tests passed).

## Completed Work (Latest Session: Sovereign Deployment & Infrastructure Routing)
1. **Sovereign Dual-Remote Git Workflow:**
   - Client GitHub repository established: `https://github.com/deorganicallc/De-Organica.git` (`client`).
   - Personal master repository retained as safety master: `https://github.com/razim-manzoor/De-Organica.git` (`origin`).
   - Configured dedicated token deployment and committer authorship (`De Organica <deorganicallc@gmail.com>`) ensuring 1-member Free Starter status on Netlify.

2. **Next.js 15 App Router Deployment on Netlify:**
   - Root `netlify.toml` created pinning Node.js 20 and `@netlify/plugin-nextjs` v5.
   - Deployed under `deorganicallc` Netlify account with automatic continuous deployment from `client/master`.
   - Visitor access set to Public, unblocking edge access restrictions.
   - Hardened `next.config.mjs` CSP (`frame-src 'self'; child-src 'self'`) and `src/app/globals.css` suppression rules to block edge-injected third-party widgets and badges.

3. **Master DNS Configuration at Name.am:**
   - **Apex Web Traffic:** `A` record `@` -> `75.2.60.5` (Netlify Load Balancer).
   - **Subdomain Web Traffic:** `CNAME` record `www` -> `de-organica.netlify.app`.
   - **Zoho Mail Routing (India DC):**
     - `MX` records `@` -> `mx.zoho.in` (10), `mx2.zoho.in` (20), `mx3.zoho.in` (50).
     - `TXT` SPF record `@` -> `v=spf1 include:zoho.in ~all`.
     - `TXT` DKIM record `zmail._domainkey` -> verified & propagated.
     - `TXT` domain verification code -> validated.

4. **Live Verification:**
   - `https://deorganica.am` returning HTTP 200 with full bilingual fonts and assets.
   - Global DNS propagation verified via live nslookup/Resolve-DnsName.

## Completed Work (Latest Session: Full Unlazy System Audit & Optimization)
1. **Unlazy Acceptance Gates Framework (`GATES.md`):**
   - Established and certified formal `unlazy` ledger with strict runnable assertions:
     - **G1**: Strict TypeScript verification across all code (`npx tsc --noEmit`) -> `PASS` (`sha256=34687822fb...`, exit=0)
     - **G2**: Static production build generating 20/20 routes (`npm run build`) -> `PASS` (`sha256=697d46baff...`, exit=0)
     - **G3**: Automated 32-point system audit (`scripts/audit-full-system.mjs`) -> `PASS` (`sha256=a2c53c8230...`, exit=0)
   - Certified all 3 gates via `gate-check.mjs --timeout 300 --approve GATES.md` with cryptographic SHA-256 evidence.

2. **Tailwind Color Architecture & Alignment:**
   - Added canonical color aliases in `tailwind.config.ts`: `brand.canvas: "#FBFBF9"`, `brand.alabaster: "#FBFBF9"`, `brand.forest.dark: "#192C17"`, and `brand.stone.DEFAULT: "#F4F3EE"`.
   - Replaced undefined color classes in `TourDetailView.tsx`, `src/app/travel/[slug]/page.tsx`, `error.tsx`, `not-found.tsx`, `privacy/page.tsx`, and `terms/page.tsx` with standard brand tokens (`bg-brand-stone-50`, `text-white`, `border-white/20`, `bg-brand-stone-100/80`).

3. **Subdomain Routing & SEO Consolidation (`src/middleware.ts`):**
   - Migrated from `NextResponse.rewrite` to **308 Permanent Redirects** for `travel.deorganica.am` -> `https://deorganica.am/travel` and `manpower.deorganica.am` / `careers.deorganica.am` -> `https://deorganica.am/manpower`.
   - Prevents split SEO rankings, 404 cross-links, and isolated cross-origin localStorage/cookies. Preserves query parameters and seamlessly supports local testing (`localhost:3000`).

4. **Section Anchor Link Alignment:**
   - Linked `/travel#tours` and `/travel#packages` to the active tours catalog in `FeaturedToursGrid.tsx` via dual-anchor targeting.
   - Updated `TourDetailView.tsx` "Back to Travel Packages" link from broken `#packages` to `#tours`.

5. **Anti-AI Design & Visual Cleanliness:**
   - Purged decorative eyebrow dots (`<span className="w-2 h-2 rounded-full bg-brand-olive" />`) from all section headers across `HeroDualGateway`, `TravelHero`, `FeaturedToursGrid`, `TravelServicesMatrix`, `ManpowerCandidateHub`, `ManpowerEmployerSection`, `PipelineStageShow`, `CorporateFoundation`, `DmcPartnerSection`, `YerevanCrossroadsBanner`, and `ContactSection`.
   - Stripped residual `Sparkles` icon from `TourDetailView.tsx` and `cms-fallbacks.ts`.
   - Simplified `TravelHero.tsx` destination photo overlay by eliminating the redundant altitude floating pill and integrating unboxed inline metadata (`km · m ASL · Season`).

6. **100% Local Asset Migration (Zero Unsplash Dependency):**
   - Replaced all external `images.unsplash.com` links in `cms-fallbacks.ts` and `deorganica-content.ts` with local verified photography in `public/images/tours/` and `public/images/heritage/`.
   - Guaranteed 100% offline reliability, zero third-party tracking, and zero hotlink failure risks.

7. **Verification & Production Serving:**
   - `npm run lint` (`tsc --noEmit`): 0 errors.
   - `npm test` (`node scripts/audit-full-system.mjs`): 32/32 tests passed with 0 defects.
   - `npm run build`: Compiled all 20 static pages in 3.3 min with 0 errors.
   - Live production server running on port 3000 (`http://localhost:3000`) returning HTTP 200.

2. **Code Optimization & Asset Architecture:**
   - **Zero Raw `<img>` Tags:** Replaced 100% of raw `<img>` tags in `HeroDualGateway.tsx`, `TravelHero.tsx`, `TravelServicesMatrix.tsx`, and `FeaturedToursGrid.tsx` with optimized Next.js `<Image fill ... />`, utilizing proper sizes, quality, priority flags, and aspect ratios.
   - **Dead Code Purge:** Eradicated orphan components `ItineraryStageShow.tsx` (18.7 KB) and `TravelHeritageShowcase.tsx` (5.4 KB).
   - **Production Engine Hardening (`next.config.mjs`):** Enabled `poweredByHeader: false` (security), `compress: true` (Brotli/Gzip), and Next.js modern image compression formats `["image/avif", "image/webp"]`.
   - **Chunk Code-Splitting:** Configured dynamic import for `ConciergeDrawer` in `src/app/layout.tsx` conforming to Next.js 15 App Router Server Component standards, isolating modal bundle weight.

3. **Top Bar & Anti-Slop Refinements:**
   - Eradicated active nav capsule pill in `Header.tsx` (replaced with subtle stone `rounded-xl` and 2px botanical olive indicator).
   - Purged developer `font-mono` on telephone touchpoint, replaced with institutional `tabular-nums font-medium text-xs lg:text-[13px]`.
   - Purged AI `Sparkles` icon from both desktop and mobile CTA buttons and flagship tour badge.
   - Replaced pill geometry in `LanguageSwitcher.tsx` with a tailored 12px squircle segmented control.

4. **Residual Forbidden Term Purge:**
   - Purged residual pricing terms in `src/components/LegalDocumentView.tsx`: Replaced *"3. Travel Quotes, Bookings & Currency"* and *"Final seasonal pricing, hotel allotments, airline schedules, and B2B net ground-handling rates..."* with *"3. Travel Itineraries, Allotments & Ground Handling"* and formal ground-handling confirmation agreements (zero cost/quote/pricing mentions).
   - Cleaned residual comment in `src/components/FeaturedToursGrid.tsx`.

5. **32 Automated System Checks Verified:**
   - **Zero Cost/Price/Fee**: 0 banned terms across `src/data`, `src/components`, and `src/app`.
   - **Bilingual Parity**: Complete English and Armenian parity across company details, tour highlights, inclusions, and UI labels.
   - **Contact Channels**: Official formatted phone `+374 93 723321` and digits `37493723321` unified; zero legacy placeholder numbers (`+374 10 000000` / `+374 99 000000`).
   - **Anti-Slop**: 0 `Sparkles` icons, 0 `font-mono` on phone numbers, 0 awkward oval pills on active nav items, 0 pseudo-configurators.
   - **Concierge Drawer**: Context-aware WhatsApp URL generation, 1-click fallback banner, strict 4MB file limit, and PDF/DOC/DOCX validation.
   - **Accessibility**: Skip-to-content anchor present, ARIA labels verified on all interactive buttons and mobile toggles.
   - **Asset & Config**: Zero raw `<img>` tags, dynamic code-splitting verified, zero orphan components, AVIF/WebP image formats enabled, compression and security headers verified.

6. **Production Build Status:**
   - All 20 static pages prerendered with 0 errors (`npm run build`), including dynamic localized tour pages, studio, API endpoints, sitemaps, and legal routes. First Load JS shared by all routes: 103 kB.

7. **Punch-List Hardening & Architectural Refactor (Latest Update):**
   - **Resend Error Handling (`src/app/api/inquiry/route.ts`):** Destructured `{ data, error } = await resend.emails.send(...)`, returning HTTP 502 with fallback error message if transmission fails; documented in-memory rate-limiter and horizontal Redis/KV scaling blueprint.
   - **Fallback Image Rectification:** Replaced non-existent `/images/noravank.png` and `/images/tatev.png` fallbacks with verified local assets (`/images/tours/garni-temple.jpg` and `/images/tours/wings-of-tatev.jpg`) in `TourDetailView.tsx` and `fetch.ts`. Automated script verified 100% of images referenced in code exist on disk.
   - **Armenian SSR Hydration Parity:** Added cookie-backed persistence (`deorganica_locale`) in `LanguageContext.tsx` and read server-side in `src/app/layout.tsx` via `await cookies()`, completely eliminating English hydration flash for returning Armenian visitors.
   - **Modular Drawer Architecture:** Extracted `TravelInquiryFields.tsx`, `CandidateInquiryFields.tsx`, and `EmployerInquiryFields.tsx` under `src/components/drawer/`, reducing `ConciergeDrawer.tsx` size by ~45% while preserving all validation, dialog management, and direct WhatsApp routing.
   - **Repo Hygiene & Scripts:** Added `"lint": "tsc --noEmit"` and `"test": "node scripts/audit-full-system.mjs"` to `package.json`; sanitized placement fee references in `README.md`.
   - **Live Production Server:** Serving fresh production build on port 3000 (`http://localhost:3000`) with zero runtime errors or warnings.


8. **Netlify Deployment Synchronization (Commit `b932f5d`):**
   - **Root Cause of Stale Netlify Deploy:** Local `master` commits had not been published to remote GitHub. `origin/master` was stalled at commit `daa42af` and `origin/main` was stalled at commit `065b08c`. Netlify pulled and deployed the stale remote branch.
   - **Dual-Branch Push:** Updated both `origin/master` and `origin/main` in lockstep to commit `b932f5d`.
   - **Netlify Configuration:** `netlify.toml` committed with `@netlify/plugin-nextjs`, `npm run build`, and `publish = ".next"`; `@netlify/plugin-nextjs` v5 added to `devDependencies`.
   - **UI Contrast & Destination Curations:** Defaulted applicant consent checkbox to unchecked, enhanced dark CTA button icons to `brand-gold-onDark` for maximum contrast, and synchronized destination copy.

9. **Founder Removal & Overview Manpower Photo Rectification (Commit `c20c537`):**
   - **Founder Name Purge:** Completely removed all mentions of the founder name across [Footer.tsx](file:///r:/Projects/De%20Organica/src/components/Footer.tsx), [ContactSection.tsx](file:///r:/Projects/De%20Organica/src/components/ContactSection.tsx), [deorganica-content.ts](file:///r:/Projects/De%20Organica/src/data/deorganica-content.ts), [content.ts](file:///r:/Projects/De%20Organica/src/types/content.ts), [package.json](file:///r:/Projects/De%20Organica/package.json), [README.md](file:///r:/Projects/De%20Organica/README.md), and [AGENTS.md](file:///r:/Projects/De%20Organica/AGENTS.md).
   - **Overview Manpower Photo:** Replaced the tourist attraction photo (`/images/tours/yerevan-cascade.jpg`) on the Overview home page gateway ([HeroDualGateway.tsx](file:///r:/Projects/De%20Organica/src/components/HeroDualGateway.tsx) & [cms-fallbacks.ts](file:///r:/Projects/De%20Organica/src/data/cms-fallbacks.ts)) with a dedicated, professional corporate workforce image (`/images/manpower/international-workforce.jpg`).
   - **Push Verification:** Both `origin/master` and `origin/main` synchronized to commit `c20c537`; 32/32 automated audit tests verified clean.


10. **End-to-End Audit & Remediation (2026-11-25):**
    - **ISR Restored:** Removed `cookies()` from [layout.tsx](file:///r:/Projects/De%20Organica/src/app/layout.tsx) (moved cookie fallback read to [LanguageContext.tsx](file:///r:/Projects/De%20Organica/src/context/LanguageContext.tsx)), restoring `○ (Static)` / `● (SSG)` with `1m` ISR on `/`, `/travel`, `/travel/[slug]`, `/manpower`, `/contact`, `/privacy`, `/terms`, and `/_not-found`.
    - **API & Drawer Hardening:** Added server-side required-field, phone-digit, and email-format validation, Netlify `x-nf-client-connection-ip` rate-limit IP detection, and production `503` guard when `RESEND_API_KEY` is missing in [route.ts](file:///r:/Projects/De%20Organica/src/app/api/inquiry/route.ts). Fixed mobile Safari async `window.open` popup blocking in [ConciergeDrawer.tsx](file:///r:/Projects/De%20Organica/src/components/ConciergeDrawer.tsx) and ISO code disambiguation (`+1` US/CA, `+7` RU/KZ) in [PhoneCountryInput.tsx](file:///r:/Projects/De%20Organica/src/components/PhoneCountryInput.tsx).
    - **UX, CMS & Copy Alignment:** Fixed Sunday/18:00 desk-open logic and clock hydration flash in [ContactSection.tsx](file:///r:/Projects/De%20Organica/src/components/ContactSection.tsx); switched [TravelServicesMatrix.tsx](file:///r:/Projects/De%20Organica/src/components/TravelServicesMatrix.tsx) from hardcoded ID whitelist to dedicated-section denylist; marked unrendered legacy Sanity fields (`itineraryStageShow`, `heritageShowcase`, `ceo`, `price`/`salary`/`externalRecruitmentUrl`) `hidden: true`; unified work permit timeline (`15–25 business days`); purged remaining `Quote`/`Արժեք`/`ծախս` copy and `<Sparkles>`/`font-mono` leftovers; made [error.tsx](file:///r:/Projects/De%20Organica/src/app/error.tsx) bilingual; added canonical URLs, default OG/Twitter images, and `FAQPage` JSON-LD.
    - **ESLint & Verification:** Added `eslint@^9`, `eslint-config-next@15.5.29`, and [.eslintrc.json](file:///r:/Projects/De%20Organica/.eslintrc.json); fixed `@typescript-eslint/no-explicit-any` in [utils.ts](file:///r:/Projects/De%20Organica/src/lib/utils.ts) and unused icon imports.
    - **Verified Clean:** `npm run typecheck` (exit 0), `npm test` (32/32 passed), `npm run lint` (0 warnings/errors), `npm run build` (20/20 pages, ISR `1m` active).

11. **Deep Audit Pass 2 — Brand Assets, SEO, Accessibility, Armenian Parity, Security & Runtime Tests (2026-11-25):**
    - **Logo, Icons & OG Card ([scripts/build-brand-assets.py](file:///r:/Projects/De%20Organica/scripts/build-brand-assets.py)):** Re-extracted halo-free transparent `588x462` crests (`de-organica-logo.png`, `de-organica-logo-white.png`), tight `385x300` mark, and crisp `574x128` horizontal header/footer lockups (`de-organica-horizontal.png`, `de-organica-horizontal-white.png`, preserving `#C5E096` olive contrast on dark); wired into [Logo.tsx](file:///r:/Projects/De%20Organica/src/components/Logo.tsx). Generated multi-resolution `public/favicon.ico`, refined `public/icon.svg`, `src/app/apple-icon.png` (180x180), `icon-192.png`/`icon-512.png`, `src/app/manifest.ts`, `public/.well-known/security.txt`, and `1200x630` `public/images/og-deorganica.jpg`; losslessly optimized JPEGs in `public/images/`.
    - **SEO & Routing:** Added `www.deorganica.am` -> `https://deorganica.am` `308` redirect in [middleware.ts](file:///r:/Projects/De%20Organica/src/middleware.ts); wired `_updatedAt` (`updatedAt`) and stabilized static fallback timestamp in [sitemap.ts](file:///r:/Projects/De%20Organica/src/app/sitemap.ts); pointed default OG/Twitter metadata to `og-deorganica.jpg` (`1200x630`), added `languages: { en, "x-default" }` alternates in [layout.tsx](file:///r:/Projects/De%20Organica/src/app/layout.tsx), added `"Armenia"` to `/manpower` default SEO title, and added `BreadcrumbList` + `TouristTrip` + `FAQPage` JSON-LD across pages.
    - **WCAG Contrast, Motion & Keyboard A11y:** Switched filled WhatsApp CTAs to WCAG AA `#15803D`/`#166534`, added `motion-reduce:animate-none` to pulsing indicators, added bounding-box light-dismiss fallback + open-listbox `Esc` guard + roving tab focus in [ConciergeDrawer.tsx](file:///r:/Projects/De%20Organica/src/components/ConciergeDrawer.tsx), full arrow/Home/End roving tabindex in [PipelineStageShow.tsx](file:///r:/Projects/De%20Organica/src/components/PipelineStageShow.tsx), and keyboard listbox navigation in [PhoneCountryInput.tsx](file:///r:/Projects/De%20Organica/src/components/PhoneCountryInput.tsx).
    - **Armenian Parity, Security Headers & Print CSS:** Localized remaining select options, altitude units, tour inquiry buttons, and WhatsApp prefill copy; tightened CSP + added `Cross-Origin-Opener-Policy: same-origin-allow-popups` in [next.config.mjs](file:///r:/Projects/De%20Organica/next.config.mjs); normalized WhatsApp digit stripping in [whatsapp.ts](file:///r:/Projects/De%20Organica/src/lib/whatsapp.ts); added `@media print` styling in [globals.css](file:///r:/Projects/De%20Organica/src/app/globals.css); added runtime unit/integration test suite [test-runtime.mjs](file:///r:/Projects/De%20Organica/scripts/test-runtime.mjs).
    - **Optional Free Analytics Hooks ([AnalyticsProvider.tsx](file:///r:/Projects/De%20Organica/src/components/AnalyticsProvider.tsx), [analytics.ts](file:///r:/Projects/De%20Organica/src/lib/analytics.ts)):** Wired regex-validated env hooks for free Cloudflare Web Analytics (`NEXT_PUBLIC_CF_ANALYTICS_TOKEN`, cookieless) and free Google Analytics 4 (`NEXT_PUBLIC_GA_MEASUREMENT_ID`, Consent Mode v2 + bilingual banner only shown when GA4 ID is set), plus `generate_lead` and `whatsapp_click` tracking hooks and updated [LegalDocumentView.tsx](file:///r:/Projects/De%20Organica/src/components/LegalDocumentView.tsx).
    - **Remaining External/Manual Items:** Revoke/rotate PAT on GitHub (`deorganicallc`) if desired; paste free `NEXT_PUBLIC_CF_ANALYTICS_TOKEN` or `NEXT_PUBLIC_GA_MEASUREMENT_ID` into Netlify env vars once created; check live `info@deorganica.am` / `deorganicallc@gmail.com` delivery; submit `sitemap.xml` in Google Search Console.
