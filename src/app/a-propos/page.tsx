import SideBar from '@/components/SideBar'
import BlockRendererClient from '../components/BlockRendererClient'
import { baseURL } from '../../lib/meta'
import { imgMapUrl } from '../../lib/utils'
import type { Metadata } from 'next'

const defaultImgMapUrl = await imgMapUrl()
export const metadata: Metadata = {
  title: 'À propos de "Places de la Réunion"',
  description:
    '"Places de la Réunion" est un objet multimédia issu de l\'atelier d\'écriture "écrire, explorer" ✅ 16.51 Ouest',
  alternates: {
    canonical: `${baseURL}/a-propos`,
  },
  openGraph: {
    title: `À propos de "Places de la Réunion" @ 16.51 Ouest`,
    description:
      '"Places de la Réunion" est un objet multimédia issu de l\'atelier d\'écriture "écrire, explorer" ✅ 16.51 Ouest',
    url: `${baseURL}/a-propos`,
    images: [
      {
        url: `${defaultImgMapUrl}`, // Must be an absolute URL
        width: 1000,
        height: 858,
      },
    ],
    type: 'website',
  },
}

const CMS_URL = process.env.CMS_URL
const url = `${CMS_URL}/api/a-propos`

export default async function apropos() {
  try {
    const response: any = await fetch(url)
    if (response.ok) {
      const body = await response.json()
      const { Titre, Contenu } = body.data.attributes

      return (
        <section id="child-page">
          <article className="generic-content lg:max-w-[700px] h-full mx-auto my-6 px-4">
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
