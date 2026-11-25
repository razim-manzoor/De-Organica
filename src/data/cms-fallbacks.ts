import { deorganicaConfig } from "@/data/deorganica-content";
import type {
  SiteSettings,
  HomePageContent,
  TravelPageContent,
  ManpowerPageContent,
  ContactPageContent,
  TourPackage,
  TravelService,
  JobVacancy,
  FaqItem,
} from "@/types/content";

export const defaultSiteSettings: SiteSettings = {
  company: deorganicaConfig.company,
  nav: [
    { href: "/", label_en: "Overview", label_hy: "Ակնարկ" },
    { href: "/travel", label_en: "Travel & Tours", label_hy: "Տուրիզմ և Տուրեր" },
    { href: "/manpower", label_en: "Manpower & Careers", label_hy: "Աշխատանք և Կադրեր" },
    { href: "/contact", label_en: "Contact", label_hy: "Կապ" },
  ],
  footerDescription_en:
    "Yerevan-headquartered corporate gateway uniting boutique Armenian Destination Management (DMC) and ethical international workforce recruitment.",
  footerDescription_hy:
    "Հայաստանում գրանցված կորպորատիվ ընկերություն՝ մասնագիտացած տուրիստական կառավարման (DMC) և միջազգային աշխատուժի հավաքագրման ոլորտներում:",
  corporateFoundation: {
    eyebrow_en: "Institutional Governance · Yerevan",
    eyebrow_hy: "Ինստիտուցիոնալ Կառավարում · Երևան",
    ...deorganicaConfig.corporateFoundation,
  },
  seoTitle: "De Organica LLC · Armenia Travel & International Manpower",
  seoDescription:
    "Official corporate portal of De Organica LLC (Yerevan, Republic of Armenia). Curated Armenia cultural tours, international holiday packages, visa assistance, and ethical international manpower recruitment.",
};

export const defaultHomePageContent: HomePageContent = {
  masthead: {
    eyebrow_en: "Bespoke Travel & Ethical Manpower",
    eyebrow_hy: "Զբոսաշրջություն և Էթիկական Աշխատուժ",
    headline_en: "Rooted in Armenia. Built for the World.",
    headline_hy: "Արմատներով Հայաստանում: Բաց աշխարհի համար:",
    subtext_en:
      "Operating from Yerevan, De Organica manages handcrafted Armenia travel, B2B ground handling, and licensed international recruitment for Armenian enterprises.",
    subtext_hy:
      "Գործելով Երևանից՝ «Դե Օրգանիկա» ՍՊԸ-ն համակարգում է հեղինակային զբոսաշրջություն, B2B տեղական սպասարկում և օրինական աշխատուժի հավաքագրում:",
  },
  travelPillar: {
    badge_en: "Division 01 · Travel & DMC",
    badge_hy: "Բաժին 01 · Տուրիզմ",
    locationStrip_en: "Yerevan · Sevan · Tatev · Areni",
    locationStrip_hy: "Երևան · Սևան · Տաթև · Արենի",
    dispatchTag_en: "24/7 Dispatch",
    dispatchTag_hy: "24/7 Դեսկ",
    title_en: "Travel & Tours",
    title_hy: "Տուրիզմ և Տուրեր",
    description_en:
      "Curated cultural & wine expeditions, private chauffeur fleet, and B2B ground handling across Armenia.",
    description_hy:
      "Հեղինակային մշակութային երթուղիներ, VIP ավտոպարկ և B2B տեղական սպասարկում ողջ Հայաստանում:",
    features: [
      { icon: "Globe", label_en: "Inbound & Outbound Tours", label_hy: "Ներգնա և Արտագնա Տուրեր" },
      { icon: "ShieldCheck", label_en: "B2B DMC Ground Partner", label_hy: "B2B DMC Գործընկերություն" },
    ],
    image: "/images/tours/garni-temple.jpg",
    imageAlt_en: "Temple of Garni overlooking the Azat Gorge in Armenia",
    imageAlt_hy: "Գառնու հեթանոսական տաճարը և Ազատի կիրճը, Հայաստան",
    ctaPrimary_en: "Explore Travel & Tours",
    ctaPrimary_hy: "Բացահայտել Տուրերը",
    ctaSecondary_en: "Plan My Trip",
    ctaSecondary_hy: "Պատվիրել Տուր",
  },
  manpowerPillar: {
    badge_en: "International Talent",
    badge_hy: "Միջազգային Կադրեր",
    feeTag_en: "Direct Employer Placement",
    feeTag_hy: "Ուղիղ Աշխատանքային Պայմանագրեր",
    slaTag_en: "15–25 Days Permit SLA",
    slaTag_hy: "15–25 Օր Թույլտվության Ժամկետ",
    title_en: "Manpower & Careers",
    title_hy: "Աշխատանք և Կադրեր",
    description_en:
      "Licensed international talent sourcing, verified employer contracts, and legal work permits for Armenian enterprises.",
    description_hy:
      "Միջազգային որակյալ աշխատուժի հավաքագրում, հաստատված պայմանագրեր և ՀՀ օրինական աշխատանքի թույլտվություններ:",
    features: [
      { icon: "ShieldCheck", label_en: "Direct Employer Contracts", label_hy: "Ուղիղ Գործատուի Պայմանագիր" },
      { icon: "Users2", label_en: "30-Day Employer Warranty", label_hy: "30-Օրյա Գործատուի Երաշխիք" },
    ],
    image: "/images/manpower/international-workforce.jpg",
    imageAlt_en: "International workforce team and verified enterprise talent in Armenia",
    imageAlt_hy: "Միջազգային որակյալ աշխատուժ և հաստատված մասնագետներ Հայաստանում",
    ctaPrimary_en: "Explore Manpower Hub",
    ctaPrimary_hy: "Կադրերի և Աշխատանքի Բաժին",
    ctaSecondary_en: "Drop Candidate CV",
    ctaSecondary_hy: "Ուղարկել Ռեզյումե",
  },
  crossroadsBanner: {
    eyebrow_en: "Yerevan Operations Desk",
    eyebrow_hy: "Երևանի Գլխավոր Դեսկ",
    headline_en: "Connecting Armenia's Heritage & Global Workforce",
    headline_hy: "Հայաստանը՝ որպես Զբոսաշրջության և Աշխատուժի Խաչմերուկ",
    subtext_en:
      "De Organica LLC combines high-standard destination hospitality with transparent legal recruitment — serving travelers, tour operators, and Armenian employers from our central Yerevan desk.",
    subtext_hy:
      "«Դե Օրգանիկա» ՍՊԸ-ն ապահովում է միասնական ստանդարտ՝ ինչպես Հայաստան ժամանող զբոսաշրջիկների, այնպես էլ տեղական ձեռնարկությունները հզորացնող մասնագետների համար:",
    cards: [
      {
        icon: "Landmark",
        title_en: "Central Yerevan Office",
        title_hy: "Երևանի Կենտրոնական Գրասենյակ",
        desc_en:
          "Licensed Armenian enterprise operating in central Yerevan with dedicated multilingual client coordinators.",
        desc_hy:
          "Գրանցված և գործող գրասենյակ Հանրապետության Հրապարակի հարևանությամբ՝ ուղիղ հեռախոսային և անհատական սպասարկմամբ:",
      },
      {
        icon: "Globe",
        title_en: "Direct Destination Management (DMC)",
        title_hy: "Առանց Միջնորդների B2B և Մասնավոր Ցանց",
        desc_en:
          "Direct allocations with Armenian boutique hotels, Areni vineyards, and vetted chauffeurs serving GCC, Indian, European, and regional markets.",
        desc_hy:
          "Ուղղակի պայմանագրեր տեղական հյուրանոցների, գինեգործարանների և սեփական ավտոպարկի հետ՝ առանց երրորդ կողմի հավելավճարների:",
      },
      {
        icon: "ShieldCheck",
        title_en: "Full Republic of Armenia Permit Compliance",
        title_hy: "ՀՀ Աշխատանքի Թույլտվության Լիարժեք Կարգավորում",
        desc_en:
          "Unified RA Work Permit Portal (workpermit.am) filings and integrated temporary residence clearances for corporate employers.",
        desc_hy:
          "Միասնական էլեկտրոնային workpermit.am հարթակի և Միգրացիոն ծառայության միջոցով օրինական աշխատանքի թույլտվությունների ձևակերպում:",
      },
    ],
  },
  seo: {
    seoTitle: "De Organica LLC · Armenia Travel & International Manpower",
    seoDescription:
      "Official corporate portal of De Organica LLC (Yerevan, Republic of Armenia). Curated Armenia cultural tours, B2B DMC ground handling, and ethical international manpower recruitment.",
  },
};

