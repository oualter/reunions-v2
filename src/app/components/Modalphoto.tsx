'use client'
import React from 'react'
import { useState, useEffect, Suspense } from 'react'
import { TwitterShare } from 'react-share-kit'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const Modalphoto = ({
  isParallelRoute,
  children,
}: {
  isParallelRoute?: boolean
  children: React.ReactNode
}) => {
  const router = useRouter()
  const [currentUrl, setCurrentUrl] = useState('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
      // console.log('currentUrl => ', currentUrl)
    }
  }, [])

  let [isOpen, setIsOpen] = useState(true)

  function open() {
    setIsOpen(true)
  }

  function close() {
    setIsOpen(false)
    router.back()
  }

  const modalPhotoTitle = children[0]
  const modalPhotoUrl = children[1]
  const photoOrientation = children[2]
  const dialogClassName =
    photoOrientation == 'paysage' ? 'modal relative paysage' : 'modal relative'
  return (
    <div className="modal-backdrop" onClick={close}>
      <dialog className={dialogClassName} open>
        <div className="fullscreen-image">
          <Suspense fallback={<p>Bilo bilo bilo...</p>}>
            <Image
              src={modalPhotoUrl}
              width={1080}
              height={927}
              alt={modalPhotoTitle}
              className="relative"
            />
            <h1 className="absolute z-2 bottom-0 px-4 py-2 bg-zinc-50/[0.5] w-full text-2xl font-medium">
              {modalPhotoTitle}
            </h1>
          </Suspense>
        </div>
      </dialog>
    </div>
  )
}
export default Modalphoto
