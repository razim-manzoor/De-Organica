import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getCompanyInfo } from "@/sanity/lib/fetch";

const MAX_CV_BYTES = 4 * 1024 * 1024; // 4 MB keeps multipart POSTs below Vercel (4.5 MB) and Netlify (6 MB) caps
const ALLOWED_CV_EXTENSIONS = [".pdf", ".doc", ".docx"];
const ALLOWED_CV_MIMES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/octet-stream",
]);

// Rate Limiting Architecture:
// In-memory sliding window for single-node / container deployments (e.g. self-hosted Node / next start).
// For high-concurrency multi-region serverless deployment (Vercel / Netlify edge),
// replace ipRequestLog with an Upstash Redis KV / @upstash/ratelimit client.
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const ipRequestLog = new Map<string, number[]>();

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim() || "unknown";
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSec: number } {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const recent = (ipRequestLog.get(ip) ?? []).filter((ts) => ts > windowStart);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    const oldestInWindow = recent[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldestInWindow + RATE_LIMIT_WINDOW_MS - now) / 1000));
    ipRequestLog.set(ip, recent);
    return { allowed: false, retryAfterSec };
  }

  recent.push(now);
  ipRequestLog.set(ip, recent);

  if (ipRequestLog.size > 1000) {
    for (const [key, timestamps] of ipRequestLog.entries()) {
      if (timestamps.every((ts) => ts <= windowStart)) {
        ipRequestLog.delete(key);
      }
      if (ipRequestLog.size <= 500) break;
    }
  }

  return { allowed: true, retryAfterSec: 0 };
}

function startsWithBytes(buf: Uint8Array, signature: number[]): boolean {
  if (buf.length < signature.length) return false;
  return signature.every((byte, idx) => buf[idx] === byte);
}

function matchesCvSignature(lowerFileName: string, buf: Uint8Array): boolean {
  if (lowerFileName.endsWith(".pdf")) {
    return startsWithBytes(buf, [0x25, 0x50, 0x44, 0x46, 0x2d]); // %PDF-
  }
  if (lowerFileName.endsWith(".docx")) {
    return startsWithBytes(buf, [0x50, 0x4b, 0x03, 0x04]); // PK.. ZIP container
  }
  if (lowerFileName.endsWith(".doc")) {
    return (
      startsWithBytes(buf, [0xd0, 0xcf, 0x11, 0xe0]) || // OLE2 Compound Binary
      startsWithBytes(buf, [0x7b, 0x5c, 0x72, 0x74, 0x66]) // {\rtf Word-compatible
    );
  }
  return false;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function safeField(formData: FormData, key: string, maxLen: number = 1000): string {
  const raw = formData.get(key);
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, maxLen);
}

