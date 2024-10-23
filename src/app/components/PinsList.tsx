'use client'
import { useRef } from 'react'
import { useMicrofictionsContext } from '@/contexts/microfictions.context'
import Pin from '@/components/Pin'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const PinsList = ({ items }) => {
  // console.log('Pinlist props => ', items)

  const animContainer = useRef<HTMLDivElement>(null)
  const { pins } = useMicrofictionsContext()

  const zeroOneArray1 = Math.round(Math.random())
  const zeroOneArray2 = Math.round(Math.random())
  const rangeX = Math.random() * 15
  const rangeY = Math.random() * 15
  let randomX = zeroOneArray1 === 0 ? rangeX : -rangeX
  let randomY = zeroOneArray2 === 0 ? -rangeY : rangeY

  useGSAP(
    () => {
      gsap.from('.pin', {
        x: randomX,
        y: randomY,
        scale: 5,
        opacity: 0,
        duration: 1.8,
        ease: 'expo',
        yoyo: true,
        delay: 0.1,
        stagger: {
          // amount:20,
          each: 0.04,
          from: 'start',
          ease: 'power1.in',
        },
      })
    },
    { scope: animContainer }
  )

  return (
    <div ref={animContainer}>
      {pins &&
        pins.map((elt) => {
          const { id, pingenerator } = elt
          if (!pingenerator) return
          const posX = pingenerator ? parseInt(pingenerator.split(',')[0]) : 0
          const posY = pingenerator ? parseInt(pingenerator.split(',')[1]) : 0
          return (
            <Pin key={posX * posX * id} coordX={posX} coordY={posY} {...elt} />
          )
        })}
    </div>
  )
}
export default PinsList
