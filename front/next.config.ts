import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'es.web.img3.acsta.net',
            },
        ],
    },
};

export default nextConfig;
