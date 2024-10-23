import Image from 'next/image'
import { imgMapUrl } from '../../lib/utils'

export default async function ImagePlaceHolder(props) {
  const defaultImgMapUrl = await imgMapUrl()
  return (
    <Image
      src={defaultImgMapUrl}
      width={1080}
      height={927}
      priority={true}
      // placeholder="blur"
      // sizes="(min-width: 808px) 66%, 100vw"
      // fill
      // unoptimized={true}
      alt="Place de La Réunion"
      className="relative"
    />
  )
}
