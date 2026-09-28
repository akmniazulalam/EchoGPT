"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function LandingBackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal button after user scrolls past 400px
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const isReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    window.scrollTo({
      top: 0,
      behavior: isReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Scroll to top"
      className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 size-10 sm:size-11 rounded-full bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white shadow-lg shadow-[#713CF4]/25 hover:shadow-xl hover:shadow-[#713CF4]/40 flex items-center justify-center transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#090A0F] group cursor-pointer ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-90 translate-y-3 pointer-events-none"
      }`}
    >
      <ArrowUp className="size-4.5 sm:size-5 transition-transform duration-200 group-hover:-translate-y-0.5 motion-reduce:group-hover:translate-y-0 stroke-[2.25]" />
    </button>
  );
}
