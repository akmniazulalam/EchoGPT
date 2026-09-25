"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
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
  Gauge,
  Hash,
  Maximize2,
  MonitorPlay,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { ModelSelector } from "@/components/dashboard/ModelSelector";
import { Button } from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";
import {
  VIDEO_MODELS,
  DEFAULT_VIDEO_MODEL_ID,
  AIModel,
} from "@/config/models";

/* ─── Types ─────────────────────────────────────────────── */
interface VideoProject {
  id: string;
  title: string;
  prompt: string;
  duration: string; // e.g. "0:05"
  ratio: string;
  camera: string;
  model: string;
  colorGrad: string;
  timestamp: string;
}

/* ─── Static Data ────────────────────────────────────────── */
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

const CAMERA_MOTIONS = [
  { id: "drone-pan", label: "Drone Pan", icon: <Camera className="size-3.5" /> },
  { id: "orbital-360", label: "Orbital 360", icon: <RotateCcw className="size-3.5" /> },
  { id: "kinetic-push", label: "Kinetic Push", icon: <Move className="size-3.5" /> },
  { id: "static-macro", label: "Static Close-up", icon: <Maximize2 className="size-3.5" /> },
];

const DURATIONS = ["3s", "5s", "10s"] as const;

// Pre-computed waveform bar values so Math.random is never called during render
const WAVEFORM_BARS = Array.from({ length: 24 }, (_, i) => ({
  height: Math.max(30, Math.floor(Math.random() * 100)),
  delay: `${(i * 0.05).toFixed(2)}s`,
  duration: `${(0.8 + Math.random() * 0.6).toFixed(2)}s`,
}));

const RATIOS = [
  { id: "16:9", label: "16:9" },
  { id: "9:16", label: "9:16" },
  { id: "1:1", label: "1:1" },
] as const;

const SAMPLE_PROJECTS: VideoProject[] = [
  {
    id: "vid-1",
    title: "Cinematic Neo-Seoul",
    prompt:
      "Anamorphic drone pan gliding slowly over glistening rain-soaked neon street at night, 24fps film grain",
    duration: "0:05",
    ratio: "16:9",
    camera: "Drone Pan",
    model: "Veo 3.1 fast",
    colorGrad: "from-violet-950 via-indigo-950 to-black",
    timestamp: "2 hours ago",
  },
  {
    id: "vid-2",
    title: "Product Reveal 360",
    prompt:
      "360-degree orbital rotation around floating frosted glass smartwatch, studio softbox lighting",
    duration: "0:03",
    ratio: "16:9",
    camera: "Orbital 360",
    model: "Veo 3.1 fast",
    colorGrad: "from-zinc-800 via-neutral-900 to-black",
    timestamp: "Yesterday",
  },
  {
    id: "vid-3",
    title: "SaaS Interface Flythrough",
    prompt:
      "First-person kinetic push through multi-layered glass cards with purple UI glowing particles",
    duration: "0:05",
    ratio: "9:16",
    camera: "Kinetic Push",
    model: "Kling v1.5",
    colorGrad: "from-purple-950 via-[#713CF4]/30 to-black",
    timestamp: "2 days ago",
  },
];

