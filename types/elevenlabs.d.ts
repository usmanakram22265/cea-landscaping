import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "agent-id"?: string;
        transcript?: string;
        "text-input"?: string;
        "text-only"?: string;
        variant?: string;
        "use-rtc"?: string;
      };
    }
  }
}
