'use client'
import React, { useCallback } from 'react'
import { Input, Text, useDisclosure } from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'

import TextArea from '@/components/atoms/TextArea'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import Result from '@/components/blocks/Result'

import useRating, { LIMIT_TEXT_LENGTH, PLACEHOLDER } from './hooks/useRating'
import usePostRating from './hooks/usePostRating'

const RatingMain = () => {
  const { content, errorMessage, handleChangeContent, handleChangeJob, job, onSubmit } = useRating()
  const { data, error, isMutating: isLoading, trigger: mutate } = usePostRating()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const sumbit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      // data fetch
      onSubmit(e)(mutate)
      onOpen()
    },
    [onSubmit, mutate, onOpen]
  )

  return (
    <FoldAbleSection title='이 지원서는 몇점 일까?  '>
      <form onSubmit={sumbit} id='feedback-form'>
        <div className='w-full px-6 pt-3 text-sm xl:w-[200px]'>
          <Text className='flex items-center gap-1 whitespace-nowrap py-2'>
            <QuestionIcon />
            어떤 직무의 지원서 인가요?
          </Text>
          <Input
            value={job}
            onChange={handleChangeJob}
            className='text-sm'
            fontSize='sm'
            borderColor='gray.300'
            placeholder='마케터, 인사담당자, 개발자'
            _dark={{ borderColor: 'gray.500' }}
          />
        </div>
        <div className='p-3 pb-0'>
          <TextArea
            label=''
            placeholder={PLACEHOLDER}
            resize='none'
            minH='400px'
            borderColor={errorMessage ? 'red.300' : 'gray.300'}
            _dark={{
              borderColor: errorMessage ? 'red.300' : 'gray.500',
            }}
            value={content}
            // tooltip={TOOLTIP}
            onChange={handleChangeContent}
          />
          <div
            className={`flex w-full justify-between px-3 text-sm
            ${errorMessage ? 'text-red-400' : 'text-gray-500'}`}
          >
            <div>{errorMessage && <span className='animate-fade-in-left text-red-500'>{errorMessage}</span>}</div>
            <div className={content.length > LIMIT_TEXT_LENGTH ? 'text-red-400' : ''}>
              {content.length} / {LIMIT_TEXT_LENGTH}
            </div>
          </div>
        </div>
      </form>
      <div className='flex w-full items-end justify-end py-2'>
        <div
          className={`my-5 grid w-full cursor-pointer ${
            data?.role ? 'grid-cols-[3fr_1fr]' : 'grid-cols-1'
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
          {data?.role && (
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
      <Result title={'지원서 평가'} isOpen={isOpen} size={'lg'} onClose={onClose} onOpen={onOpen}>
        <div className='relative mt-5'>
          {isLoading && (
            <div className='flex h-full min-h-[400px] w-full animate-pulse items-center justify-center rounded-md border bg-slate-100 p-3 py-8 font-light dark:border-gray-500 dark:bg-darkBg-300'>
              답변 생성 중..
            </div>
          )}
          {content && !error && !isLoading && (
            <div className='h-full min-h-[400px] w-full whitespace-pre-wrap rounded-md border p-3 py-8 dark:border-gray-500 dark:bg-darkBg-300'>
              {data?.content}
            </div>
          )}
          {error && (
            <div className='flex h-full min-h-[400px] w-full flex-col items-center justify-center rounded-md border border-red-400 text-[1rem] text-red-500 dark:bg-darkBg-300'>
              에러가 발생 했어요 😢
              {error?.message && <div className='text-white'>에러 메세지: {error?.message}</div>}
            </div>
          )}
          <button
            type='button'
            className={`mt-10 w-full rounded-xl bg-sky-50 py-3 text-gray-600 hover:bg-sky-100 dark:bg-darkBg-300 dark:text-white dark:hover:bg-darkBg-200 ${
              error ? 'border border-red-100 bg-red-50 text-rose-400' : ''
            }`}
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </Result>
    </FoldAbleSection>
  )
}

export default RatingMain
