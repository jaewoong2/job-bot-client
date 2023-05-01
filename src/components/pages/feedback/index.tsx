import React from 'react'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import { useToast } from '@chakra-ui/react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import usePostFeedback from '@/hooks/usePostFeedback'
import useFeedbackState from '@/hooks/useFeedbackState'
import FeedbackMain from './FeedbackMain'
import FeedbackResult from './FeedbackResult'
import Error from '../Error'

type Props = {
  temperature: number
} & ReturnType<typeof useFeedbackState>

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
      <Route path="*" element={<Error to="write">피드백 받으러가기</Error>} />
    </Routes>
  )
}

export default Feedback
