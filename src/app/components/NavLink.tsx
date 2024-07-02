'use client'
import type { LinkPropsType } from '@/typescript/types';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ children, href, prefetch }: LinkPropsType) {
  const pathname = usePathname()
  if (href === pathname) {
    return <span>{children}</span>
  }
  return (
    <Link href={href} prefetch={prefetch} className="hover:font-bold">
      {children}
    </Link>
  )
}
