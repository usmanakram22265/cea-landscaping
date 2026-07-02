"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Phone, Plus } from "lucide-react";
import { business, faqs } from "@/lib/content";
import { Eyebrow } from "./ui/eyebrow";
import { Reveal, WordReveal } from "./ui/motion-primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Accessible FAQ accordion: one item open at a time, animated height,
 * with a contact nudge alongside.
 */
export function Faq() {
  const [open, setOpen] = useState<number>(0);
  const reduce = useReducedMotion();

  return (
    <section id="faq" className="scroll-mt-24 bg-surface py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <Eyebrow>FAQ</Eyebrow>
          </Reveal>
          <WordReveal
            as="h2"
            text="Asked before every quote."
            className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.05] tracking-tight text-balance"
          />
          <Reveal delay={0.1}>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted text-pretty">
              If yours is not here, ask us directly. A person answers, not a
              phone tree.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <a
              href={business.phoneHref}
              className="group mt-6 inline-flex items-center gap-2.5 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-green transition-[transform,background-color] duration-300 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-brand-600 active:translate-y-0"
            >
              <Phone className="size-4" strokeWidth={2.2} />
              <span className="tabular-nums">{business.phone}</span>
            </a>
          </Reveal>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={faq.q} delay={i * 0.04}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-[border-color,background-color] duration-300 ${
                    isOpen
                      ? "border-brand/25 bg-mint-soft"
                      : "border-border bg-surface hover:border-brand/20"
                  }`}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                  >
                    <span className="font-display text-base font-semibold tracking-tight text-ink sm:text-lg">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                        isOpen
                          ? "border-brand/30 bg-brand text-white"
                          : "border-border text-muted"
                      }`}
                    >
                      <Plus className="size-4" strokeWidth={2.2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="answer"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-muted text-pretty sm:px-6 sm:text-base">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
