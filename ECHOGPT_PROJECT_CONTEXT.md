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
Web App Shell — Interaction & Theme Polish

Status:
Implemented and verified.

## COMPLETED WORK

- Implemented zero-dependency `ThemeProvider` using `useSyncExternalStore` (`src/context/ThemeContext.tsx`) with instant system detection, `localStorage` persistence, and zero-flicker inline script in `<head>`.
- Connected the Sidebar utility Theme button to dynamically toggle between Dark and Light mode with adaptive Sun/Moon icons and accessible ARIA attributes.
- Configured class-based dark mode (`@custom-variant dark (&:where(.dark, .dark *));`) and adaptive CSS variables in `src/app/globals.css`.
- Implemented functional "New Chat" interaction that resets conversation messages, clears input, resets mock assistant state, returns to empty state, and auto-focuses the prompt textarea.
- Created accessible `ModelSelector` popover dropdown (`src/components/dashboard/ModelSelector.tsx`) with neutral capability models ("Standard Model", "Fast Model", "Creative Studio Model", "Analytical Model"), Escape to close, outside click dismissal, and visible selection state.
- Made quick prompt action cards interactive: clicking cards pre-fills the prompt into the message input, updates navigation focus, and auto-focuses the textarea.
- Implemented functional frontend message input in `PlaceholderWorkspace`:
  - Multi-line textarea support with auto-expanding height
  - Enter to send, Shift+Enter for newlines
  - Real-time conversation message stream (user message on right, EchoGPT assistant message on left)
  - Simulated typing indicator with animated bouncing dots
  - Realistic mock responses tailored to the topic (SOP outline, Image Studio concepts, Model comparisons), clearly marked as demo/mock responses
  - One-click copy message content with visual "Copied" feedback
- Preserved brand identity: strict `#713CF4` primary accent, Lexend font, neutral white/zinc surfaces across both light and dark themes.

## FILES CREATED / MODIFIED

- `src/context/ThemeContext.tsx` (Created)
- `src/components/dashboard/ModelSelector.tsx` (Created)
- `src/components/dashboard/PlaceholderWorkspace.tsx` (Modified)
- `src/components/layout/Sidebar.tsx` (Modified)
- `src/app/globals.css` (Modified)
- `src/app/layout.tsx` (Modified)
- `src/app/page.tsx` (Modified)
- `src/components/layout/AppShell.tsx` (Preserved)
- `src/components/layout/NavItem.tsx` (Preserved)
- `src/components/layout/UpgradeCard.tsx` (Preserved)
- `src/components/layout/MobileNav.tsx` (Preserved)
- `src/config/navigation.ts` (Preserved)
- `src/types/navigation.ts` (Preserved)

## IMPORTANT DESIGN / ARCHITECTURE DECISIONS

- Modern React 19 `useSyncExternalStore` used for ThemeContext to prevent hydration tearing and avoid `setState` cascading renders in `useEffect`.
- Anti-FOUC script placed directly in `layout.tsx` `<head>` ensuring dark mode renders instantaneously without flash on page reload.
- Neutral model names ("Standard Model", "Fast Model", "Creative Studio Model", "Analytical Model") chosen to avoid fabricating unverified EchoGPT model version names.
- State reset on "New Chat" handled cleanly via React `key={chatSessionId}` remounting in `src/app/page.tsx`.
- Mock responses clearly labeled as simulated frontend responses, providing realistic feel without pretending to connect to a real backend AI.

## VERIFICATION

- `npm run lint` → passed (0 errors, 0 warnings)
- `npm run build` (`next build --webpack`) → passed (0 errors, static prerendering succeeded)
- Local dev server (`npm run dev`) → verified rendering on `http://localhost:3001`
- Dark/Light theme switching → verified with dynamic Sun/Moon icon toggle and full surface contrast
- Theme persistence across reloads → verified via `localStorage` + anti-flicker script
- Model selector dropdown → verified keyboard Escape dismissal, outside click, and selection
- Prompt card click → verified pre-fills textarea and auto-focuses cursor
- Chat input submission → verified Enter key submission, message bubble appearance, simulated typing indicator, and assistant reply
- "New Chat" button → verified resets conversation state to welcome screen and focuses input
- Multi-viewport layout (Desktop 1440px/1280px, Tablet 768px-1024px, Mobile 375px/430px) → verified without horizontal overflow

## KNOWN ISSUES

- None currently identified.

## NEXT STEPS

1. Conduct user visual walkthrough & feedback on interactive shell.
2. Implement dedicated `/chat` route or sub-pages while maintaining shell layout.
3. Wire individual sidebar items (`/image-studio`, `/compare`, `/history`, etc.) to Next.js file-system routes.
4. Prepare single-page EchoGPT landing website concept.

## CURRENT MILESTONE

Current milestone:
Web App Shell — Interaction & Theme Polish

Status:
Completed

Next milestone:
Web App Full Page Routing & Landing Page Planning

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