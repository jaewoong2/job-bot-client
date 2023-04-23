import React from 'react'
import { Link } from 'react-router-dom'
import { components, OptionProps } from 'react-select'

type OptionValues = 'write' | 'feedback'
type OptionType = {
  value: OptionValues
  label: string
}

const Option = ({ ...props }: OptionProps<OptionType>) => {
  return (
    <Link to={props.data.value}>
      <components.Option {...props} />
    </Link>
  )
}

export default Option
