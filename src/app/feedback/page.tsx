'use client'
import TextArea from '@/components/atoms/TextArea'
import Select from '@/components/atoms/Select'
import useFeedback, { LABEL, LIMIT_TEXT_LENGTH, OPTIONS, PLACEHOLDER, TOOLTIP } from './hooks/useFeedback'
import { Text, Tooltip, useDisclosure } from '@chakra-ui/react'
import React, { useCallback } from 'react'
import usePostFeedback from './hooks/usePostFeedback'
import Result from '@/components/blocks/Result'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import ContentResult from '@/components/blocks/ContentResult'

const FeedbackMain = () => {
  const { errorMessage, feedback, handleChangeFeedback, handleSubmitFeedback, keyword, setKeyword } = useFeedback()
  const { data: content, error, isMutating: isLoading, trigger: mutate } = usePostFeedback()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const sumbit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      // data fetch
      handleSubmitFeedback(e)((data) => {
        mutate(data)
        onOpen()
      })
    },
    [handleSubmitFeedback, mutate, onOpen]
  )

  return (
    <FoldAbleSection title='지원서 피드백 받기'>
      <form onSubmit={sumbit} id='feedback-form'>
        <div className='p-3 pb-0'>
          <div className='flex w-full flex-col items-end px-3'>
            <Tooltip label='피드백 받을 때, 고려 해야 할 키워드 를 골라주세요 :)' placement='top-end'>
              <Text className='w-fit py-1 text-xs text-gray-400'>
                <span className='font-bold'>{keyword.label}</span> 에 대해서 고려하며 피드백
              </Text>
            </Tooltip>
            <Select
              className='min-w-[180px]'
              options={OPTIONS}
              value={keyword}
              onChange={(e) => setKeyword(e!)}
              isMulti={false}
            />
          </div>
          <TextArea
            label={LABEL}
            placeholder={PLACEHOLDER}
            resize='none'
            minH='400px'
            borderColor={errorMessage ? 'red.300' : 'gray.300'}
            _dark={{
              borderColor: errorMessage ? 'red.300' : 'gray.500',
            }}
            value={feedback}
            tooltip={TOOLTIP}
            onChange={handleChangeFeedback}
          />
          <div
            className={`flex w-full justify-between px-3 text-sm ${errorMessage ? 'text-red-400' : 'text-gray-500'}`}
          >
            <div>{errorMessage && <span className='animate-fade-in-left text-red-500'>{errorMessage}</span>}</div>
            <div className={feedback.length > LIMIT_TEXT_LENGTH ? 'text-red-400' : ''}>
              {feedback.length} / {LIMIT_TEXT_LENGTH}
            </div>
          </div>
        </div>
      </form>
      <div className='flex w-full items-end justify-end py-2'>
        <div
          className={`my-5 grid w-full cursor-pointer ${
            content?.role ? 'grid-cols-[3fr_1fr]' : 'grid-cols-1'
          } justify-center gap-20 px-5`}
        >
          <button
            type='submit'
            className={`w-full rounded-xl bg-sky-50 py-3 text-gray-600 hover:bg-sky-100 dark:bg-darkBg-300 dark:text-white dark:hover:bg-darkBg-200 ${
              error ? 'border border-red-100 bg-red-50 text-rose-400' : ''
            }`}
            form='feedback-form'
          >
            피드백 받기
          </button>
          {content?.role && (
            <button
              type='button'
              className={`w-full rounded-xl bg-sky-50 py-3 text-gray-600 hover:bg-sky-100 dark:bg-darkBg-300 dark:text-white dark:hover:bg-darkBg-200 ${
                error ? 'border border-red-100 bg-red-50 text-rose-400' : ''
              }`}
              onClick={onOpen}
            >
              이전 결과
            </button>
          )}
        </div>
      </div>
      <Result title={'STAR 기반 지원서 결과'} isOpen={isOpen} size={'lg'} onClose={onClose} onOpen={onOpen}>
        <ContentResult
          content={content?.content}
          error={error?.message}
          isError={Boolean(error?.message)}
          isLoading={isLoading}
          isSuccess={Boolean(content?.role)}
          onClickButton={onClose}
        />
      </Result>
    </FoldAbleSection>
  )
}

export default FeedbackMain
