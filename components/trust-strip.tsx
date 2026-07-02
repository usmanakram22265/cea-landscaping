"use client";

import { motion, useReducedMotion } from "motion/react";
import { credentials } from "@/lib/content";
import { LeafMark } from "./ui/leaf-mark";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Slim credential band directly under the hero: quiet proof before the pitch.
 */
export function TrustStrip() {
  const reduce = useReducedMotion();

  return (
    <section
      aria-label="Credentials"
      className="border-b border-border bg-surface"
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-4 sm:gap-x-10 sm:px-8 sm:py-5">
        {credentials.map((item, i) => (
          <motion.span
            key={item.label}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.5, ease: EASE, delay: i * 0.08 }}
            className="flex items-center gap-8 sm:gap-10"
          >
            {i > 0 && (
              <LeafMark aria-hidden className="hidden size-3 text-brand/40 sm:block" />
            )}
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {item.label}
            </span>
          </motion.span>
        ))}
      </div>
    </section>
  );
}