export const defaultTravelPageContent: TravelPageContent = {
  hero: {
    eyebrow_en: "Armenia Inbound DMC · Yerevan",
    eyebrow_hy: "Հայաստանի Մուտքային DMC · Երևան",
    headline_en: "Private Tours & Bespoke Journeys in Armenia",
    headline_hy: "Անհատական Տուրեր և Բացառիկ Ճամփորդություններ Հայաստանում",
    subtext_en:
      "Curated multi-day expeditions, chauffeur-driven transport, and B2B ground handling from our Yerevan operations desk.",
    subtext_hy:
      "Հեղինակային բազմօրյա երթուղիներ, անհատական վարորդական սպասարկում և B2B DMC ծառայություններ Երևանի մեր գրասենյակից:",
    ctaPrimary_en: "Inquire Custom Tour",
    ctaPrimary_hy: "Պատվիրել անհատական երթուղի",
    ctaSecondary_en: "Explore Tour Packages",
    ctaSecondary_hy: "Դիտել բոլոր տուրերը",
    badges: [
      { icon: "Car", label_en: "Private Chauffeur Fleet", label_hy: "Անհատական տրանսպորտային պարկ" },
      { icon: "Clock", label_en: "24/7 Zvartnots (EVN) Meet", label_hy: "Զվարթնոցի (EVN) 24/7 դիմավորում" },
      { icon: "ShieldCheck", label_en: "UNESCO Monastic Sanctuaries", label_hy: "ՅՈՒՆԵՍԿՕ-ի ժառանգության վայրեր" },
      { icon: "Handshake", label_en: "B2B DMC Ground Partner", label_hy: "B2B DMC Գործընկերություն" },
    ],
    destinations: [
      {
        id: "garni",
        name_en: "Garni & Geghard",
        name_hy: "Գառնի և Գեղարդ",
        subtitle_en: "1st-century Hellenistic colonnade & UNESCO rock-hewn monastery",
        subtitle_hy: "1-ին դարի հեթանոսական տաճար և ժայռափոր Գեղարդավանք (ՅՈՒՆԵՍԿՕ)",
        distKm: 28,
        altitudeM: 1400,
        season_en: "Year-round",
        season_hy: "Ողջ տարին",
        image: "/images/tours/garni-temple.jpg",
        tag_en: "UNESCO Heritage",
        tag_hy: "ՅՈՒՆԵՍԿՕ Ժառանգություն",
      },
      {
        id: "sevan",
        name_en: "Tsaghkadzor & Lake Sevan",
        name_hy: "Ծաղկաձոր և Սևան",
        subtitle_en: "Mount Teghenis alpine ski slopes, chairlift & fresh alpine lake",
        subtitle_hy: "Թեղենիս լեռան լեռնադահուկային ուղիներ, ճոպանուղի և Սևանա լիճ",
        distKm: 58,
        altitudeM: 1900,
        season_en: "Winter Ski & Summer",
        season_hy: "Ձմեռ (Դեկտ–Մարտ) և Ամառ",
        image: "/images/tours/tsaghkadzor-ski.jpg",
        tag_en: "Alpine Resort",
        tag_hy: "Լեռնային Հանգստավայր",
      },
      {
        id: "yerevan",
        name_en: "Yerevan & Cascades",
        name_hy: "Երևան և Կասկադ",
        subtitle_en: "Cafesjian open-air art museum, Republic Square & pink tuff streets",
        subtitle_hy: "Գաֆէսճեան բացօթյա արվեստի կենտրոն, Հանրապետության Հրապարակ",
        distKm: 0,
        altitudeM: 1000,
        season_en: "Year-round",
        season_hy: "Ողջ տարին",
        image: "/images/tours/yerevan-cascade.jpg",
        tag_en: "Capital Heritage",
        tag_hy: "Մայրաքաղաքային Ժառանգություն",
      },
      {
        id: "tatev",
        name_en: "Wings of Tatev & Goris",
        name_hy: "Տաթևեր և Գորիս",
        subtitle_en: "World's longest reversible aerial tramway over Vorotan gorge",
        subtitle_hy: "Աշխարհի ամենաերկար ճոպանուղին Որոտանի կիրճի վրայով",
        distKm: 250,
        altitudeM: 1537,
        season_en: "April – November",
        season_hy: "Ապրիլ – Նոյեմբեր",
        image: "/images/tours/wings-of-tatev.jpg",
        tag_en: "Engineering Marvel",
        tag_hy: "Ինժեներական Հրաշք",
      },
    ],
  },
  itineraryStageShow: {
    eyebrow_en: "Interactive Route Simulator",
    eyebrow_hy: "Ինտերակտիվ Երթուղու Կառուցիչ",
    headline_en: "Explore Armenia Day by Day",
    headline_hy: "Ծրագրեք Ձեր Շրջագայությունը Հայաստանում",
    subtext_en:
      "Preview iconic routes, select fleet comfort (from executive sedans to spacious passenger vans), and customize curated additions for instant Yerevan dispatch.",
    subtext_hy:
      "Ընտրեք երթուղու օրերը, տրանսպորտային դասը և լրացուցիչ ծառայությունները՝ անհատական երթուղի ստանալու համար:",
    statusBadge_en: "Live Yerevan Ground Dispatch",
    statusBadge_hy: "Երևանի դիսպետչերական ծառայություն",
    days: [
      {
        day: 1,
        title_en: "Yerevan Heritage, Garni & Geghard",
        title_hy: "Երևան, Գառնու հեթանոսական տաճար և Գեղարդ",
        places_en: "Republic Square · Cascade Monument · Garni Sun Temple · Geghard Monastic Cave",
        places_hy: "Հանրապետության Հրապարակ · Կասկադ · Գառնու Տաճար · Գեղարդավանք",
        description_en:
          "Journey from the pink tuff architecture of Yerevan into the dramatic basalt organ canyon of Garni and the rock-cut medieval UNESCO sanctuary of Geghard.",
        description_hy:
          "Ճանապարհորդություն Երևանի վարդագույն տուֆե ճարտարապետությունից դեպի Գառնու բազալտե կիրճ և Գեղարդի ժայռափոր վանական համալիր:",
        image: "/images/tours/yerevan-cascade.jpg",
      },
      {
        day: 2,
        title_en: "Azure Lake Sevan & Dilijan Forest",
        title_hy: "Սևանա լիճ և Դիլիջանի անտառներ",
        places_en: "Sevanavank Peninsula · Lake Sevan Fresh Fish Lunch · Parz Lake · Haghartsin Monastery",
        places_hy: "Սևանավանք թերակղզի · Սևանի իշխան · Պարզ լիճ · Հաղարծին վանք",
        description_en:
          "Ascend to Armenia's high-altitude turquoise jewel at Lake Sevan, followed by the lush misty beech and oak forests of Dilijan National Park.",
        description_hy:
          "Այցելություն բարձրադիր Սևանա լիճ, որին հաջորդում է հանգիստը Դիլիջանի կուսական անտառներում և Հաղարծնի պատմական վանքում:",
        image: "/images/tours/tsaghkadzor-ski.jpg",
      },
      {
        day: 3,
        title_en: "Khor Virap, Areni Wine & Noravank",
        title_hy: "Խոր Վիրապ, Արենի գինեգործություն և Նորավանք",
        places_en: "Khor Virap (Biblical Mount Ararat views) · Areni Wine Tasting · Noravank Red Canyon",
        places_hy: "Խոր Վիրապ (Արարատ լեռան տեսարան) · Արենի գինու համտես · Նորավանքի կարմիր կիրճ",
        description_en:
          "Gaze at snow-capped Mount Ararat from the historic underground dungeon of Khor Virap, continuing through the crimson limestone gorge of Noravank.",
        description_hy:
          "Հիասքանչ տեսարան դեպի բիբլիական Արարատ լեռը Խոր Վիրապից, ավանդական գինու համտես Արենիում և Նորավանքի կարմիր ժայռերը:",
        image: "/images/heritage/tonir-lavash.jpg",
      },
      {
        day: 4,
        title_en: "Wings of Tatev & Goris Rock Forest",
        title_hy: "Տաթևի ճոպանուղի և Գորիսի ժայռեր",
        places_en: "Wings of Tatev (World's Longest Cableway) · Tatev Monastery · Vorotan Gorge · Khndzoresk Cave Village",
        places_hy: "«Տաթևեր» ճոպանուղի · Տաթևի վանք · Որոտանի կիրճ · Խնձորեսկի ճոճվող կամուրջ",
        description_en:
          "Soar above the 320-meter deep Vorotan canyon on the world's longest reversible aerial tramway to the cliffside fortress monastery of Tatev.",
        description_hy:
          "Թռիչք աշխարհի ամենաերկար հետադարձելի ճոպանուղով Որոտանի կիրճի վրայով դեպի 9-րդ դարի հզորագույն Տաթևի վանական համալիր:",
        image: "/images/tours/wings-of-tatev.jpg",
      },
    ],
  },
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
  toursHeader: {
    eyebrow_en: "Signature Expeditions",
    eyebrow_hy: "Հեղինակային Երթուղիներ",
    title_en: "Signature Armenia Tours & Multi-Day Journeys",
    title_hy: "Հայաստանի Հեղինակային Տուրեր և Երթուղիներ",
    subtitle_en:
      "Handcrafted to your travel style and pacing — from boutique 4-star city stays to regional wine châteaux and executive chauffeurs.",
    subtitle_hy:
      "Հարմարեցված Ձեր նախասիրություններին և ոճին՝ բուտիկ քաղաքային հյուրանոցներից մինչև գինու ռեզորթներ և VIP տրանսպորտ:",
  },
  heritageShowcase: {
    eyebrow_en: "Living Heritage & Gastronomy",
    eyebrow_hy: "Պատմական Ժառանգություն և Գաստրոնոմիա",
    headline_en: "Living Heritage, Gastronomy & Natural Wonders",
    headline_hy: "Պատմական Ժառանգություն, Գաստրոնոմիա և Բնություն",
    subtext_en:
      "Hands-on cultural immersion: taste indigenous varietals where winemaking began, dine on alpine trout, and master UNESCO lavash baking.",
    subtext_hy:
      "Կենդանի մշակութային փորձառություն՝ հնագույն գինու համտես, լեռնային խոհանոց և ՅՈՒՆԵՍԿՕ-ի լավաշի թխման վարպետաց դասեր:",
    cta_en: "Inquire Cultural Extension",
    cta_hy: "Ավելացնել երթուղու մեջ",
    pillars: [
      {
        id: "unesco-lavash",
        title_en: "UNESCO Lavash Bread Baking Masterclass",
        title_hy: "ՅՈՒՆԵՍԿՕ-ի Լավաշի Թխման Վարպետաց Դաս",
        tagline_en: "Underground clay tonir oven tradition in Garni village",
        tagline_hy: "Գառնի գյուղի ավանդական թոնրում լավաշի պատրաստում",
        desc_en:
          "Participate in Armenia's intangible cultural heritage. Roll unleavened dough with village matriarchs and slap it onto the red-hot clay walls of an ancient tonir oven, paired with fresh goat cheese and mountain herbs.",
        desc_hy:
          "Մասնակցեք ՅՈՒՆԵՍԿՕ-ի ոչ նյութական մշակութային ժառանգության մաս կազմող լավաշի թխման արարողությանը՝ թարմ պանրով և լեռնային կանաչիներով:",
        badge_en: "UNESCO Heritage",
        badge_hy: "ՅՈՒՆԵՍԿՕ Ժառանգություն",
        image: "/images/heritage/tonir-lavash.jpg",
        icon: "Utensils",
      },
      {
        id: "areni-viticulture",
        title_en: "Areni-1 6,100-Year Cave Winemaking",
        title_hy: "Արենի-1 Քարանձավ և 6,100-ամյա Գինեգործություն",
        tagline_en: "The cradle of world viticulture in Vayots Dzor",
        tagline_hy: "Համաշխարհային գինեգործության օրրանը Վայոց Ձորում",
        desc_en:
          "Walk through the archaeological cave where the world's oldest wine press and fermentation vats dating to 4100 BC were unearthed. Follow with sommelier barrel tastings of indigenous Areni Noir and Voskehat varietals.",
        desc_hy:
          "Այցելեք աշխարհի հնագույն գինեգործարանը (Ք.ա. 4100 թ.), վայելեք տեղական Արենի Նուար և Ոսկեհատ հազվագյուտ խաղողի տեսակներից պատրաստված բացառիկ գինիները:",
        badge_en: "Ancient Terroir",
        badge_hy: "Հնագույն Տերուար",
        image: "/images/heritage/tonir-lavash.jpg",
        icon: "Wine",
      },
      {
        id: "sevan-gastronomy",
        title_en: "Alpine Lake Sevan Ishkhan Gastronomy",
        title_hy: "Սևանի Իշխան և Լեռնային Խոհանոց",
        tagline_en: "Turquoise alpine shores and open-fire barbecue",
        tagline_hy: "Սևանա լճի թարմ իշխան և ավանդական խորոված",
        desc_en:
          "Perched at 1,900 meters above sea level, Lake Sevan offers fresh Ishkhan trout baked on vine embers, crayfish kebab, and panoramic dining overlooking the 9th-century black tuff chapels of Sevanavank.",
        desc_hy:
          "1,900 մետր բարձրության վրա՝ Սևանի ափին, համտեսեք թարմ իշխանի և խեցգետնի քյաբաբը՝ վայելելով Սևանավանքի վանական համալիրի տեսարանը:",
        badge_en: "Alpine Gourmet",
        badge_hy: "Լեռնային Խոհանոց",
        image: "/images/tours/wings-of-tatev.jpg",
        icon: "Compass",
      },
      {
        id: "basalt-symphony",
        title_en: "Symphony of Stones Basalt Canyon",
        title_hy: "Քարերի Սիմֆոնիա և Գառնու Կիրճ",
        tagline_en: "Colossal polygonal hexagonal basalt columns",
        tagline_hy: "Հսկայական բազալտե բնական սյուներ Ազատի կիրճում",
        desc_en:
          "Marvel at towering 50-meter natural hexagonal basalt organ pipes carved into the vertical gorge walls of the Azat River, formed by slow cooling of prehistoric volcanic basalt flows.",
        desc_hy:
          "Հիացեք Ազատ գետի կիրճում գտնվող բնության հրաշքով՝ 50 մետր բարձրությամբ բազալտե երգեհոնանման սյուներով, որոնք ձևավորվել են հրաբխային լավայից:",
        badge_en: "Natural Wonder",
        badge_hy: "Բնության Հրաշք",
        image: "/images/tours/garni-temple.jpg",
        icon: "Mountain",
      },
    ],
  },
  dmcPartner: {
    eyebrow_en: "B2B Destination Management · Yerevan Desk",
    eyebrow_hy: "B2B DMC Գործընկերություն · Երևան",
    headline_en: "Your Trusted DMC & Ground Partner in Armenia",
    headline_hy: "Ձեր Վստահելի DMC Գործընկերը Հայաստանում",
    subtext_en:
      "White-label ground handling, tailored group itineraries, modern vehicle fleet, and dedicated account managers for international travel agencies.",
    subtext_hy:
      "Ամբողջական տեղական սպասարկում, խմբային երթուղիներ և անհատական մենեջեր միջազգային տուրիստական ընկերությունների համար:",
    ctaTitle_en: "Are you an International Travel Agency or Tour Operator?",
    ctaTitle_hy: "Ցանկանու՞մ եք համագործակցել որպես B2B Գործընկեր",
    ctaDesc_en:
      "Register with our Yerevan DMC desk to receive contract itineraries, seasonal hotel allotments, and dedicated account management for Armenia inbound.",
    ctaDesc_hy:
      "Գրանցվեք որպես գործընկեր՝ ստանալու մեր գործընկերային պայմանները, հյուրանոցային ամրագրումները և տրանսպորտային լոգիստիկան:",
    ctaButton_en: "Register as B2B Partner",
    ctaButton_hy: "Գրանցվել որպես Գործընկեր",
    pillars: [
      {
        icon: "Building2",
        title_en: "Contract B2B Ground Allotments",
        title_hy: "Ուղիղ B2B Պայմանագրեր",
        desc_en:
          "Exclusive B2B ground coordination for travel agents in India, UAE, CIS, Europe, and Asia sending leisure groups to Armenia.",
        desc_hy:
          "Հատուկ գործընկերային պայմաններ արտասահմանյան տուրիստական գործակալությունների համար՝ խմբային տուրերի կազմակերպման նպատակով:",
      },
      {
        icon: "Bus",
        title_en: "Dedicated Fleet & Chauffeurs",
        title_hy: "Սեփական տրանսպորտային պարկ",
        desc_en:
          "Modern executive sedans, VIP passenger vans (16-19 seats), and coaches with experienced English-speaking drivers.",
        desc_hy: "Ժամանակակից մարդատար ավտոմեքենաներ, VIP միկրոավտոբուսներ և տուրիստական ավտոբուսներ:",
      },
      {
        icon: "Handshake",
        title_en: "White-Label Airport Reception",
        title_hy: "Դիմավորում գործընկերոջ բրենդով",
        desc_en:
          "Your clients are welcomed at Zvartnots EVN Airport under your agency's name and brand identity with uncompromised hospitality.",
        desc_hy:
          "Ձեր հյուրերը Զվարթնոց օդանավակայանում դիմավորվում են Ձեր ընկերության անվամբ և բրենդավորմամբ:",
      },
      {
        icon: "Clock",
        title_en: "4-Hour Direct Dispatch Response",
        title_hy: "Օպերատիվ պատասխան 4 ժամում",
        desc_en:
          "Direct communication with our Yerevan inbound team. Itineraries, hotel allotments, and coordination confirmations generated within 4 hours.",
        desc_hy:
          "Օպերատիվ կապ մեր Երևանի գրասենյակի հետ: Ծրագրի և հաստատման տրամադրում 4 ժամվա ընթացքում:",
      },
    ],
  },
  faqHeader: {
    eyebrow_en: "Travel Advisory & FAQ",
    eyebrow_hy: "Ճամփորդական Խորհրդատվություն",
    title_en: "Frequently Asked Questions",
    title_hy: "Հաճախ Տրվող Հարցեր",
    subtitle_en: "Essential details on visas, best travel seasons, high-altitude safety, and bespoke itinerary planning.",
    subtitle_hy: "Հիմնական տեղեկատվություն վիզաների, լավագույն եղանակների և անհատական երթուղիների վերաբերյալ:",
  },
  seo: {
    seoTitle: "De Organica Travel & Tours · Armenia Inbound & Outbound DMC",
    seoDescription:
      "Curated cultural tours across Armenia (Garni, Geghard, Sevan, Dilijan, Tatev), international holiday escapes, consular visa guidance, and B2B DMC partner services in Yerevan.",
  },
};

