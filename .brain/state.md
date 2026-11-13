# Project State: De Organica LLC (`deorganica.am`)

**Updated:** 2026-11-12  
**Status:** Production-Hardened & Audited (WCAG AA Contrast, Native Top-Layer Dialog, Vector SVG Brand Identity, Modern Web & Impeccable Clean, 100/100 Lighthouse Accessibility/Best Practices/SEO/Agentic Browsing Across All 4 Routes)

## Completed Work
1. **Zero-Bias Editorial Pruning & Natural Heading Refactoring:**
   - **Eliminated Buzzword Inflation:** Replaced stiff, corporate-manual jargon (*"Hospitality Infrastructure"*, *"Terroir Journeys"*, *"Ethical Workforce Mobility"*, *"Human Capital"*) with crisp, confident luxury statements:
     - `/travel` Hero: *"Private Tours & Bespoke Journeys in Armenia"* (*«Անհատական Տուրեր և Բացառիկ Ճամփորդություններ Հայաստանում»*)
     - `/travel` Services: *"Complete Travel & Ground Services in Armenia"* (*«Ամբողջական Տուրիստական Ծառայություններ Հայաստանում»*)
     - `/travel` Tours: *"Signature Armenia Tours & Multi-Day Journeys"* (*«Հայաստանի Հեղինակային Տուրեր և Երթուղիներ»*)
     - `/travel` Heritage: *"Living Heritage, Gastronomy & Natural Wonders"* (*«Պատմական Ժառանգություն, Գաստրոնոմիա և Բնություն»*)
     - `/travel` DMC: *"Your Trusted DMC & Ground Partner in Armenia"* (*«Ձեր Վստահելի DMC Գործընկերը Հայաստանում»*)
     - `/manpower` Hero: *"International Recruitment & Staffing with Zero Upfront Fees"* (*«Միջազգային Հավաքագրում և Աշխատուժ՝ 0 ֏ Կանխավճարով»*)
     - `/manpower` Pipeline: *"How It Works: From Application to Arrival"* (*«Ինչպես է Աշխատում՝ Դիմումից Մինչև Ժամանում»*)
     - `/manpower` Compliance: *"100% Legal Work Permits. Zero Upfront Candidate Fees."* (*«100% Օրինական Աշխատանքի Թույլտվություն և 0 ֏ Կանխավճար»*)
     - `/manpower` Openings: *"Current Job Openings in Armenia"* (*«Թափուր Աշխատատեղեր Հայաստանում»*)
     - `/manpower` Employers: *"Enterprise Workforce Solutions for Armenia"* (*«Աշխատուժի Լուծումներ Հայաստանի Գործատուների Համար»*)
     - Contact Desks: *"Contact Our Yerevan Office"* (*«Կապ Հաստատեք Երևանի Մեր Գրասենյակի Հետ»*)
   - **Eradicated Eyebrow-to-Heading Duplication:** Replaced duplicate phrases with clean category markers or institutional location pins.
   - **Pruned Triple-Layer Card Redundancy:** Removed the redundant 3-4 line middle prose paragraphs inside `TravelServicesMatrix.tsx` and `FeaturedToursGrid.tsx`. Every card now follows an ultra-crisp, luxury hierarchy: Title → 1-line hook → 3 scannable bullet points → direct CTA buttons.
   - **Removed Duplicate `CorporateFoundation`:** Stripped the holding-level corporate foundation component from `/manpower/page.tsx`, eliminating 600px of duplicate legal text before the contact desk and keeping it solely on the homepage `/`.
   - **Section Intro Subtitle Pruning:** Shortened 40–50 word paragraphs into punchy, elegant 15–20 word introductory hooks.

