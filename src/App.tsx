import React, { MouseEvent, TouchEvent, useCallback, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Star from './components/pages/Star'
import LeftSide from './components/blocks/LeftSide'
import Feedback from './components/pages/feedback'
import ModalBase from './components/blocks/ModaBase'
import useStarState from './hooks/useStarState'
import useFeedbackState from './hooks/useFeedbackState'

const App = () => {
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
    <div className="w-full h-full">
      {/* Head Navigation */}
      <header className="w-full border h-12 flex items-center justify-between px-3 top-0 fixed bg-white bg-opacity-40 backdrop-blur-sm z-50">
        {/* LINK 로 바꿔야함 */}
        <div className="flex gap-3 items-center">
          <div className="w-6">
            <img className="max-w-full w-full" src="/favicon.ico" alt="KAP BOT" />
          </div>
          <h1>KAP BOT - 경험 기반 지원서 작성 봇</h1>
        </div>
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
          <div className="w-full bg-white h-fit p-3 shadow-lg rounded-b-md pb-6">
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
      <main className="lg:w-[calc(100%-550px)] min-h-full lg:ml-[320px] w-full mt-16">
        <Routes>
          <Route path="/write/*" element={<Star temperature={temperature} {...starState} />} />
          <Route
            path="/feedback/*"
            element={<Feedback temperature={temperature} {...feedbackState} />}
          />
        </Routes>
      </main>
      {/* Right SideBar */}
      <aside className="w-full h-fit max-lg:px-6 lg:max-w-[250px] lg:fixed lg:right-0 lg:top-16 lg:px-6 lg:z-50 relative">
        <div className="aspect-[4/1] mx-auto w-full border lg:aspect-square flex justify-center items-center bg-slate-50">
          광고박스
        </div>
      </aside>
      <ModalBase />
    </div>
  )
}

export default App
