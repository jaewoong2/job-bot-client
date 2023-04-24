import React, { useCallback } from 'react'
import { RxDoubleArrowDown } from 'react-icons/rx'
import { LIMIT_TEXT_LENGTH, STAR } from '@/hooks/useStarState'
import { Star } from '@/types'
import { UseMutateFunction } from 'react-query'
import TextArea from '../../atoms/TextArea'

type Props = {
  star: Star
  step: number
  isError: boolean
  errorStatus: {
    situation: string | null
    task: string | null
    action: string | null
    result: string | null
  }
  handleChangeStar: (key: keyof Star) => (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleClickNextStep: (index: number) => () => void
  handleSubmit: (callback: <T extends Star>(args: T) => void) => void
  mutate: UseMutateFunction<
    | {
        role: 'assistant' | 'user' | 'system'
        content: string
      }
    | undefined,
    unknown,
    Star,
    unknown
  >
}

const StarMain = ({
  star,
  step,
  isError,
  errorStatus,
  handleChangeStar,
  handleClickNextStep,
  handleSubmit,
  mutate,
}: Props) => {
  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleSubmit(mutate)
    },
    [handleSubmit]
  )

  return (
    <form onSubmit={submit} id="star-form" className="pb-10">
      {STAR.map(
        ({ key, label, tooltip, placeholder }, index) =>
          index <= step && (
            <div className="p-3 pb-0" key={key}>
              <TextArea
                label={label}
                placeholder={placeholder}
                resize="none"
                minH="200px"
                borderColor={errorStatus[key] ? 'red.300' : 'gray.300'}
                value={star[key]}
                tooltip={tooltip}
                containerClassName="bg-darkBg-900"
                onChange={handleChangeStar(key)}
              />
              <div
                className={`w-full flex justify-between px-3 text-sm ${
                  errorStatus[key] ? 'text-red-400' : 'text-gray-500'
                }`}
              >
                <div>
                  {errorStatus[key] && (
                    <span className="text-red-500 animate-fade-in-left">{errorStatus[key]}</span>
                  )}
                </div>
                <div className={star[key].length > LIMIT_TEXT_LENGTH ? 'text-red-400' : ''}>
                  {star[key].length} / {LIMIT_TEXT_LENGTH}
                </div>
              </div>
              {index <= step && index < STAR.length - 1 && (
                <div className="p-3">
                  <a
                    href={`#${STAR[index + 1].key}`}
                    type="button"
                    id={STAR[index + 1].key}
                    className="w-[100%] mx-auto flex justify-center my-5 cursor-pointer py-2 rounded-xl hover:bg-sky-50"
                    onClick={handleClickNextStep(index)}
                  >
                    <span
                      className={`border rounded-full p-1 + ${
                        step === index ? 'animate-bounce' : ''
                      }`}
                    >
                      <RxDoubleArrowDown className="text-2xl text-gray-800" />
                    </span>
                  </a>
                </div>
              )}
            </div>
          )
      )}
      {step === STAR.length - 1 && (
        <div className="w-full flex justify-center my-5 cursor-pointer px-5">
          <button
            type="submit"
            className={`w-full py-3 hover:bg-sky-100 text-gray-600 bg-sky-50 rounded-xl ${
              isError ? 'bg-red-50 border-red-100 border text-rose-400' : ''
            }`}
            form="star-form"
          >
            작성하기
          </button>
        </div>
      )}
    </form>
  )
}

export default StarMain
