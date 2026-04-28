'use client'

import { useEffect, useRef, type ReactNode } from 'react'

// ── Design token data (source: tailwind.config.ts) ──────────────────────────

const COLOR_SCALES: Record<string, { scale: string, hex: string }[]> = {
  Brand: [
    { scale: '50', hex: '#FEF3FF' },
    { scale: '200', hex: '#E5B8EF' },
    { scale: '300', hex: '#D68EE4' },
    { scale: '400', hex: '#A642B7' },
    { scale: '500', hex: '#853291' },
    { scale: '600', hex: '#732C7C' },
    { scale: '700', hex: '#612966' },
    { scale: '900', hex: '#3D1042' },
  ],
  Neutral: [
    { scale: 'white', hex: '#FFFFFF' },
    { scale: '50', hex: '#F9FAF8' },
    { scale: '200', hex: '#E5E7EB' },
    { scale: '400', hex: '#C6CAD0' },
    { scale: '500', hex: '#8E95A3' },
    { scale: '600', hex: '#6B7280' },
    { scale: '700', hex: '#525C6A' },
    { scale: '900', hex: '#111928' },
  ],
  Blue: [
    { scale: '50', hex: '#EDF7FF' },
    { scale: '200', hex: '#BCE0F7' },
    { scale: '300', hex: '#70B7E5' },
    { scale: '500', hex: '#056DCE' },
    { scale: '600', hex: '#0457A5' },
    { scale: '700', hex: '#03417C' },
    { scale: '900', hex: '#022C52' },
  ],
  Green: [
    { scale: '50', hex: '#E4FCEF' },
    { scale: '200', hex: '#A2EDC3' },
    { scale: '300', hex: '#4BDB98' },
    { scale: '500', hex: '#009C6A' },
    { scale: '600', hex: '#007D55' },
    { scale: '700', hex: '#005E40' },
    { scale: '900', hex: '#003E2A' },
  ],
  Orange: [
    { scale: '50', hex: '#FDF4E9' },
    { scale: '200', hex: '#FCDDAB' },
    { scale: '300', hex: '#FABF77' },
    { scale: '500', hex: '#F7941D' },
    { scale: '600', hex: '#E0771B' },
    { scale: '700', hex: '#AD540A' },
    { scale: '900', hex: '#70320D' },
  ],
  Red: [
    { scale: '50', hex: '#FFF4F3' },
    { scale: '200', hex: '#FFD9D6' },
    { scale: '300', hex: '#F3726D' },
    { scale: '500', hex: '#D73630' },
    { scale: '600', hex: '#AC2B26' },
    { scale: '700', hex: '#81201D' },
    { scale: '900', hex: '#4C0C0A' },
  ],
  Yellow: [
    { scale: '50', hex: '#FFFED9' },
    { scale: '200', hex: '#FFF4A9' },
    { scale: '300', hex: '#FCE677' },
    { scale: '500', hex: '#EAB20B' },
    { scale: '600', hex: '#C69608' },
    { scale: '700', hex: '#996F03' },
    { scale: '900', hex: '#6A4103' },
  ],
}

const TYPE_SCALE = [
  { cls: 'text-24', spec: '24px / 700 / −0.02em', size: '24px', weight: 700, ls: '-0.02em', sample: 'Heading 24', uppercase: false },
  { cls: 'text-20', spec: '20px / 700 / −0.01em', size: '20px', weight: 700, ls: '-0.01em', sample: 'Heading 20', uppercase: false },
  { cls: 'text-18', spec: '18px / 500 / 0', size: '18px', weight: 500, ls: '0', sample: 'Body 18 — primary reading size for dashboards.', uppercase: false },
  { cls: 'text-16', spec: '16px / 500 / 0', size: '16px', weight: 500, ls: '0', sample: 'Body 16 — secondary paragraphs and descriptions.', uppercase: false },
  { cls: 'text-14', spec: '14px / 500 / 0', size: '14px', weight: 500, ls: '0', sample: 'Body 14 — compact data tables and labels.', uppercase: false },
  { cls: 'text-12', spec: '12px / 500 / 0', size: '12px', weight: 500, ls: '0', sample: 'Body 12 — caption and helper text.', uppercase: false },
  { cls: 'text-10', spec: '10px / 500 / +0.06em', size: '10px', weight: 500, ls: '0.06em', sample: 'OVERLINE / MICRO LABEL', uppercase: true },
]

const SPACINGS = [
  { v: '0', px: '0px', r: '0' },
  { v: '2', px: '2px', r: '0.125rem' },
  { v: '4', px: '4px', r: '0.25rem' },
  { v: '8', px: '8px', r: '0.5rem' },
  { v: '12', px: '12px', r: '0.75rem' },
  { v: '16', px: '16px', r: '1rem' },
  { v: '20', px: '20px', r: '1.25rem' },
  { v: '24', px: '24px', r: '1.5rem' },
  { v: '32', px: '32px', r: '2rem' },
  { v: '40', px: '40px', r: '2.5rem' },
  { v: '48', px: '48px', r: '3rem' },
]

