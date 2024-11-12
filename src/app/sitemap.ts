import type { MetadataRoute } from 'next'
import { baseURL } from '../lib/meta'
import { GetMicroFictions, GetPhotos } from '../lib/microfictions'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const microF = await GetMicroFictions()
  const { microfictions } = await microF
  // console.log('sitemap microfictions => ', microfictions)
  const microfictionsEntries: MetadataRoute.Sitemap = microfictions.map(
    ({ id }) => ({
      url: `${baseURL}/microfiction/${id}`,
    })
  )

  const photos = await GetPhotos()
  const { photosMF } = await photos
  const photosEntries: MetadataRoute.Sitemap = photosMF.map(({ id }) => ({
    url: `${baseURL}/photo/${id}`,
  }))

  return [
    {
      url: baseURL,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/a-propos`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/contact`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/mentions-legales`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseURL}/janvier`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/fevrier`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/mars`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/avril`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/mai`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/juin`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/juillet`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/aout`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/septembre`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/octobre`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/novembre`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseURL}/decembre`,
      // lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    ...microfictionsEntries,
    ...photosEntries,
  ]
}
