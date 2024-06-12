import 'server-only'
import qs from 'qs'
import { notFound } from 'next/navigation'
import type { PinType, PinAttributesType } from '@/typescript/types'

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
      const { attributes, id } = item
      let {
        createdAt,
        Date,
        Heure,
        ordre_de_lecture,
        pingenerator,
        GingkoBiloba,
        Texte_microfiction,
      }: PinAttributesType = attributes

      return {
        id,
        createdAt: createdAt,
        Date: Date,
        Heure: Heure,
        ordre_de_lecture: ordre_de_lecture,
        pingenerator: pingenerator,
        GingkoBiloba: GingkoBiloba,
        Texte_microfiction: Texte_microfiction.map(
          (elt: any) => elt.children[0].text
        ),
      }
    }),
  }
}

async function fetchMF(parameters: { fields: string[]; sort: string[] }) {
  const url = `${CMS_URL}/api/microfictions?` + { encodeValuesOnly: true }
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
