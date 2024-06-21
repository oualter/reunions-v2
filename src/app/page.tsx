import { MicrofictionsContextProvider } from '@/contexts/microfictions.context'
import ImagePlaceHolder from '@/components/ImagePlaceHolder'
import SideBar from '@/components/SideBar'
import PinsList from '@/components/PinsList'
import { GetMicroFictions } from '../lib/microfictions'
import Confettis from '@/components/Confettis'

export default async function Home() {
  const microF = await GetMicroFictions()
  const { microfictions } = microF

  // await new Promise((resolve) => setTimeout(resolve, 1000))

  return (
    <MicrofictionsContextProvider value={{ microfictions }}>
      <section className="map-page relative">
        <article className="img-placeholder image-wrapper lg:w-[1080px] mx-auto relative mix-blend-darken ">
          <ImagePlaceHolder />
          <PinsList />
        </article>
        <SideBar />
      </section>
      <Confettis />
    </MicrofictionsContextProvider>
  )
}