2. **Brand Palette Harmonization Across Entire Application:**
   - Eradicated all off-brand generic Tailwind colors (`emerald-50/700/800`, `amber-50/800`, `slate-100/200`) across components.
   - Unified every component to De Organica's bespoke architectural brand palette:
     - Heritage Forest Green: `#233D20` (`brand-forest`)
     - Botanical Olive Leaf: `#668B2E` (`brand-olive`)
     - Warm Alabaster Canvas: `#FBFBF9`
     - Architectural Stone: `#F4F3EE` (`brand-stone`)
     - Historic Ink: `#1A2219` (`brand-ink`)
     - Reserved `#25D366` strictly for WhatsApp touchpoints.
   - Cleaned up `ContactSection.tsx`, `TravelServicesMatrix.tsx`, `FeaturedToursGrid.tsx`, `Header.tsx`, `HeroDualGateway.tsx`, `PipelineStageShow.tsx`, `ManpowerHero.tsx`, and `ManpowerCandidateHub.tsx`.

2. **Image-to-Text Mismatch Resolution & 100% 200 OK Asset Verification:**
   - Audited and corrected all photographic assets that previously mismatched Armenian geography:
     - **Lake Sevan & Dilijan Forest**: Replaced mismatched Dubai skyscraper skyline with authentic high-altitude turquoise alpine waters (`photo-1506744038136-46273834b3fb`).
     - **Khor Virap, Areni Wine & Noravank**: Replaced generic canyon with Mount Ararat valley & chapel (`photo-1596484552834-6a58f850e0a1`).
     - **Wings of Tatev & Goris Rock Forest**: Replaced tropical palm pool resort with dramatic Vorotan mountain gorge (`photo-1464822759023-fed622ff2c3b`).
     - **Customized Private Trips**: Replaced US desert campervan with scenic Armenian highland road expedition (`photo-1507608869274-d3177c8bb4c7`).
     - **Hotels & Chauffeur Airport Transfers**: Replaced plain steering wheel with executive chauffeur transfer sedan (`photo-1549317661-bd32c8ce0db2`).
     - **Cultural & Nature Tours**: Replaced 404 URL with verified Armenian cliffside stone monastery (`photo-1563245372-f21724e3856d`).
     - **Yerevan City & Monasteries**: Replaced hiker in woods with Yerevan historic stone architecture and cathedral square (`photo-1541872703-74c5e44368f9`).
   - Verified that all 19 images on `/travel` and all images on `/manpower` return HTTP 200 and load with valid `naturalWidth > 0`.

3. **Manpower Form Architecture Elevation:**
   - **Candidate Mode**:
     - Added interactive Experience Level chips (`1–2 Yrs`, `3–5 Yrs`, `5+ Yrs`, `Entry Level`).
     - Added Primary Working Language selector (English, Russian, Armenian, Arabic, Hindi/Urdu).
     - Added Relocation Readiness / Mobility Status selector (In Home Country ready for visa, In Armenia, Working in GCC).
     - Added mandatory 0.00 AMD Zero Upfront Fee Legal Consent Checkbox with validation check before submission.
   - **Employer Mode**:
     - Added Company Corporate Legal Jurisdiction selector (Armenia TIN / ՀՎՀՀ, UAE/GCC Enterprise, Europe/International).
     - Added Deployment Timeline Urgency selector (Immediate &lt;15 days, Standard 30 days, Expansion 60+ days).
     - Added Accommodation & Housing Policy chips (Housing Provided, Worker Arranges, De Organica Assist).
   - **Full Dispatch Parity**:
     - Synchronized all candidate and employer telemetry into `ConciergeDrawer.tsx`, `/api/inquiry/route.ts` (styled HTML notification table), and `src/lib/whatsapp.ts`.

4. **Value-Add Components with 100% Armenian Bilingual Parity:**
   - **`TravelHeritageShowcase.tsx`**: Authored and mounted in `/travel` highlighting UNESCO Lavash bread baking masterclasses, Areni-1 6,100-year cave winemaking, Lake Sevan Ishkhan trout gastronomy, and Symphony of Stones basalt canyon.
   - **`TravelFaqSection.tsx`**: Authored and mounted in `/travel` providing clear, authoritative answers for visas, optimal travel seasons, high-altitude travel safety, bespoke budgeting, and B2B DMC ground handling terms.
   - **`ManpowerFaqSection.tsx`**: Authored and mounted in `/manpower` answering queries regarding zero-fee candidate placement, legal work permit timelines (25–35 days), 30-day employer replacement guarantee, AMD salary banking compliance, and Zvartnots EVN airport arrival handling.

