'use client'

import * as React from 'react'
import { useState, useRef, useEffect } from 'react'

import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '../../../lib/utils.ts'

const Slider = React.forwardRef(({ className, ...props }, ref) => {
  // const value = props.value || props.defaultValue
  // type props.defaultValue = number[]

  // console.log('slider jsx props => ', props)
  // const [value, setValue] = useState(props.defaultValue[0])
  const [value, setValue] = useState((props.value) || props.defaultValue)
  const [offset, setOffset] = useState(null)
  const ThumbRef = useRef(null)

  useEffect(() => {
    const { top, bottom } = ThumbRef.current.getBoundingClientRect()
    if (top + bottom > 0) {
      const containerRect = ThumbRef.current
        .closest('.slider-wrapper')
        .getBoundingClientRect()

      const limitTop = containerRect.top - 12 * 0.25
      const limitBottom = containerRect.bottom + 12 * 0.25

      const offsetTop = offset + (limitTop - top) / 1.25
      const offsetBottom = offset + (limitBottom - bottom) / 1.25
      if (offsetTop > 0) {
        setOffset(offsetTop)
      } else if (offsetBottom < 0) {
        setOffset(offsetBottom)
      }
    }
  }, [offset])

  return (
    <SliderPrimitive.Root
      asChild
      id="sliderRoot"
      ref={ref}
      className={cn('touch-none select-none', className)}
      orientation="vertical"
      onValueChange={(event) => {
        setValue(event[0])
      }}
      {...props}
    >
      <SliderPrimitive.Track
        asChild
        className="overflow-hidden rounded-full bg-secondary"
        id="sliderTrack"
      >
        <SliderPrimitive.Range
          asChild
          id="sliderRange"
          className="bg-primary"
        />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb asChild id="sliderThumb">
        <div style={{ transform: `translateX(${offset}px)` }}>
          <div
            className="absolute ease-in-out duration-150 transition group-active:opacity-100 -translate-y-1 -translate-x-[5rem] px-5 py-2 bg-white text-center rounded-full text-black whitespace-nowrap text-xs font-bold shadow-md"
            ref={ThumbRef}
          >
            {value}
          </div>
        </div>
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  )
})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
