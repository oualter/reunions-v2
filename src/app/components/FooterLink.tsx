'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function FooterLink({ children, href, prefetch }) {
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
