import type { Metadata } from "next";
import Link from "next/link";
import { isSanityConfigured } from "@/sanity/env";
import StudioView from "./StudioView";

export const metadata: Metadata = {
  title: "De Organica Content Desk | Sanity Studio",
  robots: {
    index: false,
    follow: false,
  },
};

export const dynamic = "force-dynamic";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="min-h-screen bg-[#FBFBF9] text-[#1A2219] flex items-center justify-center px-6 py-20">
        <div className="max-w-xl w-full bg-white border border-stone-200 rounded-2xl p-8 md:p-10 shadow-sm space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F4F3EE] text-[#233D20] text-xs font-semibold uppercase tracking-wider">
            Sanity Studio Setup Required
          </div>
          <h1 className="font-serif text-3xl text-[#233D20] font-semibold leading-tight">
            Connect Your Sanity Project ID
          </h1>
          <p className="text-sm text-[#1A2219]/80 leading-relaxed">
            De Organica LLC&apos;s website is currently running in zero-dependency local fallback mode.
            To launch the embedded Sanity Studio at <code className="px-1.5 py-0.5 bg-[#F4F3EE] rounded text-xs">/studio</code>, configure your project environment variables in <code className="px-1.5 py-0.5 bg-[#F4F3EE] rounded text-xs">.env.local</code>:
          </p>
          <pre className="bg-[#1A2219] text-[#FBFBF9] p-4 rounded-xl text-xs overflow-x-auto leading-relaxed">
{`NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
SANITY_REVALIDATE_SECRET=your_webhook_secret
SANITY_API_WRITE_TOKEN=your_write_token`}
          </pre>
          <p className="text-xs text-[#1A2219]/70 leading-relaxed">
            Once connected, run <code className="px-1.5 py-0.5 bg-[#F4F3EE] rounded">npm run sanity:seed</code> to populate all English &amp; Armenian pages, tours, services, vacancies, FAQs, and images into your dataset.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[#233D20] text-[#FBFBF9] text-sm font-medium hover:bg-[#1A2E18] transition-colors"
            >
              Return to Public Site
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return <StudioView />;
}
