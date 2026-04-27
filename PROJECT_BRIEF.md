Goal: Build a Single-Page simplified design component library that acts as a site that humans can visit to copy design specs and AI agents (Claude, Cursor, Gemini) can read via a single URL to generate design-compliant prototypes.

The documentation is a stand alone high-density, single-page application to avoid CSS conflicts with existing portals.

Architecture:
Plaintext/packages/tokens       ← Design tokens (TS)
/packages/components            ← React component library
/apps/manifest                  ← Standalone Single-Page Dashboard (Next.js, to be hosted on Vercel)

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
Copyable DESIGN.md: A button to copy the entire design system's rules into the clipboard for immediate pasting into chat tools or download it as a skill.
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