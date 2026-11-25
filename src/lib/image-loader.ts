import type { ImageLoaderProps } from "next/image";

/**
 * Custom Next/Image loader that serves Sanity CDN images directly from
 * Sanity's edge CDN (`cdn.sanity.io`) with responsive width, quality, and
 * automatic AVIF/WebP negotiation instead of double-proxying through `/_next/image`.
 */
export function sanityCdnLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ?? 75;
  if (src.startsWith("https://cdn.sanity.io/")) {
    const sep = src.includes("?") ? "&" : "?";
    return `${src}${sep}w=${width}&q=${q}&auto=format&fit=max`;
  }
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${q}`;
}
