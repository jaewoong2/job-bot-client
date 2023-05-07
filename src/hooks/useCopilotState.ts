import React, { useCallback, useState } from 'react'

export const MINIMUM_TEXT_LENGTH = 200
export const LIMIT_TEXT_LENGTH = 500
export const TOOLTIP = 'Tab 키를 눌러보세요'
export const LABEL = '지원서 내용'

const useCopilotState = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [position, setPosition] = useState('')
  const [errorMessage, setMessage] = useState<null | string>(null)

  const handleChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback(
    (e) => {
      setContent(e.target.value)
    },
    [content]
  )

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
  }
}

export default useCopilotState
