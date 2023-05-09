import React from 'react'
import { RxGithubLogo } from 'react-icons/rx'

const Footer = () => {
  return (
    <footer className='min-h-[200px] w-full border-t bg-slate-50 dark:bg-darkBg-500'>
      <div aria-label='footer-main' className='container mx-auto max-w-6xl p-5 dark:text-gray-300'>
        <div className='grid w-full grid-cols-3'>
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
        </div>
        <p className='mt-10 text-sm font-semibold'>@All Rights Reserved @jaewoong2</p>
      </div>
    </footer>
  )
}

export default Footer
