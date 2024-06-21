import type { ReactNode } from 'react'
import { type MetadataType } from '@/typescript/types'
import '@/globals.css'
import NavBar from '@/components/NavBar'
// import SideBar from '@/components/SideBar'
import FooterBar from '@/components/FooterBar'
import SiteHeader from '@/components/SiteHeader'

type LayoutProps = {
  children: ReactNode
  modal: React.ReactNode
}

export const metadata: MetadataType = {
  title: {
    default: 'Places de la Réunion',
    template: '%s | Places de la Réunion',
  },
  description:
    "Jeu littéraire de l'atelier d'écriture 16.51 Ouest - édition 2022-23",
  robots: 'noindex, nofollow',
}

export default function RootLayout({ children, modal }: LayoutProps) {
  // console.log('modal => ', modal)
  return (
    <html lang="fr">
      <body className="container flex flex-col min-h-screen mx-auto pb-2">
        <header className="sticky top-0 w-full sm:py-3 py-1 sm:px-9 px-2 shrink">
          <div className="sm:flex sm:justify-stretch ">
            <SiteHeader />
            <NavBar />
          </div>
        </header>
        <main id="main-container" className="grow overflow-hidden ">
          {children}
          {modal}
        </main>

        <FooterBar />
      </body>
    </html>
  )
}
