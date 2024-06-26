'use client'
import { useState, useEffect } from 'react'
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { TwitterShare } from 'react-share-kit'

import { useRouter } from 'next/navigation'

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const [currentUrl, setCurrentUrl] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href)
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

  const displayDate = children[0].props.children
    ? children[0].props.children
    : null
  const displayHour = children[1].props.children
    ? children[1].props.children
    : null
  const displayContent = children[2].props.children
    ? children[2].props.children.props.content
    : null

  const truncateContent = (content) =>
    content?.length > 160 ? `${content.substring(0, 155)}...` : content

  const truncatedDisplayContent = truncateContent(displayContent.join())

  return (

      <Transition appear show={isOpen}>
        <Dialog
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={close}
        >
          <TransitionChild
            // as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </TransitionChild>

          <div className="fixed inset-0">
            <div className="flex min-h-full items-center justify-center text-center">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-[0]"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-[0]"
              >
                {/* <!-- HERE IS THE CONTENT --> */}
                <div className="dialog-panel-wrapper bg-white min-w-[28rem] rounded-2xl">
                  <h3 className="text-2xl first-letter:uppercase text-left leading-16 relative mt-4 mx-8">
                    {displayDate}
                    <div className="text-xl">{displayHour}</div>
                  </h3>

                  {/* <TwitterShare
                    url={currentUrl}
                    // title={`Places de La Réunion - ${displayDate} - ${displayHour} \n`}
                    title={`Places de La Réunion - ${displayDate} - ${displayHour} \n${truncatedDisplayContent}`}
                    hashtags={['microfiction', 'paris20']}
                  /> */}

                  <DialogPanel className="dialog-reunion w-full max-w-md font-typewriter transform text-left align-middle transition-all px-8 ">
                    <div className="mt-2 pb-4 text-lg">{displayContent}</div>
                  </DialogPanel>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>

  )
}
export default Modal
