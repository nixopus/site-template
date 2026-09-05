import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Standalone output: the Dockerfile copies .next/standalone into a minimal runtime image.
  output: "standalone",
  // Stock-photo CDNs allowed through next/image; img-slot's plain <img> needs no listing.
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "picsum.photos" },
    ],
  },
};

export default nextConfig;
