import React from 'react'
import { ControlProps, components } from 'react-select'

const Control = ({ children, className, ...props }: ControlProps<any>) => {
  return (
    <components.Control
      {...props}
      className={`dark:bg-darkBg-400 dark:text-white dark:border-darkBg-200 ${className}`}
    >
      {children}
    </components.Control>
  )
}

export default Control
