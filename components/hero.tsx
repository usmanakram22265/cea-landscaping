"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowRight, Phone } from "lucide-react";
import { business } from "@/lib/content";

const EASE = [0.16, 1, 0.3, 1] as const;

const headline = ["Custom", "outdoor", "spaces,"];
const headlineAccent = ["built", "to", "last."];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.18], [1, 0]);

  // Keep the full-quality video off the critical path: the poster paints
  // immediately as the LCP, and the 2.4MB video only starts downloading
  // after the page load event, fading in once it can play. On connections
  // too slow to ever stream it (the video needs ~1.5Mbps), stay on the
  // poster — a crisp still beats a permanently buffering first frame.
  const [mountVideo, setMountVideo] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    if (reduce) return;
    type NetInfo = {
      saveData?: boolean;
      effectiveType?: string;
      downlink?: number;
    };
    // navigator.connection reflects the machine's general internet estimate,
    // not the path to this origin — a local server is always fast, so the
    // slow-connection gate only applies to real (remote) visitors.
    const isLocal = ["localhost", "127.0.0.1"].includes(location.hostname);
    const conn = (navigator as { connection?: NetInfo }).connection;
    if (
      !isLocal &&
      conn &&
      (conn.saveData ||
        ["slow-2g", "2g", "3g"].includes(conn.effectiveType ?? "") ||
        (conn.downlink ?? 10) < 1.5)
    ) {
      return;
    }
    const start = () => setMountVideo(true);
    if (document.readyState === "complete") {
      start();
      return;
    }
    window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, [reduce]);

  return (
    <section
      id="top"
      ref={ref}
      className="relative h-dvh min-h-[640px] w-full overflow-hidden"
    >
      {/* full-bleed background with parallax — looping video, static poster for reduced-motion */}
      <motion.div
        style={{ y: reduce ? 0 : imageY, scale: reduce ? 1 : scale }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="/videos/hero-poster.jpg"
          alt="Manicured commercial landscaping and lawn at a modern Houston property"
          fill
          priority
          quality={70}
          sizes="100vw"
          className="object-cover object-[center_60%] [filter:saturate(1.12)_contrast(1.06)]"
        />
        {mountVideo && (
          <video
            className={`absolute inset-0 size-full object-cover object-[center_60%] transition-opacity duration-700 [filter:saturate(1.12)_contrast(1.06)] ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            loop
            muted
            playsInline
            poster="/videos/hero-poster.jpg"
            aria-hidden
            onCanPlay={() => setVideoReady(true)}
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
        )}
      </motion.div>

      {/* Cinematic grade: multiply navy deepens shadows while keeping the
          footage's highlights alive (a flat tint washed it milky). Tweak the
          color/opacity here to re-grade without re-rendering video. */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 bg-navy/35 mix-blend-multiply"
      />
      <div aria-hidden className="absolute inset-0 z-10 bg-forest/15" />
      {/* cinematic depth: soft edge vignette + bottom scrim for CTA legibility */}
      <div
        aria-hidden
        className="absolute inset-0 z-10 [background:radial-gradient(120%_90%_at_50%_38%,transparent_60%,rgba(8,23,38,0.35)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-navy-900/45 to-transparent"
      />

      {/* Top scrim — subtle dark gradient under the transparent navbar so the
          white logo/links/CTA stay legible. Fades out before the headline. */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-40 bg-gradient-to-b from-black/55 via-black/20 to-transparent"
      />

      {/* content column */}
      <div className="relative z-20 flex h-full flex-col px-5 pt-24 sm:px-8 sm:pt-28">
        <div className="flex flex-1 flex-col items-center justify-center">
          {/* eyebrow */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white/90 backdrop-blur"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-white/60 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-white" />
            </span>
            Houston Landscaping &amp; Maintenance
          </motion.div>

          {/* headline */}
          <h1 className="mx-auto mt-6 max-w-4xl text-center text-[clamp(2.1rem,5vw,4rem)] font-semibold leading-[1.02] tracking-tight text-balance text-white">
            <span className="sr-only">
              Custom outdoor spaces, built to last in the Texas climate.
            </span>
            <span aria-hidden className="flex flex-wrap justify-center gap-x-[0.28em]">
              {headline.map((w, i) => (
                <Word key={w} i={i} reduce={!!reduce}>
                  {w}
                </Word>
              ))}
            </span>
            <span
              aria-hidden
              className="mt-1 flex flex-wrap items-baseline justify-center gap-x-[0.28em]"
            >
              {headlineAccent.map((w, i) => (
                <Word key={w} i={i + headline.length} reduce={!!reduce}>
                  {w}
                </Word>
              ))}
              <Word i={headline.length + headlineAccent.length} reduce={!!reduce}>
                <span className="font-display italic text-white/70">in the</span>
              </Word>
            </span>
            <span
              aria-hidden
              className="mt-1 flex flex-wrap items-baseline justify-center gap-x-[0.28em]"
            >
              <Word i={headline.length + headlineAccent.length + 1} reduce={!!reduce}>
                <span className="font-display italic text-white/70">Texas climate.</span>
              </Word>
            </span>
          </h1>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.5 }}
            className="mx-auto mt-6 max-w-xl text-center text-sm text-white/80 text-pretty sm:text-base"
          >
            Custom outdoor spaces built for beauty, function, and long-term
            durability — for property managers, HOAs, developers, and residential
            projects across Greater Houston.
          </motion.p>

          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.62 }}
            className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="#quote"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white shadow-green transition-[background-color] duration-300 hover:bg-brand-600 sm:w-auto"
            >
              Request a Quote
              <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-1" />
            </a>
            <a
              href={business.phoneHref}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border-strong bg-surface px-6 py-3.5 text-sm font-semibold text-ink transition-[background-color,border-color] duration-300 hover:border-brand/40 hover:bg-green-soft sm:w-auto"
            >
              <Phone className="size-4 text-brand" strokeWidth={2.2} />
              {business.phone}
            </a>
          </motion.div>
        </div>

        {/* bottom rail: editorial corner captions flanking the scroll cue,
            all fading out together as the hero scrolls away */}
        <motion.div
          aria-hidden
          style={{ opacity: reduce ? 1 : cueOpacity }}
          className="absolute inset-x-8 bottom-8 hidden items-end justify-between text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/50 lg:flex"
        >
          <span>Houston, TX — 29.76° N · 95.37° W</span>
          <span>Commercial &amp; Residential</span>
        </motion.div>
        <motion.a
          href="#services"
          aria-label="Scroll to services"
          style={{ opacity: reduce ? 1 : cueOpacity }}
          className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 sm:flex"
        >
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/35 p-1.5">
            <span className="size-1.5 rounded-full bg-white motion-safe:animate-scroll-dot" />
          </span>
          <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white/60">
            Scroll
          </span>
        </motion.a>
      </div>
    </section>
  );
}

function Word({
  children,
  i,
  reduce,
}: {
  children: React.ReactNode;
  i: number;
  reduce: boolean;
}) {
  return (
    <motion.span
      initial={reduce ? false : { opacity: 0, y: "0.5em", rotate: 2 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.7, ease: EASE, delay: 0.15 + i * 0.07 }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
}
