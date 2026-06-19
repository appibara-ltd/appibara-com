import { MetadataRoute } from 'next';
import { POSTS } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://appibara.com';

  // Static routes
  const staticRoutes = [
    '',
    '/blog',
    '/cookie-policy',
    '/privacy-policy',
    '/privashot',
    '/projects/kokono/privacy-policy',
    '/projects/kokono/terms-conditions',
    '/projects/selfymon/privacy-policy',
    '/projects/selfymon/terms-and-conditions',
    '/terms-and-conditions',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/blog' ? 0.8 : 0.5,
  }));

  // Dynamic blog post routes (only published ones from POSTS)
  const blogRoutes = POSTS.map((post) => {
    // Parse the post date safely or default to now
    let postDate = new Date();
    try {
      const parsed = new Date(post.date);
      if (!isNaN(parsed.getTime())) {
        postDate = parsed;
      }
    } catch (e) {
      // Keep today's date
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: postDate,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...blogRoutes];
}