/* ─── Helpers ─────────────────────────────────────────────── */
function formatCountdown(secs: number) {
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

/* ─── Component ───────────────────────────────────────────── */
export function VideoStudioWorkspace() {
  /* prompt */
  const [prompt, setPrompt] = useState(
    "Anamorphic drone pan gliding slowly over glistening rain-soaked neon street at night, 24fps film grain"
  );
  /* controls */
  const [duration, setDuration] = useState<(typeof DURATIONS)[number]>("5s");
  const [ratio, setRatio] = useState("16:9");
  const [cameraMotion, setCameraMotion] = useState("drone-pan");
  /* model */
  const [selectedModelId, setSelectedModelId] = useState(DEFAULT_VIDEO_MODEL_ID);
  /* templates popover */
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const templatesRef = useRef<HTMLDivElement>(null);
  /* advanced collapsible */
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [motionIntensity, setMotionIntensity] = useState(50);
  const [speed, setSpeed] = useState("normal");
  const [seed, setSeed] = useState("");
  const [quality, setQuality] = useState("high");
  /* generation state */
  type GenState = "idle" | "generating" | "complete";
  const [genState, setGenState] = useState<GenState>("complete"); // start with a preview
  const [countdown, setCountdown] = useState(0);
  /* player */
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(40);
  /* library */
  const [projects, setProjects] = useState<VideoProject[]>(SAMPLE_PROJECTS);
  const [activeProject, setActiveProject] = useState<VideoProject>(SAMPLE_PROJECTS[0]);

  const { openUpgradeModal } = useUpgradeModal();

  /* derived */
  const selectedModel = useMemo(
    () => VIDEO_MODELS.find((m) => m.id === selectedModelId) || VIDEO_MODELS[0],
    [selectedModelId]
  );

  /* ── playback scrubber timer ─────────────────────────── */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 3;
        });
      }, 120);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  /* ── countdown timer during generation ─────────────── */
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (genState === "generating" && countdown > 0) {
      interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [genState, countdown]);

  /* ── close templates popover on outside click ────────── */
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (templatesRef.current && !templatesRef.current.contains(e.target as Node)) {
        setTemplatesOpen(false);
      }
    }
    if (templatesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [templatesOpen]);

  /* ── generate handler ────────────────────────────────── */
  const handleGenerate = () => {
    if (!prompt.trim() || genState === "generating") return;

    if (selectedModel.isPro) {
      openUpgradeModal(
        `${selectedModel.name} is an EchoGPT Pro video model. Upgrade to unlock premium video generation engines.`
      );
      return;
    }

    const totalSeconds = duration === "10s" ? 18 : duration === "3s" ? 12 : 15;
    setGenState("generating");
    setCountdown(totalSeconds);
    setIsPlaying(false);
    setProgress(0);

    setTimeout(() => {
      const cam = CAMERA_MOTIONS.find((c) => c.id === cameraMotion);
      const durationLabel =
        duration === "10s" ? "0:10" : duration === "3s" ? "0:03" : "0:05";
      const newProj: VideoProject = {
        id: `vid-${Date.now()}`,
        title: prompt.slice(0, 30) + (prompt.length > 30 ? "…" : ""),
        prompt,
        duration: durationLabel,
        ratio,
        camera: cam?.label || "Drone Pan",
        model: selectedModel.name,
        colorGrad: "from-purple-950/80 via-[#713CF4]/20 to-black",
        timestamp: "Just now",
      };
      setProjects((prev) => [newProj, ...prev]);
      setActiveProject(newProj);
      setGenState("complete");
      setCountdown(0);
      setProgress(0);
      setIsPlaying(true);
      showToast("Scene rendered successfully!", "success");
    }, totalSeconds * 1000);
  };

  /* ── export handler ──────────────────────────────────── */
  const handleExport = () => {
    openUpgradeModal("Upgrade to EchoGPT Pro to export high-bitrate ProRes video files.");
  };

  /* ── computed clip time display ──────────────────────── */
  const clipSeconds = activeProject.duration === "0:10" ? 10 : activeProject.duration === "0:03" ? 3 : 5;
  const currentSecond = Math.floor((progress / 100) * clipSeconds);
  const currentTimeStr = `0:0${currentSecond}`;

  /* ─────────────────────────────── RENDER ────────────────────────────────── */
  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100">
      {/* ── Header ──────────────────────────────────────────── */}
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
                "Upgrade to EchoGPT Pro for 10-second 4K video exports, Sora, Kling v1.5, and Runway Gen-3 access."
              )
            }
            leftIcon={<Crown className="size-3.5 text-[#713CF4]" />}
          >
            Pro Features
          </Button>
        }
      />

      {/* ── Scrollable body ──────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-7">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ── MAIN STUDIO GRID: controls (5) | preview (7) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">

            {/* ════════════ LEFT: Creation Controls (5 cols) ════════════ */}
            <div className="lg:col-span-5 space-y-4">

              {/* ── PROMPT CARD ────────────────────────────────── */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs overflow-hidden">
                {/* card header */}
                <div className="flex items-center justify-between px-4 pt-4 pb-2">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                    Scene Prompt
                  </span>
                  {/* Scene Templates popover trigger */}
                  <div ref={templatesRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setTemplatesOpen((o) => !o)}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1b1725] text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4]"
                    >
                      <Sparkles className="size-3 text-[#713CF4]" />
                      Scene Templates
                      <ChevronDown
                        className={`size-3 transition-transform duration-150 ${templatesOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    {templatesOpen && (
                      <div className="absolute right-0 top-full mt-1.5 w-72 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1b1725] shadow-xl z-30 p-1.5 space-y-0.5 animate-in fade-in-50 zoom-in-95 duration-100">
                        <p className="px-2.5 pt-1 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                          Quick Starts
                        </p>
                        {SCENE_TEMPLATES.map((t, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setPrompt(t.text);
                              setTemplatesOpen(false);
                            }}
                            className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors group cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4]"
                          >
                            <p className="text-[12px] font-medium text-zinc-800 dark:text-zinc-200 group-hover:text-[#713CF4] transition-colors">
                              {t.label}
                            </p>
                            <p className="text-[10.5px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                              {t.text}
                            </p>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* textarea */}
                <div className="px-4 pb-0">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your scene: action, atmosphere, camera movement, lighting..."
                    rows={4}
                    disabled={genState === "generating"}
                    className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-[13.5px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 p-3.5 leading-relaxed outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />
                </div>

                {/* inline bottom toolbar */}
                <div className="flex items-center gap-2 px-4 py-3 flex-wrap">
                  {/* Duration pills */}
                  <div className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] p-0.5">
                    {DURATIONS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setDuration(d)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer outline-none transition-colors ${
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
                  <div className="flex items-center gap-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] p-0.5">
                    {RATIOS.map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRatio(r.id)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer outline-none transition-colors ${
                          ratio === r.id
                            ? "bg-[#713CF4] text-white shadow-xs"
                            : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>

                  {/* Model selector */}
                  <ModelSelector
                    models={VIDEO_MODELS}
                    selectedModelId={selectedModelId}
                    onSelectModel={(m: AIModel) => setSelectedModelId(m.id)}
                    align="left"
                    headerTitle="Video Engine"
                    triggerClassName="text-[11px] h-7 px-2.5"
                    allowProSelection={false}
                  />

                  {/* Generate CTA */}
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || genState === "generating"}
                    isLoading={genState === "generating"}
                    leftIcon={genState !== "generating" ? <Film className="size-3.5" /> : undefined}
                    className="ml-auto"
                  >
                    {genState === "generating" ? "Rendering…" : "Generate"}
                  </Button>
                </div>

                {/* generation info */}
                <p className="px-4 pb-3 text-[11px] text-zinc-400 dark:text-zinc-500">
                  Each video uses 1 message from your plan · takes a few minutes to render.
                </p>
              </div>

              {/* ── SECONDARY CONTROLS: Camera Motion ──────────── */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs p-4 space-y-3">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  Camera Motion
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  {CAMERA_MOTIONS.map((cam) => {
                    const active = cameraMotion === cam.id;
                    return (
                      <button
                        key={cam.id}
                        type="button"
                        onClick={() => setCameraMotion(cam.id)}
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
              </div>

              {/* ── TERTIARY: Advanced Settings Collapsible ──────── */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setAdvancedOpen((o) => !o)}
                  className="w-full flex items-center justify-between px-4 py-3 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Gauge className="size-3.5" />
                    Advanced Settings
                  </span>
                  {advancedOpen ? (
                    <ChevronUp className="size-3.5" />
                  ) : (
                    <ChevronDown className="size-3.5" />
                  )}
                </button>

                {advancedOpen && (
                  <div className="px-4 pb-4 space-y-4 border-t border-zinc-100 dark:border-zinc-800 pt-3">
                    {/* Motion Intensity */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                          <Move className="size-3 text-zinc-400" />
                          Motion Intensity
                        </label>
                        <span className="text-[11px] font-mono text-[#713CF4]">{motionIntensity}</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={motionIntensity}
                        onChange={(e) => setMotionIntensity(Number(e.target.value))}
                        className="w-full h-1.5 accent-[#713CF4] cursor-pointer"
                      />
                    </div>

                    {/* Speed */}
                    <div>
                      <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5 mb-1.5">
                        <Gauge className="size-3 text-zinc-400" />
                        Speed
                      </label>
                      <div className="flex gap-1.5">
                        {["slow", "normal", "fast"].map((s) => (
                          <button
                            key={s}
                            type="button"
                            onClick={() => setSpeed(s)}
                            className={`flex-1 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer outline-none capitalize transition-colors ${
                              speed === s
                                ? "bg-[#713CF4]/10 text-[#713CF4] border-[#713CF4]/40"
                                : "bg-zinc-50 dark:bg-[#161720] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quality */}
                    <div>
                      <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5 mb-1.5">
                        <MonitorPlay className="size-3 text-zinc-400" />
                        Quality
                      </label>
                      <div className="flex gap-1.5">
                        {["draft", "high", "4K"].map((q) => (
                          <button
                            key={q}
                            type="button"
                            onClick={() => {
                              if (q === "4K") {
                                openUpgradeModal("4K export quality requires EchoGPT Pro.");
                                return;
                              }
                              setQuality(q);
                            }}
                            className={`flex-1 py-1.5 rounded-lg border text-[11px] font-semibold cursor-pointer outline-none transition-colors ${
                              quality === q
                                ? "bg-[#713CF4]/10 text-[#713CF4] border-[#713CF4]/40"
                                : "bg-zinc-50 dark:bg-[#161720] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                            }`}
                          >
                            {q === "4K" ? "4K PRO" : q}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Seed */}
                    <div>
                      <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5 mb-1.5">
                        <Hash className="size-3 text-zinc-400" />
                        Seed (optional)
                      </label>
                      <input
                        type="number"
                        min={0}
                        value={seed}
                        onChange={(e) => setSeed(e.target.value)}
                        placeholder="Random"
                        className="w-full px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-[12px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-[#713CF4] focus:ring-1 focus:ring-[#713CF4]/30 transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ════════════ RIGHT: Preview Canvas (7 cols) ════════════ */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs overflow-hidden">

                {/* preview header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <Clapperboard className="size-4 text-zinc-400" />
                    <span className="text-[12px] font-semibold text-zinc-700 dark:text-zinc-300 truncate max-w-48 sm:max-w-72">
                      {genState === "generating" ? "Rendering scene…" : activeProject.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] text-zinc-400 dark:text-zinc-500 hidden sm:block">
                      {activeProject.ratio} · {activeProject.duration} · {activeProject.model}
                    </span>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={handleExport}
                      disabled={genState !== "complete"}
                      leftIcon={<Download className="size-3" />}
                    >
                      Export
                    </Button>
                  </div>
                </div>

                {/* ── PREVIEW CANVAS ─────────────────────────────── */}
                <div className="relative bg-black flex items-center justify-center min-h-[260px] sm:min-h-[320px]">

                  {/* ── IDLE STATE ─── */}
                  {genState === "idle" && (
                    <div className="flex flex-col items-center gap-3 text-center px-6 py-12">
                      <div className="size-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                        <Film className="size-6 text-zinc-400" />
                      </div>
                      <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Describe a scene above and click Generate
                      </p>
                    </div>
                  )}

                  {/* ── GENERATING STATE ─── */}
                  {genState === "generating" && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/90">
                      {/* cinematic pulsing animation */}
                      <div className="relative flex items-center justify-center">
                        <div className="absolute size-20 rounded-full border-2 border-[#713CF4]/30 animate-ping" />
                        <div className="absolute size-14 rounded-full border border-[#713CF4]/50 animate-pulse" />
                        <div className="size-10 rounded-full bg-[#713CF4]/20 flex items-center justify-center">
                          <Film className="size-5 text-[#713CF4]" />
                        </div>
                      </div>
                      <div className="text-center space-y-1">
                        <p className="text-white text-sm font-semibold">Rendering cinematic scene…</p>
                        <p className="text-zinc-400 text-xs">Using {selectedModel.name}</p>
                      </div>
                      {/* countdown */}
                      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10">
                        <Clock className="size-3.5 text-[#713CF4]" />
                        <span className="text-white text-[12px] font-mono font-medium">
                          ETA ~{formatCountdown(countdown)}
                        </span>
                      </div>
                      {/* waveform bar decorations */}
                      <div className="flex items-end gap-0.5 h-6">
                        {WAVEFORM_BARS.map((bar, i) => (
                          <div
                            key={i}
                            className="w-1 rounded-full bg-[#713CF4]/60 animate-pulse"
                            style={{
                              height: `${bar.height}%`,
                              animationDelay: bar.delay,
                              animationDuration: bar.duration,
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ── COMPLETE STATE: Video Player ─── */}
                  {genState === "complete" && (
                    <div
                      className={`w-full relative bg-gradient-to-br ${activeProject.colorGrad} flex flex-col justify-between`}
                      style={{ minHeight: 260 }}
                    >
                      {/* scanline texture */}
                      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.22)_50%)] bg-[length:100%_4px] pointer-events-none opacity-30" />

                      {/* top bar */}
                      <div className="flex items-center justify-between p-4 z-10 relative">
                        <span className="text-[10px] px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/80 font-medium border border-white/10">
                          {activeProject.camera} · {activeProject.ratio}
                        </span>
                        <button
                          type="button"
                          onClick={() => setIsMuted(!isMuted)}
                          className="size-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white cursor-pointer border border-white/10 transition-colors"
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? <VolumeX className="size-3.5" /> : <Volume2 className="size-3.5" />}
                        </button>
                      </div>

                      {/* center play button */}
                      <div className="flex-1 flex items-center justify-center z-10 relative py-8">
                        <button
                          type="button"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="size-14 rounded-full bg-white/15 hover:bg-[#713CF4]/90 border border-white/25 hover:border-transparent text-white flex items-center justify-center shadow-2xl transition-all duration-200 hover:scale-110 cursor-pointer backdrop-blur-sm"
                          aria-label={isPlaying ? "Pause video" : "Play video"}
                        >
                          {isPlaying ? (
                            <Pause className="size-6" />
                          ) : (
                            <Play className="size-6 ml-0.5" />
                          )}
                        </button>
                      </div>

                      {/* bottom player controls */}
                      <div className="z-10 relative bg-gradient-to-t from-black/70 to-transparent -mx-0 px-4 pb-4 pt-6 space-y-2">
                        {/* scrubber */}
                        <div
                          className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative group"
                          onClick={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            const pct = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                            setProgress(pct);
                          }}
                        >
                          <div
                            className="h-full bg-[#713CF4] rounded-full transition-all duration-75"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        {/* time row */}
                        <div className="flex items-center justify-between text-[10.5px] text-white/60 font-mono">
                          <span>{currentTimeStr}</span>
                          <span>{activeProject.duration}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* ── REGENERATE / reset to idle ───────────────── */}
                {genState === "complete" && (
                  <div className="flex items-center gap-2 px-4 py-3 border-t border-zinc-100 dark:border-zinc-800">
                    <Button
                      variant="ghost"
                      size="xs"
                      onClick={() => {
                        setGenState("idle");
                        setIsPlaying(false);
                        setProgress(0);
                      }}
                      leftIcon={<RotateCcw className="size-3" />}
                    >
                      New scene
                    </Button>
                    <span className="text-[10.5px] text-zinc-400 ml-auto truncate max-w-[200px] sm:max-w-xs">
                      {activeProject.prompt}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ════════════ RECENT VIDEO LIBRARY (full-width below) ════════════ */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                Your Creations
              </span>
              <span className="text-[11px] text-zinc-400">
                {projects.length} {projects.length === 1 ? "scene" : "scenes"}
              </span>
            </div>

            {projects.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#121319] py-10 flex flex-col items-center gap-2 text-center">
                <MonitorPlay className="size-6 text-zinc-300 dark:text-zinc-600" />
                <p className="text-sm text-zinc-400 dark:text-zinc-500">
                  Nothing here yet — describe a scene above to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {projects.map((proj) => {
                  const isActive = activeProject.id === proj.id;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => {
                        setActiveProject(proj);
                        setProgress(0);
                        setIsPlaying(false);
                        setGenState("complete");
                      }}
                      className={`relative p-3.5 rounded-xl border text-left bg-gradient-to-br ${proj.colorGrad} transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#713CF4] overflow-hidden group ${
                        isActive
                          ? "border-[#713CF4] ring-2 ring-[#713CF4]/30"
                          : "border-zinc-200/50 dark:border-zinc-700/50 hover:border-zinc-300 dark:hover:border-zinc-600"
                      }`}
                    >
                      {/* active indicator */}
                      {isActive && (
                        <span className="absolute top-2 right-2 size-2 rounded-full bg-[#713CF4] ring-2 ring-[#713CF4]/30" />
                      )}
                      {/* dismiss button - only on non-active */}
                      {!isActive && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setProjects((prev) => prev.filter((p) => p.id !== proj.id));
                          }}
                          className="absolute top-2 right-2 size-5 rounded-full bg-black/30 backdrop-blur-sm text-white/60 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          title="Remove"
                        >
                          <X className="size-3" />
                        </button>
                      )}

                      <div className="flex items-center gap-1.5 mb-1.5">
                        <span className="text-[10px] font-semibold text-white/80 bg-black/30 px-1.5 py-0.5 rounded-full">
                          {proj.camera}
                        </span>
                        <span className="text-[10px] text-white/50">{proj.ratio}</span>
                        <span className="ml-auto text-[10px] text-white/50 font-mono">{proj.duration}</span>
                      </div>

                      <p className="text-[11.5px] text-white/85 line-clamp-2 leading-relaxed">
                        {proj.prompt}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <span className="text-[10px] text-white/40">{proj.timestamp}</span>
                        <span className="text-[10px] text-white/40">{proj.model}</span>
                      </div>
                    </button>
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
