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
          width={78}
          height={40}
          priority={priority}
          className="h-10 w-auto object-contain transition-transform duration-300 hover:scale-105"
        />
      </div>
    );
  }

  const logoSrc = inverted
    ? "/images/de-organica-logo-white.png"
    : "/images/de-organica-logo.png";

  if (variant === "lockup" || variant === "official") {
    return (
      <div className={cn("inline-flex flex-col items-center select-none", className)}>
        <Image
          src={logoSrc}
          alt="De Organica LLC"
          width={220}
          height={120}
          priority={priority}
          className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 hover:scale-103"
        />
      </div>
    );
  }

  // Default: horizontal lockup
  return (
    <div className={cn("inline-flex items-center select-none", className)}>
      <Image
        src={logoSrc}
        alt="De Organica LLC · Travel & Manpower"
        width={180}
        height={90}
        priority={priority}
        className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 hover:scale-105"
      />
    </div>
  );
}
