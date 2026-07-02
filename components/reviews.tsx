"use client";

import { Star } from "lucide-react";
import { reviews } from "@/lib/content";
import { Botanical } from "./ui/botanical";
import { Eyebrow } from "./ui/eyebrow";
import { Reveal, WordReveal } from "./ui/motion-primitives";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

type Review = (typeof reviews)[number];

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="group relative flex w-[20rem] shrink-0 flex-col overflow-hidden rounded-[1.25rem] border border-border bg-surface p-6 transition-[transform,box-shadow,border-color] duration-400 ease-[var(--ease-spring)] hover:-translate-y-1 hover:border-brand/30 hover:shadow-float sm:w-[24rem]">
      <span
        aria-hidden
        className="absolute -right-2 -top-4 select-none font-display text-[7rem] leading-none text-brand/8 transition-colors duration-400 group-hover:text-brand/14"
      >
        &rdquo;
      </span>
      <div
        className="relative flex gap-0.5"
        aria-label={`${review.rating} out of 5 stars`}
      >
        {Array.from({ length: review.rating }).map((_, s) => (
          <Star key={s} className="size-4 fill-amber text-amber" strokeWidth={0} />
        ))}
      </div>
      <blockquote className="relative mt-4 flex-1 leading-relaxed text-ink text-pretty">
        {review.quote}
      </blockquote>
      <figcaption className="relative mt-6 flex items-center gap-3 border-t border-border pt-5">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mint font-display text-sm font-semibold text-brand ring-1 ring-brand/15">
          {initials(review.name)}
        </span>
        <span>
          <span className="block font-semibold text-ink">{review.name}</span>
          <span className="block text-sm text-muted">{review.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Single-line infinite review marquee: scrolls right to left, pauses on hover.
 */
export function Reviews() {
  const loop = [...reviews, ...reviews];

  return (
    <section
      id="reviews"
      className="relative overflow-hidden bg-mint py-16 sm:py-20"
    >
      <Botanical
        src="/images/gen2/botanical-grass.webp"
        className="absolute -bottom-20 -left-16 w-[22rem] opacity-60 sm:w-[26rem]"
      />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Reveal>
              <Eyebrow>Reviews</Eyebrow>
            </Reveal>
            <WordReveal
              as="h2"
              text="The people who manage property keep our number."
              className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-balance"
            />
          </div>
          <Reveal delay={0.08}>
            <div className="flex items-center gap-3">
              <div className="flex gap-0.5" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className="size-4 fill-amber text-amber"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <span className="text-sm text-muted">
                5.0 average from Houston property teams
              </span>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="group mask-edge-x mt-10 flex overflow-hidden motion-reduce:overflow-x-auto">
        <ul
          className="flex shrink-0 items-stretch gap-5 pr-5 animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animationDuration: "60s" }}
        >
          {loop.map((review, i) => (
            <li key={`${review.role}-${i}`} className="flex">
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
