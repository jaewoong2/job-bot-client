import React, { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import Slider from '../atoms/Slider'

type OptionValues = 'write' | 'feedback'
type OptionType = {
  value: OptionValues
  label: string
}

const options: OptionType[] = [
  { value: 'write', label: '경험 작성' },
  { value: 'feedback', label: '지원서 피드백' },
]

const DEFAULT_TEMPERATURE = 2

const LeftSide = () => {
  const navigate = useNavigate()
  const [currentParam, setCurrentParam] = useState<OptionValues>('write')
  const [temperature, setTemperature] = useState(DEFAULT_TEMPERATURE)

  const handleOptionChange = useCallback((option: OptionType | null) => {
    if (option) {
      setCurrentParam(option.value)
      navigate(option.value)
    }
  }, [])

  const handleChangeSlide = useCallback((value: number) => {
    setTemperature(value)
  }, [])

  return (
    <aside className="pl-2 w-full h-full flex-col gap-5 lg:flex hidden fixed top-16 left-0 max-w-xs z-50">
      <section className="border w-full bg-white">
        <ul className="flex flex-col">
          <li className=" p-2 rounded-2xl">
            <div className="flex flex-col">
              <span className="py-1 font-[300]">어떤 것을 도와 드릴까요?</span>
              <Select
                value={options.find((option) => option.value === currentParam)}
                options={options}
                className="z-50"
                isSearchable={false}
                onChange={handleOptionChange}
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
      <div className="w-full border aspect-square flex justify-center items-center bg-slate-50">
        광고박스
      </div>
    </aside>
  )
}

export default LeftSide
