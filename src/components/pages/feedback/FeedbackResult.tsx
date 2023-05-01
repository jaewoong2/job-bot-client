import useFoldAbleActions from '@/hooks/useFoldAbleActions'
import { Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RxArrowLeft } from 'react-icons/rx'
import { Link } from 'react-router-dom'

type Props = {
  content?: string
  isLoading?: boolean
  isError?: boolean
  erorrMessage?: string
}

const FeedbackResult = ({ content, isLoading, isError, erorrMessage }: Props) => {
  const { show } = useFoldAbleActions()

  useEffect(() => {
    show()
  }, [])

  return (
    <div className="mt-5 px-6 relative">
      {isLoading && (
        <div className="dark:bg-darkBg-300 dark:border-gray-500 border rounded-md w-full h-full min-h-[400px] p-3 py-8 flex justify-center bg-slate-100 items-center animate-pulse font-light">
          답변 생성 중..
        </div>
      )}
      {!isError && !isLoading && (
        <div className="border rounded-md w-full h-full min-h-[400px] p-3 py-8 dark:bg-darkBg-300 dark:border-gray-500">
          {content}
        </div>
      )}
      {isError && (
        <div className="border border-red-400 text-red-500 text-[1rem] rounded-md w-full h-full min-h-[400px] dark:bg-darkBg-300 flex justify-center items-center flex-col">
          에러가 발생 했어요 😢
          {erorrMessage && <div className="text-white">에러 메세지: {erorrMessage}</div>}
        </div>
      )}
      <div className="flex py-3">
        <Link to="/feedback">
          <Button leftIcon={<RxArrowLeft />}>이전</Button>
        </Link>
      </div>
    </div>
  )
}

export default FeedbackResult
