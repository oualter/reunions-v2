'use client'
import { createContext, useState } from 'react'
import { useRouter } from 'next/navigation'

const MicrofictionsContext = createContext(null)

export default MicrofictionsContext

// variables utiles pour les effets d'affichage des épingles
let counterforMF = 0
const filteredMFArchive = []

const MicrofictionsContextProvider = (props) => {
  // console.log('context props => ', props)
  const router = useRouter()
  let [isOpen, setIsOpen] = useState(false)
  let [modalAttr, setModalAttr] = useState('')
  let [GingkoBiloba, setGingkoBiloba] = useState(false)
  let [isShowConfettis, setIsShowConfettis] = useState(false)
  let [initConfettis, setInitConfettis] = useState(false)
  const [selectedMicrofictions, setSelectedMicrofictions] = useState([])
  const [unselectedMicrofictions, setUnselectedMicrofictions] = useState([])
  const [reselectedMicrofictions, setReselectedMicrofictions] = useState([])
  const [dateFilter, setDateFilter] = useState(null)

  const mfArray = props.value.microfictionsFiltered
    ? props.value.microfictionsFiltered
    : props.value.microfictions

  const openModal = (e, value, slug) => {
    const customParamDate = e.target.attributes
      .getNamedItem('datadate')
      .value.replaceAll('/', '-')
    if (slug) {
      router.push(slug + '?microfiction-date=' + customParamDate)
    }
    setModalAttr(e.target.attributes)
    setIsOpen(true)
    const tempConfetti = value.GingkoBiloba
    setIsShowConfettis(tempConfetti)
  }
  const closeModal = (slug) => {
    if (slug) {
      router.push('/' + slug)
    }
    setIsOpen(false)
    setIsShowConfettis(false)
  }

  // filtre les épingles inférieures aux dates sélectionnées
  const handleDisplayPins = (event) => {
    setDateFilter(event)
    const filteredMF = mfArray.filter((elt) => {
      let eltDate = parseInt(elt.Date.split('/')[2])
      return eltDate < parseInt(event) + 1
    })
    // stocke l'historique des filtrages
    filteredMFArchive[counterforMF] = filteredMF
    counterforMF++
    // filtre les microfictions non filtrées pour affecter une animation sur les épingles qui disparaissent en utilisant le slider
    const nonFilteredMF = mfArray.filter((elt) => !filteredMF.includes(elt))

    setUnselectedMicrofictions(nonFilteredMF)
    const temporizer = setTimeout(() => {
      setSelectedMicrofictions(filteredMF)
    }, 500)
  }

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
        handleDisplayPins,
        selectedMicrofictions: mfArray,
        unselectedMicrofictions,
        reselectedMicrofictions,
        dateFilter,
      }}
    >
      <>{props.children}</>
    </MicrofictionsContext.Provider>
  )
}

export { MicrofictionsContextProvider }
