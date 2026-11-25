import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "De Organica LLC · Armenia Travel & International Manpower",
    short_name: "De Organica",
    description:
      "Yerevan-headquartered gateway for curated Armenian tours, B2B DMC ground handling, and ethical international recruitment.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBFBF9",
    theme_color: "#233D20",
    icons: [
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
