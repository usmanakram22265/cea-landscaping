"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { services } from "@/lib/content";
import { Botanical } from "./ui/botanical";
import { Eyebrow } from "./ui/eyebrow";
import { Reveal, WordReveal } from "./ui/motion-primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Editorial service index: interactive numbered list on the left,
 * sticky crossfading image panel on the right. Stacked cards on mobile.
 */
export function ServicesIndex() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = services[active];

  // gentle parallax drift inside the sticky image panel
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative scroll-mt-24 overflow-hidden bg-bg py-16 sm:py-20"
    >
      <Botanical className="absolute -right-24 -top-20 w-[24rem] rotate-[160deg] opacity-45 sm:w-[30rem]" />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <Eyebrow>Services</Eyebrow>
          </Reveal>
          <WordReveal
            as="h2"
            text="Everything your landscape needs, one crew."
            className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-balance"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted text-pretty sm:text-lg">
              Four trades under one roof, so drainage, planting, trees, and
              upkeep never point fingers at each other.
            </p>
          </Reveal>
        </div>

        {/* Desktop: index + sticky image panel */}
        <div className="mt-10 hidden gap-10 lg:grid lg:grid-cols-[1.05fr_1fr]">
          <div role="list" className="flex flex-col">
            {services.map((service, i) => {
              const isActive = i === active;
              return (
                <div role="listitem" key={service.id}>
                  <button
                    type="button"
                    aria-expanded={isActive}
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={`group w-full rounded-2xl px-5 text-left transition-[background-color] duration-300 ${
                      isActive ? "bg-mint/60" : "hover:bg-mint/35"
                    }`}
                  >
                    <div
                      className={`flex items-baseline gap-4 border-t py-5 ${
                        i === 0 ? "border-transparent" : "border-border"
                      }`}
                    >
                      <span
                        className={`font-mono text-sm tabular-nums transition-colors duration-300 ${
                          isActive ? "text-brand" : "text-faint"
                        }`}
                      >
                        {service.number}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-3">
                          <h3
                            className={`font-display text-xl font-semibold tracking-tight transition-colors duration-300 sm:text-2xl ${
                              isActive ? "text-ink" : "text-muted group-hover:text-ink"
                            }`}
                          >
                            {service.title}
                          </h3>
                          <ArrowUpRight
                            className={`size-5 shrink-0 transition-[color,transform] duration-300 ease-[var(--ease-spring)] ${
                              isActive
                                ? "translate-x-0.5 -translate-y-0.5 text-brand"
                                : "text-faint"
                            }`}
                          />
                        </div>

                        <AnimatePresence initial={false}>
                          {isActive && (
                            <motion.div
                              key="detail"
                              initial={reduce ? false : { height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={reduce ? undefined : { height: 0, opacity: 0 }}
                              transition={{ duration: 0.45, ease: EASE }}
                              className="overflow-hidden"
                            >
                              <p className="mt-2 max-w-md text-sm leading-relaxed text-muted text-pretty">
                                {service.summary}
                              </p>
                              <ul className="mt-3 grid gap-1.5">
                                {service.points.slice(0, 3).map((point) => (
                                  <li
                                    key={point}
                                    className="flex items-start gap-2 text-sm text-ink/80"
                                  >
                                    <Check
                                      className="mt-1 size-3.5 shrink-0 text-brand"
                                      strokeWidth={2.5}
                                    />
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}

            <Reveal delay={0.1} className="mt-6 px-5">
              <a
                href="#quote"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-green transition-[transform,background-color] duration-300 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-brand-600 active:translate-y-0"
              >
                Get a quote for {current.title.toLowerCase()}
                <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Reveal>
          </div>

          {/* sticky crossfading image panel */}
          <div className="relative">
            <div className="sticky top-28 overflow-hidden rounded-[1.5rem] shadow-float">
              <div className="relative aspect-[4/3.4]">
                <AnimatePresence initial={false}>
                  <motion.div
                    key={current.id}
                    initial={reduce ? false : { opacity: 0, scale: 1.06 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.55, ease: EASE }}
                    className="absolute inset-0"
                  >
                    <motion.div
                      style={{ y: reduce ? 0 : imageY }}
                      className="absolute inset-0 scale-[1.1]"
                    >
                      <Image
                        src={current.image}
                        alt={current.imageAlt}
                        fill
                        sizes="(max-width: 1024px) 0px, 45vw"
          quality={65}
                        className="object-cover"
                      />
                    </motion.div>
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-t from-navy-900/70 via-transparent to-transparent"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* caption */}
                <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-4 p-6">
                  <span className="inline-flex items-center rounded-full bg-white/92 px-3 py-1.5 text-xs font-semibold text-ink shadow-soft">
                    {current.tag}
                  </span>
                  <span className="font-mono text-sm tabular-nums text-white/85">
                    {current.number} / 04
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile: stacked cards */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:hidden">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, ease: EASE, delay: i * 0.06 }}
              className="overflow-hidden rounded-2xl border border-border bg-surface shadow-soft"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={service.imageAlt}
                  fill
                  sizes="(max-width: 640px) 90vw, 45vw"
          quality={65}
                  className="object-cover"
                />
                <span className="absolute bottom-3 left-3 inline-flex items-center rounded-full bg-white/92 px-2.5 py-1 text-[0.7rem] font-semibold text-ink">
                  {service.tag}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs tabular-nums text-brand">
                    {service.number}
                  </span>
                  <h3 className="font-display text-lg font-semibold tracking-tight text-ink">
                    {service.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted text-pretty">
                  {service.summary}
                </p>
                <a
                  href="#quote"
                  className="group mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-colors hover:text-brand-700"
                >
                  Get a quote
                  <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
