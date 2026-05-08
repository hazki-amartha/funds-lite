import { COLOR_SCALES, LAYOUT_PATTERNS, RADII, SPACINGS, TOKENS, TYPE_SCALE } from './tokens'

export const CLAUDE_PROMPT = `You are building UI for Amartha Financial (https://amartha.com/), a micro-finance lending company focused on productive micro loans for grassroot women in Indonesia, using the FunDS Lite design system.
Read the full spec: https://funds-lite.vercel.app/llms.txt

AMARTHA PRODUCT CONTEXT:

  Products:    Modal (digital loan) · Celengan (retail investment, grassroot)
               GGS (retail investment, middle-upper) · B2B Funding (institutional)
               PPOB / AmarthaLink (bill payment & agent PPOB) · Poket (in-app wallet)
  Platforms:   AmarthaFin App (consumer iOS/Android) · NG-MIS (internal ops/CRM)
               A-Partner App (field agents)

LOCKED TOKENS — never use any other values:

  primary:     #853291  (hover: #732C7C, tint: #FEF3FF)
  text:        #111928  (caption: #6B7280, disabled: #8E95A3)
  border:      #E5E7EB
  font:        Inter — weights 500 and 700 ONLY
  spacing:     0 2 4 8 12 16 20 24 32 40 48 (px)
  radius:      9999px buttons (pill) · 12px cards · 8px inputs · 6px sm
  status:      blue #056DCE · green #009C6A · orange #F7941D · red #D73630
  layout:      mobile px 16 · topbar 48h/16x · sections 12 · cards 12p/8g

Do not use arbitrary Tailwind values (e.g. w-[437px]).
Do not invent hex values outside this token set.
Do not use font-weight 400, 600, or 800.`

export const CURSOR_RULES = `# FunDS Lite · .cursorrules
# Generated from tailwind.config.ts — do not edit manually

[product]
company       = Amartha Financial (https://amartha.com/)
context       = Micro-finance lending for grassroot women in Indonesia
products      = Modal (digital loan) | Celengan (retail invest) | GGS (retail invest)
                B2B Funding | PPOB / AmarthaLink | Poket (wallet)
platforms     = AmarthaFin App (iOS/Android) | NG-MIS (internal ops/CRM) | A-Partner App

[colors]
primary-500   = #853291
primary-600   = #732C7C
primary-50    = #FEF3FF
text-default  = #111928
text-caption  = #6B7280
border        = #E5E7EB
blue-500      = #056DCE
green-500     = #009C6A
orange-500    = #F7941D
red-500       = #D73630

[typography]
font-family   = Inter
font-weight   = 500 | 700   # no other weights permitted

[spacing]
valid-px      = 0 2 4 8 12 16 20 24 32 40 48

[layout]
page-padding-x   = 16px
page-padding-top = 16px
section-gap      = 12px
card-padding     = 12px
card-gap         = 8px
topbar-height    = 48px
topbar-padding-x = 16px

[radius]
button        = 9999px (pill)
input         = 8px
card          = 12px
sm            = 6px

[guardrails]
no-arbitrary  = never use w-[x] or text-[#xxx] Tailwind syntax
no-extra-hex  = only use hex values listed above
font-only     = Inter only, no other Google Fonts`

