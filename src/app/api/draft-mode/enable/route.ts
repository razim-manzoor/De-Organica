import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { getSanityPreviewClient } from "@/sanity/lib/client";
import { isSanityConfigured } from "@/sanity/env";

export async function GET(request: Request) {
  if (!isSanityConfigured) {
    return new Response("Sanity is not configured", { status: 400 });
  }

  const client = getSanityPreviewClient();
  if (!client) {
    return new Response("Sanity preview client unavailable", { status: 500 });
  }

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(client, request.url);
  if (!isValid) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  const dm = await draftMode();
  dm.enable();
  redirect(redirectTo);
}
