# Project State: De Organica LLC (`deorganica.am`)

**Updated:** 2026-11-11  
**Status:** Studio-Grade Flagship Verified & Shipped (Accessible SVG Country Picker, Logo Auto-Trim, Overview Editorial Overhaul, Travel Division & Smart Form Architecture Elevation, Zero 404 Assets)

## Completed Work
1. **Accessible Multi-Region Phone Country Picker with Authentic Vector SVG Flags:**
   - Authored [`src/components/PhoneCountryInput.tsx`](file:///R:/Projects/De%20Organica/src/components/PhoneCountryInput.tsx) resolving the Windows emoji issue where `<select><option>` does not render regional flag emojis.
   - Designed 38+ handcrafted, high-fidelity vector SVG flags (Armenia, India, UAE, Philippines, Georgia, Russia, US, UK, Germany, France, Canada, Iran, Lebanon, Saudi Arabia, Qatar, Kuwait, Oman, Bahrain, Jordan, Egypt, Nepal, Sri Lanka, Bangladesh, Kazakhstan, Uzbekistan, Belarus, Ukraine, Italy, Spain, Netherlands, Greece, Cyprus, Poland, Australia, China, Singapore, and Custom `+...`).
   - Integrated live instant search filtering by country name (English and Armenian) or dial code prefix.
   - Mounted seamlessly into [`src/components/ConciergeDrawer.tsx`](file:///R:/Projects/De%20Organica/src/components/ConciergeDrawer.tsx).

2. **Official Logo Auto-Trimming & Header Geometry Elevation:**
   - Auto-trimmed all 40%+ transparent whitespace borders from the official brand assets (`public/images/de-organica-logo.png` & `public/images/de-organica-logo-white.png`) using Sharp bounding box trimming.
   - Sized logo to `h-16 sm:h-18` in [`src/components/Logo.tsx`](file:///R:/Projects/De%20Organica/src/components/Logo.tsx), ensuring bold, legible presence in the `h-20 sm:h-22` header bar.

3. **Elimination of "Eyebrow / Badge Fatigue" & Pulsing Radar Dots:**
   - Eradicated bubble-gum pill badges (`inline-flex rounded-full bg-white border...`) that made sections look like generic SaaS marketing.
   - Upgraded to high-end editorial tracked typography (`text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive`) with a quiet 1.5px green accent dot across [`src/components/HeroDualGateway.tsx`](file:///R:/Projects/De%20Organica/src/components/HeroDualGateway.tsx), [`src/components/CorporateFoundation.tsx`](file:///R:/Projects/De%20Organica/src/components/CorporateFoundation.tsx), and [`src/components/ContactSection.tsx`](file:///R:/Projects/De%20Organica/src/components/ContactSection.tsx).
   - Removed aggressive `animate-ping` pulsing radar dots from Header, Concierge Drawer, and Contact Desk, replacing them with steady institutional status chips (`● Yerevan, Armenia` / `● Երևան, Հայաստան`).

4. **Rich Media Integration on Overview Landing Gateway:**
   - Embedded cinematic 52–60px photographic media preview frames inside both primary gateway cards in [`src/components/HeroDualGateway.tsx`](file:///R:/Projects/De%20Organica/src/components/HeroDualGateway.tsx):
     - **Travel & Tours**: Armenian alpine river and highland landscape with subtle dark gradient and division badge.
     - **Manpower & Recruitment**: Verified professional hospitality/enterprise talent with dark gradient and legal zero-fee guarantee badge.
   - Fixed broken 404 image in [`src/components/TravelHero.tsx`](file:///R:/Projects/De%20Organica/src/components/TravelHero.tsx) (Lake Sevan card).
   - All images across the site verified with 200 OK status codes and 0 browser console errors.

5. **Institutional Commercial Architecture (Positioned for Expansion):**
   - Implemented Option 2 flagship master headline: *"Rooted in Armenia. Built for the World."* (Armenian: *«Արմատներով Հայաստանում: Բաց աշխարհի համար:»*).
   - Removed redundant brand prefix "De Organica" from the overview gateway cards, establishing clean, bold card titles: **Travel & Tours** and **Manpower & Careers** (Armenian: **«Զբոսաշրջություն և Տուրեր»** and **«Միջազգային Աշխատուժ և Կարիերա»**).
   - Homepage architecture structured as a sovereign Armenian commercial house / holding company (`De Organica LLC · Republic of Armenia`), seamlessly accommodating future enterprise verticals (such as Armenian wine/spirits export, wholesale & retail trade) without re-architecting the brand.

6. **Flagship Overview Page Elevation (`taste-skill` Anti-Default Standards):**
   - **Eliminated SaaS Blur Blobs:** Removed generic neon blur orbs from the hero background in [`src/components/HeroDualGateway.tsx`](file:///R:/Projects/De%20Organica/src/components/HeroDualGateway.tsx), replaced with a pure warm Alabaster canvas (`#FBFBF9`) and fine architectural watermark grid.
   - **Unified Luxury Card Borders:** Eradicated the amber vs. emerald border conflict on gateway bento cards, standardizing both into a bespoke architectural stone border (`border-stone-200/90 hover:border-brand-forest/50`) with warm stone secondary action buttons (`bg-stone-100 hover:bg-stone-200`).
   - **Authored Yerevan Crossroads Intermission Banner ([`src/components/YerevanCrossroadsBanner.tsx`](file:///R:/Projects/De%20Organica/src/components/YerevanCrossroadsBanner.tsx)):** Full-bleed Heritage Forest Green (`#233D20`) high-contrast transitional band featuring authoritative editorial statement and 3 live telemetry signals (100% In-House Direct Ground Operations, Zvartnots EVN 24/7 VIP Chauffeur Dispatch, and Official RA Ministry Work Quota Compliance), resolving previous light-gray section monotony.
   - **Elevated Corporate Foundation Ledger ([`src/components/CorporateFoundation.tsx`](file:///R:/Projects/De%20Organica/src/components/CorporateFoundation.tsx)):** Replaced generic 4-box feature layout with an Architectural Trust Ledger featuring large classical serif indices (`01`, `02`, `03`, `04`) and official Republic of Armenia legal accreditation tags.

7. **Travel & Tours Division Page Overhaul (`/travel`):**
   - **Enological Heritage & Areni Wine Signature Route:** Integrated Armenia's 6,100-year wine heritage into `src/data/deorganica-content.ts` with a dedicated featured expedition: *Areni Ancient Wine Terroir & Southern Canyons (4 Days / 3 Nights)* exploring Areni-1 cave winery, boutique Vayots Dzor sommelier pairings, Khor Virap, and Noravank gorge.
   - **Strict Zero Public Prices Enforced:** Replaced all hardcoded/starter dollar prices with bespoke quotation and tariff upon request (`showPrice: false`), rendering luxury micro-ledger tags (*"Bespoke Tariff · Availability — Tailored Tariff on Request"* / *«Սակագին և Ամրագրում — Անհատական գնառաջարկ»*) with direct Yerevan Concierge Desk and WhatsApp dispatch.
   - **Eliminated Eyebrow Fatigue & Blur Blobs on `/travel`:** Transformed all rounded pill badges across `TravelHero.tsx`, `ItineraryStageShow.tsx`, `TravelServicesMatrix.tsx`, `FeaturedToursGrid.tsx`, and `DmcPartnerSection.tsx` into architectural tracked uppercase typography (`text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive`) with discreet accent indicators. Removed background glow orbs in `DmcPartnerSection.tsx`.
   - **Elevated Headings & Editorial Cadence:**
     - Hero: *"Highland Monasteries. Ancient Terroirs. Bespoke Armenia."* (Armenian: *«Հայաստանի Լեռնաշխարհ, Պատմական Գինեգործություն և Բացառիկ Երթուղիներ»*).
     - Interactive Simulator: *"Curate Your Armenian Itinerary & Private Fleet"* (Armenian: *«Ձևավորեք Ձեր Հայաստանի Երթուղին և Տրանսպորտը»*).
     - Ground Matrix: *"Hospitality Infrastructure & Ground Operations"* (Armenian: *«Ամբողջական Տեղական Սպասարկում և Տուրիստական Լոգիստիկա»*).
     - Tour Catalog: *"Signature Armenian Expeditions & Terroir Journeys"* (Armenian: *«Հայաստանի Բացառիկ Երթուղիներ և Գինու Ճանապարհորդություններ»*).
     - B2B DMC Desk: *"Armenia's Institutional Ground Handling Partner"* (Armenian: *«Հայաստանի Վստահելի DMC Գործընկեր»*).
   - **Bilingual Armenian Parity:** Verified that all distance markers (`կմ Երևանից`, `մ ASL`), chauffeur pillar badges (`Mercedes անհատական պարկ`, `Զվարթնոցի (EVN) 24/7 դիմավորում`), and CTA buttons (`Հարցում Desk-ին`, `Ստանալ գնառաջարկ WhatsApp-ով`) render seamlessly in Armenian without fallback leaks.

8. **State-of-the-Art Travel Form Architecture & Forensic State Decoupling:**
   - **Executive Expedition Context Card:** Solved the broken `<select>` preset issue. When clicking any tour or itinerary button, the drawer displays an authentic context card (*"Selected Expedition Context: Areni Ancient Wine Terroir & Southern Canyons"*) with 1-click change capability.
   - **Intelligent Persona Segmentation (`Private Traveler / Family` vs `B2B Travel Agent / DMC`):**
     - Private Traveler: Quick interactive chips for Group Size (`1–2 Guests Sedan`, `3–5 Guests Family`, `6–10 Guests Sprinter`, `10+ Coach`), Lodging Style, and Fleet Tier, plus a direct numeric stepper.
     - B2B Travel Agent: Dedicated company name, agency country, and decoupled `b2bScope` state (`FITs & Private VIPs`, `Leisure Groups 15–40`, `MICE Delegations`) alongside independent travel window/season input.
   - **Bilingual Parity Across All Interactive Selectors:** 100% Armenian translation for all lodging preferences, fleet tiers, step indices, and inclusions in both the Concierge Drawer and Itinerary Simulator.
   - **Error Handling & Mobile UX:** Form auto-scrolls to top upon validation errors, and renders an inline warning banner above the action buttons to prevent off-screen error confusion.
   - **Polished WhatsApp Message Builder:** Removed awkward generic fallback names ("Traveler") from direct card inquiries in [`src/lib/whatsapp.ts`](file:///R:/Projects/De%20Organica/src/lib/whatsapp.ts).
     - B2B Travel Agent / DMC: Specialized fields for Agency Name, Agency Country of Origin, and Inbound Group Scope (`FITs & VIPs`, `Leisure Groups 15-40`, `MICE Delegations`).
   - **Travel-Exclusive Ground Desks on `/travel`:** Configured `ContactSection variant="travel"` to eliminate unrelated candidate/recruitment cards from the travel page, replacing them with 3 specialized travel desks: *Bespoke Leisure & Private Expeditions*, *B2B Destination Management (DMC)*, and *24/7 Zvartnots (EVN) VIP Chauffeur Fleet*.
   - **Dual Dispatch Synchronization:** Integrated all rich travel attributes (`travelerType`, `agencyName`, `accommodationTier`, `fleetTier`) into both `/api/inquiry` and WhatsApp message generators.

9. **Budget & Economy Travel Accommodation:**
   - **Dedicated Budget & Travel Style Switcher:** Mounted a 3-way tier selector (`Economy / Value (Clean 3★, Value Fleet)` vs `Classic Comfort (4★ Hotels, Chauffeur)` vs `Boutique & Luxury (Wine Resorts, 5★)`) directly inside the Concierge Drawer. Clicking `Economy / Value` automatically configures clean 3-star lodging and value economy transport.
   - **Economy Chauffeur Fleet Tier:** Added *Comfort Economy Sedan* (1–3 Guests, e.g. Toyota / clean AC) to both `ItineraryStageShow.tsx` and the Concierge Drawer alongside Mercedes Executive and VIP Sprinter.
   - **Tours & Chauffeur Only Option:** Allows budget travelers and diaspora visitors who already booked an apartment, central hostel, or Airbnb to opt out of hotel charges and pay exclusively for local ground itineraries and airport EVN pickups.
   - **Catalog Copy Inclusion:** Clarified across `FeaturedToursGrid.tsx` and `src/data/deorganica-content.ts` that all signature tours are completely customizable across all budget tiers — from cost-conscious 3★ stays to luxury wine estates.

10. **Generalization of Chauffeur Vehicle Fleet Architecture:**
    - **Replaced Rigid "Mercedes-Only" Branding:** Refactored all user-facing copy and form options from single-brand "Mercedes" to professional vehicle class categories:
      - *Comfort Economy Sedan* (Clean, modern AC vehicles like Toyota Camry/Corolla, 1–3 Guests)
      - *Executive Sedan* (Premium business/luxury comfort, 1–3 Guests)
      - *VIP Minivan & Passenger Van* (Spacious MPVs and vans like Toyota Alphard / Sprinter / V-Class, 4–16 Guests)
      - *Private Tour Coach* (Large group travel, 17+ Guests)
    - **Operational Flexibility & Realistic Dispatch:** Eliminates legal/operational mismatch when clients are assigned top-tier comfort sedans (like Toyota Camry or Lexus) or luxury executive MPVs (like Toyota Alphard, the premier Caucasian VIP vehicle), while making budget and standard travelers feel welcome.

11. **Comprehensive Manpower & Recruitment Division Overhaul (`/manpower`):**
    - **Manpower Compliance & Telemetry Banner ([`src/components/ManpowerComplianceBanner.tsx`](file:///R:/Projects/De%20Organica/src/components/ManpowerComplianceBanner.tsx)):** Introduced a full-bleed Heritage Forest Green (`#233D20`) institutional compliance band featuring authoritative legal statements and 3 real-time metrics (`0.00 AMD Upfront Fee Guarantee`, `100% Legal RA Ministry Permits & Residence Cards`, and `30-Day Employer Replacement Warranty`).
    - **Eradicated SaaS Blobs & Pill Fatigue:** Removed neon blur blobs and generic pill badges from [`src/components/ManpowerHero.tsx`](file:///R:/Projects/De%20Organica/src/components/ManpowerHero.tsx) and [`src/components/PipelineStageShow.tsx`](file:///R:/Projects/De%20Organica/src/components/PipelineStageShow.tsx), upgrading to tracked uppercase typography (`text-xs font-semibold uppercase tracking-[0.16em] text-brand-olive`) with institutional status indicators.
    - **Interactive Blueprint Specification Card ([`src/components/ManpowerHero.tsx`](file:///R:/Projects/De%20Organica/src/components/ManpowerHero.tsx)):** Provided 100% bilingual Armenian parity for both Job Seeker (*«Թեկնածուի Երաշխիք»*) and Enterprise Employer (*«Գործատուի Կանոններ»*) protocol stages, SLAs, and technical title blocks.
    - **Expanded High-Demand Vacancy Catalog:** Added high-demand sector openings in [`src/data/deorganica-content.ts`](file:///R:/Projects/De%20Organica/src/data/deorganica-content.ts), including *Construction Finishing Craftsmen (Tile, Plaster & MEP)* and *Modern Greenhouse & Hydroponic Specialists*, supporting multi-sector Armenian economic corridors.
    - **Target Position Context Card in Drawer:** Implemented context-aware vacancy preservation in [`src/components/ConciergeDrawer.tsx`](file:///R:/Projects/De%20Organica/src/components/ConciergeDrawer.tsx). Clicking "Apply for Position" on any vacancy card locks the role with an authentic context card and 1-click change capability.
    - **Manpower-Exclusive Ground Desks:** Configured `<ContactSection variant="manpower" />` on [`src/app/manpower/page.tsx`](file:///R:/Projects/De%20Organica/src/app/manpower/page.tsx), isolating the page to only the 3 recruitment desks (*Candidate CV Drop*, *B2B Corporate Staffing*, and *Work Permit & Visa Advisory*).
    - **Polished Candidate & Employer WhatsApp Dispatch:** Refactored [`src/lib/whatsapp.ts`](file:///R:/Projects/De%20Organica/src/lib/whatsapp.ts) to eliminate awkward placeholder names (*"Job Applicant"* / *"Prospective Employer"*) during direct card clicks, producing human, culturally fluent Armenian and English greetings.

12. **Verification Protocol:**
   - Production build verified with `npm run build` (exit code `0`, 11/11 static pages prerendered).
   - Playwright automated browser tests executed for desktop and mobile viewports with zero console warnings or errors.

## Outstanding / Client Configuration Points
- Provide official Armenian/international WhatsApp number in `src/data/deorganica-content.ts` (currently configured with placeholder `+374 99 000000`).
- Add `RESEND_API_KEY` to `.env.local` when ready to send live inquiry emails.
- Connect remote Git repository (e.g. GitHub) when target repository URL is provided.
