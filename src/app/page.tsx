import ImagePlaceHolder from '@/components/ImagePlaceHolder'
import SideBar from '@/components/SideBar'
import PinsList from '@/components/PinsList'
import { GetMicroFictions } from '../lib/microfictions'

export default async function Home(props) {
  const microF = await GetMicroFictions()
  const { microfictions } = microF
  // await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <section className="map-page relative flex">
      <article className="img-placeholder image-wrapper lg:w-[1080px] mx-auto relative mix-blend-darken ">
        <ImagePlaceHolder />
        <PinsList items={microfictions} />
      </article>
      <SideBar />
    </section>
  )
}