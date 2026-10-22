import { MetadataRoute } from 'next'
import { estaCerrado, getEmpleos } from '@/lib/empleos'

const BASE_URL = 'https://cicloaysen.com'

export const revalidate = 3600

export default function sitemap(): MetadataRoute.Sitemap {
  const empleos: MetadataRoute.Sitemap = getEmpleos()
    .filter((e) => !estaCerrado(e))
    .map((e) => ({
      url: `${BASE_URL}/trabaja-con-nosotros/${e.slug}`,
      lastModified: new Date(e.fechaPublicacion),
      changeFrequency: 'weekly',
      priority: 0.6,
    }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/experiencia`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/equipo`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/compliance`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/trabaja-con-nosotros`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    ...empleos,
  ]
}
