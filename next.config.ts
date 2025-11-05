import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    basePath: '/games/gyk',
    output: "export",
    images: {unoptimized: true}
  /* config options here */
};
module.exports = nextConfig;
export default nextConfig;
