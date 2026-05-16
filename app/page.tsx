'use client'

import Image from 'next/image'
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Home, PlusCircle, ScanLine, Wallet, FileText } from 'lucide-react'
import {
  CLAUDE_PROMPT,
  Badge,
  BottomSheet,
  Button,
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
  Toggle,
} from '@/src/funds-lite'

export default function ManifestPage() {
  const toastRef = useRef<HTMLDivElement>(null)
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)
  const [sheetFullOpen, setSheetFullOpen] = useState(false)
  const [navbarActive, setNavbarActive] = useState('home')

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

  function renderSectionHeader(sectionId: keyof typeof SECTION_SPECS, eyebrowNum: string, eyebrowCat: string, title: string, sub: ReactNode) {
    return (
      <div className="section-header">
        <div className="section-eyebrow-row">
          <div className="eyebrow"><span className="eyebrow-num">{eyebrowNum}</span>{eyebrowCat}</div>
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
        <h2 className="section-title">{title}</h2>
        <p className="section-sub">{sub}</p>
      </div>
    )
  }

  function stageWrap(label: string, variants: string, children: ReactNode, style?: CSSProperties) {
    return (
      <div className="comp-stage-wrap">
        <div className="comp-stage" style={style}>{children}</div>
        <div className="comp-stage-footer">
          <span className="comp-stage-lbl">{label}</span>
          {variants && <span className="comp-stage-variants">{variants}</span>}
        </div>
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
          <div className="sidebar-logo-lockup">
            <Image
              className="sidebar-logo-image"
              src="/logo.svg"
              alt="FunDS Lite"
              width={235}
              height={33}
              priority
            />
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
          <button className="nav-item" data-section="toggles" onClick={() => scrollTo('toggles')}><span />Toggles</button>
          <button className="nav-item" data-section="selectable-cards" onClick={() => scrollTo('selectable-cards')}><span />Selectable Cards</button>
          <button className="nav-item" data-section="modals" onClick={() => scrollTo('modals')}><span />Modals</button>
          <button className="nav-item" data-section="bottom-sheets" onClick={() => scrollTo('bottom-sheets')}><span />Bottom Sheets</button>
          <button className="nav-item" data-section="navigation-bars" onClick={() => scrollTo('navigation-bars')}><span />Navigation</button>
        </div>
        <div className="nav-section">
          <div className="nav-label">AI Tools</div>
          <button className="nav-item" data-section="prompts" onClick={() => scrollTo('prompts')}><span />System Prompts</button>
          <button className="nav-item" data-section="llms" onClick={() => scrollTo('llms')}>   <span />llms.txt Spec</button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────── */}
      <main className="main">
        <div className="content">

          {/* ── Overview ─────────────────────────────────────── */}
          <div className="intro" id="overview">
            <div className="eyebrow">Intro</div>
            <h1 className="intro-title">FunDS Rapid Prototyping Kit</h1>
            <p className="intro-desc">
              Use this lightweight subset of FunDS to spin up high-fidelity mobile and dashboard features without the overhead of the full library.
              It contains the essential tokens and core components needed for quick iterations.
            </p>
            <div className="topbar-actions">
              <button className="tb-btn tb-btn-brand" onClick={downloadMd}>
                Download DESIGN.md
              </button>
              <button className="tb-btn tb-btn-ghost" onClick={() => copyText(CLAUDE_PROMPT, 'AI prompt copied!')}>
                Copy Prompt
              </button>
              <button className="tb-btn tb-btn-ghost" onClick={() => copyText(CURSOR_RULES, '.cursorrules copied!')}>
                Copy .cursorrules
              </button>
              <a className="tb-btn tb-btn-ghost" href="/llms.txt" target="_blank" rel="noopener">
                View llms.txt
              </a>
            </div>
          </div>

          {/* ── Colors ───────────────────────────────────────── */}
          <div className="section" id="colors">
            {renderSectionHeader('colors', '01 ·', 'Foundations', 'Colors', 'Hover a tile to see hex · click to copy')}
            {Object.entries(COLOR_SCALES).map(([name, scale]) => (
              <div className="color-row" key={name}>
                <span className="color-label">{name}</span>
                {scale.filter(({ scale: s }) => !(name === 'Brand' && s === '300') && !(name === 'Neutral' && s === 'white')).map(({ scale, hex }) => (
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
              <div style={{ background: 'var(--fds-bg-elev)', border: '1px solid var(--fds-line)', borderRadius: 8, overflow: 'hidden' }}>
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
            {renderSectionHeader('typography', '02 ·', 'Foundations', 'Typography', <>Inter · weights <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--primary-50)', color: 'var(--primary-500)', padding: '2px 6px', borderRadius: 4 }}>500</code> and <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--primary-50)', color: 'var(--primary-500)', padding: '2px 6px', borderRadius: 4 }}>700</code> only</>)}
            <div style={{ border: '1px solid var(--fds-line)', borderRadius: 8, overflow: 'hidden' }}>
              {TYPE_SCALE.map((t, i) => (
                <div key={t.cls} style={{ padding: '10px 16px 12px', borderBottom: i < TYPE_SCALE.length - 1 ? '1px solid var(--fds-line)' : 'none' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span className="type-cls">{t.cls}</span>
                    <span className="type-spec-txt">{t.spec}</span>
                  </div>
                  <div style={{
                    fontSize: t.size,
                    fontWeight: t.weight,
                    letterSpacing: t.ls,
                    textTransform: t.uppercase ? 'uppercase' : 'none',
                    lineHeight: 1.2,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {t.sample}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="divider" />

          {/* ── Spacing & Sizing ─────────────────────────────── */}
          <div className="section" id="spacing">
            {renderSectionHeader('spacing', '03 ·', 'Foundations', 'Spacing & Sizing', '4px base rhythm · click row to copy px value')}
            {(() => {
              const spUsage: Record<string, string> = {
                '8px':  'card-gap',
                '12px': 'section-gap · card-padding',
                '16px': 'page-padding-x · page-padding-top · topbar-padding-x',
                '48px': 'topbar-height',
              }
              const radiiDemo = [
                { k: '8',    v: '8px',  usage: 'inputs · tags' },
                { k: '12',   v: '12px', usage: 'cards' },
                { k: '16',   v: '16px', usage: 'modals · bottom sheets' },
                { k: '20',   v: '20px', usage: '' },
                { k: 'full', v: '∞',    usage: 'buttons · pills' },
              ]
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <div className="comp-label">Spacing scale</div>
                    <div style={{ background: 'var(--fds-bg-elev)', border: '1px solid var(--fds-line)', borderRadius: 8, overflow: 'hidden' }}>
                      <table className="tk-tbl">
                        <thead>
                          <tr><th>Token</th><th>px</th><th style={{ width: '160px' }}>Scale</th><th>rem</th><th>Usage</th></tr>
                        </thead>
                        <tbody>
                          {SPACINGS.map((s) => (
                            <tr key={s.v} onClick={() => copyText(s.px, `${s.px} copied!`)}>
                              <td className="tk-key">space-{s.v}</td>
                              <td className="tk-val">{s.px}</td>
                              <td><div className="sp-bar" style={{ width: Math.max(parseInt(s.px) || 0, 2) }} /></td>
                              <td className="tk-val">{s.r}</td>
                              <td className="tk-desc">{spUsage[s.px] ?? ''}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div>
                    <div className="comp-label">Border radius</div>
                    <div style={{ background: 'var(--fds-bg-elev)', border: '1px solid var(--fds-line)', borderRadius: 8, overflow: 'hidden' }}>
                      <table className="tk-tbl">
                        <thead>
                          <tr><th>Token</th><th>Value</th><th>Preview</th><th>Usage</th></tr>
                        </thead>
                        <tbody>
                          {radiiDemo.map((r) => {
                            const px = r.v === '∞' ? '9999px' : r.v
                            return (
                              <tr key={r.k} onClick={() => copyText(px, `${px} copied!`)}>
                                <td className="tk-key">rounded-{r.k}</td>
                                <td className="tk-val">{r.v}</td>
                                <td>
                                  <div className="r-corner-wrap">
                                    <div className="r-corner-shape" style={{ borderRadius: px }} />
                                  </div>
                                </td>
                                <td className="tk-desc">{r.usage}</td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )
            })()}
          </div>

          <div className="divider" />

          {/* ── Components (2-col grid) ───────────────────────── */}
          <div className="comp-grid">

          {/* ── Buttons ──────────────────────────────────────── */}
          <div className="section" id="buttons">
            {renderSectionHeader('buttons', '04 ·', 'Components', 'Buttons', 'Trigger an action or event — four variants × five sizes')}
            <div className="comp-section">
              {stageWrap('variants', 'primary · secondary · outline · ghost · danger', <>
                <Button>Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Tertiary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="danger">Destructive</Button>
              </>)}
            </div>
            <div className="comp-section">
              {stageWrap('states', 'default · disabled', <>
                <Button>Primary</Button>
                <Button disabled>Disabled</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="secondary" disabled>Disabled</Button>
                <Button variant="outline">Tertiary</Button>
                <Button variant="outline" disabled>Disabled</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="ghost" disabled>Disabled</Button>
              </>)}
            </div>
            <div className="comp-section">
              {stageWrap('sizes', 'xs · sm · md · lg · xl', <>
                <Button size="xs">XSmall</Button>
                <Button size="sm">Small</Button>
                <Button>Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">XLarge</Button>
              </>)}
            </div>
          </div>

          {/* ── Inputs ───────────────────────────────────────── */}
          <div className="section" id="inputs">
            {renderSectionHeader('inputs', '05 ·', 'Components', 'Inputs', 'Text field guidance from the April 28, 2025 FunDS spec: sizes, states, metadata, affixes, icons, and tap-area variants')}
            <div className="g3">
              <div>
                {stageWrap('sizes', 'sm · md · lg', <>
                  <Input label="Small" size="sm" placeholder="Placeholder" />
                  <Input label="Medium" placeholder="Placeholder" />
                  <Input label="Large" size="lg" placeholder="Placeholder" />
                </>, { flexDirection: 'column', alignItems: 'stretch', gap: 14 })}
              </div>
              <div>
                {stageWrap('states', 'default · filled · focus', <>
                  <Input label="Default" placeholder="Placeholder" />
                  <Input label="Filled" defaultValue="This is the input" readOnly />
                  <Input label="Typing" state="focus" defaultValue="Placeholder|" readOnly />
                </>, { flexDirection: 'column', alignItems: 'stretch', gap: 14 })}
              </div>
              <div>
                {stageWrap('affixes', 'prefix · suffix · icon', <>
                  <Input label="Prefix" prefix="Rp" prefixInteractive prefixButtonProps={{ 'aria-label': 'Choose currency' }} placeholder="Type here" />
                  <Input label="Suffix" suffix="Gram" defaultValue="This is the input" readOnly />
                  <Input label="Right icon" suffix="◔" suffixInteractive suffixButtonProps={{ 'aria-label': 'Toggle visibility' }} defaultValue="••••••••••" readOnly />
                </>, { flexDirection: 'column', alignItems: 'stretch', gap: 14 })}
              </div>
            </div>
          </div>

          {/* ── Badges ───────────────────────────────────────── */}
          <div className="section" id="badges">
            {renderSectionHeader('badges', '06 ·', 'Components', 'Badges', 'Status indicators and categorical labels — variants × intents × sizes')}
            <div className="comp-section">
              {stageWrap('subtle', 'primary · blue · green · orange · red · yellow · neutral', <>
                <Badge intent="primary">Active</Badge>
                <Badge intent="blue">Processing</Badge>
                <Badge intent="green">Funded</Badge>
                <Badge intent="orange">Pending</Badge>
                <Badge intent="red">Overdue</Badge>
                <Badge intent="yellow">Review</Badge>
                <Badge intent="neutral">Archived</Badge>
              </>)}
            </div>
            <div className="comp-section">
              {stageWrap('solid', 'primary · blue · green · orange · red · neutral', <>
                <Badge variant="solid" intent="primary">Label</Badge>
                <Badge variant="solid" intent="blue">Label</Badge>
                <Badge variant="solid" intent="green">Label</Badge>
                <Badge variant="solid" intent="orange">Label</Badge>
                <Badge variant="solid" intent="red">Label</Badge>
                <Badge variant="solid" intent="neutral">Label</Badge>
              </>)}
            </div>
            <div className="comp-section">
              {stageWrap('sizes', 'sm · md', <>
                <Badge variant="solid" size="sm">Small</Badge>
                <Badge variant="solid" size="md">Medium</Badge>
              </>)}
            </div>
          </div>

          {/* ── Cards ────────────────────────────────────────── */}
          <div className="section" id="cards">
            {renderSectionHeader('cards', '07 ·', 'Components', 'Cards', 'Surface container for grouped information')}
            <div className="comp-section">
              {stageWrap('variants', '.fds-card', <>
                <div className="demo-card" style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>Grassroots Growth Series</div>
                  <div style={{ fontSize: 13, color: 'var(--neutral-600)', marginBottom: 16 }}>Series 3 · Balanced</div>
                  <div className="stat-row">
                    <div className="stat"><div className="stat-label">AUM</div><div className="stat-val" style={{ color: 'var(--primary-500)' }}>Rp48M</div></div>
                    <div className="stat"><div className="stat-label">IRR</div><div className="stat-val" style={{ color: 'var(--green-600)' }}>18.4%</div></div>
                    <div className="stat"><div className="stat-label">LPs</div><div className="stat-val">24</div></div>
                  </div>
                </div>
                <div className="demo-card" style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>Capital Call</div>
                    <Badge intent="orange">Pending</Badge>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--neutral-600)' }}>
                    Q1 2026 distribution notice requires confirmation before May 1.
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                    <Button size="sm">Review</Button>
                    <Button variant="outline" size="sm">Dismiss</Button>
                  </div>
                </div>
              </>, { alignItems: 'stretch' })}
            </div>
          </div>

          {/* ── Toggles ──────────────────────────────────────── */}
          <div className="section" id="toggles">
            {renderSectionHeader('toggles', '08 ·', 'Components', 'Toggles', 'Binary on/off switch — 2 sizes, 4 states, optional label and helper')}
            <div className="g2">
              <div className="comp-section" style={{ margin: 0 }}>
                {stageWrap('states', 'on · off · on-disabled · off-disabled', <>
                  <Toggle defaultChecked />
                  <Toggle />
                  <Toggle defaultChecked disabled />
                  <Toggle disabled />
                </>)}
              </div>
              <div className="comp-section" style={{ margin: 0 }}>
                {stageWrap('sizes', 'sm · md', <>
                  <Toggle defaultChecked size="sm" label="Small" />
                  <Toggle defaultChecked size="md" label="Medium" />
                </>)}
              </div>
            </div>
          </div>

          {/* ── Selectable Cards ─────────────────────────────── */}
          <div className="section" id="selectable-cards">
            {renderSectionHeader('selectable-cards', '09 ·', 'Components', 'Selectable Cards', 'Card-shaped radio / checkbox — tap the whole card to select')}
            <div className="g2">
              <div className="comp-section" style={{ margin: 0 }}>
                {stageWrap('states', 'default · selected · disabled', <>
                  <SelectableCard name="state-demo" title="This is the card title" description="Enter description here, max. 2 lines" />
                  <SelectableCard name="state-demo" title="This is the card title" description="Enter description here, max. 2 lines" defaultChecked />
                  <SelectableCard name="state-demo-2" title="This is the card title" description="Enter description here, max. 2 lines" disabled />
                </>, { flexDirection: 'column', alignItems: 'stretch', gap: 12 })}
              </div>
              <div className="comp-section" style={{ margin: 0 }}>
                {stageWrap('variants', 'double content · prefix icon · slot', <>
                  <SelectableCard name="dbl" secondary={<><span>Jangka waktu</span><span style={{ fontSize: 14, fontWeight: 700, color: 'var(--neutral-900)' }}>9 bulan</span></>} title={<><span style={{ fontSize: 12, fontWeight: 500, color: 'var(--neutral-600)' }}>Keuntungan</span><span style={{ fontSize: 14, fontWeight: 700, color: 'var(--green-600)' }}>Rp1.900.000</span></>} defaultChecked />
                  <SelectableCard
                    name="prefix"
                    title="This is the card title"
                    description="Enter description here, max. 2 lines"
                    prefixIcon={
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="8" cy="8" r="6" /><path d="M8 4v4l3 1.5" strokeLinecap="round" /></svg>
                    }
                  />
                  <SelectableCard
                    name="slot"
                    title="This is the card title"
                    description="Enter description here, max. 2 lines"
                    slot="Swappable component"
                  />
                </>, { flexDirection: 'column', alignItems: 'stretch', gap: 12 })}
              </div>
            </div>
          </div>

          {/* ── Modals ───────────────────────────────────────── */}
          <div className="section" id="modals">
            {renderSectionHeader('modals', '10 ·', 'Components', 'Modals', 'Temporary dialog windows — default + dialog variants × 3 sizes')}
            <div className="comp-section">
              {stageWrap('live demo', 'default · dialog', <>
                <Button onClick={() => setModalOpen(true)}>Open default modal</Button>
                <Button variant="outline" onClick={() => setDialogOpen(true)}>Open success dialog</Button>
              </>)}
            </div>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Title"
              description="Write something here, something helpful maybe? Or ask our beloved copywriter to write it for you ;)"
              slot={<span>Swappable component<br /><span style={{ fontWeight: 500, color: 'var(--primary-500)' }}>Swap this with your local component you&apos;ve created.</span></span>}
              primaryAction={<Button onClick={() => setModalOpen(false)}>CTA Here</Button>}
              secondaryAction={<Button variant="ghost" onClick={() => setModalOpen(false)}>CTA Here</Button>}
            />
            <Modal
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              variant="dialog"
              intent="success"
              title="Successfully Moved Mitra"
              description="3 mitra have been successfully transferred to the Majelis Turatea."
              primaryAction={<Button onClick={() => setDialogOpen(false)}>Close</Button>}
            />
          </div>

          {/* ── Bottom Sheets ────────────────────────────────── */}
          <div className="section" id="bottom-sheets">
            {renderSectionHeader('bottom-sheets', '11 ·', 'Components', 'Bottom Sheets', 'Mobile sheets that slide up from the bottom — default + fullscreen')}
            <div className="comp-section">
              {stageWrap('live demo', 'default · fullscreen', <>
                <Button onClick={() => setSheetOpen(true)}>Open bottom sheet</Button>
                <Button variant="outline" onClick={() => setSheetFullOpen(true)}>Open fullscreen</Button>
              </>)}
            </div>
            <BottomSheet
              open={sheetOpen}
              onClose={() => setSheetOpen(false)}
              title="Title here, max 1 line"
              description="Put the description here, make it clear and concise. No more than 3 lines."
              slot={<span>Swappable component<br /><span style={{ fontWeight: 500, color: 'var(--primary-500)' }}>Swap this with your local component you&apos;ve created.</span></span>}
              primaryAction={<Button onClick={() => setSheetOpen(false)}>Lanjutkan</Button>}
              secondaryAction={<Button variant="outline" onClick={() => setSheetOpen(false)}>Tutup</Button>}
            />
            <BottomSheet
              open={sheetFullOpen}
              onClose={() => setSheetFullOpen(false)}
              size="fullscreen"
              title="Title here, max 1 line"
              primaryAction={<Button onClick={() => setSheetFullOpen(false)}>Lanjutkan</Button>}
              secondaryAction={<Button variant="outline" onClick={() => setSheetFullOpen(false)}>Tutup</Button>}
            >
              <div style={{ flex: 1, minHeight: 240, color: 'var(--neutral-600)', fontSize: 13 }}>
                Scrollable fullscreen content goes here.
              </div>
            </BottomSheet>
          </div>

          {/* ── Navigation ───────────────────────────────────── */}
          <div className="section" id="navigation-bars">
            {renderSectionHeader('navigation-bars', '12 ·', 'Components', 'Navigation', 'Bottom tab bar and top app bar')}
            <div className="g2">
              <div className="comp-section" style={{ margin: 0 }}>
                {stageWrap('nav bar', 'default · badge',
                  <div style={{ border: '1px solid var(--fds-line)', borderRadius: 8, overflow: 'hidden', width: '100%', maxWidth: 360 }}>
                    <NavigationBar
                      items={[
                        { id: 'home', label: 'Home', icon: <Home size={20} />, active: navbarActive === 'home', onClick: () => setNavbarActive('home') },
                        { id: 'modal', label: 'Modal', icon: <PlusCircle size={20} />, badge: 1, active: navbarActive === 'modal', onClick: () => setNavbarActive('modal') },
                        { id: 'scan', label: 'Scan', icon: <ScanLine size={20} />, active: navbarActive === 'scan', onClick: () => setNavbarActive('scan') },
                        { id: 'celengan', label: 'Celengan', icon: <Wallet size={20} />, active: navbarActive === 'celengan', onClick: () => setNavbarActive('celengan') },
                        { id: 'transaksi', label: 'Transaksi', icon: <FileText size={20} />, active: navbarActive === 'transaksi', onClick: () => setNavbarActive('transaksi') },
                      ]}
                    />
                  </div>
                )}
              </div>
              <div className="comp-section" style={{ margin: 0 }}>
                {stageWrap('nav header', 'light · dark · trailing icons · link', <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 360 }}>
                  <div style={{ border: '1px solid var(--fds-line)', borderRadius: 8, overflow: 'hidden' }}>
                    <NavigationHeader title="Title here" showStatusBar />
                  </div>
                  <div style={{ borderRadius: 8, overflow: 'hidden' }}>
                    <NavigationHeader title="Title here" variant="dark" showStatusBar />
                  </div>
                  <div style={{ border: '1px solid var(--fds-line)', borderRadius: 8, overflow: 'hidden' }}>
                    <NavigationHeader
                      title="Title here"
                      showStatusBar
                      trailingIcons={[
                        <svg key="1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7" /><path d="M16 16l4 4" strokeLinecap="round" /></svg>,
                        <svg key="2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8a6 6 0 10-12 0c0 7-3 8-3 8h18s-3-1-3-8M10 21h4" /></svg>,
                      ]}
                    />
                  </div>
                  <div style={{ border: '1px solid var(--fds-line)', borderRadius: 8, overflow: 'hidden' }}>
                    <NavigationHeader title="Title here" showStatusBar link="Link" />
                  </div>
                </div>)}
              </div>
            </div>
          </div>

          </div>{/* end .comp-grid */}

          <div className="divider" />

          {/* ── System Prompts ───────────────────────────────── */}
          <div className="section" id="prompts">
            {renderSectionHeader('prompts', '14 ·', 'AI Tools', 'System Prompts', 'Copy into Claude or Cursor to enforce token compliance on every generation')}
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
            {renderSectionHeader('llms', '15 ·', 'AI Tools', 'llms.txt Spec', 'Machine-readable endpoint — one fetch gives an LLM the complete system')}
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
