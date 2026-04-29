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

export const DESIGN_MD = `---
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

Implementation: \`src/funds-lite/components/Button.tsx\`
Styles: \`src/funds-lite/components/styles.css\`
Use the React component API first: \`<Button variant="primary" size="md">Label</Button>\`.
Props: \`variant = primary | secondary | outline | ghost | danger\`; \`size = xs | sm | md | lg | xl\`; accepts native \`button\` props including \`disabled\`, \`type\`, and \`onClick\`.

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

Implementation: \`src/funds-lite/components/Input.tsx\`
Styles: \`src/funds-lite/components/styles.css\`
Use the React component API first: \`<Input label="Amount" prefix="Rp" placeholder="Type here" />\`.
Props: \`size = sm | md | lg\`; \`state = default | focus | valid | error\`; supports \`label\`, \`optionalText\`, \`required\`, \`description\`, \`helperText\`, \`prefix\`, \`suffix\`, \`prefixInteractive\`, \`suffixInteractive\`, \`prefixButtonProps\`, and \`suffixButtonProps\`.

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
