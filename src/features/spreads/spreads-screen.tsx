"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SpreadExperienceHost } from "./components/spread-experience-host";
import { SpreadsDashboard } from "./components/spreads-dashboard";
import type {
  SpreadOption,
  SpreadOptionId,
} from "./components/spreads-dashboard.types";

type ViewMode = "dashboard" | "experience";

export function SpreadsScreen() {
  const searchParams = useSearchParams();
  const [isDesktop, setIsDesktop] = useState<boolean | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [selectedSpread, setSelectedSpread] = useState<SpreadOptionId | null>(
    null,
  );
  const [inquiry, setInquiry] = useState("");

  useEffect(() => {
    const desktopMedia = window.matchMedia("(min-width: 768px)");
    const syncViewport = () => setIsDesktop(desktopMedia.matches);
    syncViewport();

    desktopMedia.addEventListener("change", syncViewport);
    return () => desktopMedia.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    const incomingInquiry = searchParams.get("inquiry");
    if (!incomingInquiry) return;
    setInquiry(incomingInquiry);
  }, [searchParams]);

  function handleSpreadSelect(option: SpreadOption) {
    setSelectedSpread(option.id);
    setViewMode("experience");
  }

  function handleBackToDashboard() {
    setViewMode("dashboard");
  }

  if (isDesktop === null) {
    return <div className="min-h-screen" aria-hidden />;
  }

  if (viewMode === "experience" && selectedSpread) {
    return (
      <SpreadExperienceHost
        isDesktop={isDesktop}
        selectedSpread={selectedSpread}
        inquiry={inquiry}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <SpreadsDashboard
      inquiry={inquiry}
      onInquiryChange={setInquiry}
      onSelectSpread={handleSpreadSelect}
    />
  );
}