export const DESIGN_MD = `# FunDS Lite — Design System Specification
> Purple fintech precision — a single brand purple anchoring every action across consumer mobile and internal dashboard.

**Version:** 1.0.0 · **Updated:** 2026-04 · **Platforms:** AmarthaFin App, NG-MIS

FunDS Lite is the lightweight subset of the Amartha FunDS design system. The brand anchors in a single purple (#853291) — every primary action, link, and active state uses this color. Status colors are always paired with their 50-tint backgrounds. Inter is the only permitted typeface at weights 500 and 700.

## Product Context

**Company:** Amartha Financial (https://amartha.com/) — micro-finance lending focused on productive micro loans for grassroot women in Indonesia.

**Products:**
- Modal — Digital productive loan (primary borrower product)
- Group Loan — Non-digital group loan (deprecated; migrating to Modal)
- Celengan — Retail investment, grassroot market
- GGS (Grassroot Growth Series) — Retail investment, middle-upper class
- B2B Funding — Institutional funding (not in AmarthaFin App)
- PPOB / AmarthaLink — B2C bill payment & agent-based PPOB
- Poket — In-app wallet for Amartha ecosystem

**Platforms:**
- AmarthaFin App — Consumer iOS/Android (borrowers, investors, PPOB users)
- NG-MIS — Internal ops system / potential CRM
- A-Partner App — Internal app for field partners/agents

---

## Tokens — Colors

### Brand (Primary Purple)

| Name | Value | Token | Role |
|------|-------|-------|------|
| Primary 50 | \`#FEF3FF\` | \`--primary-50\` | Badge fills, focus rings, ghost hover backgrounds |
| Primary 200 | \`#E5B8EF\` | \`--primary-200\` | Focus ring outer glow |
| Primary 300 | \`#D68EE4\` | \`--primary-300\` | Illustrative / decorative |
| Primary 400 | \`#A642B7\` | \`--primary-400\` | Secondary decorative actions |
| Primary 500 | \`#853291\` | \`--primary-500\` | PRIMARY — buttons, links, active states |
| Primary 600 | \`#732C7C\` | \`--primary-600\` | Hover / pressed state |
| Primary 700 | \`#612966\` | \`--primary-700\` | On-light text emphasis |
| Primary 900 | \`#3D1042\` | \`--primary-900\` | Deep emphasis |

### Neutral

| Name | Value | Token | Role |
|------|-------|-------|------|
| White | \`#FFFFFF\` | \`--neutral-white\` | Surface / card backgrounds |
| Neutral 50 | \`#F9FAF8\` | \`--neutral-50\` | Page background |
| Neutral 200 | \`#E5E7EB\` | \`--neutral-200\` | Borders (default) |
| Neutral 400 | \`#C6CAD0\` | \`--neutral-400\` | Placeholder text |
| Neutral 500 | \`#8E95A3\` | \`--neutral-500\` | Disabled state |
| Neutral 600 | \`#6B7280\` | \`--neutral-600\` | Caption / secondary text |
| Neutral 700 | \`#525C6A\` | \`--neutral-700\` | Secondary text emphasis |
| Neutral 900 | \`#111928\` | \`--neutral-900\` | Default text (darkest) |

### Status Colors

Always pair the 500 foreground with its 50-tint background. Never use a status color on white or neutral-50 without the tint.

| Name | Value | Token | Tint bg | Role |
|------|-------|-------|---------|------|
| Blue 500 | \`#056DCE\` | \`--blue-500\` | \`#EDF7FF\` (\`--blue-50\`) | Informational |
| Green 500 | \`#009C6A\` | \`--green-500\` | \`#E4FCEF\` (\`--green-50\`) | Success / funded |
| Orange 500 | \`#F7941D\` | \`--orange-500\` | \`#FDF4E9\` (\`--orange-50\`) | Warning / pending |
| Red 500 | \`#D73630\` | \`--red-500\` | \`#FFF4F3\` (\`--red-50\`) | Error / overdue / danger |
| Yellow 500 | \`#EAB20B\` | \`--yellow-500\` | \`#FFFED9\` (\`--yellow-50\`) | Accent / review |

### Semantic Token Aliases

Use these names in component code — prefer over raw hex.

| Alias | Resolves to | Role |
|-------|-------------|------|
| \`text-default\` | \`--neutral-900\` (#111928) | Primary readable text |
| \`text-caption\` | \`--neutral-600\` (#6B7280) | Secondary / supporting text |
| \`text-disabled\` | \`--neutral-500\` (#8E95A3) | Disabled labels |
| \`text-placeholder\` | \`--neutral-400\` (#C6CAD0) | Input placeholder text |
| \`text-link\` | \`--primary-500\` (#853291) | Clickable links |
| \`border-default\` | \`--neutral-200\` (#E5E7EB) | Card and input borders |
| \`border-light\` | \`--neutral-50\` (#F9FAF8) | Subtle dividers |

---

## Tokens — Typography

**Font family:** Inter (Google Fonts) · \`--font\`
**Weights:** 500 (body) and 700 (headings/buttons) — no other weights permitted.

### Type Scale

| Class | Size | Weight | Letter Spacing | Role |
|-------|------|--------|----------------|------|
| \`text-24\` | 24px | 700 | −0.02em | Page titles / primary headings |
| \`text-20\` | 20px | 700 | −0.01em | Section headings |
| \`text-18\` | 18px | 500 | 0 | Primary reading size (dashboards) |
| \`text-16\` | 16px | 500 | 0 | Secondary paragraphs and descriptions |
| \`text-14\` | 14px | 500 | 0 | Compact data tables and labels |
| \`text-12\` | 12px | 500 | 0 | Body / caption / helper text |
| \`text-10\` | 10px | 500 | +0.06em | Overline / micro (UPPERCASE only) |

---

## Tokens — Spacing & Shapes

**Base unit:** 4px · **Density:** compact

### Spacing Scale

| Class | Value |
|-------|-------|
| \`space-0\` | 0px |
| \`space-2\` | 2px |
| \`space-4\` | 4px |
| \`space-8\` | 8px |
| \`space-12\` | 12px |
| \`space-16\` | 16px |
| \`space-20\` | 20px |
| \`space-24\` | 24px |
| \`space-32\` | 32px |
| \`space-40\` | 40px |
| \`space-48\` | 48px |

**Forbidden:** 5, 6, 10, 15, 25, 30px — never use values not in the scale above.

### Border Radius

| Element | Value | Class |
|---------|-------|-------|
| Buttons, badges | 9999px | \`rounded-full\` |
| Inputs, selects | 8px | \`rounded-8\` |
| Cards, modals, drawers | 12px | \`rounded-12\` |
| Chips, small tags | 6px | \`rounded-6\` |

### Layout Patterns

| Pattern | Token | Value | Notes |
|---------|-------|-------|-------|
| Mobile Screen | \`page-padding-x\` | 16px | Horizontal edge margin for all screen content |
| Mobile Screen | \`page-padding-top\` | 16px | Below topbar |
| Mobile Screen | \`section-gap\` | 12px | Vertical gap between cards/sections |
| Card | \`card-padding\` | 12px | Internal card padding (not 20px) |
| Card | \`card-gap\` | 8px | Gap between cards |
| Topbar | \`topbar-height\` | 48px | — |
| Topbar | \`topbar-padding-x\` | 16px | — |

---

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Page Background | \`#F9FAF8\` (\`--neutral-50\`) | Primary page / screen background |
| 1 | Surface / Card | \`#FFFFFF\` (\`--neutral-white\`) | Card and modal backgrounds |
| — | Brand Tint | \`#FEF3FF\` (\`--primary-50\`) | Badge fills, ghost hover, focus rings |
| — | Overlay | \`rgba(17, 25, 40, 0.8)\` | Modal / drawer overlays |

---

## Components

### Button
**Role:** Trigger an action or event

Shape: pill (9999px). Font weight: 700. The pill is the only permitted button shape — never rectangular or lightly rounded.

Implementation: \`src/funds-lite/components/Button.tsx\`
Styles: \`src/funds-lite/components/styles.css\`
React API: \`<Button variant="primary" size="md">Label</Button>\`
Props: \`variant = primary | secondary | outline | ghost | danger\` · \`size = xs | sm | md | lg | xl\` · accepts native \`button\` props including \`disabled\`, \`type\`, \`onClick\`.

| Variant | Background | Border | Text | Hover |
|---------|------------|--------|------|-------|
| primary | \`--primary-500\` + gradient | white 16% | white | \`--primary-600\` |
| secondary | white | \`--primary-500\` | \`--primary-500\` | \`--primary-50\` tint |
| outline | white | \`--neutral-200\` | \`--neutral-900\` | \`--neutral-400\` border |
| ghost | transparent | transparent | \`--primary-500\` | \`--primary-50\` bg |
| danger | \`--red-500\` | \`--red-500\` | white | \`--red-600\` |

Sizes: \`xs\` (12px / 4px 8px) · \`sm\` (12px / 8px 10px) · \`md\` (14px / 8px 12px) · \`lg\` (16px / 12px 16px) · \`xl\` (16px / 12px 20px)

Disabled: \`--neutral-200\` bg, \`--neutral-500\` text, no shadow, \`cursor: not-allowed\`.
Focus ring: 2px white + 4px \`--primary-200\` (#E5B8EF) outline.

### Input
**Role:** Text field, select, textarea

Radius 8px. Border: \`--neutral-200\`. On focus: border shifts to \`--primary-500\` + 3px \`--primary-50\` ring.

Implementation: \`src/funds-lite/components/Input.tsx\`
Styles: \`src/funds-lite/components/styles.css\`
React API: \`<Input label="Amount" prefix="Rp" placeholder="Type here" />\`
Props: \`size = sm | md | lg\` · \`state = default | focus | valid | error\` · supports \`label\`, \`optionalText\`, \`required\`, \`description\`, \`helperText\`, \`prefix\`, \`suffix\`, \`prefixInteractive\`, \`suffixInteractive\`, \`prefixButtonProps\`, \`suffixButtonProps\`.

| State | Border | Ring |
|-------|--------|------|
| default | \`--neutral-200\` | — |
| focus | \`--primary-500\` | \`--primary-50\` 3px |
| valid | \`--green-500\` | — |
| error | \`--red-500\` | \`--red-50\` 3px |
| disabled | \`--neutral-200\` | — |

Sizes: sm · md · lg
Conditions: empty · filled
Additional info: label, required, optionalText, helperText, description
Supports prefix and suffix (clickable via \`prefixInteractive\`/\`suffixInteractive\` + \`prefixButtonProps\`/\`suffixButtonProps\`)
Icons: left or right when meaningful or actionable
Variants: text input · select · textarea · tap area

### Badge
**Role:** Status indicator, categorical label

Shape: pill (9999px). Padding: 3px 10px. Font: 12px / weight 500.

| Variant | Background | Text |
|---------|------------|------|
| primary | \`--primary-50\` (#FEF3FF) | \`--primary-600\` (#732C7C) |
| blue | \`--blue-50\` (#EDF7FF) | \`--blue-600\` (#0457A5) |
| green | \`--green-50\` (#E4FCEF) | \`--green-600\` (#007D55) |
| orange | \`--orange-50\` (#FDF4E9) | \`--orange-700\` (#AD540A) |
| red | \`--red-50\` (#FFF4F3) | \`--red-600\` (#AC2B26) |
| yellow | \`--yellow-50\` (#FFFED9) | \`--yellow-700\` (#996F03) |
| neutral | \`--neutral-50\` (#F9FAF8) | \`--neutral-600\` (#6B7280) |

### Card
**Role:** Surface container for grouped information

Radius: 12px. Border: 1px solid \`--neutral-200\`. Background: \`--neutral-white\`. Padding: 12px.
Never nest cards. Use cards to group related fund information.

---

## Do's and Don'ts

### Do
- Use \`--primary-500\` (#853291) for every primary action button, active state, and link — it is the single brand action color.
- Pair every status color with its 50-tint background (e.g. \`--red-500\` text on \`--red-50\` bg).
- Use Inter at weight 500 or 700 only. No exceptions.
- Keep spacing values within the 4px scale: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48px.
- Use semantic alias names (\`text-default\`, \`border-default\`) over raw hex in component code.
- Use pill radius (9999px) for buttons and badges, 8px for inputs, 12px for cards — always.

### Don't
- Don't use arbitrary Tailwind values like \`w-[437px]\` or \`text-[#abc]\` — ever.
- Don't invent hex values not in this token set.
- Don't use font-weight 400, 600, or 800 — only 500 and 700.
- Don't use spacing values outside the scale (e.g. 5px, 10px, 15px, 25px).
- Don't use any Google Font other than Inter.
- Don't use purple tones from generic Tailwind palettes — only \`--primary-*\` tokens.
- Don't use a status color on white without the tint bg pair.
- Don't use emoji in the design.

---

## Agent Prompt Guide

**Quick Token Reference**
- Primary action: \`--primary-500\` (#853291)
- Primary hover: \`--primary-600\` (#732C7C)
- Text default: \`--neutral-900\` (#111928)
- Page background: \`--neutral-50\` (#F9FAF8)
- Card surface: \`--neutral-white\` (#FFFFFF)
- Border: \`--neutral-200\` (#E5E7EB)

**Example Component Prompts**

1. **Fund Dashboard Card:** \`--neutral-white\` bg, \`rounded-12\`, \`1px solid --neutral-200\` border, 12px padding. Fund name in \`text-16\` weight 700 (\`--neutral-900\`), AUM/IRR stats in \`text-14\` weight 500. Status badge variant matching fund state.

2. **Primary Action Button:** \`--primary-500\` background, white text, \`rounded-full\` (9999px), \`text-14\` weight 700, \`8px 12px\` padding. Hover shifts to \`--primary-600\`.

3. **Data Table:** \`text-14\` weight 500 (\`--neutral-900\`), \`--neutral-200\` bottom border per row, \`--neutral-50\` header background. Status column uses Badge component.

4. **Amount Input with Prefix:** \`<Input label="Amount" prefix="Rp" prefixInteractive prefixButtonProps={{ 'aria-label': 'Choose currency' }} placeholder="0" />\` — radius 8px, border \`--neutral-200\`, focus ring \`--primary-500\` + \`--primary-50\`.

5. **Topbar:** 48px height, \`--neutral-white\` background, \`1px solid --neutral-200\` border-bottom. Logo in \`--primary-500\`. Nav items in \`text-14\` weight 500 (\`--neutral-600\`), active in \`--neutral-900\` weight 700.

---

## Quick Start

\`\`\`css
:root {
  /* Brand */
  --primary-50:  #FEF3FF;
  --primary-200: #E5B8EF;
  --primary-300: #D68EE4;
  --primary-400: #A642B7;
  --primary-500: #853291;
  --primary-600: #732C7C;
  --primary-700: #612966;
  --primary-900: #3D1042;

  /* Neutral */
  --neutral-white: #FFFFFF;
  --neutral-50:    #F9FAF8;
  --neutral-200:   #E5E7EB;
  --neutral-400:   #C6CAD0;
  --neutral-500:   #8E95A3;
  --neutral-600:   #6B7280;
  --neutral-700:   #525C6A;
  --neutral-900:   #111928;

  /* Status */
  --blue-50:     #EDF7FF;  --blue-500:    #056DCE;  --blue-600:    #0457A5;
  --green-50:    #E4FCEF;  --green-500:   #009C6A;  --green-600:   #007D55;
  --orange-50:   #FDF4E9;  --orange-500:  #F7941D;  --orange-700:  #AD540A;
  --red-50:      #FFF4F3;  --red-500:     #D73630;  --red-600:     #AC2B26;
  --yellow-50:   #FFFED9;  --yellow-500:  #EAB20B;  --yellow-700:  #996F03;

  /* Typography */
  --font: 'Inter', ui-sans-serif, system-ui, sans-serif;

  /* Layout */
  --page-padding-x:   16px;
  --page-padding-top: 16px;
  --section-gap:      12px;
  --card-padding:     12px;
  --card-gap:         8px;
  --topbar-height:    48px;
  --topbar-padding-x: 16px;
}
\`\`\`
`

