export const MAX_CV_BYTES = 4 * 1024 * 1024;
export const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];

export const LODGING_TIERS = [
  {
    id: "Economy & Clean 3★ Stays",
    label_en: "Clean 3★ City Stays",
    label_hy: "Հարմարավետ 3★ քաղաքային հյուրանոցներ",
    sub_en: "Curated, central lodging",
    sub_hy: "Ընտրված, կենտրոնական տեղավորում",
  },
  {
    id: "Boutique Wine & Heritage Resorts",
    label_en: "Boutique Wine & Heritage Resorts",
    label_hy: "Բուտիկ գինու և ժառանգության ռեզորթներ",
    sub_en: "Areni vineyard estates, historic tuff stays",
    sub_hy: "Արենիի խաղողուտներ, պատմական ռեզորթներ",
  },
  {
    id: "4-Star City Comfort",
    label_en: "4-Star City Comfort",
    label_hy: "4★ Քաղաքային հյուրանոցներ",
    sub_en: "Premium central hotels with breakfast",
    sub_hy: "Պրեմիում քաղաքային հարմարավետություն",
  },
  {
    id: "5-Star Luxury Hotels",
    label_en: "5-Star Luxury Hotels",
    label_hy: "5★ Լյուքս հյուրանոցներ",
    sub_en: "The Alexander, Grand Hotel, luxury suites",
    sub_hy: "The Alexander, Grand Hotel, լյուքս համարներ",
  },
  {
    id: "Tours & Chauffeur Only",
    label_en: "Tours & Chauffeur Only",
    label_hy: "Միայն տուրեր և շոֆեր",
    sub_en: "Self-booked lodging, ground dispatch only",
    sub_hy: "Սեփական հյուրանոց, միայն տրանսպորտ",
  },
];

export const FLEET_TIERS = [
  {
    id: "Economy Sedan",
    label_en: "Economy Sedan",
    label_hy: "Էկոնոմ Սեդան",
    sub_en: "Value · 1–3 guests",
    sub_hy: "Մատչելի · 1–3 հյուր",
  },
  {
    id: "Executive Sedan",
    label_en: "Executive Sedan",
    label_hy: "Բիզնես Սեդան",
    sub_en: "Business · 1–3 guests",
    sub_hy: "Բիզնես · 1–3 հյուր",
  },
  {
    id: "VIP Minivan / Van",
    label_en: "VIP Minivan / Van",
    label_hy: "VIP Միկրոավտոբուս",
    sub_en: "Group · 4–16 guests",
    sub_hy: "Խումբ · 4–16 հյուր",
  },
  {
    id: "Tour Coach",
    label_en: "Tour Coach",
    label_hy: "Տուրիստական Ավտոբուս",
    sub_en: "Large group · 17+ guests",
    sub_hy: "Մեծ խումբ · 17+ հյուր",
  },
];

export const B2B_SCOPES = [
  {
    id: "FITs & Private VIPs",
    label_en: "FITs & Private VIPs",
    label_hy: "FITs և VIP Անհատական",
    desc_en: "1–6 pax bespoke itineraries",
    desc_hy: "1–6 անձ անհատական ծրագրեր",
  },
  {
    id: "Leisure Groups (15–40)",
    label_en: "Leisure Groups (15–40)",
    label_hy: "Տուրիստական Խմբեր (15–40)",
    desc_en: "Fixed series or seasonal leisure groups",
    desc_hy: "Սերիական կամ սեզոնային տուրեր",
  },
  {
    id: "MICE & Corporate Delegations",
    label_en: "MICE Delegations",
    label_hy: "MICE և Կորպորատիվ",
    desc_en: "Conferences, galas, executive incentives",
    desc_hy: "Կոնֆերանսներ, միջոցառումներ, բիզնես",
  },
];

export type InvalidFieldKey =
  | "agencyName"
  | "companyName"
  | "fullName"
  | "phoneNumber"
  | "email"
  | "targetRole"
  | "cvFile"
  | "consent"
  | null;
