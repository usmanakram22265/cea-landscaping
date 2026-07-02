"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "left" | "right" | "none";

function offset(d: Direction) {
  switch (d) {
    case "up":
      return { y: 30, x: 0 };
    case "left":
      return { x: 30, y: 0 };
    case "right":
      return { x: -30, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
}

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const { x, y } = offset(direction);
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function MaskReveal({
  children,
  className,
  delay = 0,
  from = "left",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: "left" | "bottom";
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const hidden =
    from === "bottom" ? "inset(100% 0 0 0)" : "inset(0 100% 0 0)";
  return (
    <motion.div
      className={className}
      initial={{ clipPath: hidden, opacity: 0.4 }}
      whileInView={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  gap = 0.1,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: gap } },
  };
  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const { x, y } = offset(direction);
  const item: Variants = {
    hidden: { opacity: 0, x, y },
    show: { opacity: 1, x: 0, y: 0, transition: { duration: 0.65, ease: EASE } },
  };
  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
}

/**
 * Per-word reveal for headings. One parent IntersectionObserver drives a
 * staggered child reveal, so it fires reliably; plain text under reduced motion.
 */
const wordContainer: Variants = {
  hidden: {},
  show: (custom: { delay: number; stagger: number }) => ({
    transition: {
      delayChildren: custom.delay,
      staggerChildren: custom.stagger,
    },
  }),
};

const wordChild: Variants = {
  hidden: { y: "0.5em", opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};

export function WordReveal({
  text,
  className,
  delay = 0,
  stagger = 0.05,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3";
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{text}</Tag>;
  }

  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={wordContainer}
      custom={{ delay, stagger }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordChild}
          className="inline-block"
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </MotionTag>
  );
}

export function Counter({
  value,
  suffix = "",
  duration = 1.6,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    if (reduce) {
      raf = requestAnimationFrame(() => setN(value));
      return () => cancelAnimationFrame(raf);
    }
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min((t - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    // rAF can be throttled or paused (background/headless tabs); make sure
    // the counter always lands on its final value.
    const settle = setTimeout(() => setN(value), duration * 1000 + 200);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settle);
    };
  }, [inView, value, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {n}
      {suffix}
    </span>
  );
}
