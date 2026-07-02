"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Phone } from "lucide-react";
import { business, steps } from "@/lib/content";
import { Eyebrow } from "./ui/eyebrow";
import { Reveal, WordReveal } from "./ui/motion-primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Vertical process timeline with a scroll-linked progress line: the green
 * line grows down the track as the section scrolls through the viewport.
 */
export function ProcessTimeline() {
  const trackRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section
      id="process"
      className="grain relative scroll-mt-24 overflow-hidden bg-navy-800 py-16 text-white sm:py-20"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -right-32 size-[30rem] rounded-full bg-brand/12 blur-3xl motion-safe:animate-aurora"
      />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        {/* left: sticky intro */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow onDark>How it works</Eyebrow>
          </Reveal>
          <WordReveal
            as="h2"
            text="From first call to a landscape that lasts."
            className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-balance text-white"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/70 text-pretty sm:text-lg">
              No mystery pricing, no vanishing crews. Four steps, each one
              something you can hold us to.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href={business.phoneHref}
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full border border-white/25 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-[border-color,background-color] duration-300 hover:border-white/45 hover:bg-white/10"
            >
              <Phone className="size-4 text-sprout" strokeWidth={2.2} />
              <span className="tabular-nums">{business.phone}</span>
            </a>
          </Reveal>
        </div>

        {/* right: timeline */}
        <ol ref={trackRef} className="relative">
          {/* track + progress line, through node centers */}
          <div
            aria-hidden
            className="absolute bottom-6 left-6 top-6 w-px bg-white/15"
          />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : scaleY }}
            className="absolute bottom-6 left-6 top-6 w-px origin-top bg-sprout"
          />

          {steps.map((step, i) => (
            <motion.li
              key={step.number}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.05 }}
              className={`relative flex gap-6 pl-0 ${
                i < steps.length - 1 ? "pb-10" : ""
              }`}
            >
              <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full bg-navy-700 font-mono text-sm font-semibold tabular-nums text-sprout ring-1 ring-white/15">
                {step.number}
              </span>
              <div className="pt-1.5">
                <h3 className="font-display text-lg font-semibold tracking-tight text-white sm:text-xl">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-lg text-sm leading-relaxed text-white/70 text-pretty sm:text-base">
                  {step.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
