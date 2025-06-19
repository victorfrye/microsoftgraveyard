import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap: MetadataRoute.Sitemap = [
    {
      url: 'https://microsoftgraveyard.com',
      lastModified: new Date(),
      priority: 1.0,
      changeFrequency: 'weekly',
    },
  ];

  return sitemap;
}
