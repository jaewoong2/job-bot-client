import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  UseDisclosureProps,
} from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type Props = {
  title?: string
  closeButton?: string
  footer?: React.ReactNode
  classsName?: string
} & UseDisclosureProps

const ModalBase = ({
  title,
  closeButton = '닫기',
  children,
  onClose,
  isOpen,
  footer,
  classsName,
}: PropsWithChildren<Props>) => {
  if (!(onClose && isOpen)) {
    return <div />
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent className={`dark:bg-darkBg-400 ${classsName}`}>
        {title && <ModalHeader className='bg-darkBg-400'>{title}</ModalHeader>}
        <ModalCloseButton />
        <ModalBody className={`dark:bg-darkBg-400 ${classsName}`}>{children}</ModalBody>
        <ModalFooter className={`dark:bg-darkBg-400 ${classsName}`}>
          {footer}
          <Button onClick={onClose}>{closeButton}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalBase
