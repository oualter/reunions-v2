'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
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

  console.log('children prop => ', children[1])
  const modalPhotoTitle = children[0]
  const modalPhotoUrl = children[1]

  return (
    // <Transition appear show={isOpen}>
    //   <Dialog
    //     as="div"
    //     className="relative z-10 focus:outline-none"
    //     onClose={close}
    //   >
    //     <TransitionChild
    //       // as={Fragment}
    //       enter="ease-out duration-300"
    //       enterFrom="opacity-0"
    //       enterTo="opacity-100"
    //       leave="ease-in duration-200"
    //       leaveFrom="opacity-100"
    //       leaveTo="opacity-0"
    //     >
    //       <div className="fixed inset-0 bg-black bg-opacity-25" />
    //     </TransitionChild>

    //     <div className="fixed inset-0">
    //       <div className="flex min-h-full items-center justify-center text-center">
    //         <TransitionChild
    //           enter="ease-out duration-300"
    //           enterFrom="opacity-0 scale-[0]"
    //           enterTo="opacity-100 scale-100"
    //           leave="ease-in duration-150"
    //           leaveFrom="opacity-100 scale-100"
    //           leaveTo="opacity-0 scale-[0]"
    //         >
    //           {/* <!-- HERE IS THE CONTENT --> */}
    //           <div className="dialog-panel-wrapper  max-w-[28rem] rounded-2xl">
    //             {modalPhotoTitle}

    //             <DialogPanel className="dialog-reunion w-full max-w-md font-typewriter transform text-left align-middle transition-all px-8 ">
    //               <div className="mt-2 pb-4 text-lg">

    //                 <Image
    //                   src={modalPhotoUrl}
    //                   width={1080}
    //                   height={927}
    //                   priority={true}
    //                   // placeholder="blur"
    //                   // sizes="(min-width: 808px) 66%, 100vw"
    //                   // fill
    //                   // unoptimized={true}
    //                   alt={modalPhotoTitle}
    //                   className="relative"
    //                 />
    //               </div>
    //             </DialogPanel>
    //           </div>
    //         </TransitionChild>
    //       </div>
    //     </div>
    //   </Dialog>
    // </Transition>
    <>
      <div className="modal-backdrop" onClick={close}>
        <dialog className="modal" open>
          <div className="fullscreen-image">
            <Image
              src={modalPhotoUrl}
              width={1080}
              height={927}
              priority={true}
              alt={modalPhotoTitle}
              className="relative"
            />{' '}
          </div>
        </dialog>
      </div>
    </>
  )
}
export default Modalphoto
