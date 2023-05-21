import React from 'react'
import { RxGithubLogo } from 'react-icons/rx'

import { IMAGES } from '@/constants'

const Footer = () => {
  return (
    <footer className='min-h-[200px] w-full border-t bg-slate-50 dark:bg-darkBg-500'>
      <div aria-label='footer-main' className='container mx-auto max-w-6xl p-5 dark:text-gray-300'>
        <div className='grid w-full grid-cols-2'>
          <div className='border-r'>
            <h2 className='text-xl font-bold'>Contact</h2>
            <ul>
              <li className='py-1  text-sm '>
                <a href='mailto: jwisgenius@naver.com'>Send Email</a>
              </li>
              <li className='py-1 text-sm dark:text-white'>
                <a href='https://github.com/jaewoong2' className='flex items-center gap-2'>
                  <RxGithubLogo />
                  <span>@jaewoong2</span>
                </a>
              </li>
            </ul>
          </div>
          <div className='w-full'>
            <a href='https://open.kakao.com/o/gySaOwlf' className='grid h-full w-full px-3'>
              <div className='grid h-full w-96 grid-cols-2 items-center rounded-2xl bg-slate-200 shadow-lg dark:bg-darkBg-400 dark:shadow-inner dark:shadow-darkBg-200 max-md:grid-cols-1 max-sm:w-full'>
                <h1 className='w-full px-4 text-lg font-bold dark:text-white'>잡다 공식 오픈채팅</h1>
                <div className='flex h-full max-h-24 w-auto items-center justify-center py-5 max-sm:hidden'>
                  <img
                    src={IMAGES.favicon}
                    alt='잡봇 로고'
                    className='h-auto max-h-full w-auto max-w-full pb-3 drop-shadow-lg'
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            </a>
          </div>
        </div>
        <p className='mt-10 text-sm font-semibold'>@All Rights Reserved @jaewoong2</p>
      </div>
    </footer>
  )
}

export default Footer
