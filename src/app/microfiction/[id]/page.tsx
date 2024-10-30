import { baseURL } from '../../../lib/meta'
import { imgMapUrl } from '../../../lib/utils'
import ImagePlaceHolder from '@/components/ImagePlaceHolder'
import Modal from '@/components/Modal'
import BlockRendererClient from '@/components/BlockRendererClient'
import Confettis from '@/components/Confettis'
import { GetMicroFictions } from '../../../lib/microfictions'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const dynamicParams = false

function generateDateContent(dateToCompute: string): string {
  let MFDay = dateToCompute.split('/')[0]
  let MFMonth = dateToCompute.split('/')[1]
  let MFYear = dateToCompute.split('/')[2]
  const dateToBeFormatted = MFYear + '-' + MFMonth + '-' + MFDay
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
  return finalDisplayDate
}

const truncateContent = (content) =>
  content?.length > 160 ? `${content.substring(0, 155)}...` : content

export async function generateStaticParams() {
  const microF = await GetMicroFictions()
  const { microfictions } = microF
  const MFStaticParams = microfictions.map((post) => ({
    id: post.id.toString(),
  }))
  return MFStaticParams
}

const defaultImgMapUrl = await imgMapUrl()
export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const microF = await GetMicroFictions()
  const { microfictions } = microF
  const { id } = params
  const thisMF = microfictions.find((elt) => {
    // console.log('elt.id => ', elt.id)
    return elt.id == id
  })!
  if (!thisMF) notFound()
  let isGingkoBiloba = thisMF.Texte_microfiction[0]?.includes('biloba')
  // let isGingkoBiloba = thisMF.Texte_microfiction[0]?.includes('biloba')
  const dateToDisplay = generateDateContent(thisMF.Date)
  const truncatedContentToDisplay = isGingkoBiloba
    ? truncateContent(thisMF.Texte_microfiction[0]) + ' 🦄 🌈 🚀 🌍'
    : truncateContent(thisMF.Texte_microfiction[0])

  return {
    title: isGingkoBiloba
      ? `Microfiction du ${dateToDisplay}, place de la Réunion` + ' 🌈🌈🌈 '
      : `Microfiction du ${dateToDisplay}, place de la Réunion`,
    description: `${truncatedContentToDisplay} `,
    alternates: {
      canonical: `${baseURL}/microfiction/${id}`,
    },
    openGraph: {
      title: isGingkoBiloba
        ? `Microfiction du ${dateToDisplay}, place de la Réunion` + ' 🌈🌈🌈 '
        : `Microfiction du ${dateToDisplay}, place de la Réunion`,
      description: `${truncatedContentToDisplay} `,
      url: `${baseURL}/microfiction/${id}`,
      images: [
        {
          url: `${defaultImgMapUrl}`,
          width: 1000,
          height: 858,
        },
      ],
      type: 'website',
    },
  }
}

export default async function MicrofictionPage({
  params,
}: {
  params: { id: number }
}) {
  const microF = await GetMicroFictions()
  // console.log('microF => ', microF)
  const { microfictions } = microF
  const { id } = params
  const thisMF = microfictions.find((elt) => {
    return elt.id == id
  })!


  const { Heure, Texte_microfiction, GingkoBiloba } = thisMF
  const finalDateToDisplay = generateDateContent(thisMF.Date)

  const linkToShare = '/microfiction/' + thisMF.id

  return (
    <>
      <Modal isParallelRoute={true}>
        <div>{finalDateToDisplay}</div>
        <div>{Heure}</div>
        <article>
          <BlockRendererClient content={Texte_microfiction} />
        </article>
        <div>{GingkoBiloba}</div>
        <div>{linkToShare}</div>
      </Modal>
      <Confettis isGingkoBiloba={GingkoBiloba} />
      <ImagePlaceHolder />
    </>
  )
}