export const defaultManpowerPageContent: ManpowerPageContent = {
  hero: {
    eyebrow_en: "Yerevan Recruitment Desk · Republic of Armenia",
    eyebrow_hy: "Երևանի Գլխավոր Գրասենյակ · ՀՀ Լիցենզավորված Գործունեություն",
    headline_en: "International Recruitment & Enterprise Staffing Solutions",
    headline_hy: "Միջազգային Հավաքագրում և Կորպորատիվ Աշխատուժի Լուծումներ",
    subtext_en:
      "Connecting vetted overseas talent with corporate enterprises in Armenia. Governed by 100% legal Ministry of Labor work permits and transparent employment contracts.",
    subtext_hy:
      "Որակավորված մասնագետների հավաքագրում Հայաստանի գործատուների համար՝ ՀՀ աշխատանքի օրինական թույլտվություններով և պետական գրանցմամբ:",
    metrics: [
      {
        figure: "100% Legal",
        figure_hy: "100% Օրինական",
        label_en: "Work Permit Compliance",
        label_hy: "Օրինական Թույլտվություն",
      },
      {
        figure: "15–25 Days",
        figure_hy: "15–25 Աշխ. Օր",
        label_en: "Ministry Permit SLA",
        label_hy: "ՀՀ Թույլտվության Ժամկետ",
      },
      {
        figure: "< 72 Hours",
        figure_hy: "< 72 Ժամում",
        label_en: "Corporate Shortlist",
        label_hy: "Թեկնածուների Ցանկ",
      },
    ],
    candidateStages: [
      {
        stage_en: "Stage 01 · Intake & Profile Review",
        stage_hy: "Փուլ 01 · Դիմում և Գրանցում",
        badge_en: "Direct Intake",
        badge_hy: "Ուղիղ Դիմում",
        badgeTone: "olive",
        desc_en: "Confidential CV review and initial profile assessment against active mandates.",
        desc_hy: "CV-ի գաղտնի ստուգում և համապատասխանեցում ակտիվ թափուր հաստիքներին:",
        isHighlight: false,
      },
      {
        stage_en: "Stage 02 · Qualification Vetting",
        stage_hy: "Փուլ 02 · Որակավորման Ստուգում",
        badge_en: "Skill Vetting",
        badge_hy: "Որակավորում",
        badgeTone: "muted",
        desc_en: "Document verification, trade skill check, and employer interview.",
        desc_hy: "Փաստաթղթերի ստուգում, հմտությունների թեստավորում և հարցազրույց:",
        isHighlight: false,
      },
      {
        stage_en: "Stage 03 · Official Work Permit",
        stage_hy: "Փուլ 03 · Աշխատանքի Թույլտվություն",
        badge_en: "Legal Permit",
        badge_hy: "Օրինական Գրանցում",
        badgeTone: "olive",
        desc_en: "Official work permit & residence card via Unified Migration Service.",
        desc_hy: "ՀՀ աշխատանքի օրինական թույլտվություն և կացության քարտ:",
        isHighlight: true,
      },
      {
        stage_en: "Stage 04 · Arrival & Onboarding",
        stage_hy: "Փուլ 04 · Ժամանում և Տեղավորում",
        badge_en: "Full Ground Care",
        badge_hy: "Ամբողջական Աջակցություն",
        badgeTone: "forest",
        desc_en: "Zvartnots airport reception, housing orientation, and contract start.",
        desc_hy: "Դիմավորում Զվարթնոցում, կացության ապահովում և աշխատանքի սկիզբ:",
        isHighlight: false,
      },
    ],
    employerStages: [
      {
        stage_en: "Stage 01 · Quota Requisition",
        stage_hy: "Փուլ 01 · Քվոտայի Հայտ",
        badge_en: "Direct Requisition",
        badge_hy: "Արագ Արձագանք",
        badgeTone: "muted",
        desc_en: "Employer submits headcount requirements & ministry quota parameters.",
        desc_hy: "Գործատուն ներկայացնում է հաստիքների պահանջարկը և նախարարության քվոտաները:",
        isHighlight: false,
      },
      {
        stage_en: "Stage 02 · Candidate Selection",
        stage_hy: "Փուլ 02 · Թեկնածուների Ընտրություն",
        badge_en: "Vetted Candidates",
        badge_hy: "Զտված Թեկնածուներ",
        badgeTone: "forest",
        desc_en: "Shortlist of pre-screened talent across construction, hospitality, and trades.",
        desc_hy: "Որակավորված թեկնածուների նախնական ցանկ շինարարության և սպասարկման ոլորտում:",
        isHighlight: false,
      },
      {
        stage_en: "Stage 03 · Work Permit Documentation",
        stage_hy: "Փուլ 03 · Օրինական Ձևակերպում",
        badge_en: "Ministry Approval",
        badge_hy: "Օրինական Թույլտվություն",
        badgeTone: "forest",
        desc_en: "De Organica handles work permit filing and state migration paperwork.",
        desc_hy: "«Դե Օրգանիկա»-ն ապահովում է աշխատանքի թույլտվության պետական գրանցումը:",
        isHighlight: true,
      },
      {
        stage_en: "Stage 04 · Deployment & Guarantee",
        stage_hy: "Փուլ 04 · Ինտեգրում և Երաշխիք",
        badge_en: "Placement Assurance",
        badge_hy: "Կադրային Երաշխիք",
        badgeTone: "forest",
        desc_en: "Direct employee deployment with a 30-day candidate replacement warranty.",
        desc_hy: "Աշխատակցի տեղավորում՝ թեկնածուի փոխարինման 30-օրյա երաշխիքով:",
        isHighlight: false,
      },
    ],
  },
  pipelineStageShow: {
    eyebrow_en: "Recruitment & Visa Process",
    eyebrow_hy: "Հավաքագրման և Վիզայի Գործընթաց",
    headline_en: "How It Works: From Application to Arrival",
    headline_hy: "Ինչպես է Աշխատում՝ Դիմումից Մինչև Ժամանում",
    subtext_en:
      "A transparent 4-stage pathway ensuring verified employer contracts, rigorous skill vetting, and official Republic of Armenia work permits.",
    subtext_hy:
      "Թափանցիկ 4-փուլ գործընթաց՝ հաստատված պայմանագրերով, հմտությունների ստուգմամբ և ՀՀ աշխատանքի օրինական թույլտվությամբ:",
    stages: [
      {
        id: "stage-1",
        step: "01",
        title_en: "Corporate Employer Requisition",
        title_hy: "Գործատուի պահանջարկի գրանցում",
        badge_en: "Verified Enterprise",
        badge_hy: "Ստուգված գործատու",
        role_en: "For Armenian Enterprises",
        role_hy: "ՀՀ Գործատուներին",
        description_en:
          "Armenian corporate employers register active labor quotas in hospitality, skilled construction, agriculture, or logistics with our Yerevan HR desk.",
        description_hy:
          "Հայաստանի առաջատար ընկերությունները ներկայացնում են թափուր հաստիքների պահանջարկը՝ սահմանելով աշխատավարձը, պայմանները և տեղավորման պահանջները:",
        safeguards_en: [
          "Official Republic of Armenia commercial entity check",
          "Guaranteed monthly wage escrow and contract verification",
          "Safe worker housing and medical insurance compliance",
        ],
        safeguards_hy: [
          "ՀՀ պետական ռեգիստրի իրավաբանական ստուգում",
          "Աշխատավարձի և պայմանագրի պաշտոնական երաշխիք",
          "Ապահով կացարանի և առողջապահական ապահովագրության համապատասխանություն",
        ],
        metrics_en: "2–4 Days Audit",
        metrics_hy: "2–4 Օր Ստուգում",
      },
      {
        id: "stage-2",
        step: "02",
        title_en: "Candidate Sourcing & Skill Vetting",
        title_hy: "Թեկնածուների ընտրություն և որակավորման ստուգում",
        badge_en: "Ethical Vetting",
        badge_hy: "Էթիկական ընտրություն",
        role_en: "For International Candidates",
        role_hy: "Միջազգային Թեկնածուներին",
        description_en:
          "International job seekers undergo thorough technical interviews and credential verification. Under our Ethical Charter, candidates are evaluated purely on merit and professional experience.",
        description_hy:
          "Թեկնածուները մասնակցում են հարցազրույցի և մասնագիտական ստուգման: Ընտրությունը կատարվում է բացառապես փորձի և որակավորման հիման վրա:",
        safeguards_en: [
          "Structured video interviews and practical trade skill testing",
          "Direct review by accredited corporate hiring managers",
          "Comprehensive credential, criminal record, and medical screening",
        ],
        safeguards_hy: [
          "Տեսահարցազրույցներ և գործնական հմտությունների ստուգում",
          "Ուղիղ գնահատում գործատուի պատասխանատուների կողմից",
          "Փաստաթղթերի, դատվածության և բժշկական ամբողջական ստուգում",
        ],
        metrics_en: "Within 72 Hours",
        metrics_hy: "Մինչև 72 Ժամում",
      },
      {
        id: "stage-3",
        step: "03",
        title_en: "Ministry of Labor Permits & Visa Filing",
        title_hy: "Աշխատանքի թույլտվություն և վիզայի ձևակերպում",
        badge_en: "Legal Ministry Approval",
        badge_hy: "Պաշտոնական Թույլտվություն",
        role_en: "Legal Compliance",
        role_hy: "Իրավական Լիարժեքություն",
        description_en:
          "De Organica's legal team coordinates with the Unified Migration Service and Ministry of Labor of the Republic of Armenia to secure official work permits and entry visas.",
        description_hy:
          "«Դե Օրգանիկա»-ի իրավաբանական թիմը համակարգում է փաստաթղթերի հանձնումը Միասնական միգրացիոն ծառայություն և Աշխատանքի նախարարություն:",
        safeguards_en: [
          "Official Armenian electronic work permit issuance (15–25 business days)",
          "Pre-arrival consular or eVisa entry clearance",
          "Full compliance with Armenian Migration & Labor Code",
        ],
        safeguards_hy: [
          "ՀՀ էլեկտրոնային աշխատանքային թույլտվության ստացում (15–25 աշխ. օր)",
          "Մուտքի վիզայի նախնական հաստատում",
          "ՀՀ աշխատանքային և միգրացիոն օրենսդրության լիարժեք պահպանում",
        ],
        metrics_en: "Official Government Timeline",
        metrics_hy: "Պետական Գործընթաց",
      },
      {
        id: "stage-4",
        step: "04",
        title_en: "EVN Reception, Housing & Onboarding",
        title_hy: "Դիմավորում Զվարթնոցում և տեղավորում",
        badge_en: "Full Ground Care",
        badge_hy: "Ամբողջական Սպասարկում",
        role_en: "Arrival & Integration",
        role_hy: "Ժամանում և Ադապտացիա",
        description_en:
          "Our ground team greets selected candidates at Zvartnots EVN Airport, arranges dedicated transport, assists with comfortable accommodation, and ensures smooth employer onboarding.",
        description_hy:
          "Մեր թիմը դիմավորում է աշխատակցին Զվարթնոց օդանավակայանում, ապահովում է տրանսֆեր, կացարան և աջակցում է գործատուի մոտ աշխատանքի առաջին օրերին:",
        safeguards_en: [
          "24/7 airport meet & greet with dedicated ground transport",
          "Assistance with SIM cards, local registration, and bank accounts",
          "Dedicated bilingual coordinator for ongoing employer-worker harmony",
        ],
        safeguards_hy: [
          "24/7 դիմավորում օդանավակայանում և տրանսպորտային սպասարկում",
          "Աջակցություն բնակության գրանցման և բանկային հաշիվների բացման հարցում",
          "Երկլեզու կոորդինատորի աջակցություն ամբողջ ժամանակահատվածում",
        ],
        metrics_en: "Day 1 Reception",
        metrics_hy: "Առաջին Օրվանից",
      },
    ],
  },
  candidateHub: {
    eyebrow_en: "International Recruitment · Candidate Portal",
    eyebrow_hy: "Թեկնածուների Կենտրոն",
    headline_en: "Verified International Placement in Armenia",
    headline_hy: "Միջազգային Աշխատանք Հայաստանում",
    subtext_en:
      "Explore active positions in construction, hospitality, agriculture, and transportation with verified employer contracts.",
    subtext_hy:
      "Ընտրեք ակտիվ հաստիքները հյուրընկալության, շինարարության, գյուղատնտեսության և լոգիստիկայի ոլորտներում՝ ստուգված պայմանագրերով:",
    charterTitle_en: "Ethical Recruitment & Labor Standards Charter",
    charterTitle_hy: "Էթիկական Հավաքագրման և Աշխատանքային Ստանդարտների Քարտիա",
    charterDesc_en:
      "De Organica LLC operates on a strict candidate-first model with zero upfront candidate charges. We adhere to transparent, employer-sponsored placement procedures and formal work permit authorizations issued under Republic of Armenia labor laws.",
    charterDesc_hy:
      "«Դե Օրգանիկա»-ն առաջնորդվում է թեկնածուների պաշտպանության միջազգային սկզբունքներով՝ առանց թեկնածուներից գանձվող նախնական վճարների: Գործընթացն իրականացվում է թափանցիկ ընթացակարգերով և ՀՀ աշխատանքային օրենսդրությանը համապատասխան:",
    trustPillars: deorganicaConfig.manpower.trustPillars,
    mobilitySteps: deorganicaConfig.manpower.mobilitySteps,
    sectors: deorganicaConfig.manpower.sectors,
  },
  complianceBanner: {
    eyebrow_en: "Labor Compliance & Protection · Yerevan",
    eyebrow_hy: "Օրինական Կարգավորումներ · Երևան",
    headline_en: "100% Legal Work Permits & Enterprise Labor Compliance",
    headline_hy: "100% Օրինական Աշխատանքի Թույլտվություն և Կորպորատիվ Համապատասխանություն",
    subtext_en:
      "Ensuring ethical labor mobility: verified corporate contracts, official Republic of Armenia work permits, and accredited enterprise staffing.",
    subtext_hy:
      "Ապահովելով թափանցիկ աշխատանքային միգրացիա՝ հաստատված պայմանագրերով, ՀՀ օրինական աշխատանքի թույլտվություններով և կորպորատիվ ստանդարտներով:",
    trustMetrics: [
      {
        figure: "100% Legal",
        figure_hy: "100% Օրինական",
        label_en: "Government Work Permits",
        label_hy: "Պետական Թույլտվություն",
        detail_en: "Direct coordination with RA Unified Migration Service and Ministry of Labor.",
        detail_hy: "Ուղիղ համագործակցություն ՀՀ միգրացիոն ծառայության և նախարարության հետ:",
      },
      {
        figure: "15–25 Days",
        figure_hy: "15–25 Աշխ. Օր",
        label_en: "Electronic Residence Filing",
        label_hy: "ՀՀ Կացության Քարտ",
        detail_en: "Official workpermit.am filings and unified migration residence cards.",
        detail_hy: "Պաշտոնական էլեկտրոնային աշխատանքային թույլտվություն և կացության քարտ:",
      },
      {
        figure: "30-Day SLA",
        figure_hy: "30-Օրյա Երաշխիք",
        label_en: "Replacement Warranty",
        label_hy: "Փոխարինման Երաշխիք",
        detail_en: "Guaranteed talent replacement warranty for corporate enterprises.",
        detail_hy: "Կորպորատիվ գործատուների համար երաշխիքային սպասարկում:",
      },
    ],
  },
  employerSection: {
    eyebrow_en: "B2B Enterprise Staffing",
    eyebrow_hy: "Կորպորատիվ Հավաքագրում",
    headline_en: "Enterprise Workforce Solutions for Armenia",
    headline_hy: "Աշխատուժի Լուծումներ Հայաստանի Գործատուների Համար",
    subtext_en:
      "Supplying vetted international skilled and semi-skilled talent with full Ministry quotas, work permits, and on-site integration.",
    subtext_hy:
      "Որակավորված կադրերի մատակարարում Հայաստանի ձեռնարկություններին՝ պետական քվոտաների, վիզաների և տեղավորման ամբողջական կառավարմամբ:",
    steps: deorganicaConfig.manpower.employerSteps,
  },
  faqHeader: {
    eyebrow_en: "Labor Standards & FAQ",
    eyebrow_hy: "Աշխատանքային Կանոններ և Հարցեր",
    title_en: "Frequently Asked Questions",
    title_hy: "Հաճախ Տրվող Հարցեր",
    subtitle_en:
      "Clear guidance on Ministry permit timelines, legal employment contracts, direct banking, and replacement guarantees.",
    subtitle_hy:
      "Պարզաբանումներ թույլտվությունների ժամկետների, աշխատանքային պայմանագրերի, բանկային քարտերի և փոխարինման երաշխիքի վերաբերյալ:",
  },
  seo: {
    seoTitle: "De Organica Manpower · International Recruitment & B2B Staffing",
    seoDescription:
      "Verified international talent supply and recruitment for Armenia. Transparent candidate placement, legal Ministry of Labor work permits, and accredited B2B corporate staffing.",
  },
};

