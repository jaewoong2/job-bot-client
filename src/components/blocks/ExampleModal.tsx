import React, { useEffect } from 'react'
import ModalBase from './ModalBase'
import { useDisclosure } from '@chakra-ui/react'

const ExampleModal = () => {
  const modal = useDisclosure()

  useEffect(() => {
    modal.onOpen()
  }, [])

  return (
    <ModalBase title='잡봇, 이렇게 사용해봐요' {...modal}>
      안녕
    </ModalBase>
  )
}

export default ExampleModal
