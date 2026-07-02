"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { business, nav } from "@/lib/content";

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`relative mx-auto border transition-[max-width,margin,border-radius,background-color,box-shadow,border-color] duration-500 ease-[var(--ease-out-soft)] ${
          scrolled
            ? "my-3 max-w-6xl rounded-full border-border/70 bg-surface/92 shadow-soft sm:my-4"
            : "my-0 max-w-[100vw] rounded-none border-transparent bg-transparent shadow-none"
        }`}
      >
        <div
          className={`relative z-30 flex items-center justify-between gap-4 transition-[padding] duration-500 ease-[var(--ease-out-soft)] ${
            scrolled ? "px-4 py-2 sm:px-5" : "px-5 py-3 sm:px-8"
          }`}
        >
          <Link
            href="#top"
            aria-label={`${business.name} — home`}
            className="flex shrink-0 items-center rounded-md transition-transform duration-300 ease-[var(--ease-spring)] hover:scale-[1.02] focus-visible:outline-none"
          >
            <Image
              src="/logo.webp"
              sizes="160px"
              alt={business.name}
              width={1500}
              height={599}
              priority
              className={`h-9 w-auto transition-[filter] duration-500 sm:h-10 ${
                scrolled ? "" : "[filter:brightness(0)_invert(1)]"
              }`}
            />
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`group relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-muted hover:text-ink focus-visible:text-ink"
                    : "text-white/85 hover:text-white focus-visible:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-4 bottom-1.5 h-px origin-left scale-x-0 transition-transform duration-300 ease-[var(--ease-spring)] group-hover:scale-x-100 ${
                    scrolled ? "bg-brand" : "bg-white"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2.5">
            <a
              href={business.phoneHref}
              className={`hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors duration-300 md:inline-flex ${
                scrolled
                  ? "text-ink hover:bg-mint"
                  : "text-white/90 hover:bg-white/10"
              }`}
            >
              <Phone className="size-4" strokeWidth={2.2} />
              <span className="tabular-nums">{business.phone}</span>
            </a>
            <a
              href="#quote"
              className={`group hidden items-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-semibold transition-[background-color,border-color,box-shadow,color] duration-300 sm:inline-flex ${
                scrolled
                  ? "bg-brand text-white shadow-green hover:bg-brand-600"
                  : "border border-white/40 bg-white/10 text-white hover:border-transparent hover:bg-brand hover:shadow-green"
              }`}
            >
              Request a Quote
              <ArrowRight className="size-4 transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className={`inline-flex size-11 items-center justify-center rounded-full border transition-colors duration-300 lg:hidden ${
                scrolled
                  ? "border-border bg-surface/70 text-ink hover:bg-mint"
                  : "border-white/40 bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              <Menu className="size-5" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-navy-900/55 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute inset-x-3 top-3 origin-top rounded-3xl border border-border bg-surface p-5 shadow-float"
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center justify-between">
                <Image
                  src="/logo.webp"
                  sizes="160px"
                  alt={business.name}
                  width={1500}
                  height={599}
                  className="h-9 w-auto"
                />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex size-11 items-center justify-center rounded-full border border-border text-ink transition-colors hover:bg-mint"
                >
                  <X className="size-5" />
                </button>
              </div>
              <div className="mt-5 flex flex-col">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.3 }}
                    className="border-b border-border/70 py-3.5 font-display text-xl font-semibold text-ink transition-colors hover:text-brand"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 font-semibold text-white shadow-green transition-colors hover:bg-brand-600"
              >
                Request a Quote
                <ArrowRight className="size-4" />
              </a>
              <a
                href={business.phoneHref}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full border border-border px-5 py-3 font-semibold text-ink transition-colors hover:bg-mint"
              >
                <Phone className="size-4 text-brand" strokeWidth={2.2} />
                {business.phone}
              </a>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
