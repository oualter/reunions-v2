import SideBar from '@/components/SideBar'
import BlockRendererClient from './../components/BlockRendererClient'

export const metadata = {
  title: 'Le livre',
}

const CMS_URL = process.env.CMS_URL
const url = `${CMS_URL}/api/le-livre?populate=*`

export default async function leLivre() {
  try {
    const response: any = await fetch(url)
    if (response.ok) {
      const body = await response.json()
      const { Titre, Contenu, contenu_2, Illustration } = body.data.attributes

      return (
        <section id="child-page">
          <article className="generic-content lg:max-w-[700px] h-full mx-auto my-6 px-2 lg:px-0">
            <h1 className="text-2xl lg:text-4xl mb-4">{Titre}</h1>
            <BlockRendererClient content={Contenu} />
            <br />
            <BlockRendererClient content={contenu_2} />
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