const RADII = [
  { k: 'none', v: '0px' },
  { k: '2', v: '2px' },
  { k: '4', v: '4px' },
  { k: '6', v: '6px' },
  { k: '8', v: '8px' },
  { k: '12', v: '12px' },
  { k: '16', v: '16px' },
  { k: '20', v: '20px' },
  { k: '24', v: '24px' },
  { k: '32', v: '32px' },
  { k: '40', v: '40px' },
  { k: 'full', v: '∞' },
]

const LAYOUT_PATTERNS = [
  {
    name: 'Mobile Screen',
    tokens: [
      { key: 'page-padding-x', value: '16px', note: 'horizontal edge margin for all screen content' },
      { key: 'page-padding-top', value: '16px', note: 'below topbar' },
      { key: 'section-gap', value: '12px', note: 'vertical gap between cards/sections' },
    ],
  },
  {
    name: 'Card',
    tokens: [
      { key: 'card-padding', value: '12px', note: 'internal card padding (not 20px)' },
      { key: 'card-gap', value: '8px', note: 'gap between cards' },
    ],
  },
  {
    name: 'Topbar',
    tokens: [
      { key: 'topbar-height', value: '48px', note: '' },
      { key: 'topbar-padding-x', value: '16px', note: '' },
    ],
  },
]

const TOKENS = [
  { cat: 'Brand', key: 'primary-500', hex: '#853291', desc: 'Primary action — buttons, links, active states' },
  { cat: 'Brand', key: 'primary-600', hex: '#732C7C', desc: 'Hover / pressed state' },
  { cat: 'Brand', key: 'primary-50', hex: '#FEF3FF', desc: 'Tinted backgrounds, badge fills' },
  { cat: 'Semantic', key: 'text-default', hex: '#111928', desc: 'neutral-900 — primary readable text' },
  { cat: 'Semantic', key: 'text-caption', hex: '#6B7280', desc: 'neutral-600 — secondary / supporting text' },
  { cat: 'Semantic', key: 'text-disabled', hex: '#8E95A3', desc: 'neutral-500 — disabled labels' },
  { cat: 'Semantic', key: 'text-placeholder', hex: '#C6CAD0', desc: 'neutral-400 — input placeholder text' },
  { cat: 'Semantic', key: 'text-link', hex: '#853291', desc: 'primary-500 — clickable links' },
  { cat: 'Border', key: 'border-default', hex: '#E5E7EB', desc: 'neutral-200 — card and input borders' },
  { cat: 'Border', key: 'border-light', hex: '#F9FAF8', desc: 'neutral-50 — subtle dividers' },
  { cat: 'Status', key: 'blue-500', hex: '#056DCE', desc: 'Informational states' },
  { cat: 'Status', key: 'green-500', hex: '#009C6A', desc: 'Success / funded states' },
  { cat: 'Status', key: 'orange-500', hex: '#F7941D', desc: 'Warning / pending states' },
  { cat: 'Status', key: 'red-500', hex: '#D73630', desc: 'Error / overdue / danger states' },
]

const CLAUDE_PROMPT = `You are building UI for Amartha Financial (https://amartha.com/), a micro-finance lending company focused on productive micro loans for grassroot women in Indonesia, using the FunDS Lite design system.
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

const CURSOR_RULES = `# FunDS Lite · .cursorrules
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

