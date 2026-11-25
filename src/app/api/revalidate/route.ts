import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { revalidateSecret } from "@/sanity/env";

function constantTimeMatch(a: string | null, b: string): boolean {
  if (!a) return false;
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

const SLUG_RE = /^[a-z0-9-]+$/i;

const KNOWN_TAGS = new Set([
  "siteSettings",
  "homePage",
  "travelPage",
  "manpowerPage",
  "contactPage",
  "tourPackage",
  "travelService",
  "jobSector",
  "jobVacancy",
  "faqItem",
]);

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const headerSecret = req.headers.get("x-sanity-secret") || url.searchParams.get("secret");

    let documentType: string | undefined;
    let slugCurrent: string | undefined;

    if (revalidateSecret) {
      // Support either Sanity webhook signature or explicit secret header/query
      const signature = req.headers.get("sanity-webhook-signature");
      if (signature) {
        const { isValidSignature, body } = await parseBody<{
          _type?: string;
          slug?: { current?: string };
        }>(req, revalidateSecret);
        if (!isValidSignature) {
          return NextResponse.json({ message: "Invalid webhook signature" }, { status: 401 });
        }
        documentType = body?._type;
        slugCurrent = body?.slug?.current;
      } else if (constantTimeMatch(headerSecret, revalidateSecret)) {
        const body = (await req.json().catch(() => ({}))) as {
          _type?: string;
          slug?: { current?: string };
        };
        documentType = body?._type;
        slugCurrent = body?.slug?.current;
      } else {
        return NextResponse.json({ message: "Unauthorized revalidation request" }, { status: 401 });
      }
    } else {
      return NextResponse.json(
        { message: "SANITY_REVALIDATE_SECRET is not configured on the server" },
        { status: 401 }
      );
    }

    if (documentType && KNOWN_TAGS.has(documentType)) {
      revalidateTag(documentType);
    } else {
      for (const tag of KNOWN_TAGS) {
        revalidateTag(tag);
      }
    }

    if (documentType === "tourPackage" && slugCurrent && SLUG_RE.test(slugCurrent)) {
      revalidateTag(`tourPackage:${slugCurrent}`);
      revalidatePath(`/travel/${slugCurrent}`);
    }

    revalidatePath("/", "layout");
    revalidatePath("/travel");
    revalidatePath("/manpower");
    revalidatePath("/contact");
    revalidatePath("/sitemap.xml");

    return NextResponse.json({
      revalidated: true,
      type: documentType || "all",
      slug: slugCurrent || null,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Revalidate] Error:", error);
    return NextResponse.json({ message: "Failed to revalidate" }, { status: 500 });
  }
}
