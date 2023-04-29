import React, { MouseEvent, TouchEvent, useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { useColorMode } from '@chakra-ui/react'
import { RxHamburgerMenu } from 'react-icons/rx'
import LeftSide from './components/blocks/LeftSide'
import ModalBase from './components/blocks/ModaBase'
import ThemeButton from './components/blocks/ThemeButton'
import Footer from './components/atoms/Footer'
import Router from './components/Routes/Router'

const App = () => {
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
    []
  )

  return (
    <div className="w-full min-h-full dark:bg-darkBg-400 dark:text-white h-fit">
      {/* Head Navigation */}
      <header className="w-full border-b h-12 flex items-center justify-between px-3 top-0 fixed bg-white bg-opacity-40 backdrop-blur-sm z-50 dark:bg-darkBg-400 dark:border-gray-500">
        {/* LINK 로 바꿔야함 */}
        <Link to="/" className="hover:bg-slate-100 dark:hover:bg-darkBg-200 p-2 rounded-xl">
          <div className="flex gap-3 items-center">
            <div className="w-6">
              <img className="max-w-full w-full" src="/favicon.ico" alt="KAP BOT" />
            </div>
            <h1>잡봇 - 지원서 봇</h1>
          </div>
        </Link>
        <div className="flex gap-4 items-center">
          <button
            aria-label="메뉴 버튼"
            type="button"
            className="lg:hidden flex"
            onClick={toggleMenuClick}
          >
            <RxHamburgerMenu className="text-gray-300 w-4 stroke-[1px]" />
          </button>
          <ThemeButton {...{ colorMode, setColorMode }} />
        </div>
      </header>
      {isMenuClick && (
        <div
          tabIndex={0}
          role="menu"
          onTouchEnd={handleMenuBoxClick}
          onKeyDown={() => {}}
          className="w-full h-full bg-transparent fixed z-50 top-12 left-0 lg:hidden flex animate-fade-in-down"
          onClick={handleMenuBoxClick}
        >
          <div className="w-full bg-white h-fit p-3 shadow-lg rounded-b-md pb-6 dark:bg-darkBg-400">
            <div className="flex items-end w-full flex-col gap-5 ">
              <button className="text-xl" type="button" onClick={hideMenuClick || showMenuClick}>
                &times;
              </button>
              <LeftSide isOnMenuBox temperature={temperature} setTemperature={setTemperature} />
            </div>
            <div className="flex items-end w-full flex-col gap-5 pt-3">
              <button
                className="text-md dark:bg-darkBg-200 py-2 px-4 flex items-center align-middle rounded-md hover:dark:bg-darkBg-100 bg-slate-200 hover:bg-slate-300"
                type="button"
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
      <main className="lg:w-[calc(100%-550px)] min-h-[calc(100vh)] lg:ml-[320px] w-full h-fit pt-16">
        <Router temperature={temperature} />
      </main>
      {/* Right SideBar */}
      <aside className="w-full h-fit max-lg:px-6 lg:max-w-[250px] lg:fixed lg:right-0 lg:top-16 lg:px-6 lg:z-50 relative" />

      {/* Footer */}
      <Footer />
      <ModalBase />
    </div>
  )
}

export default App
