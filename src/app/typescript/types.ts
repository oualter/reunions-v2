import type { ReactNode } from 'react'
export type MetadataType = {
  title: {
    default?: string
    template?: string
  }
  description?: string
  robots?: string
}

export type PinAttributesType = {
  id?: number
  createdAt: string
  Date: string
  Heure: string
  ordre_de_lecture: number
  pingenerator: string
  GingkoBiloba: boolean
  Texte_microfiction: string[]
  Coordonnees?: string
}
export type PinPhotosType = {
  id?: number
  createdAt: string
  Texte_alternatif: string
  url: string
  Coordonnees: string
  Source: {
    data: {
      attributes: {
        formats: {
          thumbnail: {}
          large: {}
        }
      }
    }
  }
}

export type PinType = {
  id?: number
  createdAt: string
  Date: string
  ordre_de_lecture: number
  pingenerator: string | null
  GingkoBiloba: boolean
  Texte_microfiction: [string]
  attributes: any
}

// type used in Pin.tsx
export type PinPropsType = {
  key: number
  coordX: number
  coordY: number
  Date?: string
  Heure?: string
  // Texte_mf?: string[]
  GingkoBiloba?: boolean
  // dateFilter?: string[]
  slug?: string
  id?: number | string
  Texte_microfiction?: string[]
  isPhoto?: boolean
  Texte_alternatif?: string
  sourceThumbImg?: {
    // url?: string
    // name?: string
    hash?: string
    ext?: string
  }
}

export type NamedNodeMap = {
  getNamedItem(name: string): Attr
}

export type LinkPropsType = {
  children: ReactNode
  href: string
  prefetch?: boolean
}

export type ClassNameType = string

// import { PropsWithChildren } from 'react'

// declare module '@radix-ui/react-tooltip' {
//   export interface TooltipProviderProps extends PropsWithChildren {}
//   export interface TooltipProps extends PropsWithChildren {}
//   export interface TooltipTriggerProps extends PropsWithChildren {}
//   export interface TooltipPortalProps extends PropsWithChildren {}
//   export interface TooltipContentProps extends PropsWithChildren {}
//   export interface TooltipContentImplProps extends PropsWithChildren {}
//   export interface TooltipArrowProps extends PropsWithChildren {}
// }
