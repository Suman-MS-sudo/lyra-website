/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.lyraenterprise.co.in",
      },
      {
        protocol: "https",
        hostname: "cdni.iconscout.com",
      },
    ],
  },
};

export default nextConfig;
