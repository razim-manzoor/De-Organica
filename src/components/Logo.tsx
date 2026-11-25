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

  // Default: true horizontal lockup (DO crest + De Organica LLC wordmark)
  const horizontalSrc = inverted
    ? "/images/de-organica-horizontal-white.png"
    : "/images/de-organica-horizontal.png";
  return (
    <div className={cn("inline-flex items-center select-none", className)}>
      <Image
        src={horizontalSrc}
        alt={isHy ? "«Դե Օրգանիկա» ՍՊԸ · Տուրիզմ և Աշխատուժ" : "De Organica LLC · Travel & Manpower"}
        width={604}
        height={128}
        unoptimized
        priority={priority}
        className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-103 motion-reduce:transform-none"
      />
    </div>
  );
}
