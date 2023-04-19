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
}: Props) => {
  return (
    <div className={`flex flex-col ${containerClassName}`}>
      <div className="w-full flex justify-between">
        <span className="py-1 font-[300]">{label}</span>
        <input
          className="px-3 w-[80px] border rounded-md text-sm"
          id="input"
          type="number"
          placeholder="volume"
          value={value}
        />
      </div>
      <div>
        <RangeSlider
          defaultValue={[30]}
          colorScheme="gray"
          onChange={([number]) => onChange(number)}
          value={[value]}
          {...sliderOptions}
        >
          <RangeSliderTrack bgColor="gray.100" rounded="xl" {...sliderTrackOptions}>
            <RangeSliderFilledTrack bgColor="gray.300" {...sliderInnerOptions} />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} {...sliderThumbOptions} />
        </RangeSlider>
      </div>
    </div>
  )
}

export default Slider
