"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Film,
  Camera,
  Crown,
  Volume2,
  VolumeX,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { StudioPrompt } from "@/components/studio/StudioPrompt";
import { StudioPreview } from "@/components/studio/StudioPreview";
import { Button } from "@/components/ui/Button";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";

interface VideoProject {
  id: string;
  title: string;
  prompt: string;
  duration: string;
  ratio: string;
  camera: string;
  colorGrad: string;
  timestamp: string;
}

const SAMPLE_PROJECTS: VideoProject[] = [
  {
    id: "vid-1",
    title: "Cinematic Neo-Seoul Alleyway",
    prompt: "Anamorphic drone pan gliding slowly over glistening rain-soaked neon street at night, 24fps film grain",
    duration: "0:05",
    ratio: "16:9",
    camera: "Slow Drone Pan",
    colorGrad: "from-violet-950 via-indigo-950 to-black",
    timestamp: "2 hours ago",
  },
  {
    id: "vid-2",
    title: "Minimalist Product Reveal 360",
    prompt: "360-degree orbital rotation around floating frosted glass smartwatch, clean studio softbox lighting",
    duration: "0:03",
    ratio: "16:9",
    camera: "Orbital 360",
    colorGrad: "from-zinc-800 via-neutral-900 to-black",
    timestamp: "Yesterday",
  },
  {
    id: "vid-3",
    title: "Vertical SaaS Interface Flythrough",
    prompt: "First-person kinetic push through multi-layered glass cards with purple UI glowing particles",
    duration: "0:05",
    ratio: "9:16",
    camera: "Kinetic Push",
    colorGrad: "from-purple-950 via-[#713CF4]/30 to-black",
    timestamp: "2 days ago",
  },
];

const CAMERA_TRAJECTORIES = [
  { id: "drone-pan", name: "Drone Pan", desc: "Smooth sweeping aerial tracking" },
  { id: "orbital-360", name: "Orbital 360", desc: "Continuous circular subject orbit" },
  { id: "kinetic-push", name: "Kinetic Push", desc: "Dynamic high-speed camera dive" },
  { id: "static-macro", name: "Static Close-up", desc: "Locked-off shallow depth of field" },
];

