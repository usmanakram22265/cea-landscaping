export function LeafMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      role="presentation"
    >
      {/* trunk / stem */}
      <path
        d="M16 30V12"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* lower leaves */}
      <path
        d="M16 20c-1.6-3.8-5-5.2-8.6-5 0 3.8 2.4 6.7 6.2 7.1"
        fill="currentColor"
        opacity="0.55"
      />
      <path
        d="M16 20c1.6-3.8 5-5.2 8.6-5 0 3.8-2.4 6.7-6.2 7.1"
        fill="currentColor"
        opacity="0.55"
      />
      {/* upper leaves */}
      <path
        d="M16 13C14.7 9 11.6 7.2 8 7.4c0 3.6 2.2 6.4 5.7 6.9"
        fill="currentColor"
        opacity="0.8"
      />
      <path
        d="M16 13c1.3-4 4.4-5.8 8-5.6 0 3.6-2.2 6.4-5.7 6.9"
        fill="currentColor"
        opacity="0.8"
      />
      {/* crown sprout */}
      <path
        d="M16 11c-1-3 .2-6 3-7.6C20.4 6.2 19 9.6 16 11Z"
        fill="currentColor"
      />
    </svg>
  );
}
