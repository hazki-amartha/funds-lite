'use client'

import { useEffect, useRef } from 'react'

// ── Design token data (source: tailwind.config.ts) ──────────────────────────

const COLOR_SCALES: Record<string, string[]> = {
  Brand: ['#FEF3FF', '#E5B8EF', '#D68EE4', '#A642B7', '#853291', '#732C7C', '#612966', '#3D1042'],
  Neutral: ['#FFFFFF', '#F9FAF8', '#E5E7EB', '#C6CAD0', '#8E95A3', '#6B7280', '#525C6A', '#111928'],
  Blue: ['#EDF7FF', '#BCE0F7', '#70B7E5', '#056DCE', '#0457A5', '#03417C', '#022C52'],
  Green: ['#E4FCEF', '#A2EDC3', '#4BDB98', '#009C6A', '#007D55', '#005E40', '#003E2A'],
  Orange: ['#FDF4E9', '#FCDDAB', '#FABF77', '#F7941D', '#E0771B', '#AD540A', '#70320D'],
  Red: ['#FFF4F3', '#FFD9D6', '#F3726D', '#D73630', '#AC2B26', '#81201D', '#4C0C0A'],
  Yellow: ['#FFFED9', '#FFF4A9', '#FCE677', '#EAB20B', '#C69608', '#996F03', '#6A4103'],
}

