'use client'
import type { LinkPropsType } from '@/typescript/types'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
type DLType = {
  download?: boolean
}
type LinkPropsDownloadExtendedType = LinkPropsType & {
  target?: 'blank' | 'self'
}

export default function NavLink({
  children,
  href,
  prefetch,
  target,
}: LinkPropsDownloadExtendedType) {
  const pathname = usePathname()
  if (href === pathname) {
    return <strong>{children}</strong>
  }
  let linkHTML =
    target === 'blank' ? (
      <Link
        href={href}
        prefetch={prefetch}
        className="hover:font-bold"
        download="true"
        target="blank"
      >
        {children}
      </Link>
    ) : (
      <Link href={href} prefetch={prefetch} className="hover:font-bold">
        {children}
      </Link>
    )
  return linkHTML
}
