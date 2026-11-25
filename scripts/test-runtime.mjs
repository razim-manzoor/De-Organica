#!/usr/bin/env node
/**
 * Runtime Unit & Integration Tests for De Organica LLC
 *
 * Uses Node's built-in test runner (`node --test`) and in-memory TypeScript
 * transpilation to test real source modules without mutating live services:
 *   1. WhatsApp URL & structured message builders (`src/lib/whatsapp.ts`)
 *   2. Host & subdomain canonicalization (`src/middleware.ts`)
 *   3. Inquiry API validation, CV magic bytes, honeypot, env guards & rate limits (`src/app/api/inquiry/route.ts`)
 */

import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";

const require = createRequire(import.meta.url);
const rootDir = path.resolve(process.cwd());
const srcDir = path.join(rootDir, "src");

function resolveTsTarget(rawTarget) {
  const candidates = [
    rawTarget,
    `${rawTarget}.ts`,
    `${rawTarget}.tsx`,
    path.join(rawTarget, "index.ts"),
    path.join(rawTarget, "index.tsx"),
    `${rawTarget}.js`,
  ];
  for (const candidate of candidates) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate;
    }
  }
  return null;
}

function loadTsModule(entryRelPath, mocks = {}) {
  const moduleCache = new Map();

  function loadFile(absPath) {
    if (moduleCache.has(absPath)) {
      return moduleCache.get(absPath).exports;
    }

    const source = fs.readFileSync(absPath, "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2022,
        esModuleInterop: true,
        resolveJsonModule: true,
      },
      fileName: absPath,
    });

    const mod = { exports: {} };
    moduleCache.set(absPath, mod);

    const localRequire = (specifier) => {
      if (Object.prototype.hasOwnProperty.call(mocks, specifier)) {
        return mocks[specifier];
      }

      if (specifier.startsWith("@/") || specifier.startsWith("./") || specifier.startsWith("../")) {
        const basePath = specifier.startsWith("@/")
          ? path.join(srcDir, specifier.slice(2))
          : path.resolve(path.dirname(absPath), specifier);
        const resolved = resolveTsTarget(basePath);
        if (!resolved) {
          throw new Error(`Unable to resolve module '${specifier}' from '${absPath}'`);
        }
        if (resolved.endsWith(".ts") || resolved.endsWith(".tsx")) {
          return loadFile(resolved);
        }
        return require(resolved);
      }

      return require(specifier);
    };

    const wrapper = vm.runInThisContext(
      `(function (exports, require, module, __filename, __dirname) {\n${outputText}\n})`,
      { filename: absPath }
    );
    wrapper(mod.exports, localRequire, mod, absPath, path.dirname(absPath));
    return mod.exports;
  }

  return loadFile(path.join(rootDir, entryRelPath));
}

