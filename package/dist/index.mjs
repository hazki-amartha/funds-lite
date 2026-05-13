// ../src/funds-lite/tokens.ts
var COLOR_SCALES = {
  Brand: [
    { scale: "50", hex: "#FEF3FF" },
    { scale: "200", hex: "#E5B8EF" },
    { scale: "300", hex: "#D68EE4" },
    { scale: "400", hex: "#A642B7" },
    { scale: "500", hex: "#853291" },
    { scale: "600", hex: "#732C7C" },
    { scale: "700", hex: "#612966" },
    { scale: "900", hex: "#3D1042" }
  ],
  Neutral: [
    { scale: "white", hex: "#FFFFFF" },
    { scale: "50", hex: "#F9FAF8" },
    { scale: "200", hex: "#E5E7EB" },
    { scale: "400", hex: "#C6CAD0" },
    { scale: "500", hex: "#8E95A3" },
    { scale: "600", hex: "#6B7280" },
    { scale: "700", hex: "#525C6A" },
    { scale: "900", hex: "#111928" }
  ],
  Blue: [
    { scale: "50", hex: "#EDF7FF" },
    { scale: "200", hex: "#BCE0F7" },
    { scale: "300", hex: "#70B7E5" },
    { scale: "500", hex: "#056DCE" },
    { scale: "600", hex: "#0457A5" },
    { scale: "700", hex: "#03417C" },
    { scale: "900", hex: "#022C52" }
  ],
  Green: [
    { scale: "50", hex: "#E4FCEF" },
    { scale: "200", hex: "#A2EDC3" },
    { scale: "300", hex: "#4BDB98" },
    { scale: "500", hex: "#009C6A" },
    { scale: "600", hex: "#007D55" },
    { scale: "700", hex: "#005E40" },
    { scale: "900", hex: "#003E2A" }
  ],
  Orange: [
    { scale: "50", hex: "#FDF4E9" },
    { scale: "200", hex: "#FCDDAB" },
    { scale: "300", hex: "#FABF77" },
    { scale: "500", hex: "#F7941D" },
    { scale: "600", hex: "#E0771B" },
    { scale: "700", hex: "#AD540A" },
    { scale: "900", hex: "#70320D" }
  ],
  Red: [
    { scale: "50", hex: "#FFF4F3" },
    { scale: "200", hex: "#FFD9D6" },
    { scale: "300", hex: "#F3726D" },
    { scale: "500", hex: "#D73630" },
    { scale: "600", hex: "#AC2B26" },
    { scale: "700", hex: "#81201D" },
    { scale: "900", hex: "#4C0C0A" }
  ],
  Yellow: [
    { scale: "50", hex: "#FFFED9" },
    { scale: "200", hex: "#FFF4A9" },
    { scale: "300", hex: "#FCE677" },
    { scale: "500", hex: "#EAB20B" },
    { scale: "600", hex: "#C69608" },
    { scale: "700", hex: "#996F03" },
    { scale: "900", hex: "#6A4103" }
  ]
};
var TYPE_SCALE = [
  { cls: "text-24", spec: "24px / 700 / \u22120.02em", size: "24px", weight: 700, ls: "-0.02em", sample: "Heading 24", uppercase: false },
  { cls: "text-20", spec: "20px / 700 / \u22120.01em", size: "20px", weight: 700, ls: "-0.01em", sample: "Heading 20", uppercase: false },
  { cls: "text-18", spec: "18px / 500 / 0", size: "18px", weight: 500, ls: "0", sample: "Body 18 \u2014 primary reading size for dashboards.", uppercase: false },
  { cls: "text-16", spec: "16px / 500 / 0", size: "16px", weight: 500, ls: "0", sample: "Body 16 \u2014 secondary paragraphs and descriptions.", uppercase: false },
  { cls: "text-14", spec: "14px / 500 / 0", size: "14px", weight: 500, ls: "0", sample: "Body 14 \u2014 compact data tables and labels.", uppercase: false },
  { cls: "text-12", spec: "12px / 500 / 0", size: "12px", weight: 500, ls: "0", sample: "Body 12 \u2014 caption and helper text.", uppercase: false },
  { cls: "text-10", spec: "10px / 500 / +0.06em", size: "10px", weight: 500, ls: "0.06em", sample: "OVERLINE / MICRO LABEL", uppercase: true }
];
var SPACINGS = [
  { v: "0", px: "0px", r: "0" },
  { v: "2", px: "2px", r: "0.125rem" },
  { v: "4", px: "4px", r: "0.25rem" },
  { v: "8", px: "8px", r: "0.5rem" },
  { v: "12", px: "12px", r: "0.75rem" },
  { v: "16", px: "16px", r: "1rem" },
  { v: "20", px: "20px", r: "1.25rem" },
  { v: "24", px: "24px", r: "1.5rem" },
  { v: "32", px: "32px", r: "2rem" },
  { v: "40", px: "40px", r: "2.5rem" },
  { v: "48", px: "48px", r: "3rem" }
];
var RADII = [
  { k: "none", v: "0px" },
  { k: "2", v: "2px" },
  { k: "4", v: "4px" },
  { k: "6", v: "6px" },
  { k: "8", v: "8px" },
  { k: "12", v: "12px" },
  { k: "16", v: "16px" },
  { k: "20", v: "20px" },
  { k: "24", v: "24px" },
  { k: "32", v: "32px" },
  { k: "40", v: "40px" },
  { k: "full", v: "\u221E" }
];
var LAYOUT_PATTERNS = [
  {
    name: "Mobile Screen",
    tokens: [
      { key: "page-padding-x", value: "16px", note: "horizontal edge margin for all screen content" },
      { key: "page-padding-top", value: "16px", note: "below topbar" },
      { key: "section-gap", value: "12px", note: "vertical gap between cards/sections" }
    ]
  },
  {
    name: "Card",
    tokens: [
      { key: "card-padding", value: "12px", note: "internal card padding (not 20px)" },
      { key: "card-gap", value: "8px", note: "gap between cards" }
    ]
  },
  {
    name: "Topbar",
    tokens: [
      { key: "topbar-height", value: "48px", note: "" },
      { key: "topbar-padding-x", value: "16px", note: "" }
    ]
  }
];
var TOKENS = [
  { cat: "Brand", key: "primary-500", hex: "#853291", desc: "Primary action \u2014 buttons, links, active states" },
  { cat: "Brand", key: "primary-600", hex: "#732C7C", desc: "Hover / pressed state" },
  { cat: "Brand", key: "primary-50", hex: "#FEF3FF", desc: "Tinted backgrounds, badge fills" },
  { cat: "Semantic", key: "text-default", hex: "#111928", desc: "neutral-900 \u2014 primary readable text" },
  { cat: "Semantic", key: "text-caption", hex: "#6B7280", desc: "neutral-600 \u2014 secondary / supporting text" },
  { cat: "Semantic", key: "text-disabled", hex: "#8E95A3", desc: "neutral-500 \u2014 disabled labels" },
  { cat: "Semantic", key: "text-placeholder", hex: "#C6CAD0", desc: "neutral-400 \u2014 input placeholder text" },
  { cat: "Semantic", key: "text-link", hex: "#853291", desc: "primary-500 \u2014 clickable links" },
  { cat: "Border", key: "border-default", hex: "#E5E7EB", desc: "neutral-200 \u2014 card and input borders" },
  { cat: "Border", key: "border-light", hex: "#F9FAF8", desc: "neutral-50 \u2014 subtle dividers" },
  { cat: "Status", key: "blue-500", hex: "#056DCE", desc: "Informational states" },
  { cat: "Status", key: "green-500", hex: "#009C6A", desc: "Success / funded states" },
  { cat: "Status", key: "orange-500", hex: "#F7941D", desc: "Warning / pending states" },
  { cat: "Status", key: "red-500", hex: "#D73630", desc: "Error / overdue / danger states" }
];
var NAV_SECTIONS = [
  "overview",
  "colors",
  "typography",
  "spacing",
  "buttons",
  "inputs",
  "badges",
  "cards",
  "toggles",
  "selectable-cards",
  "modals",
  "bottom-sheets",
  "navigation-bars",
  "navigation-headers",
  "prompts",
  "llms"
];

