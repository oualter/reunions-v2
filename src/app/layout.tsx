import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import '@/globals.css'
import { baseURL } from '../lib/meta'
import NavBar from '@/components/NavBar'
import FooterBar from '@/components/FooterBar'
import SiteHeader from '@/components/SiteHeader'

type LayoutProps = {
  children: ReactNode
  modal: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    default: 'Places de la Réunion @ Jeu / cartographie littéraire 16.51 Ouest',
    template: '%s @ 16.51 Ouest',
  },
  description: `Objet multimédia issu de l'atelier d'écriture "écrire, explorer" - Cartographie de microfictions se déroulant place de la Réunion dans le 20e arrondissement de Paris`,
  // robots: 'noindex, nofollow',
  alternates: {
    canonical: `${baseURL}`,
  },
  verification: {
    google: 'iqI9gbLluftrA7JgD6uc7cmfhDLKd9T3tg7Hc6ObjXM',
  },
}

export default function RootLayout({ children, modal }: LayoutProps) {
  return (
    <html lang="fr">
      <body className="container flex flex-col min-h-screen mx-auto pb-2">
        <header className="sticky top-0 w-full sm:py-3 py-1 sm:px-9 px-2 shrink">
          <div className="sm:flex sm:justify-stretch ">
            <SiteHeader />
            <NavBar />
          </div>
        </header>
        <main id="main-container" className="grow overflow-hidden">
          {children}
          {modal}
        </main>
        <FooterBar />
      </body>
    </html>
  )
}
