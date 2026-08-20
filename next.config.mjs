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
