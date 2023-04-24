import React from 'react'
import { Link } from 'react-router-dom'
import { components, OptionProps } from 'react-select'

const Option = ({ ...props }: OptionProps<any>) => {
  return (
    <Link to={props.data.value}>
      <components.Option
        {...props}
        className={`dark:bg-darkBg-500 hover:dark:bg-darkBg-100 ${
          props.isSelected ? 'dark:bg-slate-700' : ''
        }`}
      />
    </Link>
  )
}

export default Option

Option.normal = ({ ...props }: OptionProps<any>) => {
  return (
    <components.Option
      {...props}
      className={`dark:bg-darkBg-500 hover:dark:bg-darkBg-100 ${
        props.isSelected ? 'dark:bg-slate-700' : ''
      }`}
    />
  )
}
