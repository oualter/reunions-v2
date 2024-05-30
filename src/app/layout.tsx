import './globals.css'
import NavBar from './components/NavBar.jsx'
import FooterBar from './components/FooterBar'
import SiteHeader from './components/SiteHeader'
import type { MetadataType } from './typescript/MetadataType'

export const metadata: MetadataType = {
  title: {
    default: 'Places de la Réunion',
    template: '%s | Places de la Réunion',
  },
  description:
    "Jeu littéraire de l'atelier d'écriture 16.51 Ouest - édition 2022-23",
  robots: 'noindex, nofollow',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      {/* <body className="container mx-auto min-h-screen flex flex-col pb-2"> */}
      <body className="container flex flex-col min-h-screen mx-auto pb-2">
        <header className="sticky top-0 w-full sm:py-3 py-1 sm:px-9 px-2 shrink">
          <div className="sm:flex sm:justify-stretch ">
            <SiteHeader />
            <NavBar />
          </div>
        </header>
        <main className="grow overflow-hidden ">{children}</main>
        <FooterBar />
      </body>
    </html>
  )
}
