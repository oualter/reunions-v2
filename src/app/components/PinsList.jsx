'use client'
import { useContext, useEffect, useRef } from 'react'
import microfictionsContext from '../contexts/microfictions.context'
import Pin from './Pin'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const PinsList = (props) => {
  const animContainer = useRef(true)
  const { pins, unselectedMicrofictions, dateFilter } =
    useContext(microfictionsContext)

  const zeroOneArray1 = Math.round(Math.random())
  const zeroOneArray2 = Math.round(Math.random())
  const rangeX = Math.random() * 15
  const rangeY = Math.random() * 15
  let randomX = zeroOneArray1 === 0 ? rangeX : -rangeX
  let randomY = zeroOneArray2 === 0 ? -rangeY : rangeY

  let pindReducedDate = pins.reduce((acc, curr) => {
    if (!acc[curr.Date]) {
      acc[curr.Date] = []
    }
    acc[curr.Date].push(curr.Texte_microfiction)
    if (acc[curr.Date].length > 0) {
      acc[curr.Date].push(['<hr/>'])
    }
    return acc
  }, {})

  useGSAP(
    () => {
      gsap.from('.pin', {
        x: randomX,
        y: randomY,
        scale: 3,
        opacity: 0,
        duration: 2.5,
        ease: 'expo',
        yoyo: true,
        delay: 0.5,
        stagger: {
          // amount:20,
          each: 0.08,
          from: 'start',
          ease: 'power1.in',
        },
      })
    },
    { scope: animContainer }
  )

  useEffect(() => {
    const pinRemoveTL = gsap.timeline()
    pinRemoveTL.to('.toRemove', {
      scale: 5,
      duration: 0.3,
      ease: 'expo',
      delay: 0.2,
      stagger: {
        each: 0.04,
      },
    })
    pinRemoveTL.to('.toRemove', {
      opacity: 0,
      duration: 0.1,
      ease: 'expo',
      delay: 0.4,
    })
  // }, [pins])
  }, [unselectedMicrofictions])

  useEffect(() => {
    const pinDisplayTL = gsap.timeline()
    // pinDisplayTL.to('.toDisplay', {
    //   opacity: 1,
    //   scale: 5,
    //   duration: 0.2,
    //   ease: 'expo',
    //   delay: 0.1,
    //   stagger: {
    //     each: 0.08,
    //   },
    // })
    pinDisplayTL.from('.toDisplay', {
      opacity: 0,
      scale: 0,
      duration: 0.05,
      ease: 'expo',
      delay: 0.1,
      // stagger: {
      //   each: 0.08,
      // },
    })
    // pinDisplayTL.to('.toDisplay', {
    //   opacity: 1,
    //   scale: 1,
    //   duration: 0.2,
    //   ease: 'expo',
    //   delay: 0.6,
    // })
    pinDisplayTL.to('.toDisplay', {
      opacity: 1,
      scale: 5,
      duration: 0.1,
      ease: 'expo',
      delay: 0.1,
      stagger: {
        each: 0.03,
      },
    })
    pinDisplayTL.to('.toDisplay', {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      ease: 'expo',
      delay: 0.3,
      stagger: {
        each: 0.01,
      },
    })
  }, [pins])

  return (
    <div ref={animContainer}>
      {pins &&
        pins.map((elt) => {
          const { id, pingenerator, Date } = elt
          if (pindReducedDate[Date]) {
            if (!pingenerator) return
            let Texte_mf = pindReducedDate[Date]
            Texte_mf.pop()
            Texte_mf = Texte_mf.join('')
            const posX = pingenerator ? pingenerator.split(',')[0] : ''
            const posY = pingenerator ? pingenerator.split(',')[1] : ''
            return (
              <Pin
                key={posX * posX * id}
                coordX={posX}
                coordY={posY}
                Texte_mf={Texte_mf}
                dateFilter={dateFilter}
                {...elt}
              />
            )
          }
        })}
    </div>
  )
}
export default PinsList
