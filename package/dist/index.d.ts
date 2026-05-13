import * as react from 'react';
import { ButtonHTMLAttributes, ReactNode, InputHTMLAttributes, HTMLAttributes } from 'react';

declare const COLOR_SCALES: Record<string, {
    scale: string;
    hex: string;
}[]>;
declare const TYPE_SCALE: {
    cls: string;
    spec: string;
    size: string;
    weight: number;
    ls: string;
    sample: string;
    uppercase: boolean;
}[];
declare const SPACINGS: {
    v: string;
    px: string;
    r: string;
}[];
declare const RADII: {
    k: string;
    v: string;
}[];
declare const LAYOUT_PATTERNS: {
    name: string;
    tokens: {
        key: string;
        value: string;
        note: string;
    }[];
}[];
declare const TOKENS: {
    cat: string;
    key: string;
    hex: string;
    desc: string;
}[];
declare const NAV_SECTIONS: readonly ["overview", "colors", "typography", "spacing", "buttons", "inputs", "badges", "cards", "toggles", "selectable-cards", "modals", "bottom-sheets", "navigation-bars", "navigation-headers", "prompts", "llms"];

declare const CLAUDE_PROMPT = "You are building UI for Amartha Financial (https://amartha.com/), a micro-finance lending company focused on productive micro loans for grassroot women in Indonesia, using the FunDS Lite design system.\nRead the full spec: https://funds-lite.vercel.app/llms.txt\n\nAMARTHA PRODUCT CONTEXT:\n\n  Products:    Modal (digital loan) \u00B7 Celengan (retail investment, grassroot)\n               GGS (retail investment, middle-upper) \u00B7 B2B Funding (institutional)\n               PPOB / AmarthaLink (bill payment & agent PPOB) \u00B7 Poket (in-app wallet)\n  Platforms:   AmarthaFin App (consumer iOS/Android) \u00B7 NG-MIS (internal ops/CRM)\n               A-Partner App (field agents)\n\nLOCKED TOKENS \u2014 never use any other values:\n\n  primary:     #853291  (hover: #732C7C, tint: #FEF3FF)\n  text:        #111928  (caption: #6B7280, disabled: #8E95A3)\n  border:      #E5E7EB\n  font:        Inter \u2014 weights 500 and 700 ONLY\n  spacing:     0 2 4 8 12 16 20 24 32 40 48 (px)\n  radius:      9999px buttons (pill) \u00B7 12px cards \u00B7 8px inputs \u00B7 6px sm\n  status:      blue #056DCE \u00B7 green #009C6A \u00B7 orange #F7941D \u00B7 red #D73630\n  layout:      mobile px 16 \u00B7 topbar 48h/16x \u00B7 sections 12 \u00B7 cards 12p/8g\n\nDo not use arbitrary Tailwind values (e.g. w-[437px]).\nDo not invent hex values outside this token set.\nDo not use font-weight 400, 600, or 800.";
declare const CURSOR_RULES = "# FunDS Lite \u00B7 .cursorrules\n# Generated from tailwind.config.ts \u2014 do not edit manually\n\n[product]\ncompany       = Amartha Financial (https://amartha.com/)\ncontext       = Micro-finance lending for grassroot women in Indonesia\nproducts      = Modal (digital loan) | Celengan (retail invest) | GGS (retail invest)\n                B2B Funding | PPOB / AmarthaLink | Poket (wallet)\nplatforms     = AmarthaFin App (iOS/Android) | NG-MIS (internal ops/CRM) | A-Partner App\n\n[colors]\nprimary-500   = #853291\nprimary-600   = #732C7C\nprimary-50    = #FEF3FF\ntext-default  = #111928\ntext-caption  = #6B7280\nborder        = #E5E7EB\nblue-500      = #056DCE\ngreen-500     = #009C6A\norange-500    = #F7941D\nred-500       = #D73630\n\n[typography]\nfont-family   = Inter\nfont-weight   = 500 | 700   # no other weights permitted\n\n[spacing]\nvalid-px      = 0 2 4 8 12 16 20 24 32 40 48\n\n[layout]\npage-padding-x   = 16px\npage-padding-top = 16px\nsection-gap      = 12px\ncard-padding     = 12px\ncard-gap         = 8px\ntopbar-height    = 48px\ntopbar-padding-x = 16px\n\n[radius]\nbutton        = 9999px (pill)\ninput         = 8px\ncard          = 12px\nsm            = 6px\n\n[guardrails]\nno-arbitrary  = never use w-[x] or text-[#xxx] Tailwind syntax\nno-extra-hex  = only use hex values listed above\nfont-only     = Inter only, no other Google Fonts";
declare const DESIGN_MD = "# FunDS Lite \u2014 Design System Specification\n> Purple fintech precision \u2014 a single brand purple anchoring every action across consumer mobile and internal dashboard.\n\n**Version:** 1.0.0 \u00B7 **Updated:** 2026-04 \u00B7 **Platforms:** AmarthaFin App, NG-MIS\n\nFunDS Lite is the lightweight subset of the Amartha FunDS design system. The brand anchors in a single purple (#853291) \u2014 every primary action, link, and active state uses this color. Status colors are always paired with their 50-tint backgrounds. Inter is the only permitted typeface at weights 500 and 700.\n\n## Product Context\n\n**Company:** Amartha Financial (https://amartha.com/) \u2014 micro-finance lending focused on productive micro loans for grassroot women in Indonesia.\n\n**Products:**\n- Modal \u2014 Digital productive loan (primary borrower product)\n- Group Loan \u2014 Non-digital group loan (deprecated; migrating to Modal)\n- Celengan \u2014 Retail investment, grassroot market\n- GGS (Grassroot Growth Series) \u2014 Retail investment, middle-upper class\n- B2B Funding \u2014 Institutional funding (not in AmarthaFin App)\n- PPOB / AmarthaLink \u2014 B2C bill payment & agent-based PPOB\n- Poket \u2014 In-app wallet for Amartha ecosystem\n\n**Platforms:**\n- AmarthaFin App \u2014 Consumer iOS/Android (borrowers, investors, PPOB users)\n- NG-MIS \u2014 Internal ops system / potential CRM\n- A-Partner App \u2014 Internal app for field partners/agents\n\n---\n\n## Tokens \u2014 Colors\n\n### Brand (Primary Purple)\n\n| Name | Value | Token | Role |\n|------|-------|-------|------|\n| Primary 50 | `#FEF3FF` | `--primary-50` | Badge fills, focus rings, ghost hover backgrounds |\n| Primary 200 | `#E5B8EF` | `--primary-200` | Focus ring outer glow |\n| Primary 300 | `#D68EE4` | `--primary-300` | Illustrative / decorative |\n| Primary 400 | `#A642B7` | `--primary-400` | Secondary decorative actions |\n| Primary 500 | `#853291` | `--primary-500` | PRIMARY \u2014 buttons, links, active states |\n| Primary 600 | `#732C7C` | `--primary-600` | Hover / pressed state |\n| Primary 700 | `#612966` | `--primary-700` | On-light text emphasis |\n| Primary 900 | `#3D1042` | `--primary-900` | Deep emphasis |\n\n### Neutral\n\n| Name | Value | Token | Role |\n|------|-------|-------|------|\n| White | `#FFFFFF` | `--neutral-white` | Surface / card backgrounds |\n| Neutral 50 | `#F9FAF8` | `--neutral-50` | Page background |\n| Neutral 200 | `#E5E7EB` | `--neutral-200` | Borders (default) |\n| Neutral 400 | `#C6CAD0` | `--neutral-400` | Placeholder text |\n| Neutral 500 | `#8E95A3` | `--neutral-500` | Disabled state |\n| Neutral 600 | `#6B7280` | `--neutral-600` | Caption / secondary text |\n| Neutral 700 | `#525C6A` | `--neutral-700` | Secondary text emphasis |\n| Neutral 900 | `#111928` | `--neutral-900` | Default text (darkest) |\n\n### Status Colors\n\nAlways pair the 500 foreground with its 50-tint background. Never use a status color on white or neutral-50 without the tint.\n\n| Name | Value | Token | Tint bg | Role |\n|------|-------|-------|---------|------|\n| Blue 500 | `#056DCE` | `--blue-500` | `#EDF7FF` (`--blue-50`) | Informational |\n| Green 500 | `#009C6A` | `--green-500` | `#E4FCEF` (`--green-50`) | Success / funded |\n| Orange 500 | `#F7941D` | `--orange-500` | `#FDF4E9` (`--orange-50`) | Warning / pending |\n| Red 500 | `#D73630` | `--red-500` | `#FFF4F3` (`--red-50`) | Error / overdue / danger |\n| Yellow 500 | `#EAB20B` | `--yellow-500` | `#FFFED9` (`--yellow-50`) | Accent / review |\n\n### Semantic Token Aliases\n\nUse these names in component code \u2014 prefer over raw hex.\n\n| Alias | Resolves to | Role |\n|-------|-------------|------|\n| `text-default` | `--neutral-900` (#111928) | Primary readable text |\n| `text-caption` | `--neutral-600` (#6B7280) | Secondary / supporting text |\n| `text-disabled` | `--neutral-500` (#8E95A3) | Disabled labels |\n| `text-placeholder` | `--neutral-400` (#C6CAD0) | Input placeholder text |\n| `text-link` | `--primary-500` (#853291) | Clickable links |\n| `border-default` | `--neutral-200` (#E5E7EB) | Card and input borders |\n| `border-light` | `--neutral-50` (#F9FAF8) | Subtle dividers |\n\n---\n\n## Tokens \u2014 Typography\n\n**Font family:** Inter (Google Fonts) \u00B7 `--font`\n**Weights:** 500 (body) and 700 (headings/buttons) \u2014 no other weights permitted.\n\n### Type Scale\n\n| Class | Size | Weight | Letter Spacing | Role |\n|-------|------|--------|----------------|------|\n| `text-24` | 24px | 700 | \u22120.02em | Page titles / primary headings |\n| `text-20` | 20px | 700 | \u22120.01em | Section headings |\n| `text-18` | 18px | 500 | 0 | Primary reading size (dashboards) |\n| `text-16` | 16px | 500 | 0 | Secondary paragraphs and descriptions |\n| `text-14` | 14px | 500 | 0 | Compact data tables and labels |\n| `text-12` | 12px | 500 | 0 | Body / caption / helper text |\n| `text-10` | 10px | 500 | +0.06em | Overline / micro (UPPERCASE only) |\n\n---\n\n## Tokens \u2014 Spacing & Shapes\n\n**Base unit:** 4px \u00B7 **Density:** compact\n\n### Spacing Scale\n\n| Class | Value |\n|-------|-------|\n| `space-0` | 0px |\n| `space-2` | 2px |\n| `space-4` | 4px |\n| `space-8` | 8px |\n| `space-12` | 12px |\n| `space-16` | 16px |\n| `space-20` | 20px |\n| `space-24` | 24px |\n| `space-32` | 32px |\n| `space-40` | 40px |\n| `space-48` | 48px |\n\n**Forbidden:** 5, 6, 10, 15, 25, 30px \u2014 never use values not in the scale above.\n\n### Border Radius\n\n| Element | Value | Class |\n|---------|-------|-------|\n| Buttons, badges | 9999px | `rounded-full` |\n| Inputs, selects | 8px | `rounded-8` |\n| Cards, modals, drawers | 12px | `rounded-12` |\n| Chips, small tags | 6px | `rounded-6` |\n\n### Layout Patterns\n\n| Pattern | Token | Value | Notes |\n|---------|-------|-------|-------|\n| Mobile Screen | `page-padding-x` | 16px | Horizontal edge margin for all screen content |\n| Mobile Screen | `page-padding-top` | 16px | Below topbar |\n| Mobile Screen | `section-gap` | 12px | Vertical gap between cards/sections |\n| Card | `card-padding` | 12px | Internal card padding (not 20px) |\n| Card | `card-gap` | 8px | Gap between cards |\n| Topbar | `topbar-height` | 48px | \u2014 |\n| Topbar | `topbar-padding-x` | 16px | \u2014 |\n\n---\n\n## Surfaces\n\n| Level | Name | Value | Purpose |\n|-------|------|-------|---------|\n| 0 | Page Background | `#F9FAF8` (`--neutral-50`) | Primary page / screen background |\n| 1 | Surface / Card | `#FFFFFF` (`--neutral-white`) | Card and modal backgrounds |\n| \u2014 | Brand Tint | `#FEF3FF` (`--primary-50`) | Badge fills, ghost hover, focus rings |\n| \u2014 | Overlay | `rgba(17, 25, 40, 0.8)` | Modal / drawer overlays |\n\n---\n\n## Components\n\n### Button\n**Role:** Trigger an action or event\n\nShape: pill (9999px). Font weight: 700. The pill is the only permitted button shape \u2014 never rectangular or lightly rounded.\n\nImplementation: `src/funds-lite/components/Button.tsx`\nStyles: `src/funds-lite/components/styles.css`\nReact API: `<Button variant=\"primary\" size=\"md\">Label</Button>`\nProps: `variant = primary | secondary | outline | ghost | danger` \u00B7 `size = xs | sm | md | lg | xl` \u00B7 accepts native `button` props including `disabled`, `type`, `onClick`.\n\n| Variant | Background | Border | Text | Hover |\n|---------|------------|--------|------|-------|\n| primary | `--primary-500` + gradient | white 16% | white | `--primary-600` |\n| secondary | white | `--primary-500` | `--primary-500` | `--primary-50` tint |\n| outline | white | `--neutral-200` | `--neutral-900` | `--neutral-400` border |\n| ghost | transparent | transparent | `--primary-500` | `--primary-50` bg |\n| danger | `--red-500` | `--red-500` | white | `--red-600` |\n\nSizes: `xs` (12px / 4px 8px) \u00B7 `sm` (12px / 8px 10px) \u00B7 `md` (14px / 8px 12px) \u00B7 `lg` (16px / 12px 16px) \u00B7 `xl` (16px / 12px 20px)\n\nDisabled: `--neutral-200` bg, `--neutral-500` text, no shadow, `cursor: not-allowed`.\nFocus ring: 2px white + 4px `--primary-200` (#E5B8EF) outline.\n\n### Input\n**Role:** Text field, select, textarea\n\nRadius 8px. Border: `--neutral-200`. On focus: border shifts to `--primary-500` + 3px `--primary-50` ring.\n\nImplementation: `src/funds-lite/components/Input.tsx`\nStyles: `src/funds-lite/components/styles.css`\nReact API: `<Input label=\"Amount\" prefix=\"Rp\" placeholder=\"Type here\" />`\nProps: `size = sm | md | lg` \u00B7 `state = default | focus | valid | error` \u00B7 supports `label`, `optionalText`, `required`, `description`, `helperText`, `prefix`, `suffix`, `prefixInteractive`, `suffixInteractive`, `prefixButtonProps`, `suffixButtonProps`.\n\n| State | Border | Ring |\n|-------|--------|------|\n| default | `--neutral-200` | \u2014 |\n| focus | `--primary-500` | `--primary-50` 3px |\n| valid | `--green-500` | \u2014 |\n| error | `--red-500` | `--red-50` 3px |\n| disabled | `--neutral-200` | \u2014 |\n\nSizes: sm \u00B7 md \u00B7 lg\nConditions: empty \u00B7 filled\nAdditional info: label, required, optionalText, helperText, description\nSupports prefix and suffix (clickable via `prefixInteractive`/`suffixInteractive` + `prefixButtonProps`/`suffixButtonProps`)\nIcons: left or right when meaningful or actionable\nVariants: text input \u00B7 select \u00B7 textarea \u00B7 tap area\n\n### Badge\n**Role:** Status indicator, categorical label\n\nShape: pill (9999px). Padding: 3px 10px. Font: 12px / weight 500.\n\n| Variant | Background | Text |\n|---------|------------|------|\n| primary | `--primary-50` (#FEF3FF) | `--primary-600` (#732C7C) |\n| blue | `--blue-50` (#EDF7FF) | `--blue-600` (#0457A5) |\n| green | `--green-50` (#E4FCEF) | `--green-600` (#007D55) |\n| orange | `--orange-50` (#FDF4E9) | `--orange-700` (#AD540A) |\n| red | `--red-50` (#FFF4F3) | `--red-600` (#AC2B26) |\n| yellow | `--yellow-50` (#FFFED9) | `--yellow-700` (#996F03) |\n| neutral | `--neutral-50` (#F9FAF8) | `--neutral-600` (#6B7280) |\n\n### Card\n**Role:** Surface container for grouped information\n\nRadius: 12px. Border: 1px solid `--neutral-200`. Background: `--neutral-white`. Padding: 12px.\nNever nest cards. Use cards to group related fund information.\n\n### Toggle\n**Role:** Binary on/off switch for a setting\n\nShape: pill track + circular thumb. On state shows check icon and `--primary-500` track.\n\nImplementation: `src/funds-lite/components/Toggle.tsx`\nReact API: `<Toggle size=\"sm\" label=\"Remember me\" helperText=\"Save my login details for next time.\" defaultChecked />`\nProps: `size = sm | md` \u00B7 `label` \u00B7 `helperText` \u00B7 accepts native checkbox props (`checked`, `defaultChecked`, `disabled`, `onChange`).\n\n| State | Track bg | Thumb |\n|-------|----------|-------|\n| off | `--neutral-400` | `--neutral-white` |\n| on | `--primary-500` | `--neutral-white` + check |\n| disabled (off) | `--neutral-200` | `--neutral-50` |\n| disabled (on) | `--neutral-200` | `--neutral-50` + dim check |\n\nSizes: sm (32\u00D720 track / 16\u00D716 thumb) \u00B7 md (44\u00D724 track / 20\u00D720 thumb)\nFocus ring: 2px white + 4px `--primary-200` around track.\n\n### Selectable Card\n**Role:** Card-shaped radio / checkbox \u2014 selection via tapping the whole card\n\nRadius 8px. Border: 1px solid `--neutral-200`. Active state shifts border to `--primary-500` and background to `--primary-50`. Indicator (16px radio dot) sits on the right.\n\nImplementation: `src/funds-lite/components/SelectableCard.tsx`\nReact API: `<SelectableCard title=\"...\" description=\"...\" inputType=\"radio\" name=\"plan\" />`\nProps: `size = sm | md` \u00B7 `title` \u00B7 `description` \u00B7 `prefixIcon` \u00B7 `secondary` (right-aligned double content) \u00B7 `slot` (swappable inline component) \u00B7 `ribbon` \u00B7 `inputType = radio | checkbox` \u00B7 accepts native input props.\n\n| State | Border | Background | Indicator |\n|-------|--------|------------|-----------|\n| enabled | `--neutral-200` | white | empty circle |\n| active | `--primary-500` | `--primary-50` | primary dot |\n| disabled | `--neutral-200` | `--neutral-50` | dim circle |\n\nVariants: with double content (secondary right-aligned) \u00B7 with prefix icon (32px primary-50 circle) \u00B7 with component slot (use `slot` prop) \u00B7 promo card (combine with badge/ribbon).\nUse the ribbon prop for \"Paling Untung\"-style overlays.\n\n### Modal\n**Role:** Temporary dialog window on top of the main content\n\nSurface: white card, 12px radius, 16px padding, anchored center over `rgba(17, 25, 40, 0.8)` overlay. Has only one visual state \u2014 open or closed.\n\nImplementation: `src/funds-lite/components/Modal.tsx`\nReact API: `<Modal open={open} onClose={...} title=\"Title\" description=\"...\" primaryAction={<Button>CTA</Button>} secondaryAction={<Button variant=\"ghost\">Cancel</Button>} />`\nProps: `open` \u00B7 `onClose` \u00B7 `size = sm | md | lg` \u00B7 `variant = default | dialog` \u00B7 `intent = success | warning | error | info` (dialog only) \u00B7 `title` \u00B7 `description` \u00B7 `slot` (swappable content above description) \u00B7 `primaryAction` \u00B7 `secondaryAction` \u00B7 `hideClose`.\n\n| Variant | Notes |\n|---------|-------|\n| default | General content with title + body + optional swappable slot |\n| dialog | Predefined content with intent icon (success / warning / error / info) |\n\nSizes: sm 320px \u00B7 md 400px (default) \u00B7 lg 560px. Closing supports Escape key and overlay click.\n\n### Bottom Sheet\n**Role:** Mobile sheet that slides up from the bottom\n\nSurface: white sheet anchored to bottom, 12px top radius, 16px padding. Always includes a grip handle. Closes on Escape or overlay tap.\n\nImplementation: `src/funds-lite/components/BottomSheet.tsx`\nReact API: `<BottomSheet open={open} onClose={...} title=\"Title\" description=\"...\" slot={<Component />} primaryAction={<Button>Lanjutkan</Button>} secondaryAction={<Button variant=\"outline\">Tutup</Button>} />`\nProps: `open` \u00B7 `onClose` \u00B7 `size = sm | md | fullscreen` \u00B7 `title` \u00B7 `description` \u00B7 `slot` (swappable visual block) \u00B7 `slotPosition = above | below` \u00B7 `primaryAction` \u00B7 `secondaryAction` \u00B7 `hideClose`.\n\nSizes: sm \u2014 default mobile width 420px (use this 95% of the time) \u00B7 md \u2014 responsive 560px \u00B7 fullscreen \u2014 full viewport height with flat top.\nFive predefined variants in spec map to slot-above + slot-below + text-only + title-only + description-only combinations.\n\n### Navigation Bar\n**Role:** Bottom tab bar for primary app navigation\n\nSurface: white background, 1px top border (`--neutral-200`). Equal-width tabs in a row, icon + 10px uppercase-equivalent label.\n\nImplementation: `src/funds-lite/components/NavigationBar.tsx`\nReact API: `<NavigationBar items={[{ id, label, icon, active, badge, feature, onClick }]} />`\nProps: each item supports `active` (primary-500 color, weight 700 label), `badge` (red dot or count over icon), `feature` (40px primary-500 lifted circle \u2014 use for center action like Scan).\n\n| State | Color | Label weight |\n|-------|-------|--------------|\n| enabled | `--neutral-600` | 500 |\n| active | `--primary-500` | 700 |\n\nBadge: red-500 bg with white text and 2px white border ring around icon corner.\n\n### Navigation Header\n**Role:** Top app bar \u2014 back, title, optional trailing icons or CTA link\n\nHeight: 48px. Padding: 16px horizontal. White surface with neutral-200 bottom border; dark variant uses neutral-900 with white text.\n\nImplementation: `src/funds-lite/components/NavigationHeader.tsx`\nReact API: `<NavigationHeader title=\"Title here\" onBack={...} trailingIcons={[icon1, icon2]} link=\"Bantuan\" onLinkClick={...} />`\nProps: `title` \u00B7 `variant = light | dark` \u00B7 `onBack` \u00B7 `hideBack` \u00B7 `trailingIcons` (max 2) \u00B7 `link` \u00B7 `onLinkClick` \u00B7 `showStatusBar` (renders iOS-style status bar above header for mocks).\n\n| Variant | Bg | Text | Border |\n|---------|----|------|--------|\n| light | `--neutral-white` | `--neutral-900` | `--neutral-200` bottom |\n| dark | `--neutral-900` | `--neutral-white` | none |\n\nStates: one state only \u2014 no hover. Trailing slot accepts up to 2 icons OR a link button (text-14 weight 700, `--primary-500` light / `--primary-300` dark).\n\n---\n\n## Do's and Don'ts\n\n### Do\n- Use `--primary-500` (#853291) for every primary action button, active state, and link \u2014 it is the single brand action color.\n- Pair every status color with its 50-tint background (e.g. `--red-500` text on `--red-50` bg).\n- Use Inter at weight 500 or 700 only. No exceptions.\n- Keep spacing values within the 4px scale: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48px.\n- Use semantic alias names (`text-default`, `border-default`) over raw hex in component code.\n- Use pill radius (9999px) for buttons and badges, 8px for inputs, 12px for cards \u2014 always.\n\n### Don't\n- Don't use arbitrary Tailwind values like `w-[437px]` or `text-[#abc]` \u2014 ever.\n- Don't invent hex values not in this token set.\n- Don't use font-weight 400, 600, or 800 \u2014 only 500 and 700.\n- Don't use spacing values outside the scale (e.g. 5px, 10px, 15px, 25px).\n- Don't use any Google Font other than Inter.\n- Don't use purple tones from generic Tailwind palettes \u2014 only `--primary-*` tokens.\n- Don't use a status color on white without the tint bg pair.\n- Don't use emoji in the design.\n\n---\n\n## Agent Prompt Guide\n\n**Quick Token Reference**\n- Primary action: `--primary-500` (#853291)\n- Primary hover: `--primary-600` (#732C7C)\n- Text default: `--neutral-900` (#111928)\n- Page background: `--neutral-50` (#F9FAF8)\n- Card surface: `--neutral-white` (#FFFFFF)\n- Border: `--neutral-200` (#E5E7EB)\n\n**Example Component Prompts**\n\n1. **Fund Dashboard Card:** `--neutral-white` bg, `rounded-12`, `1px solid --neutral-200` border, 12px padding. Fund name in `text-16` weight 700 (`--neutral-900`), AUM/IRR stats in `text-14` weight 500. Status badge variant matching fund state.\n\n2. **Primary Action Button:** `--primary-500` background, white text, `rounded-full` (9999px), `text-14` weight 700, `8px 12px` padding. Hover shifts to `--primary-600`.\n\n3. **Data Table:** `text-14` weight 500 (`--neutral-900`), `--neutral-200` bottom border per row, `--neutral-50` header background. Status column uses Badge component.\n\n4. **Amount Input with Prefix:** `<Input label=\"Amount\" prefix=\"Rp\" prefixInteractive prefixButtonProps={{ 'aria-label': 'Choose currency' }} placeholder=\"0\" />` \u2014 radius 8px, border `--neutral-200`, focus ring `--primary-500` + `--primary-50`.\n\n5. **Topbar:** 48px height, `--neutral-white` background, `1px solid --neutral-200` border-bottom. Logo in `--primary-500`. Nav items in `text-14` weight 500 (`--neutral-600`), active in `--neutral-900` weight 700.\n\n---\n\n## Quick Start\n\n```css\n:root {\n  /* Brand */\n  --primary-50:  #FEF3FF;\n  --primary-200: #E5B8EF;\n  --primary-300: #D68EE4;\n  --primary-400: #A642B7;\n  --primary-500: #853291;\n  --primary-600: #732C7C;\n  --primary-700: #612966;\n  --primary-900: #3D1042;\n\n  /* Neutral */\n  --neutral-white: #FFFFFF;\n  --neutral-50:    #F9FAF8;\n  --neutral-200:   #E5E7EB;\n  --neutral-400:   #C6CAD0;\n  --neutral-500:   #8E95A3;\n  --neutral-600:   #6B7280;\n  --neutral-700:   #525C6A;\n  --neutral-900:   #111928;\n\n  /* Status */\n  --blue-50:     #EDF7FF;  --blue-500:    #056DCE;  --blue-600:    #0457A5;\n  --green-50:    #E4FCEF;  --green-500:   #009C6A;  --green-600:   #007D55;\n  --orange-50:   #FDF4E9;  --orange-500:  #F7941D;  --orange-700:  #AD540A;\n  --red-50:      #FFF4F3;  --red-500:     #D73630;  --red-600:     #AC2B26;\n  --yellow-50:   #FFFED9;  --yellow-500:  #EAB20B;  --yellow-700:  #996F03;\n\n  /* Typography */\n  --font: 'Inter', ui-sans-serif, system-ui, sans-serif;\n\n  /* Layout */\n  --page-padding-x:   16px;\n  --page-padding-top: 16px;\n  --section-gap:      12px;\n  --card-padding:     12px;\n  --card-gap:         8px;\n  --topbar-height:    48px;\n  --topbar-padding-x: 16px;\n}\n```\n";
declare const SECTION_SPECS: Record<string, string>;

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
    children: ReactNode;
};
declare function Button({ variant, size, className, type, children, ...props }: ButtonProps): react.JSX.Element;

type InputSize = 'sm' | 'md' | 'lg';
type InputState = 'default' | 'focus' | 'valid' | 'error';
type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> & {
    size?: InputSize;
    state?: InputState;
    label?: ReactNode;
    optionalText?: ReactNode;
    required?: boolean;
    description?: ReactNode;
    helperText?: ReactNode;
    prefix?: ReactNode;
    suffix?: ReactNode;
    prefixInteractive?: boolean;
    suffixInteractive?: boolean;
    prefixButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
    suffixButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};
declare function Input({ size, state, label, optionalText, required, description, helperText, prefix, suffix, prefixInteractive, suffixInteractive, prefixButtonProps, suffixButtonProps, className, disabled, ...props }: InputProps): react.JSX.Element;

type BadgeIntent = 'primary' | 'blue' | 'green' | 'orange' | 'red' | 'yellow' | 'neutral';
type BadgeVariant = 'solid' | 'subtle' | 'outline' | 'inverted';
type BadgeSize = 'sm' | 'md';
type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'prefix'> & {
    intent?: BadgeIntent;
    variant?: BadgeVariant;
    size?: BadgeSize;
    dot?: boolean;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
    children: ReactNode;
};
declare function Badge({ intent, variant, size, dot, leadingIcon, trailingIcon, className, children, ...props }: BadgeProps): react.JSX.Element;

type ToggleSize = 'sm' | 'md';
type ToggleProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> & {
    size?: ToggleSize;
    label?: ReactNode;
    helperText?: ReactNode;
};
declare function Toggle({ size, label, helperText, id, className, disabled, checked, defaultChecked, ...props }: ToggleProps): react.JSX.Element;

type SelectableCardSize = 'sm' | 'md';
type SelectableCardProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'prefix' | 'title' | 'slot'> & {
    size?: SelectableCardSize;
    title?: ReactNode;
    description?: ReactNode;
    prefixIcon?: ReactNode;
    secondary?: ReactNode;
    slot?: ReactNode;
    ribbon?: ReactNode;
    inputType?: 'radio' | 'checkbox';
};
declare function SelectableCard({ size, title, description, prefixIcon, secondary, slot, ribbon, inputType, id, name, className, disabled, checked, defaultChecked, children, ...props }: SelectableCardProps): react.JSX.Element;

type ModalSize = 'sm' | 'md' | 'lg';
type ModalVariant = 'default' | 'dialog';
type ModalIntent = 'success' | 'warning' | 'error' | 'info';
type ModalProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'slot'> & {
    open: boolean;
    onClose?: () => void;
    size?: ModalSize;
    variant?: ModalVariant;
    intent?: ModalIntent;
    title?: ReactNode;
    description?: ReactNode;
    slot?: ReactNode;
    primaryAction?: ReactNode;
    secondaryAction?: ReactNode;
    hideClose?: boolean;
};
declare function Modal({ open, onClose, size, variant, intent, title, description, slot, primaryAction, secondaryAction, hideClose, className, children, ...props }: ModalProps): react.JSX.Element | null;

