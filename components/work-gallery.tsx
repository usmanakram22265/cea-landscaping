"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryCategories, galleryImages } from "@/lib/content";
import { Eyebrow } from "./ui/eyebrow";
import { Reveal, WordReveal } from "./ui/motion-primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

type Category = (typeof galleryCategories)[number];

/**
 * Real project photos only. Category filter chips + masonry columns +
 * keyboard-navigable lightbox.
 */
export function WorkGallery() {
  const reduce = useReducedMotion();
  const [category, setCategory] = useState<Category>("All");
  const [active, setActive] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      category === "All"
        ? [...galleryImages]
        : galleryImages.filter((img) => img.category === category),
    [category]
  );

  const close = useCallback(() => setActive(null), []);
  const next = useCallback(
    () => setActive((i) => (i === null ? i : (i + 1) % filtered.length)),
    [filtered.length]
  );
  const prev = useCallback(
    () =>
      setActive((i) =>
        i === null ? i : (i - 1 + filtered.length) % filtered.length
      ),
    [filtered.length]
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active, close, next, prev]);

  return (
    <section id="work" className="relative scroll-mt-24 bg-surface py-16 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Our work</Eyebrow>
            </Reveal>
            <WordReveal
              as="h2"
              text="Built and maintained across Greater Houston."
              className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-balance"
            />
          </div>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-sm leading-relaxed text-muted text-pretty sm:text-base">
              Every photo here is our own crew&rsquo;s work. Filter by trade or
              tap any photo for a closer look.
            </p>
          </Reveal>
        </div>

        {/* filter chips */}
        <Reveal delay={0.1}>
          <div
            role="tablist"
            aria-label="Filter projects by trade"
            className="mt-8 flex flex-wrap gap-2"
          >
            {galleryCategories.map((cat) => {
              const isActive = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => {
                    setCategory(cat);
                    setActive(null);
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-[background-color,color,border-color] duration-300 ${
                    isActive
                      ? "border border-brand bg-brand text-white shadow-green"
                      : "border border-border bg-surface text-muted hover:border-brand/40 hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* masonry columns; re-keyed per filter so items fade in fresh */}
        <div key={category} className="mt-8 columns-2 gap-4 sm:columns-3 lg:columns-4">
          {filtered.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Open project photo: ${img.alt}`}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
              className="group relative mb-4 block w-full break-inside-avoid overflow-hidden rounded-xl focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand"
            >
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                sizes="(max-width: 640px) 45vw, 30vw"
                className="h-auto w-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100"
              />
              <span
                aria-hidden
                className="absolute bottom-3 left-3 translate-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-white opacity-0 transition-[opacity,transform] duration-400 ease-[var(--ease-spring)] group-hover:translate-y-0 group-hover:opacity-100"
              >
                {img.category}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      <AnimatePresence>
        {active !== null && filtered[active] && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-label="Project photo viewer"
          >
            <div
              className="absolute inset-0 bg-navy-900/90 backdrop-blur-sm"
              onClick={close}
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close photo viewer"
              className="absolute right-4 top-4 z-10 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
            >
              <X className="size-5" />
            </button>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-3 z-10 inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="size-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next photo"
              className="absolute right-3 z-10 inline-flex size-12 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="size-6" />
            </button>
            <motion.figure
              key={filtered[active].src}
              className="relative z-0 max-h-full w-full max-w-4xl"
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Image
                src={filtered[active].src}
                alt={filtered[active].alt}
                width={1600}
                height={1200}
                sizes="100vw"
                className="mx-auto max-h-[80vh] w-auto rounded-2xl object-contain shadow-float"
              />
              <figcaption className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-3 text-center text-sm text-white/80">
                <span className="font-semibold uppercase tracking-[0.14em] text-sprout">
                  {filtered[active].category}
                </span>
                <span aria-hidden className="text-white/40">·</span>
                {filtered[active].alt}
                <span aria-hidden className="text-white/40">·</span>
                <span className="font-mono tabular-nums text-white/60">
                  {active + 1}/{filtered.length}
                </span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
