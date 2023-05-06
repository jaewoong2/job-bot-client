import React from 'react'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import { Route, Routes, useNavigate } from 'react-router-dom'
import useCopilotState from '@/hooks/useCopilotState'
import usePostCopilot from '@/hooks/usePostCopilot'
import { useToast } from '@chakra-ui/react'
import Error from '../Error'
import CopilotMain from './CopilotMain'

type Props = {
  temperature: number
} & ReturnType<typeof useCopilotState>

const Copilot = ({ temperature, ...state }: Props) => {
  const toast = useToast()
  const navigation = useNavigate()
  const { data, mutate, isLoading, isError, error } = usePostCopilot(temperature, {
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
          <FoldAbleSection title="코파일럿">
            <CopilotMain
              mutate={mutate}
              {...state}
              isLoading={isLoading}
              isError={isError}
              errorMessage={state.errorMessage ?? error?.message ?? null}
              copilot={data?.content}
            />
          </FoldAbleSection>
        }
      />
      <Route path="*" element={<Error to="write">피드백 받으러가기</Error>} />
    </Routes>
  )
}

export default Copilot
