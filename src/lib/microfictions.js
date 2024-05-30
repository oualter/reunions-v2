import 'server-only'
import qs from 'qs'
import { notFound } from 'next/navigation'

export const CACHE_TAG_REUNION = 'reunions'
const CMS_URL = process.env.CMS_URL

export async function GetMicroFictions(params) {
  const { data } = await fetchMF({
    fields: [
      'createdAt',
      'Date',
      'Heure',
      'ordre_de_lecture',
      'pingenerator',
      'GingkoBiloba',
      'Texte_microfiction',
    ],
    sort: ['ordre_de_lecture:asc'],
  })
  return {
    microfictions: data.map((item) => {
      const { attributes, id } = item
      return {
        id,
        createdAt: attributes.createdAt,
        Date: attributes.Date,
        Heure: attributes.Heure,
        ordre_de_lecture: attributes.ordre_de_lecture,
        pingenerator: attributes.pingenerator,
        GingkoBiloba: attributes.GingkoBiloba,
        Texte_microfiction: attributes.Texte_microfiction.map(
          (elt) => elt.children[0].text
        ),
        // Texte_microfiction: attributes.Texte_microfiction,
      }
    }),
  }
}

async function fetchMF(parameters) {
  const url =
    `${CMS_URL}/api/microfictions?` + (parameters, { encodeValuesOnly: true })
  const response = await fetch(url, {
    next: {
      tags: [CACHE_TAG_REUNION],
    },
  })
  if (!response.ok) {
    if (response.status === 404) {
      notFound()
    }
    throw new Error(`CMS returned ${response.status} for ${url}`)
  }
  return await response.json()
}
