"use client";

import Image from "next/image";
import { BadgeCheck, Users } from "lucide-react";
import { stats, whyChoose } from "@/lib/content";
import { Eyebrow } from "./ui/eyebrow";
import { LeafMark } from "./ui/leaf-mark";
import {
  Counter,
  Reveal,
  Stagger,
  StaggerItem,
  WordReveal,
} from "./ui/motion-primitives";

const compactIcons = [BadgeCheck, Users];

/**
 * Why CEA: two-tone composition on light ground — a contained navy stats
 * panel beside the fern feature tile, with white differentiator cards below.
 * Navy appears as an object, green as accents; neither floods the section.
 */
export function WhyProof() {
  const [featured, ...compact] = whyChoose;

  return (
    <section
      id="why"
      className="relative scroll-mt-24 overflow-hidden bg-mint py-16 sm:py-20"
    >
      <div aria-hidden className="bg-dotgrid absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Why CEA</Eyebrow>
            </Reveal>
            <WordReveal
              as="h2"
              text="Hired for the install. Kept for the standard."
              className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-balance"
            />
          </div>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-sm leading-relaxed text-muted text-pretty sm:text-base">
              Local knowledge, commercial-grade standards, and scheduling you
              can plan a quarter around.
            </p>
          </Reveal>
        </div>

        {/* two-tone feature row: navy stats panel + fern imagery */}
        <Stagger className="mt-10 grid gap-4 lg:grid-cols-[1fr_1.35fr]" gap={0.1}>
          <StaggerItem>
            <article className="grain relative flex h-full min-h-[17rem] flex-col overflow-hidden rounded-[1.5rem] bg-navy-800 p-7 text-white shadow-float sm:p-8">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sprout">
                <LeafMark className="size-3.5" />
                The short version
              </p>
              <div className="mt-6 grid flex-1 grid-cols-2 gap-x-8 gap-y-7">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="font-display text-4xl font-semibold tabular-nums tracking-tight text-white sm:text-[2.75rem]">
                      <Counter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-1 text-sm leading-snug text-white/65">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </StaggerItem>

          <StaggerItem>
            <article className="group relative flex h-full min-h-[17rem] flex-col justify-end overflow-hidden rounded-[1.5rem] shadow-float">
              <Image
                src="/images/gen2/tile-fern.webp"
                alt=""
                aria-hidden
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/45 to-navy-900/10"
              />
              <div className="relative z-10 max-w-lg p-6 text-white sm:p-8">
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-white/10 text-sprout ring-1 ring-white/15 backdrop-blur-sm">
                  <LeafMark className="size-5" />
                </span>
                <h3 className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                  {featured.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80 text-pretty sm:text-base">
                  {featured.body}
                </p>
              </div>
            </article>
          </StaggerItem>
        </Stagger>

        {/* light differentiator cards */}
        <Stagger className="mt-4 grid gap-4 sm:grid-cols-2" gap={0.12}>
          {compact.map((item, i) => {
            const Icon = compactIcons[i % compactIcons.length];
            return (
              <StaggerItem key={item.title}>
                <article className="group flex h-full gap-4 rounded-[1.5rem] border border-border bg-surface p-6 transition-[transform,border-color,box-shadow] duration-400 ease-[var(--ease-spring)] hover:-translate-y-1 hover:border-brand/30 hover:shadow-float">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-mint text-brand ring-1 ring-brand/10 transition-transform duration-400 ease-[var(--ease-spring)] group-hover:scale-110 group-hover:-rotate-6">
                    <Icon className="size-5" strokeWidth={2} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted text-pretty">
                      {item.body}
                    </p>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
