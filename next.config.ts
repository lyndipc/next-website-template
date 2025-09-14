import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d21xsngqrm5qi6.cloudfront.net",
        port: "",
        pathname: "/**",
      },
    ],
    unoptimized: false,
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
