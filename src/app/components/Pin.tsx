'use client'
import { useRef, useState } from 'react'
import { useMicrofictionsContext } from '@/contexts/microfictions.context'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { type PinPropsType } from '@/typescript/types'

const Pin = ({
  coordX,
  coordY,
  Date,
  Heure,
  Texte_mf,
  GingkoBiloba,
  dateFilter,
  slug,
  id,
}: PinPropsType) => {
  // console.log('pin context => ', useMicrofictionsContext())
  // const { openModal } = useMicrofictionsContext()
  const pinClassName = useRef<HTMLAnchorElement | null>(null)

  const router = useRouter()

  let [isOpen, setIsOpen] = useState(true)

  function open() {
    setIsOpen(true)
  }

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
  // const router = useRouter()
  // const customParamDate = Date.replaceAll('/', '-')
  // const mfHref = slug
  //   ? `${slug}/microfiction-date-${customParamDate}`
  //   : `microfiction-date-${customParamDate}`

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            // className="pin"
            scroll={false}
            href={`/microfiction/${id}`}
            // href={'?microfiction-date=' + customParamDate}
            ref={pinClassName}
            className={updatedClassName}
            style={{
              width: '10px',
              height: '10px',
              top: `${coordY}%`,
              left: `${coordX}%`,
              textIndent: '-100000px',
            }}
            // data-date={Date}
            // data-hour={Heure}
            // data-text={Texte_mf}
            // data-slug={slug}
            // onClick={(e) => {
              // e.preventDefault()
              // router.push(`/microfiction/${id}`, { scroll: false })
              // openModal(e, GingkoBiloba, slug)
              // router.push(mfHref, {
              //   scroll: false,
              // })
            // }}
          >
            Microfiction place de la Réunion du {Date} à {Heure}
          </Link>
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
