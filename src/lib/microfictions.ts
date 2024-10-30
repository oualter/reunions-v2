import 'server-only'
import qs from 'qs'
import { notFound } from 'next/navigation'
import type {
  PinType,
  PinAttributesType,
  PinPhotosType,
} from '@/typescript/types'

export const CACHE_TAG_REUNION = 'reunions'
const CMS_URL = process.env.CMS_URL

export async function GetMicroFictions() {
  const { data } = await fetchMF('api/microfictions')

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

export async function GetPhotos() {
  const { data } = await fetchMF('api/photos')

  // console.log('DATA => ', await data)

  return {
    photosMF: data.map((item: PinType) => {
      // console.log('ITEM => ', item)
      const { attributes, id } = item
      let { createdAt, Texte_alternatif, Coordonnees, Source }: PinPhotosType =
        attributes

      let sourceMainImg = Source.data.attributes.formats.large
      let sourceThumbImg = Source.data.attributes.formats.thumbnail
      // console.log('sourceImg => ', sourceMainImg)

      return {
        id,
        createdAt: createdAt,
        Texte_alternatif: Texte_alternatif,
        Coordonnees: Coordonnees,
        sourceMainImg: sourceMainImg,
        sourceThumbImg: sourceThumbImg,

        // GingkoBiloba: GingkoBiloba,
        // Texte_microfiction: Texte_microfiction.map(
        //   (elt: any) => elt.children[0].text
        // ),
      }
    }),
  }
}

async function fetchMF(reqApiEntryPoint: string) {
  // const url = `${CMS_URL}/api/microfictions?` + { encodeValuesOnly: true }
  const url = `${CMS_URL}/${reqApiEntryPoint}?populate=*`
  // console.log('params URL => ', params)
  const response = await fetch(url)
  if (!response.ok) {
    if (response.status === 404) {
      notFound()
    }
    throw new Error(`CMS returned ${response.status} for ${url}`)
  }
  return await response.json()
}
/*
export async function getAllItems(reqApiEntryPoint) {
  const response = await fetch(`${CMS_URL}/${reqApiEntryPoint}`)
  const data = await response.json()

  console.log('getAllItems data => ', await data.data)
  const tempData = await data.data

  // console.log('getAllItems data => ', tempData)

  const fileterdDate = await tempData.map((item) => {
    // console.log('ITEM => ', item)
    let { Source } = item.attributes
    // console.log('Source => ', Source)
    return 'allo'
  })

  // const events = []

  // for (const key in data) {
  //   events.push({
  //     id: key,
  //     ...data[key],
  //   })
  // }

  // return events
}
*/
