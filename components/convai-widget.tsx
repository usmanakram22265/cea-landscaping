"use client";

import { useEffect } from "react";
import Script from "next/script";

/**
 * ElevenLabs ConvAI voice widget, self-hosted embed (v0.14.8 pinned).
 * Launcher: ONLY the green "Start a call" pill — no white card, no orb, no
 * "Message" button. Typed replies stay available inside the call sheet
 * (text-input is enabled; only the launcher's chat button is hidden).
 * - Branding via --el-* custom properties inline on the element (the
 *   Tailwind/Lightning pipeline strips custom-element selectors from
 *   globals.css, so a stylesheet rule never reaches the browser).
 * - Sheet radii pinned: the widget derives them from the button radius
 *   (calc(+6px)) and our pill button would balloon the sheet corners.
 */
const theme = {
  "--el-accent": "#028151",
  "--el-accent-hover": "#016a41",
  "--el-accent-active": "#01502f",
  "--el-accent-border": "#01502f",
  "--el-accent-subtle": "#62cf9c",
  "--el-accent-primary": "#ffffff",
  "--el-base-primary": "#12263d",
  "--el-base-subtle": "#4d6072",
  "--el-base-border": "#e3eae5",
  "--el-base-hover": "#f2f8f5",
  "--el-base-active": "#e2f1ea",
  "--el-button-radius": "999px",
  "--el-input-radius": "12px",
  "--el-bubble-radius": "14px",
  "--el-sheet-radius": "16px",
  "--el-compact-sheet-radius": "20px",
  "--el-dropdown-sheet-radius": "12px",
  zIndex: 60,
} as React.CSSProperties;

// Scoped to the closed launcher only: every rule keys on the presence of the
// "Start a call" button, which doesn't exist while the call sheet is open —
// so the in-call UI (orb visualizer included) is never affected.
// 1) launcher wrappers → transparent (kills the white card),
// 2) the orb subtree (contains canvas, no buttons) → hidden.
// The "Message" button stays: call and text chat sit side by side, and
// clicking one starts that specific mode.
const shadowCss = `
  div:has(button[aria-label="Start a call"]) {
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
  }
  div:has(button[aria-label="Start a call"]) div:has(canvas):not(:has(button)) {
    display: none !important;
  }
  /* keep the floating buttons legible on any background: white hairline ring
     + layered dark shadow (works over dark navy bands and white sections) */
  button[aria-label="Start a call"] {
    box-shadow:
      0 0 0 1.5px rgba(255, 255, 255, 0.4),
      0 2px 6px -1px rgba(8, 23, 38, 0.35),
      0 10px 28px -8px rgba(8, 23, 38, 0.5) !important;
  }
  button[aria-label="Message"] {
    box-shadow:
      0 0 0 1px rgba(18, 38, 61, 0.12),
      0 2px 6px -1px rgba(8, 23, 38, 0.3),
      0 10px 28px -8px rgba(8, 23, 38, 0.45) !important;
  }
`;

function injectShadowStyle() {
  const root = document.querySelector("elevenlabs-convai")?.shadowRoot;
  if (!root || root.querySelector("style[data-cea]")) return !!root;
  const style = document.createElement("style");
  style.setAttribute("data-cea", "");
  style.textContent = shadowCss;
  root.appendChild(style);
  return true;
}

export function ConvaiWidget() {
  useEffect(() => {
    // Poll until the injection actually lands. No time cap: on slow
    // connections the lazy 1.4MB widget script can take well over 30s to
    // arrive, and giving up early leaks the stock launcher (orb + card).
    // The poll stops the moment the style is in place.
    let stop = false;
    let timer = 0;
    const tick = () => {
      if (stop) return;
      if (!injectShadowStyle()) timer = window.setTimeout(tick, 500);
    };
    tick();
    // also re-arm as soon as the custom element upgrades, in case the
    // shadow root appears between polls
    customElements
      .whenDefined("elevenlabs-convai")
      .then(() => !stop && tick())
      .catch(() => {});
    return () => {
      stop = true;
      window.clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <elevenlabs-convai
        agent-id="agent_5401kwcfx69nfm8r5ndgpje9grfj"
        variant="compact"
        transcript="true"
        text-input="true"
        style={theme}
      />
      <Script src="/vendor/convai-widget-embed.js" strategy="lazyOnload" />
    </>
  );
}
