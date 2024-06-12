'use client'
import { useRef } from 'react'
import { useMicrofictionsContext } from '@/contexts/microfictions.context'
// import {
//   TooltipProviderProps,
//   TooltipProps,
//   TooltipTriggerProps,
//   TooltipContentProps,
// } from '@radix-ui/react-tooltip'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  // type TooltipContentProps,
} from '@/components/ui/tooltip'

import { type PinPropsType } from '@/typescript/types'
// import { PropsWithChildren } from 'react'

// type SuperTooltipContentProps = TooltipContentProps & {
//   className: string
// }
// const TooltipContent: SuperTooltipContentProps
// interface SuperTooltipProps extends TooltipProps {
//   className: string
//   children: React.ReactNode
// }
// export interface TooltipProps extends PropsWithChildren {}

// interface SuperTooltipProviderProps extends TooltipProviderProps {
//   className: string
//   children: React.ReactNode
// }
// export interface TooltipProviderProps extends PropsWithChildren {}

// interface SuperTooltipTriggerProps extends TooltipTriggerProps {
//   className: string
//   children: React.ReactNode
// }
// export interface TooltipTriggerProps extends PropsWithChildren {}

// interface SuperTooltipContentProps extends TooltipContentProps {
//   className: string
//   children: React.ReactNode
// }
// export interface TooltipContentProps extends PropsWithChildren {}

const Pin = ({
  coordX,
  coordY,
  Date,
  Heure,
  Texte_mf,
  GingkoBiloba,
  dateFilter,
  slug,
}: PinPropsType) => {
  // console.log('GingkoBiloba => ', GingkoBiloba)
  // const { openModal } = useContext(microfictionsContext)
  const { openModal } = useMicrofictionsContext()
  const pinClassName = useRef<HTMLDivElement>(null)

  const isclassNameToRemove = pinClassName.current?.className
    ? pinClassName.current?.className.includes('toRemove')
    : ''
  const pinYear = Date.split('/')[2]

  let updatedClassName = 'pin'

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
            data-date={Date}
            data-hour={Heure}
            data-text={Texte_mf}
            data-slug={slug}
            onClick={(e) => {
              openModal(e, GingkoBiloba, slug)
            }}
          ></div>
        </TooltipTrigger>
        {/* <TooltipContent> */}
        <TooltipContent className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]">
          <p>{pinYear}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default Pin
