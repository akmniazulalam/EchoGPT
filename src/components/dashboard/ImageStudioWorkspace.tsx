"use client";

import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import {
  Image as ImageIcon,
  Sparkles,
  Crown,
  Copy,
  Check,
  Download,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Layers,
  Wand2,
  Sliders,
  Search,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  AlertCircle,
  X,
  Palette,
  Camera,
  Film,
  Box,
  Brush,
  Compass,
  FileText,
} from "lucide-react";
import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { ModelSelector } from "@/components/dashboard/ModelSelector";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { showToast } from "@/components/ui/Toast";
import { useUpgradeModal } from "@/context/UpgradeModalContext";
import { IMAGE_MODELS, DEFAULT_IMAGE_MODEL_ID, AIModel } from "@/config/models";
import { CreationCard, CreationItem } from "@/components/dashboard/CreationCard";

/* ─────────────────────── Types ────────────────────────── */
type GenState = "idle" | "generating" | "processing" | "complete" | "error";

interface GeneratedImage {
  id: string;
  title?: string;
  prompt: string;
  style: string;
  ratio: string;
  model: string;
  colorGrad: string;
  timestamp: string;
  isFavorite?: boolean;
  batchIndex?: number;
  batchTotal?: number;
  cfg?: number;
  seed?: string;
}

interface StyleOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  desc: string;
}

interface CuratedPrompt {
  id: string;
  category: "Product" | "Portrait" | "Landscape" | "Illustration" | "Architecture" | "Marketing" | "Creative";
  title: string;
  prompt: string;
}

/* ─────────────────────── Constants ─────────────────────── */
const MAX_PROMPT_LENGTH = 1000;

const STYLES: StyleOption[] = [
  { id: "3d-render", name: "3D Isometric", icon: <Box className="size-3.5" />, desc: "Clean geometric render with soft studio shadows" },
  { id: "photorealistic", name: "Photorealistic", icon: <Camera className="size-3.5" />, desc: "8K photographic depth and authentic texture" },
  { id: "cinematic", name: "Cinematic", icon: <Film className="size-3.5" />, desc: "Dramatic lighting, anamorphic bokeh, film grain" },
  { id: "product", name: "Product Studio", icon: <Sparkles className="size-3.5" />, desc: "Three-point softbox studio lighting on plinth" },
  { id: "anime", name: "Digital Anime", icon: <Palette className="size-3.5" />, desc: "Modern Japanese animation art style with cel shading" },
  { id: "illustration", name: "Illustration", icon: <Brush className="size-3.5" />, desc: "Editorial vector artwork with clean color blocks" },
];

const ASPECT_RATIOS = [
  { id: "1:1", label: "1:1 Square" },
  { id: "16:9", label: "16:9 Cinema" },
  { id: "9:16", label: "9:16 Story" },
  { id: "4:3", label: "4:3 Classic" },
];

const BATCH_COUNTS = [1, 2, 4] as const;

const CURATED_PROMPTS: CuratedPrompt[] = [
  {
    id: "p1",
    category: "Product",
    title: "Minimalist Smartwatch Plinth",
    prompt: "Studio product shot of transparent frosted glass smartwatch on brushed titanium plate, softbox key lighting, clean neutral studio background, 8k resolution",
  },
  {
    id: "p2",
    category: "Product",
    title: "Luxury Fragrance Bottle",
    prompt: "Sleek geometric glass perfume bottle with gold mist cap, floating water droplets, soft caustics, dark slate backdrop, ray-traced reflections",
  },
  {
    id: "p3",
    category: "Portrait",
    title: "Editorial Studio Headshot",
    prompt: "Cinematic headshot portrait with rim lighting, natural skin texture, shallow depth of field with 85mm f/1.4 lens, neutral grey backdrop",
  },
  {
    id: "p4",
    category: "Portrait",
    title: "Cyberpunk Neon Character",
    prompt: "Portrait of a tech nomad wearing iridescent streetwear, violet and cyan neon rim lights reflecting on rain-soaked collar, dark futuristic alleyway",
  },
  {
    id: "p5",
    category: "Landscape",
    title: "Biophilic Alpine Valley",
    prompt: "Lush alpine valley at sunrise with morning mist weaving through evergreen pines, warm golden hour sunbeams, crystalline glacier lake reflection",
  },
  {
    id: "p6",
    category: "Architecture",
    title: "Parametric Pavilion",
    prompt: "Modern architectural pavilion with curved timber slats and cantilevered glass canopy, diffused skylight, minimalist concrete courtyard",
  },
  {
    id: "p7",
    category: "Illustration",
    title: "Isometric SaaS Ecosystem",
    prompt: "Minimalist 3D isometric dashboard floating in dark space with glowing #713CF4 nodes, interconnected glass cards, clean vector aesthetic",
  },
  {
    id: "p8",
    category: "Marketing",
    title: "Fintech Hero Graphic",
    prompt: "Abstract metallic sphere surrounded by orbiting holographic currency rings, soft purple and indigo gradient lighting, premium SaaS landing hero",
  },
  {
    id: "p9",
    category: "Creative",
    title: "Iridescent Soap Membranes",
    prompt: "Microscopic macro lens view of iridescent soap-bubble films bursting in ultra-slow motion, kaleidoscopic chromatic aberration, pitch black backdrop",
  },
];

const CURATED_CATEGORIES = ["All", "Product", "Portrait", "Landscape", "Architecture", "Illustration", "Marketing", "Creative"] as const;

