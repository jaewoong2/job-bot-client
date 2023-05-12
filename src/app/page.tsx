'use client'
import React from 'react'
import { FcPositiveDynamic, FcTodoList, FcGraduationCap } from 'react-icons/fc'
import Link from 'next/link'
import Image from 'next/image'
import { useColorMode } from '@chakra-ui/react'
import { Pages } from '@/types'

const HOME_NAVIGATION: {
  icon: React.ReactNode
  content: string
  href: Pages
}[] = [
  {
    icon: '🐝',
    content: '지원서 봇',
    href: 'copilot',
  },
  {
    icon: <FcGraduationCap />,
    content: '지원서 작성',
    href: 'write',
  },
  {
    icon: <FcPositiveDynamic />,
    content: '지원서 평가',
    href: 'rating',
  },
  {
    icon: <FcTodoList />,
    content: '지원서 피드백',
    href: 'feedback',
  },
]

const Home = () => {
  const { colorMode } = useColorMode()
  return (
    <section className='flex w-full flex-col items-center gap-10'>
      <div className='flex h-[200px] w-full justify-center pl-6'>
        <Image
          priority={false}
          src={colorMode === 'light' ? '/잡봇.svg' : '/다크잡봇.svg'}
          alt='잡봇 로고'
          className='drop-shadow-lg'
          width={200}
          height={200}
        />
      </div>
      <div className='grid max-w-md grid-cols-4 justify-center gap-5 p-5 max-md:grid-cols-3 max-sm:grid-cols-4 max-[320px]:grid-cols-3'>
        {HOME_NAVIGATION.map(({ content, icon, href }) => (
          <Link
            className='flex w-fit cursor-pointer flex-col justify-center gap-2 transition-transform hover:-translate-y-1'
            href={'/' + href}
            key={href}
          >
            <div className='flex h-[80px] w-[80px] items-center justify-center rounded-xl shadow-xl dark:shadow-inner dark:shadow-darkBg-200'>
              <span className='text-3xl'>{icon}</span>
            </div>
            <div className='flex items-center justify-center text-sm'>{content}</div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Home
