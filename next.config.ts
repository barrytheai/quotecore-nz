import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const withMDX = createMDX({
  extension: /\.mdx?$/,
});

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  turbopack: {
    root: __dirname,
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "quotecore.co.nz" }],
        destination: "https://quote-core.co.nz/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.quotecore.co.nz" }],
        destination: "https://quote-core.co.nz/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.quote-core.co.nz" }],
        destination: "https://quote-core.co.nz/:path*",
        permanent: true,
      },
    ];
  },
};

export default withMDX(nextConfig);
