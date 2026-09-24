"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Image as ImageIcon,
  Sparkles,
  Crown,
  Upload,
  Sliders,
  Copy,
  Check,
  Download,
  RefreshCw,
  ChevronDown,
  Layers,
  Wand2,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { ModelSelector } from "@/components/dashboard/ModelSelector";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";
import { IMAGE_MODELS, DEFAULT_IMAGE_MODEL_ID } from "@/config/models";

interface StyleOption {
  id: string;
  name: string;
}

const STYLES: StyleOption[] = [
  { id: "3d-render", name: "3D Isometric" },
  { id: "photorealistic", name: "Photorealistic 8K" },
  { id: "cyberpunk", name: "Cyberpunk Neon" },
  { id: "minimalist", name: "Minimalist Vector" },
  { id: "architectural", name: "Architectural Studio" },
  { id: "anime", name: "Digital Anime" },
];

const ASPECT_RATIOS = [
  { id: "1:1", label: "1:1" },
  { id: "16:9", label: "16:9" },
  { id: "9:16", label: "9:16" },
  { id: "4:3", label: "4:3" },
];

const PROMPT_IDEAS = [
  "Turn my photo into a professional studio headshot with soft key lighting",
  "Minimalist 3D isometric dashboard floating in dark space with glowing #713CF4 nodes",
  "Futuristic architectural atrium with curved concrete fins and diffused skylight",
  "Studio product shot of transparent glass headphones on brushed titanium plate",
  "Cyberpunk Tokyo rain street at twilight with violet neon reflections on asphalt",
];

interface GeneratedImage {
  id: string;
  prompt: string;
  style: string;
  ratio: string;
  model: string;
  colorGrad: string;
  timestamp: string;
}

const INITIAL_GALLERY: GeneratedImage[] = [
  {
    id: "img-1",
    prompt: "Minimalist 3D isometric dashboard floating in dark space with glowing #713CF4 nodes",
    style: "3D Isometric",
    ratio: "16:9",
    model: "Flux Pro",
    colorGrad: "from-violet-900/60 via-purple-950/40 to-black",
    timestamp: "10m ago",
  },
  {
    id: "img-2",
    prompt: "Futuristic architectural atrium with curved organic concrete fins and diffused skylight",
    style: "Architectural Studio",
    ratio: "1:1",
    model: "Midjourney v6",
    colorGrad: "from-slate-800 via-zinc-900 to-black",
    timestamp: "1h ago",
  },
  {
    id: "img-3",
    prompt: "Studio product shot of transparent glass headphones on brushed titanium plate",
    style: "Photorealistic 8K",
    ratio: "1:1",
    model: "DALL-E 3",
    colorGrad: "from-indigo-950/80 via-zinc-900 to-black",
    timestamp: "3h ago",
  },
  {
    id: "img-4",
    prompt: "Cyberpunk Tokyo rain street at twilight with violet neon reflections on asphalt",
    style: "Cyberpunk Neon",
    ratio: "9:16",
    model: "Flux Pro",
    colorGrad: "from-fuchsia-950/70 via-purple-950/40 to-black",
    timestamp: "Yesterday",
  },
];

