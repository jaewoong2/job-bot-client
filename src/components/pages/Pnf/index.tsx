import React from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'

import usePostPnf from '@/hooks/usePostPnf'
import { useToast } from '@chakra-ui/react'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import usePnfState from '@/hooks/usePnfState'
import PnfMain from './PnfMain'
import PnfResult from './PnfResult'
import Error from '../Error'

type Props = {
  temperature: number
} & ReturnType<typeof usePnfState>

const Pnf = ({ temperature, ...pnf }: Props) => {
  const toast = useToast()
  const navigation = useNavigate()

  const { data, mutate, isLoading, isError, error } = usePostPnf(temperature, {
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
      <Route path="/" element={<PnfMain mutate={mutate} {...pnf} />} />
      <Route
        path="/result"
        element={
          <FoldAbleSection title="결과">
            <PnfResult
              content={data?.content}
              isLoading={isLoading}
              isError={isError}
              erorrMessage={error?.message}
            />
          </FoldAbleSection>
        }
      />
      <Route path="*" element={<Error to="pnf">경험 작성 하러가기</Error>} />
    </Routes>
  )
}

export default Pnf
