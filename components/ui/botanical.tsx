import Image from "next/image";

/**
 * Faint botanical line-art ornament for light sections. Each section uses a
 * different motif (fern branch, ornamental grass, seedling, planting plan)
 * from the same fine-line family. The artwork is dark strokes on white;
 * mix-blend-multiply makes the white invisible over any light background,
 * leaving only the fine green line work.
 */
export function Botanical({
  src = "/images/gen2/botanical-line.webp",
  className,
}: {
  src?: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden
      width={520}
      height={520}
      className={`pointer-events-none select-none mix-blend-multiply ${
        className ?? ""
      }`}
    />
  );
}
