import React from 'react'

type Props = {
  title?: string
} & React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>

const Header = ({ title, className, children, ...props }: Props) => {
  return (
    <header className={`fixed top-0 z-50 flex h-12 w-full items-center border bg-white px-3 ${className}`} {...props}>
      {title && <h1>{title}</h1>}
      {children}
    </header>
  )
}

export default Header
