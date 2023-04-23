import useFoldAbleActions from '@/hooks/useFoldAbleActions'
import { Button } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { RxArrowLeft } from 'react-icons/rx'
import { Link } from 'react-router-dom'

type Props = {
  content?: string
  isLoading?: boolean
}

const StarResult = ({ content, isLoading }: Props) => {
  const { show } = useFoldAbleActions()

  useEffect(() => {
    show()
  }, [])

  return (
    <div className="mt-5 px-6 relative">
      {isLoading && (
        <div className="border rounded-md w-full h-full min-h-[400px] p-3 py-8 flex justify-center bg-slate-100 items-center animate-pulse font-light">
          답변 생성 중..
        </div>
      )}
      {!isLoading && (
        <div className="border rounded-md w-full h-full min-h-[400px] p-3 py-8">{content}</div>
      )}
      <div className="flex py-3">
        <Link to="/write">
          <Button leftIcon={<RxArrowLeft />}>이전</Button>
        </Link>
      </div>
    </div>
  )
}

export default StarResult
