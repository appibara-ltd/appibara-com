import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const aiBots = [
    'OAI-SearchBot',
    'ChatGPT-User',
    'GPTBot',
    'Claude-SearchBot',
    'Claude-Web',
    'ClaudeBot',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Google-Extended',
    'Googlebot',
    'Applebot',
    'Applebot-Extended',
    'CCBot',
    'Meta-ExternalAgent',
  ];

  return {
    rules: [
      ...aiBots.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: '/_next/',
      })),
      {
        userAgent: '*',
        allow: '/',
        disallow: '/_next/',
      },
    ],
    sitemap: 'https://appibara.com/sitemap.xml',
  };
}
