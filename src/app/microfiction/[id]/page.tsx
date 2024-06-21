import Modal from '@/components/Modal'
import MFCard from '@/components/MFCard'
import BlockRendererClient from '@/components/BlockRendererClient'
import { GetMicroFictions } from '../../../lib/microfictions'


export default async function MicrofictionPage({
  params: { id },
}: {
  params: { id: string }
}) {
  const microF = await GetMicroFictions()
  const { microfictions } = microF
  const thisMF = microfictions.find((elt) => {
    return elt.id == id
  })!

  const { Heure, Texte_microfiction } = thisMF
  let MFDay = thisMF.Date.split('/')[0]
  let MFMonth = thisMF.Date.split('/')[1]
  let MFYear = thisMF.Date.split('/')[2]
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
  return (
    <div className="card">
      <Modal>
        <div>{finalDisplayDate}</div>
        <div>{Heure}</div>
        <article>
          <BlockRendererClient content={Texte_microfiction} />
        </article>
      </Modal>
    </div>
  )
}
