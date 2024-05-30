import BlockRendererClient from './../components/BlockRendererClient'

export const metadata = {
  title: 'Mentions légales',
}

const CMS_URL = process.env.CMS_URL
const url = `${CMS_URL}/api/mentions-legales`

export default async function mentionsLegales() {
  try {
    const response = await fetch(url)
    if (response.ok) {
      const body = await response.json()
      const { Titre, Contenu } = body.data.attributes
      return (
        <article className="generic-content lg:max-w-[700px] mx-auto my-6 h-full px-2 lg:px-0">
          <h1 className="text-3xl lg:text-5xl mb-4">{Titre}</h1>
          <BlockRendererClient content={Contenu}/>
        </article>
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
