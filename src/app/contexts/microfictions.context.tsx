'use client'
import React, { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { type PinType } from '@/typescript/types'

type MicrofictionsContextType = {
  pins: PinType[]
  defaultpins: PinType[] | null
  openModal: (
    e: React.SyntheticEvent<HTMLDivElement, Event>,
    value: boolean,
    slug: string
  ) => void
  closeModal: (arg: string) => void
  isOpen: boolean
  // setIsOpen: (value: React.SetStateAction<boolean>) => void
  modalAttr: { getNamedItem(attribute: string) }
  GingkoBiloba: boolean
  isShowConfettis: boolean
  initConfettis: boolean
  setInitConfettis: React.Dispatch<React.SetStateAction<boolean>>
  // handleDisplayPins: () => void
  selectedMicrofictions: PinType[]
  unselectedMicrofictions: PinType[]
  // dateFilter: string[]
}
type MFContextPropsType = {
  value: {
    microfictionsFiltered?: []
    microfictions?: []
  }
  children: React.ReactNode
}
// const mfArray = props.value.microfictionsFiltered
//   ? props.value.microfictionsFiltered
//   : props.value.microfictions

const MicrofictionsContext = createContext<MicrofictionsContextType | null>(
  null
)

// variables utiles pour les effets d'affichage des épingles
let counterforMF = 0
const filteredMFArchive = []

const MicrofictionsContextProvider = (props: MFContextPropsType) => {
  // console.log('MicrofictionsContextProvider props => ', props)

  type ModalAttrType = {
    getNamedItem(attribute: string)
  }

  const router = useRouter()
  let [isOpen, setIsOpen] = useState(false)
  let [modalAttr, setModalAttr] = useState(null)
  // let [modalAttr, setModalAttr] = useState<ModalAttrType>(null)
  let [GingkoBiloba, setGingkoBiloba] = useState(false)
  let [isShowConfettis, setIsShowConfettis] = useState(false)
  let [initConfettis, setInitConfettis] = useState(false)
  const [selectedMicrofictions, setSelectedMicrofictions] = useState([])
  const [unselectedMicrofictions, setUnselectedMicrofictions] = useState([])
  // const [reselectedMicrofictions, setReselectedMicrofictions] = useState([])
  // const [dateFilter, setDateFilter] = useState(null)

  const mfArray = props.value.microfictionsFiltered
    ? props.value.microfictionsFiltered
    : props.value.microfictions

  // console.log('mfArray => ', mfArray)
  const openModal = (
    e,
    // e: React.SyntheticEvent<HTMLDivElement>,
    // e: { target: React.SyntheticEvent<HTMLDivElement> | null },
    // e: {
    //   target?: {
    //     dataset?: {
    //       date?: string
    //     }
    //     attributes?: {}
    //   }
    // },
    // value: {
    //   GingkoBiloba: boolean
    // },
    value,
    // slug: string
    slug
  ) => {
    // const customParamDate = e.target.attributes
    const customParamDate = e.target.dataset.date.replaceAll('/', '-')
    if (slug) {
      router.push(slug + '?microfiction-date=' + customParamDate)
    }
    setModalAttr(e.target.attributes)
    // setModalAttr(e.target?.dataset)
    setIsOpen(true)

    setIsShowConfettis(value.GingkoBiloba)
  }
  const closeModal = (slug: string) => {
    if (slug) {
      router.push('/' + slug)
    }
    setIsOpen(false)
    setIsShowConfettis(false)
  }

  // filtre les épingles inférieures aux dates sélectionnées
  // const handleDisplayPins = (event: string[]) => {
  //   console.log('handleDisplayPins event => ', event)
  //   setDateFilter(event)
  //   const filteredMF = mfArray.filter((elt) => {
  //     let eltDate = parseInt(elt.Date.split('/')[2])
  //     return eltDate < parseInt(event) + 1
  //   })
  //   // stocke l'historique des filtrages
  //   filteredMFArchive[counterforMF] = filteredMF
  //   counterforMF++
  //   // filtre les microfictions non filtrées pour affecter une animation sur les épingles qui disparaissent en utilisant le slider
  //   const nonFilteredMF = mfArray.filter((elt) => !filteredMF.includes(elt))

  //   setUnselectedMicrofictions(nonFilteredMF)
  //   const temporizer = setTimeout(() => {
  //     setSelectedMicrofictions(filteredMF)
  //   }, 500)
  // }

  return (
    <MicrofictionsContext.Provider
      value={{
        pins:
          selectedMicrofictions.length > 0 ? selectedMicrofictions : mfArray,
        defaultpins: mfArray,
        openModal,
        closeModal,
        isOpen,
        modalAttr,
        GingkoBiloba,
        isShowConfettis,
        initConfettis,
        setInitConfettis,
        // handleDisplayPins,
        selectedMicrofictions: mfArray,
        unselectedMicrofictions,
        // reselectedMicrofictions,
        // dateFilter,
      }}
    >
      <>{props.children}</>
    </MicrofictionsContext.Provider>
  )
}

export function useMicrofictionsContext() {
  const context = useContext(MicrofictionsContext)
  if (!context) {
    throw new Error(
      'useMicrofictionsContext must be used within a MicrofictionsContextProvider'
    )
  }
  return context
}

export { MicrofictionsContextProvider }
