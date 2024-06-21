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
// import { gsap } from 'gsap'
// import { Draggable } from 'gsap/Draggable'

// gsap.registerPlugin(Draggable)

// Draggable.create('#sidebar-navigation', {
//   type: 'x,y',
//   bounds: '#main-container',
//   onClick: function () {
//     console.log('clicked')
//   },
//   onDragEnd: function () {
//     console.log('drag ended')
//   },
// })

export default function NavBar() {
  const [isOpen, setOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(true)
  const toggleClass = () => {
    setOpen(!isOpen)
  }
  const handleSubMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <aside
      id="sidebar-navigation"
      className={isOpen ? 'open md:basis-1/3' : 'close relative md:basis-1/3'}
      aria-label="main"
      draggable="true"
    >
      <HiOutlineMenu
        size={40}
        className="open-btn xl:hidden cursor-pointer xl:static fixed top-4 right-2 md:right-16 lg:right-12"
        onClick={toggleClass}
      />
      <HiOutlineX
        size={40}
        className="close-btn sm:hidden cursor-pointer xl:static fixed top-4 right-2 md:right-16 lg:right-12"
        onClick={toggleClass}
      />
      <ul className="hidden md:flex h-auto md:w-full w-full bg-white xl:bg-transparent has-submenu">
        <li
          onClick={handleSubMenu}
          className={isMenuOpen ? 'chapters open' : 'chapters close'}
        >
          <SideBarLink href="#">
            Chapitres &nbsp;
            {!isMenuOpen ? (
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
                  href={chapitre.month + `/`}
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
