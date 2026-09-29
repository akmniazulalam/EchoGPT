"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, ListTodo } from "lucide-react";

export function LandingCtaSection() {
  return (
    <section className="py-20 sm:py-28">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-[#713CF4] px-7 py-14 sm:px-14 sm:py-18 text-center space-y-6 shadow-2xl shadow-[#713CF4]/25">
          {/* Subtle ambient blur */}
          <div className="absolute inset-0 -z-0 pointer-events-none overflow-hidden">
            <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-black/20 blur-3xl" />
          </div>

          <div className="relative z-10 space-y-5">
            <div className="inline-flex items-center justify-center size-12 rounded-2xl bg-white/15 border border-white/20 mx-auto shadow-sm">
              <Sparkles className="size-6 text-white" />
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Your AI workspace is ready
            </h2>

            <p className="text-sm sm:text-base text-violet-100 max-w-lg mx-auto font-normal leading-relaxed">
              Chat, create, compare, and build workflows in one place.
              Free to start — no credit card or complex setup required.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/chat"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-[#713CF4] font-bold text-sm hover:bg-violet-50 transition-colors shadow-lg shadow-black/10"
              >
                <Sparkles className="size-4" />
                <span>Start Using EchoGPT</span>
                <ArrowRight className="size-4 ml-0.5" />
              </Link>

              <Link
                href="/tasks"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-white/30 text-white font-semibold text-sm hover:bg-white/10 transition-colors"
              >
                <ListTodo className="size-4" />
                <span>Explore AI Tasks</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
