# CEA Landscaping & Maintenance — Design System (v3)

**Direction:** Light · premium · minimal · landscaping-first.
Dual-tone system taken directly from the logo: **navy** (the wordmark) is the
authority color — every dark surface and the text ink; **green** (the tree,
`#028151`) is the action color — CTAs, links, kickers, focus, accents. Green
never carries large surfaces; navy never acts as an accent.

Source of truth: `app/globals.css` (`@theme` tokens) and `app/layout.tsx` (fonts).

---

## Color Palette

### Green — action & identity (never large surfaces)
| Token | Hex | Use |
|---|---|---|
| `--color-brand` | `#028151` | Primary buttons, links, focus ring, kickers |
| `--color-brand-600` | `#016a41` | Hover |
| `--color-brand-700` | `#01502f` | Active / pressed |
| `--color-sprout` | `#62cf9c` | Green accent on dark navy (icons, labels) |
| `--color-mint` | `#e2f1ea` | Chips, soft fills, active row highlight |
| `--color-mint-soft` | `#f2f8f5` | Tinted section washes |

### Navy — authority (dark bands + ink; logo wordmark blue)
| Token | Hex | Use |
|---|---|---|
| `--color-navy` | `#102a43` | Base navy (hero overlay via `--color-forest` alias) |
| `--color-navy-700` | `#16395c` | Elevated cards on dark bands |
| `--color-navy-800` | `#0c1f33` | Dark section bands (Why, ticker, quote panel) |
| `--color-navy-900` | `#081726` | Footer, deepest band, lightbox scrim |
| `--color-ink` | `#12263d` | Headings + body on light |
| `--color-muted` | `#4d6072` | Secondary text |
| `--color-faint` | `#7f8fa1` | Placeholder, fine print |

### Evergreen — imagery support only
`--color-evergreen*` (`#0b3d28` / `#10492f` / `#072a1c`) back natural photo
tiles (fern feature) — not standalone band colors.

### Surfaces & misc
| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#f6f9f7` | Page background |
| `--color-surface` | `#ffffff` | Cards, white bands |
| `--color-border` / `-strong` | `#e3eae5` / `#cbd9d0` | Borders |
| `--color-amber` | `#e0a52e` | Review stars only |

## Typography
- **Display — Bricolage Grotesque** (`--font-display`), h1–h4, tracking `-0.02em`.
- **Body — Geist** (`--font-sans`), line-height 1.7.
- **Mono — Geist Mono** (`--font-mono`), index numbers, counters.

## Motion
`--ease-spring`, `--ease-out-soft`; animate transform/opacity only, never
`transition-all`; reduced-motion fallbacks required. Named: marquee, float,
shimmer, aurora. Counters use a timeout fallback so they always settle.

## Effects
Navy-tinted layered shadows (`.shadow-soft/.shadow-float`), green CTA shadow
(`.shadow-green`), `.grain`, `.bg-dotgrid`, `.mask-edge-x`.

## Rules
- Real project photos appear ONLY in the work gallery (`public/images/projects`).
- All other imagery is AI-generated, natural green/warm grade (`public/images/gen2`).
- Every clickable element has hover, focus-visible, and active states.
- Sections stay ≈ one viewport tall on desktop.
- The hero section markup is locked (video, choreography, overlay).
