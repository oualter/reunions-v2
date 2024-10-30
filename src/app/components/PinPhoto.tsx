import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import type { PinPropsType } from '@/typescript/types'
import Link from 'next/link'




const Pin = ({ coordX, coordY, id }: PinPropsType) => {

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            scroll={false}
            href={`/photo/${id}`}
            className="pin"
            data-photo={true}
            style={{
              width: '10px',
              height: '10px',
              top: `${coordY}%`,
              left: `${coordX}%`,
              textIndent: '-100000px',
            }}
          >
            <span>Photo ${id}</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] bg-white px-[15px] py-[10px] text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]">
          <span>Photo ${id}</span>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default Pin
