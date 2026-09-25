# EchoGPT Frontend Internship Assignment — Master Project Context

## ROLE

Act as my senior frontend technical mentor and execution planner for this project.

Your job is NOT to blindly generate a large amount of code.

You should:
- inspect the current state before suggesting changes
- work milestone-by-milestone
- give small, targeted changes
- avoid unnecessary refactors
- preserve working code
- explain important decisions simply
- help me make the final submission portfolio/recruiter quality
- review agent-generated implementation critically
- prevent scope creep

I prefer simple Bangla explanations with exact copy-paste commands/prompts when needed.

---

# 1. PROJECT GOAL

I am completing a frontend Software Engineering Internship assignment for AppifyDevs.

The assignment is based on redesigning the EchoGPT ecosystem.

The assignment has three major deliverables:

1. Redesign the EchoGPT Web App
2. Build a new single-page EchoGPT landing website
3. Redesign the Chrome Extension concept

The final submission requires:

- GitHub repository
- Live demo URL
- README
- Figma is optional

Deadline:
29 September 2026.

The project is a frontend-focused assignment.

A real backend, database, authentication system, payment system, or real AI API is NOT required unless there is a specific reason to add one.

Frontend interactions should feel realistic using local state/mock data where appropriate.

---

# 2. CURRENT PROJECT

Project name:

EchoGPT

Local folder:

C:\Users\HP\Desktop\echogpt

The Next.js project has already been initialized.

GitHub repository has already been created and the initial work has been pushed.

Current source structure at the beginning of the implementation:

src/
└── app/
    ├── globals.css
    ├── layout.tsx
    └── page.tsx

---

# 3. CURRENT SETUP ALREADY COMPLETED

I have already:

- initialized Next.js
- changed the document title to the EchoGPT title
- added the EchoGPT favicon/logo assets
- added the EchoGPT logo asset to the public folder
- configured the project typography
- imported Lexend
- also experimented with Google Sans
- decided that Lexend should be the primary font
- pushed the initial project to GitHub

Do not undo these decisions without a specific reason.

---

# 4. TECHNOLOGY

Use:

- Next.js
- React
- TypeScript
- App Router
- Tailwind CSS
- lucide-react

Use reusable React components.

Do not introduce unnecessary libraries.

---

# 5. DESIGN DIRECTION

The final design should be:

- modern
- premium
- clean
- polished
- production-quality
- responsive
- accessible
- visually impressive
- clearly inspired by EchoGPT's existing identity
- but substantially improved rather than copied pixel-for-pixel

Avoid:

- excessive gradients
- excessive glassmorphism
- huge glowing effects
- excessive purple backgrounds
- generic dashboard-template appearance
- unnecessary animations
- fake product information

The design should communicate:
"EchoGPT, redesigned as a polished modern AI SaaS product."

---

# 6. TYPOGRAPHY

Primary font:

Lexend.

Do NOT switch to Inter unless explicitly discussed.

Lexend has relatively wide letterforms, so typography must be calibrated carefully.

Use deliberate:

- font sizes
- weights
- line heights
- letter spacing

Avoid aggressive global negative letter spacing.

General direction:

Section labels:
small, uppercase, semibold, slightly increased tracking

Navigation:
around 13–14px, comfortable line height, normal/slightly tight tracking

Buttons:
medium weight

Headings:
semibold with restrained negative tracking

Body:
comfortable line height

The typography must look compact, crisp, readable and premium.

---

# 7. BRAND COLOR

Official EchoGPT visual identity includes:

#713CF4

This is the PRIMARY brand color.

Use it intentionally for:

- New Chat CTA
- active navigation
- selected states
- focus rings
- important interactive controls
- selected model states
- subtle accents
- PRO badges where appropriate

Possible interaction colors:

Primary:
#713CF4

Hover:
#602EE0

Pressed:
#5223C7

Use lighter purple tints for selected backgrounds.

Use neutral surfaces for most of the UI.

Do NOT make the whole website purple.

The visual hierarchy should be:

Purple accent
+
White/zinc neutral surfaces
+
Strong typography
+
Subtle borders
+
Minimal shadows

---

# 8. EXISTING ECHOGPT SIDEBAR

The existing EchoGPT web app sidebar currently contains:

Primary:
- New Chat

ENGAGEMENT:
- Image Studio [PRO]
- Video Studio [PRO]
- Compare
- Connectors
- History
- Store
- AI Tasks
- AI Job Analysis
- AI SOP Builder

HELP & SUPPORT:
- Support
- Newsletter
- Subscriptions
- API Platform
- Discord

There is also:
- a Pro upgrade card
- bottom utility navigation

Important:
Do not invent additional product features or fake information.

Use the existing screenshot/product as the information architecture reference.

---

# 9. COMPLETED MILESTONE: WEB APP SHELL

Current milestone:
Web App Shell

Status:
Implemented and verified.

Completed components & scope:
- AppShell (`src/components/layout/AppShell.tsx`)
- Sidebar (`src/components/layout/Sidebar.tsx`)
- NavItem (`src/components/layout/NavItem.tsx`)
- UpgradeCard (`src/components/layout/UpgradeCard.tsx`)
- MobileNav (`src/components/layout/MobileNav.tsx`)
- Navigation configuration & types (`src/config/navigation.ts`, `src/types/navigation.ts`)
- PlaceholderWorkspace (`src/components/dashboard/PlaceholderWorkspace.tsx`)
- Responsive behavior (desktop persistent, tablet collapse, mobile slide-in drawer)
- Restrained brand color system (`#713CF4`)
- Calibrated Lexend typography system

We are NOT implementing yet:
- individual feature pages
- landing page
- Chrome extension
- backend
- authentication
- real AI API
- database

---

# 10. APPROVED ARCHITECTURE

Preferred structure:

src/
├── types/
│   └── navigation.ts
│
├── config/
│   └── navigation.ts
│
├── components/
│   ├── layout/
│   │   ├── AppShell.tsx
│   │   ├── Sidebar.tsx
│   │   ├── NavItem.tsx
│   │   ├── UpgradeCard.tsx
│   │   └── MobileNav.tsx
│   │
│   └── dashboard/
│       └── PlaceholderWorkspace.tsx
│
└── app/
    ├── globals.css
    ├── layout.tsx
    └── page.tsx

Navigation data should be separated from UI components.

---

# 11. RESPONSIVE REQUIREMENTS

Desktop:
- persistent sidebar
- approximately 260px wide
- optional collapse to compact icon rail

Tablet:
- adaptive/collapsible sidebar