export const defaultContactPageContent: ContactPageContent = {
  eyebrow_en: "Yerevan Headquarters · Armenia",
  eyebrow_hy: "Երևանի Գլխավոր Գրասենյակ",
  headline_en: "Contact Our Yerevan Office",
  headline_hy: "Կապ Հաստատեք Երևանի Մեր Գրասենյակի Հետ",
  subtext_en:
    "Direct consultation for bespoke Armenian travel, private chauffeur fleet, visa support, and certified international staffing.",
  subtext_hy:
    "Ուղիղ խորհրդատվություն անհատական տուրերի, տրանսպորտային պարկի, վիզաների և միջազգային աշխատուժի հարցերով:",
  deskOpenLabel_en: "Yerevan Desk Open",
  deskOpenLabel_hy: "Գրասենյակը բաց է",
  deskClosedLabel_en: "After-Hours WhatsApp Active",
  deskClosedLabel_hy: "Հերթապահ ռեժիմ (WhatsApp ակտիվ)",
  coordinates: "40.1792° N, 44.4991° E",
  channelsTitle_en: "Select Your Direct Inquiry Channel",
  channelsTitle_hy: "Ընտրեք Ձեր հարցման բնույթը",
  channelsSubtitle_en:
    "Route directly to the appropriate specialist desk in Yerevan with pre-formatted inquiry parameters:",
  channelsSubtitle_hy:
    "Սեղմեք համապատասխան բաժինը՝ անմիջապես համակարգողի հետ կապվելու կամ լիարժեք հայտ ներկայացնելու համար:",
  replySla_en: "Desk Reply SLA: Within 4 Business Hours",
  replySla_hy: "Պատասխանի ժամկետ՝ 4 աշխատանքային ժամվա ընթացքում",
  seo: {
    seoTitle: "Contact De Organica LLC · Yerevan Corporate Desk",
    seoDescription:
      "Direct contact channels for De Organica LLC in Yerevan, Republic of Armenia. WhatsApp desk, corporate email, and prompt consultation for travel and manpower inquiries.",
  },
};

