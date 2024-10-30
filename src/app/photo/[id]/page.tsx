import { baseURL } from '../../../lib/meta'
import { imgMapUrl } from '../../../lib/utils'
import ImagePlaceHolder from '@/components/ImagePlaceHolder'
import Modalphoto from '@/components/Modalphoto'
import { GetPhotos } from '../../../lib/microfictions'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = false

export async function generateStaticParams() {
  const photos = await GetPhotos()
  const { photosMF } = await photos
  const MFStaticParams = photosMF.map((post) => ({
    id: post.id.toString(),
  }))
  return await MFStaticParams
}

// const defaultImgMapUrl = await imgMapUrl()

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const photos = await GetPhotos()
  const { photosMF } = await photos
  const { id } = params
  const thisPhoto = photosMF.find((elt) => {
    return elt.id == id
  })!
  // console.log('thisPhoto => ', thisPhoto.sourceMainImg.url)
const thisPhotoUrl = thisPhoto.sourceMainImg.url
const thisPhotoAlt = (thisPhoto.Texte_alternatif !== '*' || undefined) ? thisPhoto.Texte_alternatif : 'Mais quelle belle place !'


  if (!thisPhoto) notFound()
  // let isGingkoBiloba = thisMF.Texte_microfiction[0]?.includes('biloba')
  // let isGingkoBiloba = thisMF.Texte_microfiction[0]?.includes('biloba')
  // const dateToDisplay = generateDateContent(thisMF.Date)
  // const truncatedContentToDisplay = isGingkoBiloba
  //   ? truncateContent(thisMF.Texte_microfiction[0]) + ' 🦄 🌈 🚀 🌍'
  //   : truncateContent(thisMF.Texte_microfiction[0])

  return {
    // title: isGingkoBiloba
    //   ? `Microfiction du ${dateToDisplay}, place de la Réunion` + ' 🌈🌈🌈 '
    //   : `Microfiction du ${dateToDisplay}, place de la Réunion`,
    // description: `${truncatedContentToDisplay} `,
    title: `Photographie ${id}, place de la Réunion, Paris 20`,
    description: `${thisPhotoAlt}`,
    alternates: {
      canonical: `${baseURL}/photo/${id}`,
    },
    openGraph: {
      title: `Photographie ${id}, place de la Réunion, Paris 20`,
      description: `${thisPhotoAlt}`,
      url: `${baseURL}/photo/${id}`,
      images: [
        {
          url: `${thisPhotoUrl}`,
          width: 1000,
          height: 858,
        },
      ],
      type: 'website',
    },
  }
}

export default async function PhotoModal({
  params,
}: {
  params: { id: string }
}) {
  const photos = await GetPhotos()
  const { photosMF } = await photos
  const { id } = params
  const thisPhoto = photosMF.find((elt) => {
    return elt.id == id
  })!

  const photoUrl = thisPhoto.sourceMainImg.url
  const PhotoTitle = thisPhoto.Texte_alternatif

  // const linkToShare = '/photo/' + thisPhoto.id

  return (
    <Modalphoto>
      {PhotoTitle}
      {photoUrl}
    </Modalphoto>
  )
}
