import TextArea from '@/components/atoms/TextArea'
import useBeforeUnload from '@/hooks/useBeforeUnload'
import useCopilotState from '@/hooks/useCopilotState'
import { LABEL, LIMIT_TEXT_LENGTH, PLACEHOLDER, TOOLTIP } from '@/hooks/useFeedbackState'
import { Copilot } from '@/types'
import { QuestionIcon } from '@chakra-ui/icons'
import { Input, Text } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import React, { useCallback } from 'react'
import { UseMutateFunction } from 'react-query'

type Props = {
  mutate: UseMutateFunction<
    {
      role: 'user' | 'assistant' | 'system'
      content: string
    },
    AxiosError<unknown, any>,
    Omit<Copilot, 'temperature'>,
    unknown
  >

  errorMessage?: string | null

  isLoading: boolean
  copilot?: string
  isError: boolean
} & ReturnType<typeof useCopilotState>

const CopilotMain = ({
  errorMessage,
  onSubmit,
  content,
  title,
  mutate,
  handleChangeContent,
  handleChangePosition,
  handleChangeTitle,
  position,
  copilot,
  isError,
  isLoading,
}: Props) => {
  const submit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      // data fetch
      onSubmit(e)(mutate)
    },
    [content, title]
  )

  useBeforeUnload(content.length > 0)

  console.log(copilot, isError, isLoading)

  return (
    <form onSubmit={submit} id="feedback-form">
      <div className="w-full px-6 pt-3 text-sm">
        <div className="xl:flex gap-10">
          <div className="xl:w-[400px]">
            <Text className="py-2 whitespace-nowrap flex items-center gap-1">
              <QuestionIcon />
              어떤 내용의 지원서 인가요?
            </Text>
            <Input
              value={title}
              onChange={handleChangeTitle}
              className="text-sm"
              fontSize="sm"
              borderColor="gray.300"
              placeholder="지원동기, 성공경험, 성장배경"
              _dark={{ borderColor: 'gray.500' }}
            />
          </div>
          <div>
            <Text className="py-2 whitespace-nowrap flex items-center gap-1">
              <QuestionIcon />
              어떤 직무의 지원서 인가요?
            </Text>
            <Input
              value={position}
              onChange={handleChangePosition}
              className="text-sm"
              fontSize="sm"
              borderColor="gray.300"
              placeholder="마케터, 인사담당자, 개발자"
              _dark={{ borderColor: 'gray.500' }}
            />
          </div>
        </div>
      </div>
      <div className="p-3 pb-0">
        <TextArea
          label={LABEL}
          placeholder={PLACEHOLDER}
          resize="none"
          minH="400px"
          borderColor={errorMessage ? 'red.300' : 'gray.300'}
          _dark={{
            borderColor: errorMessage ? 'red.300' : 'gray.500',
          }}
          value={content}
          tooltip={TOOLTIP}
          onChange={handleChangeContent}
        />
        <div
          className={`w-full flex justify-between px-3 text-sm ${
            errorMessage ? 'text-red-400' : 'text-gray-500'
          }`}
        >
          <div>
            {errorMessage && (
              <span className="text-red-500 animate-fade-in-left">{errorMessage}</span>
            )}
          </div>
          <div className={content.length > LIMIT_TEXT_LENGTH ? 'text-red-400' : ''}>
            {content.length} / {LIMIT_TEXT_LENGTH}
          </div>
        </div>
      </div>
    </form>
  )
}

export default CopilotMain