const DESIGN_MD = `---
version: "1.0.0"
name: "FunDS Lite"
description: "Lightweight design system for Amartha Financial. Covers tokens, typography, spacing, and core components for AmarthaFin App (consumer mobile) and NG-MIS (internal dashboard)."
colors:
  primary:          "#853291"
  primary-hover:    "#732C7C"
  primary-tint:     "#FEF3FF"
  text-default:     "#111928"
  text-caption:     "#6B7280"
  text-disabled:    "#8E95A3"
  text-placeholder: "#C6CAD0"
  text-link:        "#853291"
  border:           "#E5E7EB"
  surface:          "#FFFFFF"
  background:       "#F9FAF8"
  blue-500:         "#056DCE"
  green-500:        "#009C6A"
  orange-500:       "#F7941D"
  red-500:          "#D73630"
typography:
  heading-24: { fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em" }
  heading-20: { fontSize: "20px", fontWeight: 700, letterSpacing: "-0.01em" }
  body-18:    { fontSize: "18px", fontWeight: 500 }
  body-16:    { fontSize: "16px", fontWeight: 500 }
  body-14:    { fontSize: "14px", fontWeight: 500 }
  body-12:    { fontSize: "12px", fontWeight: 500 }
  micro-10:   { fontSize: "10px", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase" }
spacing:
  base:  "4px"
  scale: [0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48]
layout:
  mobile-screen:
    page-padding-x:   "16px"
    page-padding-top: "16px"
    section-gap:      "12px"
  card:
    padding: "12px"
    gap:     "8px"
  topbar:
    height:    "48px"
    padding-x: "16px"
rounded:
  sm:     "6px"
  input:  "8px"
  card:   "12px"
  button: "9999px"
components:
  button:
    shape:       "9999px (pill)"
    font-weight: 700
    variants:    [primary, secondary, outline, ghost, danger]
    sizes:       [xs, sm, md, lg, xl]
  input:
    radius:     "8px"
    border:     "#E5E7EB"
    focus-ring: "3px #FEF3FF + border #853291"
  badge:
    shape:     "9999px (pill)"
    padding:   "3px 10px"
    font-size: "12px"
  card:
    radius:  "12px"
    border:  "#E5E7EB"
    padding: "12px"
---

# FunDS Lite — DESIGN.md
## Design System Specification — v1.0.0

### Amartha Product Context
Company: Amartha Financial (https://amartha.com/)
A micro-finance lending company focused on productive micro loans for grassroot women in Indonesia.

Products:
- Modal — Digital productive loan product
- Group Loan — Non-digital loan (deprecated → shifting to Modal)
- Celengan — Retail investment, grassroot market
- Grassroot Growth Series (GGS) — Retail investment, middle-upper class
- B2B Funding — Institutional funding (not in AmarthaFin App)
- PPOB / AmarthaLink — B2C bill payment & agent-based PPOB
- Poket — In-app wallet for Amartha ecosystem

Platforms:
- AmarthaFin App — Consumer iOS/Android (borrowers, investors, PPOB users)
- NG-MIS — Internal ops system / potential CRM
- A-Partner App — Internal app for field partners/agents

---

## Colors

The brand is anchored in purple (#853291). Hover and pressed states shift to the darker shade (#732C7C). The light tint (#FEF3FF) is used for badge fills, ghost hover backgrounds, and focus rings.

Status colors are always paired with their 50-tint background — green-500 on green-50, red-500 on red-50, etc. Never use a status color on a white or neutral-50 background without the tint pair.

Never invent a hex value outside this spec. When in doubt, use neutral-900 (#111928) for text and neutral-200 (#E5E7EB) for borders.

### Brand (Primary Purple)
| Token         | Hex       | Usage                                     |
|---------------|-----------|-------------------------------------------|
| primary-50    | #FEF3FF   | Badge fill, focus ring, ghost hover bg    |
| primary-400   | #A642B7   | Secondary actions, decorative             |
| primary-500   | #853291   | Buttons, links, active states (PRIMARY)   |
| primary-600   | #732C7C   | Hover / pressed state                     |
| primary-900   | #3D1042   | Deep emphasis                             |

### Neutral
| Token         | Hex       | Usage                                     |
|---------------|-----------|-------------------------------------------|
| neutral-white | #FFFFFF   | Surface / card backgrounds                |
| neutral-50    | #F9FAF8   | Page background                           |
| neutral-200   | #E5E7EB   | Borders (default)                         |
| neutral-400   | #C6CAD0   | Placeholder text                          |
| neutral-500   | #8E95A3   | Disabled state                            |
| neutral-600   | #6B7280   | Caption / secondary text                  |
| neutral-900   | #111928   | Default text (darkest)                    |

### Status
| Token       | Hex       | Bg tint | Usage              |
|-------------|-----------|---------|--------------------|
| blue-500    | #056DCE   | #EDF7FF | Informational      |
| green-500   | #009C6A   | #E4FCEF | Success / funded   |
| orange-500  | #F7941D   | #FDF4E9 | Warning / pending  |
| red-500     | #D73630   | #FFF4F3 | Error / danger     |

---

## Typography

Inter is the only permitted typeface. Use weight 500 for all body text and 700 for headings and button labels — no other weights. \`text-12\` is the body-12 / caption size in normal case. \`text-10\` remains the uppercase micro style with positive letter-spacing.

| Token      | Size  | Weight | Letter-spacing | Notes              |
|------------|-------|--------|----------------|--------------------|
| heading-24 | 24px  | 700    | -0.02em        | Page titles        |
| heading-20 | 20px  | 700    | -0.01em        | Section headings   |
| body-18    | 18px  | 500    | 0              | Primary reading    |
| body-16    | 16px  | 500    | 0              | Secondary text     |
| body-14    | 14px  | 500    | 0              | Tables, compact    |
| body-12    | 12px  | 500    | 0              | Body / caption     |
| micro-10   | 10px  | 500    | +0.06em        | Overline (UPPERCASE) |

---

## Shapes

Three radius tiers — use them deliberately:
- **Pill (9999px):** Buttons and badges only
- **8px:** Inputs, selects, textareas
- **12px:** Cards, modals, drawers
- **6px:** Chips, small tags

---

## Layout Patterns

### Mobile Screen
- page-padding-x: 16px — horizontal edge margin for all screen content
- page-padding-top: 16px — below topbar
- section-gap: 12px — vertical gap between cards/sections

### Card
- card-padding: 12px — internal card padding (not 20px)
- card-gap: 8px — gap between cards

### Topbar
- topbar-height: 48px
- topbar-padding-x: 16px

---

## Components

### Button
Shape: pill (9999px). Font weight: 700. Never use rectangular or lightly rounded buttons — the pill is the only permitted button shape.

| Variant   | Background  | Border      | Text      | Hover bg    |
|-----------|-------------|-------------|-----------|-------------|
| primary   | #853291     | inner glow  | white     | #732C7C     |
| secondary | white       | #853291     | #853291   | tint        |
| outline   | white       | #E5E7EB     | #111928   | #E5E7EB/50% |
| ghost     | transparent | transparent | #853291   | #FEF3FF     |
| danger    | #D73630     | #D73630     | white     | #AC2B26     |

Sizes: xs (12px / 4px 8px) · sm (12px / 8px 10px) · md (14px / 8px 12px) · lg (16px / 12px 16px) · xl (16px / 12px 20px)

Disabled state: neutral-200 bg, neutral-500 text, no shadow, cursor not-allowed.
Focus ring: 2px white + 4px primary-200 (#E5B8EF) outline.

### Input
Radius 8px. Border: #E5E7EB. On focus: border shifts to #853291 + 3px #FEF3FF ring.

| State       | Border    | Ring      |
|-------------|-----------|-----------|
| default     | #E5E7EB   | —         |
| focus       | #853291   | #FEF3FF 3px |
| valid       | #009C6A   | —         |
| error       | #D73630   | #FFF4F3 3px |

Sizes: small, medium, large.
Core states: default, hover, typing, error (while typing), error (default), disabled. Each state can appear as empty or filled.
Additional info options: label, required, optional, helper text, description, or all combined.
Supports prefix element and suffix element in clickable or static form.
Icons may appear on the left or right when they add meaning or an action.
Also supports tap-area variants for large touch targets.

### Badge
Shape: pill (9999px). Padding: 3px 10px. Font: 12px / weight 500.

| Variant  | Background | Text      |
|----------|------------|-----------|
| primary  | #FEF3FF    | #732C7C   |
| blue     | #EDF7FF    | #0457A5   |
| green    | #E4FCEF    | #007D55   |
| orange   | #FDF4E9    | #AD540A   |
| red      | #FFF4F3    | #AC2B26   |
| yellow   | #FFFED9    | #996F03   |
| neutral  | #F9FAF8    | #6B7280   |

### Card
Radius 12px. Border: 1px solid #E5E7EB. Background: #FFFFFF. Padding: 12px.
Use cards to group related fund information. Never nest cards.

---

## Do's and Don'ts

### Do
- Use primary-500 (#853291) for every primary action button, active state, and link. It is the single brand action color.
- Pair every status color with its 50-tint background (e.g. red-500 text on red-50 bg).
- Use Inter at weight 500 or 700 only. No exceptions.
- Keep spacing values within the 4px scale: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48px.
- Use semantic token names (text-default, border-default) over raw hex in component code.
- Use pill radius (9999px) for buttons and badges, 8px for inputs, 12px for cards — always.

### Don't
- Don't use arbitrary Tailwind values like \`w-[437px]\` or \`text-[#abc]\` — ever.
- Don't invent hex values not in this token set.
- Don't use font-weight 400, 600, or 800 — only 500 and 700.
- Don't use spacing values outside the scale (e.g. 5px, 10px, 15px, 25px).
- Don't use any Google Font other than Inter.
- Don't use purple tones from generic Tailwind palettes — only primary-* tokens.
- Don't use status color on white without the tint bg pair.
- Don't use emoji in the design.
`

