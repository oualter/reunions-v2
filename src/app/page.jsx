import { MicrofictionsContextProvider } from './contexts/microfictions.context'
import ImagePlaceHolder from './components/ImagePlaceHolder'
import PinsList from './components/PinsList'
import Modal from './components/Modal'
import YearsSlider from './components/YearsSlider.jsx'
import { GetMicroFictions } from '../lib/microfictions'
import Confettis from './components/Confettis'

// async function getStrapiData() {
//   const res = await fetch('http://localhost:1337/api/notes')
//   const data = await res.json()
//   return data
// }

export default async function Home() {
  const microF = await GetMicroFictions()
  const { microfictions } = await microF

  await new Promise((resolve) => setTimeout(resolve, 3000))

  return (
    <MicrofictionsContextProvider value={{ microfictions }}>
      <section className="map-page relative">
        <article className="img-placeholder image-wrapper lg:w-[1080px] mx-auto relative mix-blend-darken ">
          <ImagePlaceHolder />
          <PinsList />
        </article>
        <YearsSlider />
        <Modal />
      </section>
      <Confettis />
    </MicrofictionsContextProvider>
  )
}
