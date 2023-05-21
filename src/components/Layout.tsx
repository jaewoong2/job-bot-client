'use client'
import React, { PropsWithChildren, useState } from 'react'

import LeftSide from './blocks/LeftSide'
import ModalBase from './blocks/ModalBase'
import Footer from './atoms/Footer'

import { temperatureContext } from '@/hooks/useTemperature'
import useMounted from '@/hooks/useMounted'
import { usePathname } from 'next/navigation'
import Router from 'next/router'
import Header from './blocks/Header'

const Layout = ({ children }: PropsWithChildren) => {
  const isMounted = useMounted()
  const pathName = usePathname()

  const [temperature, setTemperature] = useState(50)

  if (!isMounted && !Router.isReady) {
    return null
  }

  return (
    <div className='h-fit min-h-full w-full dark:bg-darkBg-400 dark:text-white'>
      {/* Head Navigation */}
      <Header title={'잡봇 - 자소서 지원 봇'} temperature={temperature} setTemperature={setTemperature} />
      {/* Left Side Bar */}
      <LeftSide temperature={temperature} setTemperature={setTemperature} />
      {/* Main */}
      <main
        className={`relative h-fit min-h-[calc(100vh)] w-full pt-16 ${
          pathName === '/' ? 'flex justify-center' : 'lg:ml-[320px] lg:w-[calc(100%-550px)] '
        }`}
      >
        <temperatureContext.Provider value={{ temperature }}>{children}</temperatureContext.Provider>
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