Mobile:
- sidebar hidden by default
- hamburger menu
- slide-in drawer
- backdrop
- accessible close behavior
- Escape key support
- body scroll lock
- no horizontal overflow

Main workspace must remain usable at:

- desktop
- tablet
- 375px mobile
- 430px mobile

---

# 12. ACCESSIBILITY

Use:

- semantic HTML
- nav
- aside
- main
- header
- aria-current
- aria-label
- aria-expanded
- keyboard-accessible controls
- visible focus states
- sufficient contrast

Use:

focus-visible:ring-[#713CF4]

where appropriate.

---

# 13. ICONS

Use lucide-react.

Prefer consistent 18px icons for sidebar navigation.

Do not use random emoji as UI icons.

---

# 14. IMPORTANT DESIGN RULE

Do NOT reproduce the original EchoGPT screenshot pixel-for-pixel.

Use the existing product as reference for:

- information architecture
- feature names
- branding
- general product context

But create a meaningful visual redesign.

---

# 15. DO NOT INVENT PRODUCT INFORMATION

Never invent:

- model names
- product versions
- pricing
- user names
- testimonials
- statistics
- feature claims
- plan names
- company claims

For example, do NOT use:
- "EchoGPT Pro 4.5"
- "v2.0"
- "Good evening, Alex"

unless verified from the actual product.

Use neutral copy when necessary.

---

# 16. INTERACTION PHILOSOPHY

Not every feature needs a real backend.

However, visible frontend controls should behave realistically.

Examples:

New Chat:
- reset/create a local mock chat

Model selector:
- open dropdown
- update selected state

History:
- local/mock conversation selection

Copy:
- copy text to clipboard

Toggle:
- actual local state change

Loading:
- show loading state

Buttons:
- should not be completely dead when an interaction is expected

Use local state/mock data where appropriate.

---

# 17. DEVELOPMENT WORKFLOW

Always follow this workflow:

1. Inspect current state.
2. Identify the current milestone.
3. Make the smallest reasonable change.
4. Run the app.
5. Check TypeScript/lint/build when relevant.
6. Visually inspect the result.
7. Fix only actual problems.
8. Commit/push after a stable milestone.

Do not rewrite working files unnecessarily.

---

# 18. THREE MAJOR FUTURE PARTS

Eventually the single Next.js project will contain:

/
→ Landing Page

/app
→ Web App

/extension
→ Chrome Extension Concept

One Vercel deployment is sufficient unless there is a specific reason to separate deployments.

---

# 19. FUTURE WEB APP ROUTES

Potential routes based on the existing sidebar:

/chat
/image-studio
/video-studio
/compare
/connectors
/history
/store
/ai-tasks
/ai-job-analysis
/ai-sop-builder
/support
/newsletter
/subscriptions
/api-platform
/discord

Do not create all of these until the relevant milestone.

---

# 20. LANDING PAGE FUTURE SECTIONS

The landing page should eventually contain:

- Hero
- Features
- AI Models
- Product Preview / Screenshots
- Why Choose EchoGPT
- Pricing (optional)
- FAQ
- Testimonials (optional)
- CTA
- Footer

Do not fabricate testimonials or product claims.

---

# 21. CHROME EXTENSION FUTURE SCOPE

The Chrome Extension redesign is a concept/UI project.

It should eventually demonstrate:

- Popup UI
- Navigation
- Prompt input
- AI model selection
- Conversation history
- Quick actions
- Settings
- consistent visual system

A real Chrome extension package is not required unless explicitly needed.

---

# 22. PROJECT MANAGEMENT RULE

I am using Antigravity to implement larger frontend changes.

When I give an Antigravity-generated plan/result to you:

- review it critically
- identify invented assumptions
- identify unnecessary scope
- identify architecture problems
- tell me exactly what to change
- give me the next copy-paste prompt when needed

Do not blindly approve agent output.

---

# 23. PROJECT EXECUTION & STATUS TRACKING

## CURRENT STATUS

Current milestone:
Milestone 4.x — Image Studio & Compare Visual Refinement

Status:
Implemented and verified ✓

## COMPLETED WORK

### Milestone 4.x: Image Studio & Compare Visual Refinement

#### Reference-Driven UX Decisions
- Deep study of the 3 original EchoGPT screenshots:
  - Original Image Studio: Clean top prompt card with inline controls (aspect ratio, batch, model dropdown, primary Generate button) and spacious output area.
  - Original Compare page: Clean top toggle (`[ ⊞ Compare ]` | `[ ↗ Focus ]`), focused prompt container with multi-model dropdown, and side-by-side reading cards.
  - Original Compare Focus mode: Selected model tabs (`[ EchoGPT ]`, `[ DeepSeek V4 Pro ]`, `[ Nemotron 3 Ultra ]`) under the toggle, with single-model distraction-free reading canvas.
- Elimination of visual crowding:
  - Replaced permanent model grid cards in Image Studio with reusable `ModelSelector` popover.
  - Replaced permanent 8-chip model strip in Compare with a multi-select popover, displaying ONLY the active selected models.
  - Adopted progressive disclosure: Primary controls always visible; secondary blueprints in popovers; advanced parameters (negative prompt, CFG, seed) in clean collapsibles.

#### Image Studio Redesign
1. **Focused Prompt & Control Area**:
   - Clean prompt textarea with live character counter (`prompt.length / 1000`).
   - Integrated inline bottom toolbar inside the prompt card:
     - Reference attachment button `[ + ]` (triggers PRO upload info).
     - Aspect ratio segmented pills (`1:1`, `16:9`, `9:16`, `4:3`).
     - Batch count segmented pills (`1`, `2`, `4`).
     - Reusable `ModelSelector` using `IMAGE_MODELS` (`Flux Pro`, `DALL-E 3`, `Midjourney v6`, `SDXL Turbo`).
     - Primary CTA: `Generate` in `#713CF4` with loading animation.
   - Subtext: "Each image uses 1 generation credit. Takes ~30 seconds."
2. **Progressive Disclosure for Settings & Blueprints**:
   - `[ Explore Prompts ▾ ]`: Popover with curated blueprints that populates the textarea on click and closes cleanly.
   - `Style: [ 3D Isometric ▾ ]`: Compact native dropdown with 6 visual styles (replaces giant 6-card grid).
   - `[ ⚙ Advanced options ▾ ]`: Collapsible containing negative prompt textarea, CFG Guidance Scale slider (1-20), and random seed input.
3. **Visually Dominant Artwork Canvas**:
   - Preview canvas takes primary visual prominence in the workspace.
   - Generating state: Elegant latent space synthesis pulse with progress indicators.
   - Rendered state: High-resolution aspect-ratio-accurate canvas with subtle overlay actions (Copy prompt, Regenerate, Export 4K).
   - Minimalist metadata footer: Model, Aspect Ratio, Latency (`1.2s`), Octane render.
4. **Compact Recent Artwork Gallery**:
   - "Your Creations" compact 4-column / horizontal strip with thumbnail previews, styles, and prompt snippets.
   - Clicking any thumbnail smoothly restores it into the active preview canvas.
5. **Responsive Stacking**:
   - Desktop (≥ 1024px): Balanced 2-column layout (5 cols prompt/controls, 7 cols canvas, full-width gallery below).
   - Mobile (< 1024px): Seamless vertical flow without horizontal overflow.

#### Compare Page Redesign
1. **WorkspaceHeader & View Switcher**:
   - Breadcrumb: `WORKSPACE / COMPARE`
   - Title: `Compare AI Models`
   - Actions bar: Segmented switch pill `[ ⊞ Compare ]` | `[ ↗ Focus ]` + `ModelSelector` dropdown (`[ 3 Models ▾ ]`).
2. **Multi-Select ModelSelector (Critical Improvement)**:
   - Enhanced reusable `ModelSelector` to support `multiSelect={true}`.
   - Searchable popover with category groupings (FAST & FREE vs ADVANCED & REASONING PRO).
   - Checked indicators for selected models (up to 4 models).
   - PRO badges with gating to `UpgradeProModal`.
   - Keyboard accessible (Escape closes, click outside closes).
   - Completely eliminated the permanent 8-chip horizontal model strip!
3. **Active Model Chips**:
   - Secondary strip displays ONLY the currently selected models as compact chips: `[ EchoGPT × ] [ GPT-4o × ] [ Claude 4 Sonnet × ]`.
   - Quick removal via `×` (enforces at least 2 models).
   - `+ Add Model` dashed button to quickly open selector when under 4 models.
4. **Focused Benchmark Prompt Area**:
   - Clean, centered input container: "Message 3 models...".
   - `[ 💡 Try benchmark ▾ ]` popover with 4 curated benchmark queries.
   - Helper subtext: "5 of 5 comparisons left today · resets in a day · upgrade for unlimited".
   - Primary action: `Compare` button in `#713CF4`.
5. **Authentic Focus Mode**:
   - When Focus Mode is active:
     - Top switcher reflects Focus active.
     - Horizontal model tabs appear directly beneath: `[ EchoGPT ]`, `[ GPT-4o ]`, `[ Claude 4 Sonnet ]`.
     - Active tab highlighted in `#713CF4` purple with smooth 1-click model switching.
     - Distraction-free, centered reading layout (`max-w-4xl mx-auto`) with enhanced line-height and typography.
     - Clear `[ Exit Focus ]` button to return to side-by-side grid view.
6. **Side-by-Side Comparison Grid**:
   - In Compare mode: Responsive reading cards (2, 3, or 4 columns based on selection).
   - Model name, provider, PRO badge, "★ Top Pick" vote tag.
   - Actions: Vote Best, Focus (`↗ Focus`), Regenerate, Copy Response.
   - Subtle latency (`380ms`) and context metadata.
7. **Mobile Optimization**:
   - Clean single-column stacking with full-width cards.
   - Zero horizontal scroll bleed or layout breaking.

#### Verification
- `npm run lint` → 0 errors, 0 warnings ✓
- `npx next build --webpack` → 17 static routes prerendered, 0 errors ✓
- HTTP 200 OK verified on `/image-studio` and `/compare` ✓

---

### Milestone 4 (Full): EchoGPT Product UI System + Core UX Polish

#### Brand & Sidebar Polish
1. **Logo hover scale removed**: `group-hover:scale-105` eliminated from logo Image element.
2. **Clean horizontal brand lockup**: Logo mark + EchoGPT wordmark — `text-[17px] font-semibold tracking-[-0.025em]` (no gradient text — restrained and premium).
3. **Sidebar utility grid stays inside bounds**: Replaced `justify-between px-1` flex row with `grid grid-cols-4 gap-1 w-full` — utility items never overflow.
4. **Keyboard shortcut updated**: `Ctrl+K` → `Ctrl+Shift+K` (Windows/Linux), `⌘K` → `⌘⇧K` (macOS) — shortcut badge reflects new binding. Global listener updated in AppShell.tsx.

#### Custom Scrollbar Update
- EchoGPT purple gradient (`#713CF4` tints) scrollbar replaces neutral gray.
- Dark mode compatible — `.dark .custom-scrollbar` rules in globals.css.

#### Global UI Primitives Created
- `src/components/ui/Badge.tsx` — Pro/default/success/outline badges.
- `src/components/ui/Button.tsx` — Primary/secondary/outline/ghost/danger variants with loading state.
- `src/components/ui/Modal.tsx` — Accessible modal with Escape, backdrop, body scroll lock.
- `src/components/ui/Toast.tsx` — `ToastContainer` + `showToast()` global notification system.

#### UpgradeProModal Redesign (Visual Reference Elevation)
- **High-End 2-Column Responsive Architecture**:
  - Modal container expanded to `5xl` with bespoke squircle backdrop blur and hair-line border accents (`dark:border-white/[0.08]`).
  - Desktop (≥ 1024px): 58% Features column on left, 42% Billing/Pricing/Models column on right.
  - Mobile (< 1024px): Intelligently inverted stack order (`order-1` for Billing/Pricing/CTA, `order-2` for full Features breakdown) so mobile users immediately see plans and the Upgrade CTA on first paint without endless scrolling.
- **Categorized Premium Features Engine**:
  - Chat Category: AI Chat, AI Characters, AI Tasks, Brainstorming.
  - Content Category: ChatDoc, Content Summary, Content Editing, Language Translator, Code Generation, Web Search ("Coming Soon" badge).
  - Image & Multimodal Category: Text to Image (Image Studio 4K), Ask Image (Vision), Video Studio (PRO Studio).
  - High-res micro-squircles with color-coded Lucide SVG icons.
- **4-Period Interactive Billing Engine**:
  - Segmented control supporting `Monthly`, `Quarterly` (Save 10%), `Semi-Annual` (Save 20%), and `Annual` (Save 30% • Best Value).
  - Dynamic pricing calculation ($9.99/mo base matching screenshot, down to $6.99/mo on Annual).
  - Dynamic plan summary and billing cadence notes.
- **Frontier AI Models Showcase Box**:
  - Compact, modern 9+ model showcase: `DeepSeek V4 Pro`, `GPT-5.6 Sol`, `Qwen 3.7 Plus`, `GLM-5.2`, `MiMo V2.5 Pro`, `Kimi K3`, `MiniMax M3`, `GLM-5.3 Flash`, `Qwen 3.8 27B`.
  - Tags for Reasoning, Frontier, Code & Math, Vision, Multimodal.
- **Theme & Design System Fidelity**:
  - Strict adherence to `#713CF4` primary accent, Lexend typography, and dark/light contrast standards.
  - Money-back guarantee trust badge and "Maybe later" dismissal link.

#### Global Model Catalog
- `src/config/models.ts` — 11 realistic AI models: EchoGPT (free), GPT-4o mini (free), DeepSeek-V3 (free), GPT-5 (PRO), GPT-4o (PRO), Gemini Advanced (PRO), Claude 4 Sonnet (PRO), Claude Opus (PRO), DeepSeek R1 (PRO), Grok 4 (PRO), Mistral Pro (PRO).
- Organized by provider, category (Flagship/Reasoning/Fast/Open Source), with contextWindow and isPro flags.

#### Rebuilt ModelSelector
- Full rebuild of `src/components/dashboard/ModelSelector.tsx`.
- Searchable popover with category group headers, PRO badges, provider labels, context window sizes.
- Lock icon for PRO models. Selecting PRO model → `openUpgradeModal()` (no PRO response generated).
- Removed all legacy neutral model IDs.

#### Chat Protection Flow
- `PlaceholderWorkspace.tsx`: If user selects a PRO model and tries to send → UpgradeProModal opens instead of response.
- Free model selection → simulated mock response as before.

#### Chat Persistence Overhaul
- `src/lib/chatStorage.ts` completely rewritten:
  - Keys: `echogpt:current-chat`, `echogpt:chat-history`, `echogpt:selected-model`
  - Full `CurrentChatData` object: id, title, modelId, messages[], createdAt, updatedAt
  - Legacy key migration from `echogpt_active_chat_messages` on first load
  - `loadCurrentChat()`, `saveCurrentChat()`, `clearCurrentChat()`, `updateCurrentChatMessages()`, `archiveCurrentChat()`
  - `loadSelectedModel()`, `saveSelectedModel(modelId)`
  - `loadHistory()`, `saveHistory()`, `deleteHistoryItem()`, `clearAllHistory()`
  - Seed history updated with realistic EchoGPT/DeepSeek/GPT-4o model names

#### Workspace Layout Components Created
- `src/components/workspace/WorkspaceHeader.tsx` — Reusable responsive workspace header: breadcrumb/title left, actions right. Mobile: wraps cleanly. Subtitle, badge optional.
- `src/components/workspace/WorkspaceLayout.tsx` — Simple page wrapper component.
- `src/components/workspace/WorkspaceToolbar.tsx` — Secondary toolbar for left/right content.

#### Studio Components Created
- `src/components/studio/StudioPrompt.tsx` — Prompt input with blueprint templates, character counter, and Generate button.
- `src/components/studio/StudioPreview.tsx` — Studio output canvas: header, isGenerating animation, metadata bar, Download/Copy/Regenerate actions.

#### Compare Components Created
- `src/components/compare/CompareToolbar.tsx` — Compare prompt + Focus Mode toggle toolbar.
- `src/components/compare/ComparePanel.tsx` — Individual model comparison panel with metrics, Vote Best, Regenerate, Copy, Focus actions.

#### Feature Workspaces Updated
All major workspaces updated with:
- `WorkspaceHeader` component (consistent responsive header pattern)
- Two-column studio layouts (controls left, preview right on desktop; vertical stack on mobile)

1. **Image Studio** (`ImageStudioWorkspace.tsx`) — Full remake:
   - Left: Neural engine model grid (Flux Pro, DALL-E 3, Midjourney v6, SDXL Turbo), visual style pills, aspect ratio select, batch count.
   - Right: `StudioPreview` with animated gradient canvas, recent gallery grid.
   - Simulated generate → gallery update → showToast flow.

2. **Video Studio** (`VideoStudioWorkspace.tsx`) — Full remake:
   - Left: `StudioPrompt` with camera trajectory grid (Drone Pan, Orbital 360, Kinetic Push, Static Close-up), duration/ratio selectors.
   - Right: Cinematic video player with interactive scrubber, mute toggle, project library.
   - Simulated generate → new project → auto-play flow.

3. **Compare** (`CompareWorkspace.tsx`) — Full remake:
   - `CompareToolbar` with shared prompt input.
   - Active model chip selector (Add/Remove up to 4 models).
   - `ComparePanel` grid (2-4 cols on desktop, stacked on mobile).
   - Focus Mode: expand single panel to full width.
   - Vote Best Answer (highlights winning panel with PRO ring).

4. **History** (`HistoryWorkspace.tsx`) — Updated:
   - Uses new `echogpt:chat-history` key.
   - Restores conversations via `updateCurrentChatMessages()`.
   - `showToast` for restore and delete confirmations.

5. **AI Job Analysis** + **AI SOP Builder** — Updated headers only (WorkspaceHeader integration).

#### MobileNav Polish
- Brand lockup in mobile header matches Sidebar: `size-7` logo container + `text-[17px] font-semibold tracking-[-0.025em]`.
- Logo container has proper border and bg in both light/dark.

#### AppShell Composition
- `UpgradeModalProvider` wraps entire app shell.
- `<UpgradeProModal />` rendered globally.
- `<ToastContainer />` rendered globally (bottom-right, max 3 toasts).
- Keyboard shortcut updated to `Ctrl+Shift+K` / `⌘⇧K`.

## FILES CREATED / MODIFIED (Milestone 4 Full)

**New Files:**
- `src/config/models.ts`
- `src/components/ui/Badge.tsx`
- `src/components/ui/Button.tsx`
- `src/components/ui/Modal.tsx`
- `src/components/ui/Toast.tsx`
- `src/context/UpgradeModalContext.tsx`
- `src/components/billing/UpgradeProModal.tsx`
- `src/components/workspace/WorkspaceHeader.tsx`
- `src/components/workspace/WorkspaceLayout.tsx`
- `src/components/workspace/WorkspaceToolbar.tsx`
- `src/components/studio/StudioPrompt.tsx`
- `src/components/studio/StudioPreview.tsx`
- `src/components/compare/CompareToolbar.tsx`
- `src/components/compare/ComparePanel.tsx`

**Updated Files:**
- `src/app/globals.css` — Purple gradient scrollbar, dark mode scrollbar rules
- `src/lib/chatStorage.ts` — Overhauled with new keys and CurrentChatData type
- `src/components/layout/AppShell.tsx` — UpgradeModalProvider, ToastContainer, Ctrl+Shift+K
- `src/components/layout/Sidebar.tsx` — No scale hover, clean brand, grid utility bar, UpgradeModal
- `src/components/layout/MobileNav.tsx` — Consistent brand lockup
- `src/components/dashboard/ModelSelector.tsx` — Full rebuild with AI_MODELS, search, PRO gating
- `src/components/dashboard/PlaceholderWorkspace.tsx` — WorkspaceHeader, chat protection, persistence fix
- `src/components/dashboard/CompareWorkspace.tsx` — Full remake with ComparePanel, Focus Mode
- `src/components/dashboard/ImageStudioWorkspace.tsx` — Full remake with StudioPrompt/Preview
- `src/components/dashboard/VideoStudioWorkspace.tsx` — Full remake with camera controls and player
- `src/components/dashboard/HistoryWorkspace.tsx` — WorkspaceHeader, new storage keys
- `src/components/dashboard/JobAnalysisWorkspace.tsx` — WorkspaceHeader integration
- `src/components/dashboard/SopBuilderWorkspace.tsx` — WorkspaceHeader integration

## IMPORTANT ARCHITECTURE DECISIONS (Milestone 4 Full)

- `UpgradeModalContext` is injected at AppShell level — all child components call `useUpgradeModal()` without prop drilling.
- `showToast()` is a DOM-event-based global function (no React context) — works from anywhere including event handlers.
- Model lazy state initialization: `useState(() => loadSelectedModel())` to avoid `setState-in-effect` lint errors.
- `useMemo(() => currentChat?.messages || [], [currentChat])` prevents messages dependency changing on every render.
- ModelSelector clears `searchQuery` state in the `mousedown` and `keydown` cleanup paths (not in effect body) to avoid set-state-in-effect errors.

## VERIFICATION (Milestone 4 Full)

- `npm run lint` → 0 errors, 0 warnings ✓
- `npm run build` (`next build --webpack`) → 16 routes prerendered, 0 errors ✓

## KNOWN ISSUES

- None currently identified.

## NEXT STEPS

1. **Landing Page**: Design and implement the single-page EchoGPT landing website (`src/app/page.tsx`).
2. **Chrome Extension Concept**: Plan and implement the Chrome Extension popup UI.
3. **README**: Write a polished project README for GitHub/Vercel submission.

### Milestone 4.x: Video Studio Visual Refinement

#### Architecture Decisions
- Added `VIDEO_MODELS` array to `src/config/models.ts` (4 engines: Veo 3.1 fast [free], Sora [PRO], Kling v1.5 [PRO], Runway Gen-3 [PRO])
- Added `DEFAULT_VIDEO_MODEL_ID = "veo-3-fast"` constant
- `WAVEFORM_BARS` pre-computed at module level to satisfy `react-hooks/purity` (no `Math.random()` in render)
- PRO model gating: selecting any PRO video engine → `openUpgradeModal()` fires (no generation attempted)
- Advanced quality `4K` option → `openUpgradeModal()` fires (export gated)
- Export button → `openUpgradeModal()` (ProRes export gated)

#### Progressive Disclosure Layout
1. **PRIMARY (always visible)**: Scene prompt textarea, inline bottom toolbar (Duration segments `3s/5s/10s`, Ratio pills `16:9/9:16/1:1`, ModelSelector popover, Generate CTA)
2. **SECONDARY**: Camera Motion card (4 options: Drone Pan, Orbital 360, Kinetic Push, Static Close-up) — compact icon+label buttons
3. **TERTIARY**: Advanced Settings collapsible (Motion Intensity slider, Speed segments, Quality segments, Seed input)

#### Scene Templates Popover
- `[ ✨ Scene Templates ▾ ]` button in prompt card header
- 4 curated templates: Cinematic city night, Product 360 orbit, Biophilic interior, Abstract particles
- Clicking a template populates textarea and closes popover
- Click-outside closes it (no useEffect setState — mousedown listener attached only when open)

#### 3-State Generation Flow
- **IDLE**: Minimal empty-state with Film icon ("Describe a scene above and click Generate")
- **GENERATING**: Cinematic pulsing animation (ping + pulse rings), "Rendering cinematic scene…", live countdown timer (`formatCountdown()`), waveform bars
  - Countdown duration: `3s→12s`, `5s→15s`, `10s→18s` mocked render time
- **COMPLETE**: Premium video player with gradient canvas, scanline texture, play/pause button, interactive scrubber, time display, mute toggle

#### Premium Media Player (COMPLETE state)
- Gradient canvas (changes per project)
- CSS scanline texture overlay
- Top bar: camera mode + ratio label, mute button
- Center: play/pause button (hover → purple, scale-110)
- Bottom: clickable progress scrubber + time display (current second / total)
- "New scene" ghost button resets to IDLE state
- Prompt snippet shown in footer

#### Recent Video Library
- Full-width grid below main editor (1 col mobile, 2 col tablet, 3 col desktop)
- Each card: camera mode badge, ratio, duration, prompt snippet (2-line clamp), timestamp, model name
- Active card: purple ring indicator dot (top-right)
- Non-active cards: ×  dismiss button (appears on hover via `group-hover:opacity-100`)
- Clicking card: restores to COMPLETE state with that project in player
- Empty state: dashed border with `<MonitorPlay>` icon and "Nothing here yet" copy

#### Verification
- `npm run lint` → 0 errors, 0 warnings ✓
- `npx next build --webpack` → 17 static routes prerendered, 0 errors ✓

---

### Milestone 4.x: Video Studio UX Polish (Full Redesign)

#### PRIORITY 1 — Model Selector Root Cause + Fix

**Root cause**: The ModelSelector was placed INSIDE the prompt card `div` which had `overflow-hidden`. This CSS property clips absolutely-positioned descendants even with `z-index: 50` — the dropdown popover existed in the DOM but was visually clipped by the card boundary.

**Fix**: Moved the ModelSelector OUTSIDE the prompt card entirely, into its own dedicated "Video Engine" row at the top of the controls column. This row has no `overflow-hidden` ancestor, so the dropdown popover opens freely and floats above all surrounding content. No changes to ModelSelector component itself were needed.

#### PRIORITY 2 — Improved Prompt Experience
- Prompt textarea now has `MAX_PROMPT_LENGTH = 800` character limit enforced on input
- Character counter in `{current} / {MAX_PROMPT_LENGTH}` format, turns amber at 90% fill
- Clear placeholder text explaining what to describe
- **Enhance Prompt** (mock) button: `Wand2` icon, spinner during 900ms mock delay, uses `mockEnhancePrompt()` helper that intelligently appends contextual enhancements based on keywords (city/night, product/glass, nature, or generic cinematic suffix). Shows "Enhancing…" during processing. Toast on completion.
- Disabled when prompt is empty, currently generating, or already enhancing

#### PRIORITY 3 — Camera Motion
- 4 primary presets always visible in 2-column grid (Drone Pan, Orbital 360, Kinetic Push, Static Close-up)
- "More motions" popover trigger shows 6 additional presets (Dolly, Tracking, Crane, Handheld, Zoom, Arc)
- Active camera shown in Badge above grid when it's a "More" preset
- Escape closes; click-outside closes (mousedown handler pattern)
- Both primary and more cameras share `ALL_CAMERAS` array for label lookups

#### PRIORITY 4 — Advanced Settings
Three grouped sections (collapsed by default):
- **Motion**: Motion Intensity slider (0–100), Camera Strength slider (0–100) with help text
- **Output**: FPS segmented (`16fps`/`24fps`/`30fps`), Quality segmented (`Draft`/`High`/`4K ✦`) — 4K PRO-gated → UpgradeProModal
- **Generation**: Seed number input with help text, Negative Prompt textarea

#### PRIORITY 5 — Professional Generation States
5-state flow: `idle → queued → generating → processing → complete` (+ `failed`):
- **queued** (2s): "Your video is queued…"
- **generating** (until 5s before end): "Creating your scene…" + live countdown
- **processing** (3s): "Finishing your video…"
- **complete**: "Your video is ready." + player
- **failed**: Error state with retry button
- **Cancel** button: clears all timeouts via `genTimeoutRef`, returns to `idle`
- `genTimeoutRef` ref tracks all nested `setTimeout` handles for clean cancellation

#### PRIORITY 6 — Video Preview
- 3-state canvas: IDLE (Film icon empty state), GENERATING (subtle pulse ring + waveform bars + countdown + Cancel), COMPLETE (gradient canvas + player)
- Player: play/pause button with hover-scale, clickable scrubber (also keyboard: ArrowLeft/Right), time display (`formatTime()`), mute toggle, Export button (PRO-gated)
- `role="slider"` + `aria-valuemin/max/now` + keyboard on scrubber
- `aria-label` on play/pause, mute, export

#### PRIORITY 7 — Creation Card Overflow Menu
Each non-active creation card has a `⋯` icon button (only visible, always accessible):
- **Rename**: Opens inline input in the card title area; commits on blur/Enter, cancels on Escape
- **Favorite**: Toggles `isFavorite` state — shows filled amber Star icon
- **Duplicate**: Creates copy via setState updater (no `Date.now()` in render)
- **Regenerate**: Restores card prompt to textarea + shows toast
- **Delete**: Removes from projects list; restores another if deleting active
- Menu closes on outside click via `data-creation-menu` attribute approach
- Danger-styled Delete row (red text/icon, red hover bg)

#### PRIORITY 8 — New Scene
`handleNewScene`: clears all timeouts, resets prompt, duration, ratio, camera, advancedOpen, genState, countdown, playing, progress. Appears as "New Scene" footer button and in empty state.

#### PRIORITY 9 — Visual Polish
- Removed all `overflow-hidden` from control cards that contain popovers/selectors
- Consistent `rounded-2xl` cards, `shadow-xs`, `border-zinc-200/80 dark:border-zinc-800`
- Prompt card footer: thin separator + info text
- Video canvas: `min-height: 300px` (was 260px), `bg-zinc-950` (not black) for softer dark
- Generating overlay: subtle single-ring pulse (not aggressive double-ping) for calm animation
- Player: fade-from-black gradient over bottom controls for readability

#### PRIORITY 10 — Responsive Design
- Desktop: 5-col controls / 7-col preview
- Model selector row full-width at top (flex-wrap for mobile)
- Mobile: single column, all sections stack vertically
- Camera grid collapses to 2-col (same across all breakpoints since only 4 primary shown)
- Popovers use `z-50` / `z-40` appropriately with proper offset positioning

#### Accessibility
- `aria-expanded` on all popover triggers
- `aria-pressed` on all segmented pill buttons
- `aria-label` on textarea, all icon buttons (mute, play/pause, new scene, more options)
- `role="group"` + `aria-label` on duration/ratio/fps segmented controls
- `role="slider"` + arrow key support on video scrubber
- Creation menu: `aria-expanded` on `⋯` button
- Focus-visible rings on all interactive elements

#### Verification
- `npm run lint` → 0 errors, 0 warnings ✓
- `npx next build --webpack` → 17 static routes, 0 errors ✓

#### Known Limitations (Intentionally Deferred)
- No actual video generation (all mocked with setTimeout)
- No real model API calls
- No actual audio/playback (player is a simulated scrubber)
- Image-to-video, storyboard, audio, multi-scene, real download — all deferred to future

#### Files Changed in This Milestone
- `src/components/dashboard/VideoStudioWorkspace.tsx` — Full redesign
- `ECHOGPT_PROJECT_CONTEXT.md` — Updated

---

### Milestone 4.x: Image Studio UX Polish (Full Redesign)

#### PRIORITY 1 — Model Selector UX & Grouping
- **Root Cause & Fix**: ModelSelector was previously tucked inside the bottom toolbar of the prompt card, which had layout constraints and could awkwardly overlap or clip. Moved ModelSelector to a dedicated "Neural Engine" header row above the prompt card, outside any `overflow-hidden` containers.
- **Enhanced ModelSelector Component**:
  - Added `groupByTier?: boolean` prop: When enabled, groups models into `Free Models (Included)` and `Pro Models (Frontier)`.
  - Added tier filter pills: `[All Models] [Free] [Pro]` right under the search input when both tiers exist.
  - Clear PRO locked state indicator: Displays an amber lock icon and `Upgrade` badge instead of a plain muted lock.
  - Clicking a PRO model safely opens the global `UpgradeProModal` without attempting mock generation.
  - Dropdown uses `z-50`, natural alignment, and cleans up search and tier filter state on close/Escape.

#### PRIORITY 2 — Prompt Experience & Transformation Actions
- 1000-character limit with a subtle character counter (`prompt.length / 1000`) turning amber at 90% capacity.
- Comfortable textarea with focused `#713CF4` ring.
- **3 AI Transformation Mock Actions**:
  - `Enhance`: Contextual addition of volumetric lighting, ray-traced ambient occlusion, and 8K micro-textures.
  - `Rewrite`: Reframes prompt into an artistic director composition on Hasselblad camera.
  - `Expand`: Adds architectural backdrop, foreground layers, and color palette depth.
  - All actions feature interactive loading spinners (~700ms) and toast notifications.

#### PRIORITY 3 — Explore Prompts
- Compact popover trigger with `Compass` icon and curated blueprint library.
- Categorized by `All`, `Product`, `Portrait`, `Landscape`, `Architecture`, `Illustration`, `Marketing`, `Creative`.
- Real-time search filter inside popover.
- 1-click prompt loading into editor with clean toast feedback and popover auto-close.

#### PRIORITY 4 — Style Selector
- 6 high-value artistic styles: `3D Isometric`, `Photorealistic`, `Cinematic`, `Product Studio`, `Digital Anime`, `Illustration`.
- Rendered as a compact 3-column visual card selector with style-specific Lucide icons and descriptions.
- Clear active state with `#713CF4` border, background tint, and focus ring.

#### PRIORITY 5 — Essential Options
- **Aspect Ratio**: Segmented pill group (`1:1 Square`, `16:9 Cinema`, `9:16 Story`, `4:3 Classic`).
- **Batch Count**: Segmented control (`1 Image`, `2 Images`, `4 Images`).

#### PRIORITY 6 — Advanced Options Collapsible
- Grouped logically and collapsed by default:
  - **Generation Controls**: Guidance Scale (CFG slider 1.0–20.0 with live display), Diffusion Steps (20/30/50), Random Seed input with help text.
  - **Quality & Lighting**: Detail Level dropdown (Draft, High, Ultra), Lighting Mode dropdown (Studio Softbox, Natural, Dramatic, Ambient).
  - **Prompt Control**: Negative Prompt textarea to exclude unwanted visual elements.

#### PRIORITY 7 & 8 — Generation Workflow & Error UX
- 5-state generation flow: `IDLE → GENERATING → PROCESSING → COMPLETE` (+ `ERROR`).
- Animated neural synthesis state with ping/pulse rings and realistic progress bar.
- State messages: "Synthesizing latent neural space…" → "Refining micro-textures & upscaling…" → "Your image is ready."
- Interactive `Cancel` action to abort back to clean `IDLE` state.
- Dedicated `Error` state with clear status, retry instructions, and a `Retry Generation` button.

#### PRIORITY 9 & 10 — Dominant Preview Canvas & Export
- Large, prominent artwork canvas (7 columns on desktop) with aspect-ratio-accurate container and subtle grid overlay.
- Idle state with clean empty illustration.
- Interactive **Zoom Controls**: Fit, 100%, Zoom In (up to 150%), Zoom Out (down to 75%).
- **Fullscreen Mode**: Dedicated fullscreen toggle with floating exit button.
- **Batch Variants Selector**: When batch count > 1, variant switcher buttons appear (`#1`, `#2`, etc.) to review all generated variations.
- **Export Menu**: Dropdown supporting `PNG (Lossless)`, `JPEG (Web Standard)`, `WebP (Compressed)`, and `4K Master [PRO]` (gated to `UpgradeProModal`).
- Metadata strip: Model, Ratio, CFG, Latency (`1.1s`), Resolution.
- `New Artwork` button in canvas footer to start fresh.

#### PRIORITY 11 & 12 — Your Creations Gallery & Empty State
- Gallery grid with aspect-ratio previews, style badges, and timestamps.
- Card overflow menu (`⋯`) on each creation:
  - `Rename`: Inline prompt editing with Enter/Escape handlers.
  - `Favorite`: Toggles filled amber star indicator.
  - `Duplicate`: Generates local clone of the artwork card.
  - `Regenerate`: Restores prompt, style, and aspect ratio into the creation workspace.
  - `Delete`: Removes artwork with confirmation toast.
- Dedicated empty state when gallery is empty with icon, guidance, and "Generate your first image" CTA.

#### Responsive & Accessibility
- Responsive layout: 5/7 split on desktop, clean single-column flow on tablet/mobile.
- Zero `overflow-hidden` on parent containers holding popovers or dropdowns.
- Full keyboard accessibility: Escape closes popovers/menus, arrow keys for sliders, visible focus rings.
- Semantic HTML and ARIA labels throughout.

#### Verification
- `npm run lint` → 0 errors, 0 warnings ✓
- `npx next build --webpack` → 17 static routes prerendered, 0 errors ✓

#### Files Changed in This Milestone
- `src/components/dashboard/ModelSelector.tsx` — Added `groupByTier`, tier filter pills, and PRO upgrade indicator
- `src/components/dashboard/ImageStudioWorkspace.tsx` — Complete redesign
- `ECHOGPT_PROJECT_CONTEXT.md` — Updated

---

### Milestone 4.x: Studio Consistency & Creation Actions Menu Portal Fix

#### Problem Addressed
1. **Creation Card Overflow Menu Clipping**: On Video Studio, clicking the three-dot action menu (`⋯`) resulted in the menu being clipped or truncated. Root cause: The card wrapper had CSS `overflow: hidden` (`rounded-xl border overflow-hidden`), creating a clipping boundary that truncated any absolutely-positioned children regardless of `z-index`.
2. **Inconsistent "Your Creations" Sections**: Image Studio and Video Studio had divergent creation card UI, metadata layouts, and separate inline dropdown implementations.

#### Architecture & Implementation Solutions
1. **Portal-Based Menu Architecture (`CreationActionsMenu.tsx`)**:
   - Uses `createPortal(..., document.body)` so menus render directly under `document.body`, completely escaping any parent container clipping rectangles.
   - Dynamic viewport-aware positioning: measures trigger via `getBoundingClientRect()`, calculates available space below vs. above (`placement: "bottom" | "top"`), and clamps `left` coordinate to viewport boundaries (`12px` margin).
   - Real-time updates: recalculates position on scroll and resize, closes menu automatically if trigger scrolls out of viewport.
   - Full keyboard and pointer accessibility: click-outside listener, Escape key dismissal with focus restoration to trigger button, proper `aria-haspopup` and `role="menu"` attributes.
   - Zero-overhead hydration: uses `useSyncExternalStore` for SSR safety without cascading render warnings.
   - Smooth animation: `animate-in fade-in-50 zoom-in-95` with placement-aware transform origin.

2. **Unified Reusable Component (`CreationCard.tsx`)**:
   - Shared across both `ImageStudioWorkspace` and `VideoStudioWorkspace`.
   - Polymorphic media support: supports both `type: "image"` (Layers icon) and `type: "video"` (Play icon, video scanline overlay).
   - Gradient preview thumbnail with aspect-ratio badge, camera motion / art style badge, and favorite star indicator.
   - Distinct metadata footer: creation title with inline rename support (`Enter`/`Escape`), prompt description excerpt, model tag, and relative timestamp.
   - Standardized actions: Rename, Favorite/Unfavorite, Duplicate, Regenerate, Delete.

3. **Workspace Integration**:
   - Replaced old custom card implementations and state variables (`openMenuId`, `renamingId`, `renameValue`) in both `ImageStudioWorkspace.tsx` and `VideoStudioWorkspace.tsx`.
   - Unified handlers accepting typed `CreationItem` payloads.
   - Cleaned up unused imports across both files.

#### Verification
- `npm run lint` → 0 errors, 0 warnings across all files ✓
- `npm run build` (`next build --webpack`) → 17 static routes prerendered, 0 errors ✓

#### Files Created / Changed
- `src/components/dashboard/CreationActionsMenu.tsx` — **NEW** Portal-based viewport-aware action menu
- `src/components/dashboard/CreationCard.tsx` — **NEW** Unified creation card component
- `src/components/dashboard/VideoStudioWorkspace.tsx` — Updated to use `CreationCard`, removed old inline menu & unused imports
- `src/components/dashboard/ImageStudioWorkspace.tsx` — Updated to use `CreationCard`, removed old inline menu & unused imports
- `ECHOGPT_PROJECT_CONTEXT.md` — Updated

---

---

### Milestone 4.x: Subscriptions & Plans Experience Redesign

#### Reference-Driven UX Analysis & Transformation
- **Reference Image Analysis**: Studied original EchoGPT Subscription page screenshot containing 4 plan columns (Monthly $9.99, Quarterly $29.99, Half-Yearly $59.99, Annual $99.99), each redundantly listing 40+ AI models inside every single card, along with 10 FAQ questions and a customer support email link.
- **Flaws Eliminated from Original**:
  1. *Repetitive 40-model dump*: Instead of duplicating 40 model names in every pricing card, models are now organized into a dedicated, searchable, categorized **Neural Engines Browser** section.
  2. *Duplicate "Recommended" badges*: In the original, every plan had a "Recommended" badge. In our design, only the Annual Plan is highlighted as **Recommended (Best Value — Save 17%)**.
  3. *Unstructured FAQ*: Replaced flat list with an accessible interactive accordion with real-time keyword search.
  4. *Support link*: Transformed from plain text into an integrated **Customer Support Banner** navigating to the existing `/support` route.

#### Architecture & Sections Implemented
1. **Hero & Plan Overview**:
   - Compact hero with "Affordable Plans for Every Need" badge and strong heading.
   - Interactive segmented billing switcher: `All Durations`, `Monthly ($9.99/mo)`, `Annual ($99.99/yr — Save 17%)`.
2. **Pricing Plan Cards (`PRICING_PLANS`)**:
   - 4 distinct plans with clear value props:
     - **Monthly Plan**: $9.99/mo — maximum flexibility, cancel anytime.
     - **Quarterly Plan**: $29.99/quarter ($9.99/mo equivalent) — sustained sprint continuity.
     - **Semi-Annual Plan**: $59.99/6 mo ($9.99/mo equivalent) — 6 months uninterrupted reasoning.
     - **Annual Plan**: $99.99/yr ($8.33/mo equivalent, 17% savings) — Best Value, highlighted with `#713CF4` border and Crown badge.
   - Distinct, scannable bullet points highlighting frontier intelligence, daily tokens, Image & Video studio suites.
3. **AI Model Availability Catalog**:
   - Unifies `AI_MODELS`, `IMAGE_MODELS`, and `VIDEO_MODELS` from `@/config/models` (no duplicate database).
   - Real-time search filter and category pills: `All Models`, `Frontier Flagship`, `Deep Reasoning`, `Image Engines`, `Video Studios`, `Free Baseline`.
   - Polished compact model cards with domain icons, provider tags, context windows, and Free/PRO availability badges.
4. **Feature Comparison Matrix**:
   - Scannable side-by-side comparison across 4 categories: Core Intelligence, Creative Studios, Usage Quotas & Performance, Security & Support.
   - Mobile-responsive layout preventing horizontal overflow.
5. **Customer Support CTA Banner**:
   - Dedicated card: "Need help choosing the right plan?".
   - Next.js Link navigating directly to the verified `/support` route.
6. **Frequently Asked Questions (FAQ) Accordion**:
   - 10 comprehensive answers based on original EchoGPT policies.
   - Smooth accordion expand/collapse with chevron indicator.
   - Keyboard accessible (`aria-expanded`, `aria-controls`), plus real-time question search.
7. **Final Conversion CTA**:
   - Conversion-focused bottom banner with direct upgrade action.
8. **Interactive Mock Checkout Modal**:
   - Clicking "Subscribe" on any plan opens a checkout confirmation modal with plan details, effective monthly rate, and a clear demo notice.
   - Simulates activation and updates the user's active plan with a success toast.

#### Verification
- `npm run lint` → 0 errors, 0 warnings across all files ✓
- `npm run build` (`next build --webpack`) → 17 static routes prerendered, 0 errors ✓

#### Files Created / Changed
- `src/components/subscriptions/SubscriptionsWorkspace.tsx` — **NEW** Complete Subscriptions workspace component
- `src/app/(app)/subscriptions/page.tsx` — Mounted `SubscriptionsWorkspace` with updated metadata
- `ECHOGPT_PROJECT_CONTEXT.md` — Updated

---

## CURRENT MILESTONE

Current milestone:
Milestone 4.x — Subscriptions & Plans Experience Redesign

Status:
Completed ✓

Next milestone:
EchoGPT Landing Page (Single-page marketing website at /)

---

# 24. MY WORKING PREFERENCE

Explain things in simple Bangla.

When giving commands:
- provide exact commands
- explain briefly what each command does

When giving AI-agent prompts:
- provide a complete copy-paste prompt
- clearly define scope
- prevent unnecessary refactoring
- prevent scope creep


Do not overwhelm me with unnecessary theory.

The goal is to complete this assignment by 29 September 2026 with a polished, recruiter-ready result.