5. **Accessible Multi-Region Phone Country Picker with Authentic Vector SVG Flags:**
   - Authored [`src/components/PhoneCountryInput.tsx`](file:///R:/Projects/De%20Organica/src/components/PhoneCountryInput.tsx) resolving the Windows emoji issue where `<select><option>` does not render regional flag emojis.
   - Designed 38+ handcrafted, high-fidelity vector SVG flags (Armenia, India, UAE, Philippines, Georgia, Russia, US, UK, Germany, France, Canada, Iran, Lebanon, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, Jordan, Egypt, Nepal, Sri Lanka, Bangladesh, Kazakhstan, Uzbekistan, Belarus, Ukraine, Italy, Spain, Netherlands, Greece, Cyprus, Poland, Australia, China, Singapore, and Custom `+...`).
   - Integrated live instant search filtering by country name (English and Armenian) or dial code prefix.
   - Mounted seamlessly into [`src/components/ConciergeDrawer.tsx`](file:///R:/Projects/De%20Organica/src/components/ConciergeDrawer.tsx).

6. **Official Logo Auto-Trimming & Header Geometry Elevation:**
   - Auto-trimmed all 40%+ transparent whitespace borders from the official brand assets (`public/images/de-organica-logo.png` & `public/images/de-organica-logo-white.png`) using Sharp bounding box trimming.
   - Sized logo to `h-16 sm:h-18` in [`src/components/Logo.tsx`](file:///R:/Projects/De%20Organica/src/components/Logo.tsx), ensuring bold, legible presence in the `h-20 sm:h-22` header bar.

7. **Elimination of "Eyebrow / Badge Fatigue" & Pulsing Radar Dots:**
   - Eradicated bubble-gum pill badges (`inline-flex rounded-full bg-white border...`) that made sections look like generic SaaS marketing.
   - Upgraded to high-end editorial tracked typography (`text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive`) with a quiet 1.5px green accent dot across [`src/components/HeroDualGateway.tsx`](file:///R:/Projects/De%20Organica/src/components/HeroDualGateway.tsx), [`src/components/CorporateFoundation.tsx`](file:///R:/Projects/De%20Organica/src/components/CorporateFoundation.tsx), and [`src/components/ContactSection.tsx`](file:///R:/Projects/De%20Organica/src/components/ContactSection.tsx).
   - Removed aggressive `animate-ping` pulsing radar dots from Header, Concierge Drawer, and Contact Desk, replacing them with steady institutional status chips (`● Yerevan, Armenia` / `● Երևան, Հայաստան`).

8. **Rich Media Integration on Overview Landing Gateway:**
   - Embedded photographic media preview frames inside both primary gateway cards in [`src/components/HeroDualGateway.tsx`](file:///R:/Projects/De%20Organica/src/components/HeroDualGateway.tsx):
     - **Travel & Tours**: Armenian alpine river and highland landscape with subtle dark gradient and division badge.
     - **Manpower & Recruitment**: Verified professional hospitality/enterprise talent with dark gradient and legal zero-fee guarantee badge.

9. **Institutional Commercial Architecture:**
   - Implemented Option 2 flagship master headline: *"Rooted in Armenia. Built for the World."* (Armenian: *«Արմատներով Հայաստանում: Բաց աշխարհի համար:»*).
   - Removed redundant brand prefix "De Organica" from the overview gateway cards, establishing clean, bold card titles: **Travel & Tours** and **Manpower & Careers** (Armenian: **«Զբոսաշրջություն և Տուրեր»** and **«Միջազգային Աշխատուժ և Կարիերա»**).
   - Structured as a sovereign Armenian commercial house (`De Organica LLC · Republic of Armenia`), seamlessly accommodating future enterprise verticals without re-architecting the brand.

10. **Generalization of Chauffeur Vehicle Fleet Architecture:**
    - Refactored all user-facing copy and form options from single-brand "Mercedes" to professional vehicle class categories:
      - *Comfort Economy Sedan* (Clean, modern AC vehicles like Toyota Camry/Corolla, 1–3 Guests)
      - *Executive Sedan* (Premium business/luxury comfort, 1–3 Guests)
      - *VIP Minivan & Passenger Van* (Spacious MPVs and vans like Toyota Alphard / Sprinter / V-Class, 4–16 Guests)
      - *Private Tour Coach* (Large group travel, 17+ Guests)

11. **Card Structural Deduplication & Forensic Photographic Grounding (New):**
    - **Replaced 100% of Mismatched Images with Local High-Resolution Cultural Assets:**
      - **Garni Temple & Geghard Monastery**: Replaced flower oil painting (`photo-1579783900882-c0d3dad7b119`) with authentic Hellenistic basalt colonnaded temple at Garni (`/images/tours/garni-temple.jpg`, 270 KB).
      - **Wings of Tatev Aerial Tramway**: Replaced asphalt highway bus (`photo-1544620347-c4fd4a3d5957`) with authentic aerial ropeway cabin of Wings of Tatev soaring over the lush Vorotan Gorge (`/images/tours/wings-of-tatev.jpg`, 372 KB).
      - **UNESCO Lavash Baking**: Replaced sourdough bread loaf (`photo-1509440159596-0249088772ff`) with authentic Armenian thin flatbread slapped on the walls of an underground clay tonir oven (`/images/heritage/tonir-lavash.jpg`, 882 KB).
      - **Tsaghkadzor Ski**: Replaced generic snow with Mount Teghenis chairlift and winter ski run (`/images/tours/tsaghkadzor-ski.jpg`, 308 KB).
      - **Yerevan Cascade**: Replaced generic monument with iconic Cafesjian Center Cascade monumental staircase overlooking Yerevan (`/images/tours/yerevan-cascade.jpg`, 469 KB).
    - **Elevated Tour #1 to Flagship Panoramic Showcase (`FeaturedToursGrid.tsx`):**
      - Transformed Tour #1 (*Areni Ancient Wine Terroir & Southern Canyons*) into a full-width panoramic card (`grid-cols-1 lg:grid-cols-12`) spanning both columns with a 50/50 horizontal split (panoramic photo on left with "Flagship Signature Terroir" gold badge, rich editorial story, sommelier highlights, and inquiry CTAs on right).
      - The remaining 4 tours form a balanced, symmetrical 2x2 grid, completely resolving the 5-card asymmetry.
    - **Streamlined Candidate Journey (`ManpowerCandidateHub.tsx`):**
      - Removed the redundant 3rd 4-card process grid that previously duplicated the relocation steps and pushed job openings off-screen.
      - Integrated the candidate relocation milestone flow as a sleek 1-line progress ribbon inside the Ethical Charter banner.
      - Surfaced the active job openings (filtered by Construction, Hospitality, Transportation, Agriculture) directly below the charter.
    - **Refined Button Hierarchy:**
      - Established clear visual hierarchy on cards: Primary high-contrast forest green action + secondary compact official WhatsApp trigger (`#25D366`).

12. **Verification Protocol:**
    - Production build verified with `npm run build` (exit code `0`, 11/11 static pages prerendered).
    - Playwright automated browser tests executed with complete vertical viewport scrolling across `/`, `/travel`, and `/manpower`:
      - **100% of images verified loading with `naturalWidth > 0`** (0 broken images).
      - **Zero console errors, zero uncaught runtime exceptions.**

13. **Comprehensive Documentation Suite & GitHub Integration:**
    - Configured remote origin: `https://github.com/razim-manzoor/De-Organica.git`.
    - Authored [`README.md`](file:///R:/Projects/De%20Organica/README.md): High-fidelity, institutional documentation covering corporate governance, divisions, bilingual typography, brand tokens, directory tree, environment variables, local setup, and verification.
    - Authored [`ARCHITECTURE.md`](file:///R:/Projects/De%20Organica/ARCHITECTURE.md): Deep architectural specification detailing runtime environment, single-source content engine, component hierarchy, serverless multi-channel dispatch, and security safeguards.
    - Authored [`LICENSE`](file:///R:/Projects/De%20Organica/LICENSE): Proprietary commercial license for De Organica LLC.
    - Synchronized `package.json` with repository URL and author metadata.

14. **Flow & Content Scrutiny Refinements:**
    - **Single-Source Navigation Parity:** Pointed `Header.tsx` directly to `deorganicaConfig.nav`, unifying route definitions across desktop and mobile menus.
    - **Anchor Collision Elimination:** Removed duplicate `id="tours-matrix"` wrapper on `/travel`, ensuring `#tours-matrix` smoothly scrolls to the tour catalog and `#travel-services` to the ground operations grid.
    - **Bilingual Provenance Parity:** Fixed `Footer.tsx` registration line to dynamically render `registrationStatus_hy` in Armenian mode rather than falling back to English.
    - **Cross-Route Link Alignment:** Updated footer employer links to point consistently to `/manpower#manpower-employers`.

15. **2026-11-12 Full Design, Accessibility, Platform & Security Elevation:**
    - **Typography & Token Hardening:** Replaced `Cinzel` with `Lora` + `Noto_Serif_Armenian` in `src/app/layout.tsx` & `globals.css`; added WCAG AA tokens (`brand.olive.text` `#4B6820`, `brand.olive.onDark` `#C5E096`, `brand.gold.text` `#7A5B20`, `brand.gold.onDark` `#E4C786`, darkened `ink.muted` `#424C40` & `ink.subtle` `#566153`) and eliminated all uncompiled Tailwind v4/arbitrary utilities (`shadow-xs`, `shadow-2xs`, `backdrop-blur-xs`, `outline-hidden`, `rounded-xs`, `scale-102..106`, `scale-98`, `py-0.2`, `sm:h-18`, `border-l-4`) and off-palette classes (`animate-pulse`, `animate-bounce`, `#25D366`, `emerald-*`, `rose-*`).
    - **Vector SVG Brand Identity:** Rebuilt `src/components/Logo.tsx` with inline SVG crest/wordmark and removed 9 dead legacy PNG/reference files (`skills-reference.jpg`, `de-organica-horizontal*.png`, `de-organica-lockup*.png`, `de-organica-wordmark.png`, `de-organica-logo*.png`, `de-organica-mark.png`), keeping `public/images/de-organica-logo.jpg` for JSON-LD structured data.
    - **Media Authenticity & SLA Normalization:** Replaced mismatched photos (Yosemite, dim sum, cropped chef) with genuine Armenia imagery (`garni-temple.jpg`, `yerevan-cascade.jpg`, `tsaghkadzor-ski.jpg`, `wings-of-tatev.jpg`, `tonir-lavash.jpg`). Normalized SLAs across EN/HY to `15–25 Days` / `15–25 business days` legal work permit issuance, `4 business hours` inquiry reply SLA, and `SHORTLIST < 72H` B2B staffing SLA.
    - **Native Top-Layer `<dialog>`, Forms, Accordions & Security:** Converted `ConciergeDrawer.tsx` to native `<dialog>` (`showModal()`, `@starting-style`, `transition-behavior: allow-discrete`, `[data-closing]` fallback, `overscroll-behavior: contain`), explicit `<label htmlFor>` associations, single `aria-live="polite"` validation summary, focus-on-first-invalid-field, `PhoneCountryInput` listbox with `Escape` isolation, and preserved `submittedSnapshot.waUrl` `<a href>` to prevent duplicate API POSTs. Upgraded `TravelFaqSection`, `ManpowerFaqSection`, `ManpowerComplianceBanner`, `ManpowerEmployerSection`, `PipelineStageShow` accordions/tabs, synced `<html lang>` in `LanguageContext.tsx`, excluded `/contact` from subdomain rewrites in `middleware.ts`, and added server-side 5 MB / `.pdf`/`.doc`/`.docx` validation plus HTML escaping in `src/app/api/inquiry/route.ts`.

## Verification Telemetry (2026-11-12)
- `npx tsc --noEmit`: Exited with code `0` (0 TypeScript errors).
- `npm run build`: Exited with code `0` (`100s`, zero `metadataBase` warnings, `21/21` static/SSG routes built cleanly including `/`, `/travel`, `/travel/[slug]`, `/manpower`, `/contact`, `/privacy`, `/terms`, `/_not-found`, `/robots.txt`, `/sitemap.xml`, `/studio/[[...tool]]`, `/api/revalidate`, `/api/draft-mode/enable`, `/api/draft-mode/disable`, `/api/inquiry`).
- `node scripts/seed-sanity.mjs --export-ndjson`: Exited with code `0` (`[Sanity Seed] Exported 36 documents`).
- Playwright E2E Production Suite (`e2e_test_suite.py` against `next start` on port `3000`): Exited with code `0` — all **41 automated checks** passed across desktop (`1280x900`) and mobile (`390x844`): all public & Studio routes (`HTTP 200`, `0` console/page/network errors, `0` broken images), anchor navigation, `ItineraryStageShow`, `PipelineStageShow`, `ManpowerCandidateHub` sector filtering, bilingual `EN <-> HY` switcher, `ConciergeDrawer` Travel/B2B/Candidate PDF upload/Employer E2E submissions (`POST /api/inquiry` `200 OK`), `/sitemap.xml` (including `/privacy` & `/terms`), `/robots.txt` (`/api/` & `/studio/` disallowed), HTTP security headers (`HSTS`, `nosniff`, `CSP frame-ancestors 'self'`), custom branded `404` page, `/api/revalidate` auth (`401`), and spoofed `.pdf` binary rejection (`400`).
- Prior pre-Sanity baseline audits (`npx -y modern-web-guidance@latest legacy-scan src`, `npx -y impeccable detect --json src`, Chrome DevTools MCP Lighthouse `100/100` Accessibility/Best Practices/SEO) passed prior to CMS integration.

18. **Pre-Launch Host-Agnostic Hardening, Legal Pages & Form Security (2026-11-12):**
    - **SEO, Crawlers & Error Recovery:** Added `metadataBase: new URL("https://deorganica.am")` in `src/app/layout.tsx`, blocked `/studio/` in `src/app/robots.ts`, added branded bilingual `src/app/not-found.tsx` (404) & `src/app/error.tsx` (500 recovery UI), and added `scroll-padding-top: 6rem;` in `src/app/globals.css` (`WCAG 2.4.11` Focus Not Obscured behind sticky header).
    - **Dynamic Legal & PII Compliance Pages:** Created [`src/components/LegalDocumentView.tsx`](file:///R:/Projects/De%20Organica/src/components/LegalDocumentView.tsx), [`src/app/privacy/page.tsx`](file:///R:/Projects/De%20Organica/src/app/privacy/page.tsx), and [`src/app/terms/page.tsx`](file:///R:/Projects/De%20Organica/src/app/terms/page.tsx) dynamically reading `siteSettings.company` (so future Google Workspace emails/phones update everywhere automatically); linked from [`Footer.tsx`](file:///R:/Projects/De%20Organica/src/components/Footer.tsx), included in [`sitemap.ts`](file:///R:/Projects/De%20Organica/src/app/sitemap.ts), and bypassed from subdomain rewrites in [`middleware.ts`](file:///R:/Projects/De%20Organica/src/middleware.ts).
    - **Security Headers & Image Allowlist Cleanup:** Configured host-agnostic HTTP security headers (`Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy: frame-ancestors 'self'` preserving `/studio` Live Preview iframe) and removed unused `picsum.photos` from [`next.config.mjs`](file:///R:/Projects/De%20Organica/next.config.mjs).
    - **Form Security & Cross-Host Serverless Alignment:** Hardened [`src/app/api/inquiry/route.ts`](file:///R:/Projects/De%20Organica/src/app/api/inquiry/route.ts) & [`ConciergeDrawer.tsx`](file:///R:/Projects/De%20Organica/src/components/ConciergeDrawer.tsx) with a sliding-window IP rate limiter (`10 req / 10 min`, `429 Retry-After`), off-screen honeypot (`companyWebsiteHp`), binary magic-byte inspection (`%PDF-`, OLE2/RTF `.doc`, PKZIP `.docx`), and aligned CV cap to **4 MB** (`4 * 1024 * 1024`) to stay cleanly under both Vercel (`4.5 MB`) and Netlify (`6 MB`) request-body limits. Documented dedicated Resend subdomain isolation (`send.deorganica.am`) in [`.env.example`](file:///R:/Projects/De%20Organica/.env.example) to prevent root domain MX/SPF collisions with Google Workspace.

19. **Complete Removal of Cost/Fee Mentions in Manpower (2026-11-13):**
    - **Directive:** At the client's request, purged 100% of cost, fee, pricing, and contingency fee language ("zero upfront fees", "0 ֏", "pay-after-job", "fee = 0.00 AMD", "free CV drop", "feeTag") across the entire Manpower vertical.
    - **Refactored Components:** Updated [`HeroDualGateway.tsx`](file:///R:/Projects/De%20Organica/src/components/HeroDualGateway.tsx), [`Header.tsx`](file:///R:/Projects/De%20Organica/src/components/Header.tsx), [`Footer.tsx`](file:///R:/Projects/De%20Organica/src/components/Footer.tsx), [`ContactSection.tsx`](file:///R:/Projects/De%20Organica/src/components/ContactSection.tsx), [`ConciergeDrawer.tsx`](file:///R:/Projects/De%20Organica/src/components/ConciergeDrawer.tsx), [`ManpowerHero.tsx`](file:///R:/Projects/De%20Organica/src/components/ManpowerHero.tsx), [`PipelineStageShow.tsx`](file:///R:/Projects/De%20Organica/src/components/PipelineStageShow.tsx), [`LegalDocumentView.tsx`](file:///R:/Projects/De%20Organica/src/components/LegalDocumentView.tsx), and [`src/lib/whatsapp.ts`](file:///R:/Projects/De%20Organica/src/lib/whatsapp.ts).
    - **Refactored Data Fallbacks & Directives:** Updated [`cms-fallbacks.ts`](file:///R:/Projects/De%20Organica/src/data/cms-fallbacks.ts), [`deorganica-content.ts`](file:///R:/Projects/De%20Organica/src/data/deorganica-content.ts), [`AGENTS.md`](file:///R:/Projects/De%20Organica/AGENTS.md), and `master-website-launch-checklist.md`. Manpower messaging now centers on **100% legal work permits, official Ministry of Labor compliance, verified corporate contracts, and comprehensive talent vetting**.
    - **Verification:** Verified via `npx tsc --noEmit` (0 errors), `npm run build` (21/21 static/SSG routes), and full Playwright E2E suite (41/41 passing automated checks).

16. **Sanity CMS Integration & Full-Stack Content Migration (2026-11-12):**
    - **Dependencies & Configuration:** Installed `next-sanity@^11.6.13`, `sanity@^4.22.1`, `@sanity/vision@^4.22.1`, `@sanity/image-url@^2.1.1`, and `styled-components@^6.1.15`; configured `.env.example`, `next.config.mjs` (`cdn.sanity.io` image remote pattern), and `src/middleware.ts` (`/studio` bypass).
    - **Typed Data Layer & Zero-Config Fallbacks:** Defined comprehensive Sanity-ready TypeScript interfaces in [`src/types/content.ts`](file:///R:/Projects/De%20Organica/src/types/content.ts) and typed fallback defaults in [`src/data/cms-fallbacks.ts`](file:///R:/Projects/De%20Organica/src/data/cms-fallbacks.ts).
    - **Sanity Client, GROQ & Safe Studio:** Implemented [`src/sanity/env.ts`](file:///R:/Projects/De%20Organica/src/sanity/env.ts), [`client.ts`](file:///R:/Projects/De%20Organica/src/sanity/lib/client.ts), [`image.ts`](file:///R:/Projects/De%20Organica/src/sanity/lib/image.ts), [`queries.ts`](file:///R:/Projects/De%20Organica/src/sanity/lib/queries.ts), [`fetch.ts`](file:///R:/Projects/De%20Organica/src/sanity/lib/fetch.ts) (with deep-merge fallback onto defaults + `isPublished` filtering on vacancies, tours, services, and FAQs), Studio Desk [`structure.ts`](file:///R:/Projects/De%20Organica/src/sanity/structure.ts), singletons/documents/bilingual schemas under `src/sanity/schemaTypes/`, root [`sanity.config.ts`](file:///R:/Projects/De%20Organica/sanity.config.ts), and embedded [`/studio`](file:///R:/Projects/De%20Organica/src/app/studio/[[...tool]]/page.tsx) with safe unconfigured setup screen.
    - **Dynamic Routes, Webhooks & Seeder:** Added dynamic [`/travel/[slug]`](file:///R:/Projects/De%20Organica/src/app/travel/[slug]/page.tsx) (`TourDetailView.tsx`), dynamic [`src/app/sitemap.ts`](file:///R:/Projects/De%20Organica/src/app/sitemap.ts), [`/api/revalidate`](file:///R:/Projects/De%20Organica/src/app/api/revalidate/route.ts), `/api/draft-mode/{enable,disable}`, [`SiteDataContext.tsx`](file:///R:/Projects/De%20Organica/src/context/SiteDataContext.tsx), and [`scripts/seed-sanity.mjs`](file:///R:/Projects/De%20Organica/scripts/seed-sanity.mjs) (`npm run sanity:seed`). Wired all Server & Client UI components to consume live/merged CMS props cleanly.

17. **Sanity Studio UX, Relational Taxonomy, `/contact` Coverage & Live Preview Polish (2026-11-12):**
    - **Tabbed Field Groups:** Added clean Studio tabs (`groups`) across every singleton (`siteSettings`, `homePage`, `travelPage`, `manpowerPage`, `contactPage`) and document (`tourPackage`, `travelService`, `jobVacancy`, `faqItem`), replacing long vertical scrolling forms with focused workflows.
    - **Normalized Job Sectors (`jobSector`):** Added [`jobSectorType.ts`](file:///R:/Projects/De%20Organica/src/sanity/schemaTypes/documents/jobSectorType.ts) and replaced hardcoded sector dropdowns + manual labels in [`jobVacancyType.ts`](file:///R:/Projects/De%20Organica/src/sanity/schemaTypes/documents/jobVacancyType.ts) with a normalized `sectorRef` reference so Manpower filter pills and job cards remain synchronized automatically.
    - **Contact Page Singleton & Per-Page SEO:** Added [`contactPageType.ts`](file:///R:/Projects/De%20Organica/src/sanity/schemaTypes/singletons/contactPageType.ts) and `pageSeo` across Home, Travel, Manpower, Contact, and `tourPackage` documents, wired to `generateMetadata()` and [`ContactSection.tsx`](file:///R:/Projects/De%20Organica/src/components/ContactSection.tsx).
    - **Tour Detail Richness & Studio Safeguards:** Added optional `gallery` and `itinerary` arrays on [`tourPackageType.ts`](file:///R:/Projects/De%20Organica/src/sanity/schemaTypes/documents/tourPackageType.ts) rendered in [`TourDetailView.tsx`](file:///R:/Projects/De%20Organica/src/components/TourDetailView.tsx); hid developer `id` and `imageUrl` fallback fields when redundant; configured built-in `presentationTool` live preview (`defineLocations` -> `/api/draft-mode/enable`), dev-only `visionTool`, and global `newDocumentOptions` singleton protection in [`sanity.config.ts`](file:///R:/Projects/De%20Organica/sanity.config.ts). Updated [`seed-sanity.mjs`](file:///R:/Projects/De%20Organica/scripts/seed-sanity.mjs) (`36` documents).

## Client Handoff Items
- **Sanity Studio Activation:** Set `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET`, `SANITY_API_READ_TOKEN`, `SANITY_API_WRITE_TOKEN`, and `SANITY_REVALIDATE_SECRET` in `.env.local` (see `.env.example`), then run `npm run sanity:seed` to populate all 36 bilingual documents (including Contacts & Job Sectors) into Sanity and unlock live `/studio` editing.
- **Contact Details (Centralized):** Editable directly via Sanity Studio (`Site Settings` singleton) or [`src/data/deorganica-content.ts`](file:///R:/Projects/De%20Organica/src/data/deorganica-content.ts) when Sanity is unconfigured; all UI sections, `tel:`/`mailto:` links, WhatsApp routing, and JSON-LD Schema derive dynamically.
- **Email Dispatch:** Add `RESEND_API_KEY` to `.env.local` for live email notifications.
