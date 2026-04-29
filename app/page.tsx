'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import {
  CLAUDE_PROMPT,
  Button,
  COLOR_SCALES,
  CURSOR_RULES,
  DESIGN_MD,
  Input,
  LAYOUT_PATTERNS,
  NAV_SECTIONS,
  RADII,
  SECTION_SPECS,
  SPACINGS,
  TOKENS,
  TYPE_SCALE,
} from '@/src/funds-lite'

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
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Tertiary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Destructive</Button>
              </div>
            </div>
            <div className="comp-section">
              <div className="comp-label">States</div>
              <div className="comp-stage">
                <Button>Primary</Button>
                <Button disabled>Disabled</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="outline">Tertiary</Button>
                <Button variant="outline" disabled>Disabled</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="ghost" disabled>Disabled</Button>
              </div>
            </div>
            <div className="comp-section">
              <div className="comp-label">Sizes</div>
              <div className="comp-stage">
                <Button size="xs">XSmall</Button>
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">XLarge</Button>
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
                <Input label="Small" size="sm" placeholder="Placeholder" />
                <Input label="Medium" placeholder="Placeholder" />
                <Input label="Large" size="lg" placeholder="Placeholder" />
              </div>
            </div>
            <div className="g2">
              <div>
                <div className="comp-label">Core states</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
                  <Input label="Default" placeholder="Placeholder" />
                  <Input label="Filled" defaultValue="This is the input" readOnly />
                  <Input label="Typing" state="focus" defaultValue="Placeholder|" readOnly />
                </div>
              </div>
              <div>
                <div className="comp-label">Prefix, suffix, icons</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
                  <Input label="Prefix" prefix="Rp" prefixInteractive prefixButtonProps={{ 'aria-label': 'Choose currency' }} placeholder="Type here" />
                  <Input label="Suffix" suffix="Gram" defaultValue="This is the input" readOnly />
                  <Input label="Right icon" suffix="◔" suffixInteractive suffixButtonProps={{ 'aria-label': 'Toggle visibility' }} defaultValue="••••••••••" readOnly />
                </div>
              </div>
              
              <div>
                <div className="comp-label">Additional info</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
                  <Input label="Label" optionalText="Optional" placeholder="Placeholder" />
                  <Input
                    label="Label"
                    required
                    description="Put the description here"
                    helperText="You can put the helper here."
                    placeholder="Placeholder"
                  />
                </div>
              </div>
              <div>
                <div className="comp-label">Error &amp; disabled</div>
                <div className="comp-stage" style={{ flexDirection: 'column', alignItems: 'stretch', gap: 14 }}>
                  <Input label="Error (default)" state="error" defaultValue="Placeholder" helperText="You can put error message here." readOnly />
                  <Input label="Error (while typing)" state="error" className="ds-inp-focus" defaultValue="Placeholder|" helperText="You can put error message here." readOnly />
                  <Input label="Disabled" defaultValue="Placeholder" readOnly disabled />
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
                  <Button size="sm">Review</Button>
                  <Button variant="outline" size="sm">Dismiss</Button>
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
