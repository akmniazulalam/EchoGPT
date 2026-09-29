# EchoGPT

> A modern AI productivity workspace and Chrome Side Panel concept, redesigned as a frontend engineering take-home project.

- **GitHub Repository**: [https://github.com/akmniazulalam/EchoGPT](https://github.com/akmniazulalam/EchoGPT)

---

## 1. Project Overview

**EchoGPT** is a comprehensive frontend implementation of an AI-driven productivity platform. Designed as a frontend engineering take-home assignment, the project explores high-density productivity interfaces, multi-model interaction patterns, and contextual browser tooling.

The project encompasses two interconnected user experiences:
1. **The Web Application**: A full-featured desktop and mobile workspace providing multi-turn chat, creative generation studios (Image & Video), multi-model benchmarking (`/compare`), Model Context Protocol (MCP) server management (`/connectors`), structured AI task workflows (`/tasks`), standard operating procedure creation (`/sop`), and ATS resume/job analysis (`/resume`).
2. **The Chrome Side Panel Concept (`/extension`)**: A simulated in-browser companion demonstrating how EchoGPT docks into a web browser context. It enables rapid contextual actions—such as summarizing live web content, inline drafting, multi-language translation, quick creative generation, model comparison, and local MCP tool invocation—all within a resizable side pane.

The primary focus is engineering excellence on the frontend: robust component architecture, fluid responsive behavior across demanding viewports, accessible keyboard interactions, zero-flash theme switching, and safe client-side persistence without requiring a backend database.

> **Note on Architecture**: The Chrome Side Panel experience is represented inside the Next.js application within a simulated browser frame for demonstration and review purposes, rather than distributed as a packaged Chrome Web Store extension.

---

## 2. Key Highlights

- **Simulated Chrome Side Panel (`/extension`)**: Interactive companion featuring a resizable frame (360px–1080px), 5 width presets, and 9 specialized views (Chat, Write, Read, Translate, Image, Video, Compare, MCP, Settings).
- **Anti-FOUC Theme Engine**: Seamless dark and light mode with zero millisecond flash of unstyled content, powered by Next.js `beforeInteractive` script execution and React `useSyncExternalStore`.
- **Multi-Model Compare Workspace (`/compare`)**: Parallel prompt execution across multiple leading AI models (EchoGPT, GPT-4o, Claude 3.7 Sonnet, DeepSeek R1) with side-by-side card inspection and single-model focus mode.
- **Model Context Protocol (MCP) Interface (`/connectors`)**: Server connection lifecycle management, tool discovery catalog, live search, and active tool selection directly integrated into chat.
- **Creative Studios (`/image-studio`, `/video-studio`)**: High-density creative workflows with aspect ratio selectors, style presets, camera movement controls, generation states, lightbox zoom, and gallery management.
- **Configuration-Driven AI Tasks (`/tasks`)**: 25 pre-configured tasks across 4 categories (Ideas, Work, Fun, Online Content) with interactive parameter forms that compile directly into structured chat prompts.
- **End-to-End Client Persistence**: Safe browser `localStorage` management preserving active tabs, resizable panel dimensions, conversation histories with tool badges, user settings, model selections, and demo auth states.
- **Accessible & Ergonomic UX**: Strict Escape key dismissal, outside-click popover/modal closing, keyboard navigation, accessible contrast ratios, and container queries (`@container`).
- **Demo Authentication Flow**: Fully functional client-side sign-in, sign-up, and password recovery states with immediate avatar updates across the app shell.
- **Modular Landing Page (`/`)**: 16 dedicated sections showcasing feature workflows, model capabilities, pricing tiers, FAQs, and quick entry points.

---

## 3. Features

### AI Workspace (`/chat`)
- **Conversational Reasoning**: Multi-turn chat interface with real-time response simulation, markdown formatting, code block copy, and suggested conversation prompts.
- **Curated Model Selector**: Interactive modal providing search, category filtering (Flagship, Reasoning, Fast, Open Source), context window specifications, and Pro tier badges across 35 models.
- **Voice & File Input**: Integrated speech-to-text input (via Web Speech API with browser fallback), file/screenshot attachment previews, and active MCP connector injection.
- **Pro Gating Integration**: Smooth upgrade triggers for Pro-tier models (e.g., Claude 3.7 Sonnet, o3-mini, Gemini 2.5 Pro) with demo activation controls.

### Creative Studios (`/image-studio` & `/video-studio`)
- **Image Studio**: Prompt engineering studio featuring model selection (FLUX.1, Midjourney v6, DALL-E 3, SD 3.5), aspect ratio toggles (1:1, 16:9, 9:16, 4:3), color grading, style presets (Cinematic, Anime, Digital Art, Photorealistic), batch creation, full-screen lightbox preview, and download triggers.
- **Video Studio**: Video generation console supporting motion control parameters, camera movements (Pan, Tilt, Zoom, Orbit), duration selections (5s, 10s), prompt enhancement, timeline processing indicators, and video card actions.

### Compare (`/compare`)
- **Multi-Model Benchmarking**: Side-by-side evaluation of up to 4 models simultaneously.
- **Focus Mode**: Single-click expansion into a deep-dive view with full response breakdown, token metrics, generation timing, and quick response copy.
- **Benchmark Library**: Preloaded comparison prompts covering architectural trade-offs, algorithms, code optimization, and systems design.

### Connectors (`/connectors`)
- **MCP Ecosystem**: Management dashboard for Model Context Protocol servers (GitHub, PostgreSQL, Slack, Brave Search, Filesystem, Google Drive).
- **Server Lifecycle**: Interactive connection testing, failure/retry states, authentication tokens, and toggleable enable/disable switches.
- **Tool Inspection**: Server modal inspecting available tools, schema names, parameter descriptions, and active status in conversations.
- **Chat Popover Integration**: Quick-toggle connector popover directly accessible within the chat composer.

### AI Tasks (`/tasks`)
- **25 Structured Workflows**: Categorized into **Ideas** (5), **Work** (5), **Fun** (5), and **Online Content** (10).
- **Dynamic Input Fields**: Tailored form fields (text, textarea, select dropdowns) with input validation and requirement lists.
- **Prompt Compilation**: Automatic compilation into an optimized, structured prompt redirected into `/chat` with the recommended model preselected.

### Resume Analysis & SOP Builder (`/resume` & `/sop`)
- **Job Analysis Workspace (`/resume`)**: Paste job descriptions to extract required competencies, ATS keyword matching, qualification gaps, and interview prep suggestions.
- **SOP Builder (`/sop`)**: Step-by-step Standard Operating Procedure generator producing structured process documentation with objective definitions, scope, phased checklists, and verification checkpoints.

### Authentication (`/signin`, `/signup`, `/forgot-password`)
- Clean, focused authentication screens with client-side form validation, password visibility toggles, and simulated sign-in/sign-up state updates stored locally.

### Landing Page (`/`)
- Polished marketing experience with 16 modular components: Hero, Capability Strip, Product Previews, Core Features, Creative Studio Showcase, Model Matrix, Connectors Showcase, Tasks Directory, Why EchoGPT, Pricing Calculator, FAQ Accordion, CTA Banner, and Footer.

---

## 4. Chrome Side Panel Design

A central objective of the take-home assignment was reimagining the EchoGPT Chrome Extension. In real-world workflows, users switch between deep creative tasks on a full desktop application and rapid contextual actions while browsing.

The simulated extension at `/extension` showcases how EchoGPT behaves as a native Chrome Side Panel docked alongside web content.

```
┌───────────────────────────────────────────────┬───────────────────────────────┐
│              Simulated Browser                │      EchoGPT Side Panel       │
│                                               │                               │
│  [Tabs] [URL Bar / Address Bar] [Actions]     │  [Header: Tab, New Chat, Pin] │
│ ───────────────────────────────────────────── │ ───────────────────────────── │
│                                               │ [Active View]     [Nav Rail]  │
│  Active Web Page Context                      │ • Chat            • Chat      │
│  (e.g., Next.js Documentation / Article)      │ • Write           • Write     │
│                                               │ • Read            • Read      │
│                                               │ • Translate       • Translate │
│                                               │ • Image / Video   • Image     │
│                                               │ • Compare         • Video     │
│                                               │ • MCP             • Compare   │
│                                               │ • Settings        • MCP       │
│                                               │                   • Settings  │
│                                               │                               │
│                                            ◄──┼──► (Drag to Resize: 360-1080px│
└───────────────────────────────────────────────┴───────────────────────────────┘
```

### Side Panel Architecture
- **Simulated Browser Shell**: Features realistic window controls, tabs, omnibox with lock status, navigation buttons, and a functional browser reload button that triggers a simulated page reload overlay.
- **Horizontal Resize Engine**: Ergonomic drag handle supporting mouse and touch resizing clamped between **360px** and **1080px**.
- **Quick Width Presets**: Top-bar shortcut pills for testing key panel widths: `360px`, `440px`, `720px`, `900px`, and `1080px`.
- **Vertical Navigation Rail**: Compact right-hand rail allowing single-click switching across all 9 extension tools.
- **Contextual Tooling**:
  - **Write**: Prompt composer with format selection (Email, Blog, Paragraph, Code, Bullets), tone modifiers, length sliders, language selector, and direct "Insert to Chat".
  - **Read**: Live DOM context analyzer generating page summaries, key takeaways, action items, and FAQs.
  - **Translate**: Multi-language translation engine with language auto-detection, swap controls, and model dropdown.
  - **Image & Video**: Quick prompt entry with generation previews that save directly into panel history.
  - **Compare**: Multi-model comparison card layout adapting via CSS container queries, with an internal modal dialog clamped within panel bounds.
  - **MCP**: Quick overview of connected tools and one-click link to full workspace management.
  - **History Drawer**: Slide-over drawer listing past conversations tagged with tool badges (`Chat`, `Write`, `Read`, `Translate`, `Image`, `Video`, `Compare`).
  - **Settings**: Persistent configuration for default models, temperature, stream toggles, auto-context injection, and shortcut management.

---

## 5. Responsive Design

The interface is engineered to adapt gracefully across various screen sizes:

### Web Application
- **Mobile Drawer Navigation**: Below `1024px`, the application shell collapses the primary sidebar into an accessible mobile slide-out drawer triggered from the top navigation bar.
- **Fluid Grid Layouts**: Task catalogs, model grids, and studio creation galleries transition smoothly from 1 column on mobile (`<640px`) to 2 columns on tablet (`768px`) and 3–4 columns on wide displays (`1280px+`).
- **Flexible Composer**: Chat inputs dynamically adjust padding and button arrangements to avoid overflow on narrow screens.

### Chrome Side Panel QA Widths
The side panel was validated across six explicit widths:

| Width | Profile | Layout Characteristics |
|---|---|---|
| **360px** | Minimum Boundary | Single-column stacks, icon-only secondary buttons, wrapped action toolbars, compact typography. |
| **440px** | Default Panel | Standard Chrome Side Panel width; optimized balance of input height and content density. |
| **580px** | Intermediate | Enhanced spacing, dual-column input rows in Write and Translate views. |
| **720px** | Standard Desktop | Full horizontal toolbars, comfortable multi-card display for quick actions. |
| **900px** | Wide Panel | Container queries trigger dual-column comparison cards (`@lg:grid-cols-2`) and expanded image galleries. |
| **1080px** | Maximum Boundary | Full multi-column studio preview layout with maximum reading area; settings centered with `max-w-2xl`. |

---

## 6. Persistence & State Management

All application state is managed purely on the client side using browser storage. State is isolated into purpose-built storage utilities to ensure zero SSR hydration mismatches:

| Storage Key | Scope | Content Stored |
|---|---|---|
| `echogpt_theme` | Global | Active theme mode (`"dark"` or `"light"`), evaluated synchronously before hydration. |
| `echogpt:extension-panel-width` | Extension | Clamped numerical side panel width (360–1080px). |
| `echogpt:extension-active-tab` | Extension | Last selected extension tool tab (`"chat"`, `"write"`, etc.). |
| `echogpt:extension-conversations` | Extension | Serialized conversation array with messages, timestamps, and tool types. |
| `echogpt:extension-active-conv-id` | Extension | Identifier of the active conversation in the side panel. |
| `echogpt:extension-settings` | Extension | User preferences (default model, temperature, streaming, context, shortcuts). |
| `echogpt:chat-history` | Web App | Main workspace conversation list, message arrays, and metadata. |
| `echogpt:selected-model` | Web App | Last chosen model identifier in `/chat`. |
| `echogpt:connectors` | Web App | Registered MCP connectors, credentials, and connection statuses. |
| `echogpt:active-chat-connectors` | Web App | List of connector IDs currently active for chat context injection. |
| `echogpt:demo-auth-user` | Auth | Demo user profile (name, email, login timestamp). |
| `echogpt:is-demo-pro` | Billing | Boolean flag enabling Pro model access in the demo environment. |

> **Security Note**: `localStorage` is used strictly for frontend evaluation and state persistence. No production secrets, tokens, or plaintext passwords are stored.

---

## 7. Authentication

Authentication in this repository is implemented as a **frontend demonstration flow**:

- **Sign In (`/signin`)**: Allows sign-in with email and password, updating the application shell with user initials and profile state.
- **Sign Up (`/signup`)**: Form flow with full validation, terms agreement, and initial account instantiation.
- **Forgot Password (`/forgot-password`)**: Multi-step simulation that verifies email submission and provides a demo reset state.

*Disclaimer: This is a frontend demo flow. It does not communicate with a real authentication backend or identity provider, and is not designed for production user security.*

---

## 8. Accessibility & UX

- **Keyboard Dismissal**: All dialogs, popovers, model selectors, and drawers close on `Escape`.
- **Outside-Click Detection**: Custom event listeners cleanly dismiss open dropdowns and popups when clicking outside their bounding rects.
- **Safe Hydration Boundaries**: Anti-FOUC theme script uses `next/script` with `strategy="beforeInteractive"`, and client-persisted extension frames utilize client wrappers to eliminate React hydration warnings.
- **Focus Management**: Form elements and interactive buttons feature distinct focus rings (`focus-visible:ring-2 focus-visible:ring-[#713CF4]`).
- **Color Contrast**: Typography and UI borders across both light (`#FCFCFD` / `zinc-900`) and dark (`#090A0F` / `zinc-100`) themes maintain high contrast ratios.
- **Reduced Motion**: Transitions are tuned with quick easing (`duration-150`, `duration-200`) to prevent jarring visual shifts while respecting user motion preferences.

---

## 9. Design System & Frontend Architecture

```
src/
├── app/                  # Next.js 16 App Router pages and route groups
│   ├── (app)/            # Authenticated workspace layout and sub-routes
│   ├── (landing)/        # Authentication routes (signin, signup, forgot-password)
│   ├── extension/        # Chrome Side Panel simulated page
│   ├── layout.tsx        # Root layout with theme script injection
│   └── page.tsx          # Marketing landing page
├── components/           # Reusable React components organized by domain
│   ├── auth/             # Sign-in, sign-up, and password recovery forms
│   ├── dashboard/        # Workspace implementations (Chat, Studio, Compare, Connectors, Tasks)
│   ├── extension/        # Chrome Side Panel views, browser chrome, and storage handlers
│   ├── landing/          # Modular landing page sections
│   ├── layout/           # AppShell, Sidebar, Header, MobileNav
│   └── ui/               # Primitive components (Button, Modal, Badge, Toast, ModelLogo)
├── config/               # Centralized configuration and catalogs
│   ├── models.ts         # 35 AI model definitions, categories, and providers
│   ├── navigation.ts     # Workspace route definitions and navigation metadata
│   └── tasks.ts          # 25 structured task schemas with prompt generators
├── context/              # React Context Providers (Theme, Connectors, Pro Modal)
├── lib/                  # Storage abstractions, mock services, and helper utilities
└── types/                # Shared TypeScript interfaces and domain types
```

### Architectural Principles
- **Next.js App Router (16.3.6)**: Clean route separation using route groups `(app)` and `(landing)` to isolate workspace chrome from marketing and authentication layouts.
- **Configuration-Driven Catalogs**: Models (`AI_MODELS`) and task workflows (`AI_TASKS`) are defined in central schema files. This eliminates hardcoded UI strings and makes adding new models or tasks straightforward.
- **Custom React Hooks & Store Sync**: `ThemeContext` and `UpgradeModalContext` leverage `useSyncExternalStore` to synchronize browser events (`storage`, `matchMedia`) without triggering unnecessary cascading re-renders or hydration mismatches.
- **CSS Container Queries**: Used in the extension side panel (`@container`, `@lg:grid-cols-2`) to allow child cards to adapt based on panel width rather than viewport width alone.

---

## 10. Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| **Next.js** | `16.3.6` | App Router framework, static page prerendering, dynamic route splitting |
| **React** | `19.2.8` | Component architecture, state hooks, `useSyncExternalStore` |
| **React DOM** | `19.2.8` | Document object model rendering and hydration |
| **TypeScript** | `5.x` | End-to-end static typing across models, tasks, and components |
| **Tailwind CSS** | `4.x` | Utility-first styling, CSS variable themes, and container queries |
| **@tailwindcss/postcss** | `4.x` | PostCSS processing for Tailwind CSS v4 pipeline |
| **Lucide React** | `^1.47.0` | Comprehensive icon set for navigation, actions, and status indicators |
| **ESLint** | `^9.x` | Code quality enforcement with `eslint-config-next` |

---

## 11. Getting Started

### Prerequisites
- **Node.js**: `v20.x` or higher (verified on `v24.14.0`)
- **Package Manager**: `npm` (v10+ or v11+)

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/akmniazulalam/EchoGPT.git
cd EchoGPT
npm install
```

### Development
Start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
To create an optimized production build:
```bash
npm run build
```
To run the production server:
```bash
npm run start
```

### Code Quality (Linting)
Run ESLint to check for code quality and type consistency:
```bash
npm run lint
```

### Environment Variables
**No environment variables are required** to run this project. All AI responses, tool executions, and authentication states are fully self-contained on the client side for demonstration purposes.

---

## 12. Available Routes

| Route | View | Description |
|---|---|---|
| `/` | Landing Page | Full marketing showcase featuring 16 modular product sections. |
| `/chat` | AI Workspace | Primary multi-turn chat interface with model selector and tool attachments. |
| `/extension` | Chrome Side Panel | Simulated in-browser companion with 9 tools and resizable frame (360–1080px). |
| `/image-studio` | Image Studio | Creative generation workspace with styles, ratios, and gallery lightbox. |
| `/video-studio` | Video Studio | Video generation console with camera controls, durations, and processing states. |
| `/compare` | Multi-Model Compare | Side-by-side prompt benchmarking across 4 models with focus mode. |
| `/connectors` | MCP Management | Dashboard for Model Context Protocol servers, tool inspection, and testing. |
| `/tasks` | AI Tasks | 25 structured task workflows across 4 categories with custom prompt forms. |
| `/resume` | Job Analysis | ATS keyword extraction, skill requirements, and gap analysis tool. |
| `/sop` | SOP Builder | Phased Standard Operating Procedure authoring and checklist generator. |
| `/history` | History | Browsable archive of conversations with search and filter capabilities. |
| `/subscriptions` | Pricing / Billing | Plan tiers, feature comparison matrix, and billing cycle options. |
| `/store` | Prompt & Model Store | Directory of community prompts, workflows, and specialized models. |
| `/support` | Help & FAQ | Support center with categorized guides and searchable assistance. |
| `/newsletter` | AI Newsletter | Curated digest preview of AI industry breakthroughs and workflows. |
| `/api-platform` | API Platform | Developer documentation and endpoint explorer for the EchoGPT platform. |
| `/signin` | Sign In | Client-side demo authentication sign-in form. |
| `/signup` | Sign Up | Client-side demo account registration form. |
| `/forgot-password`| Password Recovery | Multi-step demo password reset workflow. |
| `/ai-tasks` | Redirect | Legacy alias redirecting to `/tasks`. |
| `/ai-sop-builder`| Redirect | Legacy alias redirecting to `/sop`. |

---

## 13. Assumptions & Scope

1. **Frontend-Only Scope**: This project is implemented as a frontend engineering take-home assignment. All AI model outputs, streaming simulations, video generation queues, and connector handshakes operate purely via client-side logic without incurring external API costs.
2. **Simulated Chrome Side Panel**: The Chrome Side Panel experience is hosted inside `/extension` within a mock browser frame. This provides a direct, zero-install evaluation environment rather than requiring a separately packaged unpacked extension.
3. **Demo Authentication**: Account creation and sign-in workflows are client-side simulations utilizing `localStorage`. Passwords are not hashed or securely processed by a production authentication backend.
4. **Client-Side Persistence**: Browser `localStorage` is used to persist user preferences, conversations, and panel widths across reloads.
5. **Evaluation Target**: The primary focus is code quality, component modularity, responsive behavior, visual polish, and realistic UX patterns.

---

## 14. Additional Features Implemented

Beyond the foundational assignment requirements, several notable engineering features were added:

1. **Anti-FOUC Dark/Light Theme Switching**: Zero flash of unstyled content achieved using an inline `beforeInteractive` script in root layout alongside `useSyncExternalStore` in `ThemeContext`.
2. **Resizable Extension with 5 Quick Presets**: Dynamic drag handle (360px–1080px) with dedicated one-click preset buttons (`360px`, `440px`, `720px`, `900px`, `1080px`).
3. **Multi-Tool Extension History**: The side panel's history drawer captures items generated across all tools (Write, Read, Translate, Image, Video, Compare) with dedicated visual badges.
4. **Interactive Model Search in Translate View**: Complete search dropdown with provider logos and PRO indicators embedded within the extension translate tool.
5. **Escape Key & Outside-Click Dismissal**: Universal listener architecture across all modals, drawers, and popovers.
6. **Container Query Optimization**: Responsive layouts inside the side panel adapt based on panel width (`@container`) rather than viewport width.
7. **Simulated MCP Server Handshake**: Realistic latency, status transitions (connecting, connected, failed, disabled), and retry mechanics.
8. **Interactive 25-Task System**: Fully implemented form schemas producing tailored LLM prompts for each specific workflow.
9. **Single-Model Focus Mode in Compare**: Expanded modal allowing deep examination of individual model outputs.
10. **Simulated Browser Reload**: Interactive reload button in the mock browser omnibox that displays a loading state over the simulated frame.

---

## 15. Engineering Decisions & Trade-offs

- **Why `localStorage` instead of IndexedDB or a Mock Backend?**  
  `localStorage` offers synchronous initialization on the client, zero external dependencies, and immediate persistence for lightweight settings and mock conversations. To prevent SSR hydration warnings, reads are synchronized via `useSyncExternalStore` or deferred to post-hydration effects.
- **Why a Simulated Browser Frame for `/extension`?**  
  Packaging a real Chrome extension requires loading unpacked extensions via developer mode, which limits immediate reviewer evaluation. The simulated browser frame showcases the exact UX, spatial relationships, and drag-resizing behavior directly within standard browser tabs.
- **Why Configuration-Driven Models and Tasks?**  
  Centralizing model specifications (`src/config/models.ts`) and task schemas (`src/config/tasks.ts`) ensures that additions or updates automatically propagate across dropdowns, cards, prompts, and badges without touching UI templates.
- **Why `next/dynamic` with `ssr: false` for the Extension Frame?**  
  The extension frame relies heavily on client-side properties (window dimensions, drag events, stored panel width). Using a client wrapper with `ssr: false` eliminates SSR-to-client hydration discrepancies entirely while rendering an exact-match placeholder during initial page load.

---

## 16. Validation

- **ESLint**: Passed with exit code `0` (`npm run lint`). Zero linting errors.
- **Production Build**: Passed with exit code `0` (`npm run build`). All **23 static routes** compiled and prerendered cleanly.
- **Manual QA Matrix**:
  - Resized panel smoothly from 360px to 1080px via drag handle and preset buttons.
  - Verified persistence of active tab, panel width, conversations, and settings across hard page reloads.
  - Confirmed Escape key and outside-click dismissal across all dropdowns, popovers, and modals.
  - Verified zero-flash theme persistence in both dark and light modes.
  - Verified responsive navigation drawer functionality on mobile screen widths.

---

## 17. Known Limitations

- **Simulated Inference**: Responses from models and tools are generated from structured mock templates rather than live LLM APIs.
- **Client-Side Auth**: Sign-in is simulated; credentials are not validated against an external database or identity provider.
- **Web Speech API Support**: Voice input depends on browser support for the `webkitSpeechRecognition` API (best supported in Chromium-based browsers).
- **Storage Quota**: Extremely large conversation histories may be limited by standard browser `localStorage` quotas (typically ~5MB).

---

## 18. Future Improvements

- **Live LLM Integration**: Connect chat and studio workspaces to real API providers (OpenAI, Anthropic, Google Gemini, OpenRouter) via secure Next.js Route Handlers.
- **Full Chrome Extension Packaging**: Export the `/extension` side panel components into a standalone Manifest V3 Chrome Extension (`manifest.json`, background service worker, side panel API).
- **Backend Persistence**: Migrate from client storage to Supabase, PostgreSQL, or Convex for multi-device history synchronization.
- **Automated Test Suite**: Implement unit and integration testing with Vitest / React Testing Library, and end-to-end user journey tests with Playwright.
- **Real MCP Server Integration**: Connect to actual local or remote Model Context Protocol servers over SSE (Server-Sent Events) or WebSockets.

---

## 19. Demo & Screenshots

To explore the application and Chrome Side Panel interactively, start the local development server:

```bash
npm run dev
```

Key URLs to test:
- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **Chrome Side Panel**: [http://localhost:3000/extension](http://localhost:3000/extension)
- **AI Workspace**: [http://localhost:3000/chat](http://localhost:3000/chat)
- **Model Comparison**: [http://localhost:3000/compare](http://localhost:3000/compare)
- **Creative Studios**: [http://localhost:3000/image-studio](http://localhost:3000/image-studio) & [http://localhost:3000/video-studio](http://localhost:3000/video-studio)
- **MCP Connectors**: [http://localhost:3000/connectors](http://localhost:3000/connectors)

---

## 20. Assignment Notes

This project was developed as a frontend engineering take-home assignment submission. It demonstrates modern React architecture, Next.js App Router patterns, responsive design, accessible UI interactions, and thoughtful product engineering.
