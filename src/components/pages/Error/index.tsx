import { Button } from '@chakra-ui/react'
import React, { PropsWithChildren } from 'react'
import { Link } from 'react-router-dom'

type Props = {
  to?: string
}

const Error = ({ to, children }: PropsWithChildren<Props>) => {
  return (
    <div className="w-full h-full min-h-[calc(100vh-80px)] flex justify-center items-center flex-col">
      <p className="text-red-400 text-lg">잘못된 접근이에요 😭</p>
      <Link className="p-3 hover:text-blue-500 text-blue-400 flex flex-col gap-1" to={to ?? '/'}>
        {children}
        <Button>이동</Button>
      </Link>
    </div>
  )
}

export default Error
