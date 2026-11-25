"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface LogoProps {
  variant?: "mark" | "wordmark" | "lockup" | "horizontal" | "official";
  inverted?: boolean;
  className?: string;
  priority?: boolean;
}

export function Logo({
  variant = "horizontal",
  inverted = false,
  className,
  priority = false,
}: LogoProps) {
  const { locale } = useLanguage();
  const isHy = locale === "hy";

  if (variant === "mark") {
    return (
      <div className={cn("inline-flex items-center select-none", className)}>
        <Image
          src="/images/de-organica-mark.png"
          alt={isHy ? "«Դե Օրգանիկա» ՍՊԸ խորհրդանիշ" : "De Organica LLC Crest"}
          width={385}
          height={300}
          unoptimized
          priority={priority}
          className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105 motion-reduce:transform-none"
        />
      </div>
    );
  }

  if (variant === "lockup" || variant === "official") {
    const stackedSrc = inverted
      ? "/images/de-organica-logo-white.png"
      : "/images/de-organica-logo.png";
    return (
      <div className={cn("inline-flex flex-col items-center select-none", className)}>
        <Image
          src={stackedSrc}
          alt={isHy ? "«Դե Օրգանիկա» ՍՊԸ" : "De Organica LLC"}
          width={588}
          height={462}
          unoptimized
          priority={priority}
          className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 hover:scale-103 motion-reduce:transform-none"
        />
      </div>
    );
  }

  // Default: true website horizontal lockup (purified DO crest + vector-sharp HTML wordmark)
  const markSrc = inverted
    ? "/images/de-organica-mark-white.png"
    : "/images/de-organica-mark.png";

  return (
    <div className={cn("inline-flex items-center gap-2.5 select-none", className)}>
      <span
        className={cn(
          "inline-flex items-center justify-center shrink-0 rounded-lg transition-transform duration-300 group-hover:scale-103 motion-reduce:transform-none",
          inverted ? "" : "bg-[#FBFBF9] p-1 forced-colors:border forced-colors:border-[CanvasText]"
        )}
      >
        <Image
          src={markSrc}
          alt={isHy ? "«Դե Օրգանիկա» ՍՊԸ խորհրդանիշ" : "De Organica LLC emblem"}
          width={385}
          height={300}
          unoptimized
          priority={priority}
          className="h-7 sm:h-8 w-auto object-contain"
        />
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif text-[16px] sm:text-[18px] font-bold tracking-tight whitespace-nowrap",
            inverted ? "text-white" : "text-brand-forest"
          )}
        >
          <span>De </span>
          <span className={inverted ? "text-brand-olive-onDark" : "text-brand-olive-text"}>
            Organica
          </span>
        </span>
        <span
          className={cn(
            "font-sans text-[9px] font-semibold tracking-[0.24em] uppercase mt-1 whitespace-nowrap",
            inverted ? "text-brand-stone-200" : "text-brand-ink-muted"
          )}
        >
          LLC · Armenia
        </span>
      </span>
    </div>
  );
}
