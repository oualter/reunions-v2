'use client'
import React from 'react'
import { useState, useEffect } from 'react'
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

  return (
    <div className="modal-backdrop" onClick={close}>
      <dialog className="modal" open>
        <div className="fullscreen-image">
          <Image
            src={modalPhotoUrl}
            width={1080}
            height={927}
            alt={modalPhotoTitle}
            className="relative"
          />
        </div>
      </dialog>
    </div>
  )
}
export default Modalphoto
