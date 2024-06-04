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
  coordX: number
  coordY: number
  Date: string
  Heure: string
  Texte_mf: string[]
  GingkoBiloba: boolean
  dateFilter: number[]
  slug: string
}

// export type PinAttributesType = {
//   id: number
//   createdAt: string
//   Date: string
//   Heure: string
//   ordre_de_lecture: number
//   pingenerator: string
//   GingkoBiloba: boolean
//   Texte_microfiction: string[]
// }
