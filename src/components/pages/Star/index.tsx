import React from 'react'
import FoldAbleSection from '@/components/blocks/FoldAbleSection'
import usePostStar from '@/hooks/usePostStar'
import { Button, useDisclosure } from '@chakra-ui/react'
import ModalBase from '@/components/blocks/ModaBase'
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import useStarState from '@/hooks/useStarState'
import StarMain from './StarMain'
import StarResult from './StarResult'

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

const Star = () => {
  const navigation = useNavigate()
  const { onOpen, ...rest } = useDisclosure()
  const starState = useStarState()

  const { data, mutate, isLoading } = usePostStar({
    onMutate: () => {
      navigation('result')
      onOpen()
    },
    onSuccess: () => {},
  })

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <FoldAbleSection title="STAR 작성">
              <StarMain {...starState} mutate={mutate} />
            </FoldAbleSection>
          }
        />
        <Route
          path="/result"
          element={
            data ? (
              <FoldAbleSection title="결과">
                <StarResult content={data?.content} isLoading={isLoading} />
              </FoldAbleSection>
            ) : (
              <Component404 />
            )
          }
        />
        <Route path="/feedback" element />
        <Route path="*" element={<Component404 />} />
      </Routes>
      <ModalBase {...rest} title="자소서 생성중...">
        <div className="w-full border aspect-square flex justify-center items-center bg-slate-50">
          광고박스
        </div>
      </ModalBase>
    </>
  )
}

export default Star
