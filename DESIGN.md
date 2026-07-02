# DESIGN.md — CEA Landscaping (2026 redesign)

**Direction:** Light, premium, minimal, exacting. A teal-led system grounded by
navy and lifted by a single emerald-green action color. Generous whitespace,
crisp hairlines, layered (not flat) shadows, real motion throughout. The hero is
locked; the rest of the site is rebuilt around this system.

Source of truth for tokens: `app/globals.css` (`@theme`). Fonts: `app/layout.tsx`.

## Color strategy: Committed (teal carries identity)
Required colors (user-mandated): **navy + teal + #028151 (emerald).**

| Role | Token | Hex | Use |
|---|---|---|---|
| Primary / interactive | `--color-teal` | `#0E7C7B` | Buttons, links, focus ring, active states, the brand surface |
| Primary deep | `--color-teal-700` | `#0A5E5D` | Hover/pressed |
| Primary tint | `--color-teal-soft` | `#E2F1F0` | Chips, soft fills, icon halos |
| Accent (success/highlight) | `--color-emerald` | `#028151` | Sparing accent: checkmarks, highlights, the leaf mark |
| Navy (dark surface + ink) | `--color-navy` | `#102A43` | Dark sections, footer, headings/body ink |
| Navy elevated | `--color-navy-700` | `#16395C` | Dark-section elevation |
| Ink | `--color-ink` | `#0F2436` | Headings + body text (navy-toned, never gray) |
| Muted | `--color-muted` | `#51637A` | Secondary text (passes 4.5:1 on light) |
| Faint | `--color-faint` | `#7B8AA0` | Fine print, placeholders |
| Page bg | `--color-bg` | `#F6F8F8` | Cool off-white, faint teal tint (NOT cream) |
| Surface | `--color-surface` | `#FFFFFF` | Cards |
| Elevated | `--color-mist` | `#EEF3F3` | Alt bands |
| Border | `--color-border` | `#E1E8E8` | Hairlines |
| Border strong | `--color-border-strong` | `#CBD6D6` | Emphasized |

Light theme only. Dark *sections* (navy) are part of the rhythm, not a dark mode.

## Typography — distinctive pairing (off the reflex-reject list)
- **Display: Bricolage Grotesque** (variable). Characterful humanist grotesque
  with personality; tight but not cramped (-0.02em). Weights 500/600/700.
- **Body: Geist** (Vercel's neutral, precise grotesque). Clean, modern, legible.
- Mono accent (numbers/labels where useful): **Geist Mono**.
- Scale: fluid clamp, ≥1.25 ratio. Hero max ≤ 6rem. Letter-spacing floor -0.04em.
- Body line-height 1.7; cap measure 65–75ch.

## Effects
- Shadows: layered, navy-tinted (`.shadow-soft`, `.shadow-float`), teal-tinted
  CTA shadow (`.shadow-teal`). Never flat `shadow-md`. Cards radius 14–20px (not 32+).
- Texture: fine SVG grain (`.grain`) on dark bands for depth.
- Motion: `motion` (Framer Motion) throughout — scroll-linked parallax, masked
  reveals, staggered grids, magnetic CTAs, animated counters, marquees, a custom
  cursor-follow on the hero-adjacent bands. Ease-out-expo curves; reduced-motion
  alternative for every effect. Animate transform/opacity/clip-path/filter only.

## Imagery rules
- **Gallery = real project photos only** (`public/images/projects/`).
- Service cards, section backgrounds, why-choose tiles = **AI-generated**
  (Higgsfield), graded to the navy/teal/emerald palette. Generated assets live in
  `public/images/gen/`.

## Bans honored
No gradient text, no side-stripe borders, no glassmorphism-by-default, no
per-section uppercase eyebrows as scaffolding (kickers used sparingly, varied
cadence), no 32px+ card radii, no border+big-shadow ghost cards, no em dashes in
copy, no buzzwords.
