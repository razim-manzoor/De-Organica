"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "horizontal" | "mark";
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

  // The Monogram Mark: Interlocking D and O with Botanical Olive Leaf
  const MonogramMark = (
    <svg
      width="44"
      height="44"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
      aria-label="De Organica Monogram"
    >
      {/* Outer subtle shield/ring boundary */}
      <circle
        cx="50"
        cy="50"
        r="47"
        stroke={olive}
        strokeWidth="1.5"
        strokeOpacity="0.35"
        strokeDasharray="2 2"
      />
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke={forest}
        strokeWidth="1.2"
        strokeOpacity="0.8"
      />

      {/* Classical Serif 'D' */}
      <path
        d="M 28 26 L 46 26 C 58 26 66 35 66 50 C 66 65 58 74 46 74 L 28 74 Z"
        stroke={forest}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* 'D' Stem serif flourishes */}
      <path
        d="M 24 26 L 34 26 M 24 74 L 34 74 M 30 26 L 30 74"
        stroke={forest}
        strokeWidth="3.2"
        strokeLinecap="round"
      />

      {/* Interlocking 'O' */}
      <ellipse
        cx="58"
        cy="50"
        rx="22"
        ry="24"
        stroke={forest}
        strokeWidth="3.2"
        fill="none"
      />

      {/* Botanical Olive Branch & Leaf inside 'O' */}
      <g transform="translate(58, 50) rotate(-18)">
        {/* Branch stem */}
        <path
          d="M -1 -12 Q 2 0 5 12"
          stroke={olive}
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
        {/* Top Olive Leaf */}
        <path
          d="M 0 -8 C 6 -13 11 -8 8 -2 C 5 2 1 -3 0 -8 Z"
          fill={olive}
        />
        {/* Middle Olive Leaf */}
        <path
          d="M 2 1 C 8 -3 13 3 9 8 C 6 12 1 6 2 1 Z"
          fill={olive}
        />
        {/* Small olive fruit bud */}
        <circle cx="-3" cy="-1" r="2.2" fill={forest} />
      </g>
    </svg>
  );

  if (variant === "mark") {
    return (
      <Link href="/" className={cn("inline-flex items-center group", className)}>
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
        <span
          className="font-serif text-[22px] tracking-[0.04em] font-semibold transition-colors"
          style={{ color: forest }}
        >
          DE ORGANICA
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="text-[9.5px] font-sans font-bold uppercase tracking-[0.24em]"
            style={{ color: olive }}
          >
            LLC
          </span>
          <span
            className="text-[9px] font-sans uppercase tracking-[0.16em] opacity-80"
            style={{ color: subtext }}
          >
            · Yerevan, Armenia
          </span>
        </div>
      </div>
    </Link>
  );
}