export function VideoStudioWorkspace() {
  const [prompt, setPrompt] = useState(
    "Anamorphic drone pan gliding slowly over glistening rain-soaked neon street at night, 24fps film grain"
  );
  const [duration, setDuration] = useState("5s");
  const [ratio, setRatio] = useState("16:9");
  const [cameraMotion, setCameraMotion] = useState("drone-pan");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(40);
  const [projects, setProjects] = useState<VideoProject[]>(SAMPLE_PROJECTS);
  const [activeProject, setActiveProject] = useState<VideoProject>(SAMPLE_PROJECTS[0]);

  const { openUpgradeModal } = useUpgradeModal();

  const blueprints = [
    "Anamorphic drone pan over futuristic cyberpunk skyline at twilight",
    "Continuous 360 rotation around minimalist glass headphones on black marble",
    "Hyperlapse zoom descending into lush biophilic office pavilion",
  ];

  // Simulated player scrubber playback timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 4;
        });
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    setTimeout(() => {
      const cameraObj = CAMERA_TRAJECTORIES.find((c) => c.id === cameraMotion);
      const newProj: VideoProject = {
        id: `vid-${Date.now()}`,
        title: prompt.slice(0, 32) + "...",
        prompt,
        duration: duration === "10s" ? "0:10" : duration === "3s" ? "0:03" : "0:05",
        ratio,
        camera: cameraObj?.name || "Drone Pan",
        colorGrad: "from-purple-950/80 via-[#713CF4]/20 to-black",
        timestamp: "Just now",
      };

      setProjects((prev) => [newProj, ...prev]);
      setActiveProject(newProj);
      setIsGenerating(false);
      setProgress(0);
      setIsPlaying(true);
      showToast("Cinematic scene rendered successfully!", "success");
    }, 1500);
  };

  const handleExport = () => {
    showToast("Exporting high-bitrate ProRes video...", "success");
  };

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0C0D11] text-zinc-900 dark:text-zinc-100">
      {/* 1. Responsive Workspace Header */}
      <WorkspaceHeader
        title="Video Studio"
        breadcrumbs={[
          { label: "Workspace" },
          { label: "Video Studio" },
        ]}
        badge={{ text: "PRO", variant: "pro" }}
        subtitle="Prompt-to-video generation with camera trajectory choreography"
        actions={
          <Button
            variant="outline"
            size="xs"
            onClick={() =>
              openUpgradeModal(
                "Upgrade to EchoGPT Pro for 10-second 4K video exports and audio stem synthesis."
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
          {/* Left Column: Script & Trajectory Controls (5 cols on lg) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Prompt Card */}
            <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Scene Script & Direction
                </span>
                <span className="text-[11px] text-[#713CF4] font-medium flex items-center gap-1">
                  <Film className="size-3" />
                  24 FPS Cinematic
                </span>
              </div>

              <StudioPrompt
                prompt={prompt}
                onChange={setPrompt}
                onSubmit={handleGenerate}
                isGenerating={isGenerating}
                buttonText="Generate Scene"
                placeholder="Describe scene action, camera motion, atmosphere, and lighting..."
                templates={blueprints}
                onSelectTemplate={setPrompt}
              />
            </div>

            {/* Camera Trajectory & Scene Settings */}
            <div className="p-4 sm:p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs space-y-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Camera Choreography
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CAMERA_TRAJECTORIES.map((cam) => {
                  const isSelected = cameraMotion === cam.id;
                  return (
                    <button
                      key={cam.id}
                      type="button"
                      onClick={() => setCameraMotion(cam.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer outline-none ${
                        isSelected
                          ? "border-[#713CF4] bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#a78bfa] ring-1 ring-[#713CF4]/30"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-[#161720] text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                        <Camera className="size-3.5 shrink-0" />
                        {cam.name}
                      </div>
                      <div className="text-[10px] text-zinc-400 mt-1 line-clamp-1">
                        {cam.desc}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Duration & Aspect Ratio */}
              <div className="grid grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">
                    Clip Duration
                  </span>
                  <div className="flex gap-1">
                    {["3s", "5s", "10s"].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setDuration(dur)}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer outline-none ${
                          duration === dur
                            ? "bg-[#713CF4]/10 text-[#713CF4] border-[#713CF4]/40"
                            : "bg-zinc-50 dark:bg-[#161720] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {dur}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">
                    Aspect Ratio
                  </span>
                  <div className="flex gap-1">
                    {[
                      { id: "16:9", label: "16:9 Wide" },
                      { id: "9:16", label: "9:16 Reel" },
                    ].map((r) => (
                      <button
                        key={r.id}
                        type="button"
                        onClick={() => setRatio(r.id)}
                        className={`flex-1 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer outline-none ${
                          ratio === r.id
                            ? "bg-[#713CF4]/10 text-[#713CF4] border-[#713CF4]/40"
                            : "bg-zinc-50 dark:bg-[#161720] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Video Player & Projects (7 cols on lg) */}
          <div className="lg:col-span-7 space-y-6">
            <StudioPreview
              title={activeProject.title}
              isGenerating={isGenerating}
              onDownload={handleExport}
              metadata={[
                { label: "Duration", value: activeProject.duration },
                { label: "Camera", value: activeProject.camera },
                { label: "Ratio", value: activeProject.ratio },
                { label: "Resolution", value: "1080p ProRes" },
              ]}
              previewContent={
                <div
                  className={`w-full max-w-xl aspect-${
                    activeProject.ratio === "9:16" ? "[9/16]" : "[16/9]"
                  } rounded-xl bg-gradient-to-br ${
                    activeProject.colorGrad
                  } border border-white/10 shadow-2xl flex flex-col justify-between p-5 relative overflow-hidden group`}
                >
                  {/* Subtle video scanline effect */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />

                  {/* Top Bar */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/40 backdrop-blur-md text-white font-medium">
                      {activeProject.camera}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsMuted(!isMuted)}
                      className="size-7 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white/80 hover:text-white cursor-pointer"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? (
                        <VolumeX className="size-3.5" />
                      ) : (
                        <Volume2 className="size-3.5" />
                      )}
                    </button>
                  </div>

                  {/* Center Play Button */}
                  <div className="my-auto text-center z-10">
                    <button
                      type="button"
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="size-14 rounded-full bg-[#713CF4]/90 hover:bg-[#602ee0] text-white flex items-center justify-center shadow-xl transition-all duration-150 transform hover:scale-105 mx-auto cursor-pointer"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="size-6" />
                      ) : (
                        <Play className="size-6 ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Timeline Controls */}
                  <div className="space-y-2 z-10 bg-black/50 backdrop-blur-md -mx-5 -mb-5 p-4 border-t border-white/10">
                    {/* Interactive Scrubber Bar */}
                    <div
                      className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer relative"
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const pct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                        setProgress(pct);
                      }}
                    >
                      <div
                        className="h-full bg-[#713CF4] rounded-full transition-all duration-75"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-white/70">
                      <span>00:0{Math.floor((progress / 100) * 5)}</span>
                      <span className="font-mono">{activeProject.duration}</span>
                    </div>
                  </div>
                </div>
              }
            />

            {/* Recent Video Projects */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  Recent Video Projects
                </span>
                <span className="text-[11px] text-zinc-400">
                  {projects.length} scenes
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {projects.map((proj) => {
                  const isActive = activeProject.id === proj.id;
                  return (
                    <button
                      key={proj.id}
                      type="button"
                      onClick={() => {
                        setActiveProject(proj);
                        setProgress(0);
                      }}
                      className={`p-3 rounded-xl border text-left bg-gradient-to-br ${
                        proj.colorGrad
                      } transition-all cursor-pointer outline-none ${
                        isActive
                          ? "border-[#713CF4] ring-2 ring-[#713CF4]/40 scale-[1.02]"
                          : "border-zinc-200/80 dark:border-zinc-800 hover:scale-[1.01]"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5 text-white/70 text-[10px]">
                        <span className="font-semibold text-white/90">
                          {proj.camera}
                        </span>
                        <span>{proj.duration}</span>
                      </div>
                      <p className="text-[11px] text-white/80 line-clamp-2 leading-relaxed">
                        {proj.prompt}
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
