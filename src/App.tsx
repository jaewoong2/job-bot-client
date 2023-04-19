import React from 'react'
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Select,
} from '@chakra-ui/react'
import Star from './components/pages/Star'

const App = () => {
  return (
    <div className="w-full h-full">
      {/* Head Navigation */}
      <header className="w-full border h-12 flex items-center px-3 top-0 fixed bg-white z-50">
        {/* LINK 로 바꿔야함 */}
        <h1>KAP BOT - 경험 기반 지원서 작성 봇</h1>
      </header>
      <section className="grid grid-cols-main gap-5 items-center w-full mt-16">
        {/* Left Side Bar */}
        <aside className="pl-2 w-full h-full flex flex-col gap-5">
          <section className="border w-full bg-white">
            <ul className="flex flex-col">
              <li className=" p-2 rounded-2xl">
                <div className="flex flex-col">
                  <span className="py-1 font-[300]">어떤 것을 도와 드릴까요?</span>
                  <Select placeholder="종류" className="font-[300]">
                    <option value="option1">지원서 작성</option>
                    <option value="option2">지원서 피드백</option>
                  </Select>
                </div>
              </li>
              <li className="p-2 rounded-2xl">
                <div className="flex flex-col">
                  <div className="w-full flex justify-between">
                    <span className="py-1 font-[300]">Label</span>
                    <input
                      className="px-3 w-[80px] border rounded-md text-sm"
                      id="input"
                      type="number"
                      placeholder="volume"
                    />
                  </div>
                  <div className="w-[90%] mx-auto">
                    <RangeSlider defaultValue={[30]} colorScheme="gray">
                      <RangeSliderTrack bgColor="gray.100" rounded="xl">
                        <RangeSliderFilledTrack bgColor="gray.300" />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                    </RangeSlider>
                  </div>
                </div>
              </li>
            </ul>
          </section>
          <div className="w-full border aspect-square flex justify-center items-center bg-slate-50">
            광고박스
          </div>
        </aside>
        {/* Main */}
        <main className="w-full h-full">
          <Star />
        </main>
        {/* Right SideBar */}
        <aside className="w-full h-full pr-5">
          <div className="w-full border aspect-square flex justify-center items-center bg-slate-50">
            광고박스
          </div>
        </aside>
      </section>
    </div>
  )
}

export default App
