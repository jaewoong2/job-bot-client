'use client'
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  DrawerProps,
  useMediaQuery,
} from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'

type Props = {
  title?: React.ReactNode
} & DrawerProps &
  Partial<ReturnType<typeof useDisclosure>>

const Result = ({ title, onClose, isOpen, children, ...props }: PropsWithChildren<Props>) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  return (
    <Drawer
      onClose={onClose}
      isOpen={isOpen}
      size={isMobile ? 'md' : 'lg'}
      placement={isMobile ? 'bottom' : 'right'}
      {...props}
    >
      <DrawerOverlay />
      <DrawerContent className='dark:bg-darkBg-400 max-md:rounded-t-2xl'>
        <DrawerCloseButton />
        <DrawerHeader>{title}</DrawerHeader>
        <DrawerBody>{children}</DrawerBody>
      </DrawerContent>
    </Drawer>
  )
}

export default Result