export const defaultTours: TourPackage[] = deorganicaConfig.starterTours.map((t) => ({
  ...t,
  isPublished: true,
}));

export const defaultTravelServices: TravelService[] = deorganicaConfig.travelServices.map((s) => ({
  ...s,
  isPublished: true,
}));

export const defaultJobVacancies: JobVacancy[] = deorganicaConfig.manpower.vacancies.map((v) => ({
  ...v,
  slug: v.id,
}));

export const defaultTravelFaqs: FaqItem[] = [
  {
    id: "travel-faq-visa",
    category: "travel",
    target: "both",
    q_en: "Do international visitors need an entry visa for the Republic of Armenia?",
    q_hy: "Արդյո՞ք արտերկրի զբոսաշրջիկներին անհրաժեշտ է վիզա Հայաստան մուտք գործելու համար:",
    a_en:
      "Citizens of the European Union, United States, UAE, Qatar, Georgia, and Russia enjoy 180-day visa-free entry. For Indian, Filipino, and other nationalities requiring an entry visa, De Organica provides certified eVisa invitation file processing and consular assistance with rapid 3–5 day issuance.",
    a_hy:
      "Եվրոպական Միության, ԱՄՆ-ի, ԱՄԷ-ի, Ռուսաստանի և Վրաստանի քաղաքացիների համար գործում է 180-օրյա առանց վիզայի ռեժիմ: Մյուս երկրների քաղաքացիների համար մեր թիմն ապահովում է ՀՀ էլեկտրոնային վիզայի (eVisa) պաշտոնական հրավերներ և աջակցություն:",
    isPublished: true,
  },
  {
    id: "travel-faq-season",
    category: "travel",
    target: "both",
    q_en: "When is the best season to explore Armenia?",
    q_hy: "Ո՞րն է Հայաստան այցելելու լավագույն ժամանակահատվածը:",
    a_en:
      "Armenia is a four-season destination. Spring (April–June) features mild climate and wildflower meadows. Autumn (September–November) is the signature harvest season for Areni grape harvesting and golden foliage. Winter (December–March) transforms Mount Teghenis in Tsaghkadzor into an alpine ski haven.",
    a_hy:
      "Հայաստանը հիասքանչ է բոլոր եղանակներին: Գարունը (ապրիլ-հունիս) բարեխառն է և կանաչապատ: Աշունը (սեպտեմբեր-նոյեմբեր) խաղողաքաղի և ոսկեզօծ բնության սեզոնն է: Իսկ ձմռանը (դեկտեմբեր-մարտ) Ծաղկաձորը դառնում է լեռնադահուկային գլխավոր կենտրոն:",
    isPublished: true,
  },
  {
    id: "travel-faq-safety",
    category: "travel",
    target: "both",
    q_en: "Is Armenia safe for families, solo female travelers, and corporate delegations?",
    q_hy: "Որքանո՞վ է Հայաստանն անվտանգ ընտանեկան և անհատական այցելուների համար:",
    a_en:
      "Armenia is consistently ranked among the top 10 safest countries worldwide by Numbeo and global travel indices. Yerevan is lively and safe to walk at any hour of the night. Local hospitality is legendary, and emergency services are prompt and multilingual.",
    a_hy:
      "Հայաստանը պաշտոնապես ճանաչված է աշխարհի ամենաանվտանգ երկրներից մեկը: Երևանում հնարավոր է լիարժեք անվտանգ քայլել օրվա ցանկացած ժամի: Տեղացիների հյուրընկալությունն ու բարեհամբույր վերաբերմունքը երաշխավորում են հանգիստ միջավայր:",
    isPublished: true,
  },
  {
    id: "travel-faq-custom",
    category: "travel",
    target: "both",
    q_en: "Can tour packages be tailored for specific pacing or hotel preferences?",
    q_hy: "Հնարավո՞ր է արդյոք հարմարեցնել տուրերը նախասիրություններին կամ ընտրել այլ հյուրանոցներ:",
    a_en:
      "Absolutely. We operate on a fully bespoke model. You can choose between Classic Comfort (clean central 3★ or 4★ boutique stays), or Regional Luxury (wine resort villas and executive chauffeur fleet). If you have already booked your hotel, we offer tour-and-chauffeur-only packages.",
    a_hy:
      "Միանշանակ: Մեր բոլոր ծրագրերը 100% ճկուն են: Կարող եք ընտրել հարմարավետ 3★ կամ 4★ բուտիկ հյուրանոցներ և տարածաշրջանային գինու ռեզորթներ: Եթե արդեն ունեք ամրագրված հյուրանոց, կարող եք պատվիրել միայն տրանսպորտն ու էքսկուրսավարին:",
    isPublished: true,
  },
  {
    id: "travel-faq-b2b",
    category: "travel",
    target: "both",
    q_en: "What are the cooperation terms for international travel agents and B2B DMCs?",
    q_hy: "Որո՞նք են գործակալությունների և B2B գործընկերների հետ համագործակցության պայմանները:",
    a_en:
      "We provide white-label ground management for outbound agencies in the UAE, India, Europe, and Asia. Our B2B partnerships feature dedicated Yerevan dispatch managers, verified hotel allotments, branded airport reception, and tailored itinerary coordination for contracted partners.",
    a_hy:
      "Մենք տրամադրում ենք տեղական սպասարկում արտերկրի գործակալությունների համար՝ գործընկերոջ բրենդով դիմավորմամբ, հյուրանոցային ամրագրումներով և 24/7 օպերատիվ աջակցությամբ:",
    isPublished: true,
  },
];

