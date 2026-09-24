"use client";

import React, { useState } from "react";
import {
  Image as ImageIcon,
  Sparkles,
  Crown,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { StudioPrompt } from "@/components/studio/StudioPrompt";
import { StudioPreview } from "@/components/studio/StudioPreview";
import { Button } from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

interface StyleOption {
  id: string;
  name: string;
  badge: string;
}

const STYLES: StyleOption[] = [
  { id: "3d-render", name: "3D Isometric", badge: "Octane" },
  { id: "photorealistic", name: "Photorealistic", badge: "8K Raw" },
  { id: "cyberpunk", name: "Cyberpunk Neon", badge: "Stylized" },
  { id: "minimalist", name: "Minimalist Vector", badge: "Clean" },
  { id: "architectural", name: "Architectural", badge: "Studio" },
  { id: "anime", name: "Digital Anime", badge: "Cel-shaded" },
];

const ASPECT_RATIOS = [
  { id: "1:1", label: "1:1 Square", res: "1024 × 1024" },
  { id: "16:9", label: "16:9 Landscape", res: "1792 × 1024" },
  { id: "9:16", label: "9:16 Portrait", res: "1024 × 1792" },
  { id: "4:3", label: "4:3 Standard", res: "1408 × 1056" },
];

const IMAGE_MODELS = [
  { id: "flux-pro", name: "Flux Pro", badge: "Highest Fidelity" },
  { id: "dall-e-3", name: "DALL-E 3", badge: "Prompt Adherence" },
  { id: "midjourney-v6", name: "Midjourney v6", badge: "Cinematic Style" },
  { id: "sdxl-turbo", name: "SDXL Turbo", badge: "Realtime Speed" },
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

const SAMPLE_GALLERY: GeneratedImage[] = [
  {
    id: "img-1",
    prompt: "Minimalist 3D isometric dashboard floating in dark space with glowing #713CF4 interface nodes",
    style: "3D Isometric",
    ratio: "16:9",
    model: "Flux Pro",
    colorGrad: "from-violet-900/60 via-purple-950/40 to-black",
    timestamp: "10m ago",
  },
  {
    id: "img-2",
    prompt: "Futuristic architectural atrium with curved organic concrete fins and diffused skylight illumination",
    style: "Architectural",
    ratio: "1:1",
    model: "Midjourney v6",
    colorGrad: "from-slate-800 via-zinc-900 to-black",
    timestamp: "1h ago",
  },
  {
    id: "img-3",
    prompt: "Studio product shot of transparent glass headphones on brushed titanium plate with rim lighting",
    style: "Photorealistic",
    ratio: "1:1",
    model: "DALL-E 3",
    colorGrad: "from-indigo-950/80 via-zinc-900 to-black",
    timestamp: "3h ago",
  },
  {
    id: "img-4",
    prompt: "Cyberpunk Tokyo rain street at twilight with violet neon reflections on wet asphalt",
    style: "Cyberpunk Neon",
    ratio: "9:16",
    model: "Flux Pro",
    colorGrad: "from-fuchsia-950/70 via-purple-950/40 to-black",
    timestamp: "Yesterday",
  },
];

export function ImageStudioWorkspace() {
  const [prompt, setPrompt] = useState(
    "Minimalist 3D isometric dashboard floating in dark space with glowing #713CF4 interface nodes"
  );
  const [selectedModel, setSelectedModel] = useState("flux-pro");
  const [selectedStyle, setSelectedStyle] = useState("3d-render");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [batchCount, setBatchCount] = useState<number>(1);
  const [isGenerating, setIsGenerating] = useState(false);
  const [gallery, setGallery] = useState<GeneratedImage[]>(SAMPLE_GALLERY);
  const [activeImage, setActiveImage] = useState<GeneratedImage>(SAMPLE_GALLERY[0]);
  const [isCopied, setIsCopied] = useState(false);

  const { openUpgradeModal } = useUpgradeModal();

  const blueprints = [
    "Isometric floating SaaS analytics dashboard with violet neon accents",
    "Ultra-clean titanium mechanical keyboard with frosted keycaps and studio light",
    "Abstract procedural crystal prism refracting soft purple light beams",
  ];

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    setTimeout(() => {
      const selectedModelName =
        IMAGE_MODELS.find((m) => m.id === selectedModel)?.name || "Flux Pro";
      const styleName =
        STYLES.find((s) => s.id === selectedStyle)?.name || "3D Isometric";

      const newImg: GeneratedImage = {
        id: `img-${Date.now()}`,
        prompt,
        style: styleName,
        ratio: selectedRatio,
        model: selectedModelName,
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

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100">
      {/* 1. Responsive Workspace Header */}
      <WorkspaceHeader
        title="Image Studio"
        breadcrumbs={[
          { label: "Workspace" },
          { label: "Image Studio" },
        ]}
        badge={{ text: "PRO", variant: "pro" }}
        subtitle="Generate photorealistic concepts, 3D renders, and stylized illustrations"
        actions={
          <Button
            variant="outline"
            size="xs"
            onClick={() =>
              openUpgradeModal(
                "Upgrade to EchoGPT Pro for unlimited 4K batch rendering and commercial licenses."
              )
            }
            leftIcon={<Crown className="size-3.5 text-[#713CF4]" />}
          >
            Pro Features
          </Button>
        }
      />

      {/* 2. Main Two-Column Studio Layout */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-7">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Studio Controls (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Prompt & Blueprints */}
            <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Concept Prompt
                </span>
                <span className="text-[11px] text-[#713CF4] font-medium flex items-center gap-1">
                  <Sparkles className="size-3" />
                  AI Assisted
                </span>
              </div>

              <StudioPrompt
                prompt={prompt}
                onChange={setPrompt}
                onSubmit={handleGenerate}
                isGenerating={isGenerating}
                buttonText="Generate Artwork"
                placeholder="Describe your artwork concept, lighting, and style..."
                templates={blueprints}
                onSelectTemplate={setPrompt}
              />
            </div>

            {/* Model & Generation Parameters */}
            <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Neural Engine
              </span>

              {/* Model Select Grid */}
              <div className="grid grid-cols-2 gap-2">
                {IMAGE_MODELS.map((m) => {
                  const isSelected = selectedModel === m.id;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setSelectedModel(m.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer outline-none ${
                        isSelected
                          ? "border-[#713CF4] bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#a78bfa] ring-1 ring-[#713CF4]/30"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-[#161720] text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      <div className="text-xs font-semibold leading-tight">
                        {m.name}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-0.5 line-clamp-1">
                        {m.badge}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Visual Styles */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  Visual Style
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {STYLES.map((s) => {
                    const isSelected = selectedStyle === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedStyle(s.id)}
                        className={`px-2.5 py-2 rounded-lg text-left text-xs font-medium border transition-all cursor-pointer outline-none ${
                          isSelected
                            ? "bg-[#713CF4] text-white border-[#713CF4] shadow-2xs"
                            : "bg-zinc-50 dark:bg-[#161720] border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
                        }`}
                      >
                        <span className="block truncate">{s.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Aspect Ratio & Batch */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">
                    Aspect Ratio
                  </span>
                  <select
                    value={selectedRatio}
                    onChange={(e) => setSelectedRatio(e.target.value)}
                    className="w-full p-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-xs text-zinc-800 dark:text-zinc-200 outline-none focus:ring-1 focus:ring-[#713CF4]"
                  >
                    {ASPECT_RATIOS.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.label} ({r.res})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">
                    Batch Count
                  </span>
                  <div className="flex gap-1">
                    {[1, 2, 4].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setBatchCount(count)}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer outline-none ${
                          batchCount === count
                            ? "bg-[#713CF4]/10 text-[#713CF4] border-[#713CF4]/40"
                            : "bg-zinc-50 dark:bg-[#161720] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {count}×
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Studio Preview & Recent Gallery (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Active Canvas Preview */}
            <StudioPreview
              title={`${activeImage.style} — ${activeImage.model}`}
              isGenerating={isGenerating}
              isCopied={isCopied}
              onCopyPrompt={handleCopyPrompt}
              onDownload={handleDownload}
              onRegenerate={handleGenerate}
              metadata={[
                { label: "Model", value: activeImage.model },
                { label: "Ratio", value: activeImage.ratio },
                { label: "Style", value: activeImage.style },
                { label: "Latency", value: "1.2s" },
              ]}
              previewContent={
                <div
                  className={`w-full max-w-lg aspect-${
                    activeImage.ratio === "1:1"
                      ? "square"
                      : activeImage.ratio === "9:16"
                      ? "[9/16]"
                      : "[16/9]"
                  } rounded-xl bg-gradient-to-br ${
                    activeImage.colorGrad
                  } border border-white/10 shadow-xl flex flex-col justify-between p-6 relative overflow-hidden group`}
                >
                  {/* Subtle Grid Canvas Overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(#713cf4_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-white font-medium">
                      {activeImage.style}
                    </span>
                    <span className="text-[10px] text-white/60 font-mono">
                      {activeImage.ratio}
                    </span>
                  </div>

                  {/* Visual Center Mockup Content */}
                  <div className="my-auto text-center space-y-2 z-10">
                    <div className="size-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center text-white shadow-lg">
                      <ImageIcon className="size-8 text-white/90" />
                    </div>
                    <div className="max-w-xs mx-auto text-xs text-white/90 font-medium line-clamp-2 leading-relaxed">
                      &ldquo;{activeImage.prompt}&rdquo;
                    </div>
                  </div>

                  <div className="flex items-center justify-between z-10 text-[10.5px] text-white/50 border-t border-white/10 pt-3">
                    <span>EchoGPT Image Studio</span>
                    <span>{activeImage.timestamp}</span>
                  </div>
                </div>
              }
            />

            {/* Recent Gallery Showcase */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Recent Artwork
                </span>
                <span className="text-[11px] text-zinc-400">
                  {gallery.length} renders
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {gallery.map((item) => {
                  const isActive = activeImage.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveImage(item)}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden text-left p-2.5 flex flex-col justify-between bg-gradient-to-br ${
                        item.colorGrad
                      } border transition-all cursor-pointer outline-none ${
                        isActive
                          ? "border-[#713CF4] ring-2 ring-[#713CF4]/40 scale-[1.02]"
                          : "border-zinc-200/80 dark:border-zinc-800 hover:scale-[1.01]"
                      }`}
                    >
                      <span className="text-[9.5px] font-semibold text-white/80 line-clamp-1">
                        {item.style}
                      </span>
                      <p className="text-[10px] text-white/70 line-clamp-2 leading-tight">
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
    </div>
  );
}
