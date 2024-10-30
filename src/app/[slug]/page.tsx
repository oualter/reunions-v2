import { baseURL } from '../../lib/meta'
import { imgMapUrl } from '../../lib/utils'
import ImagePlaceHolder from '@/components/ImagePlaceHolder'
import PinsList from '@/components/PinsList'
import SideBar from '@/components/SideBar'
import { GetMicroFictions } from '../../lib/microfictions'
import { chapitres } from '@/data'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return [
    { slug: 'janvier' },
    { slug: 'fevrier' },
    { slug: 'mars' },
    { slug: 'avril' },
    { slug: 'mai' },
    { slug: 'juin' },
    { slug: 'juillet' },
    { slug: 'aout' },
    { slug: 'septembre' },
    { slug: 'octobre' },
    { slug: 'novembre' },
    { slug: 'decembre' },
  ]
}

type Props = {
  slug: string
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Props
}): Promise<Metadata> {
  const slug = params.slug
  const pageTitleObj = chapitres.filter((elt) => {
    return elt.month === slug
  })
  // console.log('pageTitleObj => ', pageTitleObj)
  if (pageTitleObj.length < 1) {
    notFound()
  }
  const defaultImgMapUrl = await imgMapUrl()
  const pageTitleMeta = pageTitleObj[0].title
  return {
    title: `Microfictions du ${pageTitleMeta}`,
    description: `Promenez-vous sur la place de la Réunion et découvrez un instant de vie passé, présent ou futur ✅ 16.51 Ouest`,
    alternates: {
      canonical: `${baseURL}/${slug}`,
    },
    openGraph: {
      title: `Microfictions du ${pageTitleMeta}  @ 16.51 Ouest`,
      description: `Promenez-vous sur la place de la Réunion et découvrez un instant de vie passé, présent ou futur ✅ 16.51 Ouest`,
      url: `${baseURL}/${slug}`,
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

export default async function showFictions({ params }) {
  const microF = await GetMicroFictions()
  const { slug } = params
  const slugArray = await generateStaticParams()
  const isSlugOK = slugArray.some((elt) => {
    return elt.slug === slug
  })

  let pageTitle
  if (isSlugOK) {
    const pageTitleObj = chapitres.filter((elt) => {
      return elt.month === slug
    })
    pageTitle = pageTitleObj[0].title
  } else if (!isSlugOK) {
    console.log('404')
    notFound()
  }

  const currentSlug = slug
  const { microfictions } = microF
  // ajoute la propriété slug (avec le bon mois qui correspond) à l'objet en cours
  const microfictionsDateFixed = microfictions.map((elt) => {
    let { Date } = elt
    if (Date.includes('/01/')) {
      elt['slug'] = 'janvier'
    }
    if (Date.includes('/02/')) {
      elt['slug'] = 'fevrier'
    }
    if (Date.includes('/03/')) {
      elt['slug'] = 'mars'
    }
    if (Date.includes('/04/')) {
      elt['slug'] = 'avril'
    }
    if (Date.includes('/05/')) {
      elt['slug'] = 'mai'
    }
    if (Date.includes('/06/')) {
      elt['slug'] = 'juin'
    }
    if (Date.includes('/07/')) {
      elt['slug'] = 'juillet'
    }
    if (Date.includes('/08/')) {
      elt['slug'] = 'aout'
    }
    if (Date.includes('/09/')) {
      elt['slug'] = 'septembre'
    }
    if (Date.includes('/10/')) {
      elt['slug'] = 'octobre'
    }
    if (Date.includes('/11/')) {
      elt['slug'] = 'novembre'
    }
    if (Date.includes('/12/')) {
      elt['slug'] = 'decembre'
    }
    return elt
  })

  // affiche les épingles du mois sélectionné
  const microfictionsFiltered = microfictionsDateFixed.filter((elt) => {
    return elt.slug == currentSlug
  })

  return (
    <section className="map-page slug-page flex flex-wrap">
      <h1 className="grow-1 w-full flex-none">{pageTitle}</h1>
      <article className="img-placeholder image-wrapper lg:w-[1080px] mx-auto relative mix-blend-darken ">
        <ImagePlaceHolder />
        <PinsList items={microfictionsFiltered} />
      </article>
      <SideBar />
    </section>
  )
}
