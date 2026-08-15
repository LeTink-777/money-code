import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The PDF route reads the Cyrillic TTFs at runtime, so they must be traced
  // into the serverless bundle — nothing imports them statically.
  outputFileTracingIncludes: {
    "/api/**": ["./assets/fonts/**"],
  },
  // Apex to www. Only fires once denezhnyi-kod.ru actually points at this project;
  // it is inert on the .vercel.app domain.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "denezhnyi-kod.ru" }],
        destination: "https://www.denezhnyi-kod.ru/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
