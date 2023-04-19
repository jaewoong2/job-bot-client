import { Textarea as ChakraTextArea, Text, TextareaProps } from '@chakra-ui/react'
import React from 'react'

type Props = {
  label?: string
  containerClassName?: string
  labelClassName?: string
} & TextareaProps

const TextArea = ({ label, containerClassName, labelClassName, children, ...props }: Props) => {
  return (
    <div className="p-3">
      <div>
        <Text className="font-[400] py-2 text-base">{label}</Text>
        <ChakraTextArea resize="none" minH="200px" {...props} />
      </div>
      {children}
    </div>
  )
}

export default TextArea
