import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
  priority = true,
}: LogoProps) {
  if (variant === "mark") {
    return (
      <div className={cn("inline-flex items-center select-none", className)}>
        <Image
          src="/images/de-organica-mark.png"
          alt="De Organica LLC Crest"
          width={385}
          height={300}
          priority={priority}
          className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
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
          alt="De Organica LLC"
          width={588}
          height={462}
          priority={priority}
          className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 hover:scale-103"
        />
      </div>
    );
  }

  // Default: true horizontal lockup for header & footer legibility
  const horizontalSrc = inverted
    ? "/images/de-organica-horizontal-white.png"
    : "/images/de-organica-horizontal.png";
  return (
    <div className={cn("inline-flex items-center select-none", className)}>
      <Image
        src={horizontalSrc}
        alt="De Organica LLC · Travel & Manpower"
        width={574}
        height={128}
        priority={priority}
        className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 hover:scale-103"
      />
    </div>
  );
}
