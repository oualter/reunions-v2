'use client'
import { useState } from 'react'
import Link from 'next/link'
import SideBarLink from '@/components/SideBarLink'
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from 'react-icons/hi'
import { chapitres } from '../data'

export default function SideBar() {
  const [isAsideOpen, setAsideOpen] = useState(true)
  const [isAsideMenuOpen, setIsAsideMenuOpen] = useState(true)
  const toggleClass = () => {
    setAsideOpen(!isAsideOpen)
  }
  const handleSubMenu = () => {
    setIsAsideMenuOpen(!isAsideMenuOpen)
  }

  return (
    <aside
      id="sidebar-navigation"
      className={
        isAsideOpen ? 'open md:basis-1/3' : 'close relative md:basis-1/3'
      }
      aria-label="main"
      // draggable="true"
    >
      <ul className="hidden lg:flex h-auto md:w-full w-full bg-white xl:bg-transparent has-submenu">
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
