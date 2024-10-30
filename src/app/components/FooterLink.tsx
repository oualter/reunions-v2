'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { LinkPropsType } from '@/typescript/types'


export default function FooterLink({
  children,
  href,
  prefetch,
}: LinkPropsType) {
  const pathname = usePathname()
  if (href === pathname) {
    return <strong className="font-bold">{children}</strong>
  }
  return (
    <Link href={href} prefetch={prefetch} className="hover:font-bold">
      {children}
    </Link>
  )
}