export const SECTION_SPECS: Record<string, string> = {
  colors: `## Colors

Brand:
${COLOR_SCALES.Brand.map(({ scale, hex }) => `- ${scale}: ${hex}`).join('\n')}

Neutral:
${COLOR_SCALES.Neutral.map(({ scale, hex }) => `- ${scale}: ${hex}`).join('\n')}

Blue:
${COLOR_SCALES.Blue.map(({ scale, hex }) => `- ${scale}: ${hex}`).join('\n')}

Green:
${COLOR_SCALES.Green.map(({ scale, hex }) => `- ${scale}: ${hex}`).join('\n')}

Orange:
${COLOR_SCALES.Orange.map(({ scale, hex }) => `- ${scale}: ${hex}`).join('\n')}

Red:
${COLOR_SCALES.Red.map(({ scale, hex }) => `- ${scale}: ${hex}`).join('\n')}

Yellow:
${COLOR_SCALES.Yellow.map(({ scale, hex }) => `- ${scale}: ${hex}`).join('\n')}

Token Reference:
${TOKENS.map((t) => `- ${t.key}: ${t.hex} — ${t.desc}`).join('\n')}`,
  typography: `## Typography

${TYPE_SCALE.map((t) => `- ${t.cls}: ${t.spec} -> ${t.sample}`).join('\n')}

Rules:
- Font family: Inter
- Allowed weights: 500, 700 only
- text-12 is body/caption in normal case
- text-10 is uppercase micro/overline`,
  spacing: `## Spacing & Sizing

Spacing scale:
${SPACINGS.map((s) => `- space-${s.v}: ${s.px} (${s.r})`).join('\n')}

Border radius:
${RADII.map((r) => `- rounded-${r.k}: ${r.v === '∞' ? '9999px' : r.v}`).join('\n')}

Layout Patterns:
${LAYOUT_PATTERNS.map((group) => `${group.name}:\n${group.tokens.map((token) => `- ${token.key}: ${token.value}${token.note ? ` — ${token.note}` : ''}`).join('\n')}`).join('\n\n')}`,
  buttons: `## Buttons

- Implementation: src/funds-lite/components/Button.tsx
- Styles: src/funds-lite/components/styles.css
- React API: <Button variant="primary" size="md">Label</Button>
- Shape: pill (9999px)
- Variants: primary, secondary, outline, ghost, danger
- Sizes: xs, sm, md, lg, xl
- Font weight: 700
- Disabled: neutral-200 background, neutral-500 text
- Focus ring: 2px white + 4px primary-200`,
  inputs: `## Inputs

- Implementation: src/funds-lite/components/Input.tsx
- Styles: src/funds-lite/components/styles.css
- React API: <Input label="Amount" prefix="Rp" placeholder="Type here" />
- Radius: 8px
- Border: #E5E7EB
- Focus: border #853291 + 3px #FEF3FF ring
- Sizes: sm, md, lg
- States: default, focus, valid, error, disabled
- Supports empty and filled conditions
- Additional info props: label, required, optionalText, helperText, description
- Prefix and suffix props can be clickable or static via prefixInteractive/suffixInteractive and prefixButtonProps/suffixButtonProps
- Use icons on left or right only when they add meaning or action
- Variants: text input, select, textarea, tap area`,
  badges: `## Badges

- Shape: pill (9999px)
- Padding: 3px 10px
- Font: 12px / 500
- Variants: primary, blue, green, orange, red, yellow, neutral`,
  cards: `## Cards

- Radius: 12px
- Border: 1px solid #E5E7EB
- Background: #FFFFFF
- Padding: 12px
- Use cards to group related information
- Never nest cards`,
  prompts: `## System Prompts

Claude System Prompt:
${CLAUDE_PROMPT}

---

Cursor .cursorrules:
${CURSOR_RULES}`,
  llms: `## llms.txt Spec

- Endpoint: https://funds-lite.vercel.app/llms.txt
- Purpose: machine-readable complete design system spec
- Includes: color tokens, typography, spacing, components, and guardrails`,
}
