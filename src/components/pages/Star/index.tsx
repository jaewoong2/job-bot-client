import React from 'react'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import usePostStar from '@/hooks/usePostStar'
import { useToast } from '@chakra-ui/react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import useStarState from '@/hooks/useStarState'
import useBeforeUnload from '@/hooks/useBeforeUnload'
import StarMain from './StarMain'
import StarResult from './StarResult'
import Error from '../Error'

type Props = {
  temperature: number
} & ReturnType<typeof useStarState>

const Star = ({ temperature, ...state }: Props) => {
  const toast = useToast()
  const navigation = useNavigate()
  const { data, mutate, isLoading } = usePostStar(temperature, {
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

  useBeforeUnload(Object.values(state.star).filter((star) => star.length > 0).length > 0)

  return (
    <Routes>
      <Route
        path="/"
        element={
          <FoldAbleSection title="STAR 작성">
            <StarMain {...state} mutate={mutate} />
          </FoldAbleSection>
        }
      />
      <Route
        path="/result"
        element={
          <FoldAbleSection title="결과">
            <StarResult content={data?.content} isLoading={isLoading} />
          </FoldAbleSection>
        }
      />
      <Route path="*" element={<Error to="write">경험 작성 하러가기</Error>} />
    </Routes>
  )
}

export default Star
