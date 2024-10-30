import Modalphoto from '@/components/Modalphoto'
import { GetPhotos } from '../../../lib/microfictions'

export const dynamicParams = false

export async function generateStaticParams() {
  const photos = await GetPhotos()
  const { photosMF } = await photos
  const MFStaticParams = photosMF.map((post) => ({
    id: post.id.toString(),
  }))
  return MFStaticParams
}

// const defaultImgMapUrl = await imgMapUrl()

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