export async function POST(req: NextRequest) {
  try {
    const rate = checkRateLimit(getClientIp(req));
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many inquiry requests. Please wait a few minutes or contact our WhatsApp desk directly.",
        },
        {
          status: 429,
          headers: { "Retry-After": String(rate.retryAfterSec) },
        }
      );
    }

    const formData = await req.formData();

    // Silent honeypot drop for automated spam bots
    const honeypot =
      safeField(formData, "companyWebsiteHp", 200) ||
      safeField(formData, "website", 200);
    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: "Inquiry received.",
      });
    }

    const inquiryType = safeField(formData, "inquiryType", 40) || "general";
    const fullName = safeField(formData, "fullName", 200);
    const email = safeField(formData, "email", 200);
    const phone = safeField(formData, "phone", 60);
    const notes = safeField(formData, "notes", 3000);
    const locale = safeField(formData, "locale", 10) || "en";

    // Mode-specific: Travel
    const serviceOrTour = safeField(formData, "serviceOrTour", 200);
    const travelerType = safeField(formData, "travelerType", 40);
    const budgetTier = safeField(formData, "budgetTier", 100);
    const agencyName = safeField(formData, "agencyName", 200);
    const agencyCountry = safeField(formData, "agencyCountry", 120);
    const b2bScope = safeField(formData, "b2bScope", 120);
    const travelDates = safeField(formData, "travelDates", 200);
    const guestsCount = safeField(formData, "guestsCount", 20);
    const accommodationTier = safeField(formData, "accommodationTier", 160);
    const fleetTier = safeField(formData, "fleetTier", 120);

    // Mode-specific: Candidate
    const nationality = safeField(formData, "nationality", 120);
    const currentCountry = safeField(formData, "currentCountry", 120);
    const targetRole = safeField(formData, "targetRole", 200);
    const experienceLevel = safeField(formData, "experienceLevel", 80);
    const primaryLanguage = safeField(formData, "primaryLanguage", 100);
    const candidateStatus = safeField(formData, "candidateStatus", 120);

    // Mode-specific: Employer
    const companyName = safeField(formData, "companyName", 200);
    const contactPerson = safeField(formData, "contactPerson", 200);
    const employerJurisdiction = safeField(formData, "employerJurisdiction", 120);
    const industrySector = safeField(formData, "industrySector", 160);
    const headcountRequired = safeField(formData, "headcountRequired", 60);
    const employerUrgency = safeField(formData, "employerUrgency", 80);
    const employerHousing = safeField(formData, "employerHousing", 120);

    // Server-side CV Attachment Validation
    const cvEntry = formData.get("cvFile");
    const cvFile = cvEntry && typeof cvEntry === "object" && "arrayBuffer" in cvEntry ? (cvEntry as File) : null;
    const attachments: { filename: string; content: Buffer }[] = [];

    if (cvFile && cvFile.size > 0) {
      if (cvFile.size > MAX_CV_BYTES) {
        return NextResponse.json(
          { success: false, error: "Resume attachment exceeds maximum 4 MB size limit." },
          { status: 400 }
        );
      }

      const lowerName = (cvFile.name || "").toLowerCase();
      const hasValidExt = ALLOWED_CV_EXTENSIONS.some((ext) => lowerName.endsWith(ext));
      const hasValidMime = !cvFile.type || ALLOWED_CV_MIMES.has(cvFile.type);

      if (!hasValidExt || !hasValidMime) {
        return NextResponse.json(
          { success: false, error: "Invalid resume format. Accepted formats: PDF, DOC, DOCX." },
          { status: 400 }
        );
      }

      const bytes = await cvFile.arrayBuffer();
      const uint8 = new Uint8Array(bytes);
      if (!matchesCvSignature(lowerName, uint8)) {
        return NextResponse.json(
          {
            success: false,
            error: "Uploaded file signature does not match a valid PDF, DOC, or DOCX document.",
          },
          { status: 400 }
        );
      }

      const cleanFileName = cvFile.name.replace(/[^\w.\-() ]+/g, "_").slice(0, 120) || "resume.pdf";
      attachments.push({
        filename: cleanFileName,
        content: Buffer.from(uint8),
      });
    }

    // Build Email Subject and Escaped HTML Body
    const displayContact = (fullName || contactPerson || "Web Visitor").replace(/[\r\n]+/g, " ");
    const safeSubjectType = inquiryType.replace(/[\r\n]+/g, " ").toUpperCase();
    const subject = `[De Organica Desk] New ${safeSubjectType} Inquiry from ${displayContact}`;

    const phoneDigits = phone.replace(/[^0-9]/g, "");
    const safeMailto = email.replace(/[\r\n"<>]/g, "");

    const row = (label: string, value: string, boldValue: boolean = false) =>
      value
        ? `<tr><td style="padding: 8px 0; font-weight: bold; width: 170px; color: #424C40;">${escapeHtml(
            label
          )}</td><td style="padding: 8px 0;">${
            boldValue ? `<strong>${escapeHtml(value)}</strong>` : escapeHtml(value)
          }</td></tr>`
        : "";

    const bodyContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E8E6DF; border-radius: 8px; background-color: #FBFBF9;">
        <div style="border-bottom: 2px solid #233D20; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #233D20; margin: 0; font-size: 20px;">DE ORGANICA LLC — DESK INQUIRY</h2>
          <p style="color: #4B6820; margin: 4px 0 0 0; font-size: 12px; font-weight: bold; text-transform: uppercase;">
            Category: ${escapeHtml(inquiryType)} · Language: ${escapeHtml(locale)}
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1A2219;">
          ${row("Name / Contact:", fullName || contactPerson)}
          ${row("Company Name:", companyName)}
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #424C40;">Phone / WhatsApp:</td>
            <td style="padding: 8px 0;">${
              phoneDigits
                ? `<a href="https://wa.me/${phoneDigits}" style="color: #233D20; font-weight: bold;">${escapeHtml(
                    phone
                  )}</a>`
                : escapeHtml(phone || "Not provided")
            }</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #424C40;">Email:</td>
            <td style="padding: 8px 0;">${
              safeMailto
                ? `<a href="mailto:${escapeHtml(safeMailto)}" style="color: #233D20;">${escapeHtml(
                    email
                  )}</a>`
                : "Not provided"
            }</td>
          </tr>
          ${row("Service / Tour:", serviceOrTour)}
          ${
            travelerType
              ? row(
                  "Traveler Type:",
                  travelerType === "b2b" ? "B2B Travel Agency / DMC" : "Private Leisure / Family"
                )
              : ""
          }
          ${row("Travel Style:", budgetTier, true)}
          ${agencyName ? row("Agency Name:", `${agencyName} (${agencyCountry || "N/A"})`) : ""}
          ${row("B2B Group Scope:", b2bScope, true)}
          ${row("Travel Dates:", travelDates)}
          ${row("Guests Count:", guestsCount)}
          ${row("Accommodation:", accommodationTier)}
          ${row("Chauffeur Fleet:", fleetTier)}
          ${row("Target Role:", targetRole, true)}
          ${row("Years Experience:", experienceLevel)}
          ${row("Languages:", primaryLanguage)}
          ${row("Mobility Status:", candidateStatus)}
          ${row("Nationality:", nationality)}
          ${row("Current Location:", currentCountry)}
          ${row("Jurisdiction:", employerJurisdiction)}
          ${row("Industry Sector:", industrySector)}
          ${row("Headcount Needed:", headcountRequired)}
          ${row("Target Timeline:", employerUrgency)}
          ${row("Housing Policy:", employerHousing)}
          ${
            cvFile && cvFile.size > 0
              ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #424C40;">Attached CV:</td><td style="padding: 8px 0; color: #4B6820; font-weight: bold;">${escapeHtml(
                  cvFile.name
                )} (${Math.round(cvFile.size / 1024)} KB)</td></tr>`
              : ""
          }
        </table>

        ${
          notes
            ? `
          <div style="margin-top: 18px; padding: 12px; background-color: #F4F3EE; border-radius: 6px;">
            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; color: #424C40;">ADDITIONAL NOTES / REQUIREMENTS:</p>
            <p style="margin: 0; font-size: 13px; color: #1A2219; white-space: pre-wrap;">${escapeHtml(
              notes
            )}</p>
          </div>
        `
            : ""
        }

        <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #E8E6DF; font-size: 11px; color: #566153; text-align: center;">
          De Organica LLC · Yerevan, Republic of Armenia · <a href="https://deorganica.am" style="color: #4B6820;">deorganica.am</a>
        </div>
      </div>
    `;

    const company = await getCompanyInfo();
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);

      // Intelligent Dual-Delivery Routing:
      // Dispatches to the official corporate desk (info@deorganica.am)
      // AND the client mobile Gmail backup (deorganicallc@gmail.com) for instant phone alerts.
      const recipients = Array.from(
        new Set([company.email, "deorganicallc@gmail.com"].filter(Boolean))
      );

      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || `${company.name} Desk <inquiries@send.deorganica.am>`,
        to: recipients,
        subject,
        html: bodyContent,
        attachments: attachments.length > 0 ? attachments : undefined,
      });

      if (error) {
        console.error("[Resend Delivery Error]", error);
        return NextResponse.json(
          {
            success: false,
            error: "Email delivery failed to transmit. Please connect with our Yerevan operations desk directly via WhatsApp or phone.",
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
          },
          { status: 502 }
        );
      }

      console.log("[Resend Delivery Succeeded]", { id: data?.id, subject });
    } else {
      console.log("[De Organica Inquiry Received]", {
        subject,
        inquiryType,
        locale,
        attachedFileName: cvFile?.name,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry received and routed to Yerevan desk.",
    });
  } catch (error: unknown) {
    console.error("[Inquiry API Error]", error);
    const msg = error instanceof Error ? error.message : "Failed to process inquiry";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
