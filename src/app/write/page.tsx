'use client'
import React, { useCallback } from 'react'
import { RxDoubleArrowDown } from 'react-icons/rx'
import TextArea from '@/components/atoms/TextArea'
import useStar, { LIMIT_TEXT_LENGTH, STAR } from './hooks/useStar'
import usePostStar from './hooks/usePostStar'
import useTemperature from '@/hooks/useTemperature'
import Result from '@/components/blocks/Result'
import { useDisclosure } from '@chakra-ui/react'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'

const StarMain = () => {
  const { isOpen, onClose, onOpen } = useDisclosure()
  const { errorStatus, handleChangeStar, handleClickNextStep, handleSubmit, isError, star, step } = useStar()
  const { temperature } = useTemperature()
  const { trigger, isMutating: isLoading, data: content, error } = usePostStar()

  const submit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      handleSubmit((data) => trigger({ ...data, temperature }))
      onOpen()
    },
    [handleSubmit, trigger, temperature, onOpen]
  )

  return (
    <FoldAbleSection title='STAR 기반 지원서 작성'>
      <form onSubmit={submit} id='star-form' className='pb-10'>
        {STAR.map(
          ({ key, label, tooltip, placeholder }, index) =>
            index <= step && (
              <div className='p-3 pb-0' key={key}>
                <TextArea
                  label={label}
                  placeholder={placeholder}
                  resize='none'
                  minH='200px'
                  borderColor={errorStatus[key] ? 'red.300' : 'gray.300'}
                  _dark={{
                    borderColor: errorStatus[key] ? 'red.300' : 'gray.500',
                  }}
                  value={star[key]}
                  tooltip={tooltip}
                  onChange={handleChangeStar(key)}
                />
                <div
                  className={`flex w-full justify-between px-3 text-sm ${
                    errorStatus[key] ? 'text-red-400' : 'text-gray-500'
                  }`}
                >
                  <div>
                    {errorStatus[key] && <span className='animate-fade-in-left text-red-500'>{errorStatus[key]}</span>}
                  </div>
                  <div className={star[key].length > LIMIT_TEXT_LENGTH ? 'text-red-400' : ''}>
                    {star[key].length} / {LIMIT_TEXT_LENGTH}
                  </div>
                </div>
                {index <= step && index < STAR.length - 1 && (
                  <div className='p-3'>
                    <a
                      href={`#${STAR[index + 1].key}`}
                      type='button'
                      id={STAR[index + 1].key}
                      className='mx-auto my-5 flex w-[100%] cursor-pointer justify-center rounded-xl py-2 hover:bg-sky-50 dark:bg-darkBg-400 dark:hover:bg-darkBg-300'
                      onClick={handleClickNextStep(index)}
                    >
                      <span className={`+ rounded-full border p-1 ${step === index ? 'animate-bounce' : ''}`}>
                        <RxDoubleArrowDown className='text-2xl text-gray-800 dark:text-white' />
                      </span>
                    </a>
                  </div>
                )}
              </div>
            )
        )}
        {step === STAR.length - 1 && (
          <div
            className={`my-5 grid w-full cursor-pointer ${
              content?.role ? 'grid-cols-[3fr_1fr]' : 'grid-cols-1'
            } justify-center gap-20 px-5`}
          >
            <button
              type='submit'
              className={`w-full rounded-xl bg-sky-50 py-3 text-gray-600 hover:bg-sky-100 dark:bg-darkBg-300 dark:text-white dark:hover:bg-darkBg-200 ${
                isError ? 'border border-red-100 bg-red-50 text-rose-400' : ''
              }`}
              form='star-form'
            >
              작성하기
            </button>
            {content?.role && (
              <button
                type='button'
                className={`w-full rounded-xl bg-sky-50 py-3 text-gray-600 hover:bg-sky-100 dark:bg-darkBg-300 dark:text-white dark:hover:bg-darkBg-200 ${
                  isError ? 'border border-red-100 bg-red-50 text-rose-400' : ''
                }`}
                onClick={onOpen}
              >
                이전 결과
              </button>
            )}
          </div>
        )}
        <Result title={'STAR 기반 지원서 결과'} isOpen={isOpen} size={'lg'} onClose={onClose} onOpen={onOpen}>
          <div className='relative mt-5'>
            {isLoading && (
              <div className='flex h-full min-h-[400px] w-full animate-pulse items-center justify-center rounded-md border bg-slate-100 p-3 py-8 font-light dark:border-gray-500 dark:bg-darkBg-300'>
                답변 생성 중..
              </div>
            )}
            {content && !isError && !isLoading && (
              <div className='h-full min-h-[400px] w-full whitespace-pre-wrap rounded-md border p-3 py-8 dark:border-gray-500 dark:bg-darkBg-300'>
                {content?.content}
              </div>
            )}
            {isError && (
              <div className='flex h-full min-h-[400px] w-full flex-col items-center justify-center rounded-md border border-red-400 text-[1rem] text-red-500 dark:bg-darkBg-300'>
                에러가 발생 했어요 😢
                {error?.message && <div className='text-white'>에러 메세지: {error?.message}</div>}
              </div>
            )}
            <button
              type='button'
              className={`mt-10 w-full rounded-xl bg-sky-50 py-3 text-gray-600 hover:bg-sky-100 dark:bg-darkBg-300 dark:text-white dark:hover:bg-darkBg-200 ${
                isError ? 'border border-red-100 bg-red-50 text-rose-400' : ''
              }`}
              onClick={onClose}
            >
              확인
            </button>
          </div>
        </Result>
      </form>
    </FoldAbleSection>
  )
}

export default StarMain
