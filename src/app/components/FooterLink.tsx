'use client'
import Link from 'next/link'
// import type { ReactNode } from 'react'
import { usePathname } from 'next/navigation'
// import { UrlObject } from 'url'
import type { LinkPropsType } from '@/typescript/types'

// type LinkPropsType = {
//   children: ReactNode
//   href: UrlObject | string
//   prefetch?: boolean
// }

export default function FooterLink({
  children,
  href,
  prefetch,
}: LinkPropsType) {
  const pathname = usePathname()
  if (href === pathname) {
    return <span className="font-bold">{children}</span>
  }
  return (
    <Link href={href} prefetch={prefetch} className="hover:font-bold">
      {children}
    </Link>
  )
}
