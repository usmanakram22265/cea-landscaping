"use client";

import Script from "next/script";

/**
 * ElevenLabs ConvAI voice/chat widget, self-hosted embed (v0.14.8 pinned).
 * Fully stock: default launcher, default styling, no shadow-DOM overrides.
 */
export function ConvaiWidget() {
  return (
    <>
      <elevenlabs-convai
        agent-id="agent_5401kwcfx69nfm8r5ndgpje9grfj"
        transcript="true"
        text-input="true"
      />
      <Script
        src="/vendor/convai-widget-embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
