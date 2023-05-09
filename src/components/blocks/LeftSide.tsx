import React, { useCallback } from 'react'
import Select from '../atoms/Select'
import Slider from '../atoms/Slider'
import Option from '../atoms/Option'

type OptionValues = 'write' | 'feedback' | 'pnf' | 'copilot'
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
  { value: 'pnf', label: '지원서 평가' },
  { value: 'feedback', label: '지원서 피드백' },
  { value: 'copilot', label: '지원서 봇' },
]

const LeftSide = ({ temperature, setTemperature, isOnMenuBox }: Props) => {
  const navigation = window.location

  const handleChangeSlide = useCallback((value: number) => {
    setTemperature(value)
  }, [])

  if (navigation.pathname === '/') return null

  return (
    <aside
      className={`h-full w-full flex-col gap-5 pl-2 ${
        isOnMenuBox ? 'flex' : 'fixed left-0 top-16 hidden max-w-xs lg:flex'
      } z-50`}
    >
      <section className='w-full rounded-md border bg-white dark:border-gray-500 dark:bg-darkBg-300'>
        <ul className='flex flex-col gap-5 pb-10'>
          <li className='rounded-2xl p-2'>
            <div className='flex flex-col'>
              <span className='py-1 font-[300]'>어떤 것을 도와 드릴까요?</span>
              <Select
                value={options[options.findIndex((option) => option.value === navigation.pathname.split('/')[1])]}
                options={options}
                isMulti={false}
                className='z-50'
                isSearchable={false}
                components={{
                  Option,
                }}
              />
            </div>
          </li>
          <li className='rounded-2xl p-2'>
            <Slider
              className='mx-auto w-[95%]'
              label='창조성'
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
