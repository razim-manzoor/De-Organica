import {
  Building2,
  Bus,
  Car,
  Clock,
  Clock4,
  Compass,
  FileCheck,
  Globe,
  Globe2,
  Handshake,
  Landmark,
  Plane,
  ShieldCheck,
  Sparkles,
  Users2,
  Utensils,
  Wine,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export const CMS_ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  Bus,
  Car,
  Clock,
  Clock4,
  Compass,
  FileCheck,
  Globe,
  Globe2,
  Handshake,
  Landmark,
  Plane,
  ShieldCheck,
  Sparkles,
  Users2,
  Utensils,
  Wine,
  Workflow,
};

export function getCmsIcon(name?: string, fallback: LucideIcon = ShieldCheck): LucideIcon {
  if (!name) return fallback;
  return CMS_ICON_MAP[name] || fallback;
}
