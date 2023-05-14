import React from 'react'
import { ControlProps, components } from 'react-select'

const Control = ({ children, className, ...props }: ControlProps<any>) => {
  return (
    <components.Control {...props} className={`dark:border-darkBg-200 dark:bg-darkBg-400 dark:text-white ${className}`}>
      {children}
    </components.Control>
  )
}

export default Control
