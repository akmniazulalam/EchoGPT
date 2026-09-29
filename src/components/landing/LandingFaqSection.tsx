"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQS = [
  {
    q: "What is EchoGPT?",
    a: "EchoGPT is an all-in-one AI workspace designed to unite multiple frontier models (GPT-5, Claude, Gemini, Grok, DeepSeek), 4K image generation, AI video generation, structured tasks, and live MCP tools into a single, cohesive user experience.",
  },
  {
    q: "Which AI models can I use?",
    a: "EchoGPT provides access to 11+ frontier and open-architecture models including OpenAI GPT-5 & GPT-4o, Anthropic Claude 3.7 Sonnet, Google Gemini 2.5 Pro & Flash, xAI Grok 3, DeepSeek R1 & V3, Meta Llama 3.3, and GLM-5.3 Flash.",
  },
  {
    q: "Can I switch models during a conversation?",
    a: "Yes. In the chat composer or top workspace header, you can switch the active model at any point. EchoGPT maintains the conversation context and routes your next prompt to the newly selected model.",
  },
  {
    q: "What can I create with Image Studio?",
    a: "Image Studio supports text-to-image synthesis using FLUX Pro (4K photorealistic fidelity), DALL-E 3 (scene accuracy), Midjourney v6, and SDXL Turbo (sub-second prototyping). You can configure aspect ratios (1:1, 16:9, 9:16, 4:3) and custom aesthetic styles.",
  },
  {
    q: "What is Video Studio?",
    a: "Video Studio is an AI video generation workspace supporting Veo 3.1 Fast, Sora, Kling v1.5, and Runway Gen-3. It generates coherent motion clips (5s or 10s) with simulated physics and cinematic camera directions.",
  },
  {
    q: "What are AI Tasks?",
    a: "AI Tasks provide 24 structured productivity blueprints across Ideas, Work, Fun, and Online Content. Instead of starting with a blank prompt, you enter key parameters and let EchoGPT generate calibrated executive summaries, code audits, or content threads.",
  },
  {
    q: "What are MCP Connectors?",
    a: "Connectors use Anthropic's open Model Context Protocol (MCP) standard to connect external servers, repositories, and databases (e.g. GitHub, PostgreSQL, Slack) directly to EchoGPT chat so models can discover and invoke live tools.",
  },
  {
    q: "Is EchoGPT free to use?",
    a: "Yes. EchoGPT includes a permanent Free Tier featuring standard conversational models, Gemini Flash 2.0, DeepSeek-V3, SDXL Turbo image drafting, Veo 3.1 video, and 1 active MCP connector with no credit card required.",
  },
];

export function LandingFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 scroll-mt-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#713CF4] dark:text-[#a78bfa]">
            Frequently Asked Questions
          </p>
          <h2 className="text-2xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Clear answers about EchoGPT
          </h2>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-zinc-200/80 dark:border-white/8 bg-white dark:bg-[#12111A] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                >
                  <span className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-all duration-300 ease-in-out">
                    {faq.q}
                  </span>
                  <div
                    className={`size-7 rounded-lg flex items-center justify-center bg-zinc-100 dark:bg-white/4 text-zinc-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#713CF4]/10 text-[#713CF4]" : ""
                    }`}
                  >
                    <ChevronDown className="size-4" />
                  </div>
                </button>

                {/* CSS Grid-template transition for smooth expanding */}
                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  className="grid transition-all duration-200 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
