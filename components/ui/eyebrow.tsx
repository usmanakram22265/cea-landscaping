import { LeafMark } from "./leaf-mark";

/**
 * Section kicker: small leaf mark plus a short label, used sparingly.
 * Brand green on light surfaces, sprout green on dark evergreen bands.
 */
export function Eyebrow({
  children,
  onDark = false,
  className,
}: {
  children: React.ReactNode;
  onDark?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] ${
        onDark ? "text-sprout" : "text-brand"
      } ${className ?? ""}`}
    >
      <LeafMark className="size-3.5" />
      {children}
    </span>
  );
}
