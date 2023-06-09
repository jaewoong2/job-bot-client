'use client'
import React from 'react'
import { FcPositiveDynamic, FcTodoList, FcGraduationCap, FcAnswers } from 'react-icons/fc'
import Link from 'next/link'
import { Pages } from '@/types'
import LogoImage from '@/components/atoms/LogoImage'

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
  {
    icon: <FcAnswers />,
    content: '지원서 소제목',
    href: 'title',
  },
]

const Home = () => {
  return (
    <section className='0 flex w-full flex-col items-center gap-1'>
      <LogoImage />
      <div className='grid max-w-lg grid-cols-5 justify-center gap-5 p-5 max-md:grid-cols-4 max-sm:grid-cols-3 max-[320px]:grid-cols-2'>
        {HOME_NAVIGATION.map(({ content, icon, href }) => (
          <Link
            className='z-[1] flex w-fit cursor-pointer flex-col justify-center gap-2 transition-transform hover:-translate-y-1'
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
