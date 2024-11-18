import ContactForm from '@/components/contact/ContactForm'
import { baseURL } from '../../lib/meta'
import { imgMapUrl } from '../../lib/utils'
import type { Metadata } from 'next'

const defaultImgMapUrl = await imgMapUrl()
export const metadata: Metadata = {
  title: 'Nous contacter ',
  description:
    "N'hésitez pas à nous contacter - Nous répondrons à vos questions et demandes d'information ✅ 16.51 Ouest",
  alternates: {
    canonical: `${baseURL}/contact`,
  },
  openGraph: {
    title: `Nous contacter  @ 16.51 Ouest`,
    description: `N'hésitez pas à nous contacter - Nous répondrons à vos questions et demandes d'information ✅ 16.51 Ouest`,
    url: `${baseURL}/contact`,
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

export default function contact() {
  return (
    <section id="child-page">
      <article className="generic-content lg:max-w-[700px] w-full h-full mx-auto my-6 px-4">
        <h1 className="text-2xl lg:text-4xl mb-4">Contact</h1>
        <ContactForm />
      </article>
    </section>
  )
}
