import React from 'react'

type Props = {
  isLoading: boolean
  isSuccess: boolean
  isError: boolean
  content: React.ReactNode
  error: React.ReactNode
  onClickButton: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const ContentResult = ({ content, isError, isLoading, isSuccess, onClickButton, error }: Props) => {
  return (
    <div className='relative mt-5'>
      {isLoading && (
        <div className='flex h-full min-h-[400px] w-full animate-pulse items-center justify-center rounded-md border bg-slate-100 p-3 py-8 font-light dark:border-gray-500 dark:bg-darkBg-300'>
          답변 생성 중..
        </div>
      )}
      {isSuccess && (
        <div className='h-full min-h-[400px] w-full whitespace-pre-wrap rounded-md border p-3 py-8 dark:border-gray-500 dark:bg-darkBg-300'>
          {content}
        </div>
      )}
      {isError && (
        <div className='flex h-full min-h-[400px] w-full flex-col items-center justify-center rounded-md border border-red-400 text-[1rem] text-red-500 dark:bg-darkBg-300'>
          에러가 발생 했어요 😢
          {error && <div className='text-white'>에러 메세지: {error}</div>}
        </div>
      )}
      <button
        type='button'
        className={`mt-10 w-full rounded-xl py-3 text-gray-600 hover:bg-sky-100 dark:bg-darkBg-300 dark:text-white dark:hover:bg-darkBg-200 ${
          isError ? 'border border-red-100 bg-red-50 text-rose-400' : 'bg-sky-50'
        }`}
        onClick={onClickButton}
      >
        확인
      </button>
    </div>
  )
}

export default ContentResult