const SECTION_SPECS: Record<string, string> = {
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

- Shape: pill (9999px)
- Variants: primary, secondary, outline, ghost, danger
- Sizes: xs, sm, md, lg, xl
- Font weight: 700
- Disabled: neutral-200 background, neutral-500 text
- Focus ring: 2px white + 4px primary-200`,
  inputs: `## Inputs

- Radius: 8px
- Border: #E5E7EB
- Focus: border #853291 + 3px #FEF3FF ring
- Sizes: small, medium, large
- States: default, hover, typing, error (while typing), error (default), disabled
- Supports empty and filled conditions
- Additional info: label, required, optional, helper, description
- Prefix and suffix can be clickable or static
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

// ── Sections for scroll-spy ──────────────────────────────────────────────────
const NAV_SECTIONS = [
  'overview', 'colors', 'typography', 'spacing',
  'buttons', 'inputs', 'badges', 'cards', 'prompts', 'llms',
]

export default function ManifestPage() {
  const toastRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function showToast(msg = 'Copied!') {
    const el = toastRef.current
    if (!el) return
    el.textContent = msg
    el.classList.add('show')
    if (toastTimer.current) clearTimeout(toastTimer.current)
    toastTimer.current = setTimeout(() => el.classList.remove('show'), 1800)
  }

  function fallbackCopy(text: string, label?: string) {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', 'true')
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;pointer-events:none'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    ta.setSelectionRange(0, ta.value.length)
    try { document.execCommand('copy'); showToast(label ?? 'Copied!') }
    catch { showToast('Copy failed — select text manually') }
    document.body.removeChild(ta)
  }

  async function copyText(text: string, label?: string) {
    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(text)
        showToast(label ?? 'Copied!')
        return
      }
    } catch {
      // Fall through to the document.execCommand fallback.
    }
    fallbackCopy(text, label)
  }

  function downloadMd() {
    const blob = new Blob([DESIGN_MD], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'DESIGN.md'
    a.click()
    URL.revokeObjectURL(url)
    showToast('DESIGN.md downloaded!')
  }

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  function renderSectionHeader(sectionId: keyof typeof SECTION_SPECS, title: string, sub: ReactNode) {
    return (
      <div className="section-header">
        <div className="section-title-row">
          <h2 className="section-title">{title}</h2>
          <button
            className="section-copy"
            type="button"
            aria-label={`Copy ${title} spec`}
            title={`Copy ${title} spec`}
            onClick={(event) => {
              event.preventDefault()
              void copyText(SECTION_SPECS[sectionId], `${title} spec copied!`)
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
            </svg>
          </button>
        </div>
        <p className="section-sub">{sub}</p>
      </div>
    )
  }

  // Scroll-spy: highlight active nav item
  useEffect(() => {
    const navItems = document.querySelectorAll<HTMLElement>('.nav-item')
    function onScroll() {
      let current = ''
      NAV_SECTIONS.forEach(id => {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = id
      })
      navItems.forEach(item => {
        const href = item.getAttribute('data-section') ?? ''
        item.classList.toggle('active', href === current)
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* ── Sidebar ─────────────────────────────────────────── */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="logo-mark">
            <svg viewBox="0 0 16 16"><path d="M8 1L15 13H1L8 1Z" /></svg>
          </div>
          <div>
            <div className="logo-text">FunDS Lite</div>
            <div className="logo-sub">v1.0.0 · 2026-04</div>
          </div>
        </div>

        <div className="nav-section">
          <div className="nav-label">Overview</div>
          <button className="nav-item active" data-section="overview" onClick={() => scrollTo('overview')}>
            <span />Overview
          </button>
        </div>
        <div className="nav-section">
          <div className="nav-label">Foundations</div>
          <button className="nav-item" data-section="colors" onClick={() => scrollTo('colors')}>    <span />Colors</button>
          <button className="nav-item" data-section="typography" onClick={() => scrollTo('typography')}><span />Typography</button>
          <button className="nav-item" data-section="spacing" onClick={() => scrollTo('spacing')}>   <span />Spacing &amp; Sizing</button>
        </div>
        <div className="nav-section">
          <div className="nav-label">Components</div>
          <button className="nav-item" data-section="buttons" onClick={() => scrollTo('buttons')}><span />Buttons</button>
          <button className="nav-item" data-section="inputs" onClick={() => scrollTo('inputs')}>  <span />Inputs</button>
          <button className="nav-item" data-section="badges" onClick={() => scrollTo('badges')}>  <span />Badges</button>
          <button className="nav-item" data-section="cards" onClick={() => scrollTo('cards')}>   <span />Cards</button>
        </div>
        <div className="nav-section">
          <div className="nav-label">AI Tools</div>
          <button className="nav-item" data-section="prompts" onClick={() => scrollTo('prompts')}><span />System Prompts</button>
          <button className="nav-item" data-section="llms" onClick={() => scrollTo('llms')}>   <span />llms.txt Spec</button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="main">
        {/* Topbar */}
        <div className="topbar">
          <div className="topbar-left">
            <span className="topbar-title">Design System Manifest</span>
            <span className="topbar-badge">v1.0.0</span>
          </div>
          <div className="topbar-actions">
            <button className="tb-btn tb-btn-brand" onClick={downloadMd}>
              Download DESIGN.md
            </button>
            <button className="tb-btn tb-btn-ghost" onClick={() => copyText(CLAUDE_PROMPT, 'Claude prompt copied!')}>
              Copy AI Prompt
            </button>
            <button className="tb-btn tb-btn-ghost" onClick={() => copyText(CURSOR_RULES, '.cursorrules copied!')}>
              Copy .cursorrules
            </button>
            <a className="tb-btn tb-btn-ghost" href="/llms.txt" target="_blank" rel="noopener">
              View llms.txt
            </a>
          </div>
        </div>

        <div className="content">

          {/* ── Overview ─────────────────────────────────────── */}
          <div className="intro" id="overview">
            <div className="eyebrow">Intro</div>
            <h1 className="intro-title">FunDS Rapid Prototyping Kit</h1>
            <p className="intro-desc">
              Use this lightweight subset of FunDS to spin up high-fidelity mobile and dashboard features without the overhead of the full library.
              It contains the essential tokens and core components needed for quick iterations.
            </p>
            <div className="meta-chips">
              <div className="meta-chip">name · <strong>FunDS Lite</strong></div>
              <div className="meta-chip">version · <strong>1.0.0</strong></div>
              <div className="meta-chip">updated · <strong>2026-04</strong></div>
              <div className="meta-chip">platform · <strong>AmarthaFin, NGMIS</strong></div>
            </div>
          </div>

          {/* ── Colors ───────────────────────────────────────── */}
          <div className="section" id="colors">
            <div className="eyebrow"><span className="eyebrow-num">01 ·</span>Foundations</div>
            {renderSectionHeader('colors', 'Colors', 'Hover a tile to see hex · click to copy')}
            {Object.entries(COLOR_SCALES).map(([name, scale]) => (
              <div className="color-row" key={name}>
                <span className="color-label">{name}</span>
                {scale.map(({ scale, hex }) => (
                  <div className="color-chip" key={`${name}-${scale}`}>
                    <div className="color-scale">{scale}</div>
                    <div
                      className="color-tile"
                      style={{ background: hex }}
                      data-hex={hex}
                      title={`${name} ${scale} · ${hex}`}
                      onClick={() => copyText(hex, `${hex} copied!`)}
                    />
                  </div>
                ))}
              </div>
            ))}
            <div className="comp-section" style={{ marginTop: 28, marginBottom: 0 }}>
              <div className="comp-label">Token reference</div>
              <div style={{ background: 'var(--neutral-white)', border: '1px solid var(--neutral-200)', borderRadius: 12, overflow: 'hidden' }}>
                <table className="tk-tbl">
                  <thead>
                    <tr><th>Category</th><th>Token</th><th>Value</th><th>Usage</th></tr>
                  </thead>
                  <tbody>
                    {TOKENS.map((t) => (
                      <tr key={t.key} onClick={() => copyText(t.hex, `${t.hex} copied!`)}>
                        <td style={{ fontSize: 12, color: 'var(--neutral-600)' }}>{t.cat}</td>
                        <td className="tk-key">{t.key}</td>
                        <td className="tk-val">
                          <span className="tk-swatch" style={{ background: t.hex }} />
                          {t.hex}
                        </td>
                        <td className="tk-desc">{t.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* ── Typography ───────────────────────────────────── */}
          <div className="section" id="typography">
            <div className="eyebrow"><span className="eyebrow-num">02 ·</span>Foundations</div>
            {renderSectionHeader('typography', 'Typography', <>Inter · weights <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--primary-50)', color: 'var(--primary-500)', padding: '2px 6px', borderRadius: 4 }}>500</code> and <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--primary-50)', color: 'var(--primary-500)', padding: '2px 6px', borderRadius: 4 }}>700</code> only</>)}
            <table className="type-tbl">
              <tbody>
                {TYPE_SCALE.map((t) => (
                  <tr key={t.cls}>
                    <td className="type-meta">
                      <span className="type-cls">{t.cls}</span>
                      <span className="type-spec-txt">{t.spec}</span>
                    </td>
                    <td>
                      <span style={{
                        fontSize: t.size,
                        fontWeight: t.weight,
                        letterSpacing: t.ls,
                        textTransform: t.uppercase ? 'uppercase' : 'none',
                      }}>
                        {t.sample}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="divider" />

          {/* ── Spacing & Sizing ─────────────────────────────── */}
          <div className="section" id="spacing">
            <div className="eyebrow"><span className="eyebrow-num">03 ·</span>Foundations</div>
            {renderSectionHeader('spacing', 'Spacing & Sizing', '4px base rhythm · click row to copy px value')}
            <div className="g2">
              <div>
                <div className="comp-label">Spacing scale</div>
                <div className="spacing-rows">
                  {SPACINGS.map((s) => (
                    <div className="sp-row" key={s.v} onClick={() => copyText(s.px, `${s.px} copied!`)}>
                      <div className="sp-label">space-{s.v}</div>
                      <div className="sp-bar-wrap">
                        <div className="sp-bar" style={{ width: Math.max(parseInt(s.px) || 0, 2) }} />
                      </div>
                      <div className="sp-class">p-{s.v} / m-{s.v}</div>
                      <div className="sp-rem">{s.r}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="comp-label">Border radius</div>
                <div className="radius-grid">
                  {RADII.map((r) => (
                    <div className="r-card" key={r.k} onClick={() => copyText(r.v === '∞' ? '9999px' : r.v, `${r.v} copied!`)}>
                      <div className="r-demo" style={{ borderRadius: r.v === '∞' ? '9999px' : r.v }} />
                      <div className="r-val">{r.v}</div>
                      <div className="r-cls">rounded-{r.k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="comp-section" style={{ marginTop: 28, marginBottom: 0 }}>
              <div className="comp-label">Layout patterns</div>
              <div style={{ background: 'var(--neutral-white)', border: '1px solid var(--neutral-200)', borderRadius: 12, overflow: 'hidden' }}>
                <table className="tk-tbl">
                  <thead>
                    <tr><th>Pattern</th><th>Token</th><th>Value</th><th>Usage</th></tr>
                  </thead>
                  <tbody>
                    {LAYOUT_PATTERNS.flatMap((group) =>
                      group.tokens.map((token) => (
                        <tr key={`${group.name}-${token.key}`} onClick={() => copyText(token.value, `${token.value} copied!`)}>
                          <td style={{ fontSize: 12, color: 'var(--neutral-600)' }}>{group.name}</td>
                          <td className="tk-key">{token.key}</td>
                          <td className="tk-val">{token.value}</td>
                          <td className="tk-desc">{token.note || 'Standard layout token'}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* ── Buttons ──────────────────────────────────────── */}
          <div className="section" id="buttons">
            <div className="eyebrow"><span className="eyebrow-num">04 ·</span>Components</div>
            {renderSectionHeader('buttons', 'Buttons', 'Trigger an action or event — four variants × five sizes')}
            <div className="comp-section">
              <div className="comp-label">Variants</div>
              <div className="comp-stage">
                <button className="ds-btn ds-btn-primary">Primary</button>
                <button className="ds-btn ds-btn-secondary">Secondary</button>
                <button className="ds-btn ds-btn-outline">Tertiary</button>
                <button className="ds-btn ds-btn-ghost">Ghost</button>
                <button className="ds-btn ds-btn-danger">Destructive</button>
              </div>
            </div>
            <div className="comp-section">
              <div className="comp-label">States</div>
              <div className="comp-stage">
                <button className="ds-btn ds-btn-primary">Primary</button>
                <button className="ds-btn ds-btn-primary" disabled>Disabled</button>
                <button className="ds-btn ds-btn-secondary">Secondary</button>
                <button className="ds-btn ds-btn-secondary" disabled>Disabled</button>
                <button className="ds-btn ds-btn-outline">Tertiary</button>
                <button className="ds-btn ds-btn-outline" disabled>Disabled</button>
                <button className="ds-btn ds-btn-ghost">Ghost</button>
                <button className="ds-btn ds-btn-ghost" disabled>Disabled</button>
              </div>
            </div>
            <div className="comp-section">
              <div className="comp-label">Sizes</div>
              <div className="comp-stage">
                <button className="ds-btn ds-btn-primary ds-btn-xs">XSmall</button>
                <button className="ds-btn ds-btn-primary ds-btn-sm">Small</button>
                <button className="ds-btn ds-btn-primary">Medium</button>
                <button className="ds-btn ds-btn-primary ds-btn-lg">Large</button>
                <button className="ds-btn ds-btn-primary ds-btn-xl">XLarge</button>
              </div>
            </div>
          </div>

          {/* ── Inputs ───────────────────────────────────────── */}
          <div className="section" id="inputs">
            <div className="eyebrow"><span className="eyebrow-num">05 ·</span>Components</div>
            {renderSectionHeader('inputs', 'Inputs', 'Text field guidance from the April 28, 2025 FunDS spec: sizes, states, metadata, affixes, icons, and tap-area variants')}
            <div className="comp-section">
              <div className="comp-label">Sizes</div>
              <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
                <label className="ds-field">
                  <span className="ds-field-label">Small</span>
                  <input className="ds-inp ds-inp-sm" placeholder="Placeholder" />
                </label>
                <label className="ds-field">
                  <span className="ds-field-label">Medium</span>
                  <input className="ds-inp" placeholder="Placeholder" />
                </label>
                <label className="ds-field">
                  <span className="ds-field-label">Large</span>
                  <input className="ds-inp ds-inp-lg" placeholder="Placeholder" />
                </label>
              </div>
            </div>
            <div className="g2">
              <div>
                <div className="comp-label">Core states</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
                  <label className="ds-field">
                    <span className="ds-field-label">Default</span>
                    <input className="ds-inp" placeholder="Placeholder" />
                  </label>
                  <label className="ds-field">
                    <span className="ds-field-label">Filled</span>
                    <input className="ds-inp" defaultValue="This is the input" readOnly />
                  </label>
                  <label className="ds-field">
                    <span className="ds-field-label">Typing</span>
                    <input className="ds-inp ds-inp-focus" defaultValue="Placeholder|" readOnly />
                  </label>
                </div>
              </div>
              <div>
                <div className="comp-label">Prefix, suffix, icons</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
                  <label className="ds-field">
                    <span className="ds-field-label">Prefix</span>
                    <div className="ds-inp-wrap">
                      <button className="ds-inp-prefix ds-inp-affix-btn" type="button">Rp</button>
                      <input className="ds-inp" placeholder="Type here" style={{ borderRadius: '0 8px 8px 0' }} />
                    </div>
                  </label>
                  <label className="ds-field">
                    <span className="ds-field-label">Suffix</span>
                    <div className="ds-inp-wrap">
                      <input className="ds-inp ds-inp-pre-suffix" defaultValue="This is the input" readOnly />
                      <span className="ds-inp-suffix">Gram</span>
                    </div>
                  </label>
                  <label className="ds-field">
                    <span className="ds-field-label">Right icon</span>
                    <div className="ds-inp-wrap">
                      <input className="ds-inp ds-inp-pre-suffix" defaultValue="••••••••••" readOnly />
                      <button className="ds-inp-suffix ds-inp-affix-btn" type="button" aria-label="Toggle visibility">◔</button>
                    </div>
                  </label>
                </div>
              </div>
              
              <div>
                <div className="comp-label">Additional info</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
                  <div className="ds-field">
                    <div className="ds-field-head">
                      <span className="ds-field-label">Label</span>
                      <span className="ds-field-meta">Optional</span>
                    </div>
                    <input className="ds-inp" placeholder="Placeholder" />
                  </div>
                  <div className="ds-field">
                    <div className="ds-field-head">
                      <span className="ds-field-label">Label <span className="ds-field-required">*</span></span>
                    </div>
                    <div className="ds-field-desc">Put the description here</div>
                    <input className="ds-inp" placeholder="Placeholder" />
                    <span className="ds-field-helper">You can put the helper here.</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="comp-label">Error &amp; disabled</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
                  <label className="ds-field">
                    <span className="ds-field-label">Error (default)</span>
                    <input className="ds-inp ds-inp-error" defaultValue="Placeholder" readOnly />
                    <span className="ds-field-helper ds-field-helper-error">You can put error message here.</span>
                  </label>
                  <label className="ds-field">
                    <span className="ds-field-label">Error (while typing)</span>
                    <input className="ds-inp ds-inp-error ds-inp-focus" defaultValue="Placeholder|" readOnly />
                    <span className="ds-field-helper ds-field-helper-error">You can put error message here.</span>
                  </label>
                  <label className="ds-field">
                    <span className="ds-field-label">Disabled</span>
                    <input className="ds-inp ds-inp-disabled" defaultValue="Placeholder" readOnly disabled />
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* ── Badges ───────────────────────────────────────── */}
          <div className="section" id="badges">
            <div className="eyebrow"><span className="eyebrow-num">06 ·</span>Components</div>
            {renderSectionHeader('badges', 'Badges', 'Status indicators and categorical labels')}
            <div className="comp-section">
              <div className="comp-label">Semantic colours</div>
              <div className="comp-stage">
                <span className="ds-badge ds-badge-primary">Active</span>
                <span className="ds-badge ds-badge-blue">Processing</span>
                <span className="ds-badge ds-badge-green">Funded</span>
                <span className="ds-badge ds-badge-orange">Pending</span>
                <span className="ds-badge ds-badge-red">Overdue</span>
                <span className="ds-badge ds-badge-yellow">Review</span>
                <span className="ds-badge ds-badge-neutral">Archived</span>
              </div>
            </div>
          </div>

          {/* ── Cards ────────────────────────────────────────── */}
          <div className="section" id="cards">
            <div className="eyebrow"><span className="eyebrow-num">07 ·</span>Components</div>
            {renderSectionHeader('cards', 'Cards', 'Surface container for grouped information')}
            <div className="g2">
              <div className="demo-card">
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Grassroots Growth Series</div>
                <div style={{ fontSize: 13, color: 'var(--neutral-600)', marginBottom: 16 }}>Series 3 · Balanced</div>
                <div className="stat-row">
                  <div className="stat"><div className="stat-label">AUM</div><div className="stat-val" style={{ color: 'var(--primary-500)' }}>Rp48M</div></div>
                  <div className="stat"><div className="stat-label">IRR</div><div className="stat-val" style={{ color: 'var(--green-600)' }}>18.4%</div></div>
                  <div className="stat"><div className="stat-label">LPs</div><div className="stat-val">24</div></div>
                </div>
              </div>
              <div className="demo-card" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>Capital Call</div>
                  <span className="ds-badge ds-badge-orange">Pending</span>
                </div>
                <div style={{ fontSize: 13, color: 'var(--neutral-600)' }}>
                  Q1 2026 distribution notice requires confirmation before May 1.
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <button className="ds-btn ds-btn-primary ds-btn-sm">Review</button>
                  <button className="ds-btn ds-btn-outline ds-btn-sm">Dismiss</button>
                </div>
              </div>
            </div>
          </div>

          <div className="divider" />

          {/* ── System Prompts ───────────────────────────────── */}
          <div className="section" id="prompts">
            <div className="eyebrow"><span className="eyebrow-num">08 ·</span>AI Tools</div>
            {renderSectionHeader('prompts', 'System Prompts', 'Copy into Claude or Cursor to enforce token compliance on every generation')}
            <div className="prompt-card">
              <div className="prompt-header">
                <span className="prompt-lbl">Claude · System Prompt</span>
                <button className="prompt-copy" onClick={() => copyText(CLAUDE_PROMPT, 'Claude prompt copied!')}>Copy</button>
              </div>
              <div className="prompt-body">{CLAUDE_PROMPT}</div>
            </div>
            <div className="prompt-card">
              <div className="prompt-header">
                <span className="prompt-lbl">Cursor · .cursorrules</span>
                <button className="prompt-copy" onClick={() => copyText(CURSOR_RULES, '.cursorrules copied!')}>Copy</button>
              </div>
              <div className="prompt-body">{CURSOR_RULES}</div>
            </div>
          </div>

          {/* ── llms.txt Spec ────────────────────────────────── */}
          <div className="section" id="llms">
            <div className="eyebrow"><span className="eyebrow-num">09 ·</span>AI Tools</div>
            {renderSectionHeader('llms', 'llms.txt Spec', 'Machine-readable endpoint — one fetch gives an LLM the complete system')}
            <div className="notice">
              <strong>AI Agents:</strong> Fetch <code>https://funds-lite.vercel.app/llms.txt</code> to get the full
              spec in one request. No HTML, no scripts — clean markdown covering all color tokens, spacing, typography
              rules, component usage, and do/don&apos;t guardrails.
            </div>
            <div className="llm-grid">
              {[
                ['Color Tokens', 'All hex + semantic meaning'],
                ['Typography', 'Font, weights, size scale'],
                ['Spacing System', '4px rhythm, valid values'],
                ['Component API', 'Props, variants, usage'],
                ['Do / Don\'t', 'Guardrails for AI gen'],
                ['Starter Prompts', 'For common UI patterns'],
              ].map(([title, desc]) => (
                <div className="llm-card" key={title}>
                  <div className="llm-card-title">{title}</div>
                  <div className="llm-card-desc">{desc}</div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>

      {/* Toast */}
      <div className="toast" ref={toastRef} />
    </>
  )
}
