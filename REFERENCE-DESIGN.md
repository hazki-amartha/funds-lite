---
version: "alpha"
name: "Nebula Protocol"
description: "Nebula Protocol Login Section is designed for authenticating users through a focused access flow. Key features include reusable structure, responsive behavior, and production-ready presentation. It is suitable for authentication screens in web products."
colors:
  primary: "#F97316"
  secondary: "#FFFFFF"
  tertiary: "#E6FF1A"
  neutral: "#FFFFFF"
  background: "#FFFFFF"
  surface: "#050505"
  text-primary: "#FFFFFF"
  text-secondary: "#FFFFFF"
  border: "#FFFFFF"
  accent: "#F97316"
typography:
  display-lg:
    fontFamily: "Inter"
    fontSize: "72px"
    fontWeight: 400
    lineHeight: "72px"
    letterSpacing: "-0.05em"
  body-md:
    fontFamily: "Inter"
    fontSize: "18px"
    fontWeight: 300
    lineHeight: "28px"
  label-md:
    fontFamily: "Inter"
    fontSize: "12px"
    fontWeight: 300
    lineHeight: "16px"
rounded:
  md: "0px"
  full: "9999px"
spacing:
  base: "4px"
  sm: "1px"
  md: "4px"
  lg: "6px"
  xl: "8px"
  gap: "4px"
  card-padding: "9px"
  section-padding: "40px"
components:
  button-secondary:
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.full}"
    padding: "8px"
  button-link:
    textColor: "{colors.secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "0px"
---

## Overview

- **Composition cues:**
  - Layout: Grid
  - Content Width: Full Bleed
  - Framing: Glassy
  - Grid: Strong

## Colors

The color system uses dark mode with #F97316 as the main accent and #FFFFFF as the neutral foundation.

