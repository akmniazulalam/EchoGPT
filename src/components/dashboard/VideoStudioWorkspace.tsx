"use client";

import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import {
  Play,
  Pause,
  Film,
  Volume2,
  VolumeX,
  Download,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Clapperboard,
  Crown,
  Clock,
  Sparkles,
  X,
  Camera,
  Move,
  Maximize2,
  MonitorPlay,
  MoreHorizontal,
  Star,
  Trash2,
  Copy,
  Wand2,
  AlertCircle,
  ZoomIn,
  ArrowRight,
  TrendingUp,
  Hand,
  Crosshair,
  SlidersHorizontal,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { ModelSelector } from "@/components/dashboard/ModelSelector";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";
import { VIDEO_MODELS, DEFAULT_VIDEO_MODEL_ID, AIModel } from "@/config/models";

/* ─────────────────────── Types ────────────────────────── */
type GenState = "idle" | "queued" | "generating" | "processing" | "complete" | "failed";

interface VideoProject {
  id: string;
  title: string;
  prompt: string;
  duration: string;
  ratio: string;
  camera: string;
  model: string;
  colorGrad: string;
  timestamp: string;
  isFavorite?: boolean;
}

/* ─────────────────────── Constants ─────────────────────── */

const MAX_PROMPT_LENGTH = 800;

const SCENE_TEMPLATES = [
  {
    label: "Cinematic city night",
    text: "Anamorphic drone pan gliding slowly over glistening rain-soaked neon street at night, 24fps film grain, bokeh city lights",
  },
  {
    label: "Product 360 orbit",
    text: "360-degree orbital rotation around a floating frosted glass smartwatch, clean studio softbox lighting, white background",
  },
  {
    label: "Biophilic interior",
    text: "Hyperlapse zoom descending into a lush biophilic office pavilion, morning light shafts, warm colour grade",
  },
  {
    label: "Abstract particles",
    text: "Microscopic view of iridescent soap-bubble membranes bursting in ultra-slow motion, macro lens, black background",
  },
];

// Mock enhancement expansions keyed by short phrases
const ENHANCE_EXPANSIONS: Record<string, string> = {
  default: ", with cinematic depth of field, subtle lens flare, film grain texture, slow deliberate camera movement, and a warm cinematic colour grade.",
  city: ", featuring glistening wet cobblestones reflecting neon signs, atmospheric fog rolling between buildings, anamorphic bokeh in the background, 24fps cinematic look, and a cool-blue evening light palette.",
  product: ", illuminated by three-point studio softbox lighting, rotating smoothly at 1rpm on a frosted glass plinth, with subtle shadow gradients and a clean neutral-grey seamless background.",
  nature: ", drenched in golden-hour sunlight filtering through the canopy, slow 0.3x speed push-in, subtle rack focus from foreground flora to background landscape, with a warm analogue film look.",
};

// 4 primary camera presets always visible
const PRIMARY_CAMERAS = [
  { id: "drone-pan", label: "Drone Pan", icon: <Camera className="size-3.5" /> },
  { id: "orbital-360", label: "Orbital 360", icon: <RotateCcw className="size-3.5" /> },
  { id: "kinetic-push", label: "Kinetic Push", icon: <Move className="size-3.5" /> },
  { id: "static-macro", label: "Static Close-up", icon: <Maximize2 className="size-3.5" /> },
];

// Additional cameras shown in "More" popover
const MORE_CAMERAS = [
  { id: "dolly", label: "Dolly", icon: <ArrowRight className="size-3.5" /> },
  { id: "tracking", label: "Tracking", icon: <Crosshair className="size-3.5" /> },
  { id: "crane", label: "Crane", icon: <TrendingUp className="size-3.5" /> },
  { id: "handheld", label: "Handheld", icon: <Hand className="size-3.5" /> },
  { id: "zoom", label: "Zoom", icon: <ZoomIn className="size-3.5" /> },
  { id: "arc", label: "Arc", icon: <RotateCcw className="size-3.5" /> },
];

const ALL_CAMERAS = [...PRIMARY_CAMERAS, ...MORE_CAMERAS];

const DURATIONS = ["3s", "5s", "10s"] as const;

const RATIOS = [
  { id: "16:9", label: "16:9" },
  { id: "9:16", label: "9:16" },
  { id: "1:1", label: "1:1" },
] as const;

// Pre-computed waveform bars — Math.random() must NOT be called during render
const WAVEFORM_BARS = Array.from({ length: 18 }, (_, i) => ({
  height: Math.max(25, Math.floor(Math.random() * 100)),
  delay: `${(i * 0.07).toFixed(2)}s`,
  duration: `${(0.7 + Math.random() * 0.8).toFixed(2)}s`,
}));

const GEN_STATE_LABELS: Record<GenState, string> = {
  idle: "",
  queued: "Your video is queued…",
  generating: "Creating your scene…",
  processing: "Finishing your video…",
  complete: "Your video is ready.",
  failed: "Generation failed. Please try again.",
};

const SAMPLE_PROJECTS: VideoProject[] = [
  {
    id: "vid-1",
    title: "Cinematic Neo-Seoul",
    prompt: "Anamorphic drone pan gliding slowly over glistening rain-soaked neon street at night, 24fps film grain",
    duration: "0:05",
    ratio: "16:9",
    camera: "Drone Pan",
    model: "Veo 3.1 fast",
    colorGrad: "from-violet-950 via-indigo-950 to-black",
    timestamp: "2 hours ago",
    isFavorite: false,
  },
  {
    id: "vid-2",
    title: "Product Reveal 360",
    prompt: "360-degree orbital rotation around floating frosted glass smartwatch, studio softbox lighting",
    duration: "0:03",
    ratio: "16:9",
    camera: "Orbital 360",
    model: "Veo 3.1 fast",
    colorGrad: "from-zinc-800 via-neutral-900 to-black",
    timestamp: "Yesterday",
    isFavorite: true,
  },
  {
    id: "vid-3",
    title: "SaaS Interface Flythrough",
    prompt: "First-person kinetic push through multi-layered glass cards with purple UI glowing particles",
    duration: "0:05",
    ratio: "9:16",
    camera: "Kinetic Push",
    model: "Veo 3.1 fast",
    colorGrad: "from-purple-950 via-[#713CF4]/30 to-black",
    timestamp: "2 days ago",
    isFavorite: false,
  },
];

/* ─────────────────────── Helpers ─────────────────────── */
function formatTime(sec: number) {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatCountdown(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function mockEnhancePrompt(current: string): string {
  const lower = current.toLowerCase();
  let suffix = ENHANCE_EXPANSIONS.default;
  if (lower.includes("city") || lower.includes("street") || lower.includes("neon")) {
    suffix = ENHANCE_EXPANSIONS.city;
  } else if (lower.includes("product") || lower.includes("smartwatch") || lower.includes("glass")) {
    suffix = ENHANCE_EXPANSIONS.product;
  } else if (lower.includes("nature") || lower.includes("forest") || lower.includes("green") || lower.includes("plant")) {
    suffix = ENHANCE_EXPANSIONS.nature;
  }
  // avoid double-appending
  if (current.trim().endsWith(".")) {
    return current.slice(0, -1) + suffix;
  }
  return current + suffix;
}

/* ─────────────────────── Component ─────────────────────── */
export function VideoStudioWorkspace() {
  /* — prompt — */
  const [prompt, setPrompt] = useState(
    "Anamorphic drone pan gliding slowly over glistening rain-soaked neon street at night, 24fps film grain"
  );
  const [isEnhancing, setIsEnhancing] = useState(false);

  /* — controls — */
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("5s");
  const [ratio, setRatio] = useState("16:9");
  const [cameraMotion, setCameraMotion] = useState("drone-pan");
  const [moreCamerasOpen, setMoreCamerasOpen] = useState(false);
  const moreCamerasRef = useRef<HTMLDivElement>(null);

  /* — model — */
  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_VIDEO_MODEL_ID);

  /* — templates popover — */
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const templatesRef = useRef<HTMLDivElement>(null);

  /* — advanced settings — */
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [motionIntensity, setMotionIntensity] = useState(50);
  const [cameraStrength, setCameraStrength] = useState(60);
  const [fps, setFps] = useState("24");
  const [quality, setQuality] = useState("high");
  const [seed, setSeed] = useState("");
  const [negativePrompt, setNegativePrompt] = useState("");

  /* — generation — */
  const [genState, setGenState] = useState<GenState>("complete");
  const [countdown, setCountdown] = useState(0);
  const genTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /* — player — */
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(40);

  /* — library — */
  const [projects, setProjects] = useState<VideoProject[]>(SAMPLE_PROJECTS);
  const [activeProject, setActiveProject] = useState<VideoProject>(SAMPLE_PROJECTS[0]);

  /* — creation card overflow menus — */
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  const { openUpgradeModal } = useUpgradeModal();

  /* — derived — */
  const selectedModel = useMemo(
    () => VIDEO_MODELS.find((m) => m.id === selectedModelId) || VIDEO_MODELS[0],
    [selectedModelId]
  );

  const activeCameraLabel = useMemo(
    () => ALL_CAMERAS.find((c) => c.id === cameraMotion)?.label || "Drone Pan",
    [cameraMotion]
  );

  const isActiveCameraInMore = MORE_CAMERAS.some((c) => c.id === cameraMotion);

  const clipSeconds = useMemo(() => {
    if (activeProject.duration === "0:10") return 10;
    if (activeProject.duration === "0:03") return 3;
    return 5;
  }, [activeProject.duration]);

  const currentSecond = Math.floor((progress / 100) * clipSeconds);

  /* ── close popovers on outside click ─── */
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (templatesRef.current && !templatesRef.current.contains(e.target as Node)) {
        setTemplatesOpen(false);
      }
    }
    if (templatesOpen) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [templatesOpen]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (moreCamerasRef.current && !moreCamerasRef.current.contains(e.target as Node)) {
        setMoreCamerasOpen(false);
      }
    }
    if (moreCamerasOpen) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [moreCamerasOpen]);

  // Close creation overflow menu on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      const target = e.target as Node;
      // Check if click is inside any menu — find closest [data-menu]
      const menus = document.querySelectorAll("[data-creation-menu]");
      let inside = false;
      menus.forEach((m) => { if (m.contains(target)) inside = true; });
      if (!inside) setOpenMenuId(null);
    }
    if (openMenuId) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [openMenuId]);

  /* ── scrubber playback timer ─── */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) { setIsPlaying(false); return 0; }
          return prev + 3;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  /* ── generation countdown ─── */
  useEffect(() => {
    if ((genState === "generating" || genState === "queued" || genState === "processing") && countdown > 0) {
      const interval = setInterval(() => {
        setCountdown((prev) => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [genState, countdown]);

  /* ── cleanup on unmount ─── */
  useEffect(() => {
    return () => {
      if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
    };
  }, []);

  /* ── Enhance Prompt (mock) ─── */
  const handleEnhancePrompt = useCallback(() => {
    if (!prompt.trim() || isEnhancing) return;
    setIsEnhancing(true);
    setTimeout(() => {
      setPrompt((prev) => mockEnhancePrompt(prev));
      setIsEnhancing(false);
      showToast("Prompt enhanced!", "success");
    }, 900);
  }, [prompt, isEnhancing]);

  /* ── Generate ─── */
  const handleGenerate = useCallback(() => {
    if (!prompt.trim() || genState === "queued" || genState === "generating" || genState === "processing") return;

    if (selectedModel.isPro) {
      openUpgradeModal(
        `${selectedModel.name} is an EchoGPT Pro video engine. Upgrade to unlock premium video generation.`
      );
      return;
    }

    if (quality === "4k") {
      openUpgradeModal("4K quality requires EchoGPT Pro.");
      return;
    }

    const totalSeconds = duration === "10s" ? 18 : duration === "3s" ? 10 : 14;
    setGenState("queued");
    setCountdown(totalSeconds);
    setIsPlaying(false);
    setProgress(0);

    // queued → generating after 2s
    const t1 = setTimeout(() => {
      setGenState("generating");
      setCountdown(totalSeconds - 2);

      // generating → processing at 75%
      const t2 = setTimeout(() => {
        setGenState("processing");
        setCountdown(3);

        // processing → complete
        const t3 = setTimeout(() => {
          const cam = ALL_CAMERAS.find((c) => c.id === cameraMotion);
          const durationLabel = duration === "10s" ? "0:10" : duration === "3s" ? "0:03" : "0:05";
          const newProj: VideoProject = {
            id: `vid-${Date.now()}`,
            title: prompt.slice(0, 32) + (prompt.length > 32 ? "…" : ""),
            prompt,
            duration: durationLabel,
            ratio,
            camera: cam?.label || "Drone Pan",
            model: selectedModel.name,
            colorGrad: "from-purple-950/80 via-[#713CF4]/20 to-black",
            timestamp: "Just now",
            isFavorite: false,
          };
          setProjects((prev) => [newProj, ...prev]);
          setActiveProject(newProj);
          setGenState("complete");
          setCountdown(0);
          setProgress(0);
          setIsPlaying(true);
          showToast("Scene rendered successfully!", "success");
        }, 3000);
        genTimeoutRef.current = t3;
      }, (totalSeconds - 5) * 1000);
      genTimeoutRef.current = t2;
    }, 2000);
    genTimeoutRef.current = t1;
  }, [prompt, genState, selectedModel, openUpgradeModal, duration, ratio, cameraMotion, quality]);

  /* ── Cancel generation ─── */
  const handleCancel = useCallback(() => {
    if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
    setGenState("idle");
    setCountdown(0);
    setIsPlaying(false);
    setProgress(0);
  }, []);

  /* ── Export ─── */
  const handleExport = useCallback(() => {
    openUpgradeModal("Upgrade to EchoGPT Pro to export ProRes video files.");
  }, [openUpgradeModal]);

  /* ── New Scene ─── */
  const handleNewScene = useCallback(() => {
    if (genTimeoutRef.current) clearTimeout(genTimeoutRef.current);
    setPrompt("");
    setDuration("5s");
    setRatio("16:9");
    setCameraMotion("drone-pan");
    setAdvancedOpen(false);
    setGenState("idle");
    setCountdown(0);
    setIsPlaying(false);
    setProgress(0);
  }, []);

  /* ── Creation card actions ─── */
  const handleFavorite = (id: string) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
    setOpenMenuId(null);
  };

  const handleDuplicate = (proj: VideoProject) => {
    setProjects((prev) => {
      const newId = `vid-${Date.now()}`;
      const dup: VideoProject = {
        ...proj,
        id: newId,
        title: proj.title + " (copy)",
        timestamp: "Just now",
        isFavorite: false,
      };
      const idx = prev.findIndex((p) => p.id === proj.id);
      const next = [...prev];
      next.splice(idx + 1, 0, dup);
      return next;
    });
    setOpenMenuId(null);
    showToast("Scene duplicated.", "success");
  };

  const handleRegenerate = (proj: VideoProject) => {
    setPrompt(proj.prompt);
    setOpenMenuId(null);
    showToast("Prompt restored — click Generate when ready.", "success");
  };

  const handleDelete = (id: string) => {
    if (activeProject.id === id) {
      const remaining = projects.filter((p) => p.id !== id);
      if (remaining.length > 0) setActiveProject(remaining[0]);
      else setGenState("idle");
    }
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setOpenMenuId(null);
  };

  const startRename = (proj: VideoProject) => {
    setRenamingId(proj.id);
    setRenameValue(proj.title);
    setOpenMenuId(null);
  };

  const commitRename = () => {
    if (!renameValue.trim()) { setRenamingId(null); return; }
    setProjects((prev) =>
      prev.map((p) => (p.id === renamingId ? { ...p, title: renameValue.trim() } : p))
    );
    if (activeProject.id === renamingId) {
      setActiveProject((prev) => ({ ...prev, title: renameValue.trim() }));
    }
    setRenamingId(null);
  };

  const isGenerating =
    genState === "queued" || genState === "generating" || genState === "processing";

  /* ─────────────────────── RENDER ─────────────────────── */
  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100">

      {/* ── HEADER ── */}
      <WorkspaceHeader
        title="Video Studio"
        breadcrumbs={[{ label: "Workspace" }, { label: "Video Studio" }]}
        badge={{ text: "PRO", variant: "pro" }}
        subtitle="Describe a scene. EchoGPT renders it."
        actions={
          <Button
            variant="outline"
            size="xs"
            onClick={() =>
              openUpgradeModal(
                "Upgrade to EchoGPT Pro for 4K exports, Sora, Kling v1.5, and Runway Gen-3."
              )
            }
            leftIcon={<Crown className="size-3.5 text-[#713CF4]" />}
          >
            Pro Features
          </Button>
        }
      />

      {/* ── SCROLLABLE BODY ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-7">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ── MODEL SELECTOR ROW — lives OUTSIDE any overflow-hidden container ── */}
          {/*
            ROOT CAUSE OF THE ORIGINAL BUG:
            The ModelSelector was inside the prompt card which had overflow-hidden.
            That clipped the absolutely-positioned dropdown popover even though
            it had z-index: 50. Solution: move ModelSelector to its own row above
            the prompt card, with no overflow-hidden ancestor.
          */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 shrink-0">
              Video Engine
            </span>
            {/* ModelSelector is in a plain div with no overflow constraint */}
            <ModelSelector
              models={VIDEO_MODELS}
              selectedModelId={selectedModelId}
              onSelectModel={(m: AIModel) => setSelectedModelId(m.id)}
              align="left"
              headerTitle="Video Engine"
              allowProSelection={false}
            />
            {selectedModel.isPro && (
              <Badge variant="pro" size="sm">PRO Required</Badge>
            )}
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 hidden sm:block">
              Video generation is a paid feature — upgrade to start creating.
            </span>
          </div>

          {/* ── MAIN STUDIO GRID: controls (5) | preview (7) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

            {/* ════════ LEFT COLUMN: Configuration (5 cols) ════════ */}
            <div className="lg:col-span-5 space-y-4">

              {/* ── PROMPT CARD ── */}
              {/* NOTE: No overflow-hidden on this card — removed so no clipping */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs">

                {/* card header row */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                    Scene Prompt
                  </span>
                  {/* Templates popover */}
                  <div ref={templatesRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setTemplatesOpen((o) => !o)}
                      aria-expanded={templatesOpen}
                      aria-label="Open scene templates"
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1b1725] text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4]"
                    >
                      <Sparkles className="size-3 text-[#713CF4]" />
                      Templates
                      <ChevronDown className={`size-3 transition-transform duration-150 ${templatesOpen ? "rotate-180" : ""}`} />
                    </button>

                    {templatesOpen && (
                      <div className="absolute right-0 top-full mt-1.5 w-72 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1b1725] shadow-xl z-50 p-1.5 space-y-0.5">
                        <p className="px-2.5 pt-1 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          Quick Starts
                        </p>
                        {SCENE_TEMPLATES.map((t, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => { setPrompt(t.text); setTemplatesOpen(false); }}
                            className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors group cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4]"
                          >
                            <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-[#713CF4] transition-colors">{t.label}</p>
                            <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">{t.text}</p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* textarea */}
                <div className="px-4 space-y-2">
                  <textarea
                    value={prompt}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_PROMPT_LENGTH) setPrompt(e.target.value);
                    }}
                    placeholder="Describe your scene: camera movement, atmosphere, subject, lighting, style…"
                    rows={4}
                    disabled={isGenerating}
                    aria-label="Scene prompt"
                    className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-[13.5px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 p-3.5 leading-relaxed outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />

                  {/* char count + enhance */}
                  <div className="flex items-center justify-between px-0.5">
                    <button
                      type="button"
                      onClick={handleEnhancePrompt}
                      disabled={!prompt.trim() || isEnhancing || isGenerating}
                      aria-label="Enhance prompt with AI suggestions"
                      className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-[#713CF4] dark:hover:text-[#a78bfa] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] rounded"
                    >
                      {isEnhancing ? (
                        <span className="size-3 border border-[#713CF4] border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <Wand2 className="size-3" />
                      )}
                      {isEnhancing ? "Enhancing…" : "Enhance Prompt"}
                    </button>
                    <span className={`text-[11px] font-mono ${prompt.length > MAX_PROMPT_LENGTH * 0.9 ? "text-amber-500" : "text-zinc-400 dark:text-zinc-500"}`}>
                      {prompt.length} / {MAX_PROMPT_LENGTH}
                    </span>
                  </div>
                </div>

                {/* bottom action bar */}
                <div className="flex items-center gap-2 px-4 pt-3 pb-4 flex-wrap">
                  {/* Duration pills */}
                  <div className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] p-0.5" role="group" aria-label="Duration">
                    {DURATIONS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(d)}
                        aria-pressed={duration === d}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                          duration === d
                            ? "bg-[#713CF4] text-white shadow-xs"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                      >
                        {d}
                      </button>
                    ))}
                  </div>

                  {/* Ratio pills */}
                  <div className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] p-0.5" role="group" aria-label="Aspect ratio">
                    {RATIOS.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRatio(r.id)}
                        aria-pressed={ratio === r.id}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                          ratio === r.id
                            ? "bg-[#713CF4] text-white shadow-xs"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>

                  {/* Generate CTA */}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    isLoading={isGenerating}
                    leftIcon={!isGenerating ? <Film className="size-3.5" /> : undefined}
                    className="ml-auto"
                  >
                    {isGenerating ? "Generating…" : "Generate"}
                  </Button>
                </div>

                {/* info footer */}
                <div className="px-4 pb-3 border-t border-zinc-100 dark:border-zinc-800/60 pt-2.5">
                  <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                    Video generation is a paid feature. Each video uses one message from your plan.
                  </p>
                </div>
              </div>

              {/* ── CAMERA MOTION CARD ── */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                    Camera Motion
                  </span>
                  {isActiveCameraInMore && (
                    <Badge variant="outline" size="sm">{activeCameraLabel}</Badge>
                  )}
                </div>

                {/* 4 primary presets always visible */}
                <div className="grid grid-cols-2 gap-1.5">
                  {PRIMARY_CAMERAS.map((cam) => {
                    const active = cameraMotion === cam.id;
                    return (
                      <button
                        key={cam.id}
                        type="button"
                        onClick={() => setCameraMotion(cam.id)}
                        aria-pressed={active}
                        className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left text-[12px] font-medium cursor-pointer outline-none transition-all focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                          active
                            ? "border-[#713CF4] bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-violet-300 ring-1 ring-[#713CF4]/25"
                            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#161720] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <span className={`shrink-0 ${active ? "text-[#713CF4]" : "text-zinc-400"}`}>
                          {cam.icon}
                        </span>
                        {cam.label}
                      </button>
                    );
                  })}
                </div>

                {/* "More motions" popover */}
                <div ref={moreCamerasRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setMoreCamerasOpen((o) => !o)}
                    aria-expanded={moreCamerasOpen}
                    className="inline-flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] rounded"
                  >
                    <SlidersHorizontal className="size-3" />
                    More motions
                    <ChevronDown className={`size-3 transition-transform duration-150 ${moreCamerasOpen ? "rotate-180" : ""}`} />
                  </button>

                  {moreCamerasOpen && (
                    <div className="absolute left-0 top-full mt-1.5 w-56 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1b1725] shadow-xl z-40 p-1.5 space-y-0.5">
                      <p className="px-2.5 pt-1 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Additional Presets</p>
                      {MORE_CAMERAS.map((cam) => {
                        const active = cameraMotion === cam.id;
                        return (
                          <button
                            key={cam.id}
                            type="button"
                            onClick={() => { setCameraMotion(cam.id); setMoreCamerasOpen(false); }}
                            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] font-medium cursor-pointer outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                              active
                                ? "bg-[#713CF4]/10 text-[#713CF4]"
                                : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                            }`}
                          >
                            <span className={active ? "text-[#713CF4]" : "text-zinc-400"}>{cam.icon}</span>
                            {cam.label}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* ── ADVANCED SETTINGS ── */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setAdvancedOpen((o) => !o)}
                  aria-expanded={advancedOpen}
                  className="w-full flex items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-[#713CF4] transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <SlidersHorizontal className="size-3.5" />
                    Advanced Settings
                  </span>
                  {advancedOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                </button>

                {advancedOpen && (
                  <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 pb-4 pt-3 space-y-5">

                    {/* GROUP: Motion */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Motion</p>

                      {/* Motion Intensity */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300">
                            Motion Intensity
                          </label>
                          <span className="text-[11px] font-mono text-[#713CF4]">{motionIntensity}</span>
                        </div>
                        <input
                          type="range" min={0} max={100} value={motionIntensity}
                          onChange={(e) => setMotionIntensity(Number(e.target.value))}
                          aria-label="Motion intensity"
                          className="w-full h-1.5 accent-[#713CF4] cursor-pointer"
                        />
                        <p className="text-[10.5px] text-zinc-400 mt-1">Controls how much the camera moves during the scene.</p>
                      </div>

                      {/* Camera Strength */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300">
                            Camera Strength
                          </label>
                          <span className="text-[11px] font-mono text-[#713CF4]">{cameraStrength}</span>
                        </div>
                        <input
                          type="range" min={0} max={100} value={cameraStrength}
                          onChange={(e) => setCameraStrength(Number(e.target.value))}
                          aria-label="Camera strength"
                          className="w-full h-1.5 accent-[#713CF4] cursor-pointer"
                        />
                        <p className="text-[10.5px] text-zinc-400 mt-1">How strongly the camera follows the selected motion preset.</p>
                      </div>
                    </div>

                    {/* GROUP: Output */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Output</p>

                      {/* FPS */}
                      <div>
                        <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">FPS</label>
                        <div className="flex gap-1.5" role="group" aria-label="Frames per second">
                          {["16", "24", "30"].map((f) => (
                            <button
                              key={f}
                              type="button"
                              onClick={() => setFps(f)}
                              aria-pressed={fps === f}
                              className={`flex-1 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                                fps === f
                                  ? "bg-[#713CF4]/10 text-[#713CF4] border-[#713CF4]/40"
                                  : "bg-zinc-50 dark:bg-[#161720] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                              }`}
                            >
                              {f} fps
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quality */}
                      <div>
                        <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">Quality</label>
                        <div className="flex gap-1.5" role="group" aria-label="Quality">
                          {[
                            { id: "draft", label: "Draft" },
                            { id: "high", label: "High" },
                            { id: "4k", label: "4K", pro: true },
                          ].map((q) => (
                            <button
                              key={q.id}
                              type="button"
                              onClick={() => {
                                if (q.pro) {
                                  openUpgradeModal("4K quality requires EchoGPT Pro.");
                                  return;
                                }
                                setQuality(q.id);
                              }}
                              aria-pressed={quality === q.id}
                              className={`flex-1 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer outline-none transition-colors focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                                quality === q.id
                                  ? "bg-[#713CF4]/10 text-[#713CF4] border-[#713CF4]/40"
                                  : "bg-zinc-50 dark:bg-[#161720] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                              }`}
                            >
                              {q.label}{q.pro ? " ✦" : ""}
                            </button>
                          ))}
                        </div>
                        {quality === "4k" ? null : (
                          <p className="text-[10.5px] text-zinc-400 mt-1">4K quality requires EchoGPT Pro.</p>
                        )}
                      </div>
                    </div>

                    {/* GROUP: Generation */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">Generation</p>

                      {/* Seed */}
                      <div>
                        <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">
                          Seed <span className="text-zinc-400 font-normal">(optional)</span>
                        </label>
                        <input
                          type="number" min={0} value={seed}
                          onChange={(e) => setSeed(e.target.value)}
                          placeholder="Leave blank for random"
                          aria-label="Random seed"
                          className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-[12px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-[#713CF4] focus:ring-1 focus:ring-[#713CF4]/30 transition-all"
                        />
                        <p className="text-[10.5px] text-zinc-400 mt-1">Use the same seed to reproduce a result.</p>
                      </div>

                      {/* Negative Prompt */}
                      <div>
                        <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">
                          Negative Prompt <span className="text-zinc-400 font-normal">(optional)</span>
                        </label>
                        <textarea
                          value={negativePrompt}
                          onChange={(e) => setNegativePrompt(e.target.value)}
                          placeholder="Describe what to avoid: blurry, shaky camera, low quality…"
                          rows={2}
                          aria-label="Negative prompt"
                          className="w-full resize-none px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-[12px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-[#713CF4] focus:ring-1 focus:ring-[#713CF4]/30 transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ════════ RIGHT COLUMN: Preview (7 cols) ════════ */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs overflow-hidden">

                {/* preview header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2 min-w-0">
                    <Clapperboard className="size-4 text-zinc-400 shrink-0" />
                    <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                      {genState === "idle"
                        ? "Preview"
                        : isGenerating
                        ? GEN_STATE_LABELS[genState]
                        : activeProject.title}
                    </span>
                    {genState === "complete" && (
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 hidden sm:block shrink-0">
                        {activeProject.ratio} · {activeProject.duration}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {genState === "complete" && (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setGenState("idle");
                            setIsPlaying(false);
                            setProgress(0);
                          }}
                          aria-label="Start new scene"
                          title="New scene"
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4]"
                        >
                          <Film className="size-3.5" />
                        </button>
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={handleExport}
                          leftIcon={<Download className="size-3" />}
                        >
                          Export
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* ── PREVIEW CANVAS ── */}
                <div className="relative bg-zinc-950 flex items-center justify-center" style={{ minHeight: 300 }}>

                  {/* IDLE */}
                  {genState === "idle" && (
                    <div className="flex flex-col items-center gap-4 text-center px-8 py-14">
                      <div className="size-14 rounded-2xl bg-zinc-800/60 flex items-center justify-center">
                        <Film className="size-6 text-zinc-500" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-zinc-400">Ready to generate</p>
                        <p className="text-[12px] text-zinc-500">
                          Describe your scene and click Generate to start.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* QUEUED / GENERATING / PROCESSING */}
                  {isGenerating && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-zinc-950/95 px-6">
                      {/* subtle pulsing ring */}
                      <div className="relative flex items-center justify-center">
                        <div className="absolute size-16 rounded-full border border-[#713CF4]/20 animate-pulse" />
                        <div className="size-10 rounded-full bg-[#713CF4]/15 border border-[#713CF4]/30 flex items-center justify-center">
                          <Film className="size-5 text-[#713CF4]" />
                        </div>
                      </div>

                      <div className="text-center space-y-1.5 max-w-xs">
                        <p className="text-white text-sm font-semibold">{GEN_STATE_LABELS[genState]}</p>
                        <p className="text-zinc-400 text-[12px]">Using {selectedModel.name}</p>
                        {countdown > 0 && genState !== "processing" && (
                          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/8 border border-white/10 mt-1">
                            <Clock className="size-3 text-[#713CF4]" />
                            <span className="text-white text-[11px] font-mono">~{formatCountdown(countdown)} remaining</span>
                          </div>
                        )}
                      </div>

                      {/* waveform animation */}
                      <div className="flex items-end gap-0.5 h-5">
                        {WAVEFORM_BARS.map((bar, i) => (
                          <div
                            key={i}
                            className="w-1 rounded-full bg-[#713CF4]/50 animate-pulse"
                            style={{
                              height: `${bar.height}%`,
                              animationDelay: bar.delay,
                              animationDuration: bar.duration,
                            }}
                          />
                        ))}
                      </div>

                      {/* Cancel button */}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleCancel}
                        leftIcon={<X className="size-3.5" />}
                        className="text-zinc-400 hover:text-white mt-1"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {/* FAILED */}
                  {genState === "failed" && (
                    <div className="flex flex-col items-center gap-3 text-center px-8 py-12">
                      <div className="size-12 rounded-2xl bg-red-500/10 flex items-center justify-center">
                        <AlertCircle className="size-6 text-red-400" />
                      </div>
                      <p className="text-sm font-semibold text-red-400">{GEN_STATE_LABELS.failed}</p>
                      <Button variant="outline" size="sm" onClick={handleNewScene} leftIcon={<RotateCcw className="size-3.5" />}>
                        Try Again
                      </Button>
                    </div>
                  )}

                  {/* COMPLETE: Video Player */}
                  {genState === "complete" && (
                    <div
                      className={`w-full relative bg-gradient-to-br ${activeProject.colorGrad} flex flex-col justify-between`}
                      style={{ minHeight: 300 }}
                    >
                      {/* subtle scanline */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.18)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />

                      {/* top overlay */}
                      <div className="relative flex items-center justify-between p-4 z-10">
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/80 font-medium border border-white/10">
                          {activeProject.camera} · {activeProject.ratio}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsMuted(!isMuted)}
                          className="size-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white cursor-pointer border border-white/10 transition-colors outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                          aria-label={isMuted ? "Unmute" : "Mute"}
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
                        </button>
                      </div>

                      {/* center play/pause */}
                      <div className="flex-1 flex items-center justify-center z-10 relative py-8">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="size-14 rounded-full bg-white/15 hover:bg-[#713CF4] border border-white/20 hover:border-transparent text-white flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-105 cursor-pointer backdrop-blur-sm outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                          aria-label={isPlaying ? "Pause video" : "Play video"}
                        >
                          {isPlaying ? <Pause className="size-6" /> : <Play className="size-6 ml-0.5" />}
                        </button>
                      </div>

                      {/* bottom player */}
                      <div className="relative z-10 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-8 space-y-2">
                        {/* scrubber */}
                        <div
                          role="slider"
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-valuenow={Math.round(progress)}
                          aria-label="Video timeline"
                          tabIndex={0}
                          className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                            setProgress(pct);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "ArrowRight") setProgress((p) => Math.min(100, p + 5));
                            if (e.key === "ArrowLeft") setProgress((p) => Math.max(0, p - 5));
                          }}
                        >
                          <div className="h-full bg-[#713CF4] rounded-full transition-all duration-75" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="flex items-center justify-between text-[10.5px] text-white/60 font-mono">
                          <span>{formatTime(currentSecond)}</span>
                          <span>{activeProject.duration}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* player footer */}
                {genState === "complete" && (
                  <div className="flex items-center gap-2 px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={handleNewScene}
                      leftIcon={<Film className="size-3" />}
                    >
                      New Scene
                    </Button>
                    <span className="ml-auto text-[10.5px] text-zinc-400 truncate max-w-[200px] sm:max-w-xs hidden sm:block">
                      {activeProject.prompt}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ════════ YOUR CREATIONS ════════ */}
          <div className="space-y-3 pb-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Your Creations
              </span>
              <span className="text-[11px] text-zinc-400">
                {projects.length} {projects.length === 1 ? "scene" : "scenes"}
              </span>
            </div>

            {projects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121319] py-12 flex flex-col items-center gap-3 text-center">
                <MonitorPlay className="size-6 text-zinc-300 dark:text-zinc-600" />
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  Nothing here yet — describe a scene above to get started.
                </p>
                <Button variant="outline" size="sm" onClick={handleNewScene} leftIcon={<Film className="size-3.5" />}>
                  Create your first scene
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {projects.map((proj) => {
                  const isActive = activeProject.id === proj.id;
                  const menuOpen = openMenuId === proj.id;
                  const isRenaming = renamingId === proj.id;

                  return (
                    <div
                      key={proj.id}
                      className={`relative rounded-xl border overflow-hidden transition-all ${
                        isActive
                          ? "border-[#713CF4] ring-2 ring-[#713CF4]/25"
                          : "border-zinc-200/60 dark:border-zinc-700/60 hover:border-zinc-300 dark:hover:border-zinc-600"
                      }`}
                    >
                      {/* clickable area */}
                      <button
                        type="button"
                        onClick={() => {
                          if (isRenaming) return;
                          setActiveProject(proj);
                          setProgress(0);
                          setIsPlaying(false);
                          setGenState("complete");
                        }}
                        className={`w-full text-left p-3.5 bg-gradient-to-br ${proj.colorGrad} outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] cursor-pointer`}
                      >
                        {/* active dot */}
                        {isActive && (
                          <span className="absolute top-2.5 right-2.5 size-2 rounded-full bg-[#713CF4]" />
                        )}

                        {/* title row */}
                        {isRenaming ? (
                          <input
                            type="text"
                            value={renameValue}
                            onChange={(e) => setRenameValue(e.target.value)}
                            onBlur={commitRename}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") commitRename();
                              if (e.key === "Escape") setRenamingId(null);
                            }}
                            autoFocus
                            onClick={(e) => e.stopPropagation()}
                            className="w-full bg-black/30 text-white text-[12px] font-semibold px-2 py-0.5 rounded outline-none focus:ring-1 focus:ring-white/40 mb-1.5"
                          />
                        ) : (
                          <div className="flex items-center gap-1.5 mb-1.5 pr-6">
                            {proj.isFavorite && <Star className="size-3 text-amber-400 shrink-0 fill-amber-400" />}
                            <span className="text-[11.5px] font-semibold text-white/90 line-clamp-1">{proj.title}</span>
                          </div>
                        )}

                        {/* badges row */}
                        <div className="flex items-center gap-1.5 mb-2">
                          <span className="text-[9.5px] font-semibold text-white/70 bg-black/30 px-1.5 py-0.5 rounded-full">{proj.camera}</span>
                          <span className="text-[9.5px] text-white/50">{proj.ratio}</span>
                          <span className="ml-auto text-[9.5px] text-white/50 font-mono">{proj.duration}</span>
                        </div>

                        <p className="text-[11px] text-white/75 line-clamp-2 leading-relaxed">{proj.prompt}</p>

                        <div className="flex items-center justify-between mt-2">
                          <span className="text-[10px] text-white/40">{proj.timestamp}</span>
                          <span className="text-[10px] text-white/40">{proj.model}</span>
                        </div>
                      </button>

                      {/* overflow menu button */}
                      <div className="absolute top-2.5 right-2.5" data-creation-menu>
                        {!isActive && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenMenuId(menuOpen ? null : proj.id);
                            }}
                            aria-label="More options"
                            aria-expanded={menuOpen}
                            className="size-6 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-white transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-white/40"
                          >
                            <MoreHorizontal className="size-3.5" />
                          </button>
                        )}

                        {/* dropdown */}
                        {menuOpen && (
                          <div
                            data-creation-menu
                            className="absolute right-0 top-full mt-1 w-40 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1b1725] shadow-xl z-50 py-1 overflow-hidden"
                          >
                            {[
                              {
                                label: "Rename",
                                icon: <Film className="size-3.5" />,
                                action: () => startRename(proj),
                              },
                              {
                                label: proj.isFavorite ? "Unfavorite" : "Favorite",
                                icon: <Star className={`size-3.5 ${proj.isFavorite ? "fill-amber-400 text-amber-400" : ""}`} />,
                                action: () => handleFavorite(proj.id),
                              },
                              {
                                label: "Duplicate",
                                icon: <Copy className="size-3.5" />,
                                action: () => handleDuplicate(proj),
                              },
                              {
                                label: "Regenerate",
                                icon: <RotateCcw className="size-3.5" />,
                                action: () => handleRegenerate(proj),
                              },
                              {
                                label: "Delete",
                                icon: <Trash2 className="size-3.5" />,
                                action: () => handleDelete(proj.id),
                                danger: true,
                              },
                            ].map((item) => (
                              <button
                                key={item.label}
                                type="button"
                                onClick={item.action}
                                className={`w-full flex items-center gap-2.5 px-3 py-2 text-[12px] font-medium cursor-pointer outline-none transition-colors ${
                                  item.danger
                                    ? "text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                                }`}
                              >
                                <span className={item.danger ? "text-red-400" : "text-zinc-400"}>{item.icon}</span>
                                {item.label}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
