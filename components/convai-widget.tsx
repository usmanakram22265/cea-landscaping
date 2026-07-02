"use client";

import { useEffect } from "react";
import Script from "next/script";

/**
 * ElevenLabs ConvAI voice widget, self-hosted embed (v0.14.8 pinned).
 * - Script loads lazily so it never competes with the hero video.
 * - Branding: the widget reads --el-* custom properties on its shadow :host;
 *   we override them inline on the element (the Tailwind/Lightning pipeline
 *   strips custom-element selectors from globals.css, so a stylesheet rule
 *   never reaches the browser).
 * - Sheet radii are pinned to fixed values because the widget derives them
 *   from the button radius (calc(+6px)), and our pill buttons would balloon
 *   the opened call sheet's corners.
 */
const theme = {
  // accent = the call pill + primary actions (stock is black)
  "--el-accent": "#028151",
  "--el-accent-hover": "#016a41",
  "--el-accent-active": "#01502f",
  "--el-accent-border": "#01502f",
  "--el-accent-subtle": "#62cf9c",
  "--el-accent-primary": "#ffffff",
  // sheet re-tinted to the site's ink/mint/border system
  "--el-base-primary": "#12263d",
  "--el-base-subtle": "#4d6072",
  "--el-base-border": "#e3eae5",
  "--el-base-hover": "#f2f8f5",
  "--el-base-active": "#e2f1ea",
  // pill launcher button, calm corners on the opened sheet
  "--el-button-radius": "999px",
  "--el-input-radius": "12px",
  "--el-bubble-radius": "14px",
  "--el-sheet-radius": "16px",
  "--el-compact-sheet-radius": "20px",
  "--el-dropdown-sheet-radius": "12px",
  // above content, below the photo lightbox (z-80)
  zIndex: 60,
} as React.CSSProperties;

// 1) Hide the animated orb avatar (the "CD-like" circle): precisely the
//    rounded-full circle that directly wraps the orb <canvas>, nothing else.
// 2) Remove the white pill card behind the closed launcher: any surface that
//    contains the "Start a call" button goes transparent. The selector keys on
//    that aria-label, so the opened call sheet (different buttons) is untouched.
// 3) Hide the launcher's "Message" button — the call stays the single entry
//    point, but typed replies remain available inside the call sheet.
const shadowCss = `
  [class~="rounded-full"]:has(> canvas) { display: none !important; }
  div:has(> button[aria-label="Start a call"]) {
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
    padding: 0 !important;
  }
  button[aria-label="Message"] { display: none !important; }
`;

// Client-facing launcher copy (the embed has no text attributes, so the
// label's text node is rewritten in place and kept via a MutationObserver).
const LAUNCH_LABEL = "Ask about your property";

function brandShadow(root: ShadowRoot) {
  if (!root.querySelector("style[data-cea]")) {
    const style = document.createElement("style");
    style.setAttribute("data-cea", "");
    style.textContent = shadowCss;
    root.appendChild(style);
  }
  const btn = root.querySelector('button[aria-label="Start a call"]');
  btn?.childNodes.forEach((n) => {
    if (
      n.nodeType === Node.TEXT_NODE &&
      n.textContent?.trim() &&
      n.textContent.trim() !== LAUNCH_LABEL
    ) {
      n.textContent = LAUNCH_LABEL;
    }
  });
}

export function ConvaiWidget() {
  useEffect(() => {
    let observer: MutationObserver | null = null;
    let tries = 0;
    const timer = window.setInterval(() => {
      tries += 1;
      const root = document.querySelector("elevenlabs-convai")?.shadowRoot;
      if (root) {
        brandShadow(root);
        if (!observer) {
          observer = new MutationObserver(() => brandShadow(root));
          observer.observe(root, {
            childList: true,
            subtree: true,
            characterData: true,
          });
        }
        window.clearInterval(timer);
      } else if (tries > 60) {
        window.clearInterval(timer);
      }
    }, 500);
    return () => {
      window.clearInterval(timer);
      observer?.disconnect();
    };
  }, []);

  return (
    <>
      {/* compact call-only launcher: a phone-icon pill ("Start a call"),
          no card, no orb, no typed-chat button; transcript shows during calls */}
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