export function ImageStudioWorkspace() {
  const [prompt, setPrompt] = useState(
    "Minimalist 3D isometric dashboard floating in dark space with glowing #713CF4 nodes"
  );
  const [selectedModel, setSelectedModel] = useState(DEFAULT_IMAGE_MODEL_ID);
  const [selectedStyle, setSelectedStyle] = useState("3d-render");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [batchCount, setBatchCount] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [gallery, setGallery] = useState<GeneratedImage[]>(INITIAL_GALLERY);
  const [activeImage, setActiveImage] = useState<GeneratedImage | null>(INITIAL_GALLERY[0]);
  const [isCopied, setIsCopied] = useState(false);

  // Progressive Disclosure: Popovers & Collapsibles
  const [showPromptIdeas, setShowPromptIdeas] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [seed, setSeed] = useState("");

  const promptIdeasRef = useRef<HTMLDivElement>(null);
  const { openUpgradeModal } = useUpgradeModal();

  // Close prompt ideas popover on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        promptIdeasRef.current &&
        !promptIdeasRef.current.contains(e.target as Node)
      ) {
        setShowPromptIdeas(false);
      }
    }
    if (showPromptIdeas) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPromptIdeas]);

  const activeModel =
    IMAGE_MODELS.find((m) => m.id === selectedModel) || IMAGE_MODELS[0];
  const activeStyleName =
    STYLES.find((s) => s.id === selectedStyle)?.name || "3D Isometric";

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;

    if (activeModel.isPro) {
      openUpgradeModal(
        `${activeModel.name} is an EchoGPT Pro model. Upgrade to unlock 4K batch rendering.`
      );
      return;
    }

    setIsGenerating(true);

    setTimeout(() => {
      const newImg: GeneratedImage = {
        id: `img-${Date.now()}`,
        prompt,
        style: activeStyleName,
        ratio: selectedRatio,
        model: activeModel.name,
        colorGrad:
          selectedStyle === "cyberpunk"
            ? "from-fuchsia-950/70 via-purple-950/40 to-black"
            : selectedStyle === "photorealistic"
            ? "from-indigo-950/80 via-zinc-900 to-black"
            : "from-violet-900/60 via-purple-950/40 to-black",
        timestamp: "Just now",
      };

      setGallery((prev) => [newImg, ...prev]);
      setActiveImage(newImg);
      setIsGenerating(false);
      showToast("Artwork generated successfully!", "success");
    }, 1200);
  };

  const handleCopyPrompt = () => {
    if (!activeImage) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(activeImage.prompt);
      setIsCopied(true);
      showToast("Prompt copied to clipboard!", "success");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    showToast("Downloading high-resolution 4K render...", "success");
  };

  const handleUploadClick = () => {
    openUpgradeModal(
      "Image-to-image reference upload is an EchoGPT Pro feature."
    );
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100">
      {/* 1. Workspace Header */}
      <WorkspaceHeader
        title="Image Studio"
        breadcrumbs={[
          { label: "Workspace" },
          { label: "Image Studio" },
        ]}
        badge={{ text: "PRO", variant: "pro" }}
        subtitle="Create images that stop the scroll with frontier neural generation"
        actions={
          <Button
            variant="outline"
            size="xs"
            onClick={() =>
              openUpgradeModal(
                "Upgrade to EchoGPT Pro for unlimited 4K batch rendering, Octane 3D styles, and commercial rights."
              )
            }
            leftIcon={<Crown className="size-3.5 text-[#713CF4]" />}
          >
            Pro Features
          </Button>
        }
      />

      {/* 2. Main Studio Workspace Layout */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-7">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Top Section: Prompt & Control Card + Canvas Preview (2 Cols on lg) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Focused Prompt & Control Container (5 cols on lg) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Primary Prompt Card */}
              <div className="rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#121118] p-4 sm:p-5 shadow-xs space-y-3.5 transition-all focus-within:border-[#713CF4]/60 focus-within:ring-2 focus-within:ring-[#713CF4]/15">
                {/* Prompt Textarea */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Prompt
                    </span>
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                      {prompt.length} / 1000
                    </span>
                  </div>

                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Turn my photo into a professional headshot with soft studio lighting..."
                    rows={4}
                    className="w-full resize-none text-[13.5px] bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 outline-none leading-relaxed"
                  />
                </div>

                {/* Inline Controls Bar */}
                <div className="pt-3 border-t border-zinc-100 dark:border-white/[0.06] flex flex-wrap items-center justify-between gap-2.5">
                  {/* Left Controls: Upload + Aspect Ratio + Batch */}
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Reference Upload Attachment Button */}
                    <button
                      type="button"
                      onClick={handleUploadClick}
                      className="size-7.5 rounded-lg border border-zinc-200/80 dark:border-white/[0.08] bg-zinc-50 dark:bg-white/[0.04] text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center justify-center transition-colors cursor-pointer"
                      title="Upload reference image [PRO]"
                    >
                      <Upload className="size-3.5" />
                    </button>

                    {/* Aspect Ratio Segmented Pills */}
                    <div className="flex items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/[0.06]">
                      {ASPECT_RATIOS.map((r) => {
                        const isSelected = selectedRatio === r.id;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setSelectedRatio(r.id)}
                            className={`px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#713CF4] text-white shadow-2xs font-semibold"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                            }`}
                          >
                            {r.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Batch Count Pills */}
                    <div className="flex items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200/60 dark:border-white/[0.06]">
                      {[1, 2, 4].map((count) => {
                        const isSelected = batchCount === count;
                        return (
                          <button
                            key={count}
                            type="button"
                            onClick={() => setBatchCount(count)}
                            className={`size-6 rounded-md text-[10.5px] font-medium flex items-center justify-center transition-all cursor-pointer ${
                              isSelected
                                ? "bg-[#713CF4] text-white shadow-2xs font-semibold"
                                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
                            }`}
                          >
                            {count}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Controls: ModelSelector + Generate CTA */}
                  <div className="flex items-center gap-2">
                    <ModelSelector
                      models={IMAGE_MODELS}
                      selectedModelId={selectedModel}
                      onSelectModel={(m) => setSelectedModel(m.id)}
                      align="left"
                      triggerClassName="h-8.5 px-2.5 text-xs rounded-lg"
                      headerTitle="Neural Image Engine"
                    />

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={handleGenerate}
                      isLoading={isGenerating}
                      disabled={!prompt.trim()}
                      className="h-8.5 px-3.5 text-xs font-semibold shadow-xs"
                      leftIcon={<Sparkles className="size-3.5" />}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              </div>

              {/* Subtext info under prompt card */}
              <div className="flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 px-1">
                <span>Each image uses 1 generation credit. Takes ~30 seconds.</span>
                <span className="text-[#713CF4] font-medium">4K Native Mode</span>
              </div>

              {/* Secondary Options Bar: Prompt Ideas Popover + Visual Style Select */}
              <div className="flex items-center justify-between gap-2 pt-1">
                {/* Prompt Ideas Popover Toggle */}
                <div className="relative" ref={promptIdeasRef}>
                  <button
                    type="button"
                    onClick={() => setShowPromptIdeas(!showPromptIdeas)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#161520] hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-xs font-medium text-zinc-700 dark:text-zinc-300 transition-colors shadow-2xs cursor-pointer outline-none"
                  >
                    <Wand2 className="size-3.5 text-[#713CF4]" />
                    <span>Explore Prompts</span>
                    <ChevronDown
                      className={`size-3 text-zinc-400 transition-transform ${
                        showPromptIdeas ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Popover Dropdown */}
                  {showPromptIdeas && (
                    <div className="absolute left-0 top-full mt-1.5 w-76 sm:w-84 rounded-xl border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#1b1926] shadow-xl p-2 z-30 animate-in fade-in zoom-in-95">
                      <div className="text-[10.5px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 px-2 py-1">
                        Curated Blueprints
                      </div>
                      <div className="space-y-1 mt-1">
                        {PROMPT_IDEAS.map((idea, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              setPrompt(idea);
                              setShowPromptIdeas(false);
                            }}
                            className="w-full text-left p-2 rounded-lg text-xs text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-white/[0.06] transition-colors leading-relaxed line-clamp-2 cursor-pointer"
                          >
                            &ldquo;{idea}&rdquo;
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Style Dropdown Selector */}
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-zinc-400 dark:text-zinc-500">
                    Style:
                  </span>
                  <select
                    value={selectedStyle}
                    onChange={(e) => setSelectedStyle(e.target.value)}
                    className="py-1.5 px-2.5 rounded-lg border border-zinc-200/80 dark:border-white/[0.08] bg-white dark:bg-[#161520] text-xs font-medium text-zinc-800 dark:text-zinc-200 outline-none cursor-pointer focus:ring-1 focus:ring-[#713CF4]"
                  >
                    {STYLES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Tertiary: Advanced Options Collapsible */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200 cursor-pointer outline-none"
                >
                  <Sliders className="size-3" />
                  <span>Advanced options</span>
                  <ChevronDown
                    className={`size-3 transition-transform ${
                      showAdvanced ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {showAdvanced && (
                  <div className="mt-2.5 p-3.5 rounded-xl border border-zinc-200/70 dark:border-white/[0.06] bg-zinc-50/70 dark:bg-white/[0.02] space-y-3 animate-in fade-in">
                    <div>
                      <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                        Negative Prompt
                      </span>
                      <input
                        type="text"
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        placeholder="blurry, distorted, low quality, artifacts, watermark..."
                        className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#161520] text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-[#713CF4]"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-medium text-zinc-600 dark:text-zinc-300 mb-1">
                          <span>Prompt Guidance (CFG)</span>
                          <span className="text-[#713CF4] font-semibold">
                            {guidanceScale}
                          </span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          step="0.5"
                          value={guidanceScale}
                          onChange={(e) =>
                            setGuidanceScale(parseFloat(e.target.value))
                          }
                          className="w-full accent-[#713CF4] cursor-pointer"
                        />
                      </div>

                      <div>
                        <span className="text-[11px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                          Random Seed
                        </span>
                        <input
                          type="text"
                          value={seed}
                          onChange={(e) => setSeed(e.target.value)}
                          placeholder="Random (e.g. 42918)"
                          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-zinc-200 dark:border-white/[0.08] bg-white dark:bg-[#161520] text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-[#713CF4]"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Large, Clean Canvas Preview (7 cols on lg) */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-200/90 dark:border-white/[0.08] bg-white dark:bg-[#121118] overflow-hidden shadow-xs flex flex-col">
                {/* Preview Top Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-white/[0.06] shrink-0">
                  <div className="flex items-center gap-2">
                    <ImageIcon className="size-4 text-[#713CF4]" />
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {activeImage
                        ? `${activeImage.style} • ${activeImage.model}`
                        : "Artwork Canvas"}
                    </span>
                    {isGenerating && (
                      <Badge variant="pro" size="sm">
                        Synthesizing...
                      </Badge>
                    )}
                  </div>

                  {activeImage && (
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleCopyPrompt}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none"
                        title="Copy prompt"
                      >
                        {isCopied ? (
                          <Check className="size-3.5 text-emerald-500" />
                        ) : (
                          <Copy className="size-3.5" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                        className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none disabled:opacity-40"
                        title="Regenerate"
                      >
                        <RefreshCw
                          className={`size-3.5 ${
                            isGenerating ? "animate-spin" : ""
                          }`}
                        />
                      </button>

                      <Button
                        variant="outline"
                        size="xs"
                        onClick={handleDownload}
                        leftIcon={<Download className="size-3.5" />}
                        className="h-7 text-xs"
                      >
                        Export 4K
                      </Button>
                    </div>
                  )}
                </div>

                {/* Canvas Render Area */}
                <div className="flex-1 min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-6 sm:p-8 bg-zinc-50/60 dark:bg-[#0E0C15]/70 relative overflow-hidden">
                  {isGenerating ? (
                    <div className="flex flex-col items-center justify-center gap-3 text-center z-10 animate-in fade-in">
                      <div className="size-12 rounded-2xl bg-[#713CF4]/15 border border-[#713CF4]/30 flex items-center justify-center text-[#713CF4] animate-pulse">
                        <Sparkles className="size-6 animate-spin" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                          Synthesizing latent neural space...
                        </span>
                        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                          Refining high-frequency lighting and textures
                        </p>
                      </div>
                    </div>
                  ) : activeImage ? (
                    <div
                      className={`w-full max-w-xl aspect-${
                        activeImage.ratio === "1:1"
                          ? "square"
                          : activeImage.ratio === "9:16"
                          ? "[9/16]"
                          : "[16/9]"
                      } rounded-xl bg-gradient-to-br ${
                        activeImage.colorGrad
                      } border border-white/10 shadow-2xl flex flex-col justify-between p-6 relative overflow-hidden group transition-all`}
                    >
                      {/* Subtle Grid Canvas Overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(#713cf4_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                      <div className="flex items-center justify-between z-10">
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-white font-medium border border-white/10">
                          {activeImage.style}
                        </span>
                        <span className="text-[10px] text-white/70 font-mono">
                          {activeImage.ratio}
                        </span>
                      </div>

                      {/* Visual Center Mockup */}
                      <div className="my-auto text-center space-y-2.5 z-10">
                        <div className="size-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center text-white shadow-lg">
                          <Layers className="size-8 text-white/90" />
                        </div>
                        <div className="max-w-xs mx-auto text-xs text-white/95 font-medium line-clamp-2 leading-relaxed">
                          &ldquo;{activeImage.prompt}&rdquo;
                        </div>
                      </div>

                      <div className="flex items-center justify-between z-10 text-[10.5px] text-white/60 border-t border-white/10 pt-3">
                        <span>EchoGPT Image Studio</span>
                        <span>{activeImage.timestamp}</span>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-2 text-zinc-400 dark:text-zinc-500">
                      <ImageIcon className="size-10 mx-auto stroke-1" />
                      <p className="text-xs">
                        Nothing here yet — describe an image above to get started.
                      </p>
                    </div>
                  )}
                </div>

                {/* Subtle Metadata Strip */}
                {activeImage && (
                  <div className="px-4 py-2.5 bg-zinc-50 dark:bg-[#161520] border-t border-zinc-100 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
                    <div className="flex items-center gap-3">
                      <span>Model: <strong className="text-zinc-700 dark:text-zinc-300 font-medium">{activeImage.model}</strong></span>
                      <span>Ratio: <strong className="text-zinc-700 dark:text-zinc-300 font-medium">{activeImage.ratio}</strong></span>
                      <span>Latency: <strong className="text-zinc-700 dark:text-zinc-300 font-medium">1.2s</strong></span>
                    </div>
                    <span>4K Octane Render</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Section: Compact Recent Artwork Gallery */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Your Creations
              </span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                {gallery.length} renders
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {gallery.map((item) => {
                const isActive = activeImage?.id === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveImage(item)}
                    className={`relative aspect-[16/10] rounded-xl overflow-hidden text-left p-3 flex flex-col justify-between bg-gradient-to-br ${
                      item.colorGrad
                    } border transition-all cursor-pointer outline-none ${
                      isActive
                        ? "border-[#713CF4] ring-2 ring-[#713CF4]/40 scale-[1.01]"
                        : "border-zinc-200/80 dark:border-white/[0.08] hover:border-zinc-300 dark:hover:border-zinc-700"
                    }`}
                  >
                    <div className="flex items-center justify-between z-10">
                      <span className="text-[9.5px] font-semibold text-white/90 line-clamp-1">
                        {item.style}
                      </span>
                      <span className="text-[9px] text-white/60 font-mono">
                        {item.ratio}
                      </span>
                    </div>

                    <p className="text-[10px] text-white/80 line-clamp-2 leading-tight z-10">
                      {item.prompt}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
