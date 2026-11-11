"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "horizontal" | "full" | "mark" | "official";
  inverted?: boolean;
  priority?: boolean;
}

export function Logo({
  className,
  variant = "horizontal",
  inverted = false,
  priority = true,
}: LogoProps) {
  // Variant selection:
  // - "mark": just the interlocking D-O emblem with botanical leaves
  // - "official": full vertical stacked logo (monogram top, text bottom)
  // - "horizontal" | "full": horizontal lockup (emblem left, "De Organica LLC" right)

  if (variant === "mark") {
    return (
      <Link
        href="/"
        className={cn(
          "inline-flex items-center group select-none transition-transform duration-200 active:scale-95",
          className
        )}
        aria-label="De Organica LLC Home"
      >
        <Image
          src="/images/de-organica-mark.png"
          alt="De Organica LLC Crest"
          width={78}
          height={40}
          priority={priority}
          className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </Link>
    );
  }

  if (variant === "official") {
    return (
      <Link
        href="/"
        className={cn(
          "inline-flex flex-col items-center group select-none transition-transform duration-200 active:scale-95",
          className
        )}
        aria-label="De Organica LLC Home"
      >
        <Image
          src={
            inverted
              ? "/images/de-organica-logo-white.png"
              : "/images/de-organica-logo.png"
          }
          alt="De Organica LLC Official Brand Logo"
          width={180}
          height={128}
          priority={priority}
          className="h-28 w-auto object-contain transition-transform duration-300 group-hover:scale-103"
        />
      </Link>
    );
  }

  // Default: Authentic Brand Logo Lockup
  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center group select-none transition-transform duration-200 active:scale-95 py-1",
        className
      )}
      aria-label="De Organica LLC Home"
    >
      <Image
        src={
          inverted
            ? "/images/de-organica-logo-white.png"
            : "/images/de-organica-logo.png"
        }
        alt="De Organica LLC"
        width={140}
        height={99}
        priority={priority}
        className="h-16 sm:h-18 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
    </Link>
  );
}
