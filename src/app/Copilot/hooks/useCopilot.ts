import React, { useCallback, useState } from 'react'
import usePostCopilot from './usePostCopilot'

export const PLACEHOLDER =
  '이전에 근무한 회사에서 경쟁력 있는 시장에서의 매출 성장을 위해 마케팅 전략을 개발하고 실행하는 역할을 맡았습니다. 이전의 전략이 시장 변화에 민첩하게 대응하지 못해 매출이 정체되어 있었기 때문에, 저는 기존 전략을 분석하고, 신규 고객을 확보하고 기존 고객을 유지할 수 있는 효과적인 마케팅 전략을 개발하고 실행하는 것이 목표였습니다. 이를 위해 먼저 경쟁사 분석과 시장 조사를 통해 현 시장 상황을 파악하였습니다. 이를 통해 기회와 위협을 도출한 후, SWOT 분석을 통해 회사의 강점과 약점을 파악...'
export const MINIMUM_TEXT_LENGTH = 200
export const LIMIT_TEXT_LENGTH = 500
export const TOOLTIP = 'Tab 키를 눌러보세요'
export const LABEL = '지원서 내용'

const useCopilot = () => {
  const { data, error, reset, trigger, isMutating } = usePostCopilot()
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [position, setPosition] = useState('')
  const [errorMessage, setMessage] = useState<null | string>(null)

  const handleChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setContent(e.target.value)
  }, [])

  const handleChangeTitle: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setTitle(e.target.value)
  }, [])

  const handleChangePosition: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setPosition(e.target.value)
  }, [])

  return {
    errorMessage,
    content,
    position,
    setContent,
    title,
    handleChangeContent,
    handleChangePosition,
    setMessage,
    handleChangeTitle,
    isLoading: isMutating,
    copilot: data?.content,
    error,
    reset,
    trigger,
  }
}

export default useCopilot