const INITIAL_GALLERY: GeneratedImage[] = [
  {
    id: "img-1",
    title: "Isometric SaaS Dashboard",
    prompt: "Minimalist 3D isometric dashboard floating in dark space with glowing #713CF4 nodes",
    style: "3D Isometric",
    ratio: "16:9",
    model: "Flux Pro",
    colorGrad: "from-violet-900/60 via-purple-950/40 to-black",
    timestamp: "10m ago",
    isFavorite: true,
    cfg: 7.5,
    seed: "48201",
  },
  {
    id: "img-2",
    title: "Organic Concrete Atrium",
    prompt: "Futuristic architectural atrium with curved organic concrete fins and diffused skylight",
    style: "Photorealistic",
    ratio: "1:1",
    model: "Midjourney v6",
    colorGrad: "from-slate-800 via-zinc-900 to-black",
    timestamp: "1h ago",
    isFavorite: false,
    cfg: 8.0,
    seed: "19284",
  },
  {
    id: "img-3",
    title: "Titanium Glass Headphones",
    prompt: "Studio product shot of transparent glass headphones on brushed titanium plate",
    style: "Product Studio",
    ratio: "1:1",
    model: "DALL-E 3",
    colorGrad: "from-indigo-950/80 via-zinc-900 to-black",
    timestamp: "3h ago",
    isFavorite: true,
    cfg: 7.0,
    seed: "93821",
  },
  {
    id: "img-4",
    title: "Cyberpunk Rain Street",
    prompt: "Cyberpunk Tokyo rain street at twilight with violet neon reflections on asphalt",
    style: "Cinematic",
    ratio: "9:16",
    model: "Flux Pro",
    colorGrad: "from-fuchsia-950/70 via-purple-950/40 to-black",
    timestamp: "Yesterday",
    isFavorite: false,
    cfg: 9.0,
    seed: "77215",
  },
];

