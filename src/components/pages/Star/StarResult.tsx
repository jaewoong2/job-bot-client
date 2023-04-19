import React from 'react'

type Props = {
  content?: string
  isLoading?: boolean
}

const StarResult = ({ content, isLoading }: Props) => {
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
    </div>
  )
}

export default StarResult
