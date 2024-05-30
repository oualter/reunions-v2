'use client'
import { useContext, Fragment } from 'react'
import microfictionsContext from '../contexts/microfictions.context'
import { Dialog, Transition } from '@headlessui/react'

const Modal = (props) => {
  const { closeModal, isOpen, modalAttr } = useContext(microfictionsContext)
  if (!modalAttr) {
    return false
  }
  const mfDate = modalAttr.getNamedItem('datadate').value
  const mfHour = modalAttr.getNamedItem('datahour').value
  let MFDay = mfDate.split('/')[0]
  let MFMonth = mfDate.split('/')[1]
  let MFYear = mfDate.split('/')[2]

  const dateToBeFormatted =
    MFYear + '-' + MFMonth + '-' + MFDay /*+ 'T' + mfHour+':00'*/
  let displayDate = new Date(dateToBeFormatted).toLocaleDateString('fr-fr', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  let finalDisplayDate
  if (MFYear.includes('-')) {
    let stringToReplace =
      displayDate.split(' ')[displayDate.split(' ').length - 1]
    finalDisplayDate = displayDate.replace(
      stringToReplace,
      '-' + stringToReplace
    )
  } else {
    finalDisplayDate = displayDate
  }
  const mfText = modalAttr
    .getNamedItem('datatext')
    .value.replaceAll(`\n`, `<br/>`)

  const mfSlug = modalAttr.getNamedItem('dataslug')
    ? modalAttr.getNamedItem('dataslug').value
    : null

  return (
    <>
      <Transition appear show={isOpen} as={Fragment} className="z-1000">
        <Dialog
          as="div"
          className="relative z-1000"
          onClose={() => closeModal(mfSlug)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-[0]"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-150"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-[0]"
              >
                <div className="dialog-panel-wrapper min-w-96 rounded-2xl py-4">
                  <Dialog.Panel className="dialog-reunion w-full max-w-md font-typewriter transform py-4 px-8  text-left align-middle transition-all">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-medium leading-6 text-gray-900"
                    >
                      {finalDisplayDate} <br /> {mfHour}
                    </Dialog.Title>
                    <div className="mt-2 pb-4 text-lg">
                      <div dangerouslySetInnerHTML={{ __html: mfText }} />
                    </div>
                  </Dialog.Panel>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
export default Modal
