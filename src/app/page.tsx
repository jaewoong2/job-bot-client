'use client'
import React from 'react'
import { FcPositiveDynamic, FcTodoList, FcGraduationCap, FcSms } from 'react-icons/fc'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '@/components/Layout'

const HOME_NAVIGATION = [
  {
    icon: <FcGraduationCap />,
    content: '지원서 작성',
    href: '/write',
  },
  {
    icon: <FcPositiveDynamic />,
    content: '지원서 평가',
    href: '/pnf',
  },
  {
    icon: <FcTodoList />,
    content: '지원서 피드백',
    href: '/feedback',
  },
  {
    icon: '🐝',
    content: '코파일럿',
    href: '/copilot',
  },
  {
    icon: <FcSms />,
    content: '지원서 꿀팁',
    href: '/articles',
  },
]

const Home = () => {
  return (
    <section className='flex w-full flex-col items-center gap-10'>
      <div>
        <div className='flex h-[200px] w-full justify-center max-sm:sr-only'>
          <Image
            priority={false}
            src='/jobbotthubmnail.png'
            alt='잡봇 로고'
            className='drop-shadow-lg'
            width={200}
            height={200}
          />
        </div>
        <div className='relative flex h-24 w-24 items-center justify-center rounded-3xl p-3 text-4xl shadow-xl dark:shadow-inner dark:shadow-darkBg-200 sm:sr-only'>
          <h1 className='flex items-center justify-center font-thin text-black dark:text-slate-400'>잡봇</h1>
        </div>
      </div>
      <div className='mx-auto text-2xl font-bold max-xl:text-xl'>이용 가능한 컨텐츠</div>
      <div className='grid max-w-md grid-cols-4 justify-center gap-5 p-5 max-md:grid-cols-3 max-sm:grid-cols-4 max-[320px]:grid-cols-3'>
        {HOME_NAVIGATION.map(({ content, icon, href }) => (
          <Link
            className='flex w-fit cursor-pointer flex-col justify-center gap-2 transition-transform hover:-translate-y-1'
            href={href}
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
