'use client'
import { useRef } from 'react'
import Pin from '@/components/Pin'
import type { PinAttributesType } from '@/typescript/types'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const PinsList = ({
  items,
  pintype,
}: {
  items: PinAttributesType[]
  pintype?: 'photos'
}) => {
  // console.log('items pinlist => ', items)

  const animContainer = useRef<HTMLDivElement>(null)

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
      {items &&
        pintype !== 'photos' &&
        items.map((elt) => {
          const { id, pingenerator } = elt
          if (!pingenerator) return
          const posX = pingenerator ? parseInt(pingenerator.split(',')[0]) : 0
          const posY = pingenerator ? parseInt(pingenerator.split(',')[1]) : 0
          const key = posX * posY * id * Math.random()
          return <Pin key={key} coordX={posX} coordY={posY} {...elt} />
        })}
      {items &&
        pintype === 'photos' &&
        items.map((elt) => {
          // console.log('PHOTO MAP ELT => ', elt)
          const { id, Coordonnees } = elt
          if (!Coordonnees) return
          const posX = Coordonnees ? parseInt(Coordonnees.split(',')[0]) : 0
          const posY = Coordonnees ? parseInt(Coordonnees.split(',')[1]) : 0
          const key = posX * posY * id * Math.random()
          return (
            <Pin
              key={key}
              coordX={posX}
              coordY={posY}
              isPhoto={true}
              {...elt}
            />
          )
        })}
    </div>
  )
}
export default PinsList
