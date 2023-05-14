import { Button, Textarea as ChakraTextArea, TextareaProps, Tooltip } from '@chakra-ui/react'
import React from 'react'

type Props = {
  label?: string
  containerClassName?: string
  labelClassName?: string
  tooltip?: string
  isLoading?: boolean
} & TextareaProps

const TextArea = ({ label, containerClassName, labelClassName, children, tooltip, isLoading, ...props }: Props) => {
  return (
    <div className='p-3'>
      <div className='flex items-center gap-1 pb-2'>
        <h4 className={`text-base font-semibold ${labelClassName}`} id={label}>
          {isLoading ? <Button border='none' bg='transparent' _hover={{}} isLoading size='sm' /> : label}
        </h4>
        {tooltip && (
          <Tooltip label={tooltip} placement='auto-start'>
            <span className='relative flex aspect-square h-4 w-4 cursor-pointer items-center justify-center rounded-full bg-gray-300 text-xs text-slate-100 dark:bg-darkBg-300'>
              i
            </span>
          </Tooltip>
        )}
      </div>
      <div className={`dark:bg-darkBg-300 ${containerClassName}`}>
        <ChakraTextArea resize='none' minH='200px' {...props} />
      </div>
      {children}
    </div>
  )
}

export default TextArea
