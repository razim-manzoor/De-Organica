"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { RotateCcw, ArrowLeft } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[De Organica Error Boundary]", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-brand-canvas flex flex-col">
      <header className="border-b border-brand-stone-200 bg-white/95 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-xl font-bold text-brand-forest tracking-tight"
          >
            DE ORGANICA LLC
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-brand-olive-text hover:text-brand-forest underline underline-offset-4"
          >
            Yerevan Desk
          </Link>
        </div>
      </header>

      <main
        id="main-content"
        className="flex-grow flex items-center justify-center px-6 py-24"
      >
        <div className="max-w-xl w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-brand-stone-200 shadow-sm">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brand-olive-text font-semibold">
            Temporary Service Interruption
          </p>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-brand-forest leading-tight">
            We encountered an unexpected issue loading this view
          </h1>

          <p className="text-sm sm:text-base text-brand-ink-muted leading-relaxed">
            Our Yerevan portal hit a temporary error while rendering this section. You can retry loading the page or return to the main portal.
          </p>

          {error.digest && (
            <p className="font-mono text-xs text-brand-ink-subtle">
              Reference ID: {error.digest}
            </p>
          )}

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-forest text-white text-sm font-semibold hover:bg-brand-forest-deep transition-colors cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Try Again</span>
            </button>

            <Link
              href="/"
              className="min-h-[44px] inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-brand-stone-300 bg-brand-stone-50 text-brand-forest text-sm font-semibold hover:bg-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Return Home</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
