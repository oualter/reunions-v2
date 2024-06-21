import SideBar from '@/components/SideBar'
import BlockRendererClient from '../components/BlockRendererClient'
// import { metadata } from 'next'
export const metadata = {
  title: 'À propos',
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
          <article className="generic-content lg:max-w-[700px] h-full mx-auto my-6 px-2 lg:px-0">
            <h1 className="text-3xl lg:text-5xl mb-4">{Titre}</h1>
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
