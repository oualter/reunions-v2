'use client'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { type PinType } from '@/typescript/types'

type MicrofictionsContextType = {
  pins: PinType[]
  defaultpins: PinType[] | null
  GingkoBiloba: boolean
  // isGingkoBiloba: boolean
  isShowConfettis: boolean
  initConfettis: boolean
  selectedMicrofictions: PinType[]
  unselectedMicrofictions: PinType[]
}
type MFContextPropsType = {
  value: {
    microfictionsFiltered?: []
    microfictions?: []
    // isGingkoBiloba?: boolean
    GingkoBiloba?: boolean
  }
  children: React.ReactNode
}

const MicrofictionsContext = createContext<MicrofictionsContextType | null>(
  null
)
export default MicrofictionsContext

const MicrofictionsContextProvider = (props: MFContextPropsType) => {
  // let [isGingkoBiloba, setIsGingkoBiloba] = useState(
  //   props.value?.isGingkoBiloba
  // )
  let [GingkoBiloba, setGingkoBiloba] = useState(false)
  let [isShowConfettis, setIsShowConfettis] = useState(false)
  let [initConfettis, setInitConfettis] = useState(false)
  const [selectedMicrofictions, setSelectedMicrofictions] = useState([])
  const [unselectedMicrofictions, setUnselectedMicrofictions] = useState([])

  const mfArray = props.value?.microfictionsFiltered
    ? props.value.microfictionsFiltered
    : props.value?.microfictions

  // const isGingkoBilobaValue = props.value?.isGingkoBiloba

  // useEffect(() => {
  //   setIsGingkoBiloba(isGingkoBiloba)
  // }, [])

  return (
    <MicrofictionsContext.Provider
      value={{
        pins:
          selectedMicrofictions.length > 0 ? selectedMicrofictions : mfArray,
        defaultpins: mfArray,
        GingkoBiloba,
        // isGingkoBiloba,
        isShowConfettis,
        initConfettis,
        selectedMicrofictions: mfArray,
        unselectedMicrofictions,
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
