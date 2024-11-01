'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react'
import { displayContentWithLBFunction } from '../../lib/utils'
import xss from 'xss'
import { TwitterShare } from 'react-share-kit'
import { useRouter } from 'next/navigation'

const Modal = ({
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

  const displayDate = children[0].props.children
    ? children[0].props.children
    : null
  const displayHour = children[1].props.children
    ? children[1].props.children
    : null
  const displayContent = children[2].props.children
    ? children[2].props.children.props.content
    : null
  // console.log('displayContent => ', displayContent)

  // Au cas où le displayContent soit un tableau à plus d'1 élément, on joint chaque élément entrecoupé d'un <br />
  const contentToDisplay = displayContentWithLBFunction(
    displayContent.join('<br />')
  )

  let titleDisplay = !isParallelRoute ? (
    <h2 className="text-2xl first-letter:uppercase text-left leading-16 relative whitespace-nowrap mt-8 mx-8">
      {displayDate}, {displayHour},
      <div className="text-xl">place de la Réunion</div>
    </h2>
  ) : (
    <h1 className="text-2xl first-letter:uppercase text-left leading-16 relative whitespace-nowrap mt-8 mx-8">
      {displayDate}, {displayHour},
      <div className="text-xl">place de la Réunion</div>
    </h1>
  )

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
              <div className="dialog-panel-wrapper  max-w-[28rem] rounded-2xl">
                {titleDisplay}
                {/* <p>URL : {currentUrl}</p> */}
                {/* <TwitterShare
                    url={currentUrl}
                    // title={`Places de La Réunion - ${displayDate} - ${displayHour} \n`}
                    title={`Places de La Réunion - ${displayDate} - ${displayHour} \n${truncatedDisplayContent}`}
                    hashtags={['microfiction', 'paris20']}
                  /> */}

                <DialogPanel className="dialog-reunion w-full max-w-md font-typewriter transform text-left align-middle transition-all px-8 ">
                  <div className="mt-2 pb-4 text-lg">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: xss(contentToDisplay),
                      }}
                    />
                  </div>
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
