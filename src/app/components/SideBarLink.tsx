'use client'
import type { LinkPropsType } from '@/typescript/types';
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SideBarLink({ children, href, prefetch }: LinkPropsType) {
  const pathname = usePathname()
  if (href === pathname) {
    return <span className="text-base">{children}</span>
  }
  return (
    <Link href={href} prefetch={prefetch} className="text-base hover:font-bold">
      {children}
    </Link>
  )
}
