'use client'
import React, { useCallback } from 'react'
import { Input, Text, useDisclosure } from '@chakra-ui/react'
import { QuestionIcon } from '@chakra-ui/icons'

import TextArea from '@/components/atoms/TextArea'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import Result from '@/components/blocks/Result'

import useTitle, { LIMIT_TEXT_LENGTH, PLACEHOLDER } from './hooks/useTitle'
import usePostTitle from './hooks/usePostTitle'
import ContentResult from '@/components/blocks/ContentResult'

const TitleMain = () => {
  const { content, errorMessage, handleChangeContent, handleChangeJob, job, onSubmit } = useTitle()
  const { data, error, isMutating: isLoading, trigger: mutate } = usePostTitle()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const sumbit: React.FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      // data fetch
      onSubmit(e)((args) => {
        mutate(args)
        onOpen()
      })
    },
    [onSubmit, mutate, onOpen]
  )

  return (
    <FoldAbleSection title='소제목'>
      <form onSubmit={sumbit} id='feedback-form'>
        <div className='w-full px-6 pt-3 text-sm xl:w-[200px]'>
          <Text className='flex items-center gap-1 whitespace-nowrap py-2'>
            <QuestionIcon />
            어떤 직무의 지원서 인가요?
          </Text>
          <Input
            value={job}
            required
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
            data?.role ? 'grid-cols-[7fr_2fr]' : 'grid-cols-1'
          } justify-center gap-2 px-5`}
        >
          <button
            type='submit'
            className={`w-full rounded-xl bg-sky-50 py-3 text-gray-600 hover:bg-sky-100 dark:bg-darkBg-300 dark:text-white dark:hover:bg-darkBg-200 ${
              error ? 'border border-red-100 bg-red-50 text-rose-400' : ''
            }`}
            form='feedback-form'
          >
            소제목 확인 하기
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
      <Result title={'지원서 소제목'} isOpen={isOpen} size={'lg'} onClose={onClose} onOpen={onOpen}>
        <ContentResult
          content={data?.content}
          error={error?.message}
          isError={Boolean(error?.message)}
          isLoading={isLoading}
          isSuccess={Boolean(data?.role)}
          onClickButton={onClose}
        />
      </Result>
    </FoldAbleSection>
  )
}

export default TitleMain
