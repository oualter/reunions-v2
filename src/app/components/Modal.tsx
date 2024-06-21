'use client'
import { useState } from 'react'
import { useMicrofictionsContext } from '@/contexts/microfictions.context'
import {
  Button,
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from '@headlessui/react'

import { useRouter } from 'next/navigation'

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  // console.log('children => ', children)
  // const handleClose = () => router.back()
  // const { closeModal, isOpen, modalAttr } = useMicrofictionsContext()

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
    console.log('children => ', children)
    console.log('displayContent => ', displayContent)

    const isGinkgobiloba = children[3].props.children
      ? children[3].props.children
      : null
      console.log('isGinkgobiloba => ', isGinkgobiloba)

  return (
    <>
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <TransitionChild
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-[0]"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-[0]"
              >
                {/* <!-- HERE IS THE CONTENT --> */}
                <div className="dialog-panel-wrapper min-w-96 rounded-2xl py-4">
                  <DialogPanel className="dialog-reunion w-full max-w-md font-typewriter transform py-4 px-8  text-left align-middle transition-all">
                    <DialogTitle
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      {displayDate} <br /> {displayHour}
                    </DialogTitle>
                    <div className="mt-2 pb-4 text-lg">
                      {displayContent}
                    </div>
                  </DialogPanel>
                </div>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default Modal
