import { Copilot } from '@/types'
import React, { useCallback, useState } from 'react'

export const MINIMUM_TEXT_LENGTH = 300
export const LIMIT_TEXT_LENGTH = 600
export const TOOLTIP = '자동완성을 도움 받을 지원서 내용을 작성 해주세요'
export const LABEL = '지원서 내용'

const useCopilotState = () => {
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

  const handleSubmitContent = useCallback(
    (e: React.FormEvent<HTMLFormElement>) =>
      (callback: <T extends Omit<Copilot, 'temperature'>>(args: T) => void) => {
        e.preventDefault()
        if (content.length > LIMIT_TEXT_LENGTH) {
          setMessage(`최대 ${LIMIT_TEXT_LENGTH}자 까지만 작성 가능 해요 🥲`)
          return
        }

        if (content.length < MINIMUM_TEXT_LENGTH) {
          setMessage(`${MINIMUM_TEXT_LENGTH - content.length}자 더 작성 부탁 드려요`)
          return
        }

        setMessage(null)
        callback({ content, position, title })
      },
    [content, position, title]
  )

  return {
    errorMessage,
    content,
    position,
    title,
    handleChangeContent,
    handleChangePosition,
    handleChangeTitle,
    onSubmit: handleSubmitContent,
  }
}

export default useCopilotState
