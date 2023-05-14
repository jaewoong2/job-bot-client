import React from 'react'
import ReactSelect, { Props, PropsValue } from 'react-select'
import Option from './Option'
import Menu from './Menu'
import SingleValue from './SingleValue'
import Control from './Control'

type SelectProps = Props<PropsValue<Props['value'] | any>, false>

const Select = ({ components, ...props }: SelectProps) => {
  return (
    <ReactSelect
      className='min-w-[180px]'
      components={{
        Option: Option.normal,
        Menu,
        SingleValue,
        Control,
        ...components,
      }}
      {...props}
    />
  )
}

export default Select
