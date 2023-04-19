import React from 'react'
import { Select as ChakraSelect, SelectProps } from '@chakra-ui/react'

type Props = {
  label?: string
  containerClassName?: string
  options?: React.DetailedHTMLProps<
    React.OptionHTMLAttributes<HTMLOptionElement>,
    HTMLOptionElement
  >[]
} & SelectProps

const Select = ({ containerClassName, className, children, label, options, ...props }: Props) => {
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <span className="py-1 font-[300]">{label}</span>
      <ChakraSelect placeholder="종류" className={`font-[300] ${className}`} {...props}>
        {children}
        {options?.map(({ children: child, ...rest }) => (
          <option {...rest}>{child ?? rest.value}</option>
        ))}
      </ChakraSelect>
    </div>
  )
}

export default Select