- **Primary (#F97316):** Main accent and emphasis color.
- **Secondary (#FFFFFF):** Supporting accent for secondary emphasis.
- **Tertiary (#E6FF1A):** Reserved accent for supporting contrast moments.
- **Neutral (#FFFFFF):** Neutral foundation for backgrounds, surfaces, and supporting chrome.

- **Usage:** Background: #FFFFFF; Surface: #050505; Text Primary: #FFFFFF; Text Secondary: #FFFFFF; Border: #FFFFFF; Accent: #F97316

- **Gradients:** bg-gradient-to-b from-transparent to-transparent via-white/[0.04], bg-gradient-to-b from-white to-white/30 via-white/90, bg-gradient-to-b from-white/20 to-white/5, bg-gradient-to-br from-white/10 to-transparent via-white/[0.02]

## Typography

Typography relies on Inter across display, body, and utility text.

- **Display (`display-lg`):** Inter, 72px, weight 400, line-height 72px, letter-spacing -0.05em.
- **Body (`body-md`):** Inter, 18px, weight 300, line-height 28px.
- **Labels (`label-md`):** Inter, 12px, weight 300, line-height 16px.

## Layout

Layout follows a grid composition with reusable spacing tokens. Preserve the grid, full bleed structural frame before changing ornament or component styling. Use 4px as the base rhythm and let larger gaps step up from that cadence instead of introducing unrelated spacing values.

Treat the page as a grid / full bleed composition, and keep that framing stable when adding or remixing sections.

- **Layout type:** Grid
- **Content width:** Full Bleed
- **Base unit:** 4px
- **Scale:** 1px, 4px, 6px, 8px, 10px, 12px, 14px, 16px
- **Section padding:** 40px, 144px
- **Card padding:** 9px, 40px
- **Gaps:** 4px, 8px, 16px, 24px

## Elevation & Depth

Depth is communicated through glass, border contrast, and reusable shadow or blur treatments. Keep those recipes consistent across hero panels, cards, and controls so the page reads as one material system.

Surfaces should read as glass first, with borders, shadows, and blur only reinforcing that material choice.

- **Surface style:** Glass
- **Borders:** 1px #FFFFFF; 1px #000000
- **Shadows:** rgba(0, 0, 0, 0.8) 0px 8px 32px -8px; rgba(249, 115, 22, 0.6) 0px 0px 8px 0px; rgba(255, 255, 255, 0.1) 0px 0px 40px -10px
- **Blur:** 24px, 4px

### Techniques
- **Gradient border shell:** Use a thin gradient border shell around the main card. Wrap the surface in an outer shell with 12px padding and a 0px radius. Drive the shell with none so the edge reads like premium depth instead of a flat stroke. Keep the actual stroke understated so the gradient shell remains the hero edge treatment. Inset the real content surface inside the wrapper with a slightly smaller radius so the gradient only appears as a hairline frame.

## Shapes

Shapes rely on a tight radius system anchored by 12px and scaled across cards, buttons, and supporting surfaces. Icon geometry should stay compatible with that soft-to-controlled silhouette.

Use the radius family intentionally: larger surfaces can open up, but controls and badges should stay within the same rounded DNA instead of inventing sharper or pill-only exceptions.

- **Corner radii:** 12px, 31.2px, 32px, 9999px
- **Icon treatment:** Linear
- **Icon sets:** Solar

## Components

Anchor interactions to the detected button styles.

### Buttons
- **Secondary:** text #FFFFFF, radius 9999px, padding 8px, border 1px solid rgba(255, 255, 255, 0.15).
- **Links:** text #FFFFFF, radius 0px, padding 0px, border 0px solid rgb(229, 231, 235).

### Iconography
- **Treatment:** Linear.
- **Sets:** Solar.

## Do's and Don'ts

Use these constraints to keep future generations aligned with the current system instead of drifting into adjacent styles.

### Do
- Do use the primary palette as the main accent for emphasis and action states.
- Do keep spacing aligned to the detected 4px rhythm.
- Do reuse the Glass surface treatment consistently across cards and controls.
- Do keep corner radii within the detected 12px, 31.2px, 32px, 9999px family.

### Don't
- Don't introduce extra accent colors outside the core palette roles unless the page needs a new semantic state.
- Don't mix unrelated shadow or blur recipes that break the current depth system.
- Don't exceed the detected moderate motion intensity without a deliberate reason.

## Motion

Motion feels controlled and interface-led across text, layout, and section transitions. Timing clusters around 200ms and 150ms. Easing favors ease and cubic-bezier(0.4. Hover behavior focuses on text and color changes. Scroll choreography uses GSAP ScrollTrigger for section reveals and pacing.

**Motion Level:** moderate

**Durations:** 200ms, 150ms, 300ms

**Easings:** ease, cubic-bezier(0.4, 0, 0.2, 1)

**Hover Patterns:** text, color, stroke

**Scroll Patterns:** gsap-scrolltrigger

## WebGL

Reconstruct the graphics as a full-bleed background field using alpha, custom shaders. The effect should read as technical, meditative, and atmospheric: dot-matrix particle field with black and sparse spacing. Build it from dot particles + soft depth fade so the effect reads clearly. Animate it as slow breathing pulse. Interaction can react to the pointer, but only as a subtle drift. Preserve dom fallback.

**Id:** webgl

**Label:** WebGL

**Stack:** WebGL

**Insights:**
  - **Scene:**
    - **Value:** Full-bleed background field
  - **Effect:**
    - **Value:** Dot-matrix particle field
  - **Primitives:**
    - **Value:** Dot particles + soft depth fade
  - **Motion:**
    - **Value:** Slow breathing pulse
  - **Interaction:**
    - **Value:** Pointer-reactive drift
  - **Render:**
    - **Value:** alpha, custom shaders

**Techniques:** Dot matrix, Breathing pulse, Pointer parallax, Shader gradients, DOM fallback

**Code Evidence:**
  - **HTML reference:**
    - **Language:** html
    - **Snippet:**
      ```html
      <!-- WebGL Background -->
      <canvas id="webgl-bg" class="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-40"></canvas>

      <!-- Container Lines & Grid System -->
      ```
