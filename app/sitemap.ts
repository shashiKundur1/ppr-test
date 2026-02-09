import { MetadataRoute } from 'next'
import people from '@/app/data/people.json'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ppr-test-eight.vercel.app'

  // Home page
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // All person pages
  const personRoutes: MetadataRoute.Sitemap = people.map((person) => ({
    url: `${baseUrl}/person/${person.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...routes, ...personRoutes]
}
