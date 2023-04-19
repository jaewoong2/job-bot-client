import React, { useEffect } from 'react'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import usePostStar from '@/hooks/usePostStar'
import { Star as TStar } from '@/types'
import { useDisclosure } from '@chakra-ui/react'
import ModalBase from '@/components/blocks/ModaBase'
import StarMain from './StarMain'
import StarResult from './StarResult'

const Star = () => {
  const { data, mutate, isLoading, status } = usePostStar()
  const { onOpen, ...rest } = useDisclosure()

  useEffect(() => {
    onOpen()
  }, [onOpen])

  return (
    <>
      <FoldAbleSection title="STAR 작성">
        <StarMain postStar={(star: TStar) => mutate(star)} />
      </FoldAbleSection>
      {status !== 'idle' && (
        <FoldAbleSection title="결과">
          <StarResult content={data?.content} isLoading={isLoading} />
        </FoldAbleSection>
      )}
      <ModalBase {...rest}>
        <div className="w-full border aspect-square flex justify-center items-center bg-slate-50">
          광고박스
        </div>
      </ModalBase>
    </>
  )
}

export default Star
