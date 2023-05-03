import React, { useCallback } from 'react'
import TextArea from '@/components/atoms/TextArea'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import usePnfState, { LIMIT_TEXT_LENGTH } from '@/hooks/usePnfState'
import { Input, Text } from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'
import { PLACEHOLDER } from '@/hooks/useFeedbackState'
import { UseMutateFunction } from 'react-query'
import { AxiosError } from 'axios'
import useBeforeUnload from '@/hooks/useBeforeUnload'

type Props = ReturnType<typeof usePnfState> & {
  mutate: UseMutateFunction<
    {
      role: 'user' | 'assistant' | 'system'
      content: string
    },
    AxiosError<unknown, any>,
    {
      content: string
      job: string
    },
    unknown
  >
}

const PnfMain = ({
  errorMessage,
  handleChangeContent,
  content,
  onSubmit,
  job,
  handleChangeJob,
  mutate,
}: Props) => {
  const sumbit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      // data fetch
      onSubmit(e)(mutate)
    },
    [content, job]
  )

  useBeforeUnload(content.length > 0)

  return (
    <FoldAbleSection title="이 지원서는 통과 할까?">
      <form onSubmit={sumbit} id="feedback-form">
        <div className="w-full px-6 pt-3 xl:w-[200px] text-sm">
          <Text className="py-2 whitespace-nowrap flex items-center gap-1">
            <QuestionIcon />
            어떤 직무의 지원서 인가요?
          </Text>
          <Input
            value={job}
            onChange={handleChangeJob}
            className="text-sm"
            fontSize="sm"
            borderColor="gray.300"
            placeholder="마케터, 인사담당자, 개발자"
            _dark={{ borderColor: 'gray.500' }}
          />
        </div>
        <div className="p-3 pb-0">
          <TextArea
            label=""
            placeholder={PLACEHOLDER}
            resize="none"
            minH="400px"
            borderColor={errorMessage ? 'red.300' : 'gray.300'}
            _dark={{
              borderColor: errorMessage ? 'red.300' : 'gray.500',
            }}
            value={content}
            // tooltip={TOOLTIP}
            onChange={handleChangeContent}
          />
          <div
            className={`w-full flex justify-between px-3 text-sm
            ${errorMessage ? 'text-red-400' : 'text-gray-500'}`}
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
          평가받기
        </button>
      </div>
    </FoldAbleSection>
  )
}

export default PnfMain
