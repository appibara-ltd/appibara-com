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
  async redirects() {
    return [
      {
        source: '/nema',
        destination: 'https://nema.appibara.com',
        permanent: true,
      },
      {
        source: '/nema/index.html',
        destination: 'https://nema.appibara.com',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/case-closed/privacy-policy.md',
          has: [
            {
              type: 'query',
              key: 'lang',
              value: 'tr',
            },
          ],
          destination: '/case-closed/privacy-policy-tr.md',
        },
        {
          source: '/case-closed/terms-and-conditions.md',
          has: [
            {
              type: 'query',
              key: 'lang',
              value: 'tr',
            },
          ],
          destination: '/case-closed/terms-and-conditions-tr.md',
        },
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
      {
        source: '/icons-data/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
