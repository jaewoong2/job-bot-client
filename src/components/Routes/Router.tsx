import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import useStarState from '@/hooks/useStarState'
import useFeedbackState from '@/hooks/useFeedbackState'
import usePnfState from '@/hooks/usePnfState'
import useCopilotState from '@/hooks/useCopilotState'
import { SEO } from '../blocks/SEO'
import Error from '../pages/Error'

const Home = React.lazy(() => import('../pages/Home'))
const Star = React.lazy(() => import('../pages/Star'))
const Articles = React.lazy(() => import('../pages/articles'))
const Feedback = React.lazy(() => import('../pages/feedback'))
const Pnf = React.lazy(() => import('../pages/Pnf'))
const Copilot = React.lazy(() => import('../pages/Copilot'))

type Props = {
  temperature: number
}

const Router = ({ temperature }: Props) => {
  const starState = useStarState()
  const feedbackState = useFeedbackState()
  const pnfState = usePnfState()
  const copliotState = useCopilotState()

  return (
    <Suspense fallback={<div>로딩중...</div>}>
      <SEO />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:article" element={<Articles />} />
        <Route path="/pnf/*" element={<Pnf {...pnfState} temperature={temperature} />} />
        <Route
          path="/copilot/*"
          element={<Copilot temperature={temperature} {...copliotState} />}
        />
        <Route path="/write/*" element={<Star temperature={temperature} {...starState} />} />
        <Route
          path="/feedback/*"
          element={<Feedback temperature={temperature} {...feedbackState} />}
        />
        <Route path="/*" element={<Error>메인 페이지로 넘어가기</Error>} />
      </Routes>
    </Suspense>
  )
}

export default Router
