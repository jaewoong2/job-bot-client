import React from 'react'
import { Routes, Route } from 'react-router-dom'
import useStarState from '@/hooks/useStarState'
import useFeedbackState from '@/hooks/useFeedbackState'
import Home from '../pages/Home'
import Star from '../pages/Star'
import Articles from '../pages/articles'
import Feedback from '../pages/feedback'
import { SEO } from '../blocks/SEO'

type Props = {
  temperature: number
}

const Router = ({ temperature }: Props) => {
  const starState = useStarState()
  const feedbackState = useFeedbackState()

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SEO>
            <Home />
          </SEO>
        }
      />
      <Route path="/articles/:article" element={<Articles />} />
      <Route path="/write/*" element={<Star temperature={temperature} {...starState} />} />
      <Route
        path="/feedback/*"
        element={<Feedback temperature={temperature} {...feedbackState} />}
      />
    </Routes>
  )
}

export default Router
