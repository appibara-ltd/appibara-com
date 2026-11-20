import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.nativeflow.app',
      },
      {
        protocol: 'https',
        hostname: 'learnsql.dev',
      },
    ],
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/blog.md',
          destination: '/api/markdown/blog',
        },
        {
          source: '/blog/:slug.md',
          destination: '/api/markdown/blog/:slug',
        },
        {
          source: '/',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: '.*text/markdown.*',
            },
          ],
          destination: '/llms.txt',
        },
        {
          source: '/blog',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: '.*text/markdown.*',
            },
          ],
          destination: '/api/markdown/blog',
        },
        {
          source: '/blog/:slug',
          has: [
            {
              type: 'header',
              key: 'accept',
              value: '.*text/markdown.*',
            },
          ],
          destination: '/api/markdown/blog/:slug',
        },
      ],
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/',
        headers: [
          {
            key: 'Vary',
            value: 'Accept',
          },
          {
            key: 'Link',
            value:
              '</llms.txt>; rel="describedby"; type="text/markdown", </llms-full.txt>; rel="alternate"; type="text/markdown"',
          },
        ],
      },
      {
        source: '/blog',
        headers: [
          {
            key: 'Vary',
            value: 'Accept',
          },
          {
            key: 'Link',
            value: '</blog.md>; rel="alternate"; type="text/markdown"',
          },
        ],
      },
      {
        source: '/blog/:slug',
        headers: [
          {
            key: 'Vary',
            value: 'Accept',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
