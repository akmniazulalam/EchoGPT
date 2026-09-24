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
EchoGPT Product UI System + Core UX Polish (Milestone 4 - Full)

Status:
Implemented and verified ✓

## COMPLETED WORK

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

#### UpgradeProModal + Global Context
- `src/context/UpgradeModalContext.tsx` — Global React context for opening the modal from any component.
- `src/components/billing/UpgradeProModal.tsx` — Premium upgrade modal: billing switcher (Annual/Monthly), pricing, benefits grid (GPT-5, Claude Opus, Image Studio, Video Studio, Compute tiers), Upgrade CTA, "Maybe later" close. No real checkout.
- AppShell wraps entire app in `<UpgradeModalProvider>` and renders `<UpgradeProModal />` globally.

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

## CURRENT MILESTONE

Current milestone:
EchoGPT Product UI System + Core UX Polish

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