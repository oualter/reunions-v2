'use client'
import { useEffect, useMemo } from 'react'
// import { useMicrofictionsContext } from '@/contexts/microfictions.context'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import {
  type Container,
  type ISourceOptions,
  MoveDirection,
  OutMode,
} from '@tsparticles/engine'
import { loadAll } from '@tsparticles/all'

type ConfettisType = {
  isShowConfettis?: boolean
  initConfettis?: boolean
  isGingkoBiloba?: boolean
}

// console.log('je suis le fichier confettis.tsx')

const Confettis = ({ isGingkoBiloba }) => {
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadAll(engine)
    })
  }, [])

  const particlesLoaded = async (container?: Container): Promise<void> => {
    console.log(container)
  }
  const options: ISourceOptions = useMemo(
    () => ({
      background: {
        color: {
          // value: '#fff',
          value: 'transparent',
        },
      },
      fullScreen: {
        zIndex: 100000,
      },
      particles: {
        number: {
          value: 0,
        },
        color: {
          value: ['#00FFFC', '#FC00FF', '#fffc00'],
        },
        shape: {
          type: ['circle', 'square'],
          options: {},
        },
        opacity: {
          value: {
            min: 0,
            max: 1,
          },
          animation: {
            enable: true,
            speed: 2,
            startValue: 'max',
            destroy: 'min',
          },
        },
        size: {
          value: {
            min: 2,
            max: 6,
          },
        },
        links: {
          enable: false,
        },
        life: {
          duration: {
            sync: true,
            value: 5,
            // count: 0,
          },
          count: 1,
        },
        move: {
          enable: true,
          gravity: {
            enable: true,
            acceleration: 10,
          },
          speed: {
            min: 10,
            max: 20,
          },
          decay: 0.1,
          direction: 'none',
          straight: false,
          outModes: {
            default: 'destroy',
            top: 'none',
          },
        },
        rotate: {
          value: {
            min: 0,
            max: 360,
          },
          direction: 'random',
          move: true,
          animation: {
            enable: true,
            speed: 60,
          },
        },
        tilt: {
          direction: 'random',
          enable: true,
          move: true,
          value: {
            min: 0,
            max: 360,
          },
          animation: {
            enable: true,
            speed: 60,
          },
        },
        roll: {
          darken: {
            enable: true,
            value: 25,
          },
          enable: true,
          speed: {
            min: 15,
            max: 25,
          },
        },
        wobble: {
          distance: 30,
          enable: true,
          move: true,
          speed: {
            min: -15,
            max: 15,
          },
        },
      },
      emitters: {
        life: {
          count: 5,
          duration: 0.25,
          delay: 0.15,
        },
        rate: {
          delay: 0.1,
          quantity: 180,
        },
        size: {
          width: 0,
          height: 0,
        },
      },
    }),
    []
  )

  return (
    <>
      {isGingkoBiloba && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      )}
    </>
  )
}
export default Confettis
