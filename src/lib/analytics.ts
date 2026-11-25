export const GA_MEASUREMENT_ID =
  typeof process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID === "string" &&
  /^(G|GT|AW|DC)-[A-Z0-9]{4,20}$/i.test(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID.trim())
    ? process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID.trim()
    : "";

export const CF_ANALYTICS_TOKEN =
  typeof process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN === "string" &&
  /^[a-f0-9]{16,64}$/i.test(process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN.trim())
    ? process.env.NEXT_PUBLIC_CF_ANALYTICS_TOKEN.trim()
    : "";

export const CONSENT_STORAGE_KEY = "deorganica_analytics_consent";

type GtagFn = (
  command: "consent" | "config" | "event" | "js",
  target: string | Date,
  params?: Record<string, string | number | boolean>
) => void;

export function getWindowGtag(): GtagFn | null {
  if (typeof window === "undefined") return null;
  const candidate = (window as Window & { gtag?: GtagFn }).gtag;
  return typeof candidate === "function" ? candidate : null;
}

export function trackAnalyticsEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  const gtag = getWindowGtag();
  if (gtag) {
    gtag("event", eventName, params);
  }
}
