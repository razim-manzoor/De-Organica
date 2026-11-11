import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Locale } from "@/types/content";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Graceful translation fallback helper:
 * Returns the localized field (`field_hy`), and automatically falls back to `field_en`
 * if the Armenian translation is missing, empty, or not yet provided.
 */
export function tField<T extends Record<string, any>>(
  item: T,
  field: string,
  locale: Locale
): string {
  if (!item) return "";
  const localizedKey = `${field}_${locale}`;
  const fallbackKey = `${field}_en`;
  return item[localizedKey] || item[fallbackKey] || "";
}

/**
 * Array translation helper for string lists
 */
export function tArray<T extends Record<string, any>>(
  item: T,
  field: string,
  locale: Locale
): string[] {
  if (!item) return [];
  const localizedKey = `${field}_${locale}`;
  const fallbackKey = `${field}_en`;
  return item[localizedKey] || item[fallbackKey] || [];
}