/* ─────────────────────── Component ─────────────────────── */
export function ImageStudioWorkspace() {
  /* — prompt state — */
  const [prompt, setPrompt] = useState(
    "Minimalist 3D isometric dashboard floating in dark space with glowing #713CF4 nodes"
  );
  const [isEnhancing, setIsEnhancing] = useState<"enhance" | "rewrite" | "expand" | null>(null);

  /* — controls — */
  const [selectedModel, setSelectedModel] = useState(DEFAULT_IMAGE_MODEL_ID);
  const [selectedStyle, setSelectedStyle] = useState("3d-render");
  const [selectedRatio, setSelectedRatio] = useState("16:9");
  const [batchCount, setBatchCount] = useState<number>(1);
  const [activeBatchIndex, setActiveBatchIndex] = useState(0);

  /* — progressive disclosure: explore prompts & advanced — */
  const [exploreOpen, setExploreOpen] = useState(false);
  const [exploreSearch, setExploreSearch] = useState("");
  const [exploreCategory, setExploreCategory] = useState<string>("All");
  const exploreRef = useRef<HTMLDivElement>(null);

  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [negativePrompt, setNegativePrompt] = useState("");
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [steps, setSteps] = useState("30");
  const [seed, setSeed] = useState("");
  const [detailLevel, setDetailLevel] = useState("high");
  const [lightingStyle, setLightingStyle] = useState("studio");

  /* — generation workflow state — */
  const [genState, setGenState] = useState<GenState>("complete");
  const [genProgress, setGenProgress] = useState(100);
  const genTimerRef = useRef<NodeJS.Timeout | null>(null);

  /* — preview & export — */
  const [gallery, setGallery] = useState<GeneratedImage[]>(INITIAL_GALLERY);
  const [activeImage, setActiveImage] = useState<GeneratedImage | null>(INITIAL_GALLERY[0]);
  const [isCopied, setIsCopied] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);
  const previewCanvasRef = useRef<HTMLDivElement>(null);

  const { openUpgradeModal } = useUpgradeModal();

  /* — derived model and style — */
  const activeModelObj = useMemo(
    () => IMAGE_MODELS.find((m) => m.id === selectedModel) || IMAGE_MODELS[0],
    [selectedModel]
  );
  const activeStyleObj = useMemo(
    () => STYLES.find((s) => s.id === selectedStyle) || STYLES[0],
    [selectedStyle]
  );

  /* ── Outside click handlers ── */
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (exploreRef.current && !exploreRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    }
    if (exploreOpen) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [exploreOpen]);

  useEffect(() => {
    function handle(e: MouseEvent) {
      if (exportRef.current && !exportRef.current.contains(e.target as Node)) {
        setExportOpen(false);
      }
    }
    if (exportOpen) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [exportOpen]);

  /* ── Cleanup timer ── */
  useEffect(() => {
    return () => {
      if (genTimerRef.current) clearTimeout(genTimerRef.current);
    };
  }, []);

  /* ── Filtered Curated Prompts ── */
  const filteredCuratedPrompts = useMemo(() => {
    return CURATED_PROMPTS.filter((p) => {
      const matchesCat = exploreCategory === "All" || p.category === exploreCategory;
      const matchesSearch =
        !exploreSearch.trim() ||
        p.title.toLowerCase().includes(exploreSearch.toLowerCase()) ||
        p.prompt.toLowerCase().includes(exploreSearch.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [exploreCategory, exploreSearch]);

  /* ── Prompt Transformation Actions (Deterministic Frontend Mocks) ── */
  const handleEnhance = useCallback(() => {
    if (!prompt.trim() || isEnhancing || genState === "generating") return;
    setIsEnhancing("enhance");
    setTimeout(() => {
      setPrompt((prev) => {
        const clean = prev.trim().replace(/\.+$/, "");
        return `${clean}, with soft volumetric studio lighting, hyper-detailed micro-textures, ray-traced ambient occlusion, 8K ultra-sharp focus`;
      });
      setIsEnhancing(null);
      showToast("Prompt enhanced with studio lighting & textures!", "success");
    }, 700);
  }, [prompt, isEnhancing, genState]);

  const handleRewrite = useCallback(() => {
    if (!prompt.trim() || isEnhancing || genState === "generating") return;
    setIsEnhancing("rewrite");
    setTimeout(() => {
      setPrompt((prev) => {
        const clean = prev.trim().replace(/\.+$/, "");
        return `Masterfully composed editorial photograph of ${clean}, shot on Hasselblad H6D-100c with 80mm prime lens, clean geometric balance, pristine color grading`;
      });
      setIsEnhancing(null);
      showToast("Prompt rewritten with artistic director composition!", "success");
    }, 700);
  }, [prompt, isEnhancing, genState]);

  const handleExpand = useCallback(() => {
    if (!prompt.trim() || isEnhancing || genState === "generating") return;
    setIsEnhancing("expand");
    setTimeout(() => {
      setPrompt((prev) => {
        const clean = prev.trim().replace(/\.+$/, "");
        return `${clean}, situated in an expansive architectural setting, layered foreground and background depth, refined color palette with violet accents, high aesthetic coherence`;
      });
      setIsEnhancing(null);
      showToast("Prompt expanded with environmental depth & palette!", "success");
    }, 700);
  }, [prompt, isEnhancing, genState]);

  /* ── Generate Action ── */
  const handleGenerate = useCallback(() => {
    if (!prompt.trim() || genState === "generating" || genState === "processing") return;

    if (activeModelObj.isPro) {
      openUpgradeModal(
        `${activeModelObj.name} is an EchoGPT Pro model. Upgrade to access frontier neural generation.`
      );
      return;
    }

    setGenState("generating");
    setGenProgress(20);
    setActiveBatchIndex(0);

    // Step 1: generating (0-60%)
    const t1 = setTimeout(() => {
      setGenProgress(65);
      setGenState("processing");

      // Step 2: processing (65-100%)
      const t2 = setTimeout(() => {
        setGenProgress(100);

        const colorMap: Record<string, string> = {
          "3d-render": "from-violet-900/60 via-purple-950/40 to-black",
          photorealistic: "from-indigo-950/80 via-zinc-900 to-black",
          cinematic: "from-fuchsia-950/70 via-purple-950/40 to-black",
          product: "from-slate-800 via-zinc-900 to-black",
          anime: "from-pink-950/70 via-indigo-950/40 to-black",
          illustration: "from-purple-950/70 via-zinc-900 to-black",
        };

        const assignedGrad = colorMap[selectedStyle] || "from-violet-900/60 via-purple-950/40 to-black";
        const assignedTitle = prompt.length > 32 ? `${prompt.slice(0, 32).trim()}...` : prompt;

        setGallery((prev) => {
          const generatedItems: GeneratedImage[] = [];
          for (let i = 0; i < batchCount; i++) {
            generatedItems.push({
              id: `img-${Date.now()}-${i}`,
              title: assignedTitle,
              prompt,
              style: activeStyleObj.name,
              ratio: selectedRatio,
              model: activeModelObj.name,
              colorGrad: assignedGrad,
              timestamp: "Just now",
              isFavorite: false,
              batchIndex: i,
              batchTotal: batchCount,
              cfg: guidanceScale,
              seed: seed || String(Math.floor(10000 + (i * 1234) % 90000)),
            });
          }
          return [...generatedItems, ...prev];
        });

        const newPrimaryImg: GeneratedImage = {
          id: `img-${Date.now()}-0`,
          title: assignedTitle,
          prompt,
          style: activeStyleObj.name,
          ratio: selectedRatio,
          model: activeModelObj.name,
          colorGrad: assignedGrad,
          timestamp: "Just now",
          isFavorite: false,
          batchIndex: 0,
          batchTotal: batchCount,
          cfg: guidanceScale,
          seed: seed || "48201",
        };
        setActiveImage(newPrimaryImg);
        setGenState("complete");
        showToast(
          batchCount > 1
            ? `Batch of ${batchCount} images generated successfully!`
            : "Artwork generated successfully!",
          "success"
        );
      }, 1000);
      genTimerRef.current = t2;
    }, 1200);
    genTimerRef.current = t1;
  }, [prompt, genState, activeModelObj, openUpgradeModal, selectedStyle, activeStyleObj, selectedRatio, batchCount, guidanceScale, seed]);

  /* ── Cancel Action ── */
  const handleCancel = useCallback(() => {
    if (genTimerRef.current) clearTimeout(genTimerRef.current);
    setGenState("idle");
    setGenProgress(0);
  }, []);

  /* ── Reset / New Artwork ── */
  const handleNewArtwork = useCallback(() => {
    if (genTimerRef.current) clearTimeout(genTimerRef.current);
    setPrompt("");
    setSelectedStyle("3d-render");
    setSelectedRatio("16:9");
    setBatchCount(1);
    setAdvancedOpen(false);
    setGenState("idle");
    setGenProgress(0);
    setZoomLevel(100);
  }, []);

  /* ── Copy Prompt ── */
  const handleCopyPrompt = () => {
    if (!activeImage) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(activeImage.prompt);
      setIsCopied(true);
      showToast("Prompt copied to clipboard!", "success");
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  /* ── Export Action ── */
  const handleExportFormat = (format: "PNG" | "JPG" | "WebP" | "4K") => {
    setExportOpen(false);
    if (format === "4K") {
      openUpgradeModal("4K Master resolution export requires EchoGPT Pro.");
      return;
    }
    showToast(`Exported artwork as ${format}!`, "success");
  };

  /* ── Creation Card Actions ── */
  const handleFavorite = (id: string) => {
    setGallery((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      )
    );
    if (activeImage?.id === id) {
      setActiveImage((prev) => (prev ? { ...prev, isFavorite: !prev.isFavorite } : prev));
    }
  };

  const handleDuplicate = (item: CreationItem) => {
    setGallery((prev) => {
      const newId = `img-${Date.now()}`;
      const original = prev.find((i) => i.id === item.id);
      const duplicate: GeneratedImage = {
        id: newId,
        title: `${item.title || original?.title || "Artwork"} (copy)`,
        prompt: item.prompt,
        style: item.badge || original?.style || "3D Isometric",
        ratio: item.ratio,
        model: item.model,
        colorGrad: item.colorGrad,
        timestamp: "Just now",
        isFavorite: false,
        batchIndex: item.batchIndex,
        batchTotal: item.batchTotal,
        cfg: original?.cfg,
        seed: original?.seed,
      };
      const idx = prev.findIndex((i) => i.id === item.id);
      const next = [...prev];
      if (idx !== -1) {
        next.splice(idx + 1, 0, duplicate);
      } else {
        next.unshift(duplicate);
      }
      return next;
    });
    showToast("Artwork duplicated.", "success");
  };

  const handleRegenerate = (item: CreationItem) => {
    setPrompt(item.prompt);
    const matchedStyle = STYLES.find(
      (s) => s.name.toLowerCase() === item.badge.toLowerCase() || s.id === item.badge.toLowerCase()
    );
    if (matchedStyle) setSelectedStyle(matchedStyle.id);
    setSelectedRatio(item.ratio);
    showToast("Prompt & settings restored — click Generate to run.", "success");
  };

  const handleDelete = (id: string) => {
    if (activeImage?.id === id) {
      const remaining = gallery.filter((i) => i.id !== id);
      if (remaining.length > 0) setActiveImage(remaining[0]);
      else {
        setActiveImage(null);
        setGenState("idle");
      }
    }
    setGallery((prev) => prev.filter((i) => i.id !== id));
    showToast("Artwork removed.", "success");
  };

  const handleRename = (id: string, newTitle: string) => {
    setGallery((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: newTitle } : item))
    );
    if (activeImage?.id === id) {
      setActiveImage((prev) => (prev ? { ...prev, title: newTitle } : prev));
    }
    showToast("Artwork title updated.", "success");
  };

  const isGeneratingOrProcessing = genState === "generating" || genState === "processing";

  return (
    <div className="flex flex-col flex-1 h-full min-h-0 bg-[#FAFAFC] dark:bg-[#0E0C15] text-zinc-900 dark:text-zinc-100">
      {/* ── 1. WORKSPACE HEADER ── */}
      <WorkspaceHeader
        title="Image Studio"
        breadcrumbs={[{ label: "Workspace" }, { label: "Image Studio" }]}
        badge={{ text: "PRO", variant: "pro" }}
        subtitle="Prompt-to-image synthesis with frontier neural engines"
        actions={
          <Button
            variant="outline"
            size="xs"
            onClick={() =>
              openUpgradeModal(
                "Upgrade to EchoGPT Pro for unlimited 4K batch rendering, Flux Pro, DALL-E 3, and commercial rights."
              )
            }
            leftIcon={<Crown className="size-3.5 text-[#713CF4]" />}
          >
            Pro Features
          </Button>
        }
      />

      {/* ── 2. SCROLLABLE STUDIO BODY ── */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 lg:p-7">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* ── PRIORITY 1: MODEL SELECTOR ROW (Cleanly placed outside any overflow-hidden containers) ── */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400 shrink-0">
              Neural Engine
            </span>
            <ModelSelector
              models={IMAGE_MODELS}
              selectedModelId={selectedModel}
              onSelectModel={(m: AIModel) => setSelectedModel(m.id)}
              align="left"
              headerTitle="Image Engine"
              groupByTier={true}
              allowProSelection={false}
            />
            {activeModelObj.isPro ? (
              <Badge variant="pro" size="sm">PRO License</Badge>
            ) : (
              <Badge variant="outline" size="sm">Free Tier</Badge>
            )}
            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 hidden sm:block">
              {activeModelObj.isPro
                ? "4K ultra-high resolution frontier synthesis"
                : "Standard high-speed generation included with free plan"}
            </span>
          </div>

          {/* ── MAIN STUDIO GRID: Controls (5 cols) | Preview Canvas (7 cols) ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* ════════════ LEFT COLUMN: Creation Controls (5 cols) ════════════ */}
            <div className="lg:col-span-5 space-y-4">

              {/* ── PROMPT CONTAINER ── */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs p-4 sm:p-5 space-y-3.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                    Scene Prompt
                  </span>

                  {/* Explore Prompts Popover Trigger */}
                  <div ref={exploreRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setExploreOpen(!exploreOpen)}
                      aria-expanded={exploreOpen}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#1b1725] text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4]"
                    >
                      <Compass className="size-3 text-[#713CF4]" />
                      Explore Prompts
                      <ChevronDown className={`size-3 transition-transform ${exploreOpen ? "rotate-180" : ""}`} />
                    </button>

                    {/* Curated Prompts Popover Modal */}
                    {exploreOpen && (
                      <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1b1725] shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 space-y-2.5">
                        <div className="flex items-center justify-between pb-1 border-b border-zinc-100 dark:border-zinc-850">
                          <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                            Curated Prompt Blueprints
                          </span>
                          <button
                            type="button"
                            onClick={() => setExploreOpen(false)}
                            className="size-5 rounded flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer"
                          >
                            <X className="size-3.5" />
                          </button>
                        </div>

                        {/* Search in explore */}
                        <div className="relative">
                          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-3 text-zinc-400" />
                          <input
                            type="text"
                            value={exploreSearch}
                            onChange={(e) => setExploreSearch(e.target.value)}
                            placeholder="Search blueprints by concept..."
                            className="w-full pl-7.5 pr-2.5 py-1 text-xs rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-[#713CF4]"
                          />
                        </div>

                        {/* Category filter pills */}
                        <div className="flex items-center gap-1 overflow-x-auto custom-scrollbar pb-1">
                          {CURATED_CATEGORIES.map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setExploreCategory(cat)}
                              className={`px-2 py-0.5 rounded-md text-[10px] font-medium whitespace-nowrap cursor-pointer transition-colors ${
                                exploreCategory === cat
                                  ? "bg-[#713CF4] text-white"
                                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>

                        {/* Blueprint list */}
                        <div className="max-h-60 overflow-y-auto custom-scrollbar space-y-1.5 pt-1">
                          {filteredCuratedPrompts.length === 0 ? (
                            <div className="text-center py-6 text-xs text-zinc-400">
                              No matching blueprints found
                            </div>
                          ) : (
                            filteredCuratedPrompts.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setPrompt(item.prompt);
                                  setExploreOpen(false);
                                  showToast(`Loaded "${item.title}" blueprint`, "success");
                                }}
                                className="w-full text-left p-2.5 rounded-xl border border-zinc-200/60 dark:border-zinc-800/80 hover:border-[#713CF4]/40 hover:bg-[#713CF4]/5 dark:hover:bg-[#713CF4]/10 transition-colors group cursor-pointer"
                              >
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-[11.5px] font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-[#713CF4]">
                                    {item.title}
                                  </span>
                                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-mono">
                                    {item.category}
                                  </span>
                                </div>
                                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                                  {item.prompt}
                                </p>
                              </button>
                            ))
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Textarea */}
                <div className="space-y-1.5">
                  <textarea
                    value={prompt}
                    onChange={(e) => {
                      if (e.target.value.length <= MAX_PROMPT_LENGTH) {
                        setPrompt(e.target.value);
                      }
                    }}
                    placeholder="Describe your visual concept in detail: subject, medium, lighting, color palette, rendering style..."
                    rows={4}
                    disabled={isGeneratingOrProcessing}
                    aria-label="Scene prompt"
                    className="w-full resize-none rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-[13.5px] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-500 p-3.5 leading-relaxed outline-none focus:border-[#713CF4] focus:ring-2 focus:ring-[#713CF4]/20 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                  />

                  {/* Character counter & AI Transformation Actions Bar */}
                  <div className="flex items-center justify-between pt-1 flex-wrap gap-2">
                    {/* Prompt Enhancements */}
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={handleEnhance}
                        disabled={!prompt.trim() || isEnhancing !== null || isGeneratingOrProcessing}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-[#713CF4] dark:hover:text-[#a78bfa] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 cursor-pointer"
                        title="Add rich studio lighting and textures"
                      >
                        {isEnhancing === "enhance" ? (
                          <span className="size-3 border-2 border-[#713CF4] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Wand2 className="size-3 text-[#713CF4]" />
                        )}
                        Enhance
                      </button>

                      <button
                        type="button"
                        onClick={handleRewrite}
                        disabled={!prompt.trim() || isEnhancing !== null || isGeneratingOrProcessing}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-[#713CF4] dark:hover:text-[#a78bfa] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 cursor-pointer"
                        title="Reframe with artistic director composition"
                      >
                        {isEnhancing === "rewrite" ? (
                          <span className="size-3 border-2 border-[#713CF4] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <FileText className="size-3 text-zinc-400" />
                        )}
                        Rewrite
                      </button>

                      <button
                        type="button"
                        onClick={handleExpand}
                        disabled={!prompt.trim() || isEnhancing !== null || isGeneratingOrProcessing}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-[11px] font-medium text-zinc-600 dark:text-zinc-400 hover:text-[#713CF4] dark:hover:text-[#a78bfa] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors disabled:opacity-40 cursor-pointer"
                        title="Elaborate environmental backdrop & color palette"
                      >
                        {isEnhancing === "expand" ? (
                          <span className="size-3 border-2 border-[#713CF4] border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <Sparkles className="size-3 text-amber-500" />
                        )}
                        Expand
                      </button>
                    </div>

                    <span
                      className={`text-[11px] font-mono ${
                        prompt.length > MAX_PROMPT_LENGTH * 0.9
                          ? "text-amber-500 font-semibold"
                          : "text-zinc-400 dark:text-zinc-500"
                      }`}
                    >
                      {prompt.length} / {MAX_PROMPT_LENGTH}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── PRIORITY 4: STYLE SELECTOR ── */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs p-4 sm:p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                    Artistic Style
                  </span>
                  <span className="text-[11px] text-[#713CF4] font-medium">
                    {activeStyleObj.name}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {STYLES.map((s) => {
                    const isSelected = selectedStyle === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setSelectedStyle(s.id)}
                        className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                          isSelected
                            ? "border-[#713CF4] bg-[#713CF4]/10 dark:bg-[#713CF4]/20 text-[#713CF4] dark:text-[#a78bfa] ring-1 ring-[#713CF4]/30"
                            : "border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#161720] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700"
                        }`}
                      >
                        <div className="flex items-center gap-1.5 font-semibold text-xs mb-0.5">
                          {s.icon}
                          <span className="truncate">{s.name}</span>
                        </div>
                        <p className="text-[10px] text-zinc-400 line-clamp-1">
                          {s.desc}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── PRIORITY 5: ESSENTIAL OPTIONS (Aspect Ratio & Batch Count) ── */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs p-4 sm:p-5 space-y-3.5">
                <span className="text-[11px] font-semibold uppercase tracking-widest text-zinc-400">
                  Render Configuration
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {/* Aspect Ratio */}
                  <div>
                    <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">
                      Aspect Ratio
                    </label>
                    <div className="flex items-center p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720]">
                      {ASPECT_RATIOS.map((r) => {
                        const isSelected = selectedRatio === r.id;
                        return (
                          <button
                            key={r.id}
                            type="button"
                            onClick={() => setSelectedRatio(r.id)}
                            className={`flex-1 py-1.5 text-center text-[11px] font-semibold rounded-md transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                              isSelected
                                ? "bg-[#713CF4] text-white shadow-xs"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                            }`}
                          >
                            {r.id}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Batch Generation Count */}
                  <div>
                    <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1.5">
                      Batch Count
                    </label>
                    <div className="flex items-center p-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720]">
                      {BATCH_COUNTS.map((cnt) => {
                        const isSelected = batchCount === cnt;
                        return (
                          <button
                            key={cnt}
                            type="button"
                            onClick={() => setBatchCount(cnt)}
                            className={`flex-1 py-1.5 text-center text-[11px] font-semibold rounded-md transition-colors cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] ${
                              isSelected
                                ? "bg-[#713CF4] text-white shadow-xs"
                                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                            }`}
                          >
                            {cnt} {cnt === 1 ? "Image" : "Images"}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── PRIORITY 6: ADVANCED OPTIONS COLLAPSIBLE ── */}
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs overflow-hidden">
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  aria-expanded={advancedOpen}
                  className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-pointer outline-none focus-visible:ring-1 focus-visible:ring-[#713CF4] transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    <Sliders className="size-3.5" />
                    Advanced Generation Parameters
                  </span>
                  {advancedOpen ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                </button>

                {advancedOpen && (
                  <div className="border-t border-zinc-100 dark:border-zinc-800 px-4 sm:px-5 pb-5 pt-3.5 space-y-4.5 animate-in fade-in">
                    {/* Group: Generation Engine */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        Generation Controls
                      </p>

                      {/* Guidance Scale (CFG) */}
                      <div>
                        <div className="flex items-center justify-between mb-1 text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300">
                          <span>Prompt Guidance (CFG Scale)</span>
                          <span className="text-[#713CF4] font-mono font-semibold">{guidanceScale.toFixed(1)}</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="20"
                          step="0.5"
                          value={guidanceScale}
                          onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                          className="w-full h-1.5 accent-[#713CF4] cursor-pointer"
                        />
                        <p className="text-[10px] text-zinc-400 mt-0.5">
                          Higher values adhere more strictly to your prompt.
                        </p>
                      </div>

                      {/* Steps & Seed */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                            Diffusion Steps
                          </label>
                          <div className="flex gap-1">
                            {["20", "30", "50"].map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() => setSteps(s)}
                                className={`flex-1 py-1 rounded-md text-[11px] font-medium border transition-colors cursor-pointer ${
                                  steps === s
                                    ? "bg-[#713CF4]/10 text-[#713CF4] border-[#713CF4]/40 font-semibold"
                                    : "bg-zinc-50 dark:bg-[#161720] border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400"
                                }`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                            Random Seed
                          </label>
                          <input
                            type="text"
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                            placeholder="Random (e.g. 48201)"
                            className="w-full px-2.5 py-1 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:ring-1 focus:ring-[#713CF4]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Group: Quality & Lighting */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                        Quality & Lighting
                      </p>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                            Detail Level
                          </label>
                          <select
                            value={detailLevel}
                            onChange={(e) => setDetailLevel(e.target.value)}
                            className="w-full py-1 px-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-1 focus:ring-[#713CF4] cursor-pointer"
                          >
                            <option value="draft">Draft (Fastest)</option>
                            <option value="high">High Definition</option>
                            <option value="ultra">Ultra Realistic</option>
                          </select>
                        </div>

                        <div>
                          <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                            Lighting Mode
                          </label>
                          <select
                            value={lightingStyle}
                            onChange={(e) => setLightingStyle(e.target.value)}
                            className="w-full py-1 px-2 text-xs rounded-md border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-zinc-900 dark:text-zinc-100 outline-none focus:ring-1 focus:ring-[#713CF4] cursor-pointer"
                          >
                            <option value="studio">Studio Softbox</option>
                            <option value="natural">Natural Sunlight</option>
                            <option value="dramatic">Dramatic Chiaroscuro</option>
                            <option value="ambient">Moody Ambient</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Group: Negative Prompt */}
                    <div>
                      <label className="text-[11.5px] font-medium text-zinc-600 dark:text-zinc-300 block mb-1">
                        Negative Prompt <span className="text-zinc-400 font-normal">(Exclude unwanted elements)</span>
                      </label>
                      <textarea
                        value={negativePrompt}
                        onChange={(e) => setNegativePrompt(e.target.value)}
                        placeholder="blurry, distorted anatomy, low quality, artifacts, watermark, text signature..."
                        rows={2}
                        className="w-full resize-none p-2.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 outline-none focus:border-[#713CF4] focus:ring-1 focus:ring-[#713CF4]/20"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* ── PRIMARY GENERATE BUTTON ── */}
              <div className="space-y-2 pt-1">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGeneratingOrProcessing}
                  isLoading={isGeneratingOrProcessing}
                  leftIcon={!isGeneratingOrProcessing ? <Sparkles className="size-4" /> : undefined}
                  className="w-full text-[13.5px] font-semibold h-11 shadow-sm"
                >
                  {genState === "generating"
                    ? "Synthesizing Neural Space…"
                    : genState === "processing"
                    ? "Finishing Details & Upscaling…"
                    : `Generate ${batchCount > 1 ? `${batchCount} Artworks` : "Artwork"}`}
                </Button>

                <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-center">
                  Each image generation uses 1 plan credit. Standard renders take ~15-20 seconds.
                </p>
              </div>
            </div>

            {/* ════════════ RIGHT COLUMN: Dominant Artwork Canvas (7 cols) ════════════ */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#121319] shadow-xs overflow-hidden flex flex-col">

                {/* Canvas Header Bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100 dark:border-zinc-800 shrink-0">
                  <div className="flex items-center gap-2 min-w-0">
                    <ImageIcon className="size-4 text-[#713CF4] shrink-0" />
                    <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                      {genState === "idle"
                        ? "Artwork Canvas"
                        : isGeneratingOrProcessing
                        ? genState === "generating"
                          ? "Synthesizing Latent Neural Space…"
                          : "Refining Textures & Details…"
                        : activeImage
                        ? `${activeImage.style} • ${activeImage.model}`
                        : "Render Ready"}
                    </span>
                    {genState === "complete" && activeImage?.batchTotal && activeImage.batchTotal > 1 && (
                      <span className="text-[10px] text-zinc-400 font-mono">
                        ({activeBatchIndex + 1}/{activeImage.batchTotal})
                      </span>
                    )}
                  </div>

                  {/* Header Actions */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {genState === "complete" && activeImage && (
                      <>
                        {/* Zoom Controls */}
                        <div className="hidden sm:flex items-center gap-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#161720] p-0.5 mr-1">
                          <button
                            type="button"
                            onClick={() => setZoomLevel((z) => Math.max(75, z - 25))}
                            className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                            title="Zoom Out"
                          >
                            <ZoomOut className="size-3" />
                          </button>
                          <span className="text-[10px] font-mono px-1 text-zinc-600 dark:text-zinc-300">
                            {zoomLevel}%
                          </span>
                          <button
                            type="button"
                            onClick={() => setZoomLevel((z) => Math.min(150, z + 25))}
                            className="p-1 rounded text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
                            title="Zoom In"
                          >
                            <ZoomIn className="size-3" />
                          </button>
                        </div>

                        {/* Fullscreen Toggle */}
                        <button
                          type="button"
                          onClick={() => setIsFullscreen(!isFullscreen)}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
                        >
                          {isFullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
                        </button>

                        {/* Copy Prompt */}
                        <button
                          type="button"
                          onClick={handleCopyPrompt}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                          title="Copy prompt"
                        >
                          {isCopied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                        </button>

                        {/* Regenerate */}
                        <button
                          type="button"
                          onClick={handleGenerate}
                          disabled={isGeneratingOrProcessing}
                          className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-40"
                          title="Regenerate"
                        >
                          <RefreshCw className={`size-3.5 ${isGeneratingOrProcessing ? "animate-spin" : ""}`} />
                        </button>

                        {/* Export Menu */}
                        <div ref={exportRef} className="relative">
                          <Button
                            variant="outline"
                            size="xs"
                            onClick={() => setExportOpen(!exportOpen)}
                            leftIcon={<Download className="size-3" />}
                            rightIcon={<ChevronDown className="size-2.5 text-zinc-400" />}
                          >
                            Export
                          </Button>

                          {exportOpen && (
                            <div className="absolute right-0 top-full mt-1.5 w-44 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1b1725] shadow-xl z-50 py-1 overflow-hidden animate-in fade-in zoom-in-95">
                              <button
                                type="button"
                                onClick={() => handleExportFormat("PNG")}
                                className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between cursor-pointer"
                              >
                                <span>PNG Image</span>
                                <span className="text-[10px] text-zinc-400 font-mono">Lossless</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleExportFormat("JPG")}
                                className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between cursor-pointer"
                              >
                                <span>JPEG Image</span>
                                <span className="text-[10px] text-zinc-400 font-mono">Web Standard</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => handleExportFormat("WebP")}
                                className="w-full text-left px-3 py-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-between cursor-pointer"
                              >
                                <span>WebP Modern</span>
                                <span className="text-[10px] text-zinc-400 font-mono">Compressed</span>
                              </button>
                              <div className="border-t border-zinc-100 dark:border-zinc-800 my-1" />
                              <button
                                type="button"
                                onClick={() => handleExportFormat("4K")}
                                className="w-full text-left px-3 py-2 text-xs font-medium text-[#713CF4] dark:text-[#a78bfa] hover:bg-[#713CF4]/10 flex items-center justify-between cursor-pointer"
                              >
                                <span className="flex items-center gap-1">
                                  <Crown className="size-3" />
                                  4K Master
                                </span>
                                <Badge variant="pro" size="sm">PRO</Badge>
                              </button>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* ── CANVAS RENDER AREA ── */}
                <div
                  ref={previewCanvasRef}
                  className={`flex-1 min-h-[380px] sm:min-h-[440px] flex items-center justify-center p-6 sm:p-8 bg-zinc-950 relative overflow-hidden ${
                    isFullscreen ? "fixed inset-0 z-50 p-12 min-h-screen" : ""
                  }`}
                >
                  {/* Floating Exit Fullscreen Button */}
                  {isFullscreen && (
                    <button
                      type="button"
                      onClick={() => setIsFullscreen(false)}
                      className="absolute top-5 right-5 z-50 p-2 rounded-full bg-black/60 backdrop-blur-md text-white/80 hover:text-white border border-white/20 cursor-pointer"
                      title="Exit Fullscreen"
                    >
                      <Minimize2 className="size-5" />
                    </button>
                  )}

                  {/* IDLE STATE */}
                  {genState === "idle" && (
                    <div className="flex flex-col items-center justify-center gap-3.5 text-center p-6 max-w-sm">
                      <div className="size-16 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500">
                        <ImageIcon className="size-7" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-zinc-300">Ready to create</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">
                          Describe your scene, pick an artistic style, and click Generate to synthesize artwork.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* GENERATING / PROCESSING STATE */}
                  {isGeneratingOrProcessing && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 bg-zinc-950/95 px-6 z-20 animate-in fade-in">
                      {/* Subtle neural synthesis pulse */}
                      <div className="relative flex items-center justify-center">
                        <div className="absolute size-20 rounded-full border border-[#713CF4]/30 animate-ping" />
                        <div className="absolute size-14 rounded-full border border-[#713CF4]/60 animate-pulse" />
                        <div className="size-10 rounded-full bg-[#713CF4]/20 flex items-center justify-center text-[#713CF4]">
                          <Sparkles className="size-5 animate-spin" />
                        </div>
                      </div>

                      <div className="text-center space-y-1.5 max-w-xs">
                        <p className="text-white text-sm font-semibold">
                          {genState === "generating"
                            ? "Synthesizing latent neural space…"
                            : "Refining micro-textures & upscaling…"}
                        </p>
                        <p className="text-zinc-400 text-xs">
                          Using {activeModelObj.name} • {activeStyleObj.name}
                        </p>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-56 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#713CF4] transition-all duration-300 rounded-full"
                          style={{ width: `${genProgress}%` }}
                        />
                      </div>

                      {/* Cancel generation CTA */}
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={handleCancel}
                        leftIcon={<X className="size-3" />}
                        className="text-zinc-400 hover:text-white"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}

                  {/* ERROR STATE */}
                  {genState === "error" && (
                    <div className="flex flex-col items-center justify-center gap-3 text-center p-6">
                      <div className="size-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                        <AlertCircle className="size-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-red-400">Image generation couldn&apos;t be completed</p>
                        <p className="text-xs text-zinc-500">Please try again with the same prompt or adjust parameters.</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleGenerate}
                        leftIcon={<RefreshCw className="size-3.5" />}
                      >
                        Retry Generation
                      </Button>
                    </div>
                  )}

                  {/* COMPLETE STATE: High-Fidelity Artwork Render */}
                  {genState === "complete" && activeImage && (
                    <div
                      className={`w-full max-w-xl aspect-${
                        activeImage.ratio === "1:1"
                          ? "square"
                          : activeImage.ratio === "9:16"
                          ? "[9/16]"
                          : activeImage.ratio === "4:3"
                          ? "[4/3]"
                          : "[16/9]"
                      } rounded-2xl bg-gradient-to-br ${
                        activeImage.colorGrad
                      } border border-white/10 shadow-2xl flex flex-col justify-between p-6 relative overflow-hidden group transition-transform duration-200`}
                      style={{ transform: `scale(${zoomLevel / 100})` }}
                    >
                      {/* Subtle Grid Canvas Overlay */}
                      <div className="absolute inset-0 bg-[radial-gradient(#713cf4_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />

                      {/* Top Bar on artwork */}
                      <div className="flex items-center justify-between z-10">
                        <span className="text-[10.5px] px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white/90 font-medium border border-white/10">
                          {activeImage.style}
                        </span>
                        <span className="text-[10px] text-white/70 font-mono bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded">
                          {activeImage.ratio}
                        </span>
                      </div>

                      {/* Visual Center Mockup */}
                      <div className="my-auto text-center space-y-3 z-10 py-6">
                        <div className="size-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 mx-auto flex items-center justify-center text-white shadow-xl">
                          <Layers className="size-8 text-white/90" />
                        </div>
                        <div className="max-w-sm mx-auto text-xs text-white/95 font-medium line-clamp-3 leading-relaxed px-2">
                          &ldquo;{activeImage.prompt}&rdquo;
                        </div>
                      </div>

                      {/* Bottom Footer on artwork */}
                      <div className="flex items-center justify-between z-10 text-[10.5px] text-white/60 border-t border-white/10 pt-3">
                        <span>EchoGPT Image Studio</span>
                        <span className="font-mono">{activeImage.timestamp}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Batch Variants Selector (when batch count was > 1) */}
                {genState === "complete" && activeImage?.batchTotal && activeImage.batchTotal > 1 && (
                  <div className="px-4 py-2.5 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-[#161720] flex items-center gap-2">
                    <span className="text-[11px] font-medium text-zinc-500">Batch Variants:</span>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: activeImage.batchTotal }).map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActiveBatchIndex(idx)}
                          className={`size-7 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                            activeBatchIndex === idx
                              ? "bg-[#713CF4] text-white border-[#713CF4] shadow-xs"
                              : "bg-white dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-300"
                          }`}
                        >
                          #{idx + 1}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Canvas Metadata Strip & New Artwork CTA */}
                {genState === "complete" && activeImage && (
                  <div className="px-4 py-2.5 bg-zinc-50 dark:bg-[#161720] border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500 flex-wrap gap-2">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span>Model: <strong className="text-zinc-700 dark:text-zinc-300 font-medium">{activeImage.model}</strong></span>
                      <span>Ratio: <strong className="text-zinc-700 dark:text-zinc-300 font-medium">{activeImage.ratio}</strong></span>
                      <span>CFG: <strong className="text-zinc-700 dark:text-zinc-300 font-medium">{activeImage.cfg || "7.5"}</strong></span>
                      <span>Latency: <strong className="text-zinc-700 dark:text-zinc-300 font-medium">1.1s</strong></span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        onClick={handleNewArtwork}
                        leftIcon={<RefreshCw className="size-3" />}
                      >
                        New Artwork
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ════════════ PRIORITY 11 & 12: YOUR CREATIONS GALLERY ════════════ */}
          <div className="space-y-3 pb-2 pt-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Your Creations
              </span>
              <span className="text-[11px] text-zinc-400 dark:text-zinc-500">
                {gallery.length} {gallery.length === 1 ? "artwork" : "artworks"}
              </span>
            </div>

            {gallery.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#121319] py-12 flex flex-col items-center justify-center gap-3 text-center">
                <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 dark:text-zinc-500">
                  <ImageIcon className="size-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                    No creations yet
                  </p>
                  <p className="text-xs text-zinc-400 dark:text-zinc-500">
                    Describe an image above and click Generate to start building your gallery.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={handleNewArtwork} leftIcon={<Sparkles className="size-3.5" />}>
                  Generate your first image
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {gallery.map((item) => (
                  <CreationCard
                    key={item.id}
                    item={{
                      id: item.id,
                      title: item.title || item.style,
                      prompt: item.prompt,
                      type: "image",
                      badge: item.style,
                      badgeIcon: <Layers className="size-3 text-white/80" />,
                      colorGrad: item.colorGrad,
                      ratio: item.ratio,
                      model: item.model,
                      timestamp: item.timestamp,
                      isFavorite: item.isFavorite,
                      batchIndex: item.batchIndex,
                      batchTotal: item.batchTotal,
                    }}
                    isActive={activeImage?.id === item.id}
                    onSelect={() => {
                      setActiveImage(item);
                      setGenState("complete");
                    }}
                    onRename={handleRename}
                    onFavorite={handleFavorite}
                    onDuplicate={handleDuplicate}
                    onRegenerate={handleRegenerate}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
