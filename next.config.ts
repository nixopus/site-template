import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output: the Dockerfile copies .next/standalone into a minimal runtime image.
  output: "standalone",
};

export default nextConfig;