export const defaultManpowerFaqs: FaqItem[] = [
  {
    id: "manpower-faq-protection",
    category: "manpower",
    target: "candidate",
    q_en: "How does De Organica protect international candidates during the recruitment process?",
    q_hy: "Ինչպե՞ս է «Դե Օրգանիկա»-ն ապահովում միջազգային թեկնածուների իրավական պաշտպանությունը:",
    a_en:
      "Under our strict ethical charter, candidate intake and interviews are conducted directly with vetted Armenian corporate employers. All placements are governed by formal written employment contracts and official Ministry of Labor work permits, ensuring full statutory labor protection and legal residency.",
    a_hy:
      "Մեր էթիկական կանոնադրության համաձայն՝ թեկնածուների ընտրությունն ու հարցազրույցներն անցկացվում են բացառապես ստուգված հայաստանյան կորպորատիվ գործատուների հետ: Բոլոր տեղակայումները կարգավորվում են պաշտոնական աշխատանքային պայմանագրերով և ՀՀ աշխատանքի օրինական թույլտվություններով՝ երաշխավորելով իրավական պաշտպանվածություն և օրինական կացություն:",
    isPublished: true,
  },
  {
    id: "manpower-faq-timeline",
    category: "manpower",
    target: "both",
    q_en: "How long does the legal work permit and residence card process take in Armenia?",
    q_hy: "Որքա՞ն ժամանակ է պահանջվում ՀՀ աշխատանքի թույլտվության և կացության քարտի ձևակերպման համար:",
    a_en:
      "The legal immigration process is handled via the Unified Migration Service under the Ministry of Internal Affairs and the Ministry of Labor and Social Affairs of the Republic of Armenia. Standard processing timelines range from 15 to 25 business days from dossier submission to permit issuance.",
    a_hy:
      "Իրավական գործընթացն իրականացվում է ՀՀ միգրացիոն ծառայության և Աշխատանքի և սոցիալական հարցերի նախարարության միջոցով: Փաստաթղթերի ներկայացումից մինչև աշխատանքի թույլտվության և կացության քարտի տրամադրումը տևում է միջինում 15-ից 25 աշխատանքային օր:",
    isPublished: true,
  },
  {
    id: "manpower-faq-warranty",
    category: "manpower",
    target: "employer",
    q_en: "What is the 30-Day Employer Replacement Warranty for enterprise hires?",
    q_hy: "Ի՞նչ է իրենից ներկայացնում գործատուների համար գործող 30-օրյա փոխարինման երաշխիքը:",
    a_en:
      "We stand behind the quality of our vetted talent. If a deployed candidate fails to satisfy the technical competencies or work attendance expectations outlined in the job description within their first 30 days of employment, De Organica provides an expedited replacement candidate under our recruitment warranty.",
    a_hy:
      "Մենք երաշխավորում ենք ընտրված մասնագետների որակը: Եթե տեղավորված աշխատակիցը փորձաշրջանի առաջին 30 օրվա ընթացքում չի համապատասխանում պահանջներին, «Դե Օրգանիկա»-ն տրամադրում է նոր որակավորված թեկնածու մեր կորպորատիվ երաշխիքի շրջանակներում:",
    isPublished: true,
  },
  {
    id: "manpower-faq-banking",
    category: "manpower",
    target: "candidate",
    q_en: "How are worker wages paid, and what taxes/social insurance apply in Armenia?",
    q_hy: "Ինչպե՞ս են վճարվում աշխատավարձերը և ի՞նչ հարկեր են գործում Հայաստանում:",
    a_en:
      "All salaries are legally disbursed via direct official bank deposits. Employers must provide formal documentation showing statutory social contributions, which entitle workers to official medical coverage and workplace protections under the RA Labor Code.",
    a_hy:
      "Բոլոր աշխատավարձերը վճարվում են բացառապես անկանխիկ՝ պաշտոնական բանկային փոխանցումների միջոցով: Գործատուն ապահովում է օրենքով սահմանված սոցիալական երաշխիքները, ինչը ներառում է բժշկական ապահովագրություն և աշխատանքային իրավունքների պաշտպանություն:",
    isPublished: true,
  },
  {
    id: "manpower-faq-evn",
    category: "manpower",
    target: "both",
    q_en: "Does De Organica arrange Zvartnots airport reception and initial accommodation?",
    q_hy: "Արդյո՞ք «Դե Օրգանիկա»-ն ապահովում է դիմավորում օդանավակայանում և կացարան:",
    a_en:
      "Yes. Every international deployment includes end-to-end ground care: 24/7 airport reception at Zvartnots International Airport (EVN), direct transport to pre-vetted corporate staff quarters or apartments, local SIM card allocation, and registration with municipal authorities.",
    a_hy:
      "Այո: Յուրաքանչյուր միջազգային աշխատակցի համար գործում է լիարժեք ընդունելության ծրագիր. 24/7 դիմավորում Զվարթնոց օդանավակայանում, տեղափոխում կացարան, տեղական SIM քարտի տրամադրում և պաշտոնական հաշվառում համապատասխան մարմիններում:",
    isPublished: true,
  },
];
