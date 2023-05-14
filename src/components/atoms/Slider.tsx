import React from 'react'
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderProps,
  RangeSliderTrackProps,
  RangeSliderInnerTrackProps,
  RangeSliderThumbProps,
} from '@chakra-ui/react'

type Props = {
  label?: string
  onChange: (value: number) => void
  containerClassName?: string
  value: number
  sliderOptions?: RangeSliderProps
  sliderTrackOptions?: RangeSliderTrackProps
  sliderInnerOptions?: RangeSliderInnerTrackProps
  sliderThumbOptions?: RangeSliderThumbProps
  className?: string
}

const Slider = ({
  label,
  containerClassName,
  onChange,
  value,
  sliderOptions,
  sliderTrackOptions,
  sliderInnerOptions,
  sliderThumbOptions,
  className,
}: Props) => {
  return (
    <div className={`flex flex-col ${containerClassName}`} aria-label={label}>
      <div className='flex w-full justify-between'>
        <span className='py-1 font-[300]'>{label}</span>
        <input
          className='w-[80px] rounded-md border px-3 text-sm'
          id='input'
          aria-label={label}
          type='number'
          placeholder='volume'
          value={value}
          min={0}
          onChange={(e) => onChange(+e.target.value)}
        />
      </div>
      <div className={className}>
        <RangeSlider
          defaultValue={[30]}
          colorScheme='gray'
          onChange={([number]) => onChange(number)}
          value={[value]}
          {...sliderOptions}
        >
          <RangeSliderTrack bgColor='gray.100' rounded='xl' {...sliderTrackOptions}>
            <RangeSliderFilledTrack bgColor='gray.300' {...sliderInnerOptions} />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} {...sliderThumbOptions} />
        </RangeSlider>
      </div>
    </div>
  )
}

export default Slider
