export type TaskCategory = "ideas" | "work" | "fun" | "online-content";

export interface TaskFieldOption {
  label: string;
  value: string;
}

export interface TaskInputField {
  id: string;
  label: string;
  placeholder?: string;
  type: "text" | "textarea" | "select";
  options?: TaskFieldOption[];
  defaultValue?: string;
  required?: boolean;
  helperText?: string;
}

export interface TaskDefinition {
  id: string;
  title: string;
  category: TaskCategory;
  description: string;
  detailedDescription: string;
  requirements: string[];
  expectedOutput: string;
  isPro?: boolean;
  badge?: string;
  iconName: string;
  iconEmoji: string;
  recommendedModel: string;
  keywords: string[];
  fields: TaskInputField[];
  generatePrompt: (values: Record<string, string>) => string;
}

export const TASK_CATEGORIES: { id: TaskCategory; label: string; count: number }[] = [
  { id: "ideas", label: "Ideas", count: 5 },
  { id: "work", label: "Work", count: 5 },
  { id: "fun", label: "Fun", count: 5 },
  { id: "online-content", label: "Online Content", count: 10 },
];

export const AI_TASKS: TaskDefinition[] = [
  // ──────────────────────────────────────────────────────────────────────────
  // 1. IDEAS CATEGORY (5 Tasks)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "think-outside-the-box",
    title: "Think Outside the Box",
    category: "ideas",
    description: "Breakthrough ideas await your discovery",
    detailedDescription:
      "A divergent brainstorming engine designed to smash conventional boundaries and discover high-impact, non-obvious angles for your project or challenge.",
    requirements: [
      "Core challenge or concept you want to explore",
      "Target demographic or user context",
      "Any constraints or orthodoxies to challenge",
    ],
    expectedOutput:
      "5 unconventional angles, provocative 'what if' scenarios, and high-potential novel strategies.",
    isPro: false,
    badge: "Popular",
    iconName: "Sparkles",
    iconEmoji: "🧐",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["brainstorm", "creativity", "unconventional", "strategy", "innovation", "ideas"],
    fields: [
      {
        id: "topic",
        label: "Your Challenge or Project Domain",
        placeholder: "e.g., Launching a privacy-first personal health analytics tool",
        type: "text",
        required: true,
      },
      {
        id: "targetAudience",
        label: "Target Audience",
        placeholder: "e.g., Tech-savvy fitness enthusiasts and health biohackers",
        type: "text",
        defaultValue: "General audience",
      },
      {
        id: "angle",
        label: "Brainstorming Direction",
        type: "select",
        defaultValue: "disruptive",
        options: [
          { label: "Disruptive & Radical", value: "disruptive" },
          { label: "Minimalist & Frictionless", value: "minimalist" },
          { label: "Community & Viral Driven", value: "community" },
          { label: "Cross-Industry Fusion", value: "cross-industry" },
        ],
      },
      {
        id: "notes",
        label: "Specific Constraints or Nuances (Optional)",
        placeholder: "e.g., Must work without cloud tracking; low initial budget.",
        type: "textarea",
      },
    ],
    generatePrompt: (v) =>
      `Act as an elite innovation strategist and creative director. Help me "Think Outside the Box" for the following challenge:

• Project / Challenge: ${v.topic || "Innovative Digital Product"}
• Target Audience: ${v.targetAudience || "General Audience"}
• Innovation Angle: ${v.angle || "Disruptive & Radical"}
${v.notes ? `• Specific Constraints: ${v.notes}` : ""}

Please provide:
1. Three core industry orthodoxies / assumptions that everyone accepts, and how to invert them.
2. Five radically unconventional concept angles with real-world execution feasibility.
3. Two provocative 'What If?' scenarios that could lead to 10x viral differentiation.
4. A concrete first milestone prototype experiment.`,
  },
  {
    id: "startup",
    title: "Startup",
    category: "ideas",
    description: "Get a list of ambitious startup ideas based on your area of interest",
    detailedDescription:
      "A comprehensive startup concept incubator that produces vetted value propositions, market differentiation, revenue models, and MVP roadmaps.",
    requirements: [
      "Industry or problem space you are passionate about",
      "Preferred monetization method (SaaS, marketplace, freemium)",
      "Target beachhead customer profile",
    ],
    expectedOutput:
      "3-4 vetted startup concepts with problem statements, value props, unfair advantages, and monetization blueprints.",
    isPro: true,
    badge: "PRO",
    iconName: "Rocket",
    iconEmoji: "🚀",
    recommendedModel: "GPT-4o (Reasoning)",
    keywords: ["startup", "business", "founder", "saas", "venture", "mvp", "monetization"],
    fields: [
      {
        id: "domain",
        label: "Industry or Problem Space",
        placeholder: "e.g., B2B Developer tools, AI Workflow automation, Sustainable logistics",
        type: "text",
        required: true,
      },
      {
        id: "businessModel",
        label: "Preferred Business Model",
        type: "select",
        defaultValue: "b2b_saas",
        options: [
          { label: "B2B SaaS (Subscription)", value: "b2b_saas" },
          { label: "Two-Sided Marketplace", value: "marketplace" },
          { label: "Usage-Based Developer API", value: "api" },
          { label: "AI Copilot / Agent Service", value: "ai_service" },
        ],
      },
      {
        id: "budgetScope",
        label: "Execution Scope",
        type: "select",
        defaultValue: "bootstrapped",
        options: [
          { label: "Bootstrapped / Indie Hacker MVP", value: "bootstrapped" },
          { label: "Venture-Scale / Seed Round", value: "venture" },
        ],
      },
      {
        id: "notes",
        label: "Your Background or Unfair Advantage (Optional)",
        placeholder: "e.g., 5 years experience in logistics software and frontend design.",
        type: "textarea",
      },
    ],
    generatePrompt: (v) =>
      `Act as a Y Combinator partner and seasoned venture architect. Incubate ambitious startup concepts for:

• Domain / Problem Space: ${v.domain || "AI-powered productivity"}
• Preferred Business Model: ${v.businessModel || "B2B SaaS"}
• Execution Scope: ${v.budgetScope || "Bootstrapped MVP"}
${v.notes ? `• Founder Superpower / Context: ${v.notes}` : ""}

Provide 3 vetted startup concepts:
For each concept, detail:
- Catchy Working Name & One-Liner Pitch
- The Burning Problem & The Target Customer Persona
- The Unfair Advantage / Moat
- Unit Economics & Revenue Model
- 2-Week MVP Spec: What to build first to validate traction.`,
  },
  {
    id: "innovate-and-elevate",
    title: "Innovate and Elevate",
    category: "ideas",
    description: "Your guide to unique and fresh ideas",
    detailedDescription:
      "A feature modernization and differentiation engine designed to transform existing products into market-leading, high-retention experiences.",
    requirements: [
      "Existing product or feature description",
      "Current bottlenecks or user drop-off points",
      "Key competitors you want to outpace",
    ],
    expectedOutput:
      "High-impact feature innovations, UX enhancements, and a competitive differentiation matrix.",
    isPro: false,
    badge: "Trending",
    iconName: "TrendingUp",
    iconEmoji: "🪄",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["innovate", "elevate", "product", "features", "growth", "ux", "differentiation"],
    fields: [
      {
        id: "productName",
        label: "Product Name & Core Offering",
        placeholder: "e.g., EchoTask - a team task management Kanban board",
        type: "text",
        required: true,
      },
      {
        id: "competitors",
        label: "Main Competitors",
        placeholder: "e.g., Trello, Linear, Asana",
        type: "text",
      },
      {
        id: "focusArea",
        label: "Elevation Focus",
        type: "select",
        defaultValue: "retention",
        options: [
          { label: "User Retention & Habit Loop", value: "retention" },
          { label: "AI Automation & Intelligence", value: "ai_automation" },
          { label: "Frictionless Onboarding", value: "onboarding" },
          { label: "Delightful Micro-Interactions", value: "delight" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as a Chief Product Officer and Growth Architect. Innovate and elevate the following product:

• Product: ${v.productName || "Digital Web Application"}
• Competitors: ${v.competitors || "Industry leaders"}
• Core Focus: ${v.focusArea || "User Retention & Habit Loop"}

Deliver:
1. Competitive Differentiation Analysis: What competitors get wrong and how to exploit it.
2. Three 10x Feature Innovations that feel futuristic yet technically implementable.
3. Micro-Interaction and UX Polish Recommendations to spark organic user advocacy.
4. Prioritized Feature Matrix (Impact vs. Effort).`,
  },
  {
    id: "unleashing-creativity",
    title: "Unleashing Creativity",
    category: "ideas",
    description: "Explore a world of brilliant ideas",
    detailedDescription:
      "A generative thinking catalyst using SCAMPER, lateral metaphors, and sensory prompts to dissolve creative blocks in any medium.",
    requirements: [
      "Creative discipline (writing, art, design, brand)",
      "Theme or topic you feel stuck on",
      "Desired tone or emotional resonance",
    ],
    expectedOutput:
      "Divergent creative concepts, unexpected metaphor pairings, and structured inspiration prompts.",
    isPro: false,
    iconName: "Palette",
    iconEmoji: "🎨",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["creative", "inspiration", "block", "scamper", "art", "writing", "design"],
    fields: [
      {
        id: "topic",
        label: "What are you creating?",
        placeholder: "e.g., A fantasy novel prologue / A minimalist branding identity / A viral podcast series",
        type: "text",
        required: true,
      },
      {
        id: "creativeBlock",
        label: "Where are you feeling stuck?",
        placeholder: "e.g., The introduction feels generic and clichéd; lacks a memorable hook.",
        type: "textarea",
      },
      {
        id: "mood",
        label: "Desired Mood / Tone",
        type: "select",
        defaultValue: "mysterious",
        options: [
          { label: "Mysterious & Atmospheric", value: "mysterious" },
          { label: "Bold & High-Energy", value: "bold" },
          { label: "Poetic & Emotional", value: "poetic" },
          { label: "Futuristic & Tech-Forward", value: "futuristic" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as a master creative mentor. Help me unleash creative flow for:

• Medium / Project: ${v.topic || "Creative Concept"}
• Sticking Point: ${v.creativeBlock || "Looking for a unique, unforgettable angle"}
• Desired Mood / Tone: ${v.mood || "Bold & High-Energy"}

Generate:
1. 3 Radical Lateral Metaphors (connecting this project with an unrelated domain like biology, architecture, or deep space).
2. SCAMPER Breakdown (Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, Reverse).
3. 3 Bold Starting Lines / Opening Concepts that immediately seize the imagination.
4. A 5-minute generative prompt exercise to keep the flow going.`,
  },
  {
    id: "idea-sparks",
    title: "Idea Sparks",
    category: "ideas",
    description: "Ignite your creativity for innovative solutions",
    detailedDescription:
      "Rapid-fire micro-concept generator that produces catchy hooks, creative angles, and viral marketing sparks in seconds.",
    requirements: [
      "Your niche or target audience",
      "Goal of the idea sparks (engagement, sales, awareness)",
    ],
    expectedOutput:
      "10 rapid-fire spark concepts with punchy slogans, visual cues, and execution quick-wins.",
    isPro: false,
    iconName: "Zap",
    iconEmoji: "💡",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["sparks", "hooks", "quick", "angles", "viral", "creative"],
    fields: [
      {
        id: "niche",
        label: "Niche or Topic",
        placeholder: "e.g., Specialty coffee subscription / Remote work lifestyle / Web development tutorials",
        type: "text",
        required: true,
      },
      {
        id: "sparkGoal",
        label: "Primary Goal",
        type: "select",
        defaultValue: "viral",
        options: [
          { label: "Viral Social Buzz & Shares", value: "viral" },
          { label: "Lead Generation & Signups", value: "leads" },
          { label: "Community Conversation Starter", value: "community" },
          { label: "Educational Authority", value: "education" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Give me 10 rapid-fire "Idea Sparks" for:
• Niche / Topic: ${v.niche || "Modern Tech Lifestyle"}
• Goal: ${v.sparkGoal || "Viral Social Buzz"}

Format each idea spark with:
- Catchy Title / Hook
- One-Sentence Punchline
- Key Visual / Execution Idea
Keep them high-energy, memorable, and actionable immediately.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 2. WORK CATEGORY (5 Tasks)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "max-productivity",
    title: "Max Productivity",
    category: "work",
    description: "Max productivity, achieve more, stress less",
    detailedDescription:
      "A personalized executive time-blocking blueprint and cognitive energy management plan to maximize output while eliminating burnout.",
    requirements: [
      "Current top 3 priorities or projects",
      "Daily peak focus hours",
      "Main time drains or distraction habits",
    ],
    expectedOutput:
      "Hourly time-blocked schedule, deep-work protocols, and a low-value task elimination checklist.",
    isPro: false,
    badge: "Essential",
    iconName: "Target",
    iconEmoji: "🧠",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["productivity", "time management", "deep work", "schedule", "focus", "work"],
    fields: [
      {
        id: "priorities",
        label: "Top 3 Goals / Projects for this week",
        placeholder: "e.g., 1. Complete Next.js frontend redesign, 2. Close 3 sales calls, 3. Gym workout 4x",
        type: "textarea",
        required: true,
      },
      {
        id: "peakHours",
        label: "When is your natural peak energy?",
        type: "select",
        defaultValue: "morning",
        options: [
          { label: "Early Morning (6 AM - 10 AM)", value: "early_morning" },
          { label: "Mid Morning / Noon (9 AM - 1 PM)", value: "morning" },
          { label: "Afternoon (1 PM - 5 PM)", value: "afternoon" },
          { label: "Late Night (8 PM - Midnight)", value: "night" },
        ],
      },
      {
        id: "distractions",
        label: "Biggest Time Drains or Distractions",
        placeholder: "e.g., Slack notifications, reactive email checking, unscheduled meetings",
        type: "text",
      },
    ],
    generatePrompt: (v) =>
      `Act as an elite executive performance coach. Design a "Max Productivity" blueprint for my work:

• Core Priorities: ${v.priorities || "Complete major project milestones"}
• Peak Energy Window: ${v.peakHours || "Mid Morning"}
• Main Distractions: ${v.distractions || "Context switching and notifications"}

Create:
1. Deep-Work Scheduling Blueprint: Hour-by-hour schedule aligning difficult tasks with peak cognitive energy.
2. The "Rule of 3" Daily Execution Framework: How to start and end each day cleanly.
3. Distraction Defenses: Tactical protocols to eliminate interruptions.
4. Energy Recharge System: Structured micro-breaks to avoid afternoon crashes.`,
  },
  {
    id: "recruiting",
    title: "Recruiting",
    category: "work",
    description: "Define the qualifications for any position",
    detailedDescription:
      "An end-to-end talent acquisition kit: competency-based job descriptions, scorecard rubrics, and screening questionnaires.",
    requirements: [
      "Role title and seniority level",
      "Core responsibilities and tech stack",
      "Company cultural values",
    ],
    expectedOutput:
      "A complete role scorecard, modern job description, screening questionnaire, and interview rubric.",
    isPro: true,
    badge: "PRO",
    iconName: "Briefcase",
    iconEmoji: "👥",
    recommendedModel: "Claude 3.5 Sonnet",
    keywords: ["recruiting", "hiring", "job description", "interview", "talent", "hr", "scorecard"],
    fields: [
      {
        id: "roleTitle",
        label: "Job Title & Seniority",
        placeholder: "e.g., Senior Full-Stack Engineer (React / TypeScript / Node.js)",
        type: "text",
        required: true,
      },
      {
        id: "companyContext",
        label: "Company Mission & Culture",
        placeholder: "e.g., High-growth B2B SaaS startup with an async, product-led culture",
        type: "text",
      },
      {
        id: "keyRequirements",
        label: "Must-Have Skills & Responsibilities",
        placeholder: "e.g., 5+ years React/Next.js, state management, design systems, sub-second web performance",
        type: "textarea",
        required: true,
      },
      {
        id: "workType",
        label: "Work Arrangement",
        type: "select",
        defaultValue: "remote",
        options: [
          { label: "100% Remote Global", value: "remote" },
          { label: "Hybrid", value: "hybrid" },
          { label: "Onsite", value: "onsite" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as a VP of Talent Acquisition at a world-class tech firm. Build a high-performance Recruiting Kit for:

• Position: ${v.roleTitle || "Senior Software Engineer"}
• Company Context: ${v.companyContext || "Modern AI-first technology company"}
• Key Requirements: ${v.keyRequirements || "High technical competency and leadership"}
• Work Arrangement: ${v.workType || "Remote"}

Generate:
1. High-Impact Job Post: Compelling hook, role mission, key outcomes expected in 30/60/90 days, and requirements without corporate jargon.
2. Candidate Assessment Rubric: 4 specific competencies with scoring criteria (1 to 5).
3. 5 Vetting Screening Questions: Direct questions that immediately reveal depth of experience.`,
  },
  {
    id: "cv-builder",
    title: "CV Builder",
    category: "work",
    description: "Generate a creative resume",
    detailedDescription:
      "Transforms raw career history into high-impact, metrics-driven STAR resume bullet points that bypass ATS filters and impress hiring managers.",
    requirements: [
      "Target role title",
      "Past companies, titles, and main accomplishments",
      "Measurable metrics (percentage, revenue, latency improvements)",
    ],
    expectedOutput:
      "Polished executive summary, 5-8 quantified achievement bullets, and key skills taxonomy.",
    isPro: false,
    badge: "Popular",
    iconName: "FileText",
    iconEmoji: "📄",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["cv", "resume", "career", "job", "ats", "bullets", "hiring"],
    fields: [
      {
        id: "targetRole",
        label: "Target Role & Industry",
        placeholder: "e.g., Lead Product Designer / Senior AI Systems Engineer",
        type: "text",
        required: true,
      },
      {
        id: "experience",
        label: "Your Raw Experience & Achievements",
        placeholder: "e.g., Worked at Acme Corp for 2 years. Built new customer portal. Reduced load time from 3s to 800ms. Managed team of 4.",
        type: "textarea",
        required: true,
      },
      {
        id: "tone",
        label: "Resume Style",
        type: "select",
        defaultValue: "executive",
        options: [
          { label: "Executive & Authoritative", value: "executive" },
          { label: "Technical & Metrics-Obsessed", value: "technical" },
          { label: "Startup & High-Growth Driver", value: "startup" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as a top-tier executive career coach and resume strategist. Build an ATS-optimized CV enhancement for:

• Target Role: ${v.targetRole || "Senior Professional"}
• Raw Background: ${v.experience || "Key achievements and responsibilities"}
• Resume Style: ${v.tone || "Technical & Metrics-Obsessed"}

Provide:
1. High-Impact 3-Sentence Professional Summary.
2. 6-8 Quantified STAR Achievement Bullets (Action Verb + Context + Metric Outcome).
3. Core Competencies & Skills Keyword Cloud formatted for ATS algorithms.
4. Quick recommendations to improve candidate marketability.`,
  },
  {
    id: "email",
    title: "Email",
    category: "work",
    description: "Get help to craft a compelling email",
    detailedDescription:
      "A high-conversion business communication generator for cold outreach, contract negotiations, stakeholder updates, and delicate follow-ups.",
    requirements: [
      "Recipient role or relation",
      "Core message and desired call-to-action",
      "Preferred tone (formal, direct, warm, persuasive)",
    ],
    expectedOutput:
      "3 subject line options, polished email body with clear call-to-action, and follow-up timeline.",
    isPro: false,
    iconName: "Mail",
    iconEmoji: "✉️",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["email", "outreach", "negotiation", "communication", "sales", "business"],
    fields: [
      {
        id: "purpose",
        label: "What is this email about?",
        placeholder: "e.g., Follow up after a client presentation / Ask for a budget increase / Cold outreach to VP",
        type: "text",
        required: true,
      },
      {
        id: "recipient",
        label: "Who is the recipient?",
        placeholder: "e.g., Busy VP of Engineering / Prospective Client / Internal Team",
        type: "text",
        defaultValue: "Professional colleague",
      },
      {
        id: "tone",
        label: "Email Tone",
        type: "select",
        defaultValue: "direct",
        options: [
          { label: "Direct & Action-Oriented", value: "direct" },
          { label: "Diplomatic & Polite", value: "diplomatic" },
          { label: "Warm & Collaborative", value: "warm" },
          { label: "Persuasive Executive Sales", value: "sales" },
        ],
      },
      {
        id: "keyPoints",
        label: "Key Details or Call-To-Action to Include",
        placeholder: "e.g., Propose a 15-minute quick call on Thursday at 2 PM EST; mention the Q3 ROI numbers.",
        type: "textarea",
      },
    ],
    generatePrompt: (v) =>
      `Act as an elite business communications consultant. Draft a compelling email for:

• Objective: ${v.purpose || "Business Communication"}
• Recipient: ${v.recipient || "Executive Colleague"}
• Tone: ${v.tone || "Direct & Action-Oriented"}
${v.keyPoints ? `• Key Details / Desired CTA: ${v.keyPoints}` : ""}

Please generate:
1. 3 High-Open-Rate Subject Line Variations.
2. The Primary Email Draft (concise, clear, high-status, with an unambiguous low-friction CTA).
3. A Short 1-Sentence Follow-Up Reminder to send 4 days later if no response.`,
  },
  {
    id: "interview-tips",
    title: "Interview Tips",
    category: "work",
    description: "Receive helpful tips for your interview",
    detailedDescription:
      "Role-specific behavioral prep kit with predicted questions, STAR framework answer formulas, and reverse questions for the interviewer.",
    requirements: [
      "Target company or industry",
      "Job title",
      "Your top strength and areas of concern",
    ],
    expectedOutput:
      "5 predicted tough questions with sample high-scoring STAR answers and 3 strategic questions to ask the interviewer.",
    isPro: false,
    iconName: "HelpCircle",
    iconEmoji: "🤝",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["interview", "tips", "prep", "star method", "questions", "hiring"],
    fields: [
      {
        id: "targetRole",
        label: "Target Role & Company",
        placeholder: "e.g., Staff Frontend Engineer at Stripe",
        type: "text",
        required: true,
      },
      {
        id: "interviewType",
        label: "Interview Stage",
        type: "select",
        defaultValue: "behavioral",
        options: [
          { label: "Behavioral & Leadership", value: "behavioral" },
          { label: "Technical & System Architecture", value: "technical" },
          { label: "Hiring Manager / Culture Fit", value: "culture" },
          { label: "Executive Final Round", value: "executive" },
        ],
      },
      {
        id: "concerns",
        label: "Your Biggest Concern or Weak Spot (Optional)",
        placeholder: "e.g., Explaining a 6-month career gap / Lack of experience with Kubernetes",
        type: "textarea",
      },
    ],
    generatePrompt: (v) =>
      `Act as a former FAANG hiring manager and interview coach. Prepare me for my upcoming interview:

• Role & Company: ${v.targetRole || "Senior Professional Role"}
• Interview Stage: ${v.interviewType || "Behavioral & Leadership"}
${v.concerns ? `• Area of Concern: ${v.concerns}` : ""}

Provide:
1. Top 5 Most Likely Questions for this role and stage.
2. STAR (Situation, Task, Action, Result) answering blueprints for the 2 toughest questions.
3. How to address the area of concern with poise and confidence.
4. 3 Reverse Questions to ask the interviewer that demonstrate top 1% executive thinking.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 3. FUN CATEGORY (5 Tasks)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "gaming",
    title: "Gaming",
    category: "fun",
    description: "Level up your gaming skills and conquer challenges",
    detailedDescription:
      "Custom gameplay mastery guides, lore deep dives, optimal build strategies, and immersive RPG quest prompts.",
    requirements: [
      "Game title and current level / situation",
      "Preferred playstyle (stealth, DPS, tank, speedrun)",
      "Current obstacle or build question",
    ],
    expectedOutput:
      "Step-by-step boss tactics, meta loadouts, secret lore trivia, and progression milestones.",
    isPro: false,
    iconName: "Gamepad2",
    iconEmoji: "🎮",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["gaming", "game", "rpg", "strategy", "boss", "build", "quest"],
    fields: [
      {
        id: "gameTitle",
        label: "Game Title",
        placeholder: "e.g., Elden Ring, Baldur's Gate 3, Cyberpunk 2077, Valorant",
        type: "text",
        required: true,
      },
      {
        id: "requestType",
        label: "What do you need?",
        type: "select",
        defaultValue: "build_guide",
        options: [
          { label: "Optimal Build / Loadout Strategy", value: "build_guide" },
          { label: "Boss Fight & Level Walkthrough", value: "boss_fight" },
          { label: "Immersive Lore & Backstory Deep-Dive", value: "lore" },
          { label: "Game Recommendation Based on Tastes", value: "recommendations" },
        ],
      },
      {
        id: "details",
        label: "Details on your playstyle or challenge",
        placeholder: "e.g., Playing a dex/faith build, struggling with Malenia second phase.",
        type: "textarea",
      },
    ],
    generatePrompt: (v) =>
      `Act as an elite gaming guide and esports coach. Provide master-level assistance for:

• Game: ${v.gameTitle || "Modern Video Game"}
• Guide Type: ${v.requestType || "Optimal Build Strategy"}
${v.details ? `• Context / Details: ${v.details}` : ""}

Provide:
1. Core Strategy / Meta Overview.
2. Step-by-Step Breakdown (skills, equipment, positioning, timing).
3. Pro-Gamer Tips & Hidden Mechanics.
4. Fun lore easter egg or trivia related to this quest.`,
  },
  {
    id: "movie-time",
    title: "Movie Time",
    category: "fun",
    description: "Cinematic delight, enjoy the latest blockbuster",
    detailedDescription:
      "A curated film and series recommendation engine based on mood, niche cinematic tropes, director styles, and streaming availability.",
    requirements: [
      "Favorite films, directors, or genres",
      "Current mood and viewing company",
      "Streaming platform preferences",
    ],
    expectedOutput:
      "Curated watchlist of 4 films with plot hooks, why you'll love it, and snack pairing ideas.",
    isPro: false,
    iconName: "Clapperboard",
    iconEmoji: "🍿",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["movie", "film", "cinema", "netflix", "streaming", "recommendation", "entertainment"],
    fields: [
      {
        id: "mood",
        label: "Tonight's Mood or Vibe",
        placeholder: "e.g., Mind-bending psychological thriller / Cozy comfort comedy / Fast-paced sci-fi",
        type: "text",
        required: true,
      },
      {
        id: "favoriteFilms",
        label: "Movies You Recently Loved",
        placeholder: "e.g., Interstellar, Knives Out, Dune, Severance",
        type: "text",
      },
      {
        id: "runtimePreference",
        label: "Format & Runtime",
        type: "select",
        defaultValue: "standard",
        options: [
          { label: "Standard Feature Film (90 - 120 mins)", value: "standard" },
          { label: "Epic Cinematic Journey (2.5+ hours)", value: "epic" },
          { label: "Binge-Worthy Mini-Series", value: "series" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as a seasoned film critic and cinema sommelier. Curate the perfect "Movie Time" watchlist for:

• Mood / Vibe: ${v.mood || "Thrilling & Thought-Provoking"}
• Loved Movies: ${v.favoriteFilms || "Great storytelling"}
• Format: ${v.runtimePreference || "Standard Feature Film"}

Recommend 3-4 extraordinary titles:
For each title include:
- Title, Release Year & Director
- Spoiler-Free 2-Sentence Hook
- "Why You'll Love It" (connecting to user's mood)
- The Ideal Snack or Drink Pairing.`,
  },
  {
    id: "cycling-day",
    title: "Cycling Day",
    category: "fun",
    description: "Pedal through scenic routes, relish the ride",
    detailedDescription:
      "A comprehensive ride itinerary planner: route difficulty profiling, pre-ride gear checks, pacing zones, and hydration stops.",
    requirements: [
      "Riding discipline (road, gravel, mountain, urban)",
      "Target distance or duration",
      "Terrain preference and elevation",
    ],
    expectedOutput:
      "Elevation & pacing plan, essential gear checklist, fueling schedule, and scenic waypoint stops.",
    isPro: false,
    iconName: "Bike",
    iconEmoji: "🚴",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["cycling", "bike", "ride", "route", "fitness", "outdoor", "strava"],
    fields: [
      {
        id: "cyclingType",
        label: "Cycling Discipline",
        type: "select",
        defaultValue: "road",
        options: [
          { label: "Road Cycling (Paved & Fast)", value: "road" },
          { label: "Gravel / Adventure Grinder", value: "gravel" },
          { label: "Mountain Biking (Trails & Technical)", value: "mtb" },
          { label: "Casual Urban Sightseeing", value: "urban" },
        ],
      },
      {
        id: "distance",
        label: "Planned Distance / Time",
        placeholder: "e.g., 50 km / 2.5 hours / Scenic afternoon spin",
        type: "text",
        required: true,
      },
      {
        id: "locationContext",
        label: "Terrain or Region",
        placeholder: "e.g., Rolling coastal hills, flat lakeside path, forest switchbacks",
        type: "text",
      },
    ],
    generatePrompt: (v) =>
      `Act as an endurance cycling coach and route planner. Plan the ultimate "Cycling Day" for:

• Discipline: ${v.cyclingType || "Road Cycling"}
• Distance / Duration: ${v.distance || "40 km"}
• Terrain: ${v.locationContext || "Scenic rolling hills"}

Generate:
1. Pacing & Power Zone Strategy (Warmup, Endurance tempo, Climb pace, Cooldown).
2. Nutrition & Hydration Schedule (Carbs/water intake per hour).
3. Pre-Ride Bike & Safety Check Checklist (Tire pressure, drivetrain, essentials).
4. Scenic Waypoint Ideas to make the ride unforgettable.`,
  },
  {
    id: "outdoor-activities",
    title: "Outdoor Activities",
    category: "fun",
    description: "Embrace nature, engage in thrilling outdoor adventures",
    detailedDescription:
      "A curated adventure planner for camping, hiking, rock climbing, or wilderness exploration with safety protocols and packing checklists.",
    requirements: [
      "Activity type and group size",
      "Experience level of participants",
      "Trip duration and climate",
    ],
    expectedOutput:
      "Itinerary schedule, packing & safety gear matrix, Leave No Trace guidelines, and emergency backup plan.",
    isPro: false,
    iconName: "Compass",
    iconEmoji: "🏕️",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["outdoor", "hiking", "camping", "nature", "adventure", "trail"],
    fields: [
      {
        id: "activity",
        label: "Adventure Activity",
        type: "select",
        defaultValue: "hiking",
        options: [
          { label: "Day Hiking & Scenic Overlooks", value: "hiking" },
          { label: "Overnight Camping & Campfire", value: "camping" },
          { label: "Kayaking / Water Expedition", value: "kayaking" },
          { label: "Rock Climbing / Bouldering", value: "climbing" },
        ],
      },
      {
        id: "groupSize",
        label: "Group Composition & Experience",
        placeholder: "e.g., 2 adults, intermediate fitness, bringing a dog",
        type: "text",
        defaultValue: "2 people, moderate fitness",
      },
      {
        id: "notes",
        label: "Special Details or Season",
        placeholder: "e.g., Autumn weather, expecting mild rain, near national park",
        type: "textarea",
      },
    ],
    generatePrompt: (v) =>
      `Act as an expert outdoor guide and naturalist. Plan an unforgettable "Outdoor Activities" experience:

• Activity: ${v.activity || "Day Hiking"}
• Group & Experience: ${v.groupSize || "Small group"}
${v.notes ? `• Conditions / Notes: ${v.notes}` : ""}

Provide:
1. Step-by-Step Adventure Itinerary (departure, milestone stops, return).
2. Essential Gear & Packing Checklist (categorized: navigation, warmth, nutrition, emergency).
3. Nature Mindfulness / Activity Exercises to connect deeply with the outdoors.
4. Leave No Trace Safety & Environmental Guidelines.`,
  },
  {
    id: "fun-with-buddies",
    title: "Fun with buddies",
    category: "fun",
    description: "Create memories with friends, have endless fun",
    detailedDescription:
      "Interactive party games, pub trivia rounds, weekend getaway adventures, and group challenge generator for friends.",
    requirements: [
      "Group size and venue (home, outdoors, road trip)",
      "Vibe (chill, competitive, silly, intellectual)",
    ],
    expectedOutput:
      "3 distinct game rules with host instructions, custom trivia quiz rounds, and memorable team challenges.",
    isPro: false,
    iconName: "Users",
    iconEmoji: "🥳",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["buddies", "friends", "party", "games", "trivia", "fun", "social"],
    fields: [
      {
        id: "venue",
        label: "Setting / Venue",
        placeholder: "e.g., Living room game night / Backyard BBQ / Cabin weekend",
        type: "text",
        defaultValue: "Living room game night",
      },
      {
        id: "groupVibe",
        label: "Group Vibe",
        type: "select",
        defaultValue: "hilarious",
        options: [
          { label: "Hilarious & Chaotic Party Games", value: "hilarious" },
          { label: "Competitive Trivia & Brain Teasers", value: "trivia" },
          { label: "Deep Conversations & Storytelling", value: "deep_talk" },
          { label: "Outdoor Team Challenges & Relays", value: "challenges" },
        ],
      },
      {
        id: "friendCount",
        label: "Number of Friends",
        placeholder: "e.g., 4-8 friends",
        type: "text",
        defaultValue: "5-6 people",
      },
    ],
    generatePrompt: (v) =>
      `Act as the ultimate social host and party creator. Design an unforgettable "Fun with buddies" session for:

• Setting: ${v.venue || "Living room game night"}
• Vibe: ${v.groupVibe || "Hilarious & Chaotic"}
• Group Size: ${v.friendCount || "5-6 people"}

Deliver:
1. 3 Original Group Games that require zero or minimal equipment (with rules & host cues).
2. A 5-Question Custom Trivia Lightning Round (fun, quirky, debate-sparking).
3. A Memorable Group Challenge / Finale that guarantees laughter and great memories.`,
  },

  // ──────────────────────────────────────────────────────────────────────────
  // 4. ONLINE CONTENT CATEGORY (10 Tasks)
  // ──────────────────────────────────────────────────────────────────────────
  {
    id: "x-posts",
    title: "X Posts",
    category: "online-content",
    description: "Summarize your text into a post (Tweet)",
    detailedDescription:
      "Converts long-form insights, articles, or rough thoughts into viral Twitter/X threads, high-converting standalone posts, and engagement hooks.",
    requirements: [
      "Core message, link, or text to summarize",
      "Preferred format (single post vs. multi-post thread)",
      "Target engagement style (educational, contrarian, story)",
    ],
    expectedOutput:
      "1 viral standalone tweet + 1 full 5-part thread with hook, body points, and CTA.",
    isPro: false,
    badge: "Popular",
    iconName: "Twitter",
    iconEmoji: "𝕏",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["x", "twitter", "tweet", "thread", "social", "viral", "post"],
    fields: [
      {
        id: "content",
        label: "Text, Article, or Concept to condense into X Posts",
        placeholder: "Paste your raw thoughts, article excerpt, or topic summary here...",
        type: "textarea",
        required: true,
      },
      {
        id: "style",
        label: "Post Style",
        type: "select",
        defaultValue: "contrarian",
        options: [
          { label: "Contrarian / Hot Take", value: "contrarian" },
          { label: "Step-by-Step Educational Breakdown", value: "educational" },
          { label: "Personal Story & Vulnerable Lesson", value: "story" },
          { label: "Data / Metric Proof Teardown", value: "data" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as an elite ghostwriter on X (formerly Twitter) with over 500k followers. Transform the following text into viral X posts:

• Raw Content: ${v.content || "Valuable insight on digital tech"}
• Desired Style: ${v.style || "Contrarian / Hot Take"}

Provide:
1. Two Standalone Viral Posts (under 280 characters, strong whitespace, punchy rhythm).
2. One 5-Tweet Master Thread:
   - Tweet 1: Scroll-stopping Hook (curiosity gap or bold assertion)
   - Tweets 2-4: Actionable value delivered in crisp bullet points
   - Tweet 5: Punchy takeaway + call-to-action (RT & reply question).`,
  },
  {
    id: "youtube-scripts",
    title: "YouTube Scripts",
    category: "online-content",
    description: "Create a script for your video on any topic",
    detailedDescription:
      "End-to-end video scriptwriting with 5-second hook formulas, dynamic retention loops, B-roll cues, and high-converting CTAs.",
    requirements: [
      "Video title or core topic",
      "Target viewer demographic",
      "Desired length (e.g. 5-10 minutes)",
    ],
    expectedOutput:
      "Full scene-by-scene script with visual directions, voiceover script, and retention resets.",
    isPro: true,
    badge: "PRO",
    iconName: "Youtube",
    iconEmoji: "▶️",
    recommendedModel: "GPT-4o (Reasoning)",
    keywords: ["youtube", "video", "script", "retention", "hook", "b-roll", "content"],
    fields: [
      {
        id: "videoTopic",
        label: "Video Title or Topic",
        placeholder: "e.g., Why Most People Fail at Learning to Code in 2026",
        type: "text",
        required: true,
      },
      {
        id: "targetLength",
        label: "Estimated Video Length",
        type: "select",
        defaultValue: "medium",
        options: [
          { label: "Short & Punchy (3 - 5 minutes)", value: "short" },
          { label: "Standard Deep-Dive (8 - 12 minutes)", value: "medium" },
          { label: "Mini Documentary (15+ minutes)", value: "long" },
        ],
      },
      {
        id: "cta",
        label: "Call to Action / Sponsor (Optional)",
        placeholder: "e.g., Subscribe for weekly breakdowns; check link in description",
        type: "text",
      },
    ],
    generatePrompt: (v) =>
      `Act as a top YouTube creator and retention director (MrBeast / Ali Abdaal caliber). Write a complete YouTube script for:

• Topic: ${v.videoTopic || "High-Impact Explainer Video"}
• Target Length: ${v.targetLength || "Standard 8-12 minutes"}
${v.cta ? `• Primary Call to Action: ${v.cta}` : ""}

Provide:
1. 3 Alternative 5-Second Hooks designed for maximum viewer retention.
2. The Intro (First 60 seconds): Fast pacing, establishing stakes, no fluff.
3. 3 Core Segments formatted with [AUDIO / VOICEOVER] and [VISUAL / B-ROLL / GRAPHIC] columns.
4. Retention Reset Hook mid-video to prevent audience drop-off.
5. High-Converting Outro & End-Card CTA.`,
  },
  {
    id: "tiktok-posts",
    title: "TikTok Posts",
    category: "online-content",
    description: "Craft TikTok posts on any topic",
    detailedDescription:
      "Short-form viral blueprints with on-screen text overlays, audio pacing, visual scene cuts, and comment-driving hooks.",
    requirements: [
      "Video topic or niche",
      "Format (talking head, vlog, screen recording, montage)",
    ],
    expectedOutput:
      "Hook variations (first 3s), scene-by-scene script with text directives, and trending audio style recommendations.",
    isPro: false,
    iconName: "Music",
    iconEmoji: "🎵",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["tiktok", "short video", "viral", "reels", "trends", "algorithm"],
    fields: [
      {
        id: "topic",
        label: "TikTok Topic or Concept",
        placeholder: "e.g., 3 hidden Chrome extensions that feel illegal to know",
        type: "text",
        required: true,
      },
      {
        id: "format",
        label: "Video Format",
        type: "select",
        defaultValue: "talking_head",
        options: [
          { label: "Talking Head with Green Screen / B-Roll", value: "talking_head" },
          { label: "POV / Relatable Story", value: "pov" },
          { label: "Tutorial / Screen Share Demonstration", value: "tutorial" },
          { label: "Aesthetic Day-in-the-Life Vlog", value: "vlog" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as a viral TikTok strategist with 10M+ views. Create a complete TikTok video blueprint for:

• Topic: ${v.topic || "Productivity Hack"}
• Format: ${v.format || "Talking Head"}

Include:
1. 3 Scroll-Stopping 3-Second Hooks (verbal + visual action).
2. Full 45-Second Script broken into 5-second pacing beats.
3. On-Screen Text Overlay timings.
4. The "Comment Trap" Question at the end that forces viewers into the comments.`,
  },
  {
    id: "tiktok-captions",
    title: "TikTok Captions",
    category: "online-content",
    description: "Boost your TikTok views with appealing captions",
    detailedDescription:
      "SEO-optimized TikTok captions designed for the platform search algorithm with high-ranking keywords and engagement drivers.",
    requirements: [
      "Summary of your video content",
      "Primary search keywords you want to rank for",
    ],
    expectedOutput:
      "3 caption styles (curiosity-driven, search SEO, question-based) + optimized hashtag clouds.",
    isPro: false,
    iconName: "MessageSquare",
    iconEmoji: "💬",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["tiktok", "captions", "hashtags", "seo", "algorithm", "views"],
    fields: [
      {
        id: "videoSummary",
        label: "What happens in your TikTok video?",
        placeholder: "e.g., I tested 5 different AI resume builders to see which actually got an interview call",
        type: "textarea",
        required: true,
      },
      {
        id: "targetKeywords",
        label: "Target Search Keywords (Optional)",
        placeholder: "e.g., AI resume builder, job search hacks, tech career",
        type: "text",
      },
    ],
    generatePrompt: (v) =>
      `Act as an expert TikTok SEO and social media copywriter. Write captions to maximize search reach and comments for:

• Video Content: ${v.videoSummary || "Tech career tutorial"}
${v.targetKeywords ? `• Target SEO Keywords: ${v.targetKeywords}` : ""}

Provide:
1. Caption Option A (Short Curiosity Gap Hook).
2. Caption Option B (Keyword-Packed TikTok SEO Description).
3. Caption Option C (Debate-Igniting Question).
4. Curated Hashtag Set (2 broad, 3 niche, 2 trending).`,
  },
  {
    id: "insta-content",
    title: "Insta Content",
    category: "online-content",
    description: "Create Instagram posts on any topic",
    detailedDescription:
      "Strategic Instagram post concepts including multi-slide carousel outlines, visual aesthetic directions, and save-worthy carousels.",
    requirements: [
      "Topic or theme",
      "Goal (save rate, comments, new follower growth)",
      "Visual style preference",
    ],
    expectedOutput:
      "Slide-by-slide carousel copy, visual layout ideas, and save-worthy summary checklist.",
    isPro: false,
    iconName: "Instagram",
    iconEmoji: "📷",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["instagram", "insta", "carousel", "grid", "content", "social media"],
    fields: [
      {
        id: "topic",
        label: "Post Topic or Theme",
        placeholder: "e.g., The 5 Laws of Clean UI Design Every Developer Needs to Know",
        type: "text",
        required: true,
      },
      {
        id: "postType",
        label: "Post Format",
        type: "select",
        defaultValue: "carousel",
        options: [
          { label: "Multi-Slide Educational Carousel (7-10 slides)", value: "carousel" },
          { label: "Single Hero Infographic / Quote Graphic", value: "single" },
          { label: "Before / After Transformation Case Study", value: "case_study" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as an Instagram creative director who manages 7-figure creator accounts. Design high-save Instagram content for:

• Topic: ${v.topic || "UI/UX Design Tips"}
• Format: ${v.postType || "Educational Carousel"}

Generate:
1. Cover Slide Concept: Headline text, subtitle, and visual background recommendation.
2. Slides 2-7: Exact text copy for each slide, concise and visually scannable.
3. Final Slide: Call to Action (Save for later + Follow).
4. Caption text with line breaks and hashtag cluster.`,
  },
  {
    id: "insta-reels",
    title: "Insta Reels",
    category: "online-content",
    description: "Get creative descriptions for your Instagram Reels",
    detailedDescription:
      "Retention-engineered Reels script and audio pacing formulas to maximize replays, shares, and algorithmic reach.",
    requirements: [
      "Reel topic and target audience",
      "Visual hook idea",
    ],
    expectedOutput:
      "Shot list, voiceover script, text sticker prompts, and audio transition markers.",
    isPro: false,
    iconName: "Film",
    iconEmoji: "🎞️",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["reels", "instagram", "short video", "audio", "viral", "explore page"],
    fields: [
      {
        id: "reelTopic",
        label: "Reel Topic or Concept",
        placeholder: "e.g., How to organize your digital workspace for zero clutter",
        type: "text",
        required: true,
      },
      {
        id: "visualStyle",
        label: "Visual Style",
        type: "select",
        defaultValue: "b-roll_voiceover",
        options: [
          { label: "Cinematic B-Roll with Voiceover", value: "b-roll_voiceover" },
          { label: "Fast-Paced Talking Head with Dynamic Captions", value: "talking_head" },
          { label: "Screen Recording Teardown with Cursor Highlights", value: "screen_recording" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as an Instagram Reels algorithm specialist. Create a high-retention Reels script and description for:

• Topic: ${v.reelTopic || "Clean Workspace Workflow"}
• Visual Style: ${v.visualStyle || "Cinematic B-Roll with Voiceover"}

Provide:
1. First 3 Seconds: Visual hook + audio cue.
2. Scene-by-Scene Shot List (0-5s, 5-15s, 15-25s, 25-30s).
3. Exact Voiceover Script (natural, friendly, authoritative).
4. High-Engagement Instagram Caption designed to get shares to DMs.`,
  },
  {
    id: "insta-captions",
    title: "Insta Captions",
    category: "online-content",
    description: "Come up with engaging captions for your Instagram posts",
    detailedDescription:
      "Aesthetic, engaging, and story-driven captions tailored for likes, comments, and community bonding.",
    requirements: [
      "Image or video description",
      "Mood / aesthetic (minimalist, bold, conversational)",
    ],
    expectedOutput:
      "3 caption styles: short & punchy, storytelling micro-blog, and interactive question-based.",
    isPro: false,
    iconName: "Sparkles",
    iconEmoji: "✍️",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["captions", "instagram", "aesthetic", "storytelling", "comments", "lifestyle"],
    fields: [
      {
        id: "photoContext",
        label: "What is your photo or graphic about?",
        placeholder: "e.g., Late night coding session with coffee, quiet city view out the window",
        type: "textarea",
        required: true,
      },
      {
        id: "vibe",
        label: "Caption Vibe",
        type: "select",
        defaultValue: "minimalist",
        options: [
          { label: "Minimalist & Aesthetic (1-2 lines)", value: "minimalist" },
          { label: "Micro-Blog Story & Life Lesson", value: "story" },
          { label: "Witty & Relatable Humor", value: "witty" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as a high-end social media copywriter. Write Instagram captions for:

• Image / Post Content: ${v.photoContext || "Creative work lifestyle"}
• Vibe: ${v.vibe || "Minimalist & Aesthetic"}

Generate:
1. 3 Short & Aesthetic One-Liners (effortless, cool, memorable).
2. 1 Engaging Story-Driven Caption (3-4 short paragraphs with breathing room).
3. A natural, non-cringe engagement question to place before hashtags.`,
  },
  {
    id: "linkedin-hiring",
    title: "LinkedIn Hiring",
    category: "online-content",
    description: "Write clear and concise job descriptions",
    detailedDescription:
      "Talent attraction posts and hiring announcements that highlight company culture, tech impact, and employee perks.",
    requirements: [
      "Role title and team mission",
      "Top 3 perks / benefits",
      "Application link or instruction",
    ],
    expectedOutput:
      "Authentic hiring announcement post, culture highlights, and candidate engagement call.",
    isPro: false,
    badge: "New",
    iconName: "Linkedin",
    iconEmoji: "👔",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["linkedin", "hiring", "talent", "recruitment", "job post", "team"],
    fields: [
      {
        id: "jobTitle",
        label: "Job Title",
        placeholder: "e.g., Senior Product Designer / Founding Full-Stack Engineer",
        type: "text",
        required: true,
      },
      {
        id: "perks",
        label: "Why should someone join your team?",
        placeholder: "e.g., 100% remote, $5k home office stipend, solving hard AI challenges, zero bureaucracy",
        type: "textarea",
        required: true,
      },
      {
        id: "howToApply",
        label: "How to Apply",
        placeholder: "e.g., DM me directly with your portfolio or apply at echogpt.live/careers",
        type: "text",
        defaultValue: "DM me directly or apply via link in comments",
      },
    ],
    generatePrompt: (v) =>
      `Act as a world-class startup founder and hiring manager. Write an irresistible LinkedIn hiring announcement post for:

• Open Position: ${v.jobTitle || "Senior Engineer"}
• Why Join / Perks: ${v.perks || "Great culture and high impact"}
• Application Flow: ${v.howToApply || "DM me or apply via link"}

Requirements:
- Strong, human opening hook (avoid boring corporate "We are excited to announce...").
- Transparent breakdown of what the candidate will actually work on.
- Clear list of benefits and compensation philosophy.
- Low-friction, encouraging call to action.`,
  },
  {
    id: "linkedin-job-search",
    title: "LinkedIn Job Search",
    category: "online-content",
    description: "Make your LinkedIn cover letter stand out",
    detailedDescription:
      "Networking outreach messages, recruiter InMails, and public career transition announcements that win responses.",
    requirements: [
      "Target job title and ideal industry",
      "Your top superpower or proof of work",
      "Recruiter or hiring manager name",
    ],
    expectedOutput:
      "Warm outreach DM template, post-application follow-up message, and public career update post.",
    isPro: false,
    iconName: "Search",
    iconEmoji: "🔍",
    recommendedModel: "EchoGPT (Default)",
    keywords: ["linkedin", "job search", "outreach", "networking", "inmail", "career"],
    fields: [
      {
        id: "targetRole",
        label: "Target Role & Company",
        placeholder: "e.g., Senior Frontend Engineer at Linear / Figma",
        type: "text",
        required: true,
      },
      {
        id: "keySuperpower",
        label: "Your Core Superpower / Proof of Work",
        placeholder: "e.g., Built high-performance React design systems used by 100k users; sub-second loading time fanatic.",
        type: "textarea",
        required: true,
      },
      {
        id: "messageType",
        label: "Message Type",
        type: "select",
        defaultValue: "hiring_manager_dm",
        options: [
          { label: "Direct InMail to Hiring Manager", value: "hiring_manager_dm" },
          { label: "Warm Follow-Up After Submitting Application", value: "follow_up" },
          { label: "Public 'Open to Work' Announcement Post", value: "public_post" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as a high-level tech recruiter and executive career agent. Draft a standout LinkedIn Job Search outreach for:

• Target Role / Company: ${v.targetRole || "Senior Technology Role"}
• Superpower / Proof of Work: ${v.keySuperpower || "Proven track record of high-performance delivery"}
• Message Type: ${v.messageType || "Direct InMail to Hiring Manager"}

Generate:
1. A concise, high-status cold outreach message (under 120 words, zero desperate phrasing, leads with value and curiosity).
2. A follow-up message to send 5 days later.
3. 3 specific tips to optimize your LinkedIn headline to convert inbound recruiters.`,
  },
  {
    id: "linkedin-profile",
    title: "LinkedIn Profile",
    category: "online-content",
    description: "Create memorable posts on LinkedIn",
    detailedDescription:
      "Personal branding post ideas, case study breakdowns, and industry thought leadership narratives that position you as an expert.",
    requirements: [
      "Your industry or domain",
      "Recent lesson learned or project triumph",
      "Primary goal (networking, authority, inbound leads)",
    ],
    expectedOutput:
      "Scroll-stopping headline hook, 1-3-1 format body copy, key takeaway bullet points, and conversation-starter question.",
    isPro: true,
    badge: "PRO",
    iconName: "UserCheck",
    iconEmoji: "👤",
    recommendedModel: "Claude 3.5 Sonnet",
    keywords: ["linkedin", "thought leadership", "branding", "profile", "posts", "networking"],
    fields: [
      {
        id: "topic",
        label: "Topic, Lesson, or Case Study to Share",
        placeholder: "e.g., How we redesigned our design system and cut frontend delivery time by 40%",
        type: "textarea",
        required: true,
      },
      {
        id: "framework",
        label: "Story Framework",
        type: "select",
        defaultValue: "case_study",
        options: [
          { label: "Case Study & Measurable Wins", value: "case_study" },
          { label: "Vulnerable Failure & Hard Lesson", value: "failure_lesson" },
          { label: "Strong Point of View / Contrarian Industry Truth", value: "contrarian" },
        ],
      },
    ],
    generatePrompt: (v) =>
      `Act as an elite LinkedIn ghostwriter for tech executives. Write a memorable, high-reach LinkedIn post for:

• Topic / Insight: ${v.topic || "Engineering Leadership & Systems Design"}
• Framework: ${v.framework || "Case Study & Measurable Wins"}

Requirements:
- 1-2 sentence hook that makes people click "see more".
- 1-3-1 formatting rhythm (short sentences, whitespace, easy mobile reading).
- Concrete details, numbers, or specific realization.
- Genuine conclusion with an authentic question that inspires thoughtful comments from senior peers.`,
  },
];
