import React, { useCallback, useState } from 'react'

import useTemperature from '@/hooks/useTemperature'
import { Feedback } from '@/types'

export type OptionValues = 'content context' | 'sentence expression'
export type OptionType = {
  value: OptionValues
  label: string
}

export const OPTIONS: OptionType[] = [
  { value: 'content context', label: '문맥' },
  { value: 'sentence expression', label: '문장 표현' },
]

export const MINIMUM_TEXT_LENGTH = 400
export const LIMIT_TEXT_LENGTH = 1000
export const TOOLTIP = '피드백 받을 지원서를 자유롭게 작성 해주세요 🥳'
export const LABEL = '지원서 내용'
export const PLACEHOLDER =
  '이전에 근무한 회사에서 경쟁력 있는 시장에서의 매출 성장을 위해 마케팅 전략을 개발하고 실행하는 역할을 맡았습니다. 이전의 전략이 시장 변화에 민첩하게 대응하지 못해 매출이 정체되어 있었기 때문에, 저는 기존 전략을 분석하고, 신규 고객을 확보하고 기존 고객을 유지할 수 있는 효과적인 마케팅 전략을 개발하고 실행하는 것이 목표였습니다. 이를 위해 먼저 경쟁사 분석과 시장 조사를 통해 현 시장 상황을 파악하였습니다. 이를 통해 기회와 위협을 도출한 후, SWOT 분석을 통해 회사의 강점과 약점을 파악...'

const useFeedback = () => {
  const [feedback, setFeedback] = useState('')
  const [keyword, setKeyword] = useState<OptionType>(OPTIONS[0])
  const [errorMessage, setMessage] = useState<null | string>(null)
  const { temperature } = useTemperature()

  const handleChangeFeedback: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setFeedback(e.target.value)
  }, [])

  const handleSubmitFeedback = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => (callback: <T extends Feedback>(args: T) => void) => {
      e.preventDefault()
      if (feedback.length > LIMIT_TEXT_LENGTH) {
        setMessage(`최대 ${LIMIT_TEXT_LENGTH}자 까지만 작성 가능 해요 🥲`)
        return
      }

      if (feedback.length < MINIMUM_TEXT_LENGTH) {
        setMessage(`${MINIMUM_TEXT_LENGTH - feedback.length}자 더 작성 부탁 드려요`)
        return
      }

      setMessage(null)
      callback({ feedback, keyword: keyword.value, temperature })
    },
    [feedback, keyword, temperature]
  )

  return {
    errorMessage,
    feedback,
    handleChangeFeedback,
    setKeyword,
    keyword,
    handleSubmitFeedback,
  }
}

export default useFeedback
