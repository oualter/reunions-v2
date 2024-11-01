import Image from 'next/image'
import loader from './assets/loader.svg'

export default function Loading() {
  return (
    <article className="sm:min-h-[500px] min-h-80 flex justify-center mx-auto my-6 px-2 lg:px-0">
      <Image
        src={loader}
        alt="Chargement en cours"
        height={200}
        width={200}
        unoptimized
        className="block mx-auto"
      />
    </article>
  )
}
