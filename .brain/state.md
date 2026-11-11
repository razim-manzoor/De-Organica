# Project State: De Organica LLC (`deorganica.am`)

**Updated:** 2026-11-11  
**Status:** Studio-Grade Flagship Verified & Shipped (Editorial Pruning, Natural Headings, Brand Palette Harmonization, Image-to-Text Mismatch Resolution, Manpower Form Architecture Elevation, Cultural Heritage Showcase, Bilingual FAQs, Zero 404 Assets)

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

11. **Verification Protocol:**
    - Production build verified with `npm run build` (exit code `0`, 11/11 static pages prerendered).
    - Playwright automated browser tests executed for desktop and mobile viewports across `/`, `/travel`, `/manpower`, and `/contact` with zero console warnings or errors.
    - All 19 images on `/travel` and all images on `/manpower` verified with 200 OK HTTP responses.

## Outstanding / Client Configuration Points
- Provide official Armenian/international WhatsApp number in `src/data/deorganica-content.ts` (currently configured with placeholder `+374 99 000000`).
- Add `RESEND_API_KEY` to `.env.local` when ready to send live inquiry emails.
- Connect remote Git repository (e.g. GitHub) when target repository URL is provided.
