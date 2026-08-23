/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Default deviceSizes starts at 640px — any <Image> whose `sizes` prop mixes
    // a vw value with a fixed px value gets classified as "responsive" and only
    // ever serves from this list, even when the container is much smaller (e.g.
    // ~200-400px product thumbnails). Adding smaller candidates here lets Next
    // pick an appropriately small width instead of always serving 640px+.
    deviceSizes: [256, 384, 480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "lyraenterprise.co.in",
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
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.lyraenterprise.co.in" }],
        destination: "https://lyraenterprise.co.in/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
