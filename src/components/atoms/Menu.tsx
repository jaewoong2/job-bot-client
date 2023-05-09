import React from 'react'
import { components, MenuProps } from 'react-select'

const Menu = ({ ...props }: MenuProps<any>) => {
  return <components.Menu {...props} className='dark:bg-darkBg-500' />
}

export default Menu
