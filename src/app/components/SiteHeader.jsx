'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

import Link from 'next/link'
export default function SiteHeader() {
  const [currentUrl, setCurrentUrl] = useState('')
  const pathname = usePathname()
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location)
    }
  }, [])
  let isHomepage = currentUrl.pathname === '/'

  return (
    <>
      {!isHomepage ? (
        <Link href="/" className="grow sm:basis-2/3">
          <div className="uppercase whitespace-nowrap sm:text-6xl text-2xl">
            Places de la Réunion
            <div className="sm:text-3xl text-sm">Heureusement que le ginkgo biloba</div>
          </div>
        </Link>
      ) : (
        <h1 className="uppercase whitespace-nowrap sm:text-6xl text-3xl sm:grow sm:basis-2/3">
          Places de la Réunion
          <div className="sm:text-3xl text-base">
            Heureusement que le ginkgo biloba
          </div>
        </h1>
      )}
    </>
  )
}
