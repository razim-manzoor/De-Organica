"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "horizontal" | "mark" | "official";
  inverted?: boolean;
}

export function Logo({
  className,
  variant = "full",
  inverted = false,
}: LogoProps) {
  const forest = inverted ? "#FFFFFF" : "#233D20";
  const olive = inverted ? "#A3C966" : "#668B2E";
  const subtext = inverted ? "#DCD9CE" : "#4A5448";

  // Official Monogram Vector Art: Classical Didone Serif 'D' interlocking with Botanical Olive 'O' and dual sprout
  const MonogramMark = (
    <svg
      width="46"
      height="46"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="De Organica Monogram"
    >
      {/* --- Letter 'D' in Heritage Forest Green --- */}
      {/* Top Left Bracketed Serif */}
      <path
        d="M 16 22 L 40 22 M 28 22 L 28 98 M 16 98 L 40 98"
        stroke={forest}
        strokeWidth="4.5"
        strokeLinecap="square"
      />
      {/* 'D' Thick Vertical Stem */}
      <rect x="25.5" y="22" width="6" height="76" fill={forest} />

      {/* 'D' Curved Outer Bowl */}
      <path
        d="M 31 24.5 H 52 C 72 24.5 82 38 82 58 C 82 76 70 95.5 48 95.5 H 31"
        stroke={forest}
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* 'D' Bottom Sweeping Ligature Under 'O' */}
      <path
        d="M 48 95.5 C 62 95.5 74 88 84 80"
        stroke={forest}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* --- Letter 'O' in Botanical Olive Green --- */}
      <ellipse
        cx="74"
        cy="58"
        rx="26"
        ry="28"
        stroke={olive}
        strokeWidth="4.8"
        fill="none"
      />

      {/* Botanical Olive Sprout inside 'O' */}
      <g id="botanical-leaves">
        {/* Main curved leaf stem */}
        <path
          d="M 64 85 C 67 78 72 70 76 60"
          stroke={olive}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        {/* Primary Upright Pointed Leaf */}
        <path
          d="M 72 72 C 73 60 84 50 86 46 C 85 55 80 67 74 74 Z"
          fill={olive}
        />
        {/* Secondary Left Branching Leaf */}
        <path
          d="M 69 76 C 63 71 58 72 56 74 C 61 78 66 80 70 78 Z"
          fill={olive}
        />
      </g>
    </svg>
  );

  if (variant === "mark") {
    return (
      <Link
        href="/"
        className={cn(
          "inline-flex items-center group select-none transition-opacity hover:opacity-95",
          className
        )}
      >
        {MonogramMark}
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-3.5 group select-none transition-opacity hover:opacity-95",
        className
      )}
    >
      {MonogramMark}

      <div className="flex flex-col justify-center leading-none">
        {/* Wordmark: De Organica */}
        <div className="flex items-baseline gap-1.5 font-serif text-[22px] tracking-[0.03em] font-semibold">
          <span style={{ color: forest }}>De</span>
          <span style={{ color: olive }}>Organica</span>
        </div>

        {/* Sub-mark: — LLC — */}
        <div className="flex items-center gap-2 mt-1.5">
          <span
            className="h-px w-4 transition-colors"
            style={{ backgroundColor: olive, opacity: 0.6 }}
          />
          <span
            className="text-[9.5px] font-sans font-bold uppercase tracking-[0.28em]"
            style={{ color: subtext }}
          >
            LLC
          </span>
          <span
            className="h-px w-4 transition-colors"
            style={{ backgroundColor: olive, opacity: 0.6 }}
          />
        </div>
      </div>
    </Link>
  );
}
