import React, { useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import Select from '../atoms/Select'
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
      <section className="w-full bg-white dark:bg-darkBg-300 border rounded-md dark:border-gray-500">
        <ul className="flex flex-col gap-5 pb-10">
          <li className="p-2 rounded-2xl">
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
                isMulti={false}
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
    </aside>
  )
}

export default LeftSide
