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

export function LandingPage() {
  return (
    <UpgradeModalProvider>
      <div className="min-h-screen bg-white dark:bg-[#090A0F] text-zinc-900 dark:text-zinc-100 font-lexend selection:bg-[#713CF4]/20 selection:text-[#713CF4] custom-scrollbar">
        {/* 1. Premium SaaS Navbar with Theme Toggle */}
        <LandingNavbar />

        <main>
          {/* 2. Hero Section with Authentic EchoGPT UI Preview */}
          <LandingHero />

          {/* 3. Product Capability Strip (Real Features, No Fake Stats) */}
          <LandingCapabilityStrip />

          {/* 4. Interactive Workspace Preview (Chat, Image, Video, Tasks, Compare) */}
          <LandingProductPreview />

          {/* 5. Core Value Propositions & Features */}
          <LandingCoreFeatures />

          {/* 6. Multi-Model Showcase (Live AI_MODELS with ModelLogo & Specs) */}
          <LandingModelsSection />

          {/* 7. Creative Studios: Image Synthesis & AI Video Pipelines */}
          <LandingCreativeStudio />

          {/* 8. AI Tasks & Productivity Blueprints (24 Curated Workflows) */}
          <LandingTasksSection />

          {/* 9. Live MCP Connectors & Extensible Tools Ecosystem */}
          <LandingConnectorsSection />

          {/* 10. Why EchoGPT: Architectural & Productivity Pillars */}
          <LandingWhySection />

          {/* 11. Transparent Pricing & Pro Demo Simulator */}
          <LandingPricingSection />

          {/* 12. Frequently Asked Questions (Accessible Accordion) */}
          <LandingFaqSection />

          {/* 13. Final Action Call to Action */}
          <LandingCtaSection />
        </main>

        {/* 14. Professional SaaS Footer */}
        <LandingFooter />

        {/* 15. Polished Floating Back to Top Button */}
        <LandingBackToTop />

        {/* Global Demo Pro Upgrade Modal */}
        <UpgradeProModal />
      </div>
    </UpgradeModalProvider>
  );
}
