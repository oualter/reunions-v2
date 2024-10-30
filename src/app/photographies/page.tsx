import { baseURL } from '../../lib/meta'
import { imgMapUrl } from '../../lib/utils'
import ImagePlaceHolder from '@/components/ImagePlaceHolder'
import PinsList from '@/components/PinsList'
import SideBar from '@/components/SideBar'
import { GetPhotos } from '../../lib/microfictions'
import { chapitres } from '@/data'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [
    { slug: 'janvier' },
    { slug: 'fevrier' },
    { slug: 'mars' },
    { slug: 'avril' },
    { slug: 'mai' },
    { slug: 'juin' },
    { slug: 'juillet' },
    { slug: 'aout' },
    { slug: 'septembre' },
    { slug: 'octobre' },
    { slug: 'novembre' },
    { slug: 'decembre' },
  ]
}

type Props = {
  slug: string
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Props
}): Promise<Metadata> {
  const slug = params.slug
  const pageTitleObj = chapitres.filter((elt) => {
    return elt.month === slug
  })
  // console.log('pageTitleObj => ', pageTitleObj)
  // if (pageTitleObj.length < 1) {
  //   notFound()
  // }
  const defaultImgMapUrl = await imgMapUrl()
  // const pageTitleMeta = pageTitleObj[0].title
  return {
    // title: `Microfictions du ${pageTitleMeta}`,
    description: `Promenez-vous sur la place de la Réunion et découvrez un instant de vie passé, présent ou futur ✅ 16.51 Ouest`,
    alternates: {
      canonical: `${baseURL}/${slug}`,
    },
    openGraph: {
      // title: `Microfictions du ${pageTitleMeta}  @ 16.51 Ouest`,
      description: `Promenez-vous sur la place de la Réunion et découvrez un instant de vie passé, présent ou futur ✅ 16.51 Ouest`,
      url: `${baseURL}/${slug}`,
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
type photosType = {
  id: string
  createdAt: string
  Texte_alternatif: string
  Coordonnees: string
  sourceMainImg: [Object]
  sourceThumbImg: [Object]
}

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
