import { houstonAreas } from "@/lib/content";
import { LeafMark } from "./ui/leaf-mark";

/**
 * Slim dark marquee of Greater Houston service areas, placed just above the
 * quote form: local proof right before the ask.
 */
export function AreasTicker() {
  return (
    <section
      id="areas"
      aria-label="Service areas across Greater Houston"
      className="grain relative scroll-mt-24 overflow-hidden bg-navy-800 py-8 sm:py-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 size-[34rem] rounded-full bg-brand/14 blur-3xl motion-safe:animate-aurora"
      />
      <p className="relative mb-5 flex items-center justify-center gap-2 px-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-sprout">
        <LeafMark className="size-3.5" />
        Chances are, we&rsquo;re already in your neighborhood
      </p>

      <div className="mask-edge-x group relative flex overflow-hidden motion-reduce:overflow-x-auto">
        <div
          className="flex shrink-0 items-center animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none"
          style={{ animationDuration: "70s" }}
        >
          {[...houstonAreas, ...houstonAreas].map((area, i) => (
            <span key={`${area}-${i}`} className="flex items-center">
              <span className="whitespace-nowrap px-6 font-display text-lg font-medium tracking-tight text-white/85 sm:text-xl">
                {area}
              </span>
              <LeafMark className="size-4 shrink-0 text-sprout/70" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
