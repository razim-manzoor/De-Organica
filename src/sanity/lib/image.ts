import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, isSanityConfigured, projectId } from "../env";

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export type SanityImageLike =
  | string
  | {
      asset?: {
        _ref?: string;
        _id?: string;
        url?: string;
      };
      url?: string;
    }
  | null
  | undefined;

/**
 * Resolves either a local path/URL string or a Sanity image object into a renderable URL string.
 */
export function resolveImageUrl(
  source: SanityImageLike,
  fallback = "",
  width?: number
): string {
  if (!source) return fallback;
  if (typeof source === "string") {
    return source.trim() || fallback;
  }
  if (typeof source === "object") {
    if (source.url) return source.url;
    if (source.asset?.url) return source.asset.url;
    if (builder && (source.asset?._ref || source.asset?._id)) {
      let img = builder.image(source).auto("format").fit("max");
      if (width) img = img.width(width);
      return img.url() || fallback;
    }
  }
  return fallback;
}
