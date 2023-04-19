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
} & UseDisclosureProps

const ModalBase = ({
  title,
  closeButton = '닫기',
  children,
  onClose,
  isOpen,
}: PropsWithChildren<Props>) => {
  if (!(onClose && isOpen)) {
    return <div />
  }

  return (
    <Modal onClose={onClose} isOpen={isOpen} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>{closeButton}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ModalBase
