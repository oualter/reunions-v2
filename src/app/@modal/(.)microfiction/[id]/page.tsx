import { MicrofictionsContextProvider } from '@/contexts/microfictions.context'
import BlockRendererClient from '@/components/BlockRendererClient'

import MFCard from '@/components/MFCard'
import Modal from '@/components/Modal'
import { GetMicroFictions } from '../../../../lib/microfictions'
import Confettis from '@/components/Confettis'

export default async function MicrofictionModal({
  params: { id: id },
}: {
  params: { id: number }
}) {
  const microF = await GetMicroFictions()
  const { microfictions } = microF
  const thisMF = microfictions.find((elt) => {
    return elt.id == id
  })!

  const { Heure, Texte_microfiction, GingkoBiloba } = thisMF
  let MFDay = thisMF.Date.split('/')[0]
  let MFMonth = thisMF.Date.split('/')[1]
  let MFYear = thisMF.Date.split('/')[2]

  console.log('thisMF => ', thisMF)

  // console.log('GingkoBiloba => ', GingkoBiloba)

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
    <MicrofictionsContextProvider value={microfictions}>
      <>
        <Modal>
          <div>{finalDisplayDate}</div>
          <div>{Heure}</div>
          <div>
            <BlockRendererClient content={Texte_microfiction} />
          </div>
          <div>{GingkoBiloba}</div>
        </Modal>
      </>
    </MicrofictionsContextProvider>
  )
}
