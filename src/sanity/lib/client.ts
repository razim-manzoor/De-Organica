import { createClient, type SanityClient } from "next-sanity";
import { apiVersion, dataset, isSanityConfigured, projectId, readToken } from "../env";

let cachedClient: SanityClient | null = null;
let cachedPreviewClient: SanityClient | null = null;

export function getSanityClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (!cachedClient) {
    cachedClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    });
  }
  return cachedClient;
}

export function getSanityPreviewClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (!cachedPreviewClient) {
    cachedPreviewClient = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: readToken || undefined,
      perspective: readToken ? "previewDrafts" : "published",
    });
  }
  return cachedPreviewClient;
}
