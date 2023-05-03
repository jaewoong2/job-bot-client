import React, { useCallback, useState } from 'react'

export const MINIMUM_TEXT_LENGTH = 300
export const LIMIT_TEXT_LENGTH = 1000
export const TOOLTIP = '피드백 받을 지원서를 자유롭게 작성 해주세요 🥳'
export const LABEL = '지원서 내용'

const usePnfState = () => {
  const [content, setContent] = useState('')
  const [job, setJob] = useState('')
  const [errorMessage, setMessage] = useState<null | string>(null)

  const handleChangeContent: React.ChangeEventHandler<HTMLTextAreaElement> = useCallback((e) => {
    setContent(e.target.value)
  }, [])

  const handleChangeJob: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    setJob(e.target.value)
  }, [])

  const handleSubmitContent = useCallback(
    (e: React.FormEvent<HTMLFormElement>) =>
      (callback: <T extends { content: string; job: string }>(args: T) => void) => {
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
        callback({ content, job })
      },
    [content, job]
  )

  return {
    errorMessage,
    content,
    job,
    handleChangeContent,
    handleChangeJob,
    onSubmit: handleSubmitContent,
  }
}

export default usePnfState
