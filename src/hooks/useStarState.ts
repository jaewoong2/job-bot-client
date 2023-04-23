import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Star } from '@/types'

export const MINIMUM_TEXT_LENGTH = 120
export const ERROR_MINIMUM_MESSAGE = '120자의 정보가 필요해요 🥲'
export const LIMIT_TEXT_LENGTH = 240
export const ERROR_LIMIT_MESSAGE = `최대 ${LIMIT_TEXT_LENGTH}자 까지 작성 가능 해요`

export const STAR = [
  {
    key: 'situation',
    label: 'Situation (상황)',
    placeholder:
      '대학교 1학년 때, 청년 사회 문제를 해결하는 해커톤 프로젝트에서, 어플리케이션 UI/UX 디자이너의 역할을 담당 하였습니다.',
    tooltip:
      '특정 상황이나 문제를 설명합니다. 이때 전체적인 배경과 문맥을 명확하게 전달해야 합니다. 예를 들어, 어떤 프로젝트에서 일했는지, 그 상황에서의 역할은 무엇이었는지 등을 언급할 수 있습니다.',
  },
  {
    key: 'task',
    label: 'Task (업무)',
    placeholder:
      '청년의 취업 문제를 주제로 삼았고, 이를 해결 하기 위한 서비스를 구현하기로 하였습니다. 청년을 위한 서비스로 다가가기 쉽고 사용하기 좋은 UI/UX 를 구현 하기로 하였습니다.',
    tooltip:
      '상황 설명에 이어, 그 상황에서 해결해야 할 과제나 목표를 구체적으로 기술합니다. 여기에서는 자신이 어떤 책임이나 역할을 맡았는지를 명확하게 밝혀야 합니다.',
  },
  {
    key: 'action',
    label: 'Action (행동)',
    placeholder:
      ' 먼저, 경쟁사 분석과 시장 조사를 통해 현 서비스 상황을 파악하였습니다. 이를 통해 각 서비스의 장단점을 알기 위해, SWOT 분석을 통해 서비스의 강점과 약점을 파악하였습니다. 이를 바탕으로 청년 들의 니즈를 파악하고 타겟 고객층을 선정하여 디자인 하였습니다',
    tooltip:
      '과제를 해결하기 위해 자신이 취한 구체적인 행동이나 전략을 기술합니다. 여기에서는 자신의 역량과 협업 능력 등을 잘 보여주는 사례를 선택하는 것이 중요합니다. 또한, 과정 중 겪은 어려움과 그것을 극복한 방법도 함께 언급해 주는 것이 좋습니다.',
  },
  {
    key: 'result',
    label: 'Result (결과)',
    placeholder:
      '청년을 위한 서비스 및 디자인을 개발하여, 어플리케이션 (DAU) 1000명의 유저중 700 명의 청년층 서비스 유저를 확보하게 되었습니다. 결과적으로 해커톤 프로젝트 우수상을 받게되었고, 청년의 문제에 도움을 줬다는 뿌듯함을 얻게 되었습니다.',
    tooltip:
      '마지막으로, 자신의 행동으로 얻은 결과를 기술합니다. 이때 얻은 성과를 구체적이고 측정 가능한 지표로 표현하는 것이 좋습니다. 예를 들어, 프로젝트 완료 기간을 단축시켰다거나, 매출을 증가시켰다는 등의 결과를 언급할 수 있습니다.',
  },
] as const

const useStarState = () => {
  const [star, setStar] = useState<Star>({ action: '', result: '', situation: '', task: '' })
  const [step, setStep] = useState(0)
  const [errorStatus, setErrorStatus] = useState<{
    [key in keyof Star]: string | null
  }>({
    situation: null,
    task: null,
    action: null,
    result: null,
  })

  const handleChangeStar = useCallback(
    (key: keyof Star) => (e: ChangeEvent<HTMLTextAreaElement>) => {
      setStar((prev) => {
        return { ...prev, [key]: e.target.value }
      })
    },
    []
  )

  const handleClickNextStep = useCallback(
    (index: number) => () => {
      const { key } = STAR[index]

      if (star[key].length < MINIMUM_TEXT_LENGTH) {
        setErrorStatus((prev) => ({
          ...prev,
          [key]: ERROR_MINIMUM_MESSAGE,
        }))
        return
      }

      if (star[key].length > LIMIT_TEXT_LENGTH) {
        setErrorStatus((prev) => ({
          ...prev,
          [key]: ERROR_LIMIT_MESSAGE,
        }))
        return
      }

      setErrorStatus((prev) => ({
        ...prev,
        [key]: null,
      }))

      setStep((prev) => Math.max(index + 1, prev))
    },
    [star]
  )

  const isError = useMemo(() => {
    return Object.values(errorStatus).filter((v) => !!v).length > 0
  }, [errorStatus])

  const handleSubmit = useCallback(
    (callback: <T extends Star>(args: T) => void) => {
      STAR.forEach(({ key }) => {
        if (star[key].length < MINIMUM_TEXT_LENGTH) {
          setErrorStatus((prev) => ({
            ...prev,
            [key]: ERROR_MINIMUM_MESSAGE,
          }))
          return
        }

        if (star[key].length > LIMIT_TEXT_LENGTH) {
          setErrorStatus((prev) => ({
            ...prev,
            [key]: ERROR_LIMIT_MESSAGE,
          }))
          return
        }
        setErrorStatus((prev) => ({
          ...prev,
          [key]: null,
        }))
      })

      if (!isError) {
        callback(star)
      }
    },
    [star, errorStatus, isError]
  )

  return {
    star,
    step,
    isError,
    errorStatus,
    handleChangeStar,
    handleClickNextStep,
    handleSubmit,
  }
}

export default useStarState
