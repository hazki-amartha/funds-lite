Goal: Build a Single-Page simplified design component library that acts as a site that humans can visit to copy design specs and AI agents (Claude, Cursor, Gemini) can read via a single URL to generate design-compliant prototypes.

The documentation is a stand alone high-density, single-page application to avoid CSS conflicts with existing portals.

Target Architecture:
/packages/tokens                ← Design tokens (TS)
/packages/components            ← React component library
/apps/manifest                  ← Standalone Single-Page Dashboard (Next.js, to be hosted on Vercel)

Current Light Structure:
/src/funds-lite/tokens.ts       ← Extracted token data used by the manifest UI
/src/funds-lite/specs.ts        ← Copyable DESIGN.md, section specs, Claude prompt, Cursor rules
/src/funds-lite/components      ← Initial reusable Button and Input React components plus component-owned CSS
/app/page.tsx                   ← Manifest page composition and browser interactions only
/public/llms.txt                ← Current machine-readable AI endpoint

Near-term migration path:
1. Keep design-system truth out of app/page.tsx.
2. Move reusable Button/Input/Badge/Card implementations into /src/funds-lite/components before promoting them to /packages/components.
3. Generate or synchronize /llms.txt from /src/funds-lite/specs.ts so humans and AI consume the same underlying source.
4. Promote /src/funds-lite/tokens.ts to /packages/tokens when package publishing or multi-app consumption becomes real.

Single Source: Both humans and AI use the same URL to consume the design system.

The Manifest — Key Features
1. High-Density Visual Grid
A dashboard view of all tokens (foundations) and components, inspired by modern design tool interfaces:
Color Palettes: Interactive (copyable hex code or class name) tiles for Primary (#853291), Neutrals, and Saturated scales.
Typography: Visual display of Inter (Headings) and (Body).
Spacing & Radius: Visual guide for the 4px spacing rhythm and 12px primary radius.

Sidebar is only used for scroll navigation.

Refer to funds-manifest-2.html for the page design (but for sidebar and color scale use the one funds-manifest-1.html), generally just use basic shadcn components to build the documentation guideline (but ensure this won't be picked up mistakenly by the ai as the Amartha FunDS design system). 

2. AI Entry Points
/llms.txt: A clean, markdown-only endpoint containing the full system spec for LLMs to read in one fetch.
Copyable DESIGN.md: A button to copy the entire design system's rules into the clipboard for immediate pasting into chat tools or download it as a file.
System Prompts: Pre-baked "Instruction Blocks" for Claude and Cursor to enforce guardrails (e.g., "Only use Tailwind classes from the locked config").

Updated How It Works
For High Speed exploration
Open the Funds Manifest site.
Click "Copy Prompt for ai chat" (includes the URL to the manifest).
Paste into Claude.ai (or Gemini / GPT) with the prompt: "Build a dashboard for a new fund using these components."
Claude reads the manifest and outputs compliant code.

For Local Iteration
Open Cursor in a new project.
Copy the .cursorrules text from the Manifest site.
The AI now knows the exact token limits (spacing, colors, radius) and won't hallucinate arbitrary values.

---

Design Doc Format (DESIGN.md + llms.txt)
Reference files are kept in /reference/ — DESIGN compact.md (baseline) and DESIGN extended.md (target format).

We follow the extended format for both DESIGN.md and llms.txt. Key principles:

Token columns everywhere — color, type scale, and component variant tables always include the CSS variable name (--primary-500, --neutral-200, etc.) alongside the hex value. This lets an agent copy-paste the right var() reference without inference.

CSS variable names are the source of truth — never raw hex in component descriptions. Tables read: Name | Value | Token | Role.

Sections follow this order: Product Context → Tokens — Colors → Tokens — Typography → Tokens — Spacing & Shapes → Surfaces → Components → Do's and Don'ts → Agent Prompt Guide → Quick Start.

Surfaces table is required — documents the page background (--neutral-50), card surface (--neutral-white), brand tint (--primary-50), and overlay in a single scannable table.

Agent Prompt Guide replaces generic "Starter Prompts" — each example references actual token names and the React component API (e.g., <Input prefix="Rp" />) so agents can generate valid code without guessing prop names.

Quick Start CSS block — a copy-paste :root { } block at the end covers all color, layout, and typography tokens. Useful for bootstrapping a new project without reading the full spec.

DESIGN.md (in specs.ts) uses markdown tables with backtick-escaped code spans (\`--token\`).
llms.txt (in public/) uses plain key: value — role format (no markdown tables) since it is fetched as raw text by agents and must parse cleanly without a markdown renderer.

Both files are maintained manually in sync — a future task is to generate llms.txt from specs.ts to guarantee they share the same source of truth (see migration path item 3 above).
