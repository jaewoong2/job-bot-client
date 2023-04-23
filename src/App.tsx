import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Star from './components/pages/Star'
import LeftSide from './components/blocks/LeftSide'

const App = () => {
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
        <button type="button" className="lg:hidden flex">
          메뉴
        </button>
      </header>
      {/* Left Side Bar */}
      <LeftSide />
      {/* Main */}
      <main className="lg:w-[calc(100%-550px)] min-h-full lg:ml-[320px] w-full mt-16">
        <Routes>
          <Route path="/write/*" element={<Star />} />
        </Routes>
      </main>
      {/* Right SideBar */}
      <aside className="w-full h-fit max-lg:px-6 lg:max-w-[250px] lg:fixed lg:right-0 lg:top-16 lg:px-6 lg:z-50 relative">
        <div className="aspect-[4/1] mx-auto w-full border lg:aspect-square flex justify-center items-center bg-slate-50">
          광고박스
        </div>
      </aside>
    </div>
  )
}

export default App
