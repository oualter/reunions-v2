import { MicrofictionsContextProvider } from '@/contexts/microfictions.context'
import BlockRendererClient from '@/components/BlockRendererClient'
// import dynamic from 'next/dynamic'

import Modal from '@/components/Modal'
import { GetMicroFictions } from '../../../../lib/microfictions'
import Confettis from '@/components/Confettis'

export const dynamicParams = false
export const dynamic = 'force-static'

export async function generateStaticParams() {
  const microF = await GetMicroFictions()
  const { microfictions } = microF
  const MFStaticParams = microfictions.map((post) => ({
    id: post.id.toString(),
  }))
  // const MFStaticParams = [{ id: 1 }, { id: 2 }, { id: 3 }]
  return MFStaticParams
}

export default async function MicrofictionModal({
  params,
}: {
  params: { id: string }
}) {
  // export default async function MicrofictionModal({
  //   params: { id: id },
  // }: {
  //   params: { id: number }
  // }) {
  // console.log('params !!!! => ', params)
  // console.log('PAGE : src > app > @modal > (.)microfiction > [id] > page.tsx')
  const microF = await GetMicroFictions()
  const { microfictions } = microF
  const { id } = params
  console.log('microfiction ID => ', id)
  const thisMF = microfictions.find((elt) => {
    return elt.id == id
  })!

  // console.log('thisMF => ', thisMF)
  const { Heure, Texte_microfiction, GingkoBiloba } = thisMF
  let MFDay = thisMF.Date.split('/')[0]
  let MFMonth = thisMF.Date.split('/')[1]
  let MFYear = thisMF.Date.split('/')[2]

  const linkToShare = '/microfiction/' + thisMF.id

  const dateToBeFormatted =
    MFYear + '-' + MFMonth + '-' + MFDay /*+ 'T' + mfHour+':00'*/
  let displayDate = new Date(dateToBeFormatted).toLocaleDateString('fr-fr', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  let finalDisplayDate
  if (MFYear.includes('-')) {
    let stringToReplace =
      displayDate.split(' ')[displayDate.split(' ').length - 1]
    finalDisplayDate = displayDate.replace(
      stringToReplace,
      '-' + stringToReplace
    )
  } else {
    finalDisplayDate = displayDate
  }

  // await new Promise((resolve) => setTimeout(resolve, 3000))
  return (
    <MicrofictionsContextProvider value={{ isGingkoBiloba: GingkoBiloba }}>
      <>
        <Modal>
          <div>{finalDisplayDate}</div>
          <div>{Heure}</div>
          <div>
            <BlockRendererClient content={Texte_microfiction} />
          </div>
          <div>{GingkoBiloba}</div>
          <div>{linkToShare}</div>
        </Modal>
        <Confettis />
      </>
    </MicrofictionsContextProvider>
  )
}
