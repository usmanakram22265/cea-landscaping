"use client";

import Script from "next/script";

/**
 * ElevenLabs ConvAI voice/chat widget, self-hosted embed (v0.14.8 pinned).
 * Fully stock: default launcher, default styling, no shadow-DOM overrides.
 */
export function ConvaiWidget() {
  return (
    <>
      {/* stacked below the photo lightbox (z-80) so it never covers photos;
          the widget itself is otherwise untouched */}
      <elevenlabs-convai
        agent-id="agent_5401kwcfx69nfm8r5ndgpje9grfj"
        transcript="true"
        text-input="true"
        style={{ zIndex: 60 }}
      />
      <Script
        src="/vendor/convai-widget-embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
