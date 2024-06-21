'use client'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
// import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SiteHeader() {
  const [currentUrl, setCurrentUrl] = useState(null)
  const pathname = usePathname()
  // console.log('pathname => ', pathname)

  // const router = useRouter()
  // console.log('router => ', router.refresh())

  // const currentPath = router.pathname
  // console.log('currentPath => ', currentPath)

  /*
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // console.log('typeof window 2 => ', typeof window)
      // console.log('window.location !!!!!!!!!!!!!!!! => ', window.location)
      // setCurrentUrl(window.location.href)
      // console.log('currentUrl.pathname => ', currentUrl)
    }
  }, [])*/

  let isHomepage = pathname === '/'
  // console.log('isHomepage => ', isHomepage)

  return (
    <>
      {!isHomepage ? (
        <Link href="/" className="grow sm:basis-2/3">
          <div className="uppercase whitespace-nowrap sm:text-6xl text-2xl">
            Places de la Réunion
            <div className="sm:text-3xl text-sm">
              Heureusement que le ginkgo biloba
            </div>
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
