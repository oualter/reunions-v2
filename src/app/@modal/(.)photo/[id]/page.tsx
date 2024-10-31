import Modalphoto from '@/components/Modalphoto'
import { GetPhotos } from '../../../../lib/microfictions'

export const dynamicParams = false

export async function generateStaticParams() {
  const photos = await GetPhotos()
  const { photosMF } = await photos
  const MFStaticParams = photosMF.map((post) => ({
    id: post.id.toString(),
  }))
  return MFStaticParams
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

  const PhotoTitle = thisPhoto.Texte_alternatif
  const photoUrl =
    '/' + thisPhoto.sourceMainImg.hash + thisPhoto.sourceMainImg.ext

  // const linkToShare = '/photo/' + thisPhoto.id

  // await new Promise((resolve) => setTimeout(resolve, 3000))
  return (
    <Modalphoto>
      {PhotoTitle}
      {photoUrl}
    </Modalphoto>
  )
}
