import React from "react";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "mark" | "wordmark" | "lockup" | "horizontal";
  inverted?: boolean;
  className?: string;
}

function CrestSvg({
  inverted = false,
  className,
}: {
  inverted?: boolean;
  className?: string;
}) {
  const strokePrimary = inverted ? "#FBFBF9" : "#233D20";
  const accentOlive = inverted ? "#C5E096" : "#668B2E";

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      <circle
        cx="60"
        cy="60"
        r="54"
        stroke={strokePrimary}
        strokeWidth="2.5"
        strokeOpacity="0.24"
      />
      <path
        d="M35 34H50C62.1503 34 72 43.8497 72 56V64C72 76.1503 62.1503 86 50 86H35V34Z"
        stroke={strokePrimary}
        strokeWidth="6"
        strokeLinejoin="round"
      />
      <circle
        cx="72"
        cy="60"
        r="24"
        stroke={strokePrimary}
        strokeWidth="5.5"
      />
      <path
        d="M72 36C72 26 81 18 90 18C90 27 81 36 72 36Z"
        fill={accentOlive}
      />
      <path
        d="M72 36C66 28 60 24 54 25C56 32 64 36 72 36Z"
        fill={strokePrimary}
        fillOpacity="0.8"
      />
    </svg>
  );
}

export function Logo({
  variant = "horizontal",
  inverted = false,
  className,
}: LogoProps) {
  if (variant === "mark") {
    return (
      <div className={cn("inline-flex items-center select-none", className)}>
        <CrestSvg inverted={inverted} className="h-9 w-9 sm:h-10 sm:w-10" />
      </div>
    );
  }

  if (variant === "wordmark") {
    return (
      <div className={cn("inline-flex flex-col leading-none select-none", className)}>
        <span
          className={cn(
            "font-serif text-lg sm:text-xl font-bold tracking-tight",
            inverted ? "text-brand-stone-50" : "text-brand-forest"
          )}
        >
          De Organica
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.2em] mt-1",
            inverted ? "text-brand-olive-onDark" : "text-brand-olive-text"
          )}
        >
          Yerevan · Armenia
        </span>
      </div>
    );
  }

  if (variant === "lockup") {
    return (
      <div className={cn("inline-flex flex-col items-center gap-2 select-none", className)}>
        <CrestSvg inverted={inverted} className="h-12 w-12 sm:h-14 sm:w-14" />
        <div className="text-center leading-none">
          <span
            className={cn(
              "font-serif text-xl sm:text-2xl font-bold tracking-tight block",
              inverted ? "text-brand-stone-50" : "text-brand-forest"
            )}
          >
            De Organica
          </span>
          <span
            className={cn(
              "text-[10px] font-semibold uppercase tracking-[0.22em] block mt-1",
              inverted ? "text-brand-olive-onDark" : "text-brand-olive-text"
            )}
          >
            Travel &amp; Manpower · LLC
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("inline-flex items-center gap-2.5 sm:gap-3 select-none", className)}>
      <CrestSvg inverted={inverted} className="h-9 w-9 sm:h-10 sm:w-10" />
      <div className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-base sm:text-lg font-bold tracking-tight whitespace-nowrap",
            inverted ? "text-brand-stone-50" : "text-brand-forest"
          )}
        >
          De Organica
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.18em] mt-0.5 whitespace-nowrap",
            inverted ? "text-brand-olive-onDark" : "text-brand-olive-text"
          )}
        >
          Travel · Manpower
        </span>
      </div>
    </div>
  );
}
