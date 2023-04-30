import React from 'react'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import { Button, useToast } from '@chakra-ui/react'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import usePostFeedback from '@/hooks/usePostFeedback'
import useFeedbackState from '@/hooks/useFeedbackState'
import FeedbackMain from './FeedbackMain'
import FeedbackResult from './FeedbackResult'

type Props = {
  temperature: number
} & ReturnType<typeof useFeedbackState>

const Component404 = () => {
  return (
    <div className="w-full h-full min-h-[calc(100vh-80px)] flex justify-center items-center flex-col">
      <p className="text-red-400 text-lg">잘못된 접근이에요 😭</p>
      <Link className="p-3 hover:text-blue-500 text-blue-400 flex flex-col gap-1" to="/write">
        경함 작성 하러가기
        <Button>이동</Button>
      </Link>
    </div>
  )
}

const Feedback = ({ temperature, ...state }: Props) => {
  const toast = useToast()
  const navigation = useNavigate()
  const { data, mutate, isLoading, isError, error } = usePostFeedback(temperature, {
    onMutate: () => {
      navigation('result')
    },
    onSuccess: () => {},
    onError: () => {
      toast({
        title: '네트워크 에러.',
        description: '네트워크 장애가 발생 했습니다. 다시 시도해주세요.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    },
  })

  return (
    <Routes>
      <Route
        path="/"
        element={
          <FoldAbleSection title="지원서 피드백">
            <FeedbackMain mutate={mutate} {...state} />
          </FoldAbleSection>
        }
      />
      <Route
        path="/result"
        element={
          <FoldAbleSection title="결과">
            <FeedbackResult
              erorrMessage={error?.message}
              content={data?.content}
              isLoading={isLoading}
              isError={isError}
            />
          </FoldAbleSection>
        }
      />
      <Route path="*" element={<Component404 />} />
    </Routes>
  )
}

export default Feedback
