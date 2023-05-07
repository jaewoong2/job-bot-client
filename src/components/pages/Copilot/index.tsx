import React from 'react'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import { Route, Routes } from 'react-router-dom'
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
  const { data, mutate, isLoading, error, reset } = usePostCopilot(temperature, {
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
          <FoldAbleSection title="지원서 봇">
            <CopilotMain
              reset={reset}
              mutate={mutate}
              {...state}
              isLoading={isLoading}
              errorMessage={state.errorMessage ?? error?.message ?? null}
              copilot={data?.content}
            />
          </FoldAbleSection>
        }
      />
      <Route path="*" element={<Error to="copilot">지원서 봇</Error>} />
    </Routes>
  )
}

export default Copilot