// ---------------------------------------------------------------------------
// 1. WhatsApp Builder Tests
// ---------------------------------------------------------------------------
test("WhatsApp builders encode target digits and structured B2B/Candidate/Employer payloads", () => {
  const {
    buildWhatsAppUrl,
    buildTravelWhatsAppMessage,
    buildCandidateWhatsAppMessage,
    buildEmployerWhatsAppMessage,
  } = loadTsModule("src/lib/whatsapp.ts");

  const url = buildWhatsAppUrl("Hello Yerevan & World", "+374 (55) 56-95-53");
  assert.equal(url, "https://wa.me/37455569553?text=Hello%20Yerevan%20%26%20World");

  const b2bMsg = buildTravelWhatsAppMessage({
    travelerType: "b2b",
    serviceOrTour: "B2B Ground Handling",
    agencyName: "Horizon DMC",
    agencyCountry: "UAE",
    b2bScope: "FIT Ground Package",
    dates: "2026-10-01",
    guests: "12",
    name: "Tariq",
    phone: "+971501234567",
  });
  assert.match(b2bMsg, /Inquiry Category:\* B2B DMC Ground Partner Allotment/);
  assert.match(b2bMsg, /Travel Agency \/ DMC:\* Horizon DMC \(UAE\)/);
  assert.match(b2bMsg, /B2B Group Scope:\* FIT Ground Package/);

  const candidateMsg = buildCandidateWhatsAppMessage({
    role: "Hospitality Chef",
    name: "Aram Sargsyan",
    nationality: "Armenia",
    currentLocation: "Yerevan",
    phone: "+37477112233",
  });
  assert.match(candidateMsg, /DE ORGANICA MANPOWER — CANDIDATE APPLICATION/);
  assert.match(candidateMsg, /Target Role \/ Sector:\* Hospitality Chef/);
  assert.match(candidateMsg, /Nationality:\* Armenia/);

  const employerMsg = buildEmployerWhatsAppMessage({
    companyName: "Yerevan Grand Hotel",
    contactPerson: "Sona Hovhannisyan",
    jurisdiction: "Republic of Armenia",
    industry: "Hospitality",
    headcount: "8",
    phone: "+37410112233",
  });
  assert.match(employerMsg, /DE ORGANICA MANPOWER — B2B EMPLOYER INQUIRY/);
  assert.match(employerMsg, /Company Name:\* Yerevan Grand Hotel/);
  assert.match(employerMsg, /Industry Sector:\* Hospitality/);
  assert.match(employerMsg, /Personnel Required:\* 8/);

  const hyTravelMsg = buildTravelWhatsAppMessage({
    travelerType: "b2c",
    serviceOrTour: "Կլասիկ Հայաստան",
    dates: "2026-10-01",
    guests: "4",
    name: "Անի",
    phone: "+37455123456",
    locale: "hy",
  });
  assert.match(hyTravelMsg, /«ԴԵ ՕՐԳԱՆԻԿԱ» ՏՈՒՐԻԶՄ — ՀԱՐՑՈՒՄ ԵՐԵՎԱՆԻ ԴԵՍԿԻՆ/);
  assert.match(hyTravelMsg, /Անուն:\* Անի/);

  const hyCandidateMsg = buildCandidateWhatsAppMessage({
    role: "Խոհարար",
    name: "Արամ Սարգսյան",
    nationality: "Հայաստան",
    currentLocation: "Երևան",
    phone: "+37477112233",
    locale: "hy",
  });
  assert.match(hyCandidateMsg, /«ԴԵ ՕՐԳԱՆԻԿԱ» ԱՇԽԱՏԱՆՔ — ԹԵԿՆԱԾՈՒԻ ԴԻՄՈՒՄ/);

  const hyEmployerMsg = buildEmployerWhatsAppMessage({
    companyName: "Yerevan Grand Hotel",
    contactPerson: "Սոնա",
    jurisdiction: "Հայաստանի Հանրապետություն",
    industry: "Հյուրընկալություն",
    headcount: "8",
    phone: "+37410112233",
    locale: "hy",
  });
  assert.match(hyEmployerMsg, /«ԴԵ ՕՐԳԱՆԻԿԱ» ԿԱԴՐԵՐ — B2B ԳՈՐԾԱՏՈՒԻ ՀԱՅՏ/);
});

// ---------------------------------------------------------------------------
// 2. Middleware Redirect & Canonicalization Tests
// ---------------------------------------------------------------------------
test("Middleware enforces 308 canonical redirects for www, travel, manpower, and careers subdomains", () => {
  const { NextRequest } = require("next/server");
  const { middleware } = loadTsModule("src/middleware.ts");

  const wwwReq = new NextRequest("https://www.deorganica.am/travel?lang=en", {
    headers: { host: "www.deorganica.am" },
  });
  const wwwRes = middleware(wwwReq);
  assert.equal(wwwRes.status, 308);
  assert.equal(wwwRes.headers.get("location"), "https://deorganica.am/travel?lang=en");

  const travelReq = new NextRequest("https://travel.deorganica.am/", {
    headers: { host: "travel.deorganica.am" },
  });
  const travelRes = middleware(travelReq);
  assert.equal(travelRes.status, 308);
  assert.equal(travelRes.headers.get("location"), "https://deorganica.am/travel");

  const manpowerReq = new NextRequest("https://careers.deorganica.am/apply", {
    headers: { host: "careers.deorganica.am" },
  });
  const manpowerRes = middleware(manpowerReq);
  assert.equal(manpowerRes.status, 308);
  assert.equal(manpowerRes.headers.get("location"), "https://deorganica.am/manpower/apply");

  const apiReq = new NextRequest("https://travel.deorganica.am/api/inquiry", {
    headers: { host: "travel.deorganica.am" },
  });
  const apiRes = middleware(apiReq);
  assert.equal(apiRes.status, 200);

  const studioReq = new NextRequest("https://deorganica.am/studio", {
    headers: { host: "deorganica.am" },
  });
  const studioRes = middleware(studioReq);
  assert.equal(studioRes.status, 200);
});

