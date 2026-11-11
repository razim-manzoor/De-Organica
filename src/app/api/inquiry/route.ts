import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { deorganicaConfig } from "@/data/deorganica-content";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const inquiryType = (formData.get("inquiryType") as string) || "general";
    const fullName = (formData.get("fullName") as string) || "";
    const email = (formData.get("email") as string) || "";
    const phone = (formData.get("phone") as string) || "";
    const notes = (formData.get("notes") as string) || "";
    const locale = (formData.get("locale") as string) || "en";

    // Mode-specific
    const serviceOrTour = (formData.get("serviceOrTour") as string) || "";
    const travelDates = (formData.get("travelDates") as string) || "";
    const guestsCount = (formData.get("guestsCount") as string) || "";

    const nationality = (formData.get("nationality") as string) || "";
    const currentCountry = (formData.get("currentCountry") as string) || "";
    const targetRole = (formData.get("targetRole") as string) || "";

    const companyName = (formData.get("companyName") as string) || "";
    const contactPerson = (formData.get("contactPerson") as string) || "";
    const industrySector = (formData.get("industrySector") as string) || "";
    const headcountRequired = (formData.get("headcountRequired") as string) || "";

    // CV Attachment
    const cvFile = formData.get("cvFile") as File | null;
    let attachments: { filename: string; content: Buffer }[] = [];

    if (cvFile && typeof cvFile.arrayBuffer === "function") {
      const bytes = await cvFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      attachments.push({
        filename: cvFile.name,
        content: buffer,
      });
    }

    // Build Email Subject and HTML Body
    let subject = `[De Organica Desk] New ${inquiryType.toUpperCase()} Inquiry from ${fullName || contactPerson || "Web Visitor"}`;
    let bodyContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E5E3DC; border-radius: 8px; background-color: #FBFBF9;">
        <div style="border-bottom: 2px solid #233D20; padding-bottom: 12px; margin-bottom: 20px;">
          <h2 style="color: #233D20; margin: 0; font-size: 20px;">DE ORGANICA LLC — DESK INQUIRY</h2>
          <p style="color: #668B2E; margin: 4px 0 0 0; font-size: 12px; font-weight: bold; text-transform: uppercase;">
            Category: ${inquiryType} · Language: ${locale}
          </p>
        </div>

        <table style="width: 100%; border-collapse: collapse; font-size: 14px; color: #1A2219;">
          <tr>
            <td style="padding: 8px 0; font-weight: bold; width: 160px; color: #4A5448;">Name / Contact:</td>
            <td style="padding: 8px 0;">${fullName || contactPerson}</td>
          </tr>
          ${companyName ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Company Name:</td><td style="padding: 8px 0;">${companyName}</td></tr>` : ""}
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Phone / WhatsApp:</td>
            <td style="padding: 8px 0;"><a href="https://wa.me/${phone.replace(/[^0-9]/g, "")}" style="color: #233D20; font-weight: bold;">${phone || "Not provided"}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Email:</td>
            <td style="padding: 8px 0;">${email ? `<a href="mailto:${email}" style="color: #233D20;">${email}</a>` : "Not provided"}</td>
          </tr>
          ${serviceOrTour ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Service / Tour:</td><td style="padding: 8px 0;">${serviceOrTour}</td></tr>` : ""}
          ${travelDates ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Travel Dates:</td><td style="padding: 8px 0;">${travelDates}</td></tr>` : ""}
          ${guestsCount ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Guests Count:</td><td style="padding: 8px 0;">${guestsCount}</td></tr>` : ""}
          ${targetRole ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Target Role:</td><td style="padding: 8px 0;"><strong>${targetRole}</strong></td></tr>` : ""}
          ${nationality ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Nationality:</td><td style="padding: 8px 0;">${nationality}</td></tr>` : ""}
          ${currentCountry ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Current Location:</td><td style="padding: 8px 0;">${currentCountry}</td></tr>` : ""}
          ${industrySector ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Industry Sector:</td><td style="padding: 8px 0;">${industrySector}</td></tr>` : ""}
          ${headcountRequired ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Headcount Needed:</td><td style="padding: 8px 0;">${headcountRequired}</td></tr>` : ""}
          ${cvFile ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #4A5448;">Attached CV:</td><td style="padding: 8px 0; color: #668B2E; font-weight: bold;">📎 ${cvFile.name} (${Math.round(cvFile.size / 1024)} KB)</td></tr>` : ""}
        </table>

        ${notes ? `
          <div style="margin-top: 18px; padding: 12px; background-color: #F4F3EE; border-radius: 6px;">
            <p style="margin: 0 0 6px 0; font-size: 12px; font-weight: bold; color: #4A5448;">ADDITIONAL NOTES / REQUIREMENTS:</p>
            <p style="margin: 0; font-size: 13px; color: #1A2219; white-space: pre-wrap;">${notes}</p>
          </div>
        ` : ""}

        <div style="margin-top: 24px; padding-top: 12px; border-top: 1px solid #EAE8E0; font-size: 11px; color: #768273; text-align: center;">
          De Organica LLC · Yerevan, Republic of Armenia · <a href="https://deorganica.am" style="color: #668B2E;">deorganica.am</a>
        </div>
      </div>
    `;

    // Attempt to send email via Resend if API key is provided
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "De Organica Desk <inquiries@deorganica.am>",
        to: [deorganicaConfig.company.email],
        subject,
        html: bodyContent,
        attachments: attachments.length > 0 ? attachments : undefined,
      });
    } else {
      // In development or when RESEND_API_KEY is not yet populated
      console.log("[De Organica Inquiry Received]", {
        subject,
        fullName,
        phone,
        email,
        inquiryType,
        targetRole,
        companyName,
        attachedFileName: cvFile?.name,
      });
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry received and routed to Yerevan desk.",
    });
  } catch (error: any) {
    console.error("[Inquiry API Error]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process inquiry" },
      { status: 500 }
    );
  }
}
