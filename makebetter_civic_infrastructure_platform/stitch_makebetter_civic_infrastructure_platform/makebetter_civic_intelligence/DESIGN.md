---
name: MakeBetter Civic Intelligence
colors:
  surface: '#11131a'
  surface-dim: '#11131a'
  surface-bright: '#373941'
  surface-container-lowest: '#0c0e15'
  surface-container-low: '#191b23'
  surface-container: '#1d1f27'
  surface-container-high: '#282a31'
  surface-container-highest: '#33343d'
  on-surface: '#e2e2ec'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e2e2ec'
  inverse-on-surface: '#2e3038'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#5de6ff'
  on-secondary: '#00363e'
  secondary-container: '#00cbe6'
  on-secondary-container: '#00515d'
  tertiary: '#45dfa4'
  on-tertiary: '#003825'
  tertiary-container: '#00a574'
  on-tertiary-container: '#003120'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#a2eeff'
  secondary-fixed-dim: '#2fd9f4'
  on-secondary-fixed: '#001f25'
  on-secondary-fixed-variant: '#004e5a'
  tertiary-fixed: '#68fcbf'
  tertiary-fixed-dim: '#45dfa4'
  on-tertiary-fixed: '#002114'
  on-tertiary-fixed-variant: '#005137'
  background: '#11131a'
  on-background: '#e2e2ec'
  surface-variant: '#33343d'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.025em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  code-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  gutter-mobile: 0.75rem
  margin: 1.5rem
  margin-desktop: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style
The design system establishes a high-performance, municipal command-and-control paradigm that balances administrative authority with civic empathy. Tailored for municipal leadership, field crew dispatchers, and active citizens, the interface projects accountability, technological sophistication, and operational precision.

The visual theme synthesizes **Dark Glassmorphism** with utilitarian data visualization. It avoids hyper-glowing consumer aesthetics in favor of a measured, tactical execution: deep obsidian substrates, ambient refractive panels, crisp hairline boundaries, and vibrant spectral accents that communicate priority and operational velocity. The interface must feel instantaneous, calm under emergency conditions, and unmistakably authoritative.

## Colors
The color hierarchy is engineered for continuous day/night operations center monitoring and mobile tactical dispatch.

### Background & Glass Tokens
- **Canvas Base:** `#090B12` (absolute background floor).
- **Surface Layer 2:** `#101522` (navigation bars, side docks, structural wells).
- **Glass Panel Surface:** `rgba(255, 255, 255, 0.045)` (cards, contextual modals, inspector drawers).
- **Glass Accent Overlay:** `rgba(255, 255, 255, 0.08)` (hovered tiles, active states).
- **Hairline Border:** `rgba(255, 255, 255, 0.10)` (resting card outlines).
- **Hairline Border Highlight:** `rgba(255, 255, 255, 0.22)` (focused or interactive outlines).

### Semantic & Accents
- **Primary Electric Violet:** `#8B5CF6` (primary system triggers, verified milestones, core telemetry).
- **Secondary Cyan:** `#22D3EE` (routing data, telemetry overlays, department assignments).
- **Success Emerald:** `#34D399` (resolution, healthy municipal SLA, cleared alerts).
- **Warning Amber:** `#FBBF24` (pending triage, SLA at risk, escalation alerts).
- **Error / Danger Coral:** `#FB7185` (critical infrastructural hazards, SLA breach, system failures).

### Lifecycle Status Accents
- **Reported:** Deep Sky `#38BDF8`
- **Verified:** Electric Violet `#8B5CF6`
- **Assigned:** Cyan `#22D3EE`
- **In Progress:** Amber `#FBBF24`
- **Scheduled:** Indigo `#6366F1`
- **Resolved:** Emerald `#34D399`
- **Rejected:** Rose `#FB7185`

## Typography
Inter delivers systematic density, low optical distortion on dark substrates, and supreme legibility across dense geospatial metrics and tabular queues.

- **Tabular Figures:** All statistical totals, issue identifiers, coordinates, and countdown timers must use open-type tabular figures (`font-feature-settings: "tnum" 1, "cv05" 1`).
- **Hierarchy Rules:** Large headlines are reserved for high-level operations summaries and system dashboards. Secondary telemetry relies heavily on `label-sm` set in uppercase for rapid scannability under emergency triage conditions.
- **Micro-Contrast:** Text color tokens range from Primary White (`rgba(255, 255, 255, 0.95)`) for titles to Secondary Muted (`rgba(255, 255, 255, 0.65)`) for narrative copy, down to Subdued Metadata (`rgba(255, 255, 255, 0.40)`).

## Layout & Spacing
The layout employs a responsive 12-column fluid grid system paired with strict 8pt spatial intervals (utilizing a 4pt sub-grid for internal component micro-spacing).

### Screen Breakpoints & Reflow
- **Mobile (<768px):** Single-column stack, dynamic sliding bottom drawers for triage items, collapsed map interface. Gutters compress to `gutter-mobile` (`0.75rem`), outer margins to `margin-mobile` (`1rem`).
- **Tablet (768px - 1199px):** Adaptive split-view (collapsible list pane alongside telemetry viewport), 8-column layout with `1.25rem` gutters.
- **Desktop (1200px+):** Full 12-column persistent workspace: a 280px left command sidebar, flexible 4-column feed list, and dynamic multi-column canvas for geospatial visualization, operations dispatch, and AI triage telemetry. Canvas margins expand to `2rem`.

## Elevation & Depth
Elevation is achieved through optical translucency, controlled blur values, and chromatic rim lighting rather than dark dropshadows.

