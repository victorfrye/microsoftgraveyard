import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://microsoftgraveyard.com/sitemap.xml',
  };
}