// ---------------------------------------------------------------------------
// 3. Inquiry API Route Tests (Mocked Sanity + Safe Env)
// ---------------------------------------------------------------------------
test("Inquiry API validates inputs, checks CV magic bytes, guards missing prod key, and enforces rate limit", async () => {
  const { NextRequest } = require("next/server");

  const prevResendKey = process.env.RESEND_API_KEY;
  const prevNodeEnv = process.env.NODE_ENV;
  delete process.env.RESEND_API_KEY;
  process.env.NODE_ENV = "development";

  try {
    const { POST } = loadTsModule("src/app/api/inquiry/route.ts", {
      "@/sanity/lib/fetch": {
        getCompanyInfo: async () => ({
          name: "De Organica LLC",
          email: "info@deorganica.am",
        }),
      },
    });

    const postForm = async (fields, ip = "198.51.100.10") => {
      const fd = new FormData();
      for (const [k, v] of Object.entries(fields)) {
        fd.append(k, v);
      }
      const req = new NextRequest("https://deorganica.am/api/inquiry", {
        method: "POST",
        headers: { "x-nf-client-connection-ip": ip },
        body: fd,
      });
      return POST(req);
    };

    // A. Missing required fields -> 400
    const missingRes = await postForm(
      { inquiryType: "travel", fullName: "Ani", phone: "12" },
      "198.51.100.11"
    );
    assert.equal(missingRes.status, 400);

    // A2. Armenian locale returns localized 400 error message
    const missingHyRes = await postForm(
      { inquiryType: "travel", fullName: "Անի", phone: "12", locale: "hy" },
      "198.51.100.17"
    );
    assert.equal(missingHyRes.status, 400);
    const missingHyBody = await missingHyRes.json();
    assert.match(missingHyBody.error, /Անհրաժեշտ է/);

    // B. Invalid email format -> 400
    const badEmailRes = await postForm(
      {
        inquiryType: "general",
        fullName: "Narek",
        email: "not-an-email",
        phone: "+37455123456",
      },
      "198.51.100.12"
    );
    assert.equal(badEmailRes.status, 400);

    // C. Honeypot silently accepted -> 200
    const hpRes = await postForm(
      {
        inquiryType: "travel",
        companyWebsiteHp: "https://spam.invalid",
      },
      "198.51.100.13"
    );
    assert.equal(hpRes.status, 200);

    // D. Candidate CV with fake PDF bytes -> 400
    const fakePdf = new File([Buffer.from("<html>malicious</html>")], "resume.pdf", {
      type: "application/pdf",
    });
    const fakeCvRes = await postForm(
      {
        inquiryType: "candidate",
        fullName: "Tigran",
        phone: "+37477123456",
        targetRole: "Logistics Coordinator",
        cvFile: fakePdf,
      },
      "198.51.100.14"
    );
    assert.equal(fakeCvRes.status, 400);

    // E. Valid candidate inquiry with real %PDF- signature -> 200 (dev mode)
    const validPdf = new File([Buffer.from("%PDF-1.7\n1 0 obj\n<<>>\nendobj\n")], "cv.pdf", {
      type: "application/pdf",
    });
    const validRes = await postForm(
      {
        inquiryType: "candidate",
        fullName: "Tigran",
        phone: "+37477123456",
        targetRole: "Logistics Coordinator",
        cvFile: validPdf,
      },
      "198.51.100.15"
    );
    assert.equal(validRes.status, 200);
    const validBody = await validRes.json();
    assert.equal(validBody.success, true);

    // F. Production without RESEND_API_KEY -> 503 Service Unavailable
    process.env.NODE_ENV = "production";
    const prodNoKeyRes = await postForm(
      {
        inquiryType: "general",
        fullName: "Sona",
        phone: "+37455123456",
      },
      "198.51.100.16"
    );
    assert.equal(prodNoKeyRes.status, 503);
    process.env.NODE_ENV = "development";

    // G. Rate limiting after 10 requests from the same IP -> 429 with Retry-After
    const floodIp = "198.51.100.99";
    for (let i = 0; i < 10; i++) {
      const ok = await postForm(
        { inquiryType: "general", fullName: "Tester", phone: "+37455123456" },
        floodIp
      );
      assert.equal(ok.status, 200);
    }
    const throttled = await postForm(
      { inquiryType: "general", fullName: "Tester", phone: "+37455123456" },
      floodIp
    );
    assert.equal(throttled.status, 429);
    assert.ok(Number(throttled.headers.get("retry-after")) >= 1);
  } finally {
    if (prevResendKey !== undefined) {
      process.env.RESEND_API_KEY = prevResendKey;
    } else {
      delete process.env.RESEND_API_KEY;
    }
    if (prevNodeEnv !== undefined) {
      process.env.NODE_ENV = prevNodeEnv;
    } else {
      delete process.env.NODE_ENV;
    }
  }
});