### Layer Architecture
1. **Base Surface (Z0):** Solid foundation `#090B12` without backdrop filtering.
2. **Structural Glass (Z1):** Background panels and list containers use `rgba(255, 255, 255, 0.045)` with `backdrop-filter: blur(16px)` and a continuous hairline stroke of `rgba(255, 255, 255, 0.10)`.
3. **Elevated Cards & Overlays (Z2):** Floating issue cards and interactive controls use `rgba(16, 21, 34, 0.70)` with `backdrop-filter: blur(24px)`, `box-shadow: 0 12px 32px -4px rgba(0, 0, 0, 0.65)`, and rim border `rgba(255, 255, 255, 0.14)`.
4. **Command Drawers & Modals (Z3):** Critical triage modals use `rgba(16, 21, 34, 0.88)` with `backdrop-filter: blur(32px)`, an outer shadow of `0 24px 64px -8px rgba(0, 0, 0, 0.85)`, and a top-edge highlight (`1px inset rgba(255, 255, 255, 0.20)`).

### Luminous Ambient Glows
Interactive alerts utilize radial gradient back-glows. High-priority items cast an ambient aura (`0 0 40px -10px rgba(139, 92, 246, 0.25)` for Violet or `0 0 40px -10px rgba(34, 211, 238, 0.20)` for Cyan) to anchor user attention without breaking layout contrast.

## Shapes
The design uses calibrated curvature to balance high-tech geometry with tactile accessibility.

- **Base Corner Radius (14px):** Standard interactive elements such as form inputs, action buttons, filter tags, and operational badges.
- **Card & Surface Radius (18px):** Content containers, list group panels, telemetry stat clusters, and GIS floating controls.
- **Hero & Shell Radius (22px):** Root operational modals, triage slide-over drawers, and primary workflow overview panels.
- **Strict Inset Matching:** Nested elements inside cards must use an internal radius 4px smaller than the parent to maintain geometric harmony (e.g., an 18px card with 12px padding nests 14px buttons).

## Components

### Buttons
- **Primary:** Background of `#8B5CF6`, text `#FFFFFF`, border `1px solid rgba(255,255,255,0.2)`. Hover state introduces a localized radial glow `0 0 20px rgba(139, 92, 246, 0.45)`. Corner radius: `14px`.
- **Secondary Glass:** Background of `rgba(255, 255, 255, 0.05)`, border `1px solid rgba(255, 255, 255, 0.12)`, text `#FFFFFF`. Hover shifts background to `rgba(255, 255, 255, 0.09)`.
- **Destructive:** Background of `rgba(251, 113, 133, 0.12)`, border `1px solid rgba(251, 113, 133, 0.35)`, text `#FB7185`.

### Status Badges & Chips
- Formed with a 14px outer radius, `padding: 4px 10px`, `label-sm` typography, and uppercase tracking.
- Composed with an ultra-thin border (`1px solid`) and matching 12% opacity fill:
  - *Reported:* Fill `rgba(56, 189, 248, 0.12)`, border `rgba(56, 189, 248, 0.35)`, text `#38BDF8`.
  - *Verified:* Fill `rgba(139, 92, 246, 0.12)`, border `rgba(139, 92, 246, 0.35)`, text `#A78BFA`.
  - *Assigned:* Fill `rgba(34, 211, 238, 0.12)`, border `rgba(34, 211, 238, 0.35)`, text `#22D3EE`.
  - *In Progress:* Fill `rgba(251, 191, 36, 0.12)`, border `rgba(251, 191, 36, 0.35)`, text `#FBBF24`.
  - *Scheduled:* Fill `rgba(99, 102, 241, 0.12)`, border `rgba(99, 102, 241, 0.35)`, text `#818CF8`.
  - *Resolved:* Fill `rgba(52, 211, 153, 0.12)`, border `rgba(52, 211, 153, 0.35)`, text `#34D399`.
  - *Rejected:* Fill `rgba(251, 113, 133, 0.12)`, border `rgba(251, 113, 133, 0.35)`, text `#FB7185`.
- Each badge features an optional 6px pulsing indicator dot matching the status color.

### Form Inputs & Selectors
- Constructed with `background: rgba(16, 21, 34, 0.8)`, `border: 1px solid rgba(255, 255, 255, 0.10)`, corner radius `14px`, text `#FFFFFF`. Placeholder text sits at `rgba(255, 255, 255, 0.35)`.
- Active focus state: border shifts to `#8B5CF6` with an inner ring shadow `0 0 0 1px #8B5CF6`.

### Cards & Telemetry Containers
- Built on `18px` corners, filled with `rgba(255, 255, 255, 0.045)`, and framed by `rgba(255, 255, 255, 0.10)`.
- Hover interaction: transitions to `rgba(255, 255, 255, 0.07)` with border brightening to `rgba(255, 255, 255, 0.18)` and an upward translation of `-2px`.

### Checkboxes & Radio Controls
- Base: `rgba(255, 255, 255, 0.06)` with a `1px` white border at 15% opacity.
- Checked: `#8B5CF6` solid background with `#FFFFFF` vector checkmark or nested radio dot, accompanied by a subtle `#8B5CF6` glow.

### Specialized Platform Components
- **AI Confidence Gauge:** Miniature radial or horizontal track displaying AI categorisation certainty; colored `#22D3EE` for >90% and `#FBBF24` for <75%.
- **GIS Map Overlay Markers:** Glass pill tags containing pin icons and live SLA countdowns, bound with status badge borders.
- **Dispatcher Incident Feed Row:** High-density list item featuring an issue type icon, incident location, time-elapsed counter, and assigned status badge with a one-click dispatch action.