// ../src/funds-lite/specs.ts
var CLAUDE_PROMPT = `You are building UI for Amartha Financial (https://amartha.com/), a micro-finance lending company focused on productive micro loans for grassroot women in Indonesia, using the FunDS Lite design system.
Read the full spec: https://funds-lite.vercel.app/llms.txt

AMARTHA PRODUCT CONTEXT:

  Products:    Modal (digital loan) \xB7 Celengan (retail investment, grassroot)
               GGS (retail investment, middle-upper) \xB7 B2B Funding (institutional)
               PPOB / AmarthaLink (bill payment & agent PPOB) \xB7 Poket (in-app wallet)
  Platforms:   AmarthaFin App (consumer iOS/Android) \xB7 NG-MIS (internal ops/CRM)
               A-Partner App (field agents)

LOCKED TOKENS \u2014 never use any other values:

  primary:     #853291  (hover: #732C7C, tint: #FEF3FF)
  text:        #111928  (caption: #6B7280, disabled: #8E95A3)
  border:      #E5E7EB
  font:        Inter \u2014 weights 500 and 700 ONLY
  spacing:     0 2 4 8 12 16 20 24 32 40 48 (px)
  radius:      9999px buttons (pill) \xB7 12px cards \xB7 8px inputs \xB7 6px sm
  status:      blue #056DCE \xB7 green #009C6A \xB7 orange #F7941D \xB7 red #D73630
  layout:      mobile px 16 \xB7 topbar 48h/16x \xB7 sections 12 \xB7 cards 12p/8g

Do not use arbitrary Tailwind values (e.g. w-[437px]).
Do not invent hex values outside this token set.
Do not use font-weight 400, 600, or 800.`;
var CURSOR_RULES = `# FunDS Lite \xB7 .cursorrules
# Generated from tailwind.config.ts \u2014 do not edit manually

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
font-only     = Inter only, no other Google Fonts`;
var DESIGN_MD = `# FunDS Lite \u2014 Design System Specification
> Purple fintech precision \u2014 a single brand purple anchoring every action across consumer mobile and internal dashboard.

**Version:** 1.0.0 \xB7 **Updated:** 2026-04 \xB7 **Platforms:** AmarthaFin App, NG-MIS

FunDS Lite is the lightweight subset of the Amartha FunDS design system. The brand anchors in a single purple (#853291) \u2014 every primary action, link, and active state uses this color. Status colors are always paired with their 50-tint backgrounds. Inter is the only permitted typeface at weights 500 and 700.

## Product Context

**Company:** Amartha Financial (https://amartha.com/) \u2014 micro-finance lending focused on productive micro loans for grassroot women in Indonesia.

**Products:**
- Modal \u2014 Digital productive loan (primary borrower product)
- Group Loan \u2014 Non-digital group loan (deprecated; migrating to Modal)
- Celengan \u2014 Retail investment, grassroot market
- GGS (Grassroot Growth Series) \u2014 Retail investment, middle-upper class
- B2B Funding \u2014 Institutional funding (not in AmarthaFin App)
- PPOB / AmarthaLink \u2014 B2C bill payment & agent-based PPOB
- Poket \u2014 In-app wallet for Amartha ecosystem

**Platforms:**
- AmarthaFin App \u2014 Consumer iOS/Android (borrowers, investors, PPOB users)
- NG-MIS \u2014 Internal ops system / potential CRM
- A-Partner App \u2014 Internal app for field partners/agents

---

## Tokens \u2014 Colors

### Brand (Primary Purple)

| Name | Value | Token | Role |
|------|-------|-------|------|
| Primary 50 | \`#FEF3FF\` | \`--primary-50\` | Badge fills, focus rings, ghost hover backgrounds |
| Primary 200 | \`#E5B8EF\` | \`--primary-200\` | Focus ring outer glow |
| Primary 300 | \`#D68EE4\` | \`--primary-300\` | Illustrative / decorative |
| Primary 400 | \`#A642B7\` | \`--primary-400\` | Secondary decorative actions |
| Primary 500 | \`#853291\` | \`--primary-500\` | PRIMARY \u2014 buttons, links, active states |
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

Use these names in component code \u2014 prefer over raw hex.

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

## Tokens \u2014 Typography

**Font family:** Inter (Google Fonts) \xB7 \`--font\`
**Weights:** 500 (body) and 700 (headings/buttons) \u2014 no other weights permitted.

### Type Scale

| Class | Size | Weight | Letter Spacing | Role |
|-------|------|--------|----------------|------|
| \`text-24\` | 24px | 700 | \u22120.02em | Page titles / primary headings |
| \`text-20\` | 20px | 700 | \u22120.01em | Section headings |
| \`text-18\` | 18px | 500 | 0 | Primary reading size (dashboards) |
| \`text-16\` | 16px | 500 | 0 | Secondary paragraphs and descriptions |
| \`text-14\` | 14px | 500 | 0 | Compact data tables and labels |
| \`text-12\` | 12px | 500 | 0 | Body / caption / helper text |
| \`text-10\` | 10px | 500 | +0.06em | Overline / micro (UPPERCASE only) |

---

## Tokens \u2014 Spacing & Shapes

**Base unit:** 4px \xB7 **Density:** compact

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

**Forbidden:** 5, 6, 10, 15, 25, 30px \u2014 never use values not in the scale above.

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
| Topbar | \`topbar-height\` | 48px | \u2014 |
| Topbar | \`topbar-padding-x\` | 16px | \u2014 |

---

## Surfaces

| Level | Name | Value | Purpose |
|-------|------|-------|---------|
| 0 | Page Background | \`#F9FAF8\` (\`--neutral-50\`) | Primary page / screen background |
| 1 | Surface / Card | \`#FFFFFF\` (\`--neutral-white\`) | Card and modal backgrounds |
| \u2014 | Brand Tint | \`#FEF3FF\` (\`--primary-50\`) | Badge fills, ghost hover, focus rings |
| \u2014 | Overlay | \`rgba(17, 25, 40, 0.8)\` | Modal / drawer overlays |

---

## Components

### Button
**Role:** Trigger an action or event

Shape: pill (9999px). Font weight: 700. The pill is the only permitted button shape \u2014 never rectangular or lightly rounded.

Implementation: \`src/funds-lite/components/Button.tsx\`
Styles: \`src/funds-lite/components/styles.css\`
React API: \`<Button variant="primary" size="md">Label</Button>\`
Props: \`variant = primary | secondary | outline | ghost | danger\` \xB7 \`size = xs | sm | md | lg | xl\` \xB7 accepts native \`button\` props including \`disabled\`, \`type\`, \`onClick\`.

| Variant | Background | Border | Text | Hover |
|---------|------------|--------|------|-------|
| primary | \`--primary-500\` + gradient | white 16% | white | \`--primary-600\` |
| secondary | white | \`--primary-500\` | \`--primary-500\` | \`--primary-50\` tint |
| outline | white | \`--neutral-200\` | \`--neutral-900\` | \`--neutral-400\` border |
| ghost | transparent | transparent | \`--primary-500\` | \`--primary-50\` bg |
| danger | \`--red-500\` | \`--red-500\` | white | \`--red-600\` |

Sizes: \`xs\` (12px / 4px 8px) \xB7 \`sm\` (12px / 8px 10px) \xB7 \`md\` (14px / 8px 12px) \xB7 \`lg\` (16px / 12px 16px) \xB7 \`xl\` (16px / 12px 20px)

Disabled: \`--neutral-200\` bg, \`--neutral-500\` text, no shadow, \`cursor: not-allowed\`.
Focus ring: 2px white + 4px \`--primary-200\` (#E5B8EF) outline.

### Input
**Role:** Text field, select, textarea

Radius 8px. Border: \`--neutral-200\`. On focus: border shifts to \`--primary-500\` + 3px \`--primary-50\` ring.

Implementation: \`src/funds-lite/components/Input.tsx\`
Styles: \`src/funds-lite/components/styles.css\`
React API: \`<Input label="Amount" prefix="Rp" placeholder="Type here" />\`
Props: \`size = sm | md | lg\` \xB7 \`state = default | focus | valid | error\` \xB7 supports \`label\`, \`optionalText\`, \`required\`, \`description\`, \`helperText\`, \`prefix\`, \`suffix\`, \`prefixInteractive\`, \`suffixInteractive\`, \`prefixButtonProps\`, \`suffixButtonProps\`.

| State | Border | Ring |
|-------|--------|------|
| default | \`--neutral-200\` | \u2014 |
| focus | \`--primary-500\` | \`--primary-50\` 3px |
| valid | \`--green-500\` | \u2014 |
| error | \`--red-500\` | \`--red-50\` 3px |
| disabled | \`--neutral-200\` | \u2014 |

Sizes: sm \xB7 md \xB7 lg
Conditions: empty \xB7 filled
Additional info: label, required, optionalText, helperText, description
Supports prefix and suffix (clickable via \`prefixInteractive\`/\`suffixInteractive\` + \`prefixButtonProps\`/\`suffixButtonProps\`)
Icons: left or right when meaningful or actionable
Variants: text input \xB7 select \xB7 textarea \xB7 tap area

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

### Toggle
**Role:** Binary on/off switch for a setting

Shape: pill track + circular thumb. On state shows check icon and \`--primary-500\` track.

Implementation: \`src/funds-lite/components/Toggle.tsx\`
React API: \`<Toggle size="sm" label="Remember me" helperText="Save my login details for next time." defaultChecked />\`
Props: \`size = sm | md\` \xB7 \`label\` \xB7 \`helperText\` \xB7 accepts native checkbox props (\`checked\`, \`defaultChecked\`, \`disabled\`, \`onChange\`).

| State | Track bg | Thumb |
|-------|----------|-------|
| off | \`--neutral-400\` | \`--neutral-white\` |
| on | \`--primary-500\` | \`--neutral-white\` + check |
| disabled (off) | \`--neutral-200\` | \`--neutral-50\` |
| disabled (on) | \`--neutral-200\` | \`--neutral-50\` + dim check |

Sizes: sm (32\xD720 track / 16\xD716 thumb) \xB7 md (44\xD724 track / 20\xD720 thumb)
Focus ring: 2px white + 4px \`--primary-200\` around track.

### Selectable Card
**Role:** Card-shaped radio / checkbox \u2014 selection via tapping the whole card

Radius 8px. Border: 1px solid \`--neutral-200\`. Active state shifts border to \`--primary-500\` and background to \`--primary-50\`. Indicator (16px radio dot) sits on the right.

Implementation: \`src/funds-lite/components/SelectableCard.tsx\`
React API: \`<SelectableCard title="..." description="..." inputType="radio" name="plan" />\`
Props: \`size = sm | md\` \xB7 \`title\` \xB7 \`description\` \xB7 \`prefixIcon\` \xB7 \`secondary\` (right-aligned double content) \xB7 \`slot\` (swappable inline component) \xB7 \`ribbon\` \xB7 \`inputType = radio | checkbox\` \xB7 accepts native input props.

| State | Border | Background | Indicator |
|-------|--------|------------|-----------|
| enabled | \`--neutral-200\` | white | empty circle |
| active | \`--primary-500\` | \`--primary-50\` | primary dot |
| disabled | \`--neutral-200\` | \`--neutral-50\` | dim circle |

Variants: with double content (secondary right-aligned) \xB7 with prefix icon (32px primary-50 circle) \xB7 with component slot (use \`slot\` prop) \xB7 promo card (combine with badge/ribbon).
Use the ribbon prop for "Paling Untung"-style overlays.

### Modal
**Role:** Temporary dialog window on top of the main content

Surface: white card, 12px radius, 16px padding, anchored center over \`rgba(17, 25, 40, 0.8)\` overlay. Has only one visual state \u2014 open or closed.

Implementation: \`src/funds-lite/components/Modal.tsx\`
React API: \`<Modal open={open} onClose={...} title="Title" description="..." primaryAction={<Button>CTA</Button>} secondaryAction={<Button variant="ghost">Cancel</Button>} />\`
Props: \`open\` \xB7 \`onClose\` \xB7 \`size = sm | md | lg\` \xB7 \`variant = default | dialog\` \xB7 \`intent = success | warning | error | info\` (dialog only) \xB7 \`title\` \xB7 \`description\` \xB7 \`slot\` (swappable content above description) \xB7 \`primaryAction\` \xB7 \`secondaryAction\` \xB7 \`hideClose\`.

| Variant | Notes |
|---------|-------|
| default | General content with title + body + optional swappable slot |
| dialog | Predefined content with intent icon (success / warning / error / info) |

Sizes: sm 320px \xB7 md 400px (default) \xB7 lg 560px. Closing supports Escape key and overlay click.

### Bottom Sheet
**Role:** Mobile sheet that slides up from the bottom

Surface: white sheet anchored to bottom, 12px top radius, 16px padding. Always includes a grip handle. Closes on Escape or overlay tap.

Implementation: \`src/funds-lite/components/BottomSheet.tsx\`
React API: \`<BottomSheet open={open} onClose={...} title="Title" description="..." slot={<Component />} primaryAction={<Button>Lanjutkan</Button>} secondaryAction={<Button variant="outline">Tutup</Button>} />\`
Props: \`open\` \xB7 \`onClose\` \xB7 \`size = sm | md | fullscreen\` \xB7 \`title\` \xB7 \`description\` \xB7 \`slot\` (swappable visual block) \xB7 \`slotPosition = above | below\` \xB7 \`primaryAction\` \xB7 \`secondaryAction\` \xB7 \`hideClose\`.

Sizes: sm \u2014 default mobile width 420px (use this 95% of the time) \xB7 md \u2014 responsive 560px \xB7 fullscreen \u2014 full viewport height with flat top.
Five predefined variants in spec map to slot-above + slot-below + text-only + title-only + description-only combinations.

### Navigation Bar
**Role:** Bottom tab bar for primary app navigation

Surface: white background, 1px top border (\`--neutral-200\`). Equal-width tabs in a row, icon + 10px uppercase-equivalent label.

Implementation: \`src/funds-lite/components/NavigationBar.tsx\`
React API: \`<NavigationBar items={[{ id, label, icon, active, badge, feature, onClick }]} />\`
Props: each item supports \`active\` (primary-500 color, weight 700 label), \`badge\` (red dot or count over icon), \`feature\` (40px primary-500 lifted circle \u2014 use for center action like Scan).

| State | Color | Label weight |
|-------|-------|--------------|
| enabled | \`--neutral-600\` | 500 |
| active | \`--primary-500\` | 700 |

Badge: red-500 bg with white text and 2px white border ring around icon corner.

### Navigation Header
**Role:** Top app bar \u2014 back, title, optional trailing icons or CTA link

Height: 48px. Padding: 16px horizontal. White surface with neutral-200 bottom border; dark variant uses neutral-900 with white text.

Implementation: \`src/funds-lite/components/NavigationHeader.tsx\`
React API: \`<NavigationHeader title="Title here" onBack={...} trailingIcons={[icon1, icon2]} link="Bantuan" onLinkClick={...} />\`
Props: \`title\` \xB7 \`variant = light | dark\` \xB7 \`onBack\` \xB7 \`hideBack\` \xB7 \`trailingIcons\` (max 2) \xB7 \`link\` \xB7 \`onLinkClick\` \xB7 \`showStatusBar\` (renders iOS-style status bar above header for mocks).

| Variant | Bg | Text | Border |
|---------|----|------|--------|
| light | \`--neutral-white\` | \`--neutral-900\` | \`--neutral-200\` bottom |
| dark | \`--neutral-900\` | \`--neutral-white\` | none |

States: one state only \u2014 no hover. Trailing slot accepts up to 2 icons OR a link button (text-14 weight 700, \`--primary-500\` light / \`--primary-300\` dark).

---

## Do's and Don'ts

### Do
- Use \`--primary-500\` (#853291) for every primary action button, active state, and link \u2014 it is the single brand action color.
- Pair every status color with its 50-tint background (e.g. \`--red-500\` text on \`--red-50\` bg).
- Use Inter at weight 500 or 700 only. No exceptions.
- Keep spacing values within the 4px scale: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48px.
- Use semantic alias names (\`text-default\`, \`border-default\`) over raw hex in component code.
- Use pill radius (9999px) for buttons and badges, 8px for inputs, 12px for cards \u2014 always.

### Don't
- Don't use arbitrary Tailwind values like \`w-[437px]\` or \`text-[#abc]\` \u2014 ever.
- Don't invent hex values not in this token set.
- Don't use font-weight 400, 600, or 800 \u2014 only 500 and 700.
- Don't use spacing values outside the scale (e.g. 5px, 10px, 15px, 25px).
- Don't use any Google Font other than Inter.
- Don't use purple tones from generic Tailwind palettes \u2014 only \`--primary-*\` tokens.
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

4. **Amount Input with Prefix:** \`<Input label="Amount" prefix="Rp" prefixInteractive prefixButtonProps={{ 'aria-label': 'Choose currency' }} placeholder="0" />\` \u2014 radius 8px, border \`--neutral-200\`, focus ring \`--primary-500\` + \`--primary-50\`.

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
`;
var SECTION_SPECS = {
  colors: `## Colors

Brand:
${COLOR_SCALES.Brand.map(({ scale, hex }) => `- ${scale}: ${hex}`).join("\n")}

Neutral:
${COLOR_SCALES.Neutral.map(({ scale, hex }) => `- ${scale}: ${hex}`).join("\n")}

Blue:
${COLOR_SCALES.Blue.map(({ scale, hex }) => `- ${scale}: ${hex}`).join("\n")}

Green:
${COLOR_SCALES.Green.map(({ scale, hex }) => `- ${scale}: ${hex}`).join("\n")}

Orange:
${COLOR_SCALES.Orange.map(({ scale, hex }) => `- ${scale}: ${hex}`).join("\n")}

Red:
${COLOR_SCALES.Red.map(({ scale, hex }) => `- ${scale}: ${hex}`).join("\n")}

Yellow:
${COLOR_SCALES.Yellow.map(({ scale, hex }) => `- ${scale}: ${hex}`).join("\n")}

Token Reference:
${TOKENS.map((t) => `- ${t.key}: ${t.hex} \u2014 ${t.desc}`).join("\n")}`,
  typography: `## Typography

${TYPE_SCALE.map((t) => `- ${t.cls}: ${t.spec} -> ${t.sample}`).join("\n")}

Rules:
- Font family: Inter
- Allowed weights: 500, 700 only
- text-12 is body/caption in normal case
- text-10 is uppercase micro/overline`,
  spacing: `## Spacing & Sizing

Spacing scale:
${SPACINGS.map((s) => `- space-${s.v}: ${s.px} (${s.r})`).join("\n")}

Border radius:
${RADII.map((r) => `- rounded-${r.k}: ${r.v === "\u221E" ? "9999px" : r.v}`).join("\n")}

Layout Patterns:
${LAYOUT_PATTERNS.map((group) => `${group.name}:
${group.tokens.map((token) => `- ${token.key}: ${token.value}${token.note ? ` \u2014 ${token.note}` : ""}`).join("\n")}`).join("\n\n")}`,
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

- Implementation: src/funds-lite/components/Badge.tsx
- Styles: src/funds-lite/components/styles.css (+ base classes in app/globals.css)
- React API: <Badge intent="primary" variant="subtle" size="sm">Label</Badge>
- Shape: pill (9999px)
- Padding: sm 3px 10px \xB7 md 4px 12px
- Font: sm 12px / 500 \xB7 md 13px / 500
- Intent: primary, blue, green, orange, red, yellow, neutral
- Variant: subtle (default, tinted bg) \xB7 solid (saturated bg, white text) \xB7 outline (white bg, colored border+text) \xB7 inverted (white bg, primary-500 border+text)
- Size: sm (default), md
- Icon slots: leadingIcon, trailingIcon, dot
- Use Inverted for emphasis on filled/colored backgrounds`,
  cards: `## Cards

- Radius: 12px
- Border: 1px solid #E5E7EB
- Background: #FFFFFF
- Padding: 12px
- Use cards to group related information
- Never nest cards`,
  toggles: `## Toggles

- Implementation: src/funds-lite/components/Toggle.tsx
- Styles: src/funds-lite/components/styles.css
- React API: <Toggle size="sm" label="Remember me" helperText="Save my login details for next time." defaultChecked />
- Shape: pill track (9999px) with circular thumb
- Sizes: sm (default) \u2014 32x20 track \xB7 md \u2014 44x24 track
- States: off \xB7 on (shows check icon, primary-500 bg) \xB7 disabled
- Variants: default (track only) \xB7 with label \xB7 with label + help text
- Focus ring: 2px white + 4px primary-200 on track`,
  "selectable-cards": `## Selectable Cards

- Implementation: src/funds-lite/components/SelectableCard.tsx
- Styles: src/funds-lite/components/styles.css
- React API: <SelectableCard title="This is the card title" description="Enter description here, max. 2 lines" inputType="radio" name="plan" />
- Shape: rectangular card (8px radius)
- Border: 1px var(--neutral-200), active 1px var(--primary-500) with primary-50 bg
- Padding: sm 12px \xB7 md 16px
- States: enabled \xB7 active \xB7 disabled (plus -hover variants)
- Title: 14px / 700 / neutral-900
- Description: 12px / 500 / neutral-600
- Variants: with double content (secondary slot, right-aligned) \xB7 with prefix icon \xB7 with component slot \xB7 promo card
- Combine with ribbon for highlights (use props.ribbon)
- Indicator: 16x16 radio dot on right (or use inputType="checkbox")`,
  modals: `## Modals

- Implementation: src/funds-lite/components/Modal.tsx
- Styles: src/funds-lite/components/styles.css
- React API: <Modal open={open} onClose={...} title="Title" description="..." primaryAction={<Button>CTA</Button>} />
- Overlay: rgba(17, 25, 40, 0.8)
- Modal: white bg, 12px radius, 16px padding
- Sizes: sm 320px \xB7 md 400px (default) \xB7 lg 560px
- Variants: default (general content) \xB7 dialog (predefined content, supports intent icon)
- Dialog intents: success \xB7 warning \xB7 error \xB7 info (green / orange / red / blue 500 icon)
- States: 1 state only \u2014 no hover or interaction beyond open/close
- Close: top-right X (use hideClose to omit)
- Actions: bottom row, right-aligned; secondaryAction renders first`,
  "bottom-sheets": `## Bottom Sheets

- Implementation: src/funds-lite/components/BottomSheet.tsx
- Styles: src/funds-lite/components/styles.css
- React API: <BottomSheet open={open} onClose={...} title="Title" description="..." slot={<Slot />} primaryAction={...} secondaryAction={...} />
- Overlay: rgba(17, 25, 40, 0.8) \xB7 anchored bottom
- Sheet: white bg, 12px top radius, 16px padding
- Sizes: sm (default, mobile-width 420px) \xB7 md (responsive 560px) \xB7 fullscreen (height 100vh, flat top radius)
- Variants: 5 predefined slot layouts (slot above/below/inline + with-or-without title/description)
- Always include grip indicator (top center handle)
- Close button: top-left X (use hideClose to omit)
- Actions: row at bottom, equal-width buttons`,
  "navigation-bars": `## Navigation Bars

- Implementation: src/funds-lite/components/NavigationBar.tsx
- Styles: src/funds-lite/components/styles.css
- React API: <NavigationBar items={[{ id, label, icon, active, badge, feature, onClick }]} />
- Surface: bottom tab bar \u2014 white bg, 1px top border (--neutral-200)
- Layout: equal-width tabs, column flex (icon + label), 8px padding
- States: enabled (--neutral-600) \xB7 active (--primary-500, label 700)
- Tab icon: 24x24 \xB7 Label: text-10 weight 500 (700 when active)
- Feature tab: 40x40 primary-500 circle, lifted (-16px margin-top) \u2014 use for center actions like Scan
- Badge support: numerical badge on icon (red-500 bg, white text, neutral-white border)`,
  "navigation-headers": `## Navigation Headers

- Implementation: src/funds-lite/components/NavigationHeader.tsx
- Styles: src/funds-lite/components/styles.css
- React API: <NavigationHeader title="Title here" onBack={...} trailingIcons={[...]} link="Bantuan" onLinkClick={...} />
- Surface: top app bar \u2014 48px height, 16px horizontal padding
- Variants: light (white bg, neutral-200 bottom border) \xB7 dark (neutral-900 bg, white text)
- Layout: back arrow (24x24) + title (text-16 / 700) + trailing slot
- Trailing slot: up to 2 icons (24x24) or a link button (text-14 / 700, primary-500)
- Optional status bar row (9:41 + signal/wifi/battery) above header for mobile mocks via showStatusBar
- States: 1 state \u2014 no hover interaction`,
  prompts: `## System Prompts

Claude System Prompt:
${CLAUDE_PROMPT}

---

Cursor .cursorrules:
${CURSOR_RULES}`,
  llms: `## llms.txt Spec

- Endpoint: https://funds-lite.vercel.app/llms.txt
- Purpose: machine-readable complete design system spec
- Includes: color tokens, typography, spacing, components, and guardrails`
};

// ../src/funds-lite/components/Button.tsx
var sizeClass = {
  xs: "ds-btn-xs",
  sm: "ds-btn-sm",
  md: "",
  lg: "ds-btn-lg",
  xl: "ds-btn-xl"
};
function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  children,
  ...props
}) {
  const classes = [
    "ds-btn",
    `ds-btn-${variant}`,
    sizeClass[size],
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("button", { className: classes, type, ...props }, children);
}

// ../src/funds-lite/components/Input.tsx
var sizeClass2 = {
  sm: "ds-inp-sm",
  md: "",
  lg: "ds-inp-lg"
};
var stateClass = {
  default: "",
  focus: "ds-inp-focus",
  valid: "ds-inp-valid",
  error: "ds-inp-error"
};
function renderAffix(content, position, interactive, buttonProps) {
  const className = `ds-inp-${position}${interactive ? " ds-inp-affix-btn" : ""}`;
  if (interactive) {
    return /* @__PURE__ */ React.createElement("button", { className, type: "button", ...buttonProps }, content);
  }
  return /* @__PURE__ */ React.createElement("span", { className }, content);
}
function Input({
  size = "md",
  state = "default",
  label,
  optionalText,
  required,
  description,
  helperText,
  prefix,
  suffix,
  prefixInteractive,
  suffixInteractive,
  prefixButtonProps,
  suffixButtonProps,
  className,
  disabled,
  ...props
}) {
  const inputClasses = [
    "ds-inp",
    sizeClass2[size],
    stateClass[state],
    disabled ? "ds-inp-disabled" : "",
    suffix ? "ds-inp-pre-suffix" : "",
    className
  ].filter(Boolean).join(" ");
  const input = /* @__PURE__ */ React.createElement(
    "input",
    {
      ...props,
      "aria-invalid": state === "error" ? true : props["aria-invalid"],
      className: inputClasses,
      disabled
    }
  );
  const control = prefix || suffix ? /* @__PURE__ */ React.createElement("div", { className: "ds-inp-wrap" }, prefix ? renderAffix(prefix, "prefix", prefixInteractive, prefixButtonProps) : null, input, suffix ? renderAffix(suffix, "suffix", suffixInteractive, suffixButtonProps) : null) : input;
  const hasFieldChrome = label || optionalText || description || helperText;
  if (!hasFieldChrome) return control;
  return /* @__PURE__ */ React.createElement("label", { className: "ds-field" }, label || optionalText ? /* @__PURE__ */ React.createElement("div", { className: "ds-field-head" }, label ? /* @__PURE__ */ React.createElement("span", { className: "ds-field-label" }, label, required ? /* @__PURE__ */ React.createElement("span", { className: "ds-field-required" }, " *") : null) : null, optionalText ? /* @__PURE__ */ React.createElement("span", { className: "ds-field-meta" }, optionalText) : null) : null, description ? /* @__PURE__ */ React.createElement("span", { className: "ds-field-desc" }, description) : null, control, helperText ? /* @__PURE__ */ React.createElement("span", { className: `ds-field-helper${state === "error" ? " ds-field-helper-error" : ""}` }, helperText) : null);
}

// ../src/funds-lite/components/Badge.tsx
var sizeClass3 = {
  sm: "",
  md: "ds-badge-md"
};
var variantClass = {
  solid: "ds-badge-solid",
  subtle: "",
  outline: "ds-badge-outline",
  inverted: "ds-badge-inverted"
};
function Badge({
  intent = "primary",
  variant = "subtle",
  size = "sm",
  dot,
  leadingIcon,
  trailingIcon,
  className,
  children,
  ...props
}) {
  const classes = [
    "ds-badge",
    `ds-badge-${intent}`,
    variantClass[variant],
    sizeClass3[size],
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("span", { className: classes, ...props }, dot ? /* @__PURE__ */ React.createElement("span", { className: "ds-badge-dot", "aria-hidden": true }) : null, leadingIcon ? /* @__PURE__ */ React.createElement("span", { className: "ds-badge-icon", "aria-hidden": true }, leadingIcon) : null, children, trailingIcon ? /* @__PURE__ */ React.createElement("span", { className: "ds-badge-icon", "aria-hidden": true }, trailingIcon) : null);
}

// ../src/funds-lite/components/Toggle.tsx
import { useId } from "react";
var sizeClass4 = {
  sm: "",
  md: "ds-toggle-md"
};
function Toggle({
  size = "sm",
  label,
  helperText,
  id,
  className,
  disabled,
  checked,
  defaultChecked,
  ...props
}) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const switchClasses = ["ds-toggle", sizeClass4[size], className].filter(Boolean).join(" ");
  const control = /* @__PURE__ */ React.createElement("span", { className: switchClasses }, /* @__PURE__ */ React.createElement(
    "input",
    {
      ...props,
      id: inputId,
      type: "checkbox",
      className: "ds-toggle-input",
      disabled,
      checked,
      defaultChecked
    }
  ), /* @__PURE__ */ React.createElement("span", { className: "ds-toggle-track", "aria-hidden": true }, /* @__PURE__ */ React.createElement("span", { className: "ds-toggle-thumb" }, /* @__PURE__ */ React.createElement("svg", { className: "ds-toggle-check", viewBox: "0 0 12 12", "aria-hidden": true }, /* @__PURE__ */ React.createElement("path", { d: "M2.5 6.2l2.4 2.3 4.6-4.8", fill: "none", stroke: "currentColor", strokeWidth: "1.6", strokeLinecap: "round", strokeLinejoin: "round" })))));
  if (!label && !helperText) return control;
  return /* @__PURE__ */ React.createElement("label", { htmlFor: inputId, className: `ds-toggle-field${disabled ? " ds-toggle-field-disabled" : ""}` }, control, label || helperText ? /* @__PURE__ */ React.createElement("span", { className: "ds-toggle-text" }, label ? /* @__PURE__ */ React.createElement("span", { className: "ds-toggle-label" }, label) : null, helperText ? /* @__PURE__ */ React.createElement("span", { className: "ds-toggle-helper" }, helperText) : null) : null);
}

// ../src/funds-lite/components/SelectableCard.tsx
import { useId as useId2 } from "react";
var sizeClass5 = {
  sm: "",
  md: "ds-selcard-md"
};
function SelectableCard({
  size = "sm",
  title,
  description,
  prefixIcon,
  secondary,
  slot,
  ribbon,
  inputType = "radio",
  id,
  name,
  className,
  disabled,
  checked,
  defaultChecked,
  children,
  ...props
}) {
  const autoId = useId2();
  const inputId = id ?? autoId;
  const classes = [
    "ds-selcard",
    sizeClass5[size],
    disabled ? "ds-selcard-disabled" : "",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("label", { htmlFor: inputId, className: classes }, ribbon ? /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-ribbon" }, ribbon) : null, /* @__PURE__ */ React.createElement(
    "input",
    {
      ...props,
      id: inputId,
      name,
      type: inputType,
      className: "ds-selcard-input",
      disabled,
      checked,
      defaultChecked
    }
  ), prefixIcon ? /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-prefix", "aria-hidden": true }, prefixIcon) : null, /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-body" }, secondary ? /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-row" }, /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-title" }, title), /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-secondary" }, secondary)) : /* @__PURE__ */ React.createElement(React.Fragment, null, title ? /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-title" }, title) : null, description ? /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-desc" }, description) : null), slot ? /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-slot" }, slot) : null, children), /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-indicator", "aria-hidden": true }, /* @__PURE__ */ React.createElement("span", { className: "ds-selcard-indicator-dot" })));
}

// ../src/funds-lite/components/Modal.tsx
import { useEffect } from "react";
var sizeClass6 = {
  sm: "ds-modal-sm",
  md: "",
  lg: "ds-modal-lg"
};
var intentIcon = {
  success: /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M8 12.5l3 3 5-6" })),
  warning: /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, /* @__PURE__ */ React.createElement("path", { d: "M12 3l10 18H2L12 3z" }), /* @__PURE__ */ React.createElement("path", { d: "M12 10v5" }), /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "18", r: "0.5" })),
  error: /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M8 8l8 8M16 8l-8 8" })),
  info: /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, /* @__PURE__ */ React.createElement("circle", { cx: "12", cy: "12", r: "10" }), /* @__PURE__ */ React.createElement("path", { d: "M12 8v.5M11 12h1v5h1" }))
};
function Modal({
  open,
  onClose,
  size = "md",
  variant = "default",
  intent,
  title,
  description,
  slot,
  primaryAction,
  secondaryAction,
  hideClose,
  className,
  children,
  ...props
}) {
  useEffect(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose == null ? void 0 : onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const dialogClasses = [
    "ds-modal",
    sizeClass6[size],
    variant === "dialog" ? "ds-modal-dialog" : "",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("div", { className: "ds-modal-overlay", role: "dialog", "aria-modal": "true", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: dialogClasses, onClick: (e) => e.stopPropagation(), ...props }, /* @__PURE__ */ React.createElement("div", { className: "ds-modal-head" }, intent ? /* @__PURE__ */ React.createElement("span", { className: `ds-modal-icon ds-modal-icon-${intent}` }, intentIcon[intent]) : null, title ? /* @__PURE__ */ React.createElement("h3", { className: "ds-modal-title" }, title) : null, !hideClose ? /* @__PURE__ */ React.createElement("button", { type: "button", className: "ds-modal-close", "aria-label": "Close", onClick: onClose }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true }, /* @__PURE__ */ React.createElement("path", { d: "M6 6l12 12M18 6L6 18" }))) : null), slot ? /* @__PURE__ */ React.createElement("div", { className: "ds-modal-slot" }, slot) : null, description ? /* @__PURE__ */ React.createElement("p", { className: "ds-modal-desc" }, description) : null, children, primaryAction || secondaryAction ? /* @__PURE__ */ React.createElement("div", { className: "ds-modal-actions" }, secondaryAction, primaryAction) : null));
}

// ../src/funds-lite/components/BottomSheet.tsx
import { useEffect as useEffect2 } from "react";
var sizeClass7 = {
  sm: "",
  md: "ds-sheet-md",
  fullscreen: "ds-sheet-fullscreen"
};
function BottomSheet({
  open,
  onClose,
  size = "sm",
  title,
  description,
  slot,
  slotPosition = "above",
  primaryAction,
  secondaryAction,
  hideClose,
  className,
  children,
  ...props
}) {
  useEffect2(() => {
    if (!open) return;
    function onKey(e) {
      if (e.key === "Escape") onClose == null ? void 0 : onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const sheetClasses = [
    "ds-sheet",
    sizeClass7[size],
    className
  ].filter(Boolean).join(" ");
  const renderSlot = slot ? /* @__PURE__ */ React.createElement("div", { className: "ds-sheet-slot" }, slot) : null;
  const renderTextBlock = /* @__PURE__ */ React.createElement("div", { className: "ds-sheet-text" }, title ? /* @__PURE__ */ React.createElement("h3", { className: "ds-sheet-title" }, title) : null, description ? /* @__PURE__ */ React.createElement("p", { className: "ds-sheet-desc" }, description) : null);
  return /* @__PURE__ */ React.createElement("div", { className: "ds-sheet-overlay", role: "dialog", "aria-modal": "true", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { className: sheetClasses, onClick: (e) => e.stopPropagation(), ...props }, /* @__PURE__ */ React.createElement("div", { className: "ds-sheet-grip", "aria-hidden": true }), /* @__PURE__ */ React.createElement("div", { className: "ds-sheet-head" }, !hideClose ? /* @__PURE__ */ React.createElement("button", { type: "button", className: "ds-sheet-close", "aria-label": "Close", onClick: onClose }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", "aria-hidden": true }, /* @__PURE__ */ React.createElement("path", { d: "M6 6l12 12M18 6L6 18" }))) : null, size === "fullscreen" && title ? /* @__PURE__ */ React.createElement("h3", { className: "ds-sheet-title ds-sheet-title-inline" }, title) : null), /* @__PURE__ */ React.createElement("div", { className: "ds-sheet-body" }, size !== "fullscreen" ? /* @__PURE__ */ React.createElement(React.Fragment, null, slotPosition === "above" ? renderSlot : null, title || description ? renderTextBlock : null, slotPosition === "below" ? renderSlot : null) : null, children), primaryAction || secondaryAction ? /* @__PURE__ */ React.createElement("div", { className: "ds-sheet-actions" }, secondaryAction, primaryAction) : null));
}

// ../src/funds-lite/components/NavigationBar.tsx
function NavigationBar({ items, className, ...props }) {
  const classes = ["ds-navbar", className].filter(Boolean).join(" ");
  return /* @__PURE__ */ React.createElement("nav", { className: classes, ...props }, items.map((it) => /* @__PURE__ */ React.createElement(NavigationBarTab, { key: it.id, item: it })));
}
function NavigationBarTab({ item }) {
  const cls = [
    "ds-navbar-tab",
    item.active ? "ds-navbar-tab-active" : "",
    item.feature ? "ds-navbar-tab-feature" : ""
  ].filter(Boolean).join(" ");
  const buttonProps = {
    type: "button",
    onClick: item.onClick,
    "aria-current": item.active ? "page" : void 0
  };
  return /* @__PURE__ */ React.createElement("button", { className: cls, ...buttonProps }, /* @__PURE__ */ React.createElement("span", { className: "ds-navbar-icon-wrap" }, /* @__PURE__ */ React.createElement("span", { className: "ds-navbar-icon", "aria-hidden": true }, item.icon), item.badge != null ? /* @__PURE__ */ React.createElement("span", { className: "ds-navbar-badge" }, item.badge) : null), /* @__PURE__ */ React.createElement("span", { className: "ds-navbar-label" }, item.label));
}

// ../src/funds-lite/components/NavigationHeader.tsx
function NavigationHeader({
  title,
  variant = "light",
  onBack,
  hideBack,
  trailingIcons,
  link,
  onLinkClick,
  showStatusBar,
  className,
  ...props
}) {
  const classes = [
    "ds-navhdr",
    variant === "dark" ? "ds-navhdr-dark" : "",
    className
  ].filter(Boolean).join(" ");
  const limitedIcons = (trailingIcons ?? []).slice(0, 2);
  const backProps = {
    type: "button",
    onClick: onBack,
    "aria-label": "Back"
  };
  const linkProps = {
    type: "button",
    onClick: onLinkClick
  };
  return /* @__PURE__ */ React.createElement("header", { className: classes, ...props }, showStatusBar ? /* @__PURE__ */ React.createElement("div", { className: "ds-navhdr-statusbar", "aria-hidden": true }, /* @__PURE__ */ React.createElement("span", { className: "ds-navhdr-clock" }, "9:41"), /* @__PURE__ */ React.createElement("span", { className: "ds-navhdr-status-icons" }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 16 12", width: "16", height: "12", fill: "currentColor", "aria-hidden": true }, /* @__PURE__ */ React.createElement("rect", { x: "1", y: "9", width: "2", height: "2" }), /* @__PURE__ */ React.createElement("rect", { x: "5", y: "6", width: "2", height: "5" }), /* @__PURE__ */ React.createElement("rect", { x: "9", y: "3", width: "2", height: "8" }), /* @__PURE__ */ React.createElement("rect", { x: "13", y: "0", width: "2", height: "11" })), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 16 12", width: "16", height: "12", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": true }, /* @__PURE__ */ React.createElement("path", { d: "M1 5a10 10 0 0114 0M3.5 7.5a6 6 0 019 0M6 10a2 2 0 014 0" })), /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 12", width: "24", height: "12", "aria-hidden": true }, /* @__PURE__ */ React.createElement("rect", { x: "0.5", y: "0.5", width: "20", height: "11", rx: "2", fill: "none", stroke: "currentColor" }), /* @__PURE__ */ React.createElement("rect", { x: "2", y: "2", width: "17", height: "8", rx: "1", fill: "currentColor" }), /* @__PURE__ */ React.createElement("rect", { x: "21", y: "4", width: "2", height: "4", rx: "0.5", fill: "currentColor" })))) : null, /* @__PURE__ */ React.createElement("div", { className: "ds-navhdr-row" }, !hideBack ? /* @__PURE__ */ React.createElement("button", { className: "ds-navhdr-back", ...backProps }, /* @__PURE__ */ React.createElement("svg", { viewBox: "0 0 24 24", width: "20", height: "20", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", "aria-hidden": true }, /* @__PURE__ */ React.createElement("path", { d: "M19 12H5M12 5l-7 7 7 7" }))) : /* @__PURE__ */ React.createElement("span", { className: "ds-navhdr-back-spacer" }), /* @__PURE__ */ React.createElement("span", { className: "ds-navhdr-title" }, title), /* @__PURE__ */ React.createElement("span", { className: "ds-navhdr-trailing" }, limitedIcons.map((ic, i) => /* @__PURE__ */ React.createElement("span", { key: i, className: "ds-navhdr-trailing-icon", "aria-hidden": true }, ic)), link ? /* @__PURE__ */ React.createElement("button", { className: "ds-navhdr-link", ...linkProps }, link) : null)));
}
export {
  Badge,
  BottomSheet,
  Button,
  CLAUDE_PROMPT,
  COLOR_SCALES,
  CURSOR_RULES,
  DESIGN_MD,
  Input,
  LAYOUT_PATTERNS,
  Modal,
  NAV_SECTIONS,
  NavigationBar,
  NavigationHeader,
  RADII,
  SECTION_SPECS,
  SPACINGS,
  SelectableCard,
  TOKENS,
  TYPE_SCALE,
  Toggle
};
//# sourceMappingURL=index.mjs.map