type BottomSheetSize = 'sm' | 'md' | 'fullscreen';
type BottomSheetProps = Omit<HTMLAttributes<HTMLDivElement>, 'title' | 'slot'> & {
    open: boolean;
    onClose?: () => void;
    size?: BottomSheetSize;
    title?: ReactNode;
    description?: ReactNode;
    slot?: ReactNode;
    slotPosition?: 'above' | 'below';
    primaryAction?: ReactNode;
    secondaryAction?: ReactNode;
    hideClose?: boolean;
};
declare function BottomSheet({ open, onClose, size, title, description, slot, slotPosition, primaryAction, secondaryAction, hideClose, className, children, ...props }: BottomSheetProps): react.JSX.Element | null;

type NavBarItem = {
    id: string;
    label: ReactNode;
    icon: ReactNode;
    badge?: ReactNode;
    active?: boolean;
    onClick?: () => void;
    feature?: boolean;
};
type NavigationBarProps = HTMLAttributes<HTMLElement> & {
    items: NavBarItem[];
};
declare function NavigationBar({ items, className, ...props }: NavigationBarProps): react.JSX.Element;

type NavigationHeaderVariant = 'light' | 'dark';
type NavigationHeaderProps = Omit<HTMLAttributes<HTMLElement>, 'title'> & {
    title?: ReactNode;
    variant?: NavigationHeaderVariant;
    onBack?: () => void;
    hideBack?: boolean;
    trailingIcons?: ReactNode[];
    link?: ReactNode;
    onLinkClick?: () => void;
    showStatusBar?: boolean;
};
declare function NavigationHeader({ title, variant, onBack, hideBack, trailingIcons, link, onLinkClick, showStatusBar, className, ...props }: NavigationHeaderProps): react.JSX.Element;

export { Badge, type BadgeIntent, type BadgeProps, type BadgeSize, type BadgeVariant, BottomSheet, type BottomSheetProps, type BottomSheetSize, Button, type ButtonProps, type ButtonSize, type ButtonVariant, CLAUDE_PROMPT, COLOR_SCALES, CURSOR_RULES, DESIGN_MD, Input, type InputProps, type InputSize, type InputState, LAYOUT_PATTERNS, Modal, type ModalIntent, type ModalProps, type ModalSize, type ModalVariant, NAV_SECTIONS, type NavBarItem, NavigationBar, type NavigationBarProps, NavigationHeader, type NavigationHeaderProps, type NavigationHeaderVariant, RADII, SECTION_SPECS, SPACINGS, SelectableCard, type SelectableCardProps, type SelectableCardSize, TOKENS, TYPE_SCALE, Toggle, type ToggleProps, type ToggleSize };
