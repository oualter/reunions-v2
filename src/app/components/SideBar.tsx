'use client'
import { useState } from 'react'
import Link from 'next/link'
import SideBarLink from '@/components/SideBarLink'
import {
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from 'react-icons/hi'
import { chapitres } from '../data'

export default function SideBar() {
  const [isAsideMenuOpen, setIsAsideMenuOpen] = useState(true)
  const handleSubMenu = () => {
    setIsAsideMenuOpen(!isAsideMenuOpen)
  }

  return (
    <aside
      id="sidebar-navigation"
      className="hidden xl:block open"
      aria-label="main"
      // draggable="true"
    >
      <ul className="hidden lg:flex h-auto w-full bg-white xl:bg-transparent has-submenu">
        <li
          onClick={handleSubMenu}
          className={isAsideMenuOpen ? 'chapters open' : 'chapters close'}
        >
          <SideBarLink href="#">
            Chapitres &nbsp;
            {!isAsideMenuOpen ? (
              <HiOutlineChevronDown size={15} className="has-submenu" />
            ) : (
              <HiOutlineChevronUp size={15} className="has-submenu" />
            )}
          </SideBarLink>
          <ul>
            {chapitres.map((chapitre) => (
              <li key={chapitre.id}>
                <Link
                  className="sm:text-base hover:font-bold"
                  href={chapitre.month}
                >
                  {chapitre.title.replace(', Place de la Réunion,', ', ')}
                </Link>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </aside>
  )
}
