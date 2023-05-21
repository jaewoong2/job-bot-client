import { IMAGES } from '@/constants'
import { useColorMode } from '@chakra-ui/react'
import React from 'react'

const LogoImage = () => {
  const { colorMode } = useColorMode()
  return (
    <div className='flex h-[200px] items-center justify-center'>
      <div className='flex h-[130px] w-full justify-center pl-6'>
        <img
          src={colorMode === 'dark' ? IMAGES.잡봇 : IMAGES.다크잡봇}
          alt='잡봇 로고'
          className='h-auto max-h-full w-auto max-w-full drop-shadow-lg'
          width={200}
          height={200}
        />
      </div>
    </div>
  )
}

export default LogoImage
