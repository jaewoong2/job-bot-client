import { Tooltip } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useState } from 'react'
import cloud from '@/assets/cloud.png'

const Clouds = () => {
  const [animation, setAnimation] = useState(true)

  return (
    <>
      <figure className='absolute left-5 top-1/2 z-0' onClick={() => setAnimation((prev) => !prev)}>
        <Tooltip label={`애니메이션 ${animation ? '제거' : '동작'}`}>
          <Image
            src={cloud}
            width={120}
            height={120}
            alt='cloud'
            className={`${animation && 'animate-cloud'} drop-shadow-md`}
          />
        </Tooltip>
        <a href='https://www.flaticon.com/kr/free-icons/' title='구름 아이콘' className='sr-only'>
          구름 아이콘 제작자: iconixar - Flaticon
        </a>
      </figure>
      <figure className='absolute right-5 top-1/2 z-0 scale-x-[-1]' onClick={() => setAnimation((prev) => !prev)}>
        <Tooltip label={`애니메이션 ${animation ? '제거' : '동작'}`}>
          <Image
            src={cloud}
            width={120}
            height={120}
            alt='cloud'
            className={`${animation && 'animate-cloud-reverse'} drop-shadow-md`}
          />
        </Tooltip>
        <a href='https://www.flaticon.com/kr/free-icons/' title='구름 아이콘' className='sr-only'>
          구름 아이콘 제작자: iconixar - Flaticon
        </a>
      </figure>
    </>
  )
}

export default Clouds
