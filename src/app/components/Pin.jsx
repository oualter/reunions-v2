'use client'
import { useContext, useRef } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import microfictionsContext from '../contexts/microfictions.context'

const Pin = (props) => {
  const {
    coordX,
    coordY,
    Date,
    Heure,
    Texte_mf,
    GingkoBiloba,
    dateFilter,
    slug
  } = props
  // console.log('props => ', props)
  const { openModal } = useContext(microfictionsContext)
  const pinClassName = useRef(true)
  const isclassNameToRemove = pinClassName.current.className
    ? pinClassName.current.className.includes('toRemove')
    : ''
  const pinYear = Date.split('/')[2]

  let updatedClassName

  if (dateFilter && dateFilter[0] < pinYear) {
    updatedClassName = 'pin toRemove'
  } else if (
    dateFilter &&
    dateFilter[0] >= pinYear &&
    isclassNameToRemove !== false
  ) {
    updatedClassName = 'pin toDisplay'
  } else {
    updatedClassName = 'pin'
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            // className="pin"
            ref={pinClassName}
            className={updatedClassName}
            style={{
              width: '10px',
              height: '10px',
              top: `${coordY}%`,
              left: `${coordX}%`,
            }}
            datadate={Date}
            datahour={Heure}
            datatext={Texte_mf}
            dataslug={slug}
            onClick={(e, value = { GingkoBiloba }) => {
              openModal(e, value, slug)
            }}
          ></div>
        </TooltipTrigger>
        <TooltipContent className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]">
          <p>{pinYear}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default Pin
