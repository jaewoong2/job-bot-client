import React, { ChangeEvent, useCallback, useState } from 'react'
import { RxDoubleArrowDown } from 'react-icons/rx'
import useFoldAbleActions from '@/hooks/useFoldAbleActions'
import { Star } from '@/types'
import TextArea from '../../atoms/TextArea'

/**
 * 요건
 * 0. www.domain.com/write?category=star
 * 1. 화살표를 누르면 다음 것이 뜸 (애니메이션 O), 마지막 일때 작성하기 버튼 보여줌
 * 2. 각 항목 180자
 * 3. 작성중 이면 막기
 */

const STAR = [
  { key: 'situation', label: 'Situation (상황)' },
  { key: 'task', label: 'Task (업무)' },
  { key: 'action', label: 'Action (행동)' },
  { key: 'result', label: 'Result (결과)' },
] as const

const LIMIT_TEXT_LENGTH = 240

type Props = {
  postStar: (star: Star) => void
}

const StarMain = ({ postStar }: Props) => {
  const { hide } = useFoldAbleActions()
  const [star, setStar] = useState<Star>({ action: '', result: '', situation: '', task: '' })
  const [step, setStep] = useState(0)
  const [errorStatus] = useState<{ message: string; key: string } | null>(null)

  const handleChangeStar = useCallback(
    (key: keyof Star) => (e: ChangeEvent<HTMLTextAreaElement>) => {
      setStar((prev) => {
        return { ...prev, [key]: e.target.value }
      })
    },
    []
  )

  const handleClickNextStep = useCallback(
    (index: number) => () => {
      setStep((prev) => Math.max(index + 1, prev))
      setTimeout(() => {
        window.scrollTo({ behavior: 'smooth', top: document.body.clientHeight })
      }, 0)
    },
    []
  )

  const handleSubmit = useCallback(() => {
    postStar(star)
    hide()
  }, [hide, star])

  return (
    <form onSubmit={handleSubmit} id="star-form">
      {STAR.map(
        ({ key, label }, index) =>
          index <= step && (
            <div className="p-3 pb-0" key={key}>
              <TextArea
                label={label}
                resize="none"
                minH="200px"
                className="border-primary"
                value={star[key]}
                onChange={handleChangeStar(key)}
              />
              <div
                className={`w-full flex justify-between px-3 text-sm ${
                  errorStatus?.key === key ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                <div className="text-red-500">
                  {errorStatus?.key === key && errorStatus.message}
                </div>
                <div className={star[key].length > LIMIT_TEXT_LENGTH ? 'text-red-500' : ''}>
                  {star[key].length} / {LIMIT_TEXT_LENGTH}
                </div>
              </div>
              {index <= step && index < STAR.length - 1 && (
                <div className="p-3">
                  <button
                    type="button"
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
                  </button>
                </div>
              )}
            </div>
          )
      )}
      {step === STAR.length - 1 && (
        <div className="w-full flex justify-center my-5 cursor-pointer px-5">
          <button
            onClick={() => handleSubmit()}
            type="button"
            className="w-full py-3 text-gray-600 bg-sky-50 rounded-xl"
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
