import React from 'react'
import { SingleValueProps, components } from 'react-select'

const Control = ({ children, className, ...props }: SingleValueProps<any>) => {
  return (
    <components.SingleValue {...props} className={`dark:bg-darkBg-400 dark:text-white ${className}`}>
      {children}
    </components.SingleValue>
  )
}

export default Control
