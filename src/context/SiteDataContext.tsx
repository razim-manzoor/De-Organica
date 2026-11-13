"use client";

import React, { createContext, useContext } from "react";
import type { SiteSettings, TourPackage, TravelService } from "@/types/content";
import {
  defaultSiteSettings,
  defaultTours,
  defaultTravelServices,
} from "@/data/cms-fallbacks";

export interface SiteDataContextValue {
  siteSettings: SiteSettings;
  tours: TourPackage[];
  travelServices: TravelService[];
}

const defaultValue: SiteDataContextValue = {
  siteSettings: defaultSiteSettings,
  tours: defaultTours,
  travelServices: defaultTravelServices,
};

const SiteDataContext = createContext<SiteDataContextValue>(defaultValue);

export function SiteDataProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value?: Partial<SiteDataContextValue>;
}) {
  const merged: SiteDataContextValue = {
    siteSettings: value?.siteSettings ?? defaultSiteSettings,
    tours: value?.tours && value.tours.length > 0 ? value.tours : defaultTours,
    travelServices:
      value?.travelServices && value.travelServices.length > 0
        ? value.travelServices
        : defaultTravelServices,
  };

  return (
    <SiteDataContext.Provider value={merged}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData(): SiteDataContextValue {
  return useContext(SiteDataContext);
}
