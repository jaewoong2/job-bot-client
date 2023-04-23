import React, { useCallback } from 'react'
import Select from 'react-select'
import { useLocation } from 'react-router-dom'
import Slider from '../atoms/Slider'
import Option from '../atoms/Option'

type OptionValues = 'write' | 'feedback'
type OptionType = {
  value: OptionValues
  label: string
}

type Props = {
  isOnMenuBox?: boolean
  temperature: number
  setTemperature: React.Dispatch<React.SetStateAction<number>>
}

const options: OptionType[] = [
  { value: 'write', label: '경험 작성' },
  { value: 'feedback', label: '지원서 피드백' },
]

const LeftSide = ({ temperature, setTemperature, isOnMenuBox }: Props) => {
  const navigation = useLocation()

  const handleChangeSlide = useCallback((value: number) => {
    setTemperature(value)
  }, [])

  return (
    <aside
      className={`pl-2 w-full h-full flex-col gap-5 ${
        isOnMenuBox ? 'flex' : 'lg:flex hidden fixed top-16 left-0 max-w-xs'
      } z-50`}
    >
      <section className="border w-full bg-white">
        <ul className="flex flex-col">
          <li className=" p-2 rounded-2xl">
            <div className="flex flex-col">
              <span className="py-1 font-[300]">어떤 것을 도와 드릴까요?</span>
              <Select
                value={
                  options[
                    options.findIndex(
                      (option) => option.value === navigation.pathname.split('/')[1]
                    )
                  ]
                }
                options={options}
                className="z-50"
                isSearchable={false}
                components={{
                  Option,
                }}
              />
            </div>
          </li>
          <li className="p-2 rounded-2xl">
            <Slider
              className="w-[95%] mx-auto"
              label="창조성"
              value={temperature}
              onChange={handleChangeSlide}
              sliderOptions={{ defaultValue: [2] }}
            />
          </li>
        </ul>
      </section>
      <div
        className={`w-full border aspect-square flex justify-center items-center bg-slate-50 ${
          isOnMenuBox ? 'aspect-[7]' : ''
        }`}
      >
        광고박스
      </div>
    </aside>
  )
}

export default LeftSide
