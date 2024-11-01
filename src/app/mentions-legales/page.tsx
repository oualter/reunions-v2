import SideBar from '@/components/SideBar'
import BlockRendererClient from '@/components/BlockRendererClient'
import { baseURL } from '../../lib/meta'
import { imgMapUrl } from '../../lib/utils'
import type { Metadata } from 'next'

const defaultImgMapUrl = await imgMapUrl()
export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'L’accès et la consultation de ce site Internet sont soumis aux présentes mentions légales ainsi qu’aux lois et règlements applicables ✅ 16.51 Ouest',
  alternates: {
    canonical: `${baseURL}/mentions-legales`,
  },
  openGraph: {
    title: `Mentions légales @ 16.51 Ouest`,
    description: `L’accès et la consultation de ce site Internet sont soumis aux présentes mentions légales ainsi qu’aux lois et règlements applicables ✅ 16.51 Ouest`,
    url: `${baseURL}/mentions-legales`,
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

const CMS_URL = process.env.CMS_URL
const url = `${CMS_URL}/api/mentions-legales`

export default async function mentionsLegales() {
  try {
    const response: any = await fetch(url)
    if (response.ok) {
      const body = await response.json()
      const { Titre, Contenu } = body.data.attributes

      return (
        <section id="child-page">
          <article className="generic-content lg:max-w-[700px] mx-auto my-6 h-full px-4 legalmentions">
            <h1 className="text-2xl lg:text-4xl mb-4">{Titre}</h1>
            <BlockRendererClient content={Contenu} />
          </article>
          <SideBar />
        </section>
      )
    } else {
      if (response.status === 404) throw new Error('404, Not found')
      if (response.status === 500) throw new Error('500, internal server error')
      if (!response.ok) throw new Error(response.status)
    }
  } catch (error) {
    console.error('Fetch', error)
  }
}
