import 'server-only'
import qs from 'qs'
import { notFound } from 'next/navigation'
import { type PinType } from '@/typescript/types'

export const CACHE_TAG_REUNION = 'reunions'
const CMS_URL = process.env.CMS_URL

export async function GetMicroFictions() {
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
    microfictions: data.map((item: PinType) => {
      console.log('item => ', item)
      const { attributes, id } = item
      const {
        createdAt,
        Date,
        Heure,
        ordre_de_lecture,
        pingenerator,
        GingkoBiloba,
        Texte_microfiction,
      } = attributes
      console.log('attributes => ', attributes)
      return {
        id,
        createdAt: createdAt,
        Date: Date,
        Heure: Heure,
        ordre_de_lecture: ordre_de_lecture,
        pingenerator: pingenerator,
        GingkoBiloba: GingkoBiloba,
        Texte_microfiction: Texte_microfiction.map(
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