const TYPE_SCALE = [
  { cls: 'text-24', spec: '24px / 700 / −0.02em', size: '24px', weight: 700, ls: '-0.02em', sample: 'Heading 24', uppercase: false },
  { cls: 'text-20', spec: '20px / 700 / −0.01em', size: '20px', weight: 700, ls: '-0.01em', sample: 'Heading 20', uppercase: false },
  { cls: 'text-18', spec: '18px / 500 / 0', size: '18px', weight: 500, ls: '0', sample: 'Body 18 — primary reading size for dashboards.', uppercase: false },
  { cls: 'text-16', spec: '16px / 500 / 0', size: '16px', weight: 500, ls: '0', sample: 'Body 16 — secondary paragraphs and descriptions.', uppercase: false },
  { cls: 'text-14', spec: '14px / 500 / 0', size: '14px', weight: 500, ls: '0', sample: 'Body 14 — compact data tables and labels.', uppercase: false },
  { cls: 'text-12', spec: '12px / 500 / +0.04em', size: '12px', weight: 500, ls: '0.04em', sample: 'LABEL / CAPTION', uppercase: true },
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
Read the full spec: https://funds-manifest.vercel.app/llms.txt

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

[radius]
button        = 9999px (pill)
input         = 8px
card          = 12px
sm            = 6px

[guardrails]
no-arbitrary  = never use w-[x] or text-[#xxx] Tailwind syntax
no-extra-hex  = only use hex values listed above
font-only     = Inter only, no other Google Fonts`

const DESIGN_MD = `# FunDS Lite — DESIGN.md
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

### Brand
- Primary:      #853291
- Primary Dark: #732C7C  (hover/pressed)
- Primary Tint: #FEF3FF  (backgrounds, badge fills)

### Typography
- Font Family: Inter
- Weights: 500 (regular), 700 (bold) — no others
- Scale: 24, 20, 18, 16, 14, 12, 10px

### Semantic Text Colors
- Default:     #111928  (neutral-900)
- Caption:     #6B7280  (neutral-600)
- Disabled:    #8E95A3  (neutral-500)
- Placeholder: #C6CAD0  (neutral-400)
- Link:        #853291  (primary-500)

### Spacing (4px rhythm)
Valid values: 0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48px

### Border Radius
- Small:   6px
- Input:   8px
- Button:  9999px (pill shape)
- Card:    12px
- Large:   20px

### Status Colors
- Info:    #056DCE (blue-500)
- Success: #009C6A (green-500)
- Warning: #F7941D (orange-500)
- Danger:  #D73630 (red-500)

### Component Variants
**Button**: primary, secondary, outline/tertiary, ghost, danger — shape: pill (9999px) — sizes: xs, sm, default/md, lg, xl
**Input**: default, prefix/suffix, valid, error — radius: 8px — sizes: sm, default, lg
**Badge**: primary, blue, green, orange, red, yellow, neutral
**Card**: surface container with 12px radius and neutral-200 border

### AI Guardrails
- Only use hex values from this spec
- Only Inter at weight 500 or 700
- Only spacing values from the scale above
- No arbitrary Tailwind values
`

// ── Sections for scroll-spy ──────────────────────────────────────────────────
const NAV_SECTIONS = [
  'overview', 'colors', 'typography', 'spacing', 'tokens',
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
    ta.style.cssText = 'position:fixed;opacity:0;pointer-events:none'
    document.body.appendChild(ta)
    ta.focus()
    ta.select()
    try { document.execCommand('copy'); showToast(label ?? 'Copied!') }
    catch { showToast('Copy failed — select text manually') }
    document.body.removeChild(ta)
  }

  function copyText(text: string, label?: string) {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => showToast(label ?? 'Copied!'))
        .catch(() => fallbackCopy(text, label))
    } else {
      fallbackCopy(text, label)
    }
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
          <button className="nav-item" data-section="tokens" onClick={() => scrollTo('tokens')}>    <span />Token Reference</button>
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
            <div className="section-header">
              <h2 className="section-title">Colors</h2>
              <p className="section-sub">Hover a tile to see hex · click to copy</p>
            </div>
            {Object.entries(COLOR_SCALES).map(([name, colors]) => (
              <div className="color-row" key={name}>
                <span className="color-label">{name}</span>
                {colors.map((hex) => (
                  <div
                    key={hex}
                    className="color-tile"
                    style={{ background: hex }}
                    data-hex={hex}
                    title={hex}
                    onClick={() => copyText(hex, `${hex} copied!`)}
                  />
                ))}
              </div>
            ))}
          </div>

          <div className="divider" />

          {/* ── Typography ───────────────────────────────────── */}
          <div className="section" id="typography">
            <div className="eyebrow"><span className="eyebrow-num">02 ·</span>Foundations</div>
            <div className="section-header">
              <h2 className="section-title">Typography</h2>
              <p className="section-sub">Inter · weights <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--primary-50)', color: 'var(--primary-500)', padding: '2px 6px', borderRadius: 4 }}>500</code> and <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--primary-50)', color: 'var(--primary-500)', padding: '2px 6px', borderRadius: 4 }}>700</code> only</p>
            </div>
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
            <div className="section-header">
              <h2 className="section-title">Spacing &amp; Sizing</h2>
              <p className="section-sub">4px base rhythm · click row to copy px value</p>
            </div>
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
          </div>

          <div className="divider" />

          {/* ── Token Reference ──────────────────────────────── */}
          <div className="section" id="tokens">
            <div className="eyebrow"><span className="eyebrow-num">04 ·</span>Foundations</div>
            <div className="section-header">
              <h2 className="section-title">Token Reference</h2>
              <p className="section-sub">Semantic aliases — prefer these over raw color classes in components</p>
            </div>
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

          <div className="divider" />

          {/* ── Buttons ──────────────────────────────────────── */}
          <div className="section" id="buttons">
            <div className="eyebrow"><span className="eyebrow-num">05 ·</span>Components</div>
            <div className="section-header">
              <h2 className="section-title">Buttons</h2>
              <p className="section-sub">Trigger an action or event — four variants × five sizes</p>
            </div>
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
            <div className="eyebrow"><span className="eyebrow-num">06 ·</span>Components</div>
            <div className="section-header">
              <h2 className="section-title">Inputs</h2>
              <p className="section-sub">Retrieve text from a user — supports prefix, suffix, and validation states</p>
            </div>
            <div className="g2">
              <div>
                <div className="comp-label">Default sizes</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                  <input className="ds-inp" style={{ fontSize: 12, padding: '6px 10px' }} placeholder="Small" />
                  <input className="ds-inp" placeholder="Default" />
                  <input className="ds-inp" style={{ fontSize: 15, padding: '10px 14px' }} placeholder="Large" />
                </div>
              </div>
              <div>
                <div className="comp-label">Prefix &amp; Suffix</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                  <div className="ds-inp-wrap">
                    <span className="ds-inp-prefix">$</span>
                    <input className="ds-inp" placeholder="0.00" style={{ borderRadius: '0 8px 8px 0' }} />
                  </div>
                  <div className="ds-inp-wrap">
                    <input className="ds-inp ds-inp-pre-suffix" placeholder="fund-name" />
                    <span className="ds-inp-suffix">.vercel.app</span>
                  </div>
                </div>
              </div>
              <div>
                <div className="comp-label">Validation</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                  <input className="ds-inp ds-inp-valid" defaultValue="valid@fund.com" readOnly />
                  <input className="ds-inp ds-inp-error" defaultValue="bad-input@" readOnly />
                </div>
              </div>
              <div>
                <div className="comp-label">Select &amp; Textarea</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 10 }}>
                  <select className="ds-inp" style={{ cursor: 'pointer' }}>
                    <option>Equity Fund</option>
                    <option>Debt Fund</option>
                    <option>Real Estate</option>
                  </select>
                  <textarea className="ds-inp" style={{ resize: 'vertical', minHeight: 64 }} placeholder="Fund description…" />
                </div>
              </div>
            </div>
          </div>

          {/* ── Badges ───────────────────────────────────────── */}
          <div className="section" id="badges">
            <div className="eyebrow"><span className="eyebrow-num">07 ·</span>Components</div>
            <div className="section-header">
              <h2 className="section-title">Badges</h2>
              <p className="section-sub">Status indicators and categorical labels</p>
            </div>
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
            <div className="eyebrow"><span className="eyebrow-num">08 ·</span>Components</div>
            <div className="section-header">
              <h2 className="section-title">Cards</h2>
              <p className="section-sub">Surface container for grouped fund information</p>
            </div>
            <div className="g2">
              <div className="demo-card">
                <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Northstar Fund III</div>
                <div style={{ fontSize: 13, color: 'var(--neutral-600)', marginBottom: 16 }}>Series B · Growth Equity</div>
                <div className="stat-row">
                  <div className="stat"><div className="stat-label">AUM</div><div className="stat-val" style={{ color: 'var(--primary-500)' }}>$48M</div></div>
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
                  Q1 2026 distribution notice requires LP confirmation before May 1.
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
            <div className="eyebrow"><span className="eyebrow-num">09 ·</span>AI Tools</div>
            <div className="section-header">
              <h2 className="section-title">System Prompts</h2>
              <p className="section-sub">Copy into Claude or Cursor to enforce token compliance on every generation</p>
            </div>
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
            <div className="eyebrow"><span className="eyebrow-num">10 ·</span>AI Tools</div>
            <div className="section-header">
              <h2 className="section-title">llms.txt Spec</h2>
              <p className="section-sub">Machine-readable endpoint — one fetch gives an LLM the complete system</p>
            </div>
            <div className="notice">
              <strong>AI Agents:</strong> Fetch <code>https://funds-manifest.vercel.app/llms.txt</code> to get the full
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
