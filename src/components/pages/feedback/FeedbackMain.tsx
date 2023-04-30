import TextArea from '@/components/atoms/TextArea'
import useBeforeUnload from '@/hooks/useBeforeUnload'
import Select from '@/components/atoms/Select'
import useFeedbackState, {
  LABEL,
  LIMIT_TEXT_LENGTH,
  OPTIONS,
  PLACEHOLDER,
  TOOLTIP,
} from '@/hooks/useFeedbackState'
import { Feedback } from '@/types'
import { Text, Tooltip } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import { UseMutateFunction } from 'react-query'

type Props = {
  mutate: UseMutateFunction<
    | {
        role: 'assistant' | 'user' | 'system'
        content: string
      }
    | undefined,
    unknown,
    Feedback,
    unknown
  >
} & ReturnType<typeof useFeedbackState>

const FeedbackMain = ({
  mutate,
  errorMessage,
  feedback,
  handleChangeFeedback,
  handleSubmitFeedback,
  keyword,
  setKeyword,
}: Props) => {
  const sumbit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      // data fetch
      handleSubmitFeedback(e)(mutate)
    },
    [feedback, keyword]
  )

  useBeforeUnload(feedback.length > 0)

  return (
    <>
      <form onSubmit={sumbit} id="feedback-form">
        <div className="p-3 pb-0">
          <div className="flex flex-col px-3 w-full items-end">
            <Tooltip
              label="피드백 받을 때, 고려 해야 할 키워드 를 골라주세요 :)"
              placement="top-end"
            >
              <Text className="text-xs py-1 text-gray-400 w-fit">
                <span className="font-bold">{keyword.label}</span> 에 대해서 고려하며 피드백
              </Text>
            </Tooltip>
            <Select
              className="min-w-[180px]"
              options={OPTIONS}
              value={keyword}
              onChange={(e) => setKeyword(e!)}
              isMulti={false}
            />
          </div>
          <TextArea
            label={LABEL}
            placeholder={PLACEHOLDER}
            resize="none"
            minH="400px"
            borderColor={errorMessage ? 'red.300' : 'gray.300'}
            _dark={{
              borderColor: errorMessage ? 'red.300' : 'gray.500',
            }}
            value={feedback}
            tooltip={TOOLTIP}
            onChange={handleChangeFeedback}
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
            <div className={feedback.length > LIMIT_TEXT_LENGTH ? 'text-red-400' : ''}>
              {feedback.length} / {LIMIT_TEXT_LENGTH}
            </div>
          </div>
        </div>
      </form>
      <div className="w-full flex justify-end py-2 px-5 items-end">
        <button
          type="submit"
          className={`w-40 py-3 0 text-gray-600 rounded-xl cursor-pointer ${
            errorMessage
              ? 'bg-red-50 border-red-100 border text-rose-400'
              : 'bg-sky-50 hover:bg-sky-100'
          } dark:bg-darkBg-300 dark:text-white dark:hover:bg-darkBg-200`}
          form="feedback-form"
        >
          피드백 받기
        </button>
      </div>
    </>
  )
}

export default FeedbackMain
