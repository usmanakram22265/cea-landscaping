import Image from "next/image";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { business, nav, services } from "@/lib/content";
import { LeafMark } from "./ui/leaf-mark";

/**
 * Deep evergreen footer: CTA strip over foliage, link columns, and a ghost
 * wordmark anchoring the bottom of the page.
 */
export function SiteFooter() {
  return (
    <footer className="grain relative overflow-hidden bg-navy-900 text-white/80">
      {/* CTA strip */}
      <div className="relative overflow-hidden border-b border-white/10">
        <Image
          src="/images/gen2/band-foliage.webp"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          quality={60}
          className="object-cover opacity-25"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-navy-900/40"
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 py-14 sm:px-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sprout">
              <LeafMark className="size-3.5" />
              Free quote, no obligation
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.6rem,3.4vw,2.5rem)] font-semibold leading-[1.08] tracking-tight text-balance text-white">
              Ready to make your property the best-kept on the block?
            </h2>
          </div>
          <a
            href="#quote"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white shadow-green transition-[transform,background-color] duration-300 ease-[var(--ease-spring)] hover:-translate-y-0.5 hover:bg-brand-600 active:translate-y-0"
          >
            Request a Quote
            <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-spring)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>

      {/* link columns */}
      <div className="relative mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          {/* brand */}
          <div className="max-w-xs">
            <Image
              src="/logo.webp"
              sizes="160px"
              alt={business.name}
              width={1500}
              height={599}
              className="h-10 w-auto [filter:brightness(0)_invert(1)]"
            />
            <p className="mt-5 text-pretty text-sm leading-relaxed text-white/65">
              {business.tagline}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/90 ring-1 ring-white/12">
              <LeafMark className="size-3.5 text-sprout" />
              Woman-Owned Business
            </span>
          </div>

          {/* nav */}
          <nav className="text-sm">
            <h3 className="font-display text-base font-semibold text-white">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-white/65 transition-colors duration-300 hover:text-sprout"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* services */}
          <div className="text-sm">
            <h3 className="font-display text-base font-semibold text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-3">
              {services.map((s) => (
                <li key={s.id}>
                  <a
                    href="#services"
                    className="text-white/65 transition-colors duration-300 hover:text-sprout"
                  >
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* contact */}
          <div className="text-sm">
            <h3 className="font-display text-base font-semibold text-white">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-3.5">
              <li>
                <a
                  href={business.phoneHref}
                  className="group flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex size-9 items-center justify-center rounded-lg bg-white/8 ring-1 ring-white/12 transition-colors group-hover:bg-brand/40 group-hover:text-sprout">
                    <Phone className="size-4" strokeWidth={2.2} />
                  </span>
                  <span className="tabular-nums">{business.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={business.emailHref}
                  className="group flex items-center gap-3 text-white/80 transition-colors hover:text-white"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/8 ring-1 ring-white/12 transition-colors group-hover:bg-brand/40 group-hover:text-sprout">
                    <Mail className="size-4" strokeWidth={2.2} />
                  </span>
                  <span className="[overflow-wrap:anywhere]">{business.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-white/80">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/8 ring-1 ring-white/12">
                  <MapPin className="size-4" strokeWidth={2.2} />
                </span>
                <span>
                  {business.locationLine}
                  <span className="mt-1 block text-white/50">
                    {business.serviceAreas.join(" · ")}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>
          <p>Built for the Texas climate.</p>
        </div>
      </div>

      {/* ghost wordmark */}
      <div
        aria-hidden
        className="pointer-events-none relative -mb-[2vw] select-none overflow-hidden"
      >
        <p className="whitespace-nowrap text-center font-display text-[13vw] font-bold leading-[0.75] tracking-tight text-white/4">
          CEA Landscaping
        </p>
      </div>
    </footer>
  );
}
