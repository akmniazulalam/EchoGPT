"use client";

import React from "react";
import { UpgradeModalProvider } from "@/context/UpgradeModalContext";
import { UpgradeProModal } from "@/components/billing/UpgradeProModal";
import { LandingNavbar } from "./LandingNavbar";
import { LandingHero } from "./LandingHero";
import { LandingCapabilityStrip } from "./LandingCapabilityStrip";
import { LandingProductPreview } from "./LandingProductPreview";
import { LandingCoreFeatures } from "./LandingCoreFeatures";
import { LandingModelsSection } from "./LandingModelsSection";
import { LandingCreativeStudio } from "./LandingCreativeStudio";
import { LandingTasksSection } from "./LandingTasksSection";
import { LandingConnectorsSection } from "./LandingConnectorsSection";
import { LandingWhySection } from "./LandingWhySection";
import { LandingPricingSection } from "./LandingPricingSection";
import { LandingFaqSection } from "./LandingFaqSection";
import { LandingCtaSection } from "./LandingCtaSection";
import { LandingFooter } from "./LandingFooter";
import { LandingBackToTop } from "./LandingBackToTop";
import MobileScrollbar from "../ui/MobileScrollbar";

export function LandingPage() {
  return (
    <UpgradeModalProvider>
      <div
        id="landing-scroll-container"
        className="h-screen overflow-y-auto custom-scrollbar bg-white dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 font-lexend selection:bg-[#713CF4]/20 selection:text-[#713CF4]"
      >
        {/* 1. Premium SaaS Navbar with Theme Toggle */}
        <LandingNavbar />

        <main>
          {/* 2. Hero Section with Authentic EchoGPT UI Preview */}
          <LandingHero />

          {/* 3. Product Capability Strip */}
          <LandingCapabilityStrip />

          {/* 4. Interactive Workspace Preview */}
          <LandingProductPreview />

          {/* 5. Core Value Propositions & Features */}
          <LandingCoreFeatures />

          {/* 6. Multi-Model Showcase */}
          <LandingModelsSection />

          {/* 7. Creative Studios */}
          <LandingCreativeStudio />

          {/* 8. AI Tasks & Productivity Blueprints */}
          <LandingTasksSection />

          {/* 9. Live MCP Connectors */}
          <LandingConnectorsSection />

          {/* 10. Why EchoGPT */}
          <LandingWhySection />

          {/* 11. Pricing */}
          <LandingPricingSection />

          {/* 12. FAQ */}
          <LandingFaqSection />

          {/* 13. Final CTA */}
          <LandingCtaSection />
        </main>

        {/* 14. Footer */}
        <LandingFooter />

        {/* 15. Back To Top */}
        <LandingBackToTop />

        {/* Global Demo Pro Upgrade Modal */}
        <UpgradeProModal />

        {/* Mobile Custom Scrollbar */}
        <MobileScrollbar />
      </div>
    </UpgradeModalProvider>
  );
}