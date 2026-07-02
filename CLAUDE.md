# CLAUDE.md — Frontend Website Rules

## Always Do First
- **Invoke the `ui-ux-pro-max` skill** before writing any frontend code, every session, no exceptions.
- This is a **Next.js (App Router) SSR** project. If the project is not scaffolded yet, run **Project Setup** below before anything else.

## Project Setup (run once, when files are missing)
Before assuming any tooling exists, check the project root. If it is empty (only `CLAUDE.md`), bootstrap it:

1. **Scaffold the Next.js app in place:**
   ```bash
   npx create-next-app@latest . --ts --app --tailwind --eslint --src-dir=false --import-alias "@/*" --no-turbopack
   ```
   Accept the current directory; it already contains `CLAUDE.md`.
2. **Create the required folders** (only if absent):
   - `brand_assets/` — logos, color/style guides, source images. **Check here before designing.**
   - `temp-screenshots/` — output of the screenshot tool (auto-incremented, git-ignored).
   - `components/` — shared components, colocated with `app/` where route-specific.
3. **Install the screenshot tooling** as a dev dependency in the project:
   ```bash
   npm install -D puppeteer
   ```
4. **Create `screenshot.mjs`** in the project root if it does not exist — a small Puppeteer script that opens a localhost URL, captures the viewport, and saves to `temp-screenshots/screenshot-N.png` (auto-increment, never overwrite; optional label suffix as `screenshot-N-label.png`).
5. **Git-ignore** `temp-screenshots/`, `node_modules/`, `.next/`, and `.env.local`.


Do not recreate any of the above if it already exists. Do not start a second dev server or a second of any script.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL. `next/image`, RSC, and SSR only work through the Next.js server.
- Start the dev server in the background: `npm run dev` (Next.js serves at `http://localhost:3000`).
- For a production SSR check, use `npm run build && npm run start` (also port 3000).
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- Puppeteer is a project dev dependency (`node_modules/puppeteer`). Let Puppeteer manage its own Chromium cache (the OS default, e.g. `~/.cache/puppeteer` on macOS/Linux) — do not hardcode a path.
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temp-screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Optional label suffix: `node screenshot.mjs http://localhost:3000 label` → saves as `screenshot-N-label.png`
- After screenshotting, read the PNG from `temp-screenshots/` with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Use Next.js (App Router) with TypeScript and Server Components by default; mark Client Components explicitly with `"use client"` only when interactivity, hooks, or browser APIs are required
- **SSR is the default.** For dynamic, per-request pages set `export const dynamic = "force-dynamic"` (or `fetch(..., { cache: "no-store" }`). Use **ISR** (`{ next: { revalidate: N } }`) or **SSG** only where a page is genuinely static — never make a page dynamic that doesn't need to be
- Use `<Suspense>` + streaming for slow data so the shell renders immediately
- Create `.tsx` files using functional components with typed props (`type Props = { ... }`); colocate components under `app/` or `components/`
- Styling with Tailwind CSS from the `create-next-app` setup, imported through `globals.css` — avoid the CDN script in production
- Use `next/image` for images with explicit `width`, `height`, and `alt`; placeholders via `https://placehold.co/WIDTHxHEIGHT` (whitelist the domain in `next.config.ts` under `images.remotePatterns`)
- Use `next/font` for self-hosted, optimized fonts; use `next/link` for client-side navigation
- Define metadata via the `metadata` export (or `generateMetadata`) in `layout.tsx`/`page.tsx` for SEO
- Handle loading and error states with `loading.tsx` and `error.tsx` route segments; use Suspense boundaries for streaming
- Data mutations via Server Actions (`"use server"`); validate inputs with Zod; revalidate with `revalidatePath` / `revalidateTag`
- Keep secrets in `.env.local` (server-only); only expose variables prefixed with `NEXT_PUBLIC_` to the client
- Mobile-first responsive design using Tailwind breakpoints (`sm:`, `md:`, `lg:`)
- Accessibility: semantic HTML, proper ARIA where needed, keyboard navigation, sufficient color contrast
- Code quality: ESLint (`next/core-web-vitals`) + Prettier; strict TypeScript (`"strict": true`); no `any` unless justified

## Brand Assets
- Always check the `brand_assets/` folder before designing. It may contain logos, color guides, style guides, or images.
- If the folder is missing, create it (see Project Setup) so assets have a home; if it is empty, derive a custom palette appropriate to the project per the Anti-Generic Guardrails rather than inventing arbitrary brand colors.
- If assets exist there, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Pick a custom brand color and derive from it.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Never use the same font for headings and body. Pair a display/serif with a clean sans. Apply tight tracking (`-0.03em`) on large headings, generous line-height (`1.7`) on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth.
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use spring-style easing.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states. No exceptions.
- **Images:** Add a gradient overlay (`bg-gradient-to-t from-black/60`) and a color treatment layer with `mix-blend-multiply`.
- **Spacing:** Use intentional, consistent spacing tokens — not random Tailwind steps.
- **Depth:** Surfaces should have a layering system (base → elevated → floating), not all sit at the same z-plane.


## Hard Rules
- Do not add sections, features, or content not in the reference
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color


