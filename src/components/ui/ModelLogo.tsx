"use client";

import React from "react";
import Image from "next/image";

export interface ModelLogoProps {
  modelId?: string;
  provider?: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const SIZE_MAP = {
  xs: "size-4 text-[9px] rounded-md",
  sm: "size-5 text-[10px] rounded-lg",
  md: "size-7 text-xs rounded-xl",
  lg: "size-10 text-sm rounded-xl",
  xl: "size-14 text-xl rounded-2xl",
};

const ICON_SIZE_PX = {
  xs: 12,
  sm: 14,
  md: 18,
  lg: 24,
  xl: 36,
};

export function ModelLogo({
  modelId = "",
  provider = "",
  name = "",
  size = "md",
  className = "",
}: ModelLogoProps) {
  const mid = modelId.toLowerCase();
  const prov = provider.toLowerCase();
  const mname = name.toLowerCase();
  const sizeClass = SIZE_MAP[size] || SIZE_MAP.md;
  const iconPx = ICON_SIZE_PX[size] || ICON_SIZE_PX.md;

  // 1. EchoGPT / Native
  if (mid.includes("echogpt") || prov.includes("echogpt")) {
    return (
      <div
        className={`flex items-center justify-center bg-white dark:bg-[#161720] border border-zinc-200/80 dark:border-zinc-800 shadow-2xs overflow-hidden shrink-0 ${sizeClass} ${className}`}
      >
        <Image
          src="/favicon.svg"
          alt="EchoGPT"
          width={iconPx + 4}
          height={iconPx + 4}
          className="object-contain"
        />
      </div>
    );
  }

  // 2. GLM / Zhipu AI (Iconic black square with white 'Z' from original screenshot)
  if (
    mid.includes("glm") ||
    prov.includes("glm") ||
    prov.includes("zhipu") ||
    mname.includes("glm")
  ) {
    return (
      <div
        className={`flex items-center justify-center bg-black text-white font-extrabold shadow-2xs shrink-0 select-none ${sizeClass} ${className}`}
        style={{ letterSpacing: "-0.05em" }}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: `${iconPx * 0.9}px`,
            lineHeight: 1,
            fontWeight: 900,
          }}
        >
          Z
        </span>
      </div>
    );
  }

  // 3. OpenAI (GPT-4o, GPT-5, GPT-4o mini, DALL-E, Sora)
  if (
    mid.includes("gpt") ||
    mid.includes("openai") ||
    mid.includes("dall") ||
    mid.includes("sora") ||
    prov.includes("openai")
  ) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-2xs shrink-0 ${sizeClass} ${className}`}
      >
        <svg
          width={iconPx}
          height={iconPx}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
          <path d="M12 6a6 6 0 0 1 6 6 6 6 0 0 1-6 6" />
          <path d="M12 10a2 2 0 0 1 2 2 2 2 0 0 1-2 2" />
        </svg>
      </div>
    );
  }

  // 4. Anthropic / Claude
  if (mid.includes("claude") || prov.includes("anthropic")) {
    return (
      <div
        className={`flex items-center justify-center bg-[#D97706]/15 dark:bg-[#D97706]/25 border border-[#D97706]/30 text-[#D97706] dark:text-amber-400 shadow-2xs shrink-0 font-bold ${sizeClass} ${className}`}
      >
        <svg
          width={iconPx}
          height={iconPx}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
        </svg>
      </div>
    );
  }

  // 5. Google / Gemini
  if (mid.includes("gemini") || prov.includes("google")) {
    return (
      <div
        className={`flex items-center justify-center bg-linear-to-tr from-blue-600 via-indigo-500 to-sky-400 text-white shadow-2xs shrink-0 ${sizeClass} ${className}`}
      >
        <svg
          width={iconPx}
          height={iconPx}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 0C12 6.627 6.627 12 0 12C6.627 12 12 17.373 12 24C12 17.373 17.373 12 24 12C17.373 12 12 6.627 12 0Z" />
        </svg>
      </div>
    );
  }

  // 6. DeepSeek
  if (mid.includes("deepseek") || prov.includes("deepseek")) {
    return (
      <div
        className={`flex items-center justify-center bg-[#1D4ED8]/15 dark:bg-[#1D4ED8]/25 border border-[#1D4ED8]/30 text-[#2563EB] dark:text-blue-400 shadow-2xs shrink-0 ${sizeClass} ${className}`}
      >
        <svg
          width={iconPx}
          height={iconPx}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M2 12c2.5-3 5-3 7.5 0s5 3 7.5 0 4.5-3 5-2" />
          <path d="M2 16c2.5-3 5-3 7.5 0s5 3 7.5 0 4.5-3 5-2" />
          <path d="M12 3v5" />
        </svg>
      </div>
    );
  }

  // 7. xAI / Grok
  if (mid.includes("grok") || prov.includes("xai")) {
    return (
      <div
        className={`flex items-center justify-center bg-black border border-zinc-800 text-white font-black shadow-2xs shrink-0 select-none ${sizeClass} ${className}`}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: `${iconPx * 0.9}px`,
            lineHeight: 1,
            fontWeight: 900,
          }}
        >
          𝕏
        </span>
      </div>
    );
  }

  // 8. Mistral
  if (mid.includes("mistral") || prov.includes("mistral")) {
    return (
      <div
        className={`flex items-center justify-center bg-orange-500/15 border border-orange-500/30 text-orange-500 shadow-2xs shrink-0 font-bold ${sizeClass} ${className}`}
      >
        <svg
          width={iconPx}
          height={iconPx}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <rect x="3" y="4" width="4" height="4" />
          <rect x="17" y="4" width="4" height="4" />
          <rect x="3" y="10" width="18" height="4" />
          <rect x="3" y="16" width="6" height="4" />
          <rect x="15" y="16" width="6" height="4" />
        </svg>
      </div>
    );
  }

  // 9. Qwen / Alibaba (also QwQ)
  if (
    mid.includes("qwen") ||
    mid.includes("qwq") ||
    prov.includes("alibaba") ||
    prov.includes("qwen")
  ) {
    return (
      <div
        className={`flex items-center justify-center bg-purple-600/15 border border-purple-600/30 text-purple-600 dark:text-purple-400 shadow-2xs shrink-0 font-bold ${sizeClass} ${className}`}
      >
        <svg
          width={iconPx}
          height={iconPx}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
        >
          <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
          <line x1="12" y1="22" x2="12" y2="12" />
          <line x1="2" y1="8.5" x2="12" y2="12" />
          <line x1="22" y1="8.5" x2="12" y2="12" />
        </svg>
      </div>
    );
  }

  // 10. Kimi (Moonshot)
  if (mid.includes("kimi") || prov.includes("moonshot") || prov.includes("kimi")) {
    return (
      <div
        className={`flex items-center justify-center bg-zinc-800 text-teal-400 font-extrabold shadow-2xs shrink-0 select-none ${sizeClass} ${className}`}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: `${iconPx * 0.85}px`,
            lineHeight: 1,
            fontWeight: 800,
          }}
        >
          K
        </span>
      </div>
    );
  }

  // 11. Meta / Llama
  if (
    mid.includes("llama") ||
    mid.includes("meta") ||
    prov.includes("meta")
  ) {
    return (
      <div
        className={`flex items-center justify-center bg-sky-600/15 border border-sky-600/30 text-sky-600 dark:text-sky-400 shadow-2xs shrink-0 ${sizeClass} ${className}`}
      >
        <svg
          width={iconPx}
          height={iconPx}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          {/* Simplified llama head silhouette */}
          <path d="M9 3C7 3 5 4.5 5 7c0 1.5.5 2.5 1.5 3.5C5 11 4 12.5 4 14.5 4 17 5.5 19 8 20h8c2.5-1 4-3 4-5.5 0-2-.8-3.5-2-4.5 1-.8 1.5-1.8 1.5-3 0-2.5-2-4.5-4-4C14 3 12 4 11.5 6A3 3 0 0 0 9 3z" />
        </svg>
      </div>
    );
  }

  // 12. Cohere
  if (mid.includes("command") || mid.includes("cohere") || prov.includes("cohere")) {
    return (
      <div
        className={`flex items-center justify-center bg-rose-600/15 border border-rose-600/30 text-rose-600 dark:text-rose-400 shadow-2xs shrink-0 font-bold select-none ${sizeClass} ${className}`}
      >
        <span
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: `${iconPx * 0.8}px`,
            lineHeight: 1,
            fontWeight: 900,
          }}
        >
          C
        </span>
      </div>
    );
  }

  // 13. NovaSky / Sky
  if (
    mid.includes("sky") ||
    mid.includes("nova") ||
    prov.includes("novasky") ||
    prov.includes("nova sky")
  ) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-indigo-600 to-sky-500 text-white shadow-2xs shrink-0 ${sizeClass} ${className}`}
      >
        <svg
          width={iconPx}
          height={iconPx}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
        >
          <polygon points="12 2 15 9 22 9 16.5 13.5 18.5 21 12 16.5 5.5 21 7.5 13.5 2 9 9 9 12 2" />
        </svg>
      </div>
    );
  }

  // Fallback: Tasteful rounded badge with first letter or initials
  const initials = (name || modelId || provider)
    .replace(/[^a-zA-Z0-9]/g, "")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`flex items-center justify-center bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 font-bold uppercase shadow-2xs shrink-0 select-none ${sizeClass} ${className}`}
    >
      <span style={{ fontSize: `${iconPx * 0.65}px` }}>{initials || "AI"}</span>
    </div>
  );
}
