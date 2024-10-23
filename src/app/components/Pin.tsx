import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'

import { type PinPropsType } from '@/typescript/types'

const Pin = ({ coordX, coordY, Date, Heure, id }: PinPropsType) => {
  const pinYear = Date.split('/')[2]

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            scroll={false}
            href={`/microfiction/${id}`}
            className="pin"
            style={{
              width: '10px',
              height: '10px',
              top: `${coordY}%`,
              left: `${coordX}%`,
              textIndent: '-100000px',
            }}
          >
            Microfiction place de la Réunion du {Date} à {Heure}
          </Link>
        </TooltipTrigger>
        <TooltipContent className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]">
          <p>{pinYear}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default Pin
