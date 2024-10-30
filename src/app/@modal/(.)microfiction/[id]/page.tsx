import BlockRendererClient from '@/components/BlockRendererClient'
import Modal from '@/components/Modal'
import { GetMicroFictions } from '../../../../lib/microfictions'
import Confettis from '@/components/Confettis'

export const dynamicParams = false

export async function generateStaticParams() {
  const microF = await GetMicroFictions()
  const { microfictions } = microF
  const MFStaticParams = microfictions.map((post) => ({
    id: post.id.toString(),
  }))
  return MFStaticParams
}

export default async function MicrofictionModal({
  params,
}: {
  params: { id: string }
}) {
  const microF = await GetMicroFictions()
  const { microfictions } = microF
  const { id } = params
  const thisMF = microfictions.find((elt) => {
    return elt.id == id
  })!

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
      <Confettis isGingkoBiloba={GingkoBiloba} />
    </>
  )
}
