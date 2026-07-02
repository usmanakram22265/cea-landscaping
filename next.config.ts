import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in the home directory otherwise
  // makes Turbopack infer the wrong root and serve stale compiles.
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    // lower-quality tiers used for decorative/large imagery to cut bytes
    qualities: [60, 65, 70, 75],
  },
};

export default nextConfig;
