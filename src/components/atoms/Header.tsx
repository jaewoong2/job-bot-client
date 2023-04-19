import React from 'react'

type Props = {
  title?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

const Header = ({ title, className, children, ...props }: Props) => {
  return (
    <header
      className={`w-full border h-12 flex items-center px-3 top-0 fixed bg-white z-50 ${className}`}
      {...props}
    >
      {title && <h1>{title}</h1>}
      {children}
    </header>
  )
}

export default Header
