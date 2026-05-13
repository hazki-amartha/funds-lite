# /ingest — Component Ingestion

Ingest a new component from a PDF guideline in `raw/` and register it across the entire platform.

## Usage

```
/ingest [filename]
/ingest input nominal.pdf
/ingest          # lists unprocessed PDFs and asks which to process
```

## What this skill does

Given a PDF spec in `raw/`, this skill:
1. Reads the PDF and extracts the component spec
2. Creates the React component TSX file
3. Registers it in the components index
4. Updates `NAV_SECTIONS` in `tokens.ts`
5. Adds the `SECTION_SPECS` entry and `DESIGN_MD` block in `specs.ts`
6. Adds the sidebar nav item and live demo section in `app/page.tsx`
7. Updates `public/llms.txt`

---

## Step-by-step instructions

### 0. Determine which PDF to process

- If `$ARGUMENTS` is provided, resolve the PDF at `raw/$ARGUMENTS`
- If no argument, run `ls raw/` and list the files. Then check which component names are already in `src/funds-lite/components/index.ts`. Show the user the unprocessed PDFs and ask which to ingest.

### 1. Read and extract the spec

Use the `Read` tool on the PDF file (Claude can parse PDFs natively). Extract:

- **Component name** (PascalCase for file, kebab-case for section id, human title for display)
- **Variants** (list all)
- **Sizes** (list all)
- **States** (default, focus, error, disabled, etc.)
- **Token mapping** (which FunDS tokens map to which states/variants)
- **React props** (all props the component accepts)
- **Shape/radius** (pill, 8px, 12px, etc.)
- **Typography** (font size and weight per part)
- **Spacing** (padding, gap values — must be from the FunDS scale)
- **Behavior / interaction notes**

### 2. Determine section numbering

Read `src/funds-lite/tokens.ts` and count entries in `NAV_SECTIONS`. The section number in the eyebrow label (`01 ·`, `02 ·`, etc.) is the 1-indexed position among ALL sections. Current order:

```
overview(no number) → colors(01) → typography(02) → spacing(03) →
buttons(04) → inputs(05) → badges(06) → cards(07) →
prompts(08) → llms(09)
```

New components go at the end of the Components nav group, before the AI Tools group. So if badges is 06 and cards is 07, a new component would be 08, and prompts/llms shift up. **Check the actual current count before assigning a number.**

Actually: avoid renumbering existing sections. Append the new component section just before the `prompts` section. Use the next available number.

### 3. Create the React component file

**Path:** `src/funds-lite/components/ComponentName.tsx`

Rules:
- Only use FunDS Lite CSS custom properties (`var(--primary-500)`, etc.) — never raw hex
- No Tailwind arbitrary values (`w-[x]`, `text-[#xxx]`)
- Use `className` patterns from existing components (see `Button.tsx`, `Input.tsx`)
- Export as named export: `export function ComponentName(...)`
- Follow the exact same code style as existing components (TypeScript, interface for props, forwardRef if it wraps a native element)
- Add styles to `src/funds-lite/components/styles.css` — never use inline style objects for static design tokens

Read `src/funds-lite/components/Button.tsx` and `src/funds-lite/components/Input.tsx` as reference before writing the component.

### 4. Export from components index

Add to `src/funds-lite/components/index.ts`:
```ts
export * from './ComponentName'
```

### 5. Add to NAV_SECTIONS

In `src/funds-lite/tokens.ts`, append the new section id (kebab-case) to `NAV_SECTIONS`:
```ts
export const NAV_SECTIONS = [
  'overview', 'colors', 'typography', 'spacing',
  'buttons', 'inputs', 'badges', 'cards',
  'component-id',   // ← add here, before prompts
  'prompts', 'llms',
] as const
```

### 6. Update specs.ts

#### 6a. Add SECTION_SPECS entry

In `src/funds-lite/specs.ts`, add a new key to `SECTION_SPECS`:

```ts
componentid: `## ComponentName

- Implementation: src/funds-lite/components/ComponentName.tsx
- Styles: src/funds-lite/components/styles.css
- React API: <ComponentName variant="..." size="...">...</ComponentName>
- [All relevant spec details from the PDF]`
```

#### 6b. Add to DESIGN_MD

In the `DESIGN_MD` string in `specs.ts`, add a new `### ComponentName` subsection under `## Components`. Follow the same format as the Button and Input entries: Role, Shape/Radius, Implementation path, React API, Props table, State/Variant token map.

### 7. Add web UI section in page.tsx

#### 7a. Sidebar nav item

In `app/page.tsx`, inside the Components `<div className="nav-section">` block, add:
```tsx
<button className="nav-item" data-section="component-id" onClick={() => scrollTo('component-id')}><span />ComponentName</button>
```

Place it in alphabetical or logical order within the Components group.

#### 7b. Section body

Add a new `<div className="section" id="component-id">` after the Cards section (before the AI Tools divider). Use this pattern:

```tsx
{/* ── ComponentName ───────────────────────────────── */}
<div className="section" id="component-id">
  <div className="eyebrow"><span className="eyebrow-num">NN ·</span>Components</div>
  {renderSectionHeader('componentid', 'ComponentName', 'Short subtitle describing the component')}
  <div className="comp-section">
    <div className="comp-label">Variants</div>
    <div className="comp-stage">
      {/* Live demo using the actual component */}
      <ComponentName>Example</ComponentName>
      <ComponentName variant="...">Example</ComponentName>
    </div>
  </div>
  {/* Add more comp-section blocks for sizes, states, etc. */}
</div>
```

Add a `<div className="divider" />` before or after as needed to match the existing section rhythm (dividers appear between foundation/component groups, not between every section).

Don't forget to add the new component to the import list at the top of `page.tsx`.

### 8. Update public/llms.txt

Open `public/llms.txt` and add a new component block under `## COMPONENTS`, following the exact existing format:

```
### ComponentName
Shape: ... | Variants: ... | Sizes: ...
States: ...
Implementation: src/funds-lite/components/ComponentName.tsx
React API: <ComponentName variant="..." />
Props: ...

Token map:
- variant1: bg ... text ...
- variant2: ...
```

---

## Style constraints (always enforce)

- Spacing: only 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48px
- Radius: 9999px (pill), 12px (card), 8px (input), 6px (chip)
- Weights: 500 or 700 only
- Colors: only `var(--*)` tokens — never raw hex in component code
- No emoji anywhere

## Output

After completing all steps, report:
- Component created: `src/funds-lite/components/ComponentName.tsx`
- Files updated: list each of the 6 touch points
- Live at: the section ID in the web UI
- Any decisions made (e.g. variants inferred from PDF, props assumed)
