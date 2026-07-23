import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '*.ngrok-free.app',
    '*.ngrok.io',
    '127.0.0.1:3000',
  ],
  compress: true,
};

export default nextConfig;
