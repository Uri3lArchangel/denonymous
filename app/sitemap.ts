import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://denonymous.xyz/',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.3,
    },
    {
      url: 'https://denonymous,xyz/auth/signup',
      lastModified: new Date(),
      changeFrequency: 'never',
      priority: 0.5,
    },
    {
        url: 'https://denonymous,xyz/auth/signin',
        lastModified: new Date(),
        changeFrequency: 'never',
        priority: 0.5,
      },
      {
        url: 'https://denonymous,xyz/auth/reset-password',
        lastModified: new Date(),
        changeFrequency: 'never',
        priority: 0.4,
      }, {
        url: 'https://denonymous,xyz/dashboard',
        lastModified: new Date(),
        changeFrequency: 'never',
        priority: 0.7,
      },
      {
        url: 'https://denonymous,xyz/notifications',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        url: 'https://denonymous,xyz/settings',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      },  {
        url: 'https://denonymous,xyz/r/',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 1,
      },
  ]
}