'use client'
import React, { MouseEvent, PropsWithChildren, TouchEvent, useCallback, useState } from 'react'
import { useColorMode } from '@chakra-ui/react'
import { RxHamburgerMenu } from 'react-icons/rx'
import LeftSide from './blocks/LeftSide'
import ModalBase from './blocks/ModalBase'
import ThemeButton from './blocks/ThemeButton'
import Footer from './atoms/Footer'
import Link from 'next/link'
import Image from 'next/image'

const Layout = ({ children }: PropsWithChildren) => {
  const location = window.location
  const { colorMode, setColorMode } = useColorMode()
  const [temperature, setTemperature] = useState(50)

  const [isMenuClick, setIsMenuClick] = useState(false)

  const showMenuClick = useCallback(() => {
    setIsMenuClick(true)
  }, [])
  const hideMenuClick = useCallback(() => {
    setIsMenuClick(false)
  }, [])
  const toggleMenuClick = useCallback(() => {
    setIsMenuClick((prev) => !prev)
  }, [])
  const handleMenuBoxClick = useCallback(
    (e: TouchEvent<HTMLDivElement> | MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        hideMenuClick()
      }
    },
    [hideMenuClick]
  )

  return (
    <div className='h-fit min-h-full w-full dark:bg-darkBg-400 dark:text-white'>
      {/* Head Navigation */}
      <header className='fixed top-0 z-50 flex h-12 w-full items-center justify-between border-b bg-white bg-opacity-40 px-3 backdrop-blur-sm dark:border-gray-500 dark:bg-darkBg-400'>
        {/* LINK 로 바꿔야함 */}
        <Link href='/' className='rounded-xl p-2 hover:bg-slate-100 dark:hover:bg-darkBg-200'>
          <div className='flex items-center gap-3'>
            <div className='w-6'>
              <Image className='w-full max-w-full' src='/favicon.ico' alt='KAP BOT' width={24} height={24} />
            </div>
            <h1>잡봇 - 지원서 봇</h1>
          </div>
        </Link>
        <div className='flex items-center gap-4'>
          <button aria-label='메뉴 버튼' type='button' className='flex lg:hidden' onClick={toggleMenuClick}>
            <RxHamburgerMenu className='w-4 stroke-[1px] text-gray-300' />
          </button>
          <ThemeButton {...{ colorMode, setColorMode }} />
        </div>
      </header>
      {isMenuClick && (
        <div
          tabIndex={0}
          role='menu'
          onTouchEnd={handleMenuBoxClick}
          onKeyDown={() => {
            return true
          }}
          className='fixed left-0 top-12 z-50 flex h-full w-full animate-fade-in-down bg-transparent lg:hidden'
          onClick={handleMenuBoxClick}
        >
          <div className='h-fit w-full rounded-b-md bg-white p-3 pb-6 shadow-lg dark:bg-darkBg-400'>
            <div className='flex w-full flex-col items-end gap-5 '>
              <button className='text-xl' type='button' onClick={hideMenuClick || showMenuClick}>
                &times;
              </button>
              <LeftSide isOnMenuBox temperature={temperature} setTemperature={setTemperature} />
            </div>
            <div className='flex w-full flex-col items-end gap-5 pt-3'>
              <button
                className='text-md flex items-center rounded-md bg-slate-200 px-4 py-2 align-middle hover:bg-slate-300 dark:bg-darkBg-200 hover:dark:bg-darkBg-100'
                type='button'
                onClick={hideMenuClick || showMenuClick}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Left Side Bar */}
      <LeftSide temperature={temperature} setTemperature={setTemperature} />

      {/* Main */}
      <main
        className={`h-fit  min-h-[calc(100vh)] w-full pt-16 ${
          location.pathname === '/' ? 'flex justify-center' : 'lg:ml-[320px] lg:w-[calc(100%-550px)] '
        }`}
      >
        {children}
      </main>
      {/* Right SideBar */}
      <aside className='relative h-fit w-full max-lg:px-6 lg:fixed lg:right-0 lg:top-16 lg:z-50 lg:max-w-[250px] lg:px-6' />
      {/* Footer */}
      <Footer />
      <ModalBase />
    </div>
  )
}

export default Layout
