import React, { MouseEvent, TouchEvent, useCallback, useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import { useColorMode } from '@chakra-ui/react'
import Star from './components/pages/Star'
import LeftSide from './components/blocks/LeftSide'
import Feedback from './components/pages/feedback'
import ModalBase from './components/blocks/ModaBase'
import useStarState from './hooks/useStarState'
import useFeedbackState from './hooks/useFeedbackState'
import ThemeButton from './components/blocks/ThemeButton'
import Home from './components/pages/Home'
import Articles from './components/pages/articles'
// import ThemeButton from './components/blocks/ThemeButton'

const App = () => {
  const { colorMode, setColorMode } = useColorMode()
  const [temperature, setTemperature] = useState(50)
  const starState = useStarState()
  const feedbackState = useFeedbackState()

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
    <div className="w-full min-h-full dark:bg-darkBg-400 dark:text-white">
      {/* Head Navigation */}
      <header className="w-full border-b h-12 flex items-center justify-between px-3 top-0 fixed bg-white bg-opacity-40 backdrop-blur-sm z-50 dark:bg-darkBg-400 dark:border-gray-500">
        {/* LINK 로 바꿔야함 */}
        <Link to="/" className="hover:bg-slate-100 dark:hover:bg-darkBg-200 p-2 rounded-xl">
          <div className="flex gap-3 items-center">
            <div className="w-6">
              <img className="max-w-full w-full" src="/favicon.ico" alt="KAP BOT" />
            </div>
            <h1>잡봇 - 경험 기반 지원서 작성 봇</h1>
          </div>
        </Link>
        <ThemeButton {...{ colorMode, setColorMode }} />
        <button type="button" className="lg:hidden flex" onClick={toggleMenuClick}>
          메뉴
        </button>
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
          </div>
        </div>
      )}
      {/* Left Side Bar */}
      <LeftSide temperature={temperature} setTemperature={setTemperature} />
      {/* Main */}
      <main className="lg:w-[calc(100%-550px)] min-h-full lg:ml-[320px] w-full pt-16">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles/:article" element={<Articles />} />
          <Route path="/write/*" element={<Star temperature={temperature} {...starState} />} />
          <Route
            path="/feedback/*"
            element={<Feedback temperature={temperature} {...feedbackState} />}
          />
        </Routes>
      </main>
      {/* Right SideBar */}
      <aside className="w-full h-fit max-lg:px-6 lg:max-w-[250px] lg:fixed lg:right-0 lg:top-16 lg:px-6 lg:z-50 relative">
        <div className="aspect-[4/1] mx-auto w-full border lg:aspect-square flex justify-center items-center bg-slate-50 dark:bg-darkBg-300 ">
          광고박스
        </div>
      </aside>

      <footer className="w-full bg-darkBg-800 min-h-[200px]">
        <div aria-label="footer-main" className="container mx-auto p-5 text-gray-300">
          <div className="w-full border grid grid-cols-3">
            <div>
              <h2 className="font-bold text-xl px-2">Contact</h2>
              <ul>
                <li className="px-3 text-sm text-white">Email</li>
              </ul>
            </div>
          </div>
          <p className="text-sm font-semibold">@All Rights Reserved @jaewoong2</p>
        </div>
      </footer>
      <ModalBase />
    </div>
  )
}

export default App
