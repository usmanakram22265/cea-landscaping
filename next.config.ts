import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Pin the workspace root: a stray lockfile in the home directory otherwise
  // makes Turbopack infer the wrong root and serve stale compiles.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
