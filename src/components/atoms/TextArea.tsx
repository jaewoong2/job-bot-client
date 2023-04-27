import { Textarea as ChakraTextArea, TextareaProps, Tooltip } from '@chakra-ui/react'
import React from 'react'

type Props = {
  label?: string
  containerClassName?: string
  labelClassName?: string
  tooltip?: string
} & TextareaProps

const TextArea = ({
  label,
  containerClassName,
  labelClassName,
  children,
  tooltip,
  ...props
}: Props) => {
  return (
    <div className="p-3">
      <div className="flex gap-1 items-center pb-2">
        <h4 className="text-base font-semibold" id={label}>
          {label}
        </h4>
        {tooltip && (
          <Tooltip label={tooltip} placement="auto-start">
            <span className="dark:bg-darkBg-300 relative cursor-pointer text-xs rounded-full aspect-square w-4 h-4 flex justify-center items-center bg-gray-300 text-slate-100">
              i
            </span>
          </Tooltip>
        )}
      </div>
      <div className={`dark:bg-darkBg-300 ${containerClassName}`}>
        <ChakraTextArea resize="none" minH="200px" {...props} />
      </div>
      {children}
    </div>
  )
}

export default TextArea
