import Link from 'next/link'
import React from 'react'
import { components, OptionProps } from 'react-select'

const Option = ({ ...props }: OptionProps<any>) => {
  return (
    <Link href={props.data.value}>
      <components.Option
        {...props}
        className={`dark:bg-darkBg-500 hover:dark:bg-darkBg-100 ${props.isSelected ? 'dark:bg-slate-700' : ''}`}
      />
    </Link>
  )
}

export default Option

Option.normal = ({ ...props }: OptionProps<any>) => {
  return (
    <components.Option
      {...props}
      className={`dark:bg-darkBg-500 hover:dark:bg-darkBg-100 ${props.isSelected ? 'dark:bg-slate-700' : ''}`}
    />
  )
}
