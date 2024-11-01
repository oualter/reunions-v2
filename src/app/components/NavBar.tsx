'use client'
import { useState } from 'react'
import Link from 'next/link'
import NavLink from '@/components/NavLink'
import {
  HiOutlineMenu,
  HiOutlineX,
  HiOutlineChevronDown,
  HiOutlineChevronUp,
} from 'react-icons/hi'
import { chapitres } from '../data'

export default function NavBar() {
  const [isOpen, setOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMenuModeEmploiOpen, setIsMenuModeEmploiOpen] = useState(false)
  const toggleClass = () => {
    setOpen(!isOpen)
  }
  const handleSubMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }
  const handleSubMenuModeEmploi = () => {
    setIsMenuModeEmploiOpen(!isMenuModeEmploiOpen)
  }

  return (
    <nav
      id="main-navigation"
      className={isOpen ? 'open md:basis-1/3' : 'close relative md:basis-2/5'}
      aria-label="main"
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
      <ul className="hidden lg:flex h-auto lg:w-full w-full bg-white xl:bg-transparent">
        <li
          onClick={handleSubMenu}
          className={
            isMenuOpen ? 'xl:hidden chapters open' : 'xl:hidden chapters close'
          }
        >
          <NavLink href="#">
            Chapitres
            {!isMenuOpen ? (
              <HiOutlineChevronDown size={15} className="has-submenu" />
            ) : (
              <HiOutlineChevronUp size={15} className="has-submenu" />
            )}
          </NavLink>
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
        <li>
          <NavLink href="/photographies">Photos</NavLink>
        </li>
        <li
          onClick={handleSubMenuModeEmploi}
          className={isMenuModeEmploiOpen ? 'open' : 'close'}
        >
          <NavLink href="#">Mode d&apos;emploi</NavLink>
          <div className="submenuLayer">
            <p>Promenez-vous sur la place</p>
            <p>
              Quand vous le souhaitez, vous cliquez sur un point : court ou
              long, un instant de vie vous sera proposé.
            </p>
            <p>
              Vous pouvez aussi jouer avec le temps, glisser de saison en
              saison, de mois en mois, grâce à l&apos;onglet sur le coté : aux
              hivers préhistoriques répondront alors les hivers futuristes, et
              les canicules d&apos;aujourd&apos;hui s&apos;entremêleront aux
              voix estivales du passé.
            </p>
          </div>
        </li>
        {/* <li>
          <NavLink href="/le-livre/">Le livre (PDF)</NavLink>
        </li> */}
        <li>
          <NavLink
            href="https://res.cloudinary.com/dlm2lmaxc/image/upload/v1729867016/places_de_la_reunion_ebook_c25c8c475d.pdf"
            target="blank"
          >
            Télécharger
            <br />
            l&apos;ebook (PDF)
          </NavLink>
        </li>
        <li>
          <NavLink href="/contact">Contact</NavLink>
        </li>
        <li className="a-propos">
          <NavLink href="/a-propos">&Agrave; propos</NavLink>
        </li>
      </ul>
    </nav>
  )
}
