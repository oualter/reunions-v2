import { imgMapUrl } from '../../lib/utils'
import ImagePlaceHolder from '@/components/ImagePlaceHolder'
import PinsList from '@/components/PinsList'
import SideBar from '@/components/SideBar'
import { GetPhotos } from '../../lib/microfictions'
import type { Metadata } from 'next'



export const dynamicParams = false

export async function generateMetadata(): Promise<Metadata> {

  const defaultImgMapUrl = await imgMapUrl()
  return {
    title: `Photographies de la place de la Réunion Paris 20e`,
    description: `Promenez-vous sur la place de la Réunion et découvrez des photos de la place ✅ 16.51 Ouest`,
    alternates: {
      canonical: `/photographies`,
    },
    openGraph: {
      title: `Photographies de la pace de la Réunion Paris 20e`,
      description: `Promenez-vous sur la place de la Réunion et découvrez des photos de la place ✅ 16.51 Ouest`,
      url: `/photographies`,
      images: [
        {
          url: `${defaultImgMapUrl}`,
          width: 1000,
          height: 858,
        },
      ],
      type: 'website',
    },
  }
}

// type photosType = {
//   id: string
//   createdAt: string
//   Texte_alternatif: string
//   Coordonnees: string
//   sourceMainImg: [Object]
//   sourceThumbImg: [Object]
// }

export default async function showPhotos({ params }) {
  const photos = await GetPhotos()
  const { photosMF } = await photos

  return (
    <section className="map-page slug-page flex flex-wrap">
      <h1 className="grow-1 w-full flex-none">Photographies</h1>
      <article className="img-placeholder image-wrapper lg:w-[1080px] mx-auto relative mix-blend-darken ">
        <ImagePlaceHolder />
        <PinsList items={photosMF} pintype="photos" />
      </article>
      <SideBar />
    </section>
  )
}
