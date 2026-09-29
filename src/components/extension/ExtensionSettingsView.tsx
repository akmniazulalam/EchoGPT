"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sun,
  Moon,
  Trash2,
  LogOut,
} from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { loadDemoUser, clearDemoUser } from "@/lib/authStorage";
import { AI_MODELS } from "@/config/models";
import { loadStoredSettings, saveStoredSettings, DEFAULT_SETTINGS } from "./storage";
import { ExtensionSettings } from "./types";

interface ExtensionSettingsViewProps {
  onClearHistory?: () => void;
}

export function ExtensionSettingsView({ onClearHistory }: ExtensionSettingsViewProps) {
  const { theme, toggleTheme } = useTheme();
  const demoUser = loadDemoUser();

  const [settings, setSettingsState] = useState<ExtensionSettings>(() => {
    if (typeof window === "undefined") return DEFAULT_SETTINGS;
    return loadStoredSettings();
  });

  const updateSetting = <K extends keyof ExtensionSettings>(
    key: K,
    value: ExtensionSettings[K]
  ) => {
    setSettingsState((prev) => {
      const next = { ...prev, [key]: value };
      saveStoredSettings(next);
      return next;
    });
  };

  // Destructure for use in JSX
  const { defaultModel, temperature, streamResponses, autoPageContext, keyboardShortcuts } =
    settings;

  const [isSignOutSuccess, setIsSignOutSuccess] = useState(false);
  const [historyCleared, setHistoryCleared] = useState(false);

  const handleSignOut = () => {
    clearDemoUser();
    setIsSignOutSuccess(true);
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleClearHistory = () => {
    onClearHistory?.();
    setHistoryCleared(true);
    setTimeout(() => setHistoryCleared(false), 2000);
  };

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden bg-white dark:bg-[#0B0912]">
      {/* ── Scrollable Body Area ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-3 sm:p-4 space-y-5 max-w-2xl w-full mx-auto">
        {/* ── 1. PROFILE SECTION ── */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-white/[0.03] border border-zinc-200/80 dark:border-white/[0.08] space-y-3">
          <div className="flex items-center gap-3">
            <div className="size-11 rounded-2xl bg-gradient-to-tr from-[#713CF4] to-[#9061F9] text-white font-extrabold text-base flex items-center justify-center shadow-xs shrink-0">
              {demoUser?.name?.charAt(0).toUpperCase() || "N"}
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate">
                {demoUser?.name || "EchoGPT Member"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                {demoUser?.email || "user@example.com"}
              </p>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#713CF4]/10 text-[#713CF4] dark:text-[#a78bfa] border border-[#713CF4]/20 shrink-0">
              Free Plan
            </span>
          </div>

          <div className="pt-2 border-t border-zinc-200/50 dark:border-white/4 flex items-center justify-between">
            <Link
              href="/subscriptions"
              className="text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline"
            >
              Upgrade to Pro →
            </Link>

            <button
              type="button"
              onClick={handleSignOut}
              className="inline-flex items-center gap-1 text-xs font-medium text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
            >
              <LogOut className="size-3" />
              <span>{isSignOutSuccess ? "Signed out" : "Sign Out"}</span>
            </button>
          </div>
        </div>

        {/* ── 2. APPEARANCE (Light / Dark) ── */}
        <div className="space-y-2">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Appearance
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                if (theme === "dark") toggleTheme();
              }}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                theme === "light"
                  ? "bg-[#713CF4]/10 border-[#713CF4] text-[#713CF4]"
                  : "bg-zinc-50 dark:bg-white/[0.03] border-zinc-200 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400"
              }`}
            >
              <Sun className="size-4" />
              <span>Light Theme</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (theme === "light") toggleTheme();
              }}
              className={`flex items-center justify-center gap-2 p-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                theme === "dark"
                  ? "bg-[#713CF4]/10 border-[#713CF4] text-[#a78bfa]"
                  : "bg-zinc-50 dark:bg-white/[0.03] border-zinc-200 dark:border-white/[0.08] text-zinc-600 dark:text-zinc-400"
              }`}
            >
              <Moon className="size-4" />
              <span>Dark Theme</span>
            </button>
          </div>
        </div>

        {/* ── 3. AI PREFERENCES ── */}
        <div className="space-y-3">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            AI Engine Defaults
          </label>

          {/* Default Model */}
          <div className="space-y-1">
            <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
              Default Model
            </span>
            <select
              value={defaultModel}
              onChange={(e) => updateSetting("defaultModel", e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-white/[0.1] bg-white dark:bg-[#15121F] text-xs font-medium text-zinc-800 dark:text-zinc-200 outline-none"
            >
              {AI_MODELS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.provider})
                </option>
              ))}
            </select>
          </div>

          {/* Temperature Slider */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-700 dark:text-zinc-300 font-medium">
                Creativity (Temperature)
              </span>
              <span className="font-mono text-zinc-400">{temperature}</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="1.0"
              step="0.1"
              value={temperature}
              onChange={(e) => updateSetting("temperature", parseFloat(e.target.value))}
              className="w-full accent-[#713CF4] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400">
              <span>Precise (0.1)</span>
              <span>Balanced (0.7)</span>
              <span>Creative (1.0)</span>
            </div>
          </div>

          {/* Stream Responses Toggle */}
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium">
              Stream Responses Word-by-Word
            </span>
            <input
              type="checkbox"
              checked={streamResponses}
              onChange={(e) => updateSetting("streamResponses", e.target.checked)}
              className="accent-[#713CF4] size-4 cursor-pointer"
            />
          </div>
        </div>

        {/* ── 4. GENERAL / PRODUCTIVITY ── */}
        <div className="space-y-3 pt-1">
          <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Browser Integration
          </label>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Detect Active Web Page
              </p>
              <p className="text-[10px] text-zinc-400">
                Enable 1-click summarization from active tab
              </p>
            </div>
            <input
              type="checkbox"
              checked={autoPageContext}
              onChange={(e) => updateSetting("autoPageContext", e.target.checked)}
              className="accent-[#713CF4] size-4 cursor-pointer"
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                Global Keyboard Shortcuts
              </p>
              <p className="text-[10px] text-zinc-400">
                Toggle side panel with <kbd className="font-mono text-[9px] px-1 py-0.5 rounded bg-zinc-100 dark:bg-white/10">Alt+E</kbd>
              </p>
            </div>
            <input
              type="checkbox"
              checked={keyboardShortcuts}
              onChange={(e) => updateSetting("keyboardShortcuts", e.target.checked)}
              className="accent-[#713CF4] size-4 cursor-pointer"
            />
          </div>

          <div className="pt-2 border-t border-zinc-200/50 dark:border-white/4">
            <button
              type="button"
              onClick={handleClearHistory}
              className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl border border-rose-200 dark:border-rose-900/40 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-xs font-semibold transition-colors cursor-pointer"
            >
              <Trash2 className="size-3.5" />
              <span>{historyCleared ? "Conversation History Cleared" : "Clear Extension History"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
