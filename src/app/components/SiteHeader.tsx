'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function SiteHeader() {
  const pathname = usePathname()

  let isHomepage = pathname === '/'

  return (
    <>
      {!isHomepage ? (
        <Link href="/" className="grow sm:basis-3/5">
          <div className="uppercase whitespace-nowrap sm:text-6xl text-2xl">
            Places de la Réunion&nbsp;
            <div className="sm:text-3xl text-sm">
              Heureusement que le ginkgo biloba
            </div>
          </div>
        </Link>
      ) : (
        <h1 className="uppercase whitespace-nowrap sm:text-6xl text-2xl sm:grow sm:basis-2/3">
          Places de la Réunion&nbsp;
          <div className="sm:text-3xl text-base">
            Heureusement que le ginkgo biloba
          </div>
        </h1>
      )}
    </>
  )
}
