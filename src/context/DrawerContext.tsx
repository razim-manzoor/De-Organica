"use client";

import React, { createContext, useContext, useState } from "react";
import type { DrawerInitialState } from "@/types/content";

interface DrawerContextType {
  state: DrawerInitialState;
  openTravelDrawer: (serviceOrTour?: string) => void;
  openCandidateDrawer: (jobTitle?: string) => void;
  openEmployerDrawer: () => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<DrawerInitialState>({
    isOpen: false,
    mode: "travel",
  });

  const openTravelDrawer = (serviceOrTour?: string) => {
    setState({
      isOpen: true,
      mode: "travel",
      presetServiceOrTour: serviceOrTour,
    });
  };

  const openCandidateDrawer = (jobTitle?: string) => {
    setState({
      isOpen: true,
      mode: "candidate",
      presetJobTitle: jobTitle,
    });
  };

  const openEmployerDrawer = () => {
    setState({
      isOpen: true,
      mode: "employer",
    });
  };

  const closeDrawer = () => {
    setState((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <DrawerContext.Provider
      value={{
        state,
        openTravelDrawer,
        openCandidateDrawer,
        openEmployerDrawer,
        closeDrawer,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawer must be used within a DrawerProvider");
  }
  return context;
}
