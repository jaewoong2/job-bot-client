import TextArea from '@/components/atoms/TextArea'
import useBeforeUnload from '@/hooks/useBeforeUnload'
import useCopilotState, {
  LABEL,
  LIMIT_TEXT_LENGTH,
  MINIMUM_TEXT_LENGTH,
  TOOLTIP,
} from '@/hooks/useCopilotState'
import useDebounce from '@/hooks/useDebounce'
import { PLACEHOLDER } from '@/hooks/useFeedbackState'
import { Copilot } from '@/types'
import { AddIcon, InfoIcon, QuestionIcon } from '@chakra-ui/icons'
import { Input, Tag, TagLabel, TagLeftIcon, Text } from '@chakra-ui/react'
import { AxiosError } from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { FcDislike, FcLike } from 'react-icons/fc'
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
  reset: () => void
} & ReturnType<typeof useCopilotState>

const CopilotMain = ({
  errorMessage,
  content,
  title,
  reset,
  mutate,
  handleChangePosition,
  handleChangeContent,
  handleChangeTitle,
  position,
  copilot,
  isLoading,
  setMessage,
  setContent,
}: Props) => {
  const [isActive, setIsActive] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const debounceValue = useDebounce(content, 2500)

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIsEditing(true)
    handleChangeContent(e)
  }, [])

  const handleAddCopliot = useCallback(() => {
    if (copilot) {
      setContent((prev) => prev + copilot)
    }
    reset()
  }, [copilot])

  const onKeyDown: React.KeyboardEventHandler<HTMLTextAreaElement> = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      if (copilot) {
        setContent((prev) => prev + copilot)
      }
      reset()
    } else {
      reset()
    }
  }

  useEffect(() => {
    if (debounceValue === content) {
      if (isEditing && isActive && position && title && content) {
        if (content.length > LIMIT_TEXT_LENGTH) {
          setMessage(`최대 ${LIMIT_TEXT_LENGTH}자 까지만 작성 가능 해요 🥲`)
          return
        }

        if (content.length < MINIMUM_TEXT_LENGTH) {
          setMessage(`${MINIMUM_TEXT_LENGTH - content.length}자 더 작성 부탁 드려요`)
          return
        }

        setMessage(null)
        mutate({ content, position, title })
        setIsEditing(false)
      }
    }
  }, [debounceValue, content, title, position, isActive, isEditing])

  useBeforeUnload(content.length > 0)

  return (
    <form id="feedback-form">
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
        <div className="w-full flex items-end px-3 flex-col gap-2">
          <button
            type="button"
            onClick={() => setIsActive((prev) => !prev)}
            className="rounded-xl p-3 dark:shadow-inner dark:shadow-darkBg-200 shadow-xl cursor-pointer"
          >
            {isActive ? <FcLike /> : <FcDislike />}
          </button>
          <span className="text-xs flex gap-2 items-center text-gray-400">
            <InfoIcon />
            코파일럿 {!isActive ? '정지' : '실행 중'}
          </span>
        </div>
        <TextArea
          isLoading={isLoading}
          label={LABEL}
          placeholder={PLACEHOLDER}
          resize="none"
          minH="400px"
          borderColor={errorMessage ? 'red.300' : 'gray.300'}
          _dark={{
            borderColor: errorMessage ? 'red.300' : 'gray.500',
          }}
          tooltip={TOOLTIP}
          isDisabled={isLoading}
          value={content}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className="relative"
        />
        {copilot && (
          <div className="px-3">
            <Tag
              size="md"
              key="md"
              variant="subtle"
              cursor="pointer"
              className="p-2"
              onClick={handleAddCopliot}
            >
              <TagLeftIcon boxSize="12px" as={AddIcon} />
              <TagLabel>{copilot}</TagLabel>
            </Tag>
          </div>
        )}